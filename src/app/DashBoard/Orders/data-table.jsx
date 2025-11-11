// components/orders-table.jsx
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

import { Input } from "@/components/ui/input";
import { DataTablePagination } from "@/components/Dashboard/TabelPagination";
import { rankItem } from "@tanstack/match-sorter-utils";
import { useEffect, useState } from "react";

import { Loader2 } from "lucide-react";
function flattenOrders(orders) {
  const flattened = [];

  orders.forEach(order => {
    order.products.forEach(product => {
      flattened.push({
        ...product,
        orderId: order._id,
        order_status: order.order_details.order_status,
        shipping_address: order.order_details.shipping_address,
        billing_address: order.order_details.billing_address,
        payment_Status: order.order_details.payment_Status,
        payment_type: order.order_details.payment_type,
        user: order.user,
      });
    });
  });

  return flattened;
}




export function DataTable({ columns }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);



  // Fetch admin's orders
  const fetchData = async () => {
    try {
      const res = await fetch("/api/Order/AdminOrders");
      const json = await res.json();
      //  console.log(json)
      const flattened = flattenOrders(json);
      setData(flattened);
    } catch (err) {
      console.error("Failed to fetch orders:", err);
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    fetchData();
  }, []);

  const [sorting, setSorting] = useState([]);
  const [rowSelection, setRowSelection] = useState({});
  const [columnFilters, setColumnFilters] = useState([]);
  const [globalFilter, setGlobalFilter] = useState("");

  function fuzzyFilter(row, columnId, value) {
    const itemRank = rankItem(row.getValue(columnId), value);
    return itemRank.passed;
  }

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    onRowSelectionChange: setRowSelection,
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    globalFilterFn: fuzzyFilter,
    state: {
      sorting,
      rowSelection,
      columnFilters,
      globalFilter,
    },
  });

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <Loader2 className="animate-spin h-6 w-6 text-gray-500" />
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-md border">
      <div className="flex items-center justify-between px-4 py-4">
        <Input
          placeholder="Search orders..."
          value={globalFilter ?? ""}
          onChange={(e) => setGlobalFilter(e.target.value)}
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
          {table.getRowModel().rows.length ? (
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
              <TableCell colSpan={columns.length} className="text-center py-12">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      <DataTablePagination table={table} />
    </div>
  );
}
