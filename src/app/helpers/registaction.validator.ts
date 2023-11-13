import { FormControl, FormGroup } from "@angular/forms";

export class RegistractionValidators {

    static passLength(control: FormControl) {
        let hasMinLength = control.value?.length >= 8
        if (!hasMinLength) {
            return { min: true };
        }
        return null;
    }

    static passCapital(control: FormControl) {
        let hasCharacter = /[A-Z]/.test(control.value);
        if (!hasCharacter) {
            return { capital: true };
        }
        return null;
    }

    static passLower(control: FormControl) {
        let hasCharacter = /[a-z]/.test(control.value);
        if (!hasCharacter) {
            return { lower: true };
        }
        return null;
    }

    static passNumber(control: FormControl) {
        let hasNumber = /\d/.test(control.value);
        if (!hasNumber) {
            return { number: true };
        }
        return null;
    }


    static strong(control: FormControl) {
        if (control.value == "") {
            return null;
        }

        let hasNumber = /\d/.test(control.value);
        let hascapitalCharacter = /[A-Z]/.test(control.value);
        let hasSmallCharacter = /[a-z]/.test(control.value);
        let hasMinLength = control.value?.length >= 8
        const valid = hasNumber && hascapitalCharacter && hasSmallCharacter && hasMinLength;
        if (!valid) {
            return { strong: true };
        }
        return null;
    }

    static confirmedValidator(controlName: string, matchingControlName: string) {
        return (formGroup: FormGroup) => {
            const control = formGroup.controls[controlName];
            const matchingControl = formGroup.controls[matchingControlName];
            if (matchingControl.errors && !matchingControl.errors.confirmedValidator) {
                return;
            }

            if (control.value !== matchingControl.value) {
                matchingControl.setErrors({ confirmedValidator: true });
            } else {
                matchingControl.setErrors(null);
            }
        }
    }

    static confirmedNotChanged(controlName: string, matchinValue: string) {
        return (formGroup: FormGroup) => {
            const control = formGroup.controls[controlName];
            if (matchinValue == "" || matchinValue == null) {
                control.setErrors(null);
            }

            if (control.value.toLowerCase() !== matchinValue.toLowerCase()) {
                control.setErrors({ confirmedNotChnaged: true });
            } else {
                control.setErrors(null);
            }
        }
    }
}