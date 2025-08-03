import { Formik, Form, useFormikContext, setIn } from 'formik';
import React, { useState } from 'react';
import { get } from 'lodash-es';
import type { GenericFormProps, FormElement, Section } from '../../types/formTypes';
import { buildValidationSchema } from '../../utils/form/validation';
import { FieldRenderer } from './FieldRenderer';
import { SectionRenderer } from './SectionRenderer';
import { useTranslation } from 'react-i18next';
import { Button, NavWrapper } from './sections/ui';

const getStepSections = (elements: FormElement[]): Section[] =>
    elements.filter(el => el.type === 'section' && el.variant === 'step') as Section[];

const collectInputPaths = (elements: FormElement[]): string[] =>
    elements.flatMap((el) => {
        if (el.type === 'input') return [el.setPath];
        if (el.type === 'section') return collectInputPaths(el.children);
        return [];
    });

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
    const { t } = useTranslation();

    const handleNext = async () => {
        const formErrors = await formik.validateForm();
        const hasStepErrors = stepFields.some((path) => get(formErrors, path));

        if (hasStepErrors) {
            const touchedMap = stepFields.reduce((acc, path) => {
                return setIn(acc, path, true);
            }, {});
            formik.setTouched(touchedMap, false);
            return;
        }

        setCurrentStep((s) => s + 1);
    };

    return (
        <NavWrapper>
            {currentStep > 0 && (
                <Button type="button" onClick={() => setCurrentStep(currentStep - 1)}>
                    {t('form.prev')}
                </Button>
            )}
            {currentStep < totalSteps - 1 ? (
                <Button type="button" onClick={handleNext}>
                    {t('form.next')}
                </Button>
            ) : (
                <Button type="submit">{submitLabel ?? t('form.submit')}</Button>
            )}
        </NavWrapper>
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
                        stepFields={collectInputPaths(steps[currentStep].children)}
                    />
                )}
                {!isWizard && schema.submitLabel && <button type="submit">{schema.submitLabel}</button>}
            </Form>
        </Formik>
    );
};
