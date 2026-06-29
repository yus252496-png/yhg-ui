/* ═══════════════════════════════════════════════════════
   全局类型声明
   ═══════════════════════════════════════════════════════ */

/* CSS Modules */
declare module '*.module.css' {
  const classes: { readonly [key: string]: string }
  export default classes
}

/* 直接导入 CSS 文件 */
declare module '*.css' {
  const content: string
  export default content
}
