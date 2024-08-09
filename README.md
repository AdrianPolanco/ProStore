
# ProStore
ProStore es un pequeño proyecto, que permite la gestión de productos mediante operaciones CRUD (Crear, Leer, Actualizar, Borrar). Las imágenes de los productos se suben y editan en Azure Blob Storage. La API está desarrollada en .NET 8 y el frontend en Angular 18 utilizando PrimeNG.

![image](https://github.com/user-attachments/assets/e02f1f82-9e49-432c-a54b-46de04c5bd11)
![image](https://github.com/user-attachments/assets/42653df1-ec49-486f-8de5-2ec797105c9f)
![image](https://github.com/user-attachments/assets/dcafb2e3-d672-4229-abcb-947ea47cd622)


## Requisitos

## Cloud
- Cuenta propia de Azure (ya que las credenciales no estan subidas en este repositorio)
- Storage Account
- Blob Container

### Backend
- .NET 8 SDK
- Azure Storage Account
- SQL Server
- Docker

### Frontend
- Node.js (v14 o superior)
- Angular CLI (v18)
- PrimeNG

## Instalación

### Backend

1. Clona el repositorio:
    ```bash
    git clone https://github.com/tuusuario/ProStore.git
    cd ProStore/Backend
    ```

2. Configura Azure Blob Storage:
    - Crea una cuenta de Azure Storage.
    - Configura el `connectionString` y el nombre del contenedor en el archivo `appsettings.json`.

3. Restaura los paquetes y ejecuta la aplicación:
    ```bash
    dotnet restore
    dotnet run
    ```

### Frontend

1. Navega al directorio del frontend:
    ```bash
    cd ProStore/Frontend
    ```

2. Instala las dependencias:
    ```bash
    npm install
    ```

3. Ejecuta la aplicación:
    ```bash
    ng serve
    ```

## Configuración

### Backend

Asegúrate de configurar el archivo `appsettings.json` con tus credenciales de Azure Blob Storage:

```json
{
  "ConnectionStrings": {
    "AzureBlobStorage": "YourAzureBlobStorageConnectionString"
  },
  "BlobContainerName": "yourcontainername"
}
```

### Frontend


Configura el archivo `environment.ts` con la URL de tu API:

```typescript
export const environment = {
  production: false,
  apiUrl: 'http://localhost:5000/api'
};
```

## Uso

### Backend

La API expone los siguientes endpoints para la gestión de productos:

- `GET /api/products` - Obtiene la lista de productos.
- `POST /api/products` - Crea un nuevo producto.
- `PUT /api/products/{id}` - Actualiza un producto existente.
- `DELETE /api/products/{id}` - Elimina un producto.

### Frontend

La aplicación frontend permite:

- Ver la lista de productos.
- Crear un nuevo producto.
- Editar un producto existente.
- Eliminar un producto.
