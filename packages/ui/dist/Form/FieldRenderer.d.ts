import { FormField } from './index';
interface FieldRendererProps {
    field: FormField;
    value: unknown;
    onChange: (value: unknown) => void;
    onBlur: () => void;
    hasError: boolean;
}
/**
 * 字段渲染器 — 根据 field.type 渲染对应输入控件
 */
export declare function FieldRenderer({ field, value, onChange, onBlur, hasError }: FieldRendererProps): import("react").JSX.Element;
export {};
//# sourceMappingURL=FieldRenderer.d.ts.map