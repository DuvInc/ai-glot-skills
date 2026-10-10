#!/usr/bin/env node
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";

export function placeholders(text) {
  return [...text.matchAll(/\$\{[A-Za-z_][\w.]*\}|\{\{[A-Za-z_][\w.]*\}\}|\{[A-Za-z_][\w.]*\}|(?<!%)%(?:\d+\$)?[sdif]/g)].map(m=>m[0]).sort();
}
export function validateJson(source, target, path = "$") {
  const fail=reason=>{throw new Error(path+": "+reason);};
  if (typeof source !== typeof target || (source === null) !== (target === null)) fail("value type changed");
  if (typeof source === "string") {
    if (source.trim() && !target.trim()) fail("non-empty source became empty");
    if (JSON.stringify(placeholders(source)) !== JSON.stringify(placeholders(target))) fail("placeholders changed");
    return;
  }
  if (Array.isArray(source)) {
    if (!Array.isArray(target) || source.length!==target.length) fail("array shape changed");
    source.forEach((value,i)=>validateJson(value,target[i],path+"["+i+"]"));
  } else if (source && typeof source==="object") {
    if (Array.isArray(target)) fail("object became array");
    const a=Object.keys(source).sort(),b=Object.keys(target).sort();
    if (JSON.stringify(a)!==JSON.stringify(b)) fail("keys changed");
    for (const key of a) validateJson(source[key],target[key],path+"."+key);
  } else if (source!==target) fail("non-string primitive changed");
}
if (process.argv[1] && resolve(process.argv[1])===fileURLToPath(import.meta.url)) {
  try {
    const [source,target]=process.argv.slice(2);
    if(!source||!target) throw new Error("Usage: validate-json.mjs source.json translated.json");
    validateJson(JSON.parse(readFileSync(source,"utf8")),JSON.parse(readFileSync(target,"utf8")));
    console.log("JSON structure and simple placeholders verified; linguistic/ICU quality is not certified.");
  } catch(error) { console.error(error.message);process.exitCode=1; }
}
