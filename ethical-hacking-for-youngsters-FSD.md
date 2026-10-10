# Ethical Hacking for Youngsters - Functional Specification Document

**Status:** Ready for implementation  
**Methodology:** AICLP (AI Closed-Loop Programming)  
**Generated:** 2026-10-11  
**Tech Stack:** Next.js 14, TypeScript, Tailwind CSS, Remotion, Puppeteer (PDF)

---

## Executive Summary

A teenager sees Flipper Zero and CardPuter videos on YouTube and wants to learn "hacking." The parent has no idea how to help — or worse, worries the kid will get into trouble. This project delivers a safe, legal, educational platform that:

1. **Teaches cybersecurity fundamentals** — networking, WiFi, web security, social engineering, hardware hacking — all on the teen's own equipment and home network.
2. **Makes the legal boundaries crystal clear** — every lesson starts with what is legal vs. illegal, and why. Hacking other people's networks/devices is a crime. Period.
3. **Provides hands-on labs** — using free tools (Kali Linux VM, Wireshark, nmap) on their own home network, with step-by-step guidance and expected outputs.
4. **Explains defense first** — the goal is not "how to hack" but "how to protect yourself and your family." Attack techniques are taught only to understand what to defend against.
5. **Covers hardware hacking responsibly** — Flipper Zero, CardPuter, WiFi Pineapple concepts explained with clear "only on your own devices" rules.

**Target audience:** Teenagers (13-18) fascinated by hacking culture, with zero cybersecurity experience.  
**Language:** English.  
**Core principle:** "Learn to hack ethically so you can defend better."

---

## REQUIREMENT 1: Lesson Engine with Legal Warnings

**User Story:**  
As a teenager interested in hacking, I want step-by-step lessons with clear legal warnings and safety labels, so that I learn cybersecurity skills without accidentally breaking the law.

**Requirement:**  
System SHALL render lessons with:
- Title, difficulty badge (Script Kiddie / Apprentice / Hacker)
- Legal warning banner at the top of every lesson with attack techniques
- "Only on your own network/device" reminder on relevant commands
- Commands with safety labels: "safe" (passive/read-only), "active" (modifies your system), "restricted" (only on your own network, never on others)
- Expected output blocks, troubleshooting tips, copy buttons
- Challenge section with verification
- Progress tracking, XP, badges

**Falsifiable Test:**
```
Given: User opens lesson 8 (WiFi scanning)
When: Page renders
Then: Legal warning banner is visible at top
      Every nmap/airodump command has "restricted" safety label
      "Only on your own network" reminder is visible
      Copy buttons work on all commands
```

**Success Criterion:**
- Every lesson with attack techniques has a legal warning banner
- All 24+ lessons render without errors
- Commands labeled "restricted" show orange warning badge

---

## REQUIREMENT 2: Guided Real Lab Experience

**User Story:**  
As a teenager, I want to see exactly what each tool should output when I run it on my home network, with safety warnings and troubleshooting, so I can follow along on my own equipment.

**Requirement:**  
System SHALL display for each command:
- One-click copy button
- Expected output in terminal-styled block
- Safety label: "safe" | "active" | "restricted"
- Troubleshooting tip where applicable
- Legal context note for restricted commands

**Success Criterion:**
- Every command has a safety label
- At least 50% of commands have troubleshooting tips
- All "restricted" commands have a legal context note

---

## REQUIREMENT 3: Curriculum — 24 Lessons in 6 Modules

**Requirement:**  
System SHALL include 24 lessons in 6 modules:

