import { FormField, FieldError } from './index';
/**
 * 校验单个字段
 * 顺序：required → min/max → pattern → validator（同步部分）
 * 返回 FieldError | null
 */
export declare function validateField(field: FormField, values: Record<string, unknown>): FieldError | null;
//# sourceMappingURL=validator.d.ts.map