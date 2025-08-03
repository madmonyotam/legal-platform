import type { InputComponentProps } from '../../../types/formTypes';

export const CheckboxInput = ({ field, formikField, context }: InputComponentProps) => {
    const extra = typeof field.extraProps === 'function' ? field.extraProps(context) : field.extraProps;
    return (
        <input
            type="checkbox"
            {...formikField}
            checked={formikField.value}
            {...extra}
        />
    );
};
