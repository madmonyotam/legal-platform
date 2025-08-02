import { useFormikContext } from 'formik';
import { get } from 'lodash-es';
import type { Section, FormElement, DisplayCondition } from '../../types/formTypes';
import { FieldRenderer } from './FieldRenderer';

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

export const SectionRenderer = ({ section }: Props) => {
    const { values } = useFormikContext<any>();
    const shouldRender = evaluateCondition(section.condition, values);

    if (!shouldRender) return null;

    return (
        <div style={section.extraProps}>
            {section.title && <h4>{section.title}</h4>}
            {section.children.map((el, index) => {
                if (el.type === 'input') return <FieldRenderer key={el.setPath} field={el} />;
                if (el.type === 'section') return <SectionRenderer key={index} section={el} />;
                return null;
            })}
        </div>
    );
};
