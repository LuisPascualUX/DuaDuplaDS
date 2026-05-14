import { readFileSync } from 'node:fs';

const [, , screenPath, registryPath = 'src/agentic/component-registry.json', rulesPath = 'src/agentic/composition-rules.json'] =
  process.argv;

if (!screenPath) {
  console.error('Usage: npm run validate-agentic-screen -- <screen.json> [registry.json] [rules.json]');
  process.exit(1);
}

const readJson = (path) => JSON.parse(readFileSync(new URL(`../${path}`, import.meta.url), 'utf8'));
const readInputJson = (path) => JSON.parse(readFileSync(path, 'utf8'));

const registry = readJson(registryPath);
const rules = readJson(rulesPath);
const screen = readInputJson(screenPath);

const componentMap = new Map(registry.components.map((c) => [c.id, c]));
const findings = [];

for (const node of screen.nodes ?? []) {
  const component = componentMap.get(node.componentId);
  if (!component) {
    findings.push({ severity: 'error', rule: 'component-exists', message: `Unknown componentId: ${node.componentId}` });
    continue;
  }

  for (const [prop, def] of Object.entries(component.props)) {
    if (def.required && (node.props?.[prop] === undefined || node.props?.[prop] === '')) {
      findings.push({
        severity: 'error',
        rule: 'required-prop',
        message: `${node.componentId} is missing required prop "${prop}"`,
      });
    }

    if (def.type === 'enum' && node.props?.[prop] !== undefined && !def.options.includes(node.props[prop])) {
      findings.push({
        severity: 'error',
        rule: 'enum-prop',
        message: `${node.componentId}.${prop}="${node.props[prop]}" is not valid`,
      });
    }
  }
}

const allIntentTags = (screen.nodes ?? []).flatMap((node) => node.intentTags ?? []);

for (const rule of rules.rules ?? []) {
  const check = rule.check ?? {};
  if (check.type === 'intentTagCount') {
    const count = allIntentTags.filter((tag) => tag === check.intentTag).length;
    if (check.min !== undefined && count < check.min) {
      findings.push({ severity: rule.severity, rule: rule.id, message: `${rule.description} Found ${count}.` });
    }
    if (check.max !== undefined && count > check.max) {
      findings.push({ severity: rule.severity, rule: rule.id, message: `${rule.description} Found ${count}.` });
    }
  }

  if (check.type === 'requiredProp') {
    for (const node of screen.nodes ?? []) {
      if (node.componentId !== check.componentId) continue;
      if (node.props?.[check.prop] === undefined || node.props?.[check.prop] === '') {
        findings.push({
          severity: rule.severity,
          rule: rule.id,
          message: `${check.componentId} requires "${check.prop}"`,
        });
      }
    }
  }
}

const errors = findings.filter((f) => f.severity === 'error');
const warns = findings.filter((f) => f.severity === 'warn');

if (findings.length === 0) {
  console.log('Agentic validation passed: no findings.');
  process.exit(0);
}

for (const finding of findings) {
  const prefix = finding.severity.toUpperCase();
  console.log(`${prefix} [${finding.rule}] ${finding.message}`);
}

if (errors.length > 0) {
  console.log(`Validation failed with ${errors.length} error(s) and ${warns.length} warning(s).`);
  process.exit(2);
}

console.log(`Validation passed with ${warns.length} warning(s).`);
