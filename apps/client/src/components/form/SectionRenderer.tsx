import { useFormikContext } from 'formik';
import { get } from 'lodash-es';
import type { Section, FormElement, DisplayCondition, SectionVariant } from '../../types/formTypes';
import { FieldRenderer } from './FieldRenderer';
import type { JSX } from 'react';

interface Props {
    section: Section;
}

const evaluateCondition = (
    condition: DisplayCondition | DisplayCondition[] | undefined,
    values: Record<string, any>
): boolean => {
    if (!condition) return true;
    const conditions = Array.isArray(condition) ? condition : [condition];

    return conditions.every((cond) => {
        const { path, operator, value } = cond;
        const current = get(values, path);
        switch (operator) {
            case 'equals':
                return current === value;
            case 'notEquals':
                return current !== value;
            case 'in':
                return Array.isArray(value) && value.includes(current);
            case 'notIn':
                return Array.isArray(value) && !value.includes(current);
            case 'exists':
                return current !== undefined && current !== null;
            case 'notExists':
                return current === undefined || current === null;
            default:
                return true;
        }
    });
};

const variantMap: Record<SectionVariant, (children: React.ReactNode, section: Section) => JSX.Element> = {
    vertical: (children) => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>{children}</div>
    ),
    horizontal: (children) => <div style={{ display: 'flex', gap: '1rem' }}>{children}</div>,
    grid: (children) => (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>{children}</div>
    ),
    collapsible: (children, section) => (
        <details>
            <summary>{section.title}</summary>
            {children}
        </details>
    ),
    tab: (children) => <div>{children}</div>,
    step: (children) => <div>{children}</div>,
    condition: (children) => <div>{children}</div>,
};

export const SectionRenderer = ({ section }: Props) => {
    const { values } = useFormikContext<any>();
    const shouldRender = evaluateCondition(section.condition, values);
    if (!shouldRender) return null;

    const children = section.children.map((el, index) => {
        if (el.type === 'input') return <FieldRenderer key={el.setPath} field={el} />;
        if (el.type === 'section') return <SectionRenderer key={index} section={el} />;
        return null;
    });

    const renderVariant = variantMap[section.variant ?? 'vertical'];

    return (
        <div style={section.extraProps}>
            {section.variant !== 'collapsible' && section.title && <h4>{section.title}</h4>}
            {renderVariant(children, section)}
        </div>
    );
};
