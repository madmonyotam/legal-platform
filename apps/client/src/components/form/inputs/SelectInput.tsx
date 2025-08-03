import { useTranslation } from 'react-i18next';
import type { InputComponentProps } from '../../../types/formTypes';

export const SelectInput = ({ field, formikField, context }: InputComponentProps) => {

    const { t } = useTranslation();

    const options = typeof field.options === 'function' ? field.options(context) : field.options;
    const extra = typeof field.extraProps === 'function' ? field.extraProps(context) : field.extraProps;

    const { placeholder = t('form.select.placeholder') } = field;;

    return (
        <select {...formikField} {...extra}>
            <option value="">{placeholder}</option>
            {options?.map((opt) => (
                <option key={opt.value} value={opt.value}>
                    {opt.label}
                </option>
            ))}
        </select>
    );
};
