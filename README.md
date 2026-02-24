
Software de gestión para estacionamiento que automatiza el cálculo de tarifas mediante un sistema de temporizador en tiempo real. El software permite el registro detallado de unidades (placas, propietarios, características y observaciones), además de incluir un módulo de auditoría histórica para el control de ingresos y flujo operativo diario.

**Proyecto Freelance Original**: Desarrollado para el estacionamiento "El Alfarero" para optimizar la gestión vehicular y control de ingresos.

## Características

- Registro de vehículos con datos del propietario
- Temporizador en tiempo real para cálculo de tarifas
- Control de ingresos y estadísticas del día
- Historial de registros y auditoría
- Sistema de autenticación seguro
- Diseño responsivo (móvil y escritorio)
- Interfaz moderna con Tailwind CSS

##  Tecnologías Utilizadas

- **Frontend**: React 19, Next.js 16
- **Autenticación**: NextAuth.js
- **Estilos**: Tailwind CSS 4
- **Tablas**: TanStack React Table
- **PWA**: Next PWA
- **Demo Data**: Sistema de datos mock en memoria (sin base de datos)


## Credenciales de Demo

Para acceder a la aplicación de demostración, usa las siguientes credenciales:

- **Usuario**: `demo`
- **Contraseña**: `demo123`

## Notas Importantes

### Versión Sandbox
- **Sin base de datos real**: Todos los datos se almacenan en memoria y se resetean al recargar la aplicación
- **Datos protegidos**: Toda información sensible del cliente ha sido eliminada
- **Datos simulados**: Los registros de vehículos son generados automáticamente para demostración
- **No persistencia**: Los cambios no se guardan permanentemente (ideal para demo)

### Funcionalidades Demo
- Registro de nuevos vehículos
- Finalización de servicio con cálculo de tarifa
- Visualización de vehículos activos
- Estadísticas del día (total recaudado, vehículos atendidos)
- Historial de registros
- Sistema de autenticación funcional
