# PEER-KNOW

## ![myimage-alt-tag](https://github.com/wendysoto/Tesis_Jhoel_Wendy/blob/movil/images/logo.png)
PEER-KNOW Es un sistema web para administradores y una aplicación móvil (compatible con el SO Android) para estudiantes de la ESFOT en el cual pueden compartir sus tareas sean estas resueltas o no, publicar cuestionarios, realizar preguntas, contribuir con respuestas y establecer una comunicación privada entre estudiantes, mientras los administradores contralan usuarios estudiantes y revisan tareas publicadas.


#### INTEGRANTES DE TESIS  :man::woman:
- Jhoel Amagua
- Wendy Soto

### 1. Arquitectura y Estructura
- Arquitectura
A continuación se muestra las Arquitecturas tanto de la aplicación móvil, como del sistema web:
 ![myimage-alt-tag](https://github.com/wendysoto/Tesis_Jhoel_Wendy/blob/movil/images/arquiMovil.png)
 ![myimage-alt-tag](https://github.com/wendysoto/Tesis_Jhoel_Wendy/blob/movil/images/arquiWeb.png)

- Estructura
La estructura que tienen los datos alojados en Firebase se ven de la siguiente manera:
 ![myimage-alt-tag](https://github.com/wendysoto/Tesis_Jhoel_Wendy/blob/movil/images/estructura.PNG)

### 2. Sistema web y Aplicación móvil 
El sistema web se encuentra almacenado en el hosting de Firebase en la siguiente url: 
:pushpin: https://tesis-3fc38.web.app/  o su última version en la rama web de este repositorio. 

:iphone: La aplicacion móvil disponible para la plataforma de Android  se encuentra almacenada en su última versión en la rama chats de este repositorio
| **SplashScreen** :bust_in_silhouette: | Sistema :computer: | 
| ------------- | ------------- | 
|![myimage-alt-tag](https://github.com/wendysoto/Tesis_Jhoel_Wendy/blob/movil/images/splash.png) |![myimage-alt-tag](https://github.com/wendysoto/Tesis_Jhoel_Wendy/blob/movil/images/webLogin.jpg)|

### 3. Funcionalidades principales de la Aplicación Móvil

| **Inicio de sesión** :closed_lock_with_key: | **Registro de usuario** :mens: | **Publicaciones** :books: | 
| ------------- | ------------- | ------------- | 
|Interfaz de inicio de sesión con el metodo de logueo usuario y contraseña, si es primera vez que ingresa al sistema debe registrarse como muestra la interfaz de registro de usuario ![myimage-alt-tag](https://github.com/wendysoto/Tesis_Jhoel_Wendy/blob/movil/images/login.jpg) |Interfaz de registro de usuario estudiante con los campos nombre, carrera, email, teléfono, contraseña entre otros. ![myimage-alt-tag](https://github.com/wendysoto/Tesis_Jhoel_Wendy/blob/movil/images/registro.jpg)|la primera pantalla que visualiza el usuario luego de loguearse es la de publicaciones la cual muestra la las publicaciones de todas las tareas referente a la carrera del user. ![myimage-alt-tag](https://github.com/wendysoto/Tesis_Jhoel_Wendy/blob/movil/images/publicaciones.jpg)|


| **Detalle de la tarea** :closed_lock_with_key: | **Lista de materias** :mens: | **lista de tareas** :books: | 
| ------------- | ------------- | ------------- | 
|El detalle de la tarea se la visualiza despues de dar clic en el icono de vista de la publicacion, aqui se presenta el detalle completo de la tarea o cuestionario, los comentarios en ella, el archivo cargado y un boton para poder descargarlo ![myimage-alt-tag](https://github.com/wendysoto/Tesis_Jhoel_Wendy/blob/movil/images/detallemateria.jpg)| La lista de materias del estudiante se presentan en orden desde el semestre 1 al 5. ![myimage-alt-tag](https://github.com/wendysoto/Tesis_Jhoel_Wendy/blob/movil/images/materias.jpg)|al dar clic sobre una materia en especifico nos lista las publicaciones sobre todas las tareas, cuestionarios o proyectos incluidos en ella. ![myimage-alt-tag](https://github.com/wendysoto/Tesis_Jhoel_Wendy/blob/movil/images/tareas.jpg)|

### 4. Funcionalidades principales del Sistema Web

| **Inicio de sesión** :simple_smile: | **Registro de Estudiantes y/o Administradores** :mens: | 
| ------------- | ------------- |
|Interfaz de inicio de sesión con el metodo de logueo usuario y contraseña. ![myimage-alt-tag](https://github.com/wendysoto/Tesis_Jhoel_Wendy/blob/movil/images/login_web.jpg) |Interfaz de registro de usuario estudiante y/o administrador con los mismo campos excepto en rol. ![myimage-alt-tag](https://github.com/wendysoto/Tesis_Jhoel_Wendy/blob/movil/images/registro_web.jpg)|


| **Lista de administradores** :memo: | **Lista de estudiantes** :memo: |
| ------------- | ------------- |
|La lista de administradores tiene las opciones para ver, editar y/o eliminar información ![myimage-alt-tag](https://github.com/wendysoto/Tesis_Jhoel_Wendy/blob/movil/images/lista_web_admin.jpg)| La lista de estudiantes tiene las opciones de; ver, editar y/o eliminar información, además las opciones de Bloquear y Certificar . ![myimage-alt-tag](https://github.com/wendysoto/Tesis_Jhoel_Wendy/blob/movil/images/lista_web_estudiante.jpg)|


| **Lista de materias** :book: | **Publicaciones** :file_folder: |
| ------------- | ------------- |
|La lista de materias derigire a la información de cada una para poder editar o agregar publicaciones. ![myimage-alt-tag](https://github.com/wendysoto/Tesis_Jhoel_Wendy/blob/movil/images/materias_web.jpg)| La página de publicaciones además tiene las opciones de editar información de la materia, agregar publicación y acceder a las publicaciones de dicha materia. ![myimage-alt-tag](https://github.com/wendysoto/Tesis_Jhoel_Wendy/blob/movil/images/publicacion_web.jpg)|


| **Editar información de Usuario** :pencil2: | **Bloquear estudiante** :closed_lock_with_key: |
| ------------- | ------------- |
|Para editar información de estudiante o administrador se ocupa el formulario del registro con los datos del usuario. ![myimage-alt-tag](https://github.com/wendysoto/Tesis_Jhoel_Wendy/blob/movil/images/editar_estudiante.jpg)| El bloqueo de estudiante se realiza mediante un formulario con la información del estudiante y 2 campos adicionales; dias y motivos. ![myimage-alt-tag](https://github.com/wendysoto/Tesis_Jhoel_Wendy/blob/movil/images/bloqueo_web.jpg)|


| **Recuperar contraseña** :key: |
| ------------- |
|Para recuperar la contraseña, el administrador debe ingresar su correo y le llegará un email para restablecer dicha contraseña. ![myimage-alt-tag](https://github.com/wendysoto/Tesis_Jhoel_Wendy/blob/movil/images/recuperar_web.jpg)|

