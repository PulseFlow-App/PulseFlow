#!/usr/bin/env python3
"""Build /en and /ru static trees with inlined copy, hreflang, locale canonicals (S1–S3).

Edit unprefixed English pages, then run:
  python3 scripts/build-locale-sites.py
"""

from __future__ import annotations

import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
ORIGIN = "https://www.pulseflow.site"
BUILD_LOCALES = ["en", "ru", "th", "my", "fr", "de", "es", "it", "he", "ar"]

PAGES = [
    ("", "index.html"),
    ("owners", "index.html"),
    ("managers", "index.html"),
    ("staff", "index.html"),
    ("guests", "index.html"),
    ("terms", "index.html"),
    ("privacy", "index.html"),
]
SITE_PATHS = ["", "owners", "managers", "staff", "guests", "terms", "privacy"]

LOCALE_META = {
    "en": {"dir": "ltr", "og": "en_US"},
    "ru": {"dir": "ltr", "og": "ru_RU"},
    "th": {"dir": "ltr", "og": "th_TH"},
    "my": {"dir": "ltr", "og": "my_MM"},
    "fr": {"dir": "ltr", "og": "fr_FR"},
    "de": {"dir": "ltr", "og": "de_DE"},
    "es": {"dir": "ltr", "og": "es_ES"},
    "it": {"dir": "ltr", "og": "it_IT"},
    "he": {"dir": "rtl", "og": "he_IL"},
    "ar": {"dir": "rtl", "og": "ar_SA"},
}
VOID = {
    "img",
    "meta",
    "link",
    "br",
    "hr",
    "input",
    "source",
    "area",
    "col",
    "embed",
    "wbr",
}


def lookup(dict_obj, key: str):
    cur = dict_obj
    for part in key.split("."):
        if not isinstance(cur, dict) or part not in cur:
            return None
        cur = cur[part]
    return cur if isinstance(cur, str) else None


def load_dicts():
    return {
        loc: json.loads((ROOT / "i18n" / f"{loc}.json").read_text(encoding="utf-8"))
        for loc in BUILD_LOCALES
    }


def page_url(locale: str, slug: str) -> str:
    path = f"/{slug}" if slug else "/"
    if locale == "en":
        return ORIGIN + (path if path != "/" else "/")
    return ORIGIN + f"/{locale}" + ("" if path == "/" else path)


def replace_leaf_i18n(html: str, dictionary: dict, fallback: dict) -> str:
    def val(key: str):
        return lookup(dictionary, key) or lookup(fallback, key)

    def repl_attr(m: re.Match) -> str:
        tag = m.group(0)
        spec = m.group(1)
        for part in spec.split(","):
            part = part.strip()
            if ":" not in part:
                continue
            attr, key = part.split(":", 1)
            text = val(key)
            if text is None:
                continue
            safe = (
                text.replace("&", "&amp;")
                .replace('"', "&quot;")
                .replace("<", "&lt;")
            )
            if re.search(rf"\b{re.escape(attr)}=\"", tag):
                tag = re.sub(
                    rf'\b{re.escape(attr)}="[^"]*"',
                    f'{attr}="{safe}"',
                    tag,
                    count=1,
                )
            elif tag.endswith("/>"):
                tag = tag[:-2] + f' {attr}="{safe}" />'
            elif tag.endswith(">"):
                tag = tag[:-1] + f' {attr}="{safe}">'
        return tag

    html = re.sub(r'<[^>]+data-i18n-attr="([^"]+)"[^>]*>', repl_attr, html)

    out: list[str] = []
    i = 0
    open_re = re.compile(
        r'<([a-zA-Z][\w:-]*)([^>]*\sdata-i18n="([^"]+)"[^>]*)>', re.S
    )
    while True:
        m = open_re.search(html, i)
        if not m:
            out.append(html[i:])
            break
        tag, attrs, key = m.group(1), m.group(2), m.group(3)
        out.append(html[i : m.start()])
        open_end = m.end()
        tag_l = tag.lower()
        text = val(key)
        if tag_l in VOID or attrs.rstrip().endswith("/"):
            out.append(html[m.start() : open_end])
            i = open_end
            continue
        depth = 1
        pos = open_end
        scanner = re.compile(rf"<{tag}(\s[^>]*)?>|</{tag}>", re.I)
        close_at = close_end = None
        while depth and pos < len(html):
            cm = scanner.search(html, pos)
            if not cm:
                break
            token = cm.group(0)
            if token.lower().startswith(f"</{tag_l}"):
                depth -= 1
                if depth == 0:
                    close_at = cm.start()
                    close_end = cm.end()
                    break
            elif not token.endswith("/>"):
                depth += 1
            pos = cm.end()
        if close_at is None or text is None:
            out.append(html[m.start() : open_end])
            i = open_end
            continue
        inner = html[open_end:close_at]
        if "data-i18n=" in inner:
            out.append(html[m.start() : close_end])
            i = close_end
            continue
        out.append(html[m.start() : open_end])
        out.append(text)
        out.append(html[close_at:close_end])
        i = close_end
    return "".join(out)


def strip_hreflang(html: str) -> str:
    return re.sub(
        r'\n?\s*<link rel="alternate" hreflang="[^"]+" href="[^"]+"\s*/?>',
        "",
        html,
    )


def hreflang_block(slug: str) -> str:
    lines = [
        f'    <link rel="alternate" hreflang="{loc}" href="{page_url(loc, slug)}" />'
        for loc in BUILD_LOCALES
    ]
    lines.append(
        f'    <link rel="alternate" hreflang="x-default" href="{page_url("en", slug)}" />'
    )
    return "\n".join(lines)


