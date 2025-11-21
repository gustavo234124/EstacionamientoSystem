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
        <table>
            <thead>
                {table.getHeaderGroups().map(headerGroup => (
                    <tr key={headerGroup.id}>
                        {headerGroup.headers.map(header => (
                            <th key={header.id}>
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
                {table.getRowModel().rows.map(row => (
                    <tr key={row.id}>
                        {row.getVisibleCells().map(cell => (
                            <td key={cell.id}>
                                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                            </td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    )
}