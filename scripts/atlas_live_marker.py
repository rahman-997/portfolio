"""Guard against testing an obsolete Render release by mistake."""


def assert_expected_deploy(actual, expected):
    """Check the page's public deployment marker when the triggering SHA is known."""
    if not expected:
        return
    if not actual:
        raise AssertionError(f"Live page is missing a deploy commit marker; expected commit {expected}")
    if actual != expected:
        raise AssertionError(f"Live page is on commit {actual}; expected commit {expected}")
