import type { InputComponentProps } from '../../../types/formTypes';

export const TextInput = ({ field, formikField, context }: InputComponentProps) => {
    const extra = typeof field.extraProps === 'function' ? field.extraProps(context) : field.extraProps;
    return (
        <input
            type="text"
            placeholder={field.placeholder}
            {...formikField}
            {...extra}
        />
    );
};
