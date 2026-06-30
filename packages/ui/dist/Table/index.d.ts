import { ReactNode } from 'react';
export type { SortDirection } from './Table';
export interface Column<T> {
    key: string;
    title: string;
    dataIndex?: keyof T;
    render?: (value: unknown, record: T, index: number) => ReactNode;
    width?: number | string;
    sortable?: boolean;
    sorter?: (a: T, b: T) => number;
    align?: 'left' | 'center' | 'right';
    fixed?: 'left' | 'right';
}
export interface PaginationConfig {
    pageSize?: number;
    current?: number;
    total?: number;
    onChange?: (page: number, pageSize: number) => void;
}
export interface TableProps<T> {
    columns: Column<T>[];
    dataSource: T[];
    rowKey: keyof T | ((record: T) => string);
    loading?: boolean;
    pagination?: PaginationConfig;
    emptyText?: string;
    onRow?: (record: T) => {
        onClick?: () => void;
    };
    className?: string;
    style?: React.CSSProperties;
}
export { Table } from './Table';
//# sourceMappingURL=index.d.ts.map