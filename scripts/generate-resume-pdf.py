#!/usr/bin/env python3
"""Generate a one-page, searchable HAJAR résumé PDF from verified portfolio facts.

Dependency: reportlab>=4.2,<5 (free, open-source).
This script never reads user data, credentials, the network or production settings.
"""
from pathlib import Path
from reportlab.lib import colors
from reportlab.lib.enums import TA_LEFT
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle
from reportlab.pdfbase.pdfmetrics import stringWidth
from reportlab.pdfgen import canvas
from reportlab.platypus import Paragraph

OUTPUT = Path('public/Abdulrahman-Hajar-Resume.pdf')
NAME = 'Abdulrahman Hajar'
ROLE = 'COMPUTER ENGINEER  /  FULL-STACK DEVELOPER  /  SOFTWARE ENGINEER'
SITE = 'https://abdulrahman-hajar-portfolio.onrender.com'
GITHUB = 'https://github.com/rahman-997'
LINKEDIN = 'https://www.linkedin.com/in/abdulrahman-hajjar-5430281a1/'
DARK = colors.HexColor('#111E20')
ACCENT = colors.HexColor('#236B61')
MUTED = colors.HexColor('#475C60')
RULE = colors.HexColor('#D6E0DD')
PAPER = colors.white
LIGHT = colors.HexColor('#F1F6F4')

body = ParagraphStyle('body', fontName='Helvetica', fontSize=9.7, leading=15, textColor=DARK, spaceAfter=0, alignment=TA_LEFT)
small = ParagraphStyle('small', parent=body, fontSize=8.6, leading=13)
cardbody = ParagraphStyle('cardbody', parent=body, fontSize=8.6, leading=13)


def draw_paragraph(pdf, text, x, top, width, style):
    para = Paragraph(text, style)
    _, height = para.wrap(width, 1000)
    para.drawOn(pdf, x, top - height)
    return top - height


def section(pdf, label, y, x, width):
    pdf.setFillColor(ACCENT)
    pdf.setFont('Helvetica-Bold', 9)
    pdf.drawString(x, y, label.upper())
    pdf.setStrokeColor(RULE)
    pdf.setLineWidth(0.75)
    pdf.line(x, y - 8, x + width, y - 8)
    return y - 23


def project_card(pdf, x, top, width, title, eyebrow, summary):
    pdf.setFillColor(LIGHT)
    pdf.roundRect(x, top - 114, width, 106, 8, stroke=0, fill=1)
    pdf.setFillColor(ACCENT)
    pdf.setFont('Helvetica-Bold', 7.6)
    pdf.drawString(x + 13, top - 21, eyebrow.upper())
    pdf.setFillColor(DARK)
    pdf.setFont('Helvetica-Bold', 12)
    pdf.drawString(x + 13, top - 40, title)
    bottom = draw_paragraph(pdf, summary, x + 13, top - 49, width - 26, cardbody)
    if bottom < top - 103:
        raise ValueError(f'Project card text overflow: {title}')


