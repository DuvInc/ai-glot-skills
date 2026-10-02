import { readFileSync, writeFileSync, mkdirSync, rmSync } from "node:fs";
import { resolve } from "node:path";
import { createHash } from "node:crypto";
import { execFileSync } from "node:child_process";
import { skillHeader, validateRepository, walk, ROOT } from "./validate.mjs";
const {version}=validateRepository();
const config=JSON.parse(readFileSync(resolve(ROOT,"packaging/config.json"),"utf8"));
const dist=resolve(ROOT,"dist");
rmSync(dist,{recursive:true,force:true});mkdirSync(dist,{recursive:true});
const skillFiles=config.skills.flatMap(name=>walk(resolve(ROOT,"skills",name)).map(file=>"skills/"+name+"/"+file));
const common=["README.md","LICENSE","COMPATIBILITY.md","VALIDATION.md","CHANGELOG.md","CONTRIBUTING.md","SECURITY.md","packaging/SUBMISSION.md","assets/icon.png","assets/logo.png",...skillFiles];
const packages=[
 ["ai-glot-openai-"+version+".zip",["plugin.json","mcp.json",...common],"",null],
 ["ai-glot-claude-"+version+".zip",[".claude-plugin/plugin.json",".mcp.json",...common],"",null],
 ...config.skills.map(name=>[name+"-"+version+".zip",walk(resolve(ROOT,"skills",name)).map(file=>"skills/"+name+"/"+file),"skills/"+name+"/",name])
];
const zipProgram='import sys,json,zipfile,pathlib\nroot=pathlib.Path(sys.argv[1])\nfor output,files,prefix,folder in json.loads(sys.argv[2]):\n with zipfile.ZipFile(root/"dist"/output,"w",compression=zipfile.ZIP_DEFLATED,compresslevel=9) as z:\n  for name in sorted(files):\n   archive=(folder+"/" if folder else "")+(name[len(prefix):] if prefix else name)\n   info=zipfile.ZipInfo(archive,date_time=(1980,1,1,0,0,0));info.compress_type=zipfile.ZIP_DEFLATED;info.external_attr=0o100644<<16\n   z.writestr(info,(root/name).read_bytes(),compresslevel=9)\n  if folder:\n   info=zipfile.ZipInfo(folder+"/LICENSE",date_time=(1980,1,1,0,0,0));info.compress_type=zipfile.ZIP_DEFLATED;info.external_attr=0o100644<<16;z.writestr(info,(root/"LICENSE").read_bytes(),compresslevel=9)\n';
execFileSync("python3",["-c",zipProgram,ROOT,JSON.stringify(packages)]);
const catalog={skills:config.skills.map(name=>{
 const dir=resolve(ROOT,"skills",name);
 return {uri:"skill://aiglot/"+name+"/SKILL.md",frontmatter:skillHeader(readFileSync(resolve(dir,"SKILL.md"),"utf8")),resources:walk(dir).map(file=>{
  const bytes=readFileSync(resolve(dir,file));
  return {uri:"skill://aiglot/"+name+"/"+file,digest:"sha256:"+createHash("sha256").update(bytes).digest("hex"),size:bytes.length};
 })};
})};
writeFileSync(resolve(dist,"skills-catalog.json"),JSON.stringify(catalog,null,2)+"\n");
const sums=walk(dist).sort().map(file=>createHash("sha256").update(readFileSync(resolve(dist,file))).digest("hex")+"  "+file).join("\n")+"\n";
writeFileSync(resolve(dist,"SHA256SUMS"),sums);
console.log("Built "+packages.length+" archives and a static catalog at version "+version+".");
