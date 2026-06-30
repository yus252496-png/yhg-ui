interface PaginationInnerProps {
    current: number;
    pageSize: number;
    total: number;
    onChange?: (page: number, pageSize: number) => void;
}
/**
 * 简易分页器
 * 上一页 / 页码 / 下一页
 */
export declare function Pagination({ current, pageSize, total, onChange }: PaginationInnerProps): import("react").JSX.Element | null;
export {};
//# sourceMappingURL=Pagination.d.ts.map