import { ReactNode } from 'react';
export type FieldType = 'text' | 'number' | 'select' | 'switch' | 'textarea';
export interface ValidationRule {
    required?: boolean;
    min?: number;
    max?: number;
    pattern?: RegExp;
    message: string;
    validator?: (value: unknown) => boolean | Promise<boolean>;
}
export interface FormField {
    name: string;
    label: string;
    type: FieldType;
    required?: boolean;
    placeholder?: string;
    rules?: ValidationRule[];
    options?: {
        label: string;
        value: string | number;
    }[];
    component?: ReactNode;
}
export type FormLayout = 'horizontal' | 'vertical' | 'inline';
export interface FormProps {
    fields: FormField[];
    layout?: FormLayout;
    initialValues?: Record<string, unknown>;
    onSubmit?: (values: Record<string, unknown>) => void;
    onReset?: () => void;
    submitText?: string;
    resetText?: string;
    className?: string;
    style?: React.CSSProperties;
}
export interface FieldError {
    name: string;
    message: string;
}
export { Form } from './Form';
//# sourceMappingURL=index.d.ts.map