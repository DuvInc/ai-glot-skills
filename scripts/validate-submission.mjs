import { readFileSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';
export function validateSubmission(manifest, root) {
  const errors=[], gaps=[];
  const x=manifest.extensions?.['com.openai'],i=x?.interface??{};
  for(const [field,max] of [['displayName',30],['shortDescription',30],['longDescription',4000],['developerName',80]])
    if(typeof i[field]!=='string'||!i[field].trim()||i[field].length>max)errors.push(`${field} must contain 1-${max} characters`);
  const prompts=i.defaultPrompt;
  if(!Array.isArray(prompts)||prompts.length<1||prompts.length>3||prompts.some(p=>typeof p!=='string'||!p.trim()||p.length>128||/[\r\n]/.test(p))||new Set(prompts?.map(p=>p.trim().replace(/\s+/g,' '))).size!==prompts?.length)errors.push('defaultPrompt must contain up to three unique single-line prompts');
  for(const field of ['websiteURL','supportURL','privacyPolicyURL','termsOfServiceURL']) {
    try {const u=new URL(i[field]);if(u.protocol!=='https:'||u.username||u.password)throw Error();}catch{errors.push(`${field} must be an absolute public HTTPS URL`);}
  }
  for(const [field,min] of [['logo',256],['composerIcon',48]]) {
    try {const p=i[field];if(!p?.startsWith('./')||p.split('/').includes('..'))throw Error();const b=readFileSync(resolve(root,p));if(!b.subarray(0,8).equals(Buffer.from([137,80,78,71,13,10,26,10]))||b.readUInt32BE(16)!==b.readUInt32BE(20)||b.readUInt32BE(16)<min||b.length>5*1024*1024)throw Error();}catch{errors.push(`${field} must reference a contained square PNG of sufficient size`);}
  }
  const cases=x?.review?.test_cases;
  if(cases?.positive?.length!==5||cases?.negative?.length!==3)errors.push('Initial MCP review requires exactly five positive and three negative cases');
  for(const [kind,items] of Object.entries(cases??{}))for(const c of items??[])
    for(const field of ['description','prompt',...(kind==='positive'?['tools_triggered','expected_behavior']:[])])if(typeof c[field]!=='string'||!c[field].trim())errors.push(`${kind} case is missing ${field}`);
  if(!x?.review?.demo_recording_url)gaps.push('Verified public demo recording URL');
  else if(!/^https:\/\//.test(x.review.demo_recording_url))errors.push('Demo recording URL must be HTTPS');
  const setup=x?.onboardingSkill;
  if(!setup?.startsWith('./')||setup.split('/').includes('..')||!existsSync(resolve(root,setup)))errors.push('Onboarding skill must exist inside the package');
  if(manifest.apps||x?.apps||x?.hooks||existsSync(resolve(root,'.app.json')))errors.push('Author upload cannot contain app IDs or hooks');
  return {packageValid:errors.length===0,readyForReview:errors.length===0&&gaps.length===0,errors,gaps};
}
if(process.argv[1]&&import.meta.url===pathToFileURL(process.argv[1]).href) {
 const root=resolve(import.meta.dirname,'..');const result=validateSubmission(JSON.parse(readFileSync(resolve(root,'plugin.json'),'utf8')),root);
 console.log(JSON.stringify(result,null,2));if(result.errors.length||(process.argv.includes('--strict')&&result.gaps.length))process.exitCode=1;
}
