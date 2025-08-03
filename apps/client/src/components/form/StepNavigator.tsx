import { useFormikContext, setIn } from 'formik';
import React from 'react';
import { get } from 'lodash-es';
import { useTranslation } from 'react-i18next';
import { Button, NavWrapper } from './sections/ui';

export const StepNavigator = ({
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
                <Button type="submit">{submitLabel}</Button>
            )}
        </NavWrapper>
    );
};