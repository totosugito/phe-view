import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable
} from "@tanstack/react-table";
import {useState} from "react";
import TablePagination from "./Pagination.jsx"
import TableSearch from "./Search.jsx"
import TableRowsPerPage from "./RowsPerPage.jsx"
import {useTranslation} from "react-i18next";


const TableData = ({
                     columns, data, tableLayout = "fixed",
                     toolbarTopLeft,
                     rowsPerPage = 5,
                     styleTableContainer = "",
                     className = "table table-zebra table-sm",
                     styleHeaderRow = "border-b border-neutral-500",
                     styleHeaderCell = "p-0 bg-neutral",
                     styleBodyRow = "border-b border-neutral-500",
                     styleBodyCell = "text-sm",
                     showTopToolbar = true,
                     showBottomToolbar = true
                   }) => {
  const {t} = useTranslation();
  const [sorting, setSorting] = useState([]);
  const [tableRowsPerPage, setTableRowsPerPage] = useState(rowsPerPage); // Default rows per page
  const [pageIndex, setPageIndex] = useState(0); // Track current page
  const [searchQuery, setSearchQuery] = useState(''); // Track search query

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      globalFilter: searchQuery,
      pagination: {
        pageIndex,
        pageSize: tableRowsPerPage
      }
    },
    onGlobalFilterChange: setSearchQuery, // Change setGlobalFilter to setSearchQuery
    onPaginationChange: (updater) => {
      const newPagination = typeof updater === "function" ? updater({pageIndex, pageSize: tableRowsPerPage}) : updater;
      setPageIndex(newPagination.pageIndex);
      setTableRowsPerPage(newPagination.pageSize);
    }
  })

  return (
    <div>
      {showTopToolbar &&
        <div className="flex justify-between items-center mb-2">
          <div>{toolbarTopLeft}</div>
          <TableSearch searchQuery={searchQuery} setSearchQuery={setSearchQuery}/>
        </div>
      }

      <div className={`overflow-x-auto mx-auto h-full ${styleTableContainer}`}>
        <table className={className} style={{tableLayout: tableLayout}}>
          <thead className={""}>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id} className={styleHeaderRow}>
              {headerGroup.headers.map((header) => {
                return (
                  <th key={header.id} style={{width: header.getSize()}} className={styleHeaderCell}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                  </th>
                )
              })}
            </tr>
          ))}
          </thead>
          <tbody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <tr
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
                className={styleBodyRow}>
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className={styleBodyCell}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={columns.length} className="h-24 text-center">
                {t("components.noData")}
              </td>
            </tr>
          )}
          </tbody>
        </table>
      </div>

      {showBottomToolbar &&
        <div className="flex justify-between items-center mt-2">
          <TableRowsPerPage table={table} rowsPerPage={tableRowsPerPage} setRowsPerPage={setTableRowsPerPage}/>
          <TablePagination table={table} pageIndex={pageIndex} setPageIndex={setPageIndex}/>
        </div>
      }
    </div>
  );
}
export default TableData