def generate(path=OUTPUT):
    path = Path(path)
    path.parent.mkdir(parents=True, exist_ok=True)
    width, height = A4
    pdf = canvas.Canvas(str(path), pagesize=A4, pageCompression=1, invariant=1)
    pdf.setTitle('Abdulrahman Hajar - Computer Engineer Resume')
    pdf.setAuthor(NAME)
    pdf.setSubject('Computer Engineer - Full-Stack Developer - Software Engineer')
    pdf.setKeywords('Computer Engineer, Software Engineer, Full-Stack Developer, TypeScript, React, Next.js, Node.js, PostgreSQL, CI/CD')
    x, right = 46, width - 46
    colw = right - x

    # Header is compact, high-contrast and easily machine-readable.
    pdf.setFillColor(ACCENT)
    pdf.rect(0, height - 8, width, 8, stroke=0, fill=1)
    pdf.setFont('Helvetica-Bold', 9)
    pdf.drawString(x, height - 43, 'HAJAR  /  ENGINEERING PORTFOLIO')
    pdf.setFillColor(DARK)
    pdf.setFont('Helvetica-Bold', 29)
    pdf.drawString(x, height - 82, NAME)
    pdf.setFont('Helvetica-Bold', 10)
    pdf.drawString(x, height - 107, ROLE)
    pdf.setFillColor(MUTED)
    pdf.setFont('Helvetica', 9.2)
    pdf.drawString(x, height - 131, 'Istanbul, Turkiye   |   github.com/rahman-997')
    pdf.linkURL(GITHUB, (x+148, height-135, x+290, height-122), relative=0)
    pdf.drawString(x, height - 147, 'abdulrahman-hajar-portfolio.onrender.com   |   LinkedIn profile')
    pdf.linkURL(SITE, (x, height-151, x+264, height-138), relative=0)
    pdf.linkURL(LINKEDIN, (x+278, height-151, x+385, height-138), relative=0)
    pdf.setStrokeColor(ACCENT)
    pdf.setLineWidth(1.4)
    pdf.line(x, height - 164, right, height - 164)

    y = section(pdf, 'Profile', height-184, x, colw)
    y = draw_paragraph(pdf,
        'Computer engineer and full-stack developer focused on building dependable products. I work across React/Next.js '
        'interfaces, TypeScript/Node.js APIs, SQL and document databases, asynchronous processing, AI integrations, '
        'security, observability, accessibility and automated delivery. I value maintainable architecture, clear failure '
        'handling, and evidence-backed engineering.', x, y, colw, body) - 14

    y = section(pdf, 'Education', y, x, colw)
    pdf.setFillColor(DARK)
    pdf.setFont('Helvetica-Bold', 10.4)
    pdf.drawString(x, y, 'Computer Engineering')
    pdf.setFillColor(MUTED)
    pdf.setFont('Helvetica', 9)
    pdf.drawRightString(right, y, 'Nisantasi University  |  Istanbul, Turkiye')
    y -= 30

    y = section(pdf, 'Technical capabilities', y, x, colw)
    skillrows = [
        ('Engineering', 'TypeScript, JavaScript, React, Next.js, Node.js, Express 5, REST APIs, Zod'),
        ('Data & async', 'PostgreSQL, Prisma, MongoDB, Mongoose, Redis, BullMQ'),
        ('Quality', 'Jest, Supertest, GitHub Actions, CI/CD, Security, Observability, WCAG, PWA'),
        ('Extended', 'AI / LLM / MCP, Docker, FastAPI, Flutter, GraphQL, WebSockets, gRPC'),
    ]
    for label, words in skillrows:
        pdf.setFont('Helvetica-Bold', 9)
        pdf.setFillColor(DARK)
        pdf.drawString(x, y, label)
        pdf.setFillColor(MUTED)
        pdf.setFont('Helvetica', 8.75)
        if stringWidth(words, 'Helvetica', 8.75) > colw-114:
            raise ValueError(f'Skills line overflow: {label}')
        pdf.drawString(x+114, y, words)
        y -= 18
    y -= 10

    y = section(pdf, 'Selected engineering work', y, x, colw)
    gutter = 13
    cardw = (colw-gutter)/2
    project_card(pdf, x, y, cardw, 'Eventify', 'Distributed event platform',
        'Express/TypeScript + PostgreSQL/Prisma, Redis and BullMQ. Bookings, waitlists, durable outbox workflows, health checks and security CI.')
    project_card(pdf, x+cardw+gutter, y, cardw, 'BookHaven', 'Full-stack commerce',
        'Next.js + Express + MongoDB commerce with sessions, RBAC, inventory safeguards, validation and CI-backed delivery.')
    y -= 116
    project_card(pdf, x, y, cardw, 'FitFlow', 'Installable fitness PWA',
        'Responsive training interface with personalised plans, guided intervals, progress tracking, accessibility and offline-ready patterns.')
    project_card(pdf, x+cardw+gutter, y, cardw, 'Venues API', 'Backend REST service',
        'Express 5 + TypeScript + Zod API: validation, controllers/services, centralised errors, persistence and HTTP contracts.')
    y -= 132

    y = section(pdf, 'Engineering focus', y, x, colw)
    y = draw_paragraph(pdf,
        'Backend systems, data reliability, queues and asynchronous workflows; full-stack architecture; '
        'security, automated tests, accessibility, CI/CD, production observability and AI integrations.',
        x, y, colw, body)

    if y < 68:
        raise ValueError(f'Content overlaps footer at y={y:.1f}')
    pdf.setStrokeColor(RULE)
    pdf.line(x, 50, right, 50)
    pdf.setFillColor(MUTED)
    pdf.setFont('Helvetica', 8)
    pdf.drawString(x, 36, 'Abdulrahman Hajar  /  Computer Engineer  /  Full-Stack Developer')
    pdf.drawRightString(right, 36, 'Istanbul, Turkiye')
    pdf.showPage()
    pdf.save()
    return path


if __name__ == '__main__':
    print(generate())
