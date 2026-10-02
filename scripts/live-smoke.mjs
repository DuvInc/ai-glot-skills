import { readFileSync, writeFileSync, mkdtempSync } from "node:fs";
import { join, resolve } from "node:path";
import { tmpdir } from "node:os";
import { execFileSync } from "node:child_process";
import { validateJson } from "../skills/aiglot-localize-repo/scripts/validate-json.mjs";

const flags=process.argv.slice(2),approve=flags.includes("--approve");
const at=flags.indexOf("--max-credits"),budget=at<0?null:Number(flags[at+1]);
if(approve&&(!Number.isFinite(budget)||budget<=0)) throw new Error("--approve requires a positive --max-credits budget");
const cli=args=>JSON.parse(execFileSync("aiglot",["--json",...args],{encoding:"utf8",stdio:["ignore","pipe","inherit"]}));
const source=JSON.parse(readFileSync(resolve(import.meta.dirname,"../fixtures/source.json"),"utf8"));
const account=cli(["account"]);
if(!account.entitlements.quality_tiers.includes("lite")) throw new Error("This smoke requires a workspace with Lite access");
const dir=mkdtempSync(join(tmpdir(),"aiglot-skills-smoke-")),input=join(dir,"skills-smoke.json"),output=join(dir,"translated.json");
writeFileSync(input,JSON.stringify(source,null,2)+"\n");
const created=cli(["batches","create",input,"--instruction","Translate all JSON string values from English into French. Preserve all keys and placeholders exactly."]);
if(created.status!=="awaiting_approval"||!created.plan) throw new Error("Expected a verified plan");
if(created.plan.not_included.length) throw new Error("The plan excludes requested work");
const cost=created.plan.credits.lite;
console.log(JSON.stringify({batch_id:created.id,planned_lite_credits:cost,approved:false}));
if(!approve) process.exit(0);
if(cost>budget||cost>account.credit_balance) throw new Error("Measured cost exceeds the approved ceiling or balance");
cli(["batches","approve",created.id,"--quality","lite","--instructions","Keep {name} and {count} exactly as written."]);
let batch;
const deadline=Date.now()+180000;
while(Date.now()<deadline){
 batch=cli(["batches","get",created.id]);
 if(["completed","failed","cancelled"].includes(batch.status)) break;
 await new Promise(r=>setTimeout(r,3000));
}
if(batch?.status!=="completed") throw new Error("Smoke did not complete; retain batch "+created.id+" for recovery");
execFileSync("aiglot",["batches","download",created.id,"--output",output],{stdio:["ignore","pipe","inherit"]});
const target=JSON.parse(readFileSync(output,"utf8"));
validateJson(source,target);
if(target.greeting===source.greeting||target.count===source.count) throw new Error("The result did not translate the requested test strings");
console.log(JSON.stringify({status:batch.status,structure_verified:true,placeholders_verified:true,planned_lite_credits:cost,output}));
