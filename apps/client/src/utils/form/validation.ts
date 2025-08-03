import * as Yup from 'yup';
import { set } from 'lodash-es';
import type { FormElement, InputField } from '../../types/formTypes';

// Building a schema object with setPath (including dots)
const collectShape = (elements: FormElement[]): Record<string, any> => {
    const shape: Record<string, any> = {};

    for (const element of elements) {
        if (element.type === 'section') {
            const nested = collectShape(element.children);
            for (const key in nested) {
                set(shape, key, nested[key]);
            }
        }

        if (element.type === 'input') {
            const { setPath, inputType, required, validation } = element as InputField;
            let validator: Yup.AnySchema;

            switch (inputType) {
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

            if (required) {
                validator = validator.required('Required field');
            }

            if (inputType === 'email') {
                validator = (validator as Yup.StringSchema).email('Invalid email');
            }

            if (validation?.min !== undefined) {
                validator = (validator as any).min(validation.min);
            }

            if (validation?.max !== undefined) {
                validator = (validator as any).max(validation.max);
            }

            if (validation?.length !== undefined) {
                validator = (validator as any).length(validation.length);
            }

            if (validation?.matches) {
                validator = (validator as Yup.StringSchema).matches(validation.matches);
            }

            set(shape, setPath, validator); // 🔑 Support for address.street
        }
    }

    return shape;
};

// 🧬 Convert to a real Yup tree
const toYupObject = (obj: any): Yup.ObjectSchema<any> => {
    const shape: Record<string, any> = {};

    for (const key in obj) {
        const value = obj[key];
        if (Yup.isSchema(value)) {
            shape[key] = value;
        } else if (typeof value === 'object' && value !== null) {
            shape[key] = toYupObject(value);
        }
    }

    return Yup.object().shape(shape);
};

export const buildValidationSchema = (elements: FormElement[]) => {
    const rawShape = collectShape(elements);   // Regular tree with validations
    return toYupObject(rawShape);              // Convert to real Yup
};
