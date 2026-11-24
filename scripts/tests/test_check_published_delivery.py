import unittest
from scripts.check_published_delivery import compare, select_assets

class PublishedDeliveryTest(unittest.TestCase):
    def test_assets_are_same_origin_static_paths(self):
        html = '<script src="/_next/static/chunks/a.js"></script><link href="/_next/static/css/b.css"><script src="https://other.example/a.js"></script>'
        self.assertEqual(select_assets(html), ["/_next/static/chunks/a.js", "/_next/static/css/b.css"])
        self.assertEqual(select_assets('<script src="/_next/static/../outside.js">'), [])

    def test_only_same_decoded_payload_confirms_compression(self):
        plain = {"status":200,"decodedSha256":"a","encoding":"identity"}
        self.assertEqual(compare(plain,{**plain,"encoding":"gzip"}),"gzip-confirmed")
        self.assertEqual(compare(plain,plain),"no-gzip-observed")
        self.assertEqual(compare(plain,{**plain,"decodedSha256":"b"}),"inconclusive-payload-changed")
        self.assertEqual(compare(plain,{**plain,"status":503}),"inconclusive-http")
        self.assertEqual(compare(plain,{**plain,"decodedSha256":None}),"inconclusive-encoding")
