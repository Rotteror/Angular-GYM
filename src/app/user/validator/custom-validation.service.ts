import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';


@Injectable()
export class CustomValidationService {

  constructor() { }

  passwordMatchValidator(password: string, rePassword: string) {
    return (formGrupup: FormGroup) => {
      const passwordControl = formGrupup.controls[password];
      const rePasswordControl = formGrupup.controls[rePassword];
      console.log(passwordControl,rePasswordControl)
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
}
