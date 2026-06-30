/**
 * 受控 / 非受控两用 hook
 *
 * @param valueProp  外部传入的受控值（可能 undefined）
 * @param defaultValue 默认值（非受控时使用）
 * @param onChange   外部 onChange 回调
 * @returns [value, setValue] — 无论受控与否都可以 setValue
 */
export declare function useControllable<T>(valueProp: T | undefined, defaultValue: T, onChange?: (value: T) => void): [T, (next: T) => void];
//# sourceMappingURL=useControllable.d.ts.map