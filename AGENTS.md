<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

## Application architecture
- Keep browser-local demo records in the shared demo provider, isolated from any future production authentication; demo roles never authorize server operations.
- Mount the demo provider once in the root and show account entry when the portal has no local demo identity; this preserves demo state across navigation without implying server authorization.
- Use TanStack content routes with the shared association portal and route-specific metadata so each navigation destination remains addressable.
- Keep all association visual roles and responsive styling in the global semantic design system for consistency.
