# CRUD - HEROES

Aplicacion CRUD (Create, Read, Update & Delete) para gestion de una base de datos de heroes.  La aplicación permite a los usuarios realizar operaciones básicas sobre los registros de héroes en una base de datos, incluyendo la capacidad de buscar, agregar, editar y eliminar héroes.

## Funcionalidades


- **Crear Héroes:** Agrega nuevos héroes a la base de datos con detalles como nombre,  genero, casa publicadora y bando.
- **Leer Héroes:** Consulta y visualiza la lista de héroes almacenados. Incluye filtros para buscar héroes específicos.
- **Actualizar Héroes:** Modifica la información de los héroes existentes.
- **Eliminar Héroes:** Elimina héroes de la base de datos cuando ya no sean necesarios.
- **Filtros:**
  - **Nombre**
  - **Publicadora**
  - **Bando**
  - **Genero**
  - **Raza**

## Tecnologías Utilizadas

- **Backend:**
  - **FastAPI:** Framework moderno y rápido para construir APIs en Python.
- **Base de Datos:**
   - **MongoDB:** Base de datos NoSQL para almacenar la información de héroes.
- **HTTP Client**
  - **Axios:** Biblioteca de cliente HTTP basada en promesas para el navegador y Node.js
- **Frontend** 
  - **React:** Biblioteca de JavaScript para construir interfaces de usuario interactivas. 
  - **Bootstrap:** Framework de diseño para desarrollar interfaces web responsivas.

# Endpoints

## Obtener Todos los Héroes
- **Método:** GET
- **Ruta:** `/heroes`
- **Descripción:** Obtiene una lista de héroes con opciones de filtrado y paginación.
- **Parámetros de consulta:** 
  - `limit`: Número máximo de héroes a devolver (por defecto: 10).
  - `offset`: Número de héroes a omitir antes de devolver (por defecto: 0).
  - `name`: Filtro por nombre del héroe (búsqueda con expresiones regulares).
  - `publisher_id`: Filtro por ID de la editorial.
  - `gender_id`: Filtro por ID de género.
  - `alignment_id`: Filtro por ID de alineación.
  - `race`: Filtro por raza del héroe.


## Crear un Héroe
- **Método:** POST
- **Ruta:** `/heroes`
- **Descripción:** Crea un nuevo héroe en la base de datos.

## Obtener un Héroe por ID
- **Método:** GET
- **Ruta:** `/heroes/{hero_id}`
- **Descripción:** Obtiene los detalles de un héroe específico por su ID.
- **Parámetros de Ruta:**
  - `hero_id`: ID del héroe.

## Actualizar un Heroe
- **Método**: PUT
- **Ruta**: `/heroes/{hero_id}`
- **Descripción**: Actualiza la información de un héroe existente.
- **Parámetros de Ruta:**
    - `hero_id`: ID del héroe a actualizar.

## Eliminar Heroe
- **Método**: DELETE
- **Ruta**: `/heroes/{hero_id}`
- **Descripción**: Elimina un héroe de la base de datos.
- **Parámetros de Ruta:**
    - `hero_id`: ID del héroe a eliminar.

## Obtener todos los generos
- **Método**: GET
- **Ruta**: `/genders`
- **Descripción**: Obtiene una lista de todos los géneros disponibles.

## Obtener todas las publicadora
- **Método**: GET
- **Ruta**: `/publishers`
- **Descripción**: Obtiene una lista de todas las editoriales disponibles.

## Obtener todos los bandos
- **Método**: GET
- **Ruta**: `/alignments`
- **Descripción**: Obtiene una lista de todas los bandos disponibles.

## Obtener todas las razas
- **Método**: GET
- **Ruta**: `/races`
- **Descripción**: Obtiene una lista de todas las razas de héroes disponibles.

##  Comprobar la Existencia de un ID de Héroe
- **Método**: GET
- **Ruta**: `/check-hero-id`
- **Descripción**: Verifica si un ID de héroe ya existe en la base de datos.
- **Parámetros de Consulta**:
    - `hero_id`: ID del héroe a verificar.