import { readFileSync, readdirSync, lstatSync } from "node:fs";
import { resolve, relative, dirname, isAbsolute } from "node:path";
import { fileURLToPath } from "node:url";
import Ajv2020 from "ajv/dist/2020.js";
import { parse } from "yaml";

export const ROOT=resolve(import.meta.dirname,"..");
export function walk(root,base=""){
 const result=[];
 for(const name of readdirSync(resolve(root,base)).sort()){
  const rel=base?base+"/"+name:name,stat=lstatSync(resolve(root,rel));
  if(stat.isSymbolicLink()) throw new Error("Symlinks are not allowed: "+rel);
  if(stat.isDirectory()) result.push(...walk(root,rel));else if(stat.isFile()) result.push(rel);
 }
 return result;
}
export function skillHeader(text){
 const match=text.match(/^---\n([\s\S]*?)\n---\n/);
 if(!match) throw new Error("Missing YAML frontmatter");
 return parse(match[1]);
}
export function validateRepository(root=ROOT){
 const config=JSON.parse(readFileSync(resolve(root,"packaging/config.json"),"utf8"));
 const version=JSON.parse(readFileSync(resolve(root,"package.json"),"utf8")).version;
 const ajv=new Ajv2020({allErrors:true});
 for(const [file,schema] of [["plugin.json","plugin"],["mcp.json","mcp"]]){
  const check=ajv.compile(JSON.parse(readFileSync(resolve(root,"packaging/schemas/"+schema+".schema.json"),"utf8")));
  if(!check(JSON.parse(readFileSync(resolve(root,file),"utf8")))) throw new Error(file+": "+JSON.stringify(check.errors));
 }
 const manifest=JSON.parse(readFileSync(resolve(root,"plugin.json"),"utf8"));
 const claude=JSON.parse(readFileSync(resolve(root,".claude-plugin/plugin.json"),"utf8"));
 if(manifest.version!==version||claude.version!==version) throw new Error("Host versions drifted");
 for(const file of ["mcp.json",".mcp.json"]){
  const c=JSON.parse(readFileSync(resolve(root,file),"utf8"));
  if(c.mcpServers.aiglot.url!==config.endpoint||c.mcpServers.aiglot.headers) throw new Error("Wrong MCP origin or bundled headers");
 }
 const extension=manifest.extensions["com.openai"];
 if(extension.apps||extension.hooks) throw new Error("Submission archive cannot include app references or hooks");
 for(const field of ["composerIcon","logo"]){
  const path=extension.interface[field];
  if(!path?.startsWith("./")||path.includes("..")) throw new Error("Unsafe asset path");
  readFileSync(resolve(root,path));
 }
 for(const name of config.skills){
  const dir=resolve(root,"skills",name),text=readFileSync(resolve(dir,"SKILL.md"),"utf8"),front=skillHeader(text);
  if(front.name!==name||!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(name)||name.length>64) throw new Error("Invalid skill name "+name);
  if(typeof front.description!=="string"||!front.description.trim()||front.description.length>1024) throw new Error("Invalid description "+name);
  if(front["allowed-tools"]) throw new Error("No permission pre-approvals in public skills");
  if(text.split("\n").length>500) throw new Error("Skill instructions must stay concise");
  if(readFileSync(resolve(dir,"references/connection.md"),"utf8")!==readFileSync(resolve(root,"shared/connection.md"),"utf8")) throw new Error("Shared reference drift "+name);
  for(const file of walk(dir)){
   const full=resolve(dir,file);
   if(/\.(md|yaml|json|mjs)$/.test(file)){
    const content=readFileSync(full,"utf8");
    if(/\/Users\/|aig_live_[A-Za-z0-9]{12,}|Bearer\s+[A-Za-z0-9_-]{24,}|sk-[A-Za-z0-9]{20,}/.test(content)) throw new Error("Private path or literal credential in "+name+"/"+file);
    if(content.includes("—")) throw new Error("Customer copy contains an em dash: "+file);
    for(const [,link] of content.matchAll(/\]\(([^)]+)\)/g)){
     if(link.includes("://")||link.startsWith("#")) continue;
     const target=resolve(dirname(full),link.split("#")[0]);
     const rel=relative(dir,target);
     if(isAbsolute(rel)||rel===".."||rel.startsWith("../")) throw new Error("Reference escapes skill: "+link);
     readFileSync(target);
    }
   }
  }
 }
 return {skills:config.skills.length,version};
}
if(process.argv[1]&&resolve(process.argv[1])===fileURLToPath(import.meta.url)){
 console.log(JSON.stringify(validateRepository()));
}
