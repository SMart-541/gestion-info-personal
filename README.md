Esta es una prueba de ingreso para ParkourDevs. Además de poderlo configurar para ejecución local, este proyecto también esta alojado en Vercel:

[Ver app en vivo](https://gestion-info-personal-qc5il43a6-sandro-martinezs-projects.vercel.app/)

## Tecnologías Utilizadas

- Next.js 14
- React
- Kirimase CLI
- Vercel PostgreSQL
- Prisma ORM

## Configuración Inicial

1. Clonar el repositorio en la carpeta deseada.
2. Instalar las dependencias del proyecto ejecutando:

```bash
npm install
```

3. Configurar un proyecto de Google OAuth.

4. Configurar un proyecto de Github OAuth.

Nota: Para ambos setups de OAuth deben configurarse las siguientes rutas:

- {baseUrl} (por defecto http://localhost:3000) como ruta base del proyecto.
- {baseUrl}/api/auth/callback/google para las URI de callbacks autorizadas de Google.
- {baseUrl}/api/auth/callback/github para las URI de callbacks autorizadas de Github.

5. Configurar las variables de entorno:

```bash
# Se recomienda utilizar un archivo env.local

POSTGRES_DATABASE=""
POSTGRES_HOST=""
POSTGRES_PASSWORD=""
POSTGRES_PRISMA_URL=""
POSTGRES_URL=""
POSTGRES_URL_NON_POOLING=""
POSTGRES_URL_NO_SSL=""
POSTGRES_USER=""

# Next Auth
NEXTAUTH_SECRET=
# {baseUrl}/api/auth
NEXTAUTH_URL=

RESEND_API_KEY=

# Tomado de Google OAuth
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=

# Tomado de GitHub OAuth
GITHUB_CLIENT_ID=
GITHUB_CLIENT_SECRET=
```

6. Actualizar el modelo de la Base de Datos ejecutando:

```bash
npx prisma db push
```

7. Ejecuta la app con el comando:

```bash
npm run dev
```

## Requerimientos y Faltantes

1. **Autenticación y Manejo de Sesión:**

La autenticación fue implementada con NextAuth, con la que se configuraron 2 proveedores de autenticación: Google, Github y Credentials (Email + password). Utilizando esta misma dependencia se implementó un SignOut seguro.

2. **Subida de Datos a una Base de Datos:**

Este proyecto realiza operaciones sobre una base de datos Postgres utilizando Prisma ORM. Cada usuario puede gestionar su información personal desde el Dashboard de la app.

- **Punto faltante**: Crear un reporte que liste los users con mejor salario y saque la media y promedios: Esto pudo haberse implementado con dependencias como [React-pdf](https://react-pdf.org/) o similares.

Nota: A pesar de que el proyecto no genera un reporte en pdf, si se implementó el server action y las queries que generan la data a consumir para este reporte.

3. **Manejo de Formularios con Validaciones:**

Los formularios de la app estan validados correctamente utilizando Zod y el Hook de React "useForm". Adicionalmente los mensajes de error estan dispuestos de manera clara y con internacionalizaciónes.

4. **Presentación de Datos de la Base de Datos:**

La información personal del usuario y el listado de otros usuarios (mostrado con un Datatable de Shadcn) estan disponibles en el Dashboard de la app, esta tabla permite ordenar todas las columnas de forma ascendente o descendente. También cuenta con una barra de busquedas general que permite filtrar por distintos parámetros.

5. **Compilado exitoso**

El proyecto ejecuta correctamente y sin errores, tanto de forma local como publicado en Vercel.

**Requerimientos opcionales:**

1. **Internacionalización:**

La app está correctamente internacionalizada utilizando [next-intl](https://next-intl-docs.vercel.app/).

2.  **Correos transaccionales:**

- **Punto faltante**: Se intentó configurar Resend para manejar el envío de correos desde la app, pero me solicitaban tener un dominio y actualmente no poseo uno, ni tampoco logre conseguir algún servicio de dominio gratuito. 

También consideré implementar NodeMailer, pero por falta de tiempo no pude añadirlo.

3. Grafico

- **Punto faltante**: También por falta de tiempo no pude implementar este requisito, aunque no debería ser muy complicado de implementar si es dentro de una vista de la app (se utilizaría posiblemente los charts de Shadcn). En caso de necesitar gráficos en el reporte, esto dependería de las funcionalidades disponibles en la dependencia que genera los reportes.

