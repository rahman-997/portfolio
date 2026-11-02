#!/usr/bin/env python3
"""Reject Android ANR dialogs and require visible Basma content in UIAutomator."""
from pathlib import Path
import sys
import xml.etree.ElementTree as ET

APP_ID = 'dev.basma.portfolio.preview'
MARKERS = ('بصمة', 'SUMSUM', 'Eventify', 'BookHaven', 'Mizan Finance', 'FitFlow')
BAD = ("isn't responding", 'not responding', 'close app', 'pixel launcher')

def check(path):
    root = ET.fromstring(Path(path).read_bytes())
    if root.tag != 'hierarchy':
        raise ValueError('Expected Android UIAutomator hierarchy')
    nodes = list(root.iter('node'))
    visible = '\n'.join(str(node.attrib.get(k,'')) for node in nodes for k in ('text','content-desc')).lower()
    if any(word in visible for word in BAD):
        raise ValueError('System ANR or crash dialog is visible')
    if not any(node.attrib.get('package') == APP_ID for node in nodes):
        raise ValueError('No visible Basma application nodes')
    found = [marker for marker in MARKERS if marker.lower() in visible]
    if not found:
        raise ValueError('No Basma heading/project text in visible UI tree')
    return found

if __name__ == '__main__':
    if len(sys.argv) != 2:
        sys.exit('Usage: assert-app-ui.py android-ui.xml')
    try:
        found = check(sys.argv[1])
    except Exception as exc:
        print(f'FAIL: {exc}', file=sys.stderr)
        sys.exit(1)
    print('PASS: Basma content present in Android UI tree: '+', '.join(found))
