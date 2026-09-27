/* Портфолио: печатающаяся строка, появление блоков, год в подвале. */
const LINES = [
  ["$ whoami", "cmd"],
  ["iboshka24 — разработчик из Ташкента", "out"],
  ["$ cat /etc/route", "cmd"],
  ["linux → драйверы → инструменты → людям", "out"],
  ["$ ls ~/work", "cmd"],
  ["vendra-teach   35 405 вопросов, 55 разделов", "out"],
  ["kod            бесплатный тренажёр SQL", "out"],
  ["nutrition-math · workout-plan · exam-figure-svg", "out"],
  ["$ echo next", "cmd"],
  ["Сделаю — и покажу, что оно работает, а не что я старался.", "out"],
];

const target = document.getElementById("typed");
const escapeHtml = (text) => text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const lineHtml = (text, kind) => '<span class="' + kind + '"></span>';

function printAll() {
  if (!target) return;
  let line = 0;
  let char = 0;
  let done = "";

  function step() {
    if (line >= LINES.length) {
      target.innerHTML = done + '<span class="caret"></span>';
      return;
    }
    const pair = LINES[line];
    const text = pair[0];
    const kind = pair[1];
    char += 1;
    target.innerHTML = done + '<span class="' + kind + '">' + escapeHtml(text.slice(0, char)) + "</span>" +
      (char < text.length ? '<span class="caret"></span>' : "");
    if (char < text.length) {
      setTimeout(step, 22);
      return;
    }
    done += '<span class="' + kind + '">' + escapeHtml(text) + "</span>\n";
    line += 1;
    char = 0;
    setTimeout(step, text.indexOf("$") === 0 ? 240 : 420);
  }
  step();
}

if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  if (target) {
    target.innerHTML = LINES.map((pair) => '<span class="' + pair[1] + '">' + escapeHtml(pair[0]) + "</span>").join("\n");
  }
} else {
  printAll();
}

const blocks = document.querySelectorAll(".block, .card");
if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add("on");
        observer.unobserve(entry.target);
      }
    });
  }, { rootMargin: "0px 0px -8% 0px" });
  blocks.forEach(function (block) {
    block.classList.add("reveal");
    observer.observe(block);
  });
}

const year = document.getElementById("year");
if (year) year.textContent = String(new Date().getFullYear());
