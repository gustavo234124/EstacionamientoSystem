// Mock Data Service - remplazando la base de datos con datos en memoria

let mockStore = {
    usuarios: [
        {
            id: 1,
            nombre_usuario: 'demo',
            contrasena: 'demo123',
            email: 'demo@estacionamiento.com'
        }
    ],
    registros: [],
    dias: [],
    nextId: 1
};

function inicializarDatosEjemplo() {
    const ahora = new Date();
    mockStore.registros = [];

    for (let d = 1; d <= 5; d++) {
        const fechaDia = new Date(ahora);
        fechaDia.setDate(fechaDia.getDate() - d);

        const inicioDia = new Date(fechaDia);
        inicioDia.setHours(8, 0, 0, 0);

        const finDia = new Date(fechaDia);
        finDia.setHours(20, 0, 0, 0);

        const numVehiculos = Math.floor(Math.random() * 8) + 5;
        let totalDia = 0;
        let atendidosDia = 0;

        for (let v = 0; v < numVehiculos; v++) {
            const entrada = new Date(inicioDia);
            entrada.setMinutes(entrada.getMinutes() + Math.floor(Math.random() * 600));

            let salida = new Date(entrada);
            salida.setHours(salida.getHours() + Math.floor(Math.random() * 3) + 1);
            salida.setMinutes(salida.getMinutes() + Math.floor(Math.random() * 60));
            if (salida > finDia) salida = new Date(finDia);

            const precio = Math.floor(Math.random() * 150) + 30;

            mockStore.registros.push({
                id: mockStore.nextId++,
                nombre: generarNombreAleatorio(),
                placas: generarPlacaAleatoria(),
                observaciones: generarObservacionAleatoria(),
                entrada: entrada.toISOString(),
                salida: salida.toISOString(),
                precio: precio,
                color: generarColorAleatorio()
            });

            totalDia += precio;
            atendidosDia++;
        }

        mockStore.dias.push({
            id: mockStore.nextId++,
            fecha: fechaDia.toISOString().split('T')[0],
            total: totalDia,
            vehiculos_atendidos: atendidosDia,
            hora_inicio: inicioDia.toISOString(),
            hora_fin: finDia.toISOString()
        });
    }
}

function generarNombreAleatorio() {
    const nombres = ['Ana', 'Luis', 'Pedro', 'Sofia', 'Miguel', 'Laura', 'Jorge', 'Carmen', 'Roberto', 'Elena'];
    const apellidos = ['García', 'Martínez', 'López', 'Hernández', 'González', 'Pérez', 'Sánchez', 'Ramírez', 'Torres', 'Flores'];
    return `${nombres[Math.floor(Math.random() * nombres.length)]} ${apellidos[Math.floor(Math.random() * apellidos.length)]}`;
}

function generarPlacaAleatoria() {
    const letras = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const numeros = '0123456789';
    return `${letras[Math.floor(Math.random() * letras.length)]}${letras[Math.floor(Math.random() * letras.length)]}${letras[Math.floor(Math.random() * letras.length)]}-${numeros[Math.floor(Math.random() * 10)]}${numeros[Math.floor(Math.random() * 10)]}${numeros[Math.floor(Math.random() * 10)]}`;
}

function generarObservacionAleatoria() {
    const tipos = ['Sedan', 'SUV', 'Pickup', 'Hatchback', 'Camioneta'];
    const colores = ['blanco', 'negro', 'gris', 'rojo', 'azul', 'plata'];
    return `${tipos[Math.floor(Math.random() * tipos.length)]} ${colores[Math.floor(Math.random() * colores.length)]}`;
}

function generarColorAleatorio() {
    const colores = [
        'from-orange-400 to-orange-600',
        'from-blue-400 to-blue-600',
        'from-purple-400 to-purple-600',
        'from-green-400 to-green-600',
        'from-red-400 to-red-600',
        'from-pink-400 to-pink-600',
        'from-yellow-400 to-yellow-600',
        'from-indigo-400 to-indigo-600',
        'from-teal-400 to-teal-600',
    ];
    return colores[Math.floor(Math.random() * colores.length)];
}

inicializarDatosEjemplo();

export const mockDB = {
    usuarios: {
        findByUsername: async (username) => {
            return mockStore.usuarios.find(u => u.nombre_usuario === username);
        },

        getAll: async () => {
            return mockStore.usuarios;
        }
    },

    registros: {
        getAll: async () => {
            return [...mockStore.registros];
        },
        getActivos: async () => {
            return mockStore.registros.filter(r => r.salida === null);
        },

        getById: async (id) => {
            return mockStore.registros.find(r => r.id === parseInt(id));
        },
        create: async (data) => {
            const nuevoRegistro = {
                id: mockStore.nextId++,
                nombre: data.nombre,
                placas: data.placas,
                observaciones: data.observaciones || null,
                entrada: data.entrada,
                salida: null,
                precio: null,
                color: data.color || generarColorAleatorio()
            };

            mockStore.registros.push(nuevoRegistro);
            return nuevoRegistro;
        },

        update: async (id, data) => {
            const index = mockStore.registros.findIndex(r => r.id === parseInt(id));
            if (index === -1) return null;

            mockStore.registros[index] = {
                ...mockStore.registros[index],
                ...data
            };

            return mockStore.registros[index];
        },

        getByDateRange: async (fechaInicio, fechaFin) => {
            return mockStore.registros.filter(r => {
                const entrada = new Date(r.entrada);
                if (isNaN(entrada.getTime())) return false;

                const inicio = fechaInicio ? new Date(fechaInicio) : new Date(0);
                const fin = fechaFin ? new Date(fechaFin) : new Date();

                if (fechaFin && fechaFin.length <= 10) {
                    fin.setHours(23, 59, 59, 999);
                }

                return entrada >= inicio && entrada <= fin;
            });
        },

        getSinceTime: async (horaInicio) => {
            const inicio = new Date(horaInicio);
            return mockStore.registros.filter(r => {
                const entrada = new Date(r.entrada);
                return entrada >= inicio;
            });
        },

        getTotalSinceTime: async (horaInicio) => {
            const registros = await mockDB.registros.getSinceTime(horaInicio);
            const total = registros
                .filter(r => r.salida !== null && r.precio !== null)
                .reduce((sum, r) => sum + parseFloat(r.precio), 0);

            return total;
        },

        getCountSinceTime: async (horaInicio) => {
            const registros = await mockDB.registros.getSinceTime(horaInicio);
            return registros.filter(r => r.salida !== null).length;
        }
    },

    dias: {
        getAll: async () => {
            return [...mockStore.dias];
        },

        create: async (data) => {
            const nuevoDia = {
                id: mockStore.nextId++,
                fecha: data.fecha,
                total: data.total,
                vehiculos_atendidos: data.vehiculos_atendidos,
                hora_inicio: data.hora_inicio,
                hora_fin: data.hora_fin
            };

            mockStore.dias.push(nuevoDia);
            return nuevoDia;
        }
    },

    reset: () => {
        mockStore = {
            usuarios: [
                {
                    id: 1,
                    nombre_usuario: 'demo',
                    contrasena: 'demo123',
                    email: 'demo@estacionamiento.com'
                }
            ],
            registros: [],
            dias: [],
            nextId: 1
        };
        inicializarDatosEjemplo();
    }
};

export default mockDB;
