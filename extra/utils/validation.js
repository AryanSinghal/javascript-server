import { validateEmail } from './helper.js';

function validateUser(user) {
  let validEmails = [];
  let invalidEmails = [];
  user.forEach(function (value) {
    const { traineeEmail, reviewerEmail } = value;
    if (validateEmail(traineeEmail)) {
      validEmails.push(traineeEmail);
    }
    else {
      invalidEmails.push(traineeEmail);
    }
    if (validateEmail(reviewerEmail)) {
      validEmails.push(reviewerEmail);
    }
    else {
      invalidEmails.push(reviewerEmail);
    }
  });
  console.log("Valid Users are:\n");
  validEmails.forEach(element => console.log(element));
  console.log("\nNo. of Valid Users: ", validEmails.length);
  console.log("-----------------------------------------------------")
  console.log("\nInvalid Users are:\n");
  invalidEmails.forEach(element => console.log(element));
  console.log("\nNo. of Invalid Users: ", invalidEmails.length);
}

export default validateUser;
