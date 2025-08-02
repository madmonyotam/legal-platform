import { Field, useFormikContext } from 'formik';
import { get } from 'lodash-es';
import type { InputField } from '../../types/formTypes';
import type { JSX } from 'react';

interface Props {
    field: InputField;
}

export const FieldRenderer = ({ field }: Props) => {
    const { values } = useFormikContext<any>();
    const context = get(values, field.getPath ?? field.setPath);
    const options = typeof field.options === 'function' ? field.options(context) : field.options;

    const getExtraProps = () =>
        typeof field.extraProps === 'function' ? field.extraProps(context) : field.extraProps;

    const inputMap: Partial<Record<InputField['inputType'], (f: any) => JSX.Element>> = {
        select: (f) => (
            <select {...f} {...getExtraProps()}>
                <option value="">בחר...</option>
                {options?.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                        {opt.label}
                    </option>
                ))}
            </select>
        ),
        text: (f) => (
            <input type="text" placeholder={field.placeholder} {...f} {...getExtraProps()} />
        ),
        number: (f) => (
            <input type="number" placeholder={field.placeholder} {...f} {...getExtraProps()} />
        ),
        date: (f) => (
            <input type="date" placeholder={field.placeholder} {...f} {...getExtraProps()} />
        ),
        checkbox: (f) => (
            <input type="checkbox" {...f} checked={f.value} {...getExtraProps()} />
        ),
    };

    const renderInput = inputMap[field.inputType] || inputMap.text;

    return (
        <div>
            <label>{field.label}</label>
            <Field name={field.setPath}>
                {({ field: f, meta }: any) => (
                    <div>
                        {renderInput?.(f) ?? null}
                        {meta.touched && meta.error && <div style={{ color: 'red' }}>{meta.error}</div>}
                    </div>
                )}
            </Field>
        </div>
    );
};
