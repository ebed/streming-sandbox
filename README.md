# Streaming App
## Descripción
Este proyecto es un sandbox para probar el uso de Expressjs, integrando HSL, Bases de datos.

Este se encuentra configurado para utilizarse con Docker, listo para configurar un Continuous Deploy, en el server de DigitalOcean se configuró y probó, pero al final decanté por hacerlo sin docker para no poner una capa aadicional, dadop que se tiene el servicio de base de datos en la misma máquina.

PD: esta arquitectura no  es la ideal, dado que no permite un buen escalaamiento horizontal.

La experiencia previa en Node y express casi nula, por lo que para hacer algo rápido, en el poco tiempo que tuve disponible por trabajo y familia, opté por buscar análogos a las buenas prácticas qque ehe ytukizado en otros lengiuages, por lo que iimplementé migraciones de BD para simplificar el hacer mejoras continuas. Separé el modelo, de las vistas y controladores.

## Vista
Para las vistas utilicé Handbrakers, Bootstrap y session cookie para almacenar la información de registro.
Quedaron unas vistas por implementar, pero que opté por no hacerlas al no ser parte del requerimiento original.
Se creo (para ir entendiendo el uso de Express), un servicio REST para obtener info de usuarios.

La vista del player quedó preparaado para recibir le video que se desea reproducir. 
Se planeaba  ir almacenando la visualización de los usuarios en la tabla de statistics. No se terminó esta funcionalidad. Se pensaba que cada persona pudiera revisar sus  visualizaciones.
## Modelos
Se creo un modelo para usuarios, otro para videos y otro para carousel.
El de usuarios provee la información base de este, con el password encriptado. 
El de Videos almacena los videos disponibles, para renderizarlo en el listado de videos a  ver. 
El de carousel almacena imagenes, textos para el carousel del listado de videos. 

Estos quedaron con los datos de carga inicial en la migración, de manera que al hacer db-migrate up, creará las tablas y poblará con datos.

De desearse una nueva migración, solo ejecutar db-migrate create nombre-migración. Esto creará los archivos donde se agregará la definicion de las tablas. Luego de tener esto configurado, se ejecuta db-migrate up, o se puede hacer rollback con db-migrate down

De desear probar el proyecto, se puede clonar y luego de instalar docker y docker-compose, solo ejecutar docker-compose up, lo que instalará todo y levantará los servidores.

##  DigitalOcean
Se configuró en DO un usuario para hacer los deploys.
Al no tener una cuenta paga de github, no pude activar los Github Actions para hacer los deploys automáticos.
Se dejó instalado y configurado DockerCompose por  si se deseara utilizar, solo bastaríá hacer:
- systemctl start docker (para levantar)
o
- systemctl enable docker (si se desea dejar de manera permanente levantado el servicio)

Finalmente se configuró Mysql en DigitalOcean y configurando el proyecto. Las variables quedaron en el archivo .bashrc con los datos de coneccion a la bd.

Se dejará el levantar la aplicación con systemctl para hacerlo automatico al levantar el server.
Se tiene en mente si el tiempo da hoy de dejar habilitado nginx para usar cache.

## Propuestas mejoras
Para esta solución lo ideal sería tener separado la BD de la app.
Por otro lado poner algun balanceador de carga. 
Además tener un repositorio externo para almacenar los videos. Esto permitiría proveer un escalamiento horizontal de manera rápida.
Otra cosa que mejoraría aun mejor esto, es disponibilizar algo para cache, como Redis.



