import isEmail from 'validator/lib/isEmail';

declare global {
  interface Window { onClick: any; reCaptcha: any; }
}

export async function onClick(e: MouseEvent, grecaptcha: any) {

  console.log("click submit");
  e.preventDefault();

  const name = (<HTMLInputElement>document.getElementById("name")).value;
  const email = (<HTMLInputElement>document.getElementById("email")).value;
  const message = (<HTMLInputElement>document.getElementById("message")).value;


  let errors = false;
  const nameErrors = document.getElementById("name-errors");
  if (nameErrors) {
    if (!name) {
      nameErrors.style.display = "block";
      errors = true;
    } else {
      nameErrors.style.display = "none";
    }
  }

  const emailErrors = document.getElementById("email-errors");
  if (emailErrors) {
    if (!isEmail(email)) {
      emailErrors.style.display = "block";
      errors = true;
    } else {
      emailErrors.style.display = "none";
    }
  }

  const messageErrors = document.getElementById("message-errors");
  if (messageErrors) {
    if (!message) {
      messageErrors.style.display = "block";
      errors = true;
    } else {
      messageErrors.style.display = "none";
    }
  }

  if (errors) {
    return;
  }

  const reCaptcha = (token: string) => {
    fetch(import.meta.env.VITE_LAMBDA_CONTACT, { method: 'POST', body: JSON.stringify({ name, email, message, token })});
  }
  window.reCaptcha = reCaptcha;

  grecaptcha.execute();
}

window.onClick = onClick;
