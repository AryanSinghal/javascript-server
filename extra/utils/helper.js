export function validateEmail(email) {
  const regex = /[a-z]([[-]*\w+[.]*){1,63}@successive[.]tech$/gmi;
  if (email.match(regex)) {
    return true;
  }
    return false;
}

