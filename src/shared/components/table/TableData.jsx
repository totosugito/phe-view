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
import {twMerge} from "tailwind-merge";


const TableData = ({
                       columns, data, tableLayout = "fixed",
                       rowsPerPage = 5,
                       styleTableContainer = "",
                       styleTable = "",
                       styleHeaderRow = "",
                       styleHeaderCell = "",
                       styleBodyRow = "",
                       styleBodyCell = "",
                       headerSeparator="",
                       toolbarTopLeft,
                       toolbarBottomLeft,
                       showTopToolbar = true,
                       showBottomToolbar = true,
                       ...props
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
            <div className={twMerge("h-full rounded-lg bordered border-[1px] border-base-300 overflow-auto", styleTableContainer)}>
                {showTopToolbar &&
                    <div className="flex justify-between items-center p-2">
                        <div>{toolbarTopLeft}</div>
                        <TableSearch searchQuery={searchQuery} setSearchQuery={setSearchQuery}/>
                    </div>
                }

                <div className="overflow-x-auto mx-auto pb-1">
                    <table className={twMerge("table table-sm", styleTable)} style={{tableLayout: tableLayout}}>
                        <thead>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <tr key={headerGroup.id} className={twMerge("font-bold text-base-content border-t", styleHeaderRow)}>
                                {headerGroup.headers.map((header, index) => {
                                    return (
                                        <th key={header.id} style={{width: header.getSize()}} className={twMerge("py-1 px-[1px]", styleHeaderCell)}>
                                            {header.isPlaceholder
                                                ? null
                                                :
                                                <div className={"flex flex-row items-center gap-1"}>
                                                    {(index > 0) && <span className={twMerge("text-neutral-300", headerSeparator)}>|</span>}
                                                    {flexRender(
                                                        header.column.columnDef.header,
                                                        header.getContext()
                                                    )}</div>
                                            }
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
                                    className={twMerge("border-b hover:bg-base-200", styleBodyRow)}>
                                    {row.getVisibleCells().map((cell) => (
                                        <td key={cell.id} className={twMerge("text-sm", styleBodyCell)}>
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </td>
                                    ))}
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={columns.length} className="h-24 text-center">
                                    {t("shared.noData")}
                                </td>
                            </tr>
                        )}
                        </tbody>
                    </table>
                </div>
                {showBottomToolbar &&
                    <div className="flex justify-between items-center bg-base-100 p-2 border-t border-base-300">
                        <div>{toolbarBottomLeft}</div>
                        <div className={"flex flex-row gap-4"}>
                            <TableRowsPerPage table={table} rowsPerPage={tableRowsPerPage} setRowsPerPage={setTableRowsPerPage}/>
                            <TablePagination table={table} pageIndex={pageIndex} setPageIndex={setPageIndex} rowsPerPage={tableRowsPerPage}/>
                        </div>
                    </div>
                }
            </div>
        </div>
    );
}
export default TableData
