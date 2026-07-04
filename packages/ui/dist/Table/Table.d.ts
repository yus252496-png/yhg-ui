import { TableProps } from './index';
export type SortDirection = 'asc' | 'desc' | null;
/**
 * 工业级 Table 组件
 *
 * 泛型约束、列配置驱动、排序、分页、loading/empty 状态。
 * 遵循 @yhg/ui 赛博暗色风格。
 */
export declare function Table<T extends Record<string, unknown>>({ columns, dataSource, rowKey, loading, pagination, emptyText, onRow, className, style, }: TableProps<T>): import("react").JSX.Element;
//# sourceMappingURL=Table.d.ts.map