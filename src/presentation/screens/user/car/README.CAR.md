# 🚗 Módulo de Vehículos (`car`)

Este módulo está diseñado para gestionar toda la información relacionada con los vehículos de un usuario. Incluye funcionalidades como el detalle del vehículo, documentos legales, historial de mantenimientos y programación de citas.

## 📁 Estructura del Módulo

```
📦car
 ┣ 📂CardScreens
 ┃ ┣ 📜CarDetailing.tsx
 ┃ ┣ 📜CarPapers.tsx
 ┃ ┣ 📜MaintenanceCar.tsx
 ┃ ┗ 📜VehicleAppointments.tsx
 ┣ 📂components
 ┃ ┣ 📜ActionCircle.tsx
 ┃ ┣ 📜CardService.tsx
 ┃ ┣ 📜ImageCar.tsx
 ┃ ┗ 📜ModalActionCircle.tsx
 ┣ 📜home.tsx
 ┗ 📜README.CAR.md
```

## 🧩 Pantallas Principales (`CardScreens`)

- **CarDetailing.tsx**  
  Muestra información detallada del vehículo: marca, modelo, placa, año, cilindrada, etc.

- **CarPapers.tsx**  
  Visualiza y gestiona los documentos legales del vehículo, como SOAT, revisión técnico-mecánica y tarjeta de propiedad.

- **MaintenanceCar.tsx**  
  Muestra el historial de mantenimientos realizados y permite agendar nuevos mantenimientos.

- **VehicleAppointments.tsx**  
  Permite al usuario ver y agendar citas relacionadas con su vehículo (revisión, mecánica, entre otros).

## 🧱 Componentes Reutilizables (`components`)

- **ActionCircle.tsx**  
  Botón flotante en forma de círculo que da acceso rápido a acciones comunes.

- **CardService.tsx**  
  Tarjeta visual con los detalles de un servicio realizado o por realizar en el vehículo.

- **ImageCar.tsx**  
  Componente que muestra una imagen del vehículo, con soporte para imágenes por defecto y cargadas por el usuario.

- **ModalActionCircle.tsx**  
  Modal que se activa desde el botón flotante y ofrece opciones de acción como editar, eliminar o agregar mantenimiento.

## 🏠 Pantalla Principal (`home.tsx`)

Pantalla que actúa como el hub principal del módulo. Integra todas las pantallas y componentes para ofrecer una experiencia centralizada e intuitiva al usuario.

## 📚 Tecnologías Usadas

- React / React Native
- TypeScript
- React Navigation
- Context API o Redux (si aplica)
- Estilos modernos con Styled Components o Tailwind CSS (según stack)

## 📌 Notas

- Este módulo es completamente desacoplado y puede integrarse fácilmente en cualquier flujo de usuario autenticado.
- Se recomienda tener una conexión activa a internet para cargar imágenes y datos externos correctamente.
- El módulo maneja estados de carga, errores y visualización vacía de forma nativa.
