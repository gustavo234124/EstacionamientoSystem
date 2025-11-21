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
            accessorKey: 'nombre',
            header: 'Nombre',
        },
        {
            accessorKey: 'placas',
            header: 'placas',
        },
        {
            accessorKey: 'Hora Entrada',
            header: 'Hora Entrada',
        },
        {
            accessorKey: 'Hora Salida',
            header: 'Hora Salida',
        },
        {
            accessorKey: 'Costo',
            header: 'Costo',
        },
    ]

    const data = [
        { id: 1, nombre: 'Juan', placas: 'Snt1068', 'Hora Entrada': '10:00', 'Hora Salida': '11:00', 'Costo': '$10' },
        { id: 2, nombre: 'María', placas: 'Snt1068', 'Hora Entrada': '10:00', 'Hora Salida': '11:00', 'Costo': '$10' },
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