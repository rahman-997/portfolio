import sys
import unittest
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))
from atlas_live_marker import assert_expected_deploy


class LiveMarkerChecks(unittest.TestCase):
    def test_matching_live_commit_is_accepted(self):
        assert_expected_deploy('ab1234', 'ab1234')

    def test_missing_expected_commit_allows_pr_preview(self):
        assert_expected_deploy('ab1234', '')

    def test_stale_live_commit_fails_loudly(self):
        with self.assertRaisesRegex(AssertionError, 'expected commit'):
            assert_expected_deploy('older', 'newer')

    def test_missing_live_commit_marker_fails(self):
        with self.assertRaisesRegex(AssertionError, 'missing'):
            assert_expected_deploy(None, 'newer')


if __name__ == '__main__':
    unittest.main()
