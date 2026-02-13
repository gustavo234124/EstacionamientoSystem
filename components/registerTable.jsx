import { useState, useEffect } from 'react'
import DetallesRegistroModal from './DetailsRegisterModal'

export default function RegisterTable() {
    const [modalAbierto, setModalAbierto] = useState(false)
    const [registroSeleccionado, setRegistroSeleccionado] = useState(null)
    const [dias, setDias] = useState([])
    const [cargando, setCargando] = useState(true)

    useEffect(() => {
        cargarDias()
    }, [])

    const cargarDias = async () => {
        try {
            const response = await fetch('/api/dias/todos')
            const data = await response.json()

            // Validar que data sea un array
            if (!Array.isArray(data)) {
                console.error('La respuesta no es un array:', data)
                setDias([])
                setCargando(false)
                return
            }

            // Formatear los datos
            const diasFormateados = data.map(dia => {
                const fechaObj = new Date(dia.fecha)
                const fechaFormateada = fechaObj.toLocaleDateString('es-MX')
                const fechaOriginal = dia.fecha // Guardar formato original YYYY-MM-DD para API

                const horaInicio = new Date(dia.hora_inicio).toLocaleTimeString('es-MX', {
                    hour: '2-digit',
                    minute: '2-digit'
                })
                const horaFin = new Date(dia.hora_fin).toLocaleTimeString('es-MX', {
                    hour: '2-digit',
                    minute: '2-digit'
                })

                return {
                    ...dia,
                    fecha: fechaFormateada,
                    fechaOriginal,
                    horario: `${horaInicio} - ${horaFin}`,
                    horaInicioISO: new Date(dia.hora_inicio).toISOString(),
                    horaFinISO: new Date(dia.hora_fin).toISOString()
                }
            })

            setDias(diasFormateados)
            setCargando(false)
        } catch (error) {
            console.error('Error al cargar días:', error)
            setDias([])
            setCargando(false)
        }
    }

    const handleVerMas = (row) => {
        setRegistroSeleccionado(row)
        setModalAbierto(true)
    }

    if (cargando) {
        return <div className="text-center p-8">Cargando registros...</div>
    }

    return (
        <>
            <div className="overflow-x-auto">
                <table className="w-250 border-collapse border border-gray-300">
                    <thead className="bg-gray-600 text-white">
                        <tr>
                            <th className="border p-3 text-left">ID</th>
                            <th className="border p-3 text-left">Fecha</th>
                            <th className="border p-3 text-left">Horario</th>
                            <th className="border p-3 text-left">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {dias.length === 0 ? (
                            <tr>
                                <td colSpan="4" className="border p-3 text-center text-gray-500">
                                    No hay registros de días trabajados
                                </td>
                            </tr>
                        ) : (
                            dias.map((row, idx) => (
                                <tr
                                    key={row.id}
                                    className={idx % 2 === 0 ? 'bg-gray-100' : 'bg-white'}
                                >
                                    <td className="border p-3">{idx + 1}</td>
                                    <td className="border p-3">{row.fecha}</td>
                                    <td className="border p-3">{row.horario}</td>
                                    <td className="border p-3">
                                        <button
                                            onClick={() => handleVerMas(row)}
                                            className="text-blue-600 hover:text-blue-800 hover:underline cursor-pointer"
                                        >
                                            Ver más
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            <DetallesRegistroModal
                isOpen={modalAbierto}
                onClose={() => setModalAbierto(false)}
                registroId={registroSeleccionado?.id}
                fecha={registroSeleccionado?.fecha}
                horaInicio={registroSeleccionado?.horaInicioISO}
                horaFin={registroSeleccionado?.horaFinISO}
            />
        </>
    )
}