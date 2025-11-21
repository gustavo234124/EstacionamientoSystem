import { useState, useEffect } from 'react'

export default function DetallesRegistroModal({
    isOpen,
    onClose,
    registroId,
    fecha
}) {
    const [detalles, setDetalles] = useState([])
    const [cargando, setCargando] = useState(false)

    useEffect(() => {
        if (isOpen && registroId) {
            setCargando(true)
            // Simular delay de API
            setTimeout(() => {
                // Datos hardcodeados por registro
                const detallesData = {
                    1: [
                        { id: 1, nombre: 'Juan', placas: 'Snt1068', 'Hora Entrada': '10:00', 'Hora Salida': '11:00', 'Costo': '$15' },
                        { id: 2, nombre: 'María', placas: 'Snt1069', 'Hora Entrada': '10:30', 'Hora Salida': '11:30', 'Costo': '$30' },
                    ],
                    2: [
                        { id: 3, nombre: 'Carlos', placas: 'Snt1070', 'Hora Entrada': '09:00', 'Hora Salida': '10:00', 'Costo': '$15' },
                        { id: 4, nombre: 'Ana', placas: 'Snt1071', 'Hora Entrada': '09:15', 'Hora Salida': '10:15', 'Costo': '$15' },
                    ],
                }

                setDetalles(detallesData[registroId] || [])
                setCargando(false)
            }, 500)
        }
    }, [isOpen, registroId])

    if (!isOpen) return null

    const totalIngresos = detalles.reduce((sum, row) => {
        const costo = parseFloat(row.Costo.replace('$', ''))
        return sum + costo
    }, 0)

    return (
        <div
            className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center p-4 z-50"
            onClick={onClose}
        >
            <div
                className="bg-white rounded-lg max-w-4xl w-full max-h-96 overflow-auto"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="sticky top-0 bg-gray-600 text-white p-4 flex justify-between items-center">
                    <h2 className="text-xl font-bold">Detalles del día {fecha}</h2>
                    <button
                        onClick={onClose}
                        className="text-2xl hover:text-gray-200"
                    >
                        ×
                    </button>
                </div>

                <div className="p-4">
                    {cargando ? (
                        <p>Cargando...</p>
                    ) : (
                        <table className="w-full border-collapse border border-gray-300">
                            <thead className="bg-gray-200">
                                <tr>
                                    <th className="border p-2">ID</th>
                                    <th className="border p-2">Nombre</th>
                                    <th className="border p-2">Placas</th>
                                    <th className="border p-2">Entrada</th>
                                    <th className="border p-2">Salida</th>
                                    <th className="border p-2">Costo</th>
                                </tr>
                            </thead>
                            <tbody>
                                {detalles.map((row, idx) => (
                                    <tr key={row.id} className={idx % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                                        <td className="border p-2">{row.id}</td>
                                        <td className="border p-2">{row.nombre}</td>
                                        <td className="border p-2">{row.placas}</td>
                                        <td className="border p-2">{row['Hora Entrada']}</td>
                                        <td className="border p-2">{row['Hora Salida']}</td>
                                        <td className="border p-2">{row.Costo}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>

                <div className="bg-gray-100 p-4 flex justify-end">
                    <p className='pr-10'>Total de ingresos: <span><b>${totalIngresos.toFixed(2)}</b></span></p>
                    <button
                        onClick={onClose}
                        className="bg-green-800 text-white px-4 py-2 rounded"
                    >
                        Cerrar
                    </button>
                </div>
            </div>
        </div>
    )
}