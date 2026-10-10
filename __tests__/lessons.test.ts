import fs from "fs";
import path from "path";

const LESSONS_DIR = path.join(__dirname, "../content/lessons");

interface Command {
  command: string;
  description: string;
  expectedOutput: string;
  safety: string;
  troubleshooting: string | null;
  legalNote: string | null;
}

interface Lesson {
  id: number;
  slug: string;
  title: string;
  module: number;
  moduleName: string;
  difficulty: string;
  objective: string;
  legalWarning: string | null;
  explanation: string;
  commands: Command[];
  challenge: { question: string; hint: string; answer: string };
  realWorld: string;
  funFact: string;
}

function loadAllLessons(): Lesson[] {
  return fs
    .readdirSync(LESSONS_DIR)
    .filter((f) => f.endsWith(".json"))
    .sort()
    .map((f) => JSON.parse(fs.readFileSync(path.join(LESSONS_DIR, f), "utf-8")));
}

describe("Lesson content validation", () => {
  const lessons = loadAllLessons();

  test("at least 24 lessons exist", () => {
    expect(lessons.length).toBeGreaterThanOrEqual(24);
  });

  test("lessons cover all 6 modules", () => {
    const modules = new Set(lessons.map((l) => l.module));
    expect(modules.size).toBe(6);
    [1, 2, 3, 4, 5, 6].forEach((m) => expect(modules.has(m)).toBe(true));
  });

  test("lesson IDs are unique and sequential", () => {
    const ids = lessons.map((l) => l.id).sort((a, b) => a - b);
    expect(new Set(ids).size).toBe(ids.length);
    expect(ids[0]).toBe(1);
    expect(ids[ids.length - 1]).toBe(ids.length);
  });

  test("each lesson has required fields", () => {
    lessons.forEach((l) => {
      expect(l.title).toBeTruthy();
      expect(l.slug).toBeTruthy();
      expect(l.objective).toBeTruthy();
      expect(["Script Kiddie", "Apprentice", "Hacker"]).toContain(l.difficulty);
      expect(l.module).toBeGreaterThanOrEqual(1);
      expect(l.module).toBeLessThanOrEqual(6);
    });
  });

  test("each lesson explanation is 200-500 words", () => {
    lessons.forEach((l) => {
      const words = l.explanation.split(/\s+/).length;
      expect(words).toBeGreaterThanOrEqual(200);
      expect(words).toBeLessThanOrEqual(500);
    });
  });

  test("each lesson has 3-8 commands", () => {
    lessons.forEach((l) => {
      expect(l.commands.length).toBeGreaterThanOrEqual(3);
      expect(l.commands.length).toBeLessThanOrEqual(8);
    });
  });

  test("every command has safety label", () => {
    lessons.forEach((l) => {
      l.commands.forEach((c) => {
        expect(["safe", "active", "restricted"]).toContain(c.safety);
      });
    });
  });

  test("restricted commands have legalNote", () => {
    lessons.forEach((l) => {
      l.commands.forEach((c) => {
        if (c.safety === "restricted") {
          expect(c.legalNote).toBeTruthy();
        }
      });
    });
  });

  test("modules 3-5 lessons have legalWarning", () => {
    lessons
      .filter((l) => l.module >= 3 && l.module <= 5)
      .forEach((l) => {
        expect(l.legalWarning).toBeTruthy();
      });
  });

  test("each lesson has realWorld and funFact", () => {
    lessons.forEach((l) => {
      expect(l.realWorld).toBeTruthy();
      expect(l.realWorld.length).toBeGreaterThan(20);
      expect(l.funFact).toBeTruthy();
      expect(l.funFact.length).toBeGreaterThan(20);
    });
  });

  test("each lesson has a challenge", () => {
    lessons.forEach((l) => {
      expect(l.challenge.question).toBeTruthy();
      expect(l.challenge.hint).toBeTruthy();
      expect(l.challenge.answer).toBeTruthy();
    });
  });

  test("at least 50% of commands have troubleshooting tips", () => {
    const allCmds = lessons.flatMap((l) => l.commands);
    const withTips = allCmds.filter((c) => c.troubleshooting);
    expect(withTips.length / allCmds.length).toBeGreaterThanOrEqual(0.5);
  });

  test("slugs are unique", () => {
    const slugs = lessons.map((l) => l.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });
});

describe("Progress & Gamification", () => {
  const XP_PER_LESSON = 10;
  const XP_PER_CHALLENGE = 25;
  const XP_PER_MODULE = 50;

  test("full completion = 1140 XP", () => {
    // 24×10 + 24×25 + 6×50 = 240 + 600 + 300 = 1140
    const xp = 24 * XP_PER_LESSON + 24 * XP_PER_CHALLENGE + 6 * XP_PER_MODULE;
    expect(xp).toBe(1140);
  });
});
