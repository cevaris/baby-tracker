import { AbstractControl, ValidatorFn } from "@angular/forms";

export function numberValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
        // show mat-error on invalid key input
        if (control.value) {
            control.markAsTouched();
        }

        const notNumber = isNaN(control.value);
        return notNumber ? { number: { value: control.value } } : null;
    };
}