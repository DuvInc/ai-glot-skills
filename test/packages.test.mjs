import {test,before} from "node:test";
import assert from "node:assert/strict";
import {readFileSync,writeFileSync,mkdtempSync,cpSync,rmSync} from "node:fs";
import {join,resolve} from "node:path";
import {tmpdir} from "node:os";
import {createHash} from "node:crypto";
import {execFileSync} from "node:child_process";
import {validateRepository,walk,ROOT} from "../scripts/validate.mjs";
const config=JSON.parse(readFileSync(resolve(ROOT,"packaging/config.json"),"utf8"));
const pkg=JSON.parse(readFileSync(resolve(ROOT,"package.json"),"utf8"));
const build=()=>execFileSync(process.execPath,["scripts/build.mjs"],{cwd:ROOT});
before(()=>build());
test("portable and Claude manifests validate against their common identity",()=>assert.deepEqual(validateRepository(),{skills:config.skills.length,version:pkg.version}));
test("archives contain only publishable files and every skill reference",()=>{
 const output=execFileSync("python3",["-c",'import pathlib,zipfile,json,sys\nr=pathlib.Path(sys.argv[1])\nprint(json.dumps({p.name:zipfile.ZipFile(p).namelist() for p in r.glob("*.zip")}))',resolve(ROOT,"dist")],{encoding:"utf8"});
 const packages=JSON.parse(output);
 assert.equal(Object.keys(packages).length,config.skills.length+2);
 for(const [name,entries] of Object.entries(packages)){
  assert.ok(entries.length>1);
  assert.ok(entries.every(p=>!p.startsWith("/")&&!p.split("/").includes("..")));
  assert.ok(entries.every(p=>!/(^|\/)(node_modules|\.git|\.env|evals|shared)(\/|$)/.test(p)));
  if(name.startsWith("ai-glot-openai")){assert.ok(entries.includes("plugin.json"));assert.ok(entries.includes("mcp.json"));assert.ok(!entries.includes(".mcp.json"));assert.ok(!entries.some(p=>p.startsWith(".claude-plugin/")));}
  if(name.startsWith("ai-glot-claude")){assert.ok(entries.includes(".claude-plugin/plugin.json"));assert.ok(entries.includes(".mcp.json"));assert.ok(!entries.includes("plugin.json"));}
  const skills=name.startsWith("ai-glot-")?config.skills:[name.slice(0,-("-"+pkg.version+".zip").length)];
  for(const skill of skills){
   const prefix=name.startsWith("ai-glot-")?"skills/"+skill+"/":skill+"/";
   assert.ok(entries.includes(prefix+"SKILL.md"));
   assert.ok(entries.includes(prefix+"references/connection.md"));
   if(skill==="aiglot-localize-repo")assert.ok(entries.includes(prefix+"scripts/validate-json.mjs"));
  }
 }
});
test("catalog hashes bind every file to the exact distributed skill bytes",()=>{
 const catalog=JSON.parse(readFileSync(resolve(ROOT,"dist/skills-catalog.json"),"utf8"));
 assert.equal(catalog.skills.length,config.skills.length);
 for(const skill of catalog.skills){
  const name=skill.frontmatter.name;
  assert.equal(skill.resources.length,walk(resolve(ROOT,"skills",name)).length);
  for(const resource of skill.resources){
   const path=resource.uri.replace("skill://aiglot/","");
   const bytes=readFileSync(resolve(ROOT,"skills",path));
   assert.equal(resource.size,bytes.length);
   assert.equal(resource.digest,"sha256:"+createHash("sha256").update(bytes).digest("hex"));
  }
 }
});
test("two builds produce identical archive bytes",()=>{
 const files=walk(resolve(ROOT,"dist")),first=Object.fromEntries(files.map(f=>[f,readFileSync(resolve(ROOT,"dist",f))]));
 build();
 for(const f of files)assert.deepEqual(readFileSync(resolve(ROOT,"dist",f)),first[f],f);
});
test("rejects a link that escapes the skill archive",()=>{
 const p=mkdtempSync(join(tmpdir(),"skills-bad-ref-"));
 try{
  cpSync(ROOT,p,{recursive:true,filter:x=>!/(^|\/)(node_modules|dist|\.git)(\/|$)/.test(x)});
  const f=resolve(p,"skills/aiglot-translate-file/SKILL.md");
  writeFileSync(f,readFileSync(f,"utf8")+"\n[private](../../../../outside.md)\n");
  assert.throws(()=>validateRepository(p),/escapes skill/);
 }finally{rmSync(p,{recursive:true,force:true});}
});
test("refuses generated guidance that differs from the common source",()=>{
 const p=mkdtempSync(join(tmpdir(),"skills-drift-"));
 try{
  cpSync(ROOT,p,{recursive:true,filter:x=>!/(^|\/)(node_modules|dist|\.git)(\/|$)/.test(x)});
  writeFileSync(resolve(p,"skills/aiglot-translate-file/references/connection.md"),"stale guidance");
  assert.throws(()=>validateRepository(p),/Shared reference drift/);
 }finally{rmSync(p,{recursive:true,force:true});}
});
