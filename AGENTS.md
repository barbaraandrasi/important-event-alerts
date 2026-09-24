# Development rules

These rules apply to all code changes in this repository.

## Readability

- Prefer readable, vertically spaced code over compressed one-line expressions.
- Put one import, statement, prop, and JSX element per line when a line would otherwise become crowded.
- Keep functions focused. Extract a component or helper when a function becomes difficult to scan.
- Use descriptive names such as `activeAlerts`, `selectedTopic`, and `deliveryRecords`.
- Keep event handlers short. Move evaluation, persistence, and transformation logic into named domain functions.
- Use early returns for simple branches and keep the main render path easy to follow.
- Preserve blank lines between imports, state declarations, helpers, effects, handlers, and returned JSX.

## React components

- One exported React component per file under `src/components`.
- Keep shared constants and non-React helpers in separate files.
- Use multiline JSX for elements with multiple props or nested content.
- Keep conditional rendering explicit; use a small named component when a conditional block becomes hard to read.
- Keep state ownership at the lowest common owner that still makes data flow clear.

## Verification

- Run `npm run lint` and `npm run build` after code changes.
- Keep non-trivial domain logic covered by a small runnable self-check or focused test.
- Review the generated diff for readability before committing.
