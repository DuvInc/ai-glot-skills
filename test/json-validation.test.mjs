import {test} from "node:test";
import assert from "node:assert/strict";
import {validateJson} from "../skills/aiglot-localize-repo/scripts/validate-json.mjs";
const source={text:"Hello {name}, %1$s",nested:{enabled:true,count:4},items:["Value {{count}}",null]};
test("accepts changed prose while retaining locale structure and placeholders",()=>assert.doesNotThrow(()=>validateJson(source,{text:"[translated] %1$s {name}",nested:{count:4,enabled:true},items:["[translated] {{count}}",null]})));
for(const [label,target] of [
 ["missing nested key",{...source,nested:{enabled:true}}],
 ["extra key",{...source,extra:"new"}],
 ["changed numeric primitive",{...source,nested:{enabled:true,count:5}}],
 ["changed boolean",{...source,nested:{enabled:false,count:4}}],
 ["object to array",{...source,nested:[]}],
 ["missing array value",{...source,items:[source.items[0]]}],
 ["empty translation",{...source,text:""}],
 ["missing placeholder",{...source,text:"[translated] {name}"}],
 ["duplicated placeholder",{...source,text:"{name} {name} %1$s"}],
 ["changed placeholder spelling",{...source,text:"{nom} %1$s"}]
])test("refuses "+label,()=>assert.throws(()=>validateJson(source,target)));
test("preserves dollar-brace placeholders, not only their inner name",()=>assert.throws(()=>validateJson({x:"Price ${amount}"},{x:"Price {amount}"})));
test("accepts empty JSON without fabricating work",()=>assert.doesNotThrow(()=>validateJson({},{})));
