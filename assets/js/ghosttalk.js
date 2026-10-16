const VOWELS = "aeiou";

function translateWord(token) {
  // Split into leading punctuation, the word itself (apostrophes allowed), trailing punctuation
  const match = token.match(/^([^A-Za-z]*)([A-Za-z][A-Za-z'’]*)([^A-Za-z]*)$/);
  if (!match) return token; // numbers, emoji, etc. pass through untouched

  const [, lead, core, trail] = match;
  const first = core[0];
  const isCapitalized = first === first.toUpperCase();

  let ghost;
  if (VOWELS.includes(first.toLowerCase())) {
    ghost = `${core}-boo`;
  } else {
    const rest = core.slice(1);
    if (!rest) return token; // a lone consonant has nothing to move
    ghost = `${rest}-${first.toLowerCase()}oo`;
    if (isCapitalized) ghost = ghost[0].toUpperCase() + ghost.slice(1);
  }

  return lead + ghost + trail;
}

export function ghostTalk(text) {
  // Translate each whitespace-separated word, keeping the original spacing
  return text
    .split(/(\s+)/)
    .map((part) => (/\s/.test(part) ? part : translateWord(part)))
    .join("");
}

const human = document.getElementById("human");
const ghost = document.getElementById("ghost");

human.addEventListener("input", () => {
  const text = ghostTalk(human.value);
  ghost.textContent = "";

  [...text].forEach((char, i) => {
    const span = document.createElement("span");
    span.textContent = char;
    span.style.animationDelay = `${i * 40}ms`;
    ghost.appendChild(span);
  });
});