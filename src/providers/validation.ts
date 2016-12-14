import { FormControl } from "@angular/forms";

interface ValidationResult {
    [key: string]: boolean;
}

export class ValidationService {
      static validateEmail(c: FormControl) {
            let EMAIL_REGEXP = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;
            return EMAIL_REGEXP.test(c.value) ? null : { 'invalidEmailAddress': true };;
      }


      static getValidatorErrorMessage(code: string) {
            let config = {
                  'required': 'Email is required',
                  'invalidEmailAddress': 'Invalid email address',
                  'invalidPassword': 'Invalid password. Password must be at least 6 characters long, and contain a number.',
            };
            return config[code];
      }
}
