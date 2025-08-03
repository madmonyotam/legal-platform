import { Formik, Form } from 'formik';
import { useState } from 'react';
import type { GenericFormProps, FormElement, Section } from '../../types/formTypes';
import { buildValidationSchema } from '../../utils/form/validation';
import { FieldRenderer } from './FieldRenderer';
import { SectionRenderer } from './SectionRenderer';
import { useTranslation } from 'react-i18next';
import { Button } from './sections/ui';
import { StepNavigator } from './StepNavigator';

const getStepSections = (elements: FormElement[]): Section[] =>
    elements.filter(el => el.type === 'section' && el.variant === 'step') as Section[];

const collectInputPaths = (elements: FormElement[]): string[] =>
    elements.flatMap((el) => {
        if (el.type === 'input') return [el.setPath];
        if (el.type === 'section') return collectInputPaths(el.children);
        return [];
    });

export const GenericForm = ({ schema, onSubmit, initialValues }: GenericFormProps) => {
    const { t } = useTranslation();

    const validationSchema = schema.customValidation || buildValidationSchema(schema.elements);
    const isWizard = schema.mode === 'wizard';
    const submitLbl = schema.submitLabel || t('form.submit');


    const [currentStep, setCurrentStep] = useState(0);
    const steps = isWizard ? getStepSections(schema.elements) : [];

    const renderElements = () => {
        if (isWizard) {
            const currentSection = steps[currentStep];
            return <SectionRenderer key={currentSection.title} section={currentSection} />;
        }

        return schema.elements.map((el) => {
            if (el.type === 'input') return <FieldRenderer key={el.setPath} field={el} />;
            if (el.type === 'section') return <SectionRenderer key={el.title || Math.random()} section={el} />;
            return null;
        });
    };

    return (
        <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}
            validationSchema={validationSchema}
            validateOnBlur={schema.validationMode === 'onBlur'}
            validateOnChange={schema.validationMode === 'onChange'}
        >
            <Form style={schema.containerStyle} id="form">
                {renderElements()}
                {isWizard && (
                    <StepNavigator
                        currentStep={currentStep}
                        setCurrentStep={setCurrentStep}
                        totalSteps={steps.length}
                        submitLabel={submitLbl}
                        stepFields={collectInputPaths(steps[currentStep].children)}
                    />
                )}
                {!isWizard && schema.submitLabel && <Button type="submit">{submitLbl}</Button>}
            </Form>
        </Formik>
    );
};
