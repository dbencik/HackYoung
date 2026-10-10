import fs from "fs";
import path from "path";

const LESSONS_DIR = path.join(__dirname, "../content/lessons");

interface LessonCommand {
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
  explanation: string;
  commands: LessonCommand[];
  challenge: { question: string; hint: string; answer: string };
  funFact: string;
  legalWarning: string | null;
  realWorld: string;
}

let errors = 0;

function error(msg: string) {
  console.error(`  x ${msg}`);
  errors++;
}

function ok(msg: string) {
  console.log(`  + ${msg}`);
}

const files = fs
  .readdirSync(LESSONS_DIR)
  .filter((f) => f.endsWith(".json"))
  .sort();

console.log(`Found ${files.length} lesson files\n`);

if (files.length < 24) {
  error(`Expected at least 24 lessons, found ${files.length}`);
}

const lessons: Lesson[] = [];

for (const file of files) {
  const filePath = path.join(LESSONS_DIR, file);
  let lesson: Lesson;

  try {
    lesson = JSON.parse(fs.readFileSync(filePath, "utf-8"));
  } catch (e) {
    error(`${file}: Invalid JSON -- ${e}`);
    continue;
  }

  console.log(`Lesson ${lesson.id}: ${lesson.title}`);

  if (!lesson.title) error(`${file}: Missing title`);
  if (!lesson.slug) error(`${file}: Missing slug`);
  if (![1, 2, 3, 4, 5, 6].includes(lesson.module)) error(`${file}: Invalid module ${lesson.module}`);
  if (!["Beginner", "Intermediate", "Advanced"].includes(lesson.difficulty))
    error(`${file}: Invalid difficulty "${lesson.difficulty}"`);

  const wordCount = lesson.explanation?.split(/\s+/).length || 0;
  if (wordCount < 200) error(`${file}: Explanation too short (${wordCount} words, need 200+)`);
  if (wordCount > 500) error(`${file}: Explanation too long (${wordCount} words, max 500)`);
  else ok(`Explanation: ${wordCount} words`);

  const cmdCount = lesson.commands?.length || 0;
  if (cmdCount < 3) error(`${file}: Too few commands (${cmdCount}, need 3+)`);
  else if (cmdCount > 8) error(`${file}: Too many commands (${cmdCount}, max 8)`);
  else ok(`Commands: ${cmdCount}`);

  if (!lesson.challenge?.question) error(`${file}: Missing challenge question`);
  if (!lesson.challenge?.answer) error(`${file}: Missing challenge answer`);
  if (!lesson.funFact) error(`${file}: Missing fun fact`);
  if (!lesson.realWorld) error(`${file}: Missing realWorld`);

  // Validate legalWarning for modules 3-5 (scanning, WiFi, web security)
  if ([3, 4, 5].includes(lesson.module) && !lesson.legalWarning) {
    error(`${file}: Module ${lesson.module} lessons must have legalWarning`);
  }

  // Validate legalNote on commands with restricted safety
  for (const cmd of lesson.commands || []) {
    if (cmd.safety === "restricted" && !cmd.legalNote) {
      error(`${file}: Restricted command "${cmd.command}" must have a legalNote`);
    }
  }

  lessons.push(lesson);
  console.log();
}

// Check uniqueness
const ids = lessons.map((l) => l.id);
const slugs = lessons.map((l) => l.slug);
if (new Set(ids).size !== ids.length) error("Duplicate lesson IDs found");
if (new Set(slugs).size !== slugs.length) error("Duplicate lesson slugs found");

// Check module coverage
const modules = new Set(lessons.map((l) => l.module));
[1, 2, 3, 4, 5, 6].forEach((m) => {
  if (!modules.has(m)) error(`Module ${m} has no lessons`);
});

console.log(`\n${"=".repeat(40)}`);
if (errors > 0) {
  console.error(`\n${errors} error(s) found. Fix them before proceeding.`);
  process.exit(1);
} else {
  console.log(`\nAll ${lessons.length} lessons are valid!`);
}
