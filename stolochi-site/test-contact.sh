#!/usr/bin/env bash
# Checks the /api/contact contract against a running server.
#   npm run preview   (in another terminal)
#   bash test-contact.sh
# Rate limiting is 5/min per IP, so this uses exactly one window.
set -uo pipefail
API="${API:-http://localhost:8787/api/contact}"
fails=0

check() { # check <expected-status> <label> <json>
  local got
  got=$(curl -s -o /dev/null -w '%{http_code}' -X POST "$API" \
        -H 'Content-Type: application/json' -d "$3")
  if [ "$got" = "$1" ]; then
    echo "ok   $2 ($got)"
  else
    echo "FAIL $2 — expected $1, got $got"
    fails=$((fails + 1))
  fi
}

check 400 "malformed json"  'not json'
check 400 "missing name"    '{"email":"a@b.co","message":"hi"}'
check 400 "bad email"       '{"name":"A","email":"nope","message":"hi"}'
check 400 "honeypot filled" '{"name":"A","email":"a@b.co","message":"hi","website":"spam"}'
# 5th request: 200 with real credentials configured, 500 without.
check "${VALID_EXPECT:-500}" "valid submission" \
  '{"name":"A","email":"a@b.co","message":"hi","services":["Bridal Hair Styling"]}'

# Cloudflare's rate limiter is approximate and eventually consistent, so the
# exact request that trips it varies. Assert that it trips within a burst.
tripped=0
for _ in $(seq 1 10); do
  code=$(curl -s -o /dev/null -w '%{http_code}' -X POST "$API" \
         -H 'Content-Type: application/json' -d '{"name":"A","email":"a@b.co","message":"hi"}')
  [ "$code" = "429" ] && { tripped=1; break; }
done
if [ "$tripped" = "1" ]; then
  echo "ok   rate limiting (429 within burst)"
else
  echo "FAIL rate limiting — no 429 in 10 requests"
  fails=$((fails + 1))
fi

[ "$fails" -eq 0 ] && echo "all passed" || { echo "$fails failed"; exit 1; }