def set_html_lang(html: str, locale: str) -> str:
    meta = LOCALE_META[locale]
    return re.sub(
        r"<html\b[^>]*>",
        f'<html lang="{locale}" dir="{meta["dir"]}" translate="no">',
        html,
        count=1,
    )


def set_canonical_og(html: str, locale: str, slug: str) -> str:
    canon = page_url(locale, slug)
    html = re.sub(
        r'<link rel="canonical" href="[^"]+"\s*/?>',
        f'<link rel="canonical" href="{canon}" />',
        html,
        count=1,
    )
    html = re.sub(
        r'<meta property="og:url" content="[^"]+"\s*/?>',
        f'<meta property="og:url" content="{canon}" />',
        html,
        count=1,
    )
    og = LOCALE_META[locale]["og"]
    html = re.sub(r'\n?\s*<meta property="og:locale"[^>]*>', "", html)
    html = re.sub(r'\n?\s*<meta property="og:locale:alternate"[^>]*>', "", html)
    insert = f'    <meta property="og:locale" content="{og}" />\n'
    for loc in BUILD_LOCALES:
        if loc == locale:
            continue
        insert += (
            f'    <meta property="og:locale:alternate" '
            f'content="{LOCALE_META[loc]["og"]}" />\n'
        )
    html = html.replace(
        '<meta property="og:type" content="website" />',
        '<meta property="og:type" content="website" />\n' + insert,
        1,
    )
    return html


def inject_hreflang(html: str, slug: str) -> str:
    html = strip_hreflang(html)
    block = hreflang_block(slug)
    return re.sub(
        r'(<link rel="canonical" href="[^"]+"\s*/?>)',
        r"\1\n" + block,
        html,
        count=1,
    )


def prefix_links(html: str, locale: str) -> str:
    if locale == "en":
        return html
    prefix = f"/{locale}"

    def fix(href: str) -> str:
        if href.startswith(
            (
                "http",
                "mailto:",
                "#",
                "/assets",
                "/i18n",
                "/styles",
                "/script",
                "/favicon",
                "/icons",
                "/robots",
            )
        ):
            return href
        if (
            href.startswith(prefix + "/")
            or href == prefix
            or href.startswith(prefix + "#")
        ):
            return href
        if href.startswith("/en/") or href == "/en":
            return prefix + href[3:]
        if href == "/":
            return prefix + "/"
        if href.startswith("/#"):
            return prefix + "/" + href[1:]
        if href.startswith("/"):
            return prefix + href
        return href

    return re.sub(
        r'href="(/[^"]*)"', lambda m: f'href="{fix(m.group(1))}"', html
    )


def process(html: str, locale: str, slug: str, dicts: dict) -> str:
    html = set_html_lang(html, locale)
    html = set_canonical_og(html, locale, slug)
    html = inject_hreflang(html, slug)
    html = replace_leaf_i18n(html, dicts[locale], dicts["en"])
    html = prefix_links(html, locale)
    html = re.sub(
        r'"inLanguage":\s*"(?:en|ru)"', f'"inLanguage": "{locale}"', html
    )
    return html


def write_sitemap() -> None:
    parts = [
        '<?xml version="1.0" encoding="UTF-8"?>',
        '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"',
        '        xmlns:xhtml="http://www.w3.org/1999/xhtml">',
    ]
    for slug in SITE_PATHS:
        for loc in BUILD_LOCALES:
            parts.append("  <url>")
            parts.append(f"    <loc>{page_url(loc, slug)}</loc>")
            for alt in BUILD_LOCALES:
                parts.append(
                    f'    <xhtml:link rel="alternate" hreflang="{alt}" '
                    f'href="{page_url(alt, slug)}" />'
                )
            parts.append(
                f'    <xhtml:link rel="alternate" hreflang="x-default" '
                f'href="{page_url("en", slug)}" />'
            )
            cf = (
                "weekly"
                if not slug
                else ("yearly" if slug in ("terms", "privacy") else "monthly")
            )
            pri = {
                "": "1.0",
                "owners": "0.9",
                "managers": "0.9",
                "staff": "0.9",
                "guests": "0.8",
                "terms": "0.3",
                "privacy": "0.3",
            }[slug]
            parts.append(f"    <changefreq>{cf}</changefreq>")
            parts.append(f"    <priority>{pri}</priority>")
            parts.append("  </url>")
    parts.append("</urlset>")
    (ROOT / "sitemap.xml").write_text("\n".join(parts) + "\n", encoding="utf-8")


def main() -> None:
    dicts = load_dicts()
    # Normalize unprefixed EN sources, then emit /en and /ru mirrors
    for slug, filename in PAGES:
        path = ROOT / filename if not slug else ROOT / slug / filename
        html = process(path.read_text(encoding="utf-8"), "en", slug, dicts)
        path.write_text(html, encoding="utf-8")
        print("root", path.relative_to(ROOT))

    for locale in BUILD_LOCALES:
        for slug, filename in PAGES:
            src = ROOT / filename if not slug else ROOT / slug / filename
            html = process(src.read_text(encoding="utf-8"), locale, slug, dicts)
            out = (
                ROOT / locale / f"{slug}/index.html"
                if slug
                else ROOT / locale / "index.html"
            )
            out.parent.mkdir(parents=True, exist_ok=True)
            out.write_text(html, encoding="utf-8")
            print("wrote", out.relative_to(ROOT))

    write_sitemap()
    print("sitemap.xml updated")


if __name__ == "__main__":
    main()
