import type { InputComponentProps } from '../../../types/formTypes';

export const DateInput = ({ field, formikField, context }: InputComponentProps) => {
    const extra = typeof field.extraProps === 'function' ? field.extraProps(context) : field.extraProps;
    return (
        <input
            type="date"
            placeholder={field.placeholder}
            {...formikField}
            {...extra}
        />
    );
};
