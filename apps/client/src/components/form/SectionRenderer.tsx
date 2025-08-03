import { useFormikContext } from 'formik';
import { get } from 'lodash-es';
import styled from 'styled-components';
import type { Section, DisplayCondition, SectionVariant } from '../../types/formTypes';
import { FieldRenderer } from './FieldRenderer';
import { CollapsibleSection } from './sections/CollapsibleSection';

interface Props {
    section: Section;
}

const SectionWrapper = styled.section`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
  padding-block: ${({ theme }) => theme.spacing.md};
`;

const SectionTitle = styled.h4`
  font-size: ${({ theme }) => theme.font.size};
  font-weight: bold;
  margin: 0;
  color: ${({ theme }) => theme.colors.text};
`;

const VerticalContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const HorizontalContainer = styled.div`
  display: flex;
  gap: 1rem;
`;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
`;

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

const variantMap: Record<SectionVariant, React.ElementType> = {
    vertical: VerticalContainer,
    horizontal: HorizontalContainer,
    grid: GridContainer,
    collapsible: CollapsibleSection,
    tab: 'div',
    step: VerticalContainer
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

    const CurrentSection = variantMap[section.variant ?? 'vertical'];

    if (section.variant === 'collapsible') {
        return <CurrentSection section={section}>{children}</CurrentSection>;
    }

    return (
        <SectionWrapper>
            {section.title && <SectionTitle>{section.title}</SectionTitle>}
            <CurrentSection>{children}</CurrentSection>
        </SectionWrapper>
    );
};
