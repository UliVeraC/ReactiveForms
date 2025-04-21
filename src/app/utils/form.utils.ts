import { FormGroup, FormArray, ValidationErrors } from "@angular/forms";


export class FormUtils{

    static getTextError(errors: ValidationErrors){
        for (const key of Object.keys(errors)) {
            switch (key) {
                case 'required':
                    return 'El campo es requerido';
                case 'minlength':
                    return `Minimo de ${errors['minlength'].requiredLength} caracteres `
                case 'min':
                    return `Valor minimo de ${errors['min'].min}`
            }
        }
        return null
    }
    static isValidField(form: FormGroup, fieldName: string): boolean | null {
        return (!! form.controls[fieldName].errors && form.controls[fieldName].touched);
    }

    static getFieldError(form: FormGroup, fieldName: string): string | null {
        if ( !form.controls[fieldName]) return null;
        const errors = form.controls[fieldName].errors ?? {};
        return this.getTextError(errors)
    }

    static isvalidFieldInArray(formarray: FormArray, index: number) {
        return (
            formarray.controls[index].errors && formarray.controls[index].touched
        )
    }

    static getFieldErrorInArray(form: FormArray, index: number): string | null {
        if (form.controls.length===0) return null;
        const errors = form.controls[index].errors ?? {};
        return this.getTextError(errors)
    }

}