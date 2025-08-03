import type { InputComponentProps } from '../../../types/formTypes';

export const NumberInput = ({ field, formikField, context }: InputComponentProps) => {
    const extra = typeof field.extraProps === 'function' ? field.extraProps(context) : field.extraProps;
    return (
        <input
            type="number"
            placeholder={field.placeholder}
            {...formikField}
            {...extra}
        />
    );
};
