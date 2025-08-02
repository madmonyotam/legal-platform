import * as Yup from 'yup';
import type { FormElement, InputField } from '../../types/formTypes';

export const buildValidationSchema = (elements: FormElement[]) => {
    const shape: Record<string, any> = {};

    for (const element of elements) {
        if (element.type === 'section') {
            Object.assign(shape, buildValidationSchema(element.children));
        }

        if (element.type === 'input') {
            const field = element as InputField;
            const path = field.setPath;
            let validator: Yup.AnySchema;

            switch (field.inputType) {
                case 'text':
                case 'email':
                case 'password':
                case 'select':
                    validator = Yup.string();
                    break;
                case 'number':
                    validator = Yup.number();
                    break;
                case 'date':
                    validator = Yup.date();
                    break;
                case 'checkbox':
                    validator = Yup.boolean();
                    break;
                default:
                    validator = Yup.mixed();
            }

            if (field.required) {
                validator = validator.required('שדה חובה');
            }

            const v = field.validation;
            if (field.inputType === 'email') {
                validator = (validator as Yup.StringSchema).email('דוא"ל לא תקין');
            }

            if (v?.min !== undefined) validator = (validator as any).min(v.min);
            if (v?.max !== undefined) validator = (validator as any).max(v.max);
            if (v?.length !== undefined) validator = (validator as any).length(v.length);
            if (v?.matches) validator = (validator as Yup.StringSchema).matches(v.matches);

            shape[path] = validator;
        }
    }

    return Yup.object().shape(shape);
};
