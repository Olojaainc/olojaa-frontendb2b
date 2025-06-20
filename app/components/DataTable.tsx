"use client"

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"

interface DataTableProps<T extends object> {
  columns: ColumnDef<T>[]
  data: T[]
  showPagination?: boolean
  onRowClick?: (row: T) => void
  isLoading?: boolean
  skeletonRows?: number
}

// Skeleton row component
const SkeletonRow = ({ columnCount }: { columnCount: number }) => (
  <TableRow>
    {Array.from({ length: columnCount }).map((_, index) => (
      <TableCell key={index} className="py-4">
        <div className="flex items-center space-x-1">
          {index === 0 && (
            <Skeleton className="h-4 w-4 rounded border" />
          )}
          
          <div className="flex flex-col space-y-1 flex-1">
            <Skeleton 
              className="h-4" 
              style={{ 
                width: index === 0 ? '80px' : 
                       index === 1 ? '120px' : 
                       index === 2 ? '100px' : 
                       index === columnCount - 1 ? '60px' : '90px' 
              }} 
            />
          </div>
        </div>
      </TableCell>
    ))}
  </TableRow>
)

const SkeletonPagination = () => (
  <div className="flex items-center justify-end space-x-2 py-4">
    <div className="text-sm text-muted-foreground">
      <Skeleton className="h-4 w-20" />
    </div>
    <div className="space-x-2 flex">
      <Skeleton className="h-8 w-16 rounded-md" />
    </div>
  </div>
)

export function DataTable<T extends object>({
  columns = [],
  data = [],
  showPagination = true,
  onRowClick,
  isLoading = false,
  skeletonRows = 5,
}: DataTableProps<T>) {

  const table = useReactTable({
    data,
    columns,
    getRowId: (_, index) => index.toString(),
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  })

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map(headerGroup => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map(header => (
                <TableHead
                  className="text-[var(--gray-600)] font-semibold text-sm"
                  key={header.id}
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(header.column.columnDef.header, header.getContext())}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {isLoading ? (
            // Show skeleton rows when loading
            Array.from({ length: skeletonRows }).map((_, index) => (
              <SkeletonRow key={`skeleton-${index}`} columnCount={columns.length} />
            ))
          ) : table.getRowModel().rows.length ? (
            // Show actual data when loaded
            table.getRowModel().rows.map(row => (
              <TableRow
                key={row.id}
                onClick={() => onRowClick?.(row.original)}
                className="cursor-pointer hover:bg-gray-50 transition-colors duration-150"
              >
                {row.getVisibleCells().map(cell => (
                  <TableCell
                    className="text-[var(--gray-500)] font-medium text-sm"
                    key={cell.id}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            // Show empty state when no data
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                <div className="flex flex-col items-center justify-center space-y-2">
                  <div className="text-gray-500 text-sm">No results found</div>
                  <div className="text-gray-400 text-xs">Try adjusting your search or filter criteria</div>
                </div>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      {showPagination && (
        <>
          {isLoading ? (
            <SkeletonPagination />
          ) : (
            <div className="flex items-center justify-end space-x-2 py-4">
              <div className="text-sm text-muted-foreground">
                Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
              </div>
              <div className="space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => table.previousPage()}
                  disabled={!table.getCanPreviousPage()}
                >
                  Previous
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => table.nextPage()}
                  disabled={!table.getCanNextPage()}
                >
                  Next
                </Button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  )
}