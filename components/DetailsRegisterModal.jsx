import { useState, useEffect } from 'react'

export default function DetallesRegistroModal({
    isOpen,
    onClose,
    registroId,
    fecha,
    fechaOriginal
}) {
    const [detalles, setDetalles] = useState([])
    const [cargando, setCargando] = useState(false)

    useEffect(() => {
        if (isOpen && fechaOriginal) {
            cargarVehiculos()
        }
    }, [isOpen, fechaOriginal])

    const cargarVehiculos = async () => {
        setCargando(true)
        try {
            const response = await fetch(`/api/vehiculos/por-fecha?fecha=${fechaOriginal}`)
            const data = await response.json()

            if (!Array.isArray(data)) {
                console.error('La respuesta no es un array:', data)
                setDetalles([])
                setCargando(false)
                return
            }

            // Formatear los datos
            const vehiculosFormateados = data.map(v => ({
                id: v.id,
                nombre: v.nombre,
                placas: v.placas,
                observaciones: v.observaciones,
                horaEntrada: new Date(v.entrada).toLocaleTimeString('es-MX', {
                    hour: '2-digit',
                    minute: '2-digit'
                }),
                horaSalida: new Date(v.salida).toLocaleTimeString('es-MX', {
                    hour: '2-digit',
                    minute: '2-digit'
                }),
                costo: parseFloat(v.costo || 0)
            }))

            setDetalles(vehiculosFormateados)
            setCargando(false)
        } catch (error) {
            console.error('Error al cargar vehículos:', error)
            setDetalles([])
            setCargando(false)
        }
    }

    if (!isOpen) return null

    const totalIngresos = detalles.reduce((sum, row) => sum + row.costo, 0)

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
                        <p className="text-center py-8">Cargando vehículos...</p>
                    ) : detalles.length === 0 ? (
                        <p className="text-center py-8 text-gray-500">No hay vehículos registrados para este día</p>
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
                                        <td className="border p-2">{row.horaEntrada}</td>
                                        <td className="border p-2">{row.horaSalida}</td>
                                        <td className="border p-2">${row.costo.toFixed(2)}</td>
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