declare global {
  interface Window { onClick: any; reCaptcha: any; }
}

export const isValidEmail = (email: string) =>
  String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );

export async function onClick(e: MouseEvent, grecaptcha: any) {

  console.log("click submit");
  e.preventDefault();

  const name = (<HTMLInputElement>document.getElementById("name")).value;
  const email = (<HTMLInputElement>document.getElementById("email")).value;
  const message = (<HTMLInputElement>document.getElementById("message")).value;

  console.log(name, email, message);

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
    if (!isValidEmail(email)) {
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
    fetch('https://5dhrr6yge9.execute-api.us-east-1.amazonaws.com/Prod/', { method: 'POST', body: JSON.stringify({ name, email, message, token })});
  }
  window.reCaptcha = reCaptcha;

  grecaptcha.execute();
}

window.onClick = onClick;
