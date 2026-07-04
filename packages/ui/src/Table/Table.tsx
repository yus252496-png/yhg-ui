import { useState, useMemo, useCallback, type ReactNode } from 'react'
import { cn } from '../utils/cn.js'
import { Pagination } from './Pagination'
import type { Column, TableProps } from './index'
import styles from './Table.module.css'

export type SortDirection = 'asc' | 'desc' | null

function getRowKey<T>(record: T, rowKey: keyof T | ((record: T) => string)): string {
  if (typeof rowKey === 'function') return rowKey(record)
  return String(record[rowKey])
}

/**
 * 工业级 Table 组件
 *
 * 泛型约束、列配置驱动、排序、分页、loading/empty 状态。
 * 遵循 @kuka-fe/ui 赛博暗色风格。
 */
export function Table<T extends Record<string, unknown>>({
  columns,
  dataSource,
  rowKey,
  loading = false,
  pagination,
  emptyText = '暂无数据',
  onRow,
  className,
  style,
}: TableProps<T>) {
  const [sortKey, setSortKey] = useState<string | null>(null)
  const [sortDir, setSortDir] = useState<SortDirection>(null)

  const handleSort = useCallback(
    (col: Column<T>) => {
      if (!col.sortable) return
      if (sortKey === col.key) {
        setSortDir((prev) => (prev === 'asc' ? 'desc' : prev === 'desc' ? null : 'asc'))
      } else {
        setSortKey(col.key)
        setSortDir('asc')
      }
    },
    [sortKey],
  )

  const sortedData = useMemo(() => {
    if (!sortKey || !sortDir) return dataSource
    const col = columns.find((c) => c.key === sortKey)
    if (!col) return dataSource

    return [...dataSource].sort((a, b) => {
      const sorter = col.sorter
      if (sorter) return sortDir === 'asc' ? sorter(a, b) : sorter(b, a)

      const aVal = col.dataIndex ? a[col.dataIndex] : undefined
      const bVal = col.dataIndex ? b[col.dataIndex] : undefined
      if (aVal == null) return 1
      if (bVal == null) return -1
      if (typeof aVal === 'number' && typeof bVal === 'number') {
        return sortDir === 'asc' ? aVal - bVal : bVal - aVal
      }
      return sortDir === 'asc'
        ? String(aVal).localeCompare(String(bVal))
        : String(bVal).localeCompare(String(aVal))
    })
  }, [dataSource, sortKey, sortDir, columns])

  // 分页切片
  const pageSize = pagination?.pageSize ?? 0
  const current = pagination?.current ?? 1
  const pagedData = pageSize > 0 ? sortedData.slice((current - 1) * pageSize, current * pageSize) : sortedData
  const total = pagination?.total ?? sortedData.length

  const renderSortIcon = (col: Column<T>) => {
    if (!col.sortable) return null
    const active = sortKey === col.key
    return (
      <span className={styles.sortIcons}>
        <span className={cn(styles.sortArrow, styles.sortUp, active && sortDir === 'asc' && styles.sortActive)}>▲</span>
        <span className={cn(styles.sortArrow, styles.sortDown, active && sortDir === 'desc' && styles.sortActive)}>▼</span>
      </span>
    )
  }

  return (
    <div className={cn(styles.wrapper, className)} style={style}>
      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            <tr>
              {columns.map((col) => (
                <th
                  key={col.key}
                  className={cn(
                    styles.th,
                    col.sortable && styles.sortable,
                    col.align && styles[`align${col.align.charAt(0).toUpperCase() + col.align.slice(1)}` as keyof typeof styles],
                    col.fixed === 'left' && styles.fixedLeft,
                    col.fixed === 'right' && styles.fixedRight,
                  )}
                  style={{ width: col.width }}
                  onClick={() => handleSort(col)}
                  aria-sort={
                    sortKey === col.key
                      ? sortDir === 'asc'
                        ? 'ascending'
                        : sortDir === 'desc'
                          ? 'descending'
                          : 'none'
                      : undefined
                  }
                >
                  <span className={styles.thContent}>
                    {col.title}
                    {renderSortIcon(col)}
                  </span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={columns.length} className={styles.loadingCell}>
                  <div className={styles.loadingOverlay}>
                    <span className={styles.spinner} />
                    <span>加载中...</span>
                  </div>
                </td>
              </tr>
            ) : pagedData.length === 0 ? (
              <tr>
                <td colSpan={columns.length} className={styles.emptyCell}>
                  {emptyText}
                </td>
              </tr>
            ) : (
              pagedData.map((record, rowIdx) => {
                const key = getRowKey(record, rowKey)
                const rowEvents = onRow?.(record)
                return (
                  <tr
                    key={key}
                    className={cn(styles.tr, rowEvents?.onClick && styles.clickable)}
                    onClick={rowEvents?.onClick}
                  >
                    {columns.map((col) => {
                      const rawValue = col.dataIndex ? record[col.dataIndex] : undefined
                      const cellValue = col.render ? col.render(rawValue, record, rowIdx) : (rawValue as ReactNode)
                      return (
                        <td
                          key={col.key}
                          className={cn(
                            styles.td,
                            col.align && styles[`align${col.align.charAt(0).toUpperCase() + col.align.slice(1)}` as keyof typeof styles],
                            col.fixed === 'left' && styles.fixedLeft,
                            col.fixed === 'right' && styles.fixedRight,
                          )}
                        >
                          {cellValue ?? '—'}
                        </td>
                      )
                    })}
                  </tr>
                )
              })
            )}
          </tbody>
        </table>
      </div>
      {pagination && !loading && total > 0 && (
        <div className={styles.paginationBar}>
          <Pagination
            current={current}
            pageSize={pageSize}
            total={total}
            onChange={pagination.onChange}
          />
        </div>
      )}
    </div>
  )
}
