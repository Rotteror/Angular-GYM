import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

const pattern = /^(?=.{5,20}$)(^[a-zA-Z]+[0-9]?([-_\.][a-zA-Z0-9]+)*[a-zA-Z0-9]$)/;
@Injectable()
export class CustomValidationService {

  constructor() { }

  passwordMatchValidator(password: string, rePassword: string) {
    return (formGr: FormGroup) => {
      const passwordControl = formGr.controls[password];
      const rePasswordControl = formGr.controls[rePassword];

      if (!passwordControl || !rePasswordControl) {
        return null;
      }

      if (rePasswordControl.errors && !rePasswordControl.errors.passwordMissmatch) {
        return null;
      }

      if (passwordControl.value !== rePasswordControl.value) {
        return rePasswordControl.setErrors({ passwordMissmatch: true });
      } else {
        return rePasswordControl.setErrors(null);
      }
    }

  }

  usernameValidator(username: string) {
    return (formG: FormGroup) => {
      const usernameControl = formG.controls[username];
      if (!usernameControl) {
        return null;
      }

      if (usernameControl.value.length < 5) {
        return usernameControl.setErrors({ minlength: true });
      }

      if (pattern.test(usernameControl.value)) {
        return usernameControl.setErrors(null);
      } else {
        return usernameControl.setErrors({ invalidUsername: true })
      }
    }
  }
}
