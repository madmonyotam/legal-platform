import type { FormSchema } from '../../types/formTypes';
import { GenericForm } from './GenericForm';

const formSchema: FormSchema = {
    mode: 'wizard',
    submitLabel: 'Submit',
    validationMode: 'onBlur',
    containerStyle: { maxWidth: '600px', margin: '0 auto' },
    elements: [
        {
            type: 'section',
            title: 'Personal Details',
            variant: 'step',
            children: [
                {
                    type: 'input',
                    setPath: 'firstName',
                    label: 'First Name',
                    inputType: 'text',
                    required: true,
                    validation: {
                        min: 2
                    }
                },
                {
                    type: 'input',
                    setPath: 'lastName',
                    label: 'Last Name',
                    inputType: 'text',
                    required: true
                },
                {
                    type: 'input',
                    setPath: 'age',
                    label: 'Age',
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
            title: 'Address',
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
                    label: 'Street',
                    inputType: 'text',
                    required: true
                },
                {
                    type: 'input',
                    setPath: 'address.city',
                    label: 'City',
                    inputType: 'text',
                    required: true
                }
            ]
        },
        {
            type: 'section',
            title: 'Contact Details',
            variant: 'step',
            children: [
                {
                    type: 'input',
                    setPath: 'email',
                    label: 'Email',
                    inputType: 'email',
                    required: true,
                    validation: {
                        email: true
                    }
                },
                {
                    type: 'input',
                    setPath: 'phone',
                    label: 'Phone',
                    inputType: 'text'
                }
            ]
        },
        {
            type: 'section',
            title: 'Declarations',
            variant: 'step',
            children: [
                {
                    type: 'input',
                    setPath: 'agree',
                    label: 'I Agree to the Terms',
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
