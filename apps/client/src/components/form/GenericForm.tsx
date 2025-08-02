import { Formik, Form } from 'formik';
import type { GenericFormProps, FormElement } from '../../types/formTypes';
import { buildValidationSchema } from '../../utils/form/validation';
import { FieldRenderer } from './FieldRenderer';
import { SectionRenderer } from './SectionRenderer';

const renderElements = (elements: FormElement[]) => {
    return elements.map(el => {
        if (el.type === 'input') return <FieldRenderer key={el.setPath} field={el} />;
        if (el.type === 'section') return <SectionRenderer key={el.title || Math.random()} section={el} />;
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
