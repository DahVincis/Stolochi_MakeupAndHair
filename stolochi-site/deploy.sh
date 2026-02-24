#!/usr/bin/env bash
# ─────────────────────────────────────────────────────────────────────────────
# deploy.sh — Build and deploy to AWS using OpenNext (via SST)
#
# OpenNext wraps Next.js for Lambda + S3 + CloudFront, supporting API routes
# and ISR — the same stack as Vercel but on your own AWS account.
#
# Prerequisites:
#   1. AWS CLI configured (aws configure)
#   2. First-time: npx sst@latest init  (generates sst.config.ts)
#
# First deploy:
#   npx sst deploy --stage production
#
# Subsequent deploys (this script):
#   bash deploy.sh
#
# Docs:
#   OpenNext:  https://opennext.js.org
#   SST v3:    https://sst.dev/docs
# ─────────────────────────────────────────────────────────────────────────────
set -euo pipefail

STAGE="${STAGE:-production}"

echo "▶  Building Next.js…"
npm run build

echo "▶  Deploying via SST (OpenNext) — stage: ${STAGE}…"
npx sst deploy --stage "${STAGE}"

echo "✓  Deployment complete!"
