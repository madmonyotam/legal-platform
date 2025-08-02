import { Formik, Form, Field, useFormikContext, useFormikContext as useContext } from 'formik';
import * as Yup from 'yup';
import { get, set } from 'lodash-es';
import type { GenericFormProps, InputField, Section, FormElement } from '../../types/formTypes';

const buildValidationSchema = (elements: FormElement[]) => {
    const shape: Record<string, any> = {};

    for (const element of elements) {
        if (element.type === 'section') {
            Object.assign(shape, buildValidationSchema(element.children));
        }
        if (element.type === 'input') {
            const path = element.setPath;
            let validator: Yup.AnySchema;

            switch (element.inputType) {
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

            if (element.required) {
                validator = validator.required('שדה חובה');
            }

            const v = element.validation;
            if (element.inputType === 'email') {
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

const renderField = (field: InputField) => {
    const { values } = useFormikContext<any>();
    const context = get(values, field.getPath ?? field.setPath);

    return (
        <div key={field.setPath}>
            <label>{field.label}</label>
            <Field name={field.setPath}>
                {({ field: f, meta }: any) => (
                    <div>
                        <input
                            type={field.inputType}
                            placeholder={field.placeholder}
                            {...f}
                            {...(typeof field.extraProps === 'function' ? field.extraProps(context) : field.extraProps)}
                        />
                        {meta.touched && meta.error && <div style={{ color: 'red' }}>{meta.error}</div>}
                    </div>
                )}
            </Field>
        </div>
    );
};

const renderElements = (elements: FormElement[]) => {
    return elements.map(el => {
        if (el.type === 'input') return renderField(el);
        if (el.type === 'section') {
            return (
                <div key={el.title || Math.random()} style={el.extraProps}>
                    {el.title && <h4>{el.title}</h4>}
                    {renderElements(el.children)}
                </div>
            );
        }
        return null;
    });
};

export const GenericForm = ({ schema, onSubmit, initialValues, ...props }: GenericFormProps) => {
    const validationSchema = schema.customValidation || buildValidationSchema(schema.elements);

    return (
        <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}
            validationSchema={validationSchema}
            validateOnBlur={schema.validationMode === 'onBlur'}
            validateOnChange={schema.validationMode === 'onChange'}
        >
            <Form style={schema.containerStyle}>
                {renderElements(schema.elements)}
                {schema.submitLabel && <button type="submit">{schema.submitLabel}</button>}
            </Form>
        </Formik>
    );
};
