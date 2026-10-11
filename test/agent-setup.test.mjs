import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const guide = readFileSync(new URL('../agent-setup/prompt.md', import.meta.url), 'utf8');
test('host configuration examples preserve the distinct MCP schemas', () => {
  const examples = [...guide.matchAll(/```json\n([\s\S]*?)\n```/g)].map(match => JSON.parse(match[1]));
  assert.equal(examples.length, 3);
  assert.deepEqual(examples[0].mcp.aiglot, { type: 'remote', url: 'https://mcp.ai-glot.com/mcp', enabled: true });
  assert.deepEqual(examples[1].mcpServers.aiglot, { url: 'https://mcp.ai-glot.com/mcp' });
  assert.deepEqual(examples[2].servers.aiglot, { type: 'http', url: 'https://mcp.ai-glot.com/mcp' });
});
test('setup shell examples never invoke a paid or data-changing AI Glot operation', () => {
  const shell = [...guide.matchAll(/```sh\n([\s\S]*?)\n```/g)].map(match => match[1]).join('\n');
  assert.doesNotMatch(shell, /aiglot\s+(batches|glossaries|api)\b/);
  assert.doesNotMatch(shell, /--key\b|Authorization:|auto.approve|dangerously/);
});
test('the guest upload example prepares a plan without approving or spending', () => {
  const shell = [...guide.matchAll(/```sh\n([\s\S]*?)\n```/g)].map(match => match[1]).join('\n');
  assert.match(shell, /https:\/\/api\.ai-glot\.com\/v1\/guest\/batches/);
  assert.doesNotMatch(shell, /\/approve\b|approve_translation/);
  // The device code is read from the environment, never pasted literally.
  assert.match(shell, /device_code=\$AIGLOT_DEVICE_CODE/);
});
