import {test} from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync,existsSync} from 'node:fs';
import {resolve} from 'node:path';
import {validateSubmission} from '../scripts/validate-submission.mjs';
const root=resolve(import.meta.dirname,'..');
const source=()=>JSON.parse(readFileSync(resolve(root,'plugin.json'),'utf8'));
test('submission package meets current listing and case constraints without claiming a recording',()=>{
 const r=validateSubmission(source(),root);assert.deepEqual(r.errors,[]);assert.equal(r.readyForReview,false);assert.deepEqual(r.gaps,['Verified public demo recording URL']);
});
test('detects the former overlength subtitle and five-default-prompt submission defects',()=>{
 const m=source();m.extensions['com.openai'].interface.shortDescription='Translate files and preserve their structure.';m.extensions['com.openai'].interface.defaultPrompt=['one','two','three','four','five'];
 const r=validateSubmission(m,root);assert.ok(r.errors.some(x=>x.startsWith('shortDescription')));assert.ok(r.errors.some(x=>x.startsWith('defaultPrompt')));
});
test('public package excludes reviewer access and unsupported case evidence flags',()=>{
 const text=JSON.stringify(source());assert.equal(/test_credentials|reviewer_instructions|guillaume\.duv\.pro@/.test(text),false);
 for(const c of source().extensions['com.openai'].review.test_cases.positive)assert.equal('passed' in c,false);
});
test('Claude directory folder contains no development dependency install or binary fixture',()=>{
 for(const name of ['package.json','package-lock.json','node_modules','packaging/review/fixtures/guide.docx'])assert.equal(existsSync(resolve(root,'plugins/ai-glot',name)),false);
 assert.ok(existsSync(resolve(root,'plugins/ai-glot/.mcp.json')));
});
