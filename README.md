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
 ┃ ┣ 📜index.tsx
 ┃ ┗ 📜_layout.tsx
 ┣ 📂(auth)
 ┃ ┣ 📜login.tsx
 ┃ ┗ 📜register.tsx
 ┣ 📂(tabs)
 ┃ ┣ 📜index.tsx
 ┃ ┗ 📜_layout.tsx
 ┣ 📂(user)
 ┃ ┣ 📂car
 ┃ ┃ ┣ 📂(screens)
 ┃ ┃ ┃ ┗ 📂CarScreens
 ┃ ┃ ┃ ┃ ┣ 📜Appointments.tsx
 ┃ ┃ ┃ ┃ ┣ 📜Detailing.tsx
 ┃ ┃ ┃ ┃ ┣ 📜Invoice.tsx
 ┃ ┃ ┃ ┃ ┣ 📜Maintenancie.tsx
 ┃ ┃ ┃ ┃ ┣ 📜ModalActionCircle.tsx
 ┃ ┃ ┃ ┃ ┗ 📜Papers.tsx
 ┃ ┃ ┣ 📜index.tsx
 ┃ ┃ ┗ 📜README_CAR_MODULE.md
 ┃ ┣ 📂emergency
 ┃ ┃ ┗ 📜index.tsx
 ┃ ┣ 📂home
 ┃ ┃ ┣ 📂(screens)
 ┃ ┃ ┃ ┣ 📜LearningCar.tsx
 ┃ ┃ ┃ ┗ 📜ViewProduct.tsx
 ┃ ┃ ┗ 📜README_HOME_MODULE.md
 ┃ ┣ 📂notifications
 ┃ ┃ ┗ 📜index.tsx
 ┃ ┣ 📂profile
 ┃ ┃ ┣ 📜index.tsx
 ┃ ┃ ┗ 📜README_PROFILE_MODULE.md
 ┃ ┣ 📂settings
 ┃ ┃ ┣ 📂(screens)
 ┃ ┃ ┃ ┣ 📜about-app.tsx
 ┃ ┃ ┃ ┣ 📜help-center.tsx
 ┃ ┃ ┃ ┗ 📜profile-edit.tsx
 ┃ ┃ ┗ 📜index.tsx
 ┃ ┣ 📜index.tsx
 ┃ ┗ 📜_layout.tsx
 ┣ 📜+html.tsx
 ┣ 📜+not-found.tsx
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
 ┃ ┃ ┣ 📂client
 ┃ ┃ ┗ 📜axiosConfig.ts
 ┗ 📂presentation
 ┃ ┣ 📂providers
 ┃ ┃ ┗ 📜AuthProvider.tsx
 ┃ ┣ 📂screens
 ┃ ┃ ┣ 📂admin
 ┃ ┃ ┃ ┗ 📜home.tsx
 ┃ ┃ ┣ 📂auth
 ┃ ┃ ┃ ┣ 📂components
 ┃ ┃ ┃ ┃ ┗ 📜ButtonComponent.tsx
 ┃ ┃ ┃ ┣ 📜login.tsx
 ┃ ┃ ┃ ┗ 📜register.tsx
 ┃ ┃ ┣ 📂components
 ┃ ┃ ┃ ┣ 📜ColorsComponent.tsx
 ┃ ┃ ┃ ┗ 📜ThemeSwitcher.tsx
 ┃ ┃ ┗ 📂user
 ┃ ┃ ┃ ┣ 📂car
 ┃ ┃ ┃ ┃ ┣ 📂CarScreens
 ┃ ┃ ┃ ┃ ┃ ┣ 📜CarDetailing.tsx
 ┃ ┃ ┃ ┃ ┃ ┣ 📜CarPapers.tsx
 ┃ ┃ ┃ ┃ ┃ ┣ 📜InvoiceCar.tsx
 ┃ ┃ ┃ ┃ ┃ ┣ 📜MaintenanceCar.tsx
 ┃ ┃ ┃ ┃ ┃ ┗ 📜VehicleAppointments.tsx
 ┃ ┃ ┃ ┃ ┣ 📂components
 ┃ ┃ ┃ ┃ ┃ ┣ 📜ActionCircle.tsx
 ┃ ┃ ┃ ┃ ┃ ┣ 📜CardService.tsx
 ┃ ┃ ┃ ┃ ┃ ┣ 📜ImageCar.tsx
 ┃ ┃ ┃ ┃ ┃ ┗ 📜ModalActionCircle.tsx
 ┃ ┃ ┃ ┃ ┣ 📜home.tsx
 ┃ ┃ ┃ ┃ ┗ 📜README.CAR.md
 ┃ ┃ ┃ ┣ 📂emergency
 ┃ ┃ ┃ ┃ ┣ 📂components
 ┃ ┃ ┃ ┃ ┃ ┗ 📜EmergencyButton.tsx
 ┃ ┃ ┃ ┃ ┗ 📜home.tsx
 ┃ ┃ ┃ ┣ 📂home
 ┃ ┃ ┃ ┃ ┣ 📂components
 ┃ ┃ ┃ ┃ ┃ ┣ 📜LearningCarComponent.tsx
 ┃ ┃ ┃ ┃ ┃ ┗ 📜ProductComponent.tsx
 ┃ ┃ ┃ ┃ ┣ 📂homeScreens
 ┃ ┃ ┃ ┃ ┃ ┣ 📜CarLearning.tsx
 ┃ ┃ ┃ ┃ ┃ ┗ 📜ProductoView.tsx
 ┃ ┃ ┃ ┃ ┗ 📜home.tsx
 ┃ ┃ ┃ ┣ 📂notifications
 ┃ ┃ ┃ ┃ ┣ 📂components
 ┃ ┃ ┃ ┃ ┃ ┗ 📜CardComponent.tsx
 ┃ ┃ ┃ ┃ ┗ 📜HomeNotifications.tsx
 ┃ ┃ ┃ ┣ 📂profile
 ┃ ┃ ┃ ┃ ┣ 📂components
 ┃ ┃ ┃ ┃ ┃ ┗ 📜CardComponent.tsx
 ┃ ┃ ┃ ┃ ┗ 📜home.tsx
 ┃ ┃ ┃ ┗ 📂settings
 ┃ ┃ ┃ ┃ ┣ 📂components
 ┃ ┃ ┃ ┃ ┃ ┗ 📜CardComponent.tsx
 ┃ ┃ ┃ ┃ ┣ 📂setttingsScreens
 ┃ ┃ ┃ ┃ ┃ ┣ 📜about-app.tsx
 ┃ ┃ ┃ ┃ ┃ ┣ 📜help-center.tsx
 ┃ ┃ ┃ ┃ ┃ ┗ 📜profile-edit.tsx
 ┃ ┃ ┃ ┃ ┗ 📜home.tsx
 ┃ ┣ 📂theme
 ┃ ┃ ┣ 📜ThemeContext.tsx
 ┃ ┃ ┗ 📜themes.ts
 ┃ ┗ 📂userContext
 ┃ ┃ ┗ 📜UserContext.tsx        

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
      API_URL=http://localhost:8000/api
      NODE_ENV=development
      ```

4. Inicia el servidor de desarrollo:
    ```
    npx expo start
    o
    npx expo start --clear
    ```

5. Accede a la aplicación desde tu emulador o dispositivo físico.

6. (Opcional) Configura herramientas como ESLint y Prettier para mantener la calidad del código.


## recursos 
    - https://oblador.github.io/react-native-vector-icons/
    - https://icons.expo.fyi/Index 
