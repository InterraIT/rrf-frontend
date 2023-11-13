import { FormControl } from "@angular/forms";

export class EmailValidator {
    
    static isValidEmail(email: string) {
        const regix = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return regix.test((email).toLowerCase());
    }

    static isValidEmailPattern(control: FormControl){
        let value = control.value;
        if(value && value != ""){
            let isValid = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(value);
            if (!isValid) {
                return { email: true };
            }
        }
        return null;
    }
}