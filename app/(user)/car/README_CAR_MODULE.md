
# 🚗 Módulo: Car

Este módulo contiene todas las pantallas relacionadas con la gestión del vehículo del usuario. Es parte de la navegación por tabs en la aplicación móvil y forma parte del grupo principal de usuario (`(user)`).

---

## 📂 Estructura

```
car/
├── (screens)/
│   └── CarScreens/
│       ├── Appointments.tsx   // Citas del vehículo
│       ├── Detailing.tsx      // Detallado del vehículo
│       ├── Maintenancie.tsx   // Mantenimiento del vehículo
│       └── Papers.tsx         // Documentación del vehículo
└── index.tsx                  // Pantalla principal del tab "Vehículo"
```

---

## 📌 Descripción de Archivos

### `index.tsx`
Pantalla principal del tab "Vehículo". Actúa como un hub de navegación que dirige al usuario a las diferentes subpantallas del vehículo mediante botones.

### `(screens)/CarScreens/*.tsx`
Estas pantallas están aisladas del layout de tabs mediante un grupo de rutas (`(screens)`) para evitar que aparezcan en la barra de navegación inferior.

- **Appointments.tsx**: Muestra las citas programadas del vehículo.
- **Detailing.tsx**: Detalles sobre limpieza, estética y cuidados del vehículo.
- **Maintenancie.tsx**: Información sobre el mantenimiento general y revisiones técnicas.
- **Papers.tsx**: Documentación legal y técnica del vehículo (SOAT, tecnomecánica, etc.).

---

## 🚦 Navegación

Estas pantallas se navegan desde `car/index.tsx` mediante el hook `useRouter` de `expo-router`, por ejemplo:

```tsx
router.push("/car/(screens)/CarScreens/Maintenancie");
```

---

## ✅ Buenas Prácticas

- No incluir estas pantallas internas como tabs (`href: null` en `_layout.tsx`).
- Mantener la estructura modularizada para escalar fácilmente.
- Asegurarse de usar rutas relativas correctas al navegar.

---

## 📁 Dependencias

- `expo-router`
- `react-native`
- Opcionalmente: `@expo/vector-icons` para íconos en headers o botones.

---

## 🛠️ Próximas mejoras

- Validaciones o loaders para cada pantalla.
- Integración con API de mantenimiento y citas.
- Personalización del diseño con estilos compartidos.
