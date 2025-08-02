import { useState } from 'react';
import type { FormikHelpers } from 'formik';
import type { FormSchema, Section } from '../../types/formTypes';
import { GenericForm } from './GenericForm';

interface Props {
    schema: FormSchema;
    initialValues: Record<string, any>;
    onSubmit: (values: any, helpers: FormikHelpers<any>) => void | Promise<void>;
    readonly?: boolean;
    isNew?: boolean;
}

export const StepperForm = ({ schema, initialValues, onSubmit, readonly, isNew }: Props) => {
    const steps = schema.elements.filter(
        (el): el is Section => el.type === 'section' && el.variant === 'step'
    );

    const ignored = schema.elements.filter(
        (el) => el.type !== 'section' || el.variant !== 'step'
    );

    if (ignored.length > 0) {
        console.warn('[StepperForm] Ignored non-step elements in schema:', ignored);
    }

    const [stepIndex, setStepIndex] = useState(0);
    const currentStep = steps[stepIndex];

    const stepSchema: FormSchema = {
        ...schema,
        elements: [currentStep]
    };

    const isFirst = stepIndex === 0;
    const isLast = stepIndex === steps.length - 1;

    const handleNext = async (formikHelpers: FormikHelpers<any>) => {
        const errors = await formikHelpers.validateForm();
        const stepErrors = Object.keys(errors || {});
        if (stepErrors.length === 0) {
            setStepIndex((prev) => Math.min(prev + 1, steps.length - 1));
        }
    };

    const handleBack = () => setStepIndex((prev) => Math.max(prev - 1, 0));

    const handleSubmit = async (values: any, formikHelpers: FormikHelpers<any>) => {
        const errors = await formikHelpers.validateForm();
        const hasErrors = Object.keys(errors || {}).length > 0;
        if (isLast) {
            if (!hasErrors) onSubmit(values, formikHelpers);
        } else {
            if (!hasErrors) handleNext(formikHelpers);
        }
    };

    return (
        <div>
            <div style={{ marginBottom: '1rem', textAlign: 'center' }}>
                <strong>שלב {stepIndex + 1} מתוך {steps.length}</strong>
            </div>

            <GenericForm
                schema={stepSchema}
                initialValues={initialValues}
                onSubmit={(values) => handleSubmit(values, {} as FormikHelpers<any>)}
                currentStep={stepIndex}
                onStepChange={setStepIndex}
                readonly={readonly}
                isNew={isNew}
            />

            {!readonly && (
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1rem' }}>
                    <button onClick={handleBack} disabled={isFirst}>
                        הקודם
                    </button>
                    <button type="submit" form="form">
                        {isLast ? 'סיום' : 'הבא'}
                    </button>
                </div>
            )}
        </div>
    );
};
