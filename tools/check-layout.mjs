/*
 * Layout regression check.
 *
 * The structural checks used until now — landmarks, partial injection, absence
 * of horizontal scroll, console errors — all passed while the footer was visibly
 * broken, because an invalid CSS declaration fails SILENTLY. Nothing throws,
 * nothing logs, the browser simply discards the rule and carries on.
 *
 * So this asserts geometry and computed style, which is the only thing that can
 * see a dropped declaration.
 *
 * Usage:
 *   python3 -m http.server 8877 --directory docs &
 *   node tools/check-layout.mjs [baseUrl]
 */
import { chromium } from "playwright";

const BASE = process.argv[2] || "http://localhost:8877";
const CHROME = process.env.CHROME_PATH
    || "/opt/pw-browsers/chromium-1194/chrome-linux/chrome";

const PAGES = ["/", "/mcreport/", "/mctrade/"];
let failures = 0;

function check(label, ok, detail) {
    console.log(`  ${ok ? "PASS" : "FAIL"}  ${label}${detail ? ` — ${detail}` : ""}`);
    if (!ok) failures += 1;
}

/**
 * Removes a balanced `repeat(...)` call, so the surrounding track list can be
 * inspected on its own.
 *
 * @param {string} value A grid-template-columns/rows value.
 * @returns {string} The value with every repeat() call removed.
 */
function stripRepeats(value) {
    let out = "";
    let i = 0;
    while (i < value.length) {
        const at = value.indexOf("repeat(", i);
        if (at === -1) {
            out += value.slice(i);
            break;
        }
        out += value.slice(i, at);
        let depth = 0;
        let j = at + "repeat".length;
        for (; j < value.length; j += 1) {
            if (value[j] === "(") depth += 1;
            else if (value[j] === ")") {
                depth -= 1;
                if (depth === 0) { j += 1; break; }
            }
        }
        i = j;
    }
    return out;
}

/**
 * Flags the exact mistake that stacked the footer: an auto-repeat combined with
 * a flexible or intrinsic track ELSEWHERE in the same list. Such a track list is
 * invalid and the browser drops the whole declaration silently.
 *
 * `repeat(auto-fill, minmax(248px, 1fr))` on its own is valid and must not be
 * flagged — the `fr` there is inside the repeat, which is the normal responsive
 * grid idiom.
 */
function auditStylesheets(cssTexts) {
    const offenders = [];
    for (const { file, text } of cssTexts) {
        const rules = text.match(/grid-template-(?:columns|rows)\s*:[^;}]+/g) || [];
        for (const rule of rules) {
            if (!/auto-fit|auto-fill/.test(rule)) continue;
            const outside = stripRepeats(rule.split(":").slice(1).join(":"));
            if (/\d*\.?\d+fr|\bmin-content\b|\bmax-content\b|\bauto\b/.test(outside)) {
                offenders.push(`${file}: ${rule.trim()}`);
            }
        }
    }
    return offenders;
}

const browser = await chromium.launch({ executablePath: CHROME });

// --- static audit -----------------------------------------------------------
const files = ["css/main.css", "css/shared/layout.css", "css/shared/components.css"];
const cssTexts = [];
for (const f of files) {
    const res = await fetch(`${BASE}/${f}`);
    cssTexts.push({ file: f, text: await res.text() });
}
console.log("Stylesheet audit");
const offenders = auditStylesheets(cssTexts);
check("no auto-repeat combined with fr in a track list", offenders.length === 0,
    offenders.join(" | "));

// --- rendered geometry ------------------------------------------------------
for (const path of PAGES) {
    console.log(`\n${path}`);

    // desktop: footer must be one row
    const wide = await browser.newPage({ viewport: { width: 1280, height: 900 } });
    await wide.goto(BASE + path, { waitUntil: "networkidle" });
    const desk = await wide.evaluate(() => {
        const inner = document.querySelector(".site-footer__inner");
        if (!inner) return null;
        const kids = [...inner.children];
        return {
            count: kids.length,
            rows: new Set(kids.map((c) => Math.round(c.getBoundingClientRect().y))).size,
            hscroll: document.documentElement.scrollWidth
                > document.documentElement.clientWidth,
        };
    });
    check("footer renders", desk !== null);
    if (desk) {
        check("footer is one row at 1280px", desk.rows === 1,
            `${desk.count} children across ${desk.rows} row(s)`);
        check("no horizontal page scroll at 1280px", !desk.hscroll);
    }
    await wide.close();

    // mobile: stacks, and no dead space from a basis on the wrong axis
    const narrow = await browser.newPage({ viewport: { width: 390, height: 780 } });
    await narrow.goto(BASE + path, { waitUntil: "networkidle" });
    const mob = await narrow.evaluate(() => {
        const inner = document.querySelector(".site-footer__inner");
        const kids = [...inner.children];
        const boxes = kids.map((c) => c.getBoundingClientRect());
        let maxGap = 0;
        for (let i = 1; i < boxes.length; i += 1) {
            maxGap = Math.max(maxGap, boxes[i].top - boxes[i - 1].bottom);
        }
        return {
            rows: new Set(boxes.map((b) => Math.round(b.y))).size,
            maxGap: Math.round(maxGap),
            hscroll: document.documentElement.scrollWidth
                > document.documentElement.clientWidth,
        };
    });
    check("footer stacks at 390px", mob.rows === 3, `${mob.rows} row(s)`);
    check("no dead space between footer blocks", mob.maxGap < 60,
        `largest gap ${mob.maxGap}px`);
    check("no horizontal page scroll at 390px", !mob.hscroll);
    await narrow.close();
}

await browser.close();
console.log(`\n${failures === 0 ? "All layout checks passed." : `${failures} check(s) failed.`}`);
process.exit(failures === 0 ? 0 : 1);
