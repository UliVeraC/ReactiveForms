import { FormGroup, FormArray, ValidationErrors, AbstractControl } from "@angular/forms";

async function sleep(){
    return new Promise( resolve => {
        setTimeout(() => {
            resolve(true)
        }, 2500)
    })
}

export class FormUtils{

    static namePattern = '([a-zA-Z]+) ([a-zA-Z]+)';
    static emailPattern = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$';
    static notOnlySpacesPattern = '^[a-zA-Z0-9]+$';

    static getTextError(errors: ValidationErrors){
        for (const key of Object.keys(errors)) {
            switch (key) {
                case 'required':
                    return 'El campo es requerido';
                case 'minlength':
                    return `Minimo de ${errors['minlength'].requiredLength} caracteres `
                case 'min':
                    return `Valor minimo de ${errors['min'].min}`
                case 'email':
                    return `No parece ser un correo`
                case 'emailTaken':
                    return `El correo ya ha sido tomado`
                case 'notStrider':
                    return `La palabra strider esta prohibida`

                default:
                    return `Error no controlado`
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

    static isFieldOneEqualToFieldTwo(field1: string, field2: string) {
        return (formGroup: AbstractControl) => {
            const field1Value = formGroup.get(field1)?.value;
            const field2Value = formGroup.get(field2)?.value;

            return field1Value === field2Value ? null : { passwordsNotEqual: true };
        }
    }

    static async checkingServerResponse(control: AbstractControl): Promise<ValidationErrors | null>{
        console.log('Validando contra servidor')
        await sleep();
        const formValue = control.value;

        if(formValue === 'Hola@mundo.com'){
            return {
                emailTaken: true,
            };
        }

        return null;
    }

    static notStrider(control : AbstractControl): ValidationErrors | null{
        const formValue = control.value
        return formValue === 'strider' ? { notStrider:true}: null;
    }

}