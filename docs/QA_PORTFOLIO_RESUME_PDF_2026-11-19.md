# Portfolio online + downloadable résumé alignment — 2026-11-19

The HTML resume was updated in Draft PR #54 to lead with **Computer Engineer**, but the independently published PDF in `public/Abdulrahman-Hajar-Resume.pdf` still carried an older September 2026 first-line title **Software Engineer** and did not match the new HTML presentation.

This change adds a reproducible **ReportLab 4.4.9** PDF generator, plain UTF-8 Python source, zero paid dependencies and no external API calls. It produces a single-page A4 résumé with selectable English text, a simple green HAJAR editorial layout, clickable contact links, 4 selected real public projects, computer engineering education, and only confirmed technical capabilities; it does not invent metrics, employers, dates or credentials.

Local test before committing generator: one-page `pdfinfo`, `pdftotext` selectable content, screenshot render visually reviewed. New file SHA-256 **040e6af0a153a8bd494456e0104b7e3e7ac420fbd6cd5cc09c9c002425d2** (local candidate). Actual GitHub Actions runner may produce different byte SHA due runtime variation; verify semantic text and exact review branch instead.

The branch-only public `ubuntu-latest` workflow installs pinned, freely available ReportLab and pypdf. It checks metadata, one page, text and hyperlink annotations, then commits **only** `public/Abdulrahman-Hajar-Resume.pdf` to the review branch. It cannot run on main or deploy production. The PDF commit triggers normal PR54 CI / browser / security checks, all of which must pass on the **new head SHA**. No main merge or production deployment is authorized; keep PR Draft.
