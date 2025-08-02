// טיפוס לשדה קלט גנרי
export interface InputField {
    type: 'input';
    setPath: string;
    getPath?: string; // ברירת מחדל: זהה ל־setPath
    label: string;
    inputType: 'text' | 'number' | 'email' | 'password' | 'date' | 'checkbox' | 'select';
    options?: { value: string; label: string }[] | ((context: any) => { value: string; label: string }[]);
    placeholder?: string;
    required?: boolean;

    validation?: {
        min?: number;
        max?: number;
        length?: number;
        matches?: RegExp;
        email?: boolean;
        customMessage?: string;
    };

    extraProps?: Record<string, any>;
}

// תנאי לתצוגת Section
export interface DisplayCondition {
    path: string;
    operator: 'equals' | 'notEquals' | 'in' | 'notIn' | 'exists' | 'notExists';
    value?: any;
}

// סוגי תצוגה ל־Section
export type SectionVariant =
    | 'vertical'
    | 'horizontal'
    | 'grid'
    | 'condition'
    | 'collapsible'
    | 'tab'
    | 'step';

export interface Section {
    type: 'section';
    title?: string;
    description?: string;
    variant?: SectionVariant;
    condition?: DisplayCondition | DisplayCondition[];
    children: FormElement[];
    extraProps?: Record<string, any>;
}

// אלמנט כללי בטופס
export type FormElement = Section | InputField;

export type FormMode = 'default' | 'wizard';

export interface FormSchema {
    mode?: FormMode;
    elements: FormElement[];
    submitLabel?: string;
    validationMode?: 'onBlur' | 'onChange';
    containerStyle?: React.CSSProperties;
    customValidation?: any;
}

export interface GenericFormProps {
    schema: FormSchema;
    onSubmit: (values: any) => void;
    initialValues: Record<string, any>;
    currentStep?: number;
    onStepChange?: (index: number) => void;
    isNew?: boolean;
}
