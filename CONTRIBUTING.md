# Contributing to Vidora

Thanks for your interest in contributing! We welcome bug reports, feature
requests, documentation improvements, and pull requests.

## How to Contribute

1. **Fork** the repository and create your branch from `main`.
2. Keep changes focused and consistent with the existing code style.
3. Follow the frontend lint rules — run `npm run lint` and `npm run build`
   inside `frontend/` before submitting.
4. Test your changes locally.
5. Open a **Pull Request** with a clear description.

### Branch Name

Use a descriptive branch, for example:

```bash
git checkout -b feat/amazing-feature
git checkout -b fix/video-player-bug
```

## Commit Messages

Use clear, conventional commit messages:

```text
feat: add comment reply threads
fix: resolve thumbnail overflow in dark mode
docs: update API reference
```

## Pull Request Checklist

- [ ] Lint passes (`cd frontend && npm run lint`)
- [ ] Production build passes (`cd frontend && npm run build`)
- [ ] No debug logging (`console.log`) left in with committed code
- [ ] No hardcoded color values — use semantic design tokens
- [ ] Relevant documentation updated where applicable

## Project Structure

See the [README](./README.md) for the architecture and directory layout, and
`PROJECT_CONTEXT.md` in the root for implementation context.

## Code of Conduct

By participating, you agree to abide by our [Code of Conduct](./CODE_OF_CONDUCT.md).

## Questions?

Open an [issue](https://github.com/SaimRaza885/Vidora/issues) and we will get
back to you.