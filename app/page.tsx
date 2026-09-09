"use client"

import { useEffect, useState } from "react";
import Link from 'next/link'

// ---- Design tokens ----
// bg:      #0b0e0f  near-black, slightly warm (not pure #000)
// surface: #121617  panel / card background
// border:  #232b2d  hairline borders
// text:    #d7dbdb  primary text (soft off-white, not pure white)
// muted:   #74827f  secondary text / comments
// accent:  #e8a33d  amber — prompt symbol, links, cursor
// accent2: #5f9ea0  cool teal — visited/secondary accent
// mono:    "IBM Plex Mono" everywhere (single family, terminal genre justifies it)

const TAGLINE = "";

function useTypewriter(text: string, speed = 32, startDelay = 400) {
  const [out, setOut] = useState("");
  useEffect(() => {
    let i = 0;
    let interval: ReturnType<typeof setInterval>;
    const timeout = setTimeout(() => {
      interval = setInterval(() => {
        i += 1;
        setOut(text.slice(0, i));
        if (i >= text.length) clearInterval(interval);
      }, speed);
    }, startDelay);
    return () => {
      clearTimeout(timeout);
      clearInterval(interval);
    };
  }, [text, speed, startDelay]);
  return out;
}

export default function TerminalHome() {
  const typed = useTypewriter(TAGLINE);

  const navItems = [
    { label: "projects", href: "/projects" },
    { label: "blog", href: "/blog" },
    { label: "about", href: "/about" },
  ];

  return (
    <div
      className="min-h-screen w-full flex justify-center px-4 py-10 sm:py-16"
      style={{ background: "#0b0e0f", fontFamily: "'IBM Plex Mono', monospace" }}
    >
      <style>{`
        @keyframes blink { 0%, 49% { opacity: 1; } 50%, 100% { opacity: 0; } }
        .cursor { animation: blink 1s steps(1) infinite; }
        @media (prefers-reduced-motion: reduce) {
          .cursor { animation: none; opacity: 1; }
        }
        a.term-link { text-decoration: none; border-bottom: 1px solid transparent; }
        a.term-link:hover { border-bottom: 1px solid #e8a33d; }
        a.term-link:focus-visible, button.term-link:focus-visible {
          outline: 2px solid #e8a33d;
          outline-offset: 3px;
        }
      `}</style>

      <div className="w-full max-w-4xl">
        {/* nav, as a prompt line — no window chrome, sits directly on the page */}
        <div
          className="pb-4 mb-8 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm"
          style={{ borderBottom: "1px solid #232b2d", color: "#d7dbdb" }}
        >
          <span style={{ color: "#e8a33d" }}>home</span>
          <span style={{ color: "#74827f" }}>:</span>
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="term-link"
              style={{ color: "#d7dbdb" }}
            >
              {item.label}
            </a>
          ))}
        </div>

        {/* ---- Home page content ---- */}
        {/* hero */}
        <div className="mb-8">
          <p className="text-sm mb-2" style={{ color: "#74827f" }}>
            $ whoami
          </p>
          <h1
            className="text-2xl sm:text-3xl mb-3"
            style={{ color: "#d7dbdb", lineHeight: 1.3 }}
          >
            I'm Ahmad. I make things.
          </h1>
          <p className="text-sm sm:text-base" style={{ color: "#d7dbdb", minHeight: "1.5em" }}>
            <span style={{ color: "#5f9ea0" }}>&gt;</span> {typed}
            <span className="cursor" style={{ color: "#e8a33d" }}>
              _
            </span>

            

          </p>
        </div>

        {/* content row: text (left) + ascii art (right, own column so it can't overlap text) */}
        <div className="flex flex-col lg:flex-row lg:items-start gap-8">
          <div className="flex-1 min-w-0">

            {/* command-style teaser links into the rest of the site */}
            <div className="space-y-4 text-sm">

              <div>
                <span style={{ color: "#74827f" }}> </span>
                <span style={{ color: "#d7dbdb" }}> </span>
                <a style={{ color: "#af3b18" }}>
                  Featured projects:
                </a>

              </div>
              <div>
                <span style={{ color: "#74827f" }}>$ </span>
                <span style={{ color: "#d7dbdb" }}> </span>
                <a href="/projects/pyassistant" className="term-link" style={{ color: "#e8a33d" }}>
                  pyassistant
                </a>
                <p className="pl-4 mt-1" style={{ color: "#74827f" }}>
                  Daily python challenges alongside an AI assistant for small hints
                </p>
              </div>
              <div>
                <span style={{ color: "#74827f" }}>$ </span>
                <span style={{ color: "#d7dbdb" }}> </span>
                <a href="/projects/tcp-udp-benchmark-tool" className="term-link" style={{ color: "#e8a33d" }}>
                  TCP/UDP benchmark tool
                </a>
                <p className="pl-4 mt-1" style={{ color: "#74827f" }}>
                  a local, multi-client chatroom where a user could send a set number of packets using either TCP or UDP to measure packet loss and time to arrival.
                </p>
              </div>
              <div>
                <span style={{ color: "#74827f" }}>$ </span>
                <span style={{ color: "#d7dbdb" }}> </span>
                <a href="/projects/chess-stats-scraper" className="term-link" style={{ color: "#e8a33d" }}>
                  Custom scraper for chess.com stats
                </a>
                <p className="pl-4 mt-1" style={{ color: "#74827f" }}>
                  Scraper for stats and game fetching
                </p>
              </div>
              <div className="pt-1">
                <a href="/projects" className="term-link text-sm" style={{ color: "#5f9ea0" }}>
                  → see all projects
                </a>
              </div>
            </div>
          </div>

          {/* ascii art placeholder */}
          <div className="flex justify-center lg:justify-end shrink-0">
            <pre
              className="text-xs sm:text-sm rounded-sm w-full sm:w-1/2 lg:w-auto"
              style={{
                //border: "1px #2f3739",
                color: "#8a9694",
                //background: "#0e1213",
                padding: "0rem",
                margin: 0, //-100?
                whiteSpace: "pre",
                lineHeight: 1,
                letterSpacing: "normal",
                fontVariantLigatures: "none",
                fontFamily: "'IBM Plex Mono', monospace",
              }}
            >
{`
                               :@
                               :@@@@:
                            ::@@@@@@@@*:@@-::
                            :@@@:@@@@@@@@::@@@@::
                             :@+:=@@@@@@@@@:::@@@@:
                            ::*@@@@@@@@@@@@@@@-:@@@@:
                          =@@@@@@@@@@@@@@@@@@@@@%:@@@@:
                         :@@+@@@@@@@@@@@@@@@@@@@@@-:@@@:
                         :@@@@@@@@@@@@@@@@@@@@@@@@@@:@@@-
                       :@@@@@@@@@@@@@@@@@@@@@@@@@@@@@:@@@:
                      :@@@@@@*+++@@@@@@@@@@@@@@@@@@@@@:@@@:
                     -@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@:@@@:
                   :@@@@@@@@@@@@@@@@@@+@@@@@@@@@@@@@@@@@#@@:
                  :@@@@@@@@@@@@@@@@%+@@@@@@@@@@@@@@@@@@@-@@@:
                 :@@@@@@@@++++++%@@@@ @@@@@@@@@@@@@@@@@@@@@@:
                 :@@@@@@+@@           @@@@+@@@@@@@@@@@@@@@@@:
                  -@@@*@@            @@@*+@@@@@@@@@@@@@@@@@@:
                    -@@@            @@@+@@@@@@@@@@@@@@@@@@@@:
                                  @@@++@@@@@@@@@@@@@@@@@@@@@
                                 @@++@@@@@@@@@@@@@@@@@@@@@@:
                               @@++@@@@@@@@@@@@@@@@@@@@@@@@:
                             @@*+@@@@@@@@@@@@@@@@@@@@@@@@@-
                            @@+@@@@@@@@@@@@@@@@@@@@@@@@@@@
                          @@%+@@@@@@@@@@@@@@@@@@@@@@@@@@@:
                         @@%+@@@@@@@@@@@@@@@@@@@@@@@@@@@@
                        @@@+@@@@@@@@@@@@@@@@@@@@@@@@@@@@
                        @@++@@@@@@@@@@@@@@@@@@@@@@@@@@@+
                       @@@+%@@@@@@@@@@@@@@@@@@@@@@@@@@@
                       @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
                     @@++++++@@@@@@@@@@@@@@@+++++++++++@:
                     @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@:
                     @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@:
                        @@+@@@@@@@@@@@@@@@@@@@@@@@@@::
                        @@++@@@@@@@@@@@@@@@@@@@@@@@@::
                       @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@*:
                    @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@::
                   @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@-:
                @@@=========*****************+=============@@:
                @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@:
                @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@:

`}
            </pre>
          </div>
        </div>








        <p className="text-xs mt-10 text-center" style={{ color: "#3a4344" }}>
          Copyright © Gop 2026
        </p>
      </div>
    </div>
  );
}