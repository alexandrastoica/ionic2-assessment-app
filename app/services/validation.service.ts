import { Control, ControlGroup } from "@angular/common";

interface ValidationResult {
    [key: string]: boolean;
}

export class ValidationService {

   public static invalidEmailAddressTwo(control: Control): ValidationResult {
          var valid = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/.test(control.value);
        if (!valid) {
            return {invalidEmailAddressTwo: true};
        }
        return null;
    }

  static getValidatorErrorMessage(code: string) {
    let config = {
      'required': 'Email is required',
      'invalidEmailAddress': 'Invalid email address',
      'invalidPassword': 'Invalid password. Password must be at least 6 characters long, and contain a number.',
    };
    return config[code];
  }

  static emailValidator(control) {
    // RFC 2822 compliant regex
    if (control.value.match(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/)) {
      return null;
    } else {
        return { 'invalidEmailAddress': true };
      }
    }

    static min(control) {
      /*
      ^
      (?=.*[A-Z])  # At least an uppercase alphabet
      (?=.*[0-9])  # At least a numeral
      .{10,}       # Any character 10 or more times
      $s
      */
    if (control.value.match(/^(?=.*[0-9])[a-zA-Z0-9!@#$%^&*]{6,100}$/)) {
      return null;
    } else {
        return { 'min': true };
      }
    }


   static passwordValidator(control) {
     // {6,100}           - Assert password is between 6 and 100 characters
     // (?=.*[0-9])       - Assert a string has at least one number
     if (control.value.match(/^(?=.*[0-9])[a-zA-Z0-9!@#$%^&*]{6,100}$/)) {
       return null;
     } else {
       return { 'invalidPassword': true };
     }
  }
}
