import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { resolve } from "node:path";
const root=resolve(import.meta.dirname,"..");
const read=p=>JSON.parse(readFileSync(resolve(root,p),"utf8"));
const json=(p,value)=>{mkdirSync(resolve(root,p,".."),{recursive:true});writeFileSync(resolve(root,p),JSON.stringify(value,null,2)+"\n");};
const config=read("packaging/config.json"),pkg=read("package.json");
const description="Set up your AI Glot workspace, check credits, translate files, run multilingual campaigns, localize repository resources and manage terminology.";
const identity={name:config.name,version:pkg.version,description,author:{name:config.author,url:"https://ai-glot.com"},homepage:config.homepage,repository:config.repository,license:"MIT",keywords:["translation","localization","i18n","documents"]};
const listing=read("packaging/listing.json");
json("plugin.json",{$schema:"https://agent-plugins.org/schemas/1.0.0/plugin.schema.json",...identity,extensions:{"com.openai":{...listing,onboardingSkill:"./skills/aiglot-manage-workspace/SKILL.md"}}});
json("mcp.json",{$schema:"https://agent-plugins.org/schemas/1.0.0/mcp.schema.json",mcpServers:{aiglot:{type:"streamable-http",url:config.endpoint}}});
json(".mcp.json",{mcpServers:{aiglot:{type:"http",url:config.endpoint}}});
json(".claude-plugin/plugin.json",{...identity,displayName:config.displayName,mcpServers:"./.mcp.json"});
json("packaging/claude-directory.json",{displayName:config.displayName,documentationUrl:config.homepage,supportUrl:config.support,privacyPolicyUrl:config.privacy,termsOfServiceUrl:config.terms,icon:"assets/icon.png"});
json(".claude-plugin/marketplace.json",{name:config.marketplace,description:"AI Glot file translation and terminology workflows.",owner:{name:config.author},plugins:[{name:config.name,source:"./plugins/ai-glot",description,version:pkg.version}]});
const names={
 "aiglot-manage-workspace":["Manage your AI Glot workspace","Connect your workspace and inspect credits and usage."],
 "aiglot-run-translations":["Run translation campaigns","Run multilingual jobs, track batches and recover results."],
 "aiglot-translate-file":["Translate a file","Translate a structured file through AI Glot."],
 "aiglot-localize-repo":["Localize repository resources","Localize resources with validated keys and placeholders."],
 "aiglot-manage-glossary":["Manage AI Glot terminology","Update glossary terms while preserving other mappings."]
};
for(const name of config.skills){
 const base=resolve(root,"skills",name);
 mkdirSync(resolve(base,"references"),{recursive:true});
 for(const file of ["connection.md","methods.md","guidelines.md","formats.md"]) writeFileSync(resolve(base,"references",file),readFileSync(resolve(root,"shared",file)));
 mkdirSync(resolve(base,"agents"),{recursive:true});
 const [display,short]=names[name];
 const yaml='interface:\n  display_name: '+JSON.stringify(display)+'\n  short_description: '+JSON.stringify(short)+'\n  default_prompt: '+JSON.stringify('Use $'+name+' for this AI Glot workflow.')+'\ndependencies:\n  tools:\n    - type: mcp\n      value: aiglot\n      description: "AI Glot workspace translation and terminology tools"\n      transport: streamable_http\n      url: '+JSON.stringify(config.endpoint)+'\n';
 writeFileSync(resolve(base,"agents/openai.yaml"),yaml);
}
console.log("Generated host manifests and shared references for "+config.skills.length+" skills.");
