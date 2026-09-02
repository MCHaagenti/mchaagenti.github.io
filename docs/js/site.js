/*
 * Silver Glass — runtime include loader.
 *
 * Injects the shared header and footer so navigation lives in one file and every
 * page stays in sync. Each page sets two globals in <head> before loading this:
 *
 *   window.SITE_ROOT    relative path back to the site root ("" at the root,
 *                       "../" one level down)
 *   window.PAGE_SECTION  matched against data-section to highlight the active link
 *
 * Because this uses fetch(), the site must be served over HTTP. Opening a page
 * from the filesystem leaves the header and footer empty.
 */
(function () {
    "use strict";

    // The documented contract is "" at the site root. Normalized to "./" here so a
    // substituted link is never the empty string, which resolves to the current
    // page rather than reading as a path.
    var ROOT = typeof window.SITE_ROOT === "string" ? window.SITE_ROOT : "";
    if (ROOT === "") {
        ROOT = "./";
    }
    var SECTION = window.PAGE_SECTION || "";

    /**
     * Fetches a partial and writes it into its mount point.
     *
     * @param {string} name  Partial file name, without the extension.
     * @param {string} mount Element id to fill.
     * @returns {Promise<boolean>} Whether the partial was injected.
     */
    function inject(name, mount) {
        var host = document.getElementById(mount);
        if (!host) {
            return Promise.resolve(false);
        }
        return fetch(ROOT + "partials/" + name + ".html")
            .then(function (res) {
                if (!res.ok) {
                    throw new Error("HTTP " + res.status);
                }
                return res.text();
            })
            .then(function (html) {
                // Internal links in a partial are written as {{ROOT}}/... so one
                // file works at every depth.
                host.innerHTML = html.split("{{ROOT}}").join(ROOT);
                return true;
            })
            .catch(function (err) {
                // A missing partial must not take the page down with it.
                if (window.console && console.warn) {
                    console.warn("site.js: could not load " + name + " — " + err.message);
                }
                return false;
            });
    }

    /**
     * Marks the nav link whose data-section matches this page.
     */
    function markActive() {
        if (!SECTION) {
            return;
        }
        var links = document.querySelectorAll("#site-header [data-section]");
        Array.prototype.forEach.call(links, function (el) {
            if (el.getAttribute("data-section") === SECTION) {
                el.classList.add("is-active");
                el.setAttribute("aria-current", "page");
            }
        });
    }

    /**
     * Wires the mobile menu button to the link list.
     */
    function wireToggle() {
        var btn = document.querySelector(".nav__toggle");
        var list = document.getElementById("nav-links");
        if (!btn || !list) {
            return;
        }
        btn.addEventListener("click", function () {
            var open = list.classList.toggle("is-open");
            btn.setAttribute("aria-expanded", open ? "true" : "false");
        });
    }

    /**
     * Stamps the current year wherever the footer asks for it.
     */
    function stampYear() {
        var slots = document.querySelectorAll("[data-year]");
        var year = String(new Date().getFullYear());
        Array.prototype.forEach.call(slots, function (el) {
            el.textContent = year;
        });
    }

    /**
     * Adds an inline favicon so the site makes no network request for one.
     */
    function injectFavicon() {
        if (document.querySelector('link[rel="icon"]')) {
            return;
        }
        var svg = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">'
            + '<rect width="32" height="32" rx="9" fill="#78859a"/>'
            + '<text x="16" y="22" font-family="sans-serif" font-size="16"'
            + ' font-weight="700" fill="#ffffff" text-anchor="middle">M</text></svg>';
        var link = document.createElement("link");
        link.rel = "icon";
        link.type = "image/svg+xml";
        link.href = "data:image/svg+xml," + encodeURIComponent(svg);
        document.head.appendChild(link);
    }

    function start() {
        injectFavicon();
        inject("header", "site-header").then(function (ok) {
            if (ok) {
                markActive();
                wireToggle();
            }
        });
        inject("footer", "site-footer").then(function (ok) {
            if (ok) {
                stampYear();
            }
        });
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", start);
    } else {
        start();
    }
})();
