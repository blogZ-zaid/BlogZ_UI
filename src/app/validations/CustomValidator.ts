import { AbstractControl, ValidationErrors } from "@angular/forms";

export class CustomValidators{

   static noNumericValidator(control:AbstractControl) : ValidationErrors | null {
    const value = control.value as string;
    const hasNumber = /\d/.test(value);
    if (hasNumber) {
      return { noNumericValidator: true };
    }

    return null;
    }

}