export function skills() {
  let i = 0;
  let j = 0;
  const skills = [
    "JavaScript",
    "TypeScript",
    "Node",
    "Angular",
    "React",
    "Express",
    "Fastify",
    "Docker",
    "Rust",
    "Go",
    "AWS",
    "GCP",
  ];
  const prefix = "";
  let txt = prefix + " " + skills[j] + ".";
  const speed = 75;
  let showCursor = true;
  const blink = speed * 10;

  const cursor = document.getElementById("cursor");
  if (cursor) {
    setInterval(() => {
      if (showCursor) {
        cursor.style.opacity = '0';
        showCursor = false;
      } else {
        cursor.style.opacity = '1';
        showCursor = true;
      }
    }, blink);
  }

  function sleep(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  async function typeWriter() {
    const mastheadHeading = document.getElementById("masthead-heading");
    if (mastheadHeading && i < txt.length) {
      mastheadHeading.innerHTML += txt.charAt(i);
      i++;
      // setTimeout(typeWriter, speed);
      await sleep(speed);
      await typeWriter();
    } else {
      await sleep(speed * 20);
      // setTimeout(backSpace, speed * 20);
      await backSpace();
    }
  }

  async function backSpace() {
    const mastheadHeading = document.getElementById("masthead-heading");
    if (mastheadHeading && i > prefix.length) {
      mastheadHeading.innerHTML = mastheadHeading.innerHTML.slice(0, i - 1);
      i--;
      // setTimeout(backSpace, speed);
      await sleep(speed);
      await backSpace();
    } else {
      j++;
      txt = prefix + " " + skills[j % skills.length] + ".";
      // setTimeout(typeWriter, speed * 20);
      await sleep(speed * 20);
      // setTimeout(backSpace, speed * 20);
      await typeWriter();
    }
  }
  typeWriter();
}

skills();
