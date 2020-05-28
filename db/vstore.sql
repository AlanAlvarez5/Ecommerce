drop database if exists vstore;
create database if not exists vstore;

use vstore;

-- YYYY-MM-DD HH:MM:SS
create table if not exists usuario(
	id int not null auto_increment,
    nombre varchar(75) not null,
    correo varchar(30) not null,
    password varchar(150) not null,
    telefono varchar(10) not null,
    direccion varchar(128) not null,
    cp varchar(10) not null,
    ciudad varchar(30) not null,
    admin boolean not null,
    primary key (id)
)ENGINE = INNODB;

create table if not exists producto(
	id int not null auto_increment,
    nombre varchar(20) not null,
    marca varchar(35) not null,
    descripcion varchar(255) not null,
    precio float(10,2),
    stock int not null,
    imagen varchar(255) not null,
    primary key (id)
) ENGINE = INNODB;

create table if not exists compra(
	id int not null auto_increment,
    usuario_id int  not null,
    total float(10,2) not null,
    fecha_hora timestamp not null default current_timestamp,
    estado varchar(20) not null,
    primary key(id),
    constraint fk_compra_usuario foreign key(usuario_id)
		references usuario(id)
        on delete cascade
        on update cascade
)ENGINE = INNODB;

create table if not exists detalle(
	compra_id int not null,
    producto_id int not null,
    cantidad int not null,
    primary key(compra_id, producto_id),
    constraint fk_detalle_compra foreign key(compra_id)
		references compra(id)
        on delete cascade
        on update cascade,
	constraint fk_detalle_producto foreign key(producto_id)
		references producto(id)
        on delete cascade
        on update cascade
)ENGINE = INNODB;
SELECT * FROM usuario;
INSERT into usuario (nombre, correo, password, telefono, direccion, cp, ciudad, admin) values ('Admin', 'admin', '$2a$12$z2/W.cxYLdM90bUe900cbObRBJuWKMs8jRklZdomlvDlodCCKEt/m', '213123', 'asdsad', '123213', 'Irapuato', 1);
INSERT into usuario (nombre, correo, password, telefono, direccion, cp, ciudad, admin) values ('Pedro', 'pedro@mail.com', '$2a$12$z2/W.cxYLdM90bUe900cbObRBJuWKMs8jRklZdomlvDlodCCKEt/m', '213123', 'asdsad', '123213', 'Irapuato', 0);
-- INSERT INTO producto (nombre, marca, descripcion, precio, stock, imagen ) VALUES ('OnePlus 8 Pro', 'OnePlus', 'camara 99px,ram 8 gb', '15000', '2', '1590452179336.jpg');
SELECT * FROM producto;