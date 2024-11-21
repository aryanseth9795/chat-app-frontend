import { isValidUsername } from "6pp";

export const usernameValidation = (username) => {
  if (!isValidUsername(username)) {
    return { isvalid: false, errorMessage: "Invalid Username" };
  }
};
 