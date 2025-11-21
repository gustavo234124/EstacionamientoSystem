import { useState } from 'react'

export default function RegisterTable() {
    const [modalAbierto, setModalAbierto] = useState(false)
    const [registroSeleccionado, setRegistroSeleccionado] = useState(null)

    const data = [
        { id: 1, fecha: '18-11-2025' },
        { id: 2, fecha: '25-11-2025' },
    ]

    const handleVerMas = (row) => {
        console.log('Click en Ver más:', row)
        setRegistroSeleccionado(row)
        setModalAbierto(true)
    }

    return (
        <div className="overflow-x-auto">
            <table className="w-250 border-collapse border border-gray-300">
                <thead className="bg-gray-600 text-white">
                    <tr>
                        <th className="border p-3 text-left">ID</th>
                        <th className="border p-3 text-left">Fecha</th>
                        <th className="border p-3 text-left">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((row, idx) => (
                        <tr
                            key={row.id}
                            className={idx % 2 === 0 ? 'bg-gray-100' : 'bg-white'}
                        >
                            <td className="border p-3">{row.id}</td>
                            <td className="border p-3">{row.fecha}</td>
                            <td className="border p-3">
                                <button
                                    onClick={() => handleVerMas(row)}
                                    className="text-blue-600 hover:text-blue-800 hover:underline cursor-pointer"
                                >
                                    Ver más
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Modal */}
            {modalAbierto && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
                    onClick={() => setModalAbierto(false)}
                >
                    <div
                        className="bg-white rounded-lg max-w-4xl w-full max-h-96 overflow-auto"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Header del modal */}
                        <div className="sticky top-0 bg-gray-600 text-white p-4 flex justify-between items-center">
                            <h2 className="text-xl font-bold">Detalles del día {registroSeleccionado?.fecha}</h2>
                            <button
                                onClick={() => setModalAbierto(false)}
                                className="text-2xl hover:text-gray-200"
                            >
                                ×
                            </button>
                        </div>

                        {/* Contenido del modal */}
                        <div className="p-4">



                        </div>

                        {/* Footer del modal */}
                        <div className="bg-gray-100 p-4 flex justify-end">
                            <button
                                onClick={() => setModalAbierto(false)}
                                className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
                            >
                                Cerrar
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}