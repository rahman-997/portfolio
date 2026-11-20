# Portfolio 320px stale-history-frame state fix | November 19, 2026

## Real browser evidence
GitHub Actions [run 44522504815](https://github.com/rahman-997/portfolio/actions/runs/44522504815) recorded native events and the controlled `#project-search` value on 320px devices. In `en-dark-320` at `#main`:
- At t=2006ms `native-input` delivered **HajarCare**, React filtered to one project and updated `location.search` to `?q=HajarCare`.
- A queued `hashchange` fired shortly afterwards; by t=2022ms the **same input DOM node** was reset to empty and 22 project cards returned, while the URL still contained `?q=HajarCare`.
- Later the URL was rewritten as empty. Other locale/theme runs passed in the same workflow, consistent with an intermittent browser scheduling race.

## Fix and regression
- Existing `ProjectExplorer` can queue initial and `popstate` URL restoration in requestAnimationFrame. The previous guard only protected **initial** hydration: a previously scheduled history frame could still erase a newer user edit.
- Add a monotonic user interaction revision ref, incremented on typed search, category filter changes and empty-state reset.
- Capture the revision when any URL restoration is scheduled and **discard that restoration if the revision has advanced**. Still restore back/forward when the user has not interacted since the schedule.
- Extend dependency-free URL helper and TypeScript declarations. Add real-source deterministic scheduler regression which explicitly queues popstate, types FRESH, flushes the old frame and confirms FRESH survives; normal back/forward still restores.
- No backend, DB, secrets, production publishing or disabling of Playwright count assertions. The original `tr-dark-320` / `ar-dark-320` checks remain strict and must be repeatedly verified.

## Remaining
Run real Node, build, CodeQL/Semgrep, full release and evolution Playwright on the exact new SHA. Until those succeed, maintain Draft / NO-GO. This fix targets a demonstrated race mechanism but the complete live root cause is not considered proven until the tests pass repeatedly.
