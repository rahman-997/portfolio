import ssl
import unittest
from unittest.mock import patch
from urllib.error import HTTPError
from scripts.check_published_delivery import NoRedirect, compare, request, select_assets, tls_context

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

    def test_tls_context_verifies_certificates_and_hostnames(self):
        context = tls_context()
        self.assertEqual(context.verify_mode, ssl.CERT_REQUIRED)
        self.assertTrue(context.check_hostname)
        self.assertEqual(context.minimum_version, ssl.TLSVersion.TLSv1_2)

    def test_redirect_is_not_followed(self):
        self.assertIsNone(NoRedirect().redirect_request(None, None, 302, "Found", {}, "https://other.example/"))
        with patch("scripts.check_published_delivery.build_opener") as factory:
            factory.return_value.open.side_effect = HTTPError("https://abdulrahman-hajar-portfolio.onrender.com/",302,"Found",{},None)
            result, body = request("/", "gzip")
            self.assertEqual(result["status"],302)
            self.assertIsNone(body)
            self.assertEqual(factory.return_value.open.call_count,1)

    def test_rejects_non_static_or_ambiguous_paths_before_network(self):
        with patch("scripts.check_published_delivery.build_opener") as factory:
            for path in ("//other.example/", "/_next/static/../a.js", "/_next/static/./a.js", "/api/private", "/_next/static/a.js?x=1"):
                with self.subTest(path=path), self.assertRaises(ValueError):
                    request(path,"gzip")
            factory.assert_not_called()
