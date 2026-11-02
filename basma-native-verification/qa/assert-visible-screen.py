#!/usr/bin/env python3
"""Reject blank Android emulator screenshots without external dependencies."""
import struct
import sys
import zlib
from pathlib import Path

def inspect(path):
    data=Path(path).read_bytes()
    if not data.startswith(b'\x89PNG\r\n\x1a\n'):
        raise ValueError('Not a PNG')
    pos=8
    raw=bytearray()
    width=height=depth=mode=None
    while pos + 12 <= len(data):
        size=struct.unpack_from('>I',data,pos)[0]
        kind=data[pos+4:pos+8]
        chunk=data[pos+8:pos+8+size]
        if len(chunk)!=size:
            raise ValueError('Truncated PNG')
        pos+=size+12
        if kind==b'IHDR':
            width,height,depth,mode,comp,filtertype,interlace=struct.unpack('>IIBBBBB',chunk)
            if depth!=8 or mode not in (2,6) or interlace!=0:
                raise ValueError('Unsupported PNG format')
        elif kind==b'IDAT':
            raw.extend(chunk)
        elif kind==b'IEND':
            break
    if not width or not height or width*height>15_000_000:
        raise ValueError('Invalid PNG dimensions')
    bpp=3 if mode==2 else 4
    stride=width*bpp
    pixels=zlib.decompress(bytes(raw))
    if len(pixels)!=(stride+1)*height:
        raise ValueError('Unexpected raw PNG length')
    previous=bytearray(stride)
    offset=colored=total=0
    bins=set()
    for y in range(height):
        filt=pixels[offset];offset+=1
        row=bytearray(pixels[offset:offset+stride]);offset+=stride
        if filt>4:raise ValueError('Unsupported PNG filter')
        for i in range(stride):
            left=row[i-bpp] if i>=bpp else 0
            up=previous[i]
            ul=previous[i-bpp] if i>=bpp else 0
            if filt==1: pred=left
            elif filt==2: pred=up
            elif filt==3: pred=(left+up)//2
            elif filt==4:
                p=left+up-ul
                a,b,c=abs(p-left),abs(p-up),abs(p-ul)
                pred=left if a<=b and a<=c else up if b<=c else ul
            else: pred=0
            row[i]=(row[i]+pred)&255
        if y%3==0:
            for x in range(0,width,3):
                i=x*bpp
                rgb=tuple(row[i:i+3])
                colored+=int(max(rgb)<240 or min(rgb)<225)
                bins.add(tuple(c//32 for c in rgb))
                total+=1
        previous=row
    ratio=colored/max(total,1)
    return width,height,ratio,len(bins)

def main():
    if len(sys.argv)!=2:
        print('Usage: assert-visible-screen.py screenshot.png',file=sys.stderr)
        return 2
    try:
        width,height,ratio,bins=inspect(sys.argv[1])
    except Exception as exc:
        print(f'PNG validation failed: {exc}',file=sys.stderr)
        return 1
    print(f'Emulator screenshot {width}x{height}: colored={ratio:.1%}, color bins={bins}')
    if ratio<0.05 or bins<7:
        print('FAIL: app screenshot is blank or almost solid-colored',file=sys.stderr)
        return 1
    print('PASS: visible nonblank frame; this does not prove full app correctness')
    return 0

if __name__=='__main__':
    sys.exit(main())
