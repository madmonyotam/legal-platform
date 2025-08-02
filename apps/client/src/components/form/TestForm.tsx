import type { FormSchema } from '../../types/formTypes';
import { GenericForm } from './GenericForm';

const formSchema: FormSchema = {
    elements: [
        {
            type: 'section',
            title: 'פרטים אישיים',
            variant: 'step',
            children: [
                {
                    type: 'input',
                    setPath: 'firstName',
                    label: 'שם פרטי',
                    inputType: 'text',
                    required: true,
                    validation: {
                        min: 2
                    }
                },
                {
                    type: 'input',
                    setPath: 'lastName',
                    label: 'שם משפחה',
                    inputType: 'text',
                    required: true
                },
                {
                    type: 'input',
                    setPath: 'age',
                    label: 'גיל',
                    inputType: 'number',
                    required: true,
                    validation: {
                        min: 0,
                        max: 120
                    }
                }
            ]
        },
        {
            type: 'section',
            title: 'כתובת',
            variant: 'step',
            condition: {
                path: 'age',
                operator: 'in',
                value: [18, 19, 20, 21, 22, 23, 24, 25]
            },
            children: [
                {
                    type: 'input',
                    setPath: 'address.street',
                    label: 'רחוב',
                    inputType: 'text',
                    required: true
                },
                {
                    type: 'input',
                    setPath: 'address.city',
                    label: 'עיר',
                    inputType: 'text',
                    required: true
                }
            ]
        },
        {
            type: 'section',
            title: 'פרטי יצירת קשר',
            variant: 'step',
            children: [
                {
                    type: 'input',
                    setPath: 'email',
                    label: 'אימייל',
                    inputType: 'email',
                    required: true,
                    validation: {
                        email: true
                    }
                },
                {
                    type: 'input',
                    setPath: 'phone',
                    label: 'טלפון',
                    inputType: 'text'
                }
            ]
        },
        {
            type: 'section',
            title: 'הצהרות',
            variant: 'step',
            children: [
                {
                    type: 'input',
                    setPath: 'agree',
                    label: 'אני מסכים לתנאים',
                    inputType: 'checkbox',
                    required: true
                }
            ]
        }
    ]
};

const initialValues = {
    firstName: '',
    lastName: '',
    age: '',
    email: '',
    phone: '',
    agree: false,
    address: {
        street: '',
        city: ''
    }
};

export const TestForm = () => {
    return (
        <GenericForm
            schema={formSchema}
            initialValues={initialValues}
            onSubmit={(values) => {
                console.log('📝 Form submitted:', values);
            }}
        />
    );
};
