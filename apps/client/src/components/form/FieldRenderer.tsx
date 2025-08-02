import { Field, useFormikContext } from 'formik';
import { get } from 'lodash-es';
import type { InputField } from '../../types/formTypes';

interface Props {
    field: InputField;
}

export const FieldRenderer = ({ field }: Props) => {
    const { values } = useFormikContext<any>();
    const context = get(values, field.getPath ?? field.setPath);

    return (
        <div>
            <label>{field.label}</label>
            <Field name={field.setPath}>
                {({ field: f, meta }: any) => (
                    <div>
                        <input
                            type={field.inputType}
                            placeholder={field.placeholder}
                            {...f}
                            {...(typeof field.extraProps === 'function'
                                ? field.extraProps(context)
                                : field.extraProps)}
                        />
                        {meta.touched && meta.error && <div style={{ color: 'red' }}>{meta.error}</div>}
                    </div>
                )}
            </Field>
        </div>
    );
};
