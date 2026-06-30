import { Ref, RefCallback } from 'react';
/**
 * 合并多个 ref 到一个回调 ref
 * 支持 RefObject | RefCallback | null
 */
export declare function useMergeRefs<T>(...refs: (Ref<T> | null | undefined)[]): RefCallback<T>;
//# sourceMappingURL=useMergeRefs.d.ts.map