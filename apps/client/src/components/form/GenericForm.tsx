import { Formik, Form, useFormikContext } from 'formik';
import React, { useState } from 'react';
import { get } from 'lodash-es';
import type { GenericFormProps, FormElement, Section } from '../../types/formTypes';
import { buildValidationSchema } from '../../utils/form/validation';
import { FieldRenderer } from './FieldRenderer';
import { SectionRenderer } from './SectionRenderer';

const getStepSections = (elements: FormElement[]): Section[] =>
    elements.filter(el => el.type === 'section' && el.variant === 'step') as Section[];

const StepNavigator = ({
    currentStep,
    setCurrentStep,
    totalSteps,
    submitLabel,
    stepFields,
}: {
    currentStep: number;
    setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
    totalSteps: number;
    submitLabel?: string;
    stepFields: string[];
}) => {
    const formik = useFormikContext<any>();

    const handleNext = async () => {
        const formErrors = await formik.validateForm();
        const hasStepErrors = stepFields.some((path) => get(formErrors, path));
        console.log('Current step:', stepFields);

        console.log('Step validation errors:', formErrors, 'Has step errors:', hasStepErrors);

        if (!hasStepErrors) {
            setCurrentStep((s) => s + 1);
        }
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1rem' }}>
            {currentStep > 0 && (
                <button type="button" onClick={() => setCurrentStep(currentStep - 1)}>
                    הקודם
                </button>
            )}
            {currentStep < totalSteps - 1 ? (
                <button type="button" onClick={handleNext}>
                    הבא
                </button>
            ) : (
                <button type="submit">{submitLabel ?? 'שליחה'}</button>
            )}
        </div>
    );
};

export const GenericForm = ({ schema, onSubmit, initialValues }: GenericFormProps) => {
    const validationSchema = schema.customValidation || buildValidationSchema(schema.elements);
    const isWizard = schema.mode === 'wizard';

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
                        submitLabel={schema.submitLabel}
                        stepFields={
                            steps[currentStep].children
                                .filter(child => child.type === 'input')
                                .map(child => child.setPath)
                        }
                    />
                )}
                {!isWizard && schema.submitLabel && <button type="submit">{schema.submitLabel}</button>}
            </Form>
        </Formik>
    );
};
