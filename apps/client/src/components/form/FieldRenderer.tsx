import { Field, useFormikContext } from 'formik';
import { get } from 'lodash-es';
import { TextInput } from './inputs/TextInput';
import { NumberInput } from './inputs/NumberInput';
import { DateInput } from './inputs/DateInput';
import { CheckboxInput } from './inputs/CheckboxInput';
import { SelectInput } from './inputs/SelectInput';
import { Label, ErrorText, FieldWrapper, InputRow } from './inputs/ui';
import type { InputComponentProps, InputField } from '../../types/formTypes';
import type { FieldInputProps, FieldMetaProps } from 'formik';

interface Props {
    field: InputField;
}

const inputMap: Partial<Record<InputField['inputType'], React.FC<InputComponentProps>>> = {
    text: TextInput,
    number: NumberInput,
    date: DateInput,
    checkbox: CheckboxInput,
    select: SelectInput,
};

const renderError = (meta: FieldMetaProps<any>) =>
    meta.touched && meta.error ? <ErrorText>{meta.error}</ErrorText> : null;

export const FieldRenderer = ({ field }: Props) => {
    const { values } = useFormikContext<Record<string, any>>();
    const context = get(values, field.getPath ?? field.setPath);
    const Component = inputMap[field.inputType] ?? TextInput;

    return (
        <Field name={field.setPath}>
            {({ field: f, meta }: { field: FieldInputProps<any>; meta: FieldMetaProps<any> }) => (
                <FieldWrapper>
                    <InputRow>
                        <Label>{field.label}</Label>
                        <Component field={field} formikField={f} context={context} />
                    </InputRow>
                    {renderError(meta)}
                </FieldWrapper>
            )}
        </Field>
    );
};
