import React from 'react';
import Link from 'next/link'
import {
    useReactTable,
    getCoreRowModel,
    flexRender,
} from '@tanstack/react-table'

export default function RegisterTable() {

    const columns = [
        {
            accessorKey: 'id',
            header: 'ID',
        },
        {
            accessorKey: 'fecha',
            header: 'Fecha',
        },
        {
            accessorKey: 'acciones',
            header: 'Acciones',
            cell: (info) => (
                <Link
                    href={`/detalles/${info.row.original.id}`}
                    className="text-blue-600 hover:text-blue-800 hover:underline"
                >
                    Ver más
                </Link>
            ),
        },
    ]

    const data = [
        { id: 1, fecha: '18-11-2025', acciones: 'Ver mas' },
        { id: 2, fecha: '25-11-2025', acciones: 'Ver mas' },
    ]


    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
    })

    return (
        <div className="overflow-x-auto">
            <table className="w-250 border-collapse border border-gray-300">
                <thead className="bg-gray-600 text-white">
                    {table.getHeaderGroups().map(headerGroup => (
                        <tr key={headerGroup.id}>
                            {headerGroup.headers.map(header => (
                                <th key={header.id} className="border p-3 text-left">
                                    {flexRender(
                                        header.column.columnDef.header,
                                        header.getContext()
                                    )}
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody>
                    {table.getRowModel().rows.map((row, idx) => (
                        <tr
                            key={row.id}
                            className={idx % 2 === 0 ? 'bg-gray-100' : 'bg-white'}
                        >
                            {row.getVisibleCells().map(cell => (
                                <td key={cell.id} className="border p-3">
                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}