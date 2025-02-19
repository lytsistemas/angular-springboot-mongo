# 📩 Sistema de Envío de Sugerencias

Este proyecto es una aplicación web para el envío y gestión de sugerencias, diseñada con **Angular** en el frontend, **Spring Boot** en el backend y **MongoDB** como base de datos.

## 🚀 Tecnologías utilizadas

- **Frontend:** Angular 19 (Standalone Components)
- **Backend:** Spring Boot 3.x
- **Base de Datos:** MongoDB
- **Docker:** (Opcional) Para despliegue en contenedores

## 📜 Características

- Formulario de envío de sugerencias con validaciones.
- Listado de sugerencias enviadas.
- API REST para la gestión de sugerencias.
- Persistencia de datos en MongoDB.
- Interfaz amigable y responsiva.

## 📂 Estructura del Proyecto


```bash
ANGULAR-SPRINGBOOT-MONGO/
│── sugerencias-frontend/          # Aplicación Angular
│   ├── src/
│   ├── angular.json
│   ├── package.json
│   └── ...
│── sugerencias/           # Aplicación Spring Boot
│   ├── src/main/java/service/
│   ├── pom.xml
│   └── ...
│── docker-compose.yml # Configuración para despliegue con Docker
│── README.md          # Documentación del proyecto


🔧 Instalación y Ejecución
1️⃣ Clonar el repositorio

git clone https://github.com/lytsistemas/angular-springboot-mongo.git
cd sistema-sugerencias

2️⃣ Configurar y ejecutar el Backend (Spring Boot)

    Ir al directorio backend/
    Configurar MongoDB en application.properties
    Ejecutar el backend con:

mvn spring-boot:run

3️⃣ Configurar y ejecutar el Frontend (Angular)

    Ir al directorio frontend/
    Instalar dependencias:

npm install

    Ejecutar la aplicación:

ng serve

4️⃣ Acceder a la aplicación

    Frontend: http://localhost:4200
    API Backend: http://localhost:8080/api/sugerencias

🐳 Despliegue con Docker (Opcional)

Si deseas ejecutar el sistema con Docker, usa:

docker-compose up -d
```

📄 Licencia

Este proyecto está bajo la licencia MIT. Puedes utilizarlo y modificarlo libremente.

📸 Capturas de pantalla

Ejemplo de la interfaz del sistema: 

![Captura1](https://github.com/user-attachments/assets/b90f959f-986e-4323-bfc0-8841d38939fe)

![Captura2](https://github.com/user-attachments/assets/452fda0c-e200-491b-bc67-cb225ffc848c)

![Captura3](https://github.com/user-attachments/assets/c8b10fb6-0d5b-471d-9a17-13121acb6426)

![Captura4](https://github.com/user-attachments/assets/4941cd77-18f8-47ea-952f-f71c7fb3a98d)

![Captura5](https://github.com/user-attachments/assets/6bfe1b66-0611-4aa8-bb6f-fe4f56d58139)

![Captura6](https://github.com/user-attachments/assets/7c292aec-3e03-4405-83bd-be48a529c3cc)

![Captura7](https://github.com/user-attachments/assets/80d60a8f-e4d8-466f-960d-d4d7ae914d70)

![Captura8](https://github.com/user-attachments/assets/1dcfef67-96fc-474d-a81a-5291b151c63e)

![Captura9](https://github.com/user-attachments/assets/abef7137-e632-4647-a46d-d358e3b41424)

![Captuta10](https://github.com/user-attachments/assets/c54e476d-51fc-47e8-a485-e71d817af7a5)