| Module | Lessons | Topics |
|--------|---------|--------|
| 1. The Hacker Mindset | 1-4 | What is hacking (legal vs illegal), white/grey/black hat, famous hackers & consequences, setting up your lab (VM, Kali) |
| 2. Network Fundamentals | 5-8 | IP addresses & subnets, DNS & how the internet works, TCP/UDP & ports, Wireshark basics (capture your own traffic) |
| 3. Scanning & Reconnaissance | 9-12 | nmap basics (scan your own network), service detection, OS fingerprinting, vulnerability concepts (CVE, CVSS) |
| 4. WiFi & Wireless Security | 13-16 | How WiFi works (WPA2/WPA3), scanning WiFi with your own adapter, securing your home router, Flipper Zero & NFC/RFID basics |
| 5. Web & App Security | 17-20 | How websites work (HTTP, cookies, sessions), XSS explained (on your own test page), SQL injection explained (on your own test DB), password security & cracking concepts |
| 6. Defense & Privacy | 21-24 | Firewalls & network segmentation, VPN & encryption basics, social engineering & phishing defense, your digital footprint & OPSEC |

Each lesson SHALL contain:
- Objective (1 sentence)
- Legal notice (if attack technique involved)
- Explanation (200-500 words, age-appropriate)
- 3-8 commands/steps with expected output
- Safety labels on every command
- 1 challenge with verification
- "Real world" box — news story or example connecting to reality
- Fun/scary fact

**Success Criterion:**
- 24 lessons pass validation schema
- Every lesson in modules 3-5 has a legal warning
- Average Flesch-Kincaid readability ≤ 8th grade

---

## REQUIREMENT 4: PDF eBook Export

**Requirement:**  
Same as LinuxYoung REQ 4 — KDP-ready PDF, 6"x9", via Puppeteer.

---

## REQUIREMENT 5: Remotion Video Explainers

**Requirement:**  
At least 5 Remotion video compositions:
1. **How the Internet Works** — packet journey animation
2. **WiFi Handshake** — WPA2 4-way handshake visualization
3. **Port Scanning** — nmap scanning animation showing open/closed ports
4. **XSS Attack Flow** — how script injection works (and how to prevent it)
5. **Phishing Attack Flow** — email → fake page → credential theft → defense

---

## REQUIREMENT 6: Progress & Gamification

**Requirement:**  
Same structure as LinuxYoung but with hacking-themed badges:
- "First Scan" — complete first lesson
- "Network Ninja" — Module 2 complete
- "Recon Master" — Module 3 complete
- "WiFi Warrior" — Module 4 complete
- "Web Hacker" — Module 5 complete
- "Cyber Defender" — Module 6 complete
- "Bug Hunter" — 5 challenges solved
- "Exploit Expert" — all 24 challenges
- "XP Farmer" — 200+ XP
- "White Hat" — all 24 lessons complete

XP: +10/lesson, +25/challenge, +50/module

---

## Architecture

```
HackYoung/
├── content/lessons/          # 24 lesson JSON files
├── docs/                     # Market research, architecture
├── src/
│   ├── app/                  # Next.js App Router
│   │   ├── page.tsx          # Home / dashboard
│   │   ├── lesson/[id]/      # Lesson pages
│   │   ├── not-found.tsx     # Custom 404
│   │   ├── sitemap.ts        # SEO
│   │   └── layout.tsx        # Root layout
│   ├── components/
│   │   ├── LessonContent.tsx # Lesson renderer
│   │   ├── CommandCard.tsx   # Command with safety + legal context
│   │   ├── LegalBanner.tsx   # Legal warning component
│   │   ├── ProgressBar.tsx   # Progress tracker
│   │   ├── CopyButton.tsx    # Copy to clipboard
│   │   └── Badge.tsx         # Gamification badges
│   └── lib/
│       ├── progress.ts       # XP & badge tracking
│       └── lessons.ts        # Lesson loader
├── scripts/
│   └── validate-lessons.ts   # Lesson validator
├── __tests__/                # Jest test suites
├── .github/workflows/ci.yml  # GitHub Actions
├── public/robots.txt
└── package.json
```

---

## Notes

- **Legal disclaimer on every page** — "This content is for educational purposes only. Scanning, attacking, or accessing networks and devices you do not own is illegal."
- Each requirement is independent and testable
- No vague language
- Timeline: 3-4 weeks for MVP
- Phase 2: Remotion videos, PDF export, KDP submission
