# Automanage Mobile App

## Descripción

Automanage Mobile App es una aplicación móvil diseñada para la gestión eficiente de vehículos y tareas relacionadas. Permite a los usuarios registrar, monitorear y administrar información relevante sobre sus automóviles, servicios, mantenimientos y recordatorios.

## Características principales

- Registro y gestión de vehículos.
- Programación y seguimiento de mantenimientos.
- Notificaciones y recordatorios automáticos.
- Historial de servicios realizados.
- Gestión de gastos asociados a cada vehículo.
- Interfaz intuitiva y fácil de usar.

---

## 📂 Estructura del Proyecto

```
📦app
 ┣ 📂(admin)
 ┃ ┗ 📜home.tsx
 ┣ 📂(auth)
 ┃ ┣ 📜login.tsx
 ┃ ┗ 📜register.tsx
 ┣ 📂(tabs)
 ┃ ┣ 📜index.tsx
 ┃ ┣ 📜two.tsx
 ┃ ┗ 📜_layout.tsx
 ┣ 📂(user)
 ┃ ┗ 📜home.tsx
 ┣ 📜+html.tsx
 ┣ 📜+not-found.tsx
 ┣ 📜modal.tsx
 ┗ 📜_layout.tsx


📦src
 ┣ 📂core
 ┃ ┣ 📂domain
 ┃ ┃ ┣ 📂dto
 ┃ ┃ ┃ ┣ 📂auth
 ┃ ┃ ┃ ┃ ┗ 📜AuthCredentials.ts
 ┃ ┃ ┃ ┗ 📂register
 ┃ ┃ ┃ ┃ ┗ 📜RegisterUserDto.ts
 ┃ ┃ ┣ 📂model
 ┃ ┃ ┃ ┗ 📜User.ts
 ┃ ┃ ┗ 📂repositories
 ┃ ┃ ┃ ┗ 📜AuthRepository.ts
 ┃ ┗ 📂useCases
 ┃ ┃ ┣ 📂client
 ┃ ┃ ┗ 📂user
 ┃ ┃ ┃ ┣ 📜loginUserUseCase.ts
 ┃ ┃ ┃ ┗ 📜registerUserUseCase.ts
 ┣ 📂infrastructure
 ┃ ┗ 📂api
 ┃ ┃ ┣ 📂auth
 ┃ ┃ ┃ ┗ 📂repositoryImpl
 ┃ ┃ ┃ ┃ ┗ 📜AuthRepositoryImpl.ts
 ┃ ┃ ┗ 📂client
 ┗ 📂presentation
 ┃ ┣ 📂providers
 ┃ ┃ ┗ 📜AuthProvider.tsx
 ┃ ┗ 📂screens
 ┃ ┃ ┣ 📂admin
 ┃ ┃ ┃ ┗ 📜home.tsx
 ┃ ┃ ┣ 📂auth
 ┃ ┃ ┃ ┣ 📂components
 ┃ ┃ ┃ ┃ ┗ 📜ButtonComponent.tsx
 ┃ ┃ ┃ ┣ 📜login.tsx
 ┃ ┃ ┃ ┗ 📜register.tsx
 ┃ ┃ ┣ 📂components
 ┃ ┃ ┃ ┗ 📜ColorsComponent.tsx
 ┃ ┃ ┗ 📂user
 ┃ ┃ ┃ ┣ 📂car
 ┃ ┃ ┃ ┃ ┣ 📂CardScreens
 ┃ ┃ ┃ ┃ ┃ ┣ 📜CarDetailing.tsx
 ┃ ┃ ┃ ┃ ┃ ┣ 📜CarPapers.tsx
 ┃ ┃ ┃ ┃ ┃ ┣ 📜MaintenanceCar.tsx
 ┃ ┃ ┃ ┃ ┃ ┗ 📜VehicleAppointments.tsx
 ┃ ┃ ┃ ┃ ┣ 📂components
 ┃ ┃ ┃ ┃ ┃ ┣ 📜ActionCircle.tsx
 ┃ ┃ ┃ ┃ ┃ ┣ 📜CardService.tsx
 ┃ ┃ ┃ ┃ ┃ ┣ 📜ImageCar.tsx
 ┃ ┃ ┃ ┃ ┃ ┗ 📜ModalActionCircle.tsx
 ┃ ┃ ┃ ┃ ┗ 📜home.tsx
 ┃ ┃ ┃ ┣ 📂emergency
 ┃ ┃ ┃ ┃ ┣ 📂components
 ┃ ┃ ┃ ┃ ┃ ┗ 📜CardComponent.tsx
 ┃ ┃ ┃ ┃ ┗ 📜home.tsx
 ┃ ┃ ┃ ┣ 📂home
 ┃ ┃ ┃ ┃ ┣ 📂components
 ┃ ┃ ┃ ┃ ┃ ┗ 📜CardComponent.tsx
 ┃ ┃ ┃ ┃ ┗ 📜home.tsx
 ┃ ┃ ┃ ┣ 📂notifications
 ┃ ┃ ┃ ┃ ┣ 📂components
 ┃ ┃ ┃ ┃ ┃ ┗ 📜CardComponent.tsx
 ┃ ┃ ┃ ┃ ┗ 📜home.tsx
 ┃ ┃ ┃ ┣ 📂profile
 ┃ ┃ ┃ ┃ ┣ 📂components
 ┃ ┃ ┃ ┃ ┃ ┗ 📜CardComponent.tsx
 ┃ ┃ ┃ ┃ ┗ 📜home.tsx
 ┃ ┃ ┃ ┣ 📂settings
 ┃ ┃ ┃ ┃ ┣ 📂components
 ┃ ┃ ┃ ┃ ┃ ┗ 📜CardComponent.tsx
 ┃ ┃ ┃ ┃ ┗ 📜home.tsx
 ┃ ┃ ┃ ┗ 📜home.tsx           

```

---



 ## Configuracion para entorno de desarrollo 

1. Clona el repositorio:
    ```
    git clone https://github.com/tu-usuario/automanage_mobile_app.git
    ```

2. Instala las dependencias:
    ```
    cd automanage_mobile_app
    npm install
    ```

3. Configura las variables de entorno:
    - Crea un archivo `.env` en la raíz del proyecto.
    - Ejemplo de contenido:
      ```
      API_URL=http://localhost:3000/api
      NODE_ENV=development
      ```

4. Inicia el servidor de desarrollo:
    ```
    npm run dev
    ```

5. Accede a la aplicación desde tu emulador o dispositivo físico.

6. (Opcional) Configura herramientas como ESLint y Prettier para mantener la calidad del código.


## recursos 
    - https://oblador.github.io/react-native-vector-icons/
    - https://icons.expo.fyi/Index 

    <AntDesign name="shoppingcart" size={24} color="black" />
