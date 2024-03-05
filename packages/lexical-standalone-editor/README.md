# Telos Technologies Lexical Editor

The main difference between this branch and the `tt-lexical` is that we manually removed all functionality related to Excalidraw, Mentions, Comments, Hashtags, Keywords, Figma, Poll and Collaboration.

## How to update this package with the latest changes from the Lexical official repo?

This branch is base on `main -> tt-lexical` branches

- `git checkout main`
- `git pull upstream/main` to update
- `git push`
- `git checkout tt-lexical`
- `git rebase main`
- `git push`
- `git checkout tt-lexical-editor`
- `git rebase tt-lexical`
- `yarn build`
- `git push`

See `tt-lexical-standalone` for the build version for the editor