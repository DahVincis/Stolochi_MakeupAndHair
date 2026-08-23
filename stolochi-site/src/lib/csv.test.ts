import { test } from "node:test";
import assert from "node:assert/strict";
import { parseCsv } from "./csv.ts";

test("splits plain rows", () => {
  assert.deepEqual(parseCsv("a,b\nc,d"), [["a", "b"], ["c", "d"]]);
});

test("keeps commas inside quoted fields", () => {
  assert.deepEqual(parseCsv('"T001","Jessica A.","Austin, TX"'), [
    ["T001", "Jessica A.", "Austin, TX"],
  ]);
});

test("unescapes doubled quotes", () => {
  assert.deepEqual(parseCsv('"say ""hi"" now"'), [['say "hi" now']]);
});

test("keeps newlines inside quoted fields", () => {
  assert.deepEqual(parseCsv('"line1\nline2",x'), [["line1\nline2", "x"]]);
});

test("preserves empty trailing columns", () => {
  assert.deepEqual(parseCsv('"a","b","",""'), [["a", "b", "", ""]]);
});

test("ignores a trailing newline rather than emitting a blank row", () => {
  assert.deepEqual(parseCsv("a,b\n"), [["a", "b"]]);
});

test("handles CRLF", () => {
  assert.deepEqual(parseCsv("a,b\r\nc,d"), [["a", "b"], ["c", "d"]]);
});

test("real Google export row", () => {
  const csv =
    '"id","name","location","quote","rating","active"\n' +
    '"T001","Jessica A.","Austin, TX","""Flawless, truly!""","5","TRUE"';
  assert.deepEqual(parseCsv(csv)[1], [
    "T001", "Jessica A.", "Austin, TX", '"Flawless, truly!"', "5", "TRUE",
  ]);
});
