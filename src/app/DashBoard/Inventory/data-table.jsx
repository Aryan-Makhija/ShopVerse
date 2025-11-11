"use client";

import {
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { DataTablePagination } from "@/components/Dashboard/TabelPagination";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { rankItem } from "@tanstack/match-sorter-utils";
// for fuzzy search
// DataTable component in plain JavaScript
export function DataTable({ columns }) {


    const [data, setdata] = useState([])


    const getdata = async () => {
        const response = await fetch("/api/InventoryTestapi", {
            method: "GET"
        })
        const data = await response.json()
        setdata(data)

    }

    useEffect(() => {
        getdata()
    }, [])
    const [sorting, setSorting] = useState([])
    const [rowSelection, setrowSelection] = useState([])
    const [columnFilters, setColumnFilters] = useState(
        []
    )

    const [globalFilter, setGlobalFilter] = useState("")
    function fuzzyFilter(row, columnId, value) {
        const itemRank = rankItem(row.getValue(columnId), value)
        return itemRank.passed
    }

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        onSortingChange: setSorting,
        getSortedRowModel: getSortedRowModel(),
        onRowSelectionChange: setrowSelection,
        onColumnFiltersChange: setColumnFilters,
        getFilteredRowModel: getFilteredRowModel(),
        onGlobalFilterChange: setGlobalFilter,
        globalFilterFn: fuzzyFilter,
        state: {
            sorting,
            rowSelection,
            columnFilters,
            globalFilter
        },
    });
    return (
        <div className="overflow-hidden rounded-md border">
            <div className="flex items-center py-4">
                <Input
                    placeholder="Search products..."
                    value={table.getState().globalFilter ?? ""}
                    onChange={(event) => table.setGlobalFilter(event.target.value)}
                    className="max-w-sm"
                />
            </div>
            <Table>
                <TableHeader>
                    {table.getHeaderGroups().map((headerGroup) => (
                        <TableRow key={headerGroup.id}>
                            {headerGroup.headers.map((header) => (
                                <TableHead key={header.id}>
                                    {header.isPlaceholder
                                        ? null
                                        : flexRender(
                                            header.column.columnDef.header,
                                            header.getContext()
                                        )}
                                </TableHead>
                            ))}
                        </TableRow>
                    ))}
                </TableHeader>
                <TableBody>
                    {table.getRowModel().rows?.length ? (
                        table.getRowModel().rows.map((row) => (
                            <TableRow
                                key={row.id}
                                data-state={row.getIsSelected() && "selected"}
                            >
                                {row.getVisibleCells().map((cell) => (
                                    <TableCell key={cell.id}>
                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={columns.length} className="h-24 text-center">
                                No results.
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
            {/* <div className="flex items-center justify-end space-x-2 py-4">
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
            </div> */}
            <DataTablePagination table={table}></DataTablePagination>
        </div>
    );
}
