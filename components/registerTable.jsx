import { useState } from 'react'
import DetallesRegistroModal from './DetailsRegisterModal'

export default function RegisterTable() {
    const [modalAbierto, setModalAbierto] = useState(false)
    const [registroSeleccionado, setRegistroSeleccionado] = useState(null)

    const data = [
        { id: 1, fecha: '18-11-2025' },
        { id: 2, fecha: '25-11-2025' },
    ]

    const handleVerMas = (row) => {
        setRegistroSeleccionado(row)
        setModalAbierto(true)
    }

    return (
        <>
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
            </div>

            <DetallesRegistroModal
                isOpen={modalAbierto}
                onClose={() => setModalAbierto(false)}
                registroId={registroSeleccionado?.id}
                fecha={registroSeleccionado?.fecha}
            />
        </>
    )
}