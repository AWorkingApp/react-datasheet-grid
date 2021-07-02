import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import {
  Cell,
  Column,
  DataSheetGridProps,
  HeaderContextType,
  ListItemData,
  Selection,
  SelectionContextType,
} from '../types'
import { VariableSizeList } from 'react-window'
import '../style.css'
import { Row } from './Row'
import { useColumnWidths } from '../hooks/useColumnWidths'
import { useResizeDetector } from 'react-resize-detector'
import { InnerContainer } from './InnerContainer'
import { HeaderContext } from '../contexts/HeaderContext'
import { useColumns } from '../hooks/useColumns'
import { useMemoObject } from '../hooks/useMemoObject'
import { SelectionContext } from '../contexts/SelectionContext'
import { useEdges } from '../hooks/useEdges'
import { useDeepEqualState } from '../hooks/useDeepEqualState'
import { useDocumentEventListener } from '../hooks/useDocumentEventListener'
import { useGetBoundingClientRect } from '../hooks/useGetBoundingClientRect'
import { AddRows } from './AddRows'
import { useDebounceState } from '../hooks/useDebounceState'

const DEFAULT_DATA: any[] = []
const DEFAULT_COLUMNS: Column<any, any>[] = []
const DEFAULT_CREATE_ROW: DataSheetGridProps<any>['createRow'] = () => ({})
const DEFAULT_ON_CHANGE: DataSheetGridProps<any>['onChange'] = () => null
const DEFAULT_DUPLICATE_ROW: DataSheetGridProps<any>['duplicateRow'] = ({
  rowData,
}) => ({ ...rowData })
const DEFAULT_IS_ROW_EMPTY: DataSheetGridProps<any>['isRowEmpty'] = ({
  rowData,
}) => Object.values(rowData).every((value) => !value)

export const DataSheetGrid = React.memo(
  <T extends any>({
    data = DEFAULT_DATA,
    height: maxHeight = 400,
    onChange = DEFAULT_ON_CHANGE,
    columns: rawColumns = DEFAULT_COLUMNS,
    rowHeight = 40,
    headerRowHeight = rowHeight,
    gutterColumn,
    stickyRightColumn,
    addRowsComponent: AddRowsComponent = AddRows,
    createRow = DEFAULT_CREATE_ROW as () => T,
    autoAddRow = false,
    lockRows = false,
    duplicateRow = DEFAULT_DUPLICATE_ROW,
    isRowEmpty = DEFAULT_IS_ROW_EMPTY,
  }: DataSheetGridProps<T>): JSX.Element => {
    console.log('render DataSheetGrid')

    const columns = useColumns(rawColumns, gutterColumn, stickyRightColumn)
    const listRef = useRef<VariableSizeList>(null)
    const innerRef = useRef<HTMLElement>(null)
    const outerRef = useRef<HTMLElement>(null)

    useEffect(() => {
      listRef.current?.resetAfterIndex(0)
    }, [headerRowHeight, rowHeight])

    const [heightDiff, setHeightDiff] = useDebounceState(0, 100)

    // Height of the list (including scrollbars and borders) to display
    const displayHeight = Math.min(
      maxHeight,
      headerRowHeight + data.length * rowHeight + heightDiff
    )

    // Width and height of the scrollable area
    const { width, height } = useResizeDetector({
      targetRef: outerRef,
      refreshMode: 'throttle',
      refreshRate: 100,
    })

    setHeightDiff(height ? displayHeight - height : 0)

    const edges = useEdges(outerRef, width, height)

    const {
      fullWidth,
      totalWidth: contentWidth,
      columnWidths,
      columnRights,
    } = useColumnWidths(columns, width)

    // True when the active cell is being edited
    const [editing, setEditing] = useState(false)

    // Highlighted cell, null when not focused
    const [activeCell, setActiveCell] = useDeepEqualState<Cell | null>(null)

    // The selection cell and the active cell are the two corners of the selection, null when nothing is selected
    const [selectionCell, setSelectionCell] = useDeepEqualState<Cell | null>(
      null
    )

    // Min and max of the current selection (rectangle defined by the active cell and the selection cell), null when nothing is selected
    const selection = useMemo<Selection | null>(
      () =>
        activeCell &&
        selectionCell && {
          min: {
            col: Math.min(activeCell.col, selectionCell.col),
            row: Math.min(activeCell.row, selectionCell.row),
          },
          max: {
            col: Math.max(activeCell.col, selectionCell.col),
            row: Math.max(activeCell.row, selectionCell.row),
          },
        },
      [activeCell, selectionCell]
    )

    // Behavior of the selection when the user drags the mouse around
    const [selectionMode, setSelectionMode] = useDeepEqualState({
      // True when the position of the cursor should impact the columns of the selection
      columns: false,
      // True when the position of the cursor should impact the rows of the selection
      rows: false,
      // True when the user is dragging the mouse around to select
      active: false,
    })

    const getInnerBoundingClientRect = useGetBoundingClientRect(innerRef)
    const getOuterBoundingClientRect = useGetBoundingClientRect(outerRef)

    // Blur any element on focusing the grid
    useEffect(() => {
      if (activeCell !== null) {
        ;(document.activeElement as HTMLElement).blur()
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [activeCell !== null])

    // Extract the coordinates of the cursor from a mouse event
    const getCursorIndex = useCallback(
      (
        event: MouseEvent,
        force: boolean = false,
        includeSticky: boolean = false
      ): Cell | null => {
        const innerBoundingClientRect = getInnerBoundingClientRect(force)
        const outerBoundingClientRect =
          includeSticky && getOuterBoundingClientRect(force)

        if (innerBoundingClientRect && columnRights && columnWidths) {
          let x = event.clientX - innerBoundingClientRect.left
          let y = event.clientY - innerBoundingClientRect.top

          if (outerBoundingClientRect) {
            if (
              event.clientY - outerBoundingClientRect.top <=
              headerRowHeight
            ) {
              y = 0
            }

            if (
              event.clientX - outerBoundingClientRect.left <=
              columnWidths[0]
            ) {
              x = 0
            }

            if (
              stickyRightColumn &&
              outerBoundingClientRect.right - event.clientX <=
                columnWidths[columnWidths.length - 1]
            ) {
              x = columnRights[columnRights.length - 2] + 1
            }
          }

          return {
            col: columnRights.findIndex((right) => x < right) - 1,
            row: Math.min(
              data.length - 1,
              Math.max(-1, Math.floor((y - headerRowHeight) / rowHeight))
            ),
          }
        }

        return null
      },
      [
        columnRights,
        columnWidths,
        data.length,
        getInnerBoundingClientRect,
        getOuterBoundingClientRect,
        headerRowHeight,
        rowHeight,
        stickyRightColumn,
      ]
    )

    const isCellDisabled = useCallback(
      (cell: Cell): boolean => {
        const disabled = columns[cell.col + 1].disabled

        return Boolean(
          typeof disabled === 'function'
            ? disabled({ rowData: data[cell.row] })
            : disabled
        )
      },
      [columns, data]
    )

    const insertRowAfter = useCallback(
      (row: number, count = 1) => {
        if (lockRows) {
          return
        }

        setSelectionCell(null)
        setEditing(false)

        onChange([
          ...data.slice(0, row + 1),
          ...new Array(count).fill(0).map(createRow),
          ...data.slice(row + 1),
        ])
        setActiveCell((a) => ({ col: a?.col || 0, row: row + count }))
      },
      [createRow, data, lockRows, onChange, setActiveCell, setSelectionCell]
    )

    // Scroll to any given cell making sure it is in view
    const scrollTo = useCallback(
      (cell: Cell) => {
        if (!height || !width) {
          return
        }

        // Align top
        const topMax = cell.row * rowHeight
        // Align bottom
        const topMin = (cell.row + 1) * rowHeight + headerRowHeight - height + 1
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const scrollTop = listRef.current?.state.scrollOffset as number

        if (scrollTop > topMax) {
          listRef.current?.scrollTo(topMax)
        } else if (scrollTop < topMin) {
          listRef.current?.scrollTo(topMin)
        }

        if (columnRights && columnWidths && outerRef.current) {
          // Align left
          const leftMax = columnRights[cell.col] - columnRights[0]
          // Align right
          const leftMin =
            columnRights[cell.col] +
            columnWidths[cell.col + 1] +
            (stickyRightColumn ? columnWidths[columnWidths.length - 1] : 0) -
            width +
            1

          const scrollLeft = outerRef.current.scrollLeft

          if (scrollLeft > leftMax) {
            outerRef.current.scrollLeft = leftMax
          } else if (scrollLeft < leftMin) {
            outerRef.current.scrollLeft = leftMin
          }
        }
      },
      [
        height,
        width,
        rowHeight,
        headerRowHeight,
        columnRights,
        columnWidths,
        stickyRightColumn,
      ]
    )

    // Scroll to the selectionCell cell when it changes
    useEffect(() => {
      if (selectionCell) {
        scrollTo(selectionCell)
      }
    }, [selectionCell, scrollTo])

    // Scroll to the active cell when it changes
    useEffect(() => {
      if (activeCell) {
        scrollTo(activeCell)
      }
    }, [activeCell, scrollTo])

    const onCopy = useCallback(
      (event: ClipboardEvent) => {
        if (!editing && activeCell) {
          const copyData: Array<Array<number | string | null>> = []

          const min: Cell = selection?.min || activeCell
          const max: Cell = selection?.max || activeCell

          for (let row = min.row; row <= max.row; ++row) {
            copyData.push([])

            for (let col = min.col; col <= max.col; ++col) {
              const { copyValue = () => null } = columns[col + 1]
              copyData[row - min.row].push(copyValue({ rowData: data[row] }))
            }
          }

          event.clipboardData?.setData(
            'text/plain',
            copyData.map((row) => row.join('\t')).join('\n')
          )
          event.preventDefault()
        }
      },
      [activeCell, columns, data, editing, selection]
    )
    useDocumentEventListener('copy', onCopy)

    const onPaste = useCallback(
      async (event: ClipboardEvent) => {
        if (!editing && activeCell) {
          const pasteData =
            event.clipboardData
              ?.getData('text')
              .replace(/\r/g, '')
              .split('\n')
              .map((row) => row.split('\t')) || []

          const min: Cell = selection?.min || activeCell
          const max: Cell = selection?.max || activeCell

          // Paste single row
          if (pasteData.length === 1) {
            const newData = [...data]

            for (
              let columnIndex = 0;
              columnIndex < pasteData[0].length;
              columnIndex++
            ) {
              const pasteValue = columns[min.col + columnIndex + 1]?.pasteValue

              if (pasteValue) {
                for (let rowIndex = min.row; rowIndex <= max.row; rowIndex++) {
                  if (
                    !isCellDisabled({
                      col: columnIndex + min.col,
                      row: rowIndex,
                    })
                  ) {
                    newData[rowIndex] = await pasteValue({
                      rowData: newData[rowIndex],
                      value: pasteData[0][columnIndex],
                    })
                  }
                }
              }
            }

            onChange(newData)
            setActiveCell({ col: min.col, row: min.row })
            setSelectionCell({
              col: min.col + pasteData[0].length - 1,
              row: max.row,
            })
          } else {
            // Paste multiple rows
            let newData = [...data]
            const missingRows = min.row + pasteData.length - data.length

            if (missingRows > 0) {
              if (!lockRows) {
                newData = [
                  ...newData,
                  ...new Array(missingRows).fill(0).map(() => createRow()),
                ]
              } else {
                pasteData.splice(pasteData.length - missingRows, missingRows)
              }
            }

            for (
              let columnIndex = 0;
              columnIndex < pasteData[0].length &&
              min.col + columnIndex < columns.length - 1;
              columnIndex++
            ) {
              const pasteValue = columns[min.col + columnIndex + 1]?.pasteValue

              if (pasteValue) {
                for (
                  let rowIndex = 0;
                  rowIndex < pasteData.length;
                  rowIndex++
                ) {
                  if (
                    !isCellDisabled({
                      col: min.col + columnIndex,
                      row: min.row + rowIndex,
                    })
                  ) {
                    newData[min.row + rowIndex] = await pasteValue({
                      rowData: newData[min.row + rowIndex],
                      value: pasteData[rowIndex][columnIndex],
                    })
                  }
                }
              }
            }

            onChange(newData)
            setActiveCell({ col: min.col, row: min.row })
            setSelectionCell({
              col: Math.min(
                min.col + pasteData[0].length - 1,
                columns.length - 2
              ),
              row: min.row + pasteData.length - 1,
            })
          }

          event.preventDefault()
        }
      },
      [
        activeCell,
        columns,
        createRow,
        data,
        editing,
        isCellDisabled,
        lockRows,
        onChange,
        selection?.max,
        selection?.min,
        setActiveCell,
        setSelectionCell,
      ]
    )
    useDocumentEventListener('paste', onPaste)

    const onMouseDown = useCallback(
      (event: MouseEvent) => {
        const clickInside =
          innerRef.current?.contains(event.target as Node) || false

        const cursorIndex = clickInside
          ? getCursorIndex(event, true, true)
          : null

        if (
          !clickInside &&
          editing &&
          activeCell &&
          columns[activeCell.col + 1].keepFocus
        ) {
          return
        }

        const clickOnActiveCell =
          cursorIndex &&
          activeCell &&
          activeCell.col === cursorIndex.col &&
          activeCell.row === cursorIndex.row &&
          !isCellDisabled(activeCell)

        if (clickOnActiveCell && editing) {
          return
        }

        const clickOnStickyRightColumn =
          cursorIndex?.col === columns.length - 2 && stickyRightColumn

        if (clickOnStickyRightColumn) {
          // TODO
          return
        }

        setActiveCell(
          cursorIndex && {
            col: Math.max(0, cursorIndex.col),
            row: Math.max(0, cursorIndex.row),
          }
        )
        setEditing(Boolean(clickOnActiveCell))
        setSelectionMode(
          cursorIndex
            ? {
                columns: cursorIndex.col !== -1,
                rows: cursorIndex.row !== -1,
                active: true,
              }
            : {
                columns: false,
                rows: false,
                active: false,
              }
        )

        if (cursorIndex?.col === -1 || cursorIndex?.row === -1) {
          let col = cursorIndex.col
          let row = cursorIndex.row

          if (cursorIndex.col === -1) {
            col = columns.length - (stickyRightColumn ? 3 : 2)
          }

          if (cursorIndex.row === -1) {
            row = data.length - 1
          }

          setSelectionCell({ col, row })
        } else {
          setSelectionCell(null)
        }

        if (clickInside) {
          event.preventDefault()
        }
      },
      [
        activeCell,
        columns,
        data.length,
        editing,
        getCursorIndex,
        isCellDisabled,
        setActiveCell,
        setSelectionCell,
        setSelectionMode,
        stickyRightColumn,
      ]
    )
    useDocumentEventListener('mousedown', onMouseDown)

    const onMouseUp = useCallback(() => {
      setSelectionMode({
        columns: false,
        rows: false,
        active: false,
      })
    }, [setSelectionMode])
    useDocumentEventListener('mouseup', onMouseUp)

    const onMouseMove = useCallback(
      (event: MouseEvent) => {
        if (selectionMode.active) {
          const cursorIndex = getCursorIndex(event)

          const lastColumnIndex = columns.length - (stickyRightColumn ? 3 : 2)

          setSelectionCell(
            cursorIndex && {
              col: selectionMode.columns
                ? Math.max(0, Math.min(lastColumnIndex, cursorIndex.col))
                : lastColumnIndex,
              row: selectionMode.rows
                ? Math.max(0, cursorIndex.row)
                : data.length - 1,
            }
          )
          setEditing(false)
        }
      },
      [
        selectionMode.active,
        selectionMode.columns,
        selectionMode.rows,
        getCursorIndex,
        columns.length,
        stickyRightColumn,
        setSelectionCell,
        data.length,
      ]
    )
    useDocumentEventListener('mousemove', onMouseMove)

    const headerContext = useMemoObject<HeaderContextType<T>>({
      hasStickyRightColumn: Boolean(stickyRightColumn),
      height: headerRowHeight,
      contentWidth: fullWidth ? undefined : contentWidth,
      columns,
      activeColMin: selection?.min.col ?? activeCell?.col,
      activeColMax: selection?.max.col ?? activeCell?.col,
    })

    const dataRef = useRef(data)
    dataRef.current = data

    const setRowData = useCallback(
      (rowIndex: number, item: T) => {
        onChange([
          ...dataRef.current?.slice(0, rowIndex),
          item,
          ...dataRef.current?.slice(rowIndex + 1),
        ])
      },
      [onChange]
    )

    const selectionContext = useMemoObject<SelectionContextType>({
      columnRights,
      columnWidths,
      activeCell,
      selection,
      headerRowHeight,
      rowHeight,
      hasStickyRightColumn: Boolean(stickyRightColumn),
      dataLength: data.length,
      viewHeight: height,
      viewWidth: width,
      contentWidth: fullWidth ? undefined : contentWidth,
      edges,
      editing,
      isCellDisabled,
    })

    const itemData = useMemoObject<ListItemData<T>>({
      data,
      contentWidth: fullWidth ? undefined : contentWidth,
      columns,
      hasStickyRightColumn: Boolean(stickyRightColumn),
      activeCell,
      selectionMinRow: selection?.min.row ?? activeCell?.row,
      selectionMaxRow: selection?.max.row ?? activeCell?.row,
      editing,
      setRowData,
    })

    const itemSize = useCallback(
      (index) => (index === 0 ? headerRowHeight : rowHeight),
      [headerRowHeight, rowHeight]
    )

    return (
      <div
      // tabIndex={rawColumns.length && data.length ? 0 : undefined}
      // onFocus={(e) => {
      //   e.target.blur()
      //   setActiveCell({ col: 0, row: 0 })
      // }}
      >
        <HeaderContext.Provider value={headerContext}>
          <SelectionContext.Provider value={selectionContext}>
            <VariableSizeList<ListItemData<T>>
              className="dsg-container"
              width="100%"
              ref={listRef}
              height={displayHeight}
              itemCount={data.length + 1}
              itemSize={itemSize}
              estimatedItemSize={rowHeight}
              itemData={itemData}
              outerRef={outerRef}
              innerRef={innerRef}
              innerElementType={InnerContainer}
              children={Row}
              useIsScrolling={columns.some(
                ({ renderWhenScrolling }) => !renderWhenScrolling
              )}
            />
          </SelectionContext.Provider>
        </HeaderContext.Provider>
        <AddRowsComponent
          addRows={(count) => insertRowAfter(data.length - 1, count)}
        />
      </div>
    )
  }
) as <T extends any>(props: DataSheetGridProps<T>) => JSX.Element

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
DataSheetGrid.displayName = 'DataSheetGrid'
