# Design System Agents

This repository uses a multi-agent workflow to design, build, document, and publish a Design System.

## Agent Topology

### 1) `orchestrator-agent`
- Owns planning and sequencing across all phases.
- Decides acceptance criteria and Definition of Done for each phase.
- Opens and closes handoffs between specialized agents.

### 2) `figma-intake-agent`
- Validates Figma access and parses shared file/node URLs.
- Ensures foundations, iconography, and component scopes are identifiable.
- Produces the first implementation-ready handoff packet.

### 3) `figma-foundations-agent`
- Extracts foundations, tokens, and components from Figma.
- Produces token inventories and component specs.
- Flags ambiguity in naming, states, variants, and accessibility.

### 4) `react-implementation-agent`
- Implements React components and component APIs.
- Maps design tokens to code tokens.
- Adds tests and usage examples for each component.

### 5) `repo-release-agent`
- Prepares repository structure and quality gates.
- Maintains versioning and changelog strategy.
- Handles release checks before publishing to GitHub.

### 6) `storybook-astro-agent`
- Documents foundations and components in Astro + Storybook.
- Builds MDX/Docs pages and stories for each component state.
- Enforces docs coverage for props, a11y notes, and examples.

### 7) `vercel-deploy-agent`
- Prepares Vercel configuration and environment variables.
- Runs preview and production deployment checklist.
- Validates URLs, redirects, and docs availability.

## Handoff Contracts

Each agent must provide:
- Output artifacts (files created/updated).
- Validation evidence (tests, build, screenshots, or logs).
- Open risks and pending decisions.
- Clear "Ready for next phase" statement.

## Global Definition of Done

- Foundations and tokens are documented and versioned.
- React components are implemented with consistent APIs.
- Source code is pushed to GitHub with CI passing.
- Storybook documentation is complete and navigable.
- Documentation site is deployed on Vercel successfully.
