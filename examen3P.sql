Create database examen3P;
Use examen3P;
CREATE TABLE Proyectos (
    ProyectoID INT PRIMARY KEY AUTO_INCREMENT,
    Nombre VARCHAR(255) NOT NULL,
    Descripcion TEXT
);

CREATE TABLE Empleados (
    EmpleadoID INT PRIMARY KEY AUTO_INCREMENT,
    Nombre VARCHAR(255) NOT NULL,
    Correo VARCHAR(255) UNIQUE NOT NULL
);

CREATE TABLE Tareas (
    TareaID INT PRIMARY KEY AUTO_INCREMENT,
    Nombre VARCHAR(255) NOT NULL,
    Descripcion TEXT,
    FechaInicio DATE,
    FechaFin DATE,
    ProyectoID INT,
    FOREIGN KEY (ProyectoID) REFERENCES Proyectos(ProyectoID)
);

CREATE TABLE TareaEmpleado (
    TareaID INT,
    EmpleadoID INT,
    PRIMARY KEY (TareaID, EmpleadoID),
    FOREIGN KEY (TareaID) REFERENCES Tareas(TareaID),
    FOREIGN KEY (EmpleadoID) REFERENCES Empleados(EmpleadoID)
);
ALTER TABLE Tareas MODIFY COLUMN FechaInicio DATETIME;
ALTER TABLE Tareas MODIFY COLUMN FechaFin DATETIME;
INSERT INTO Proyectos (Nombre, Descripcion) VALUES
('Desarrollo Web', 'Proyecto para el desarrollo de un nuevo sitio web'),
('Aplicación Móvil', 'Desarrollo de una aplicación móvil para iOS y Android'),
('Rediseño de Marca', 'Rediseño del logotipo y branding de la empresa'),
('Sistema de Gestión', 'Implementación de un sistema de gestión interno'),
('Campaña Publicitaria', 'Desarrollo y ejecución de una campaña publicitaria en redes sociales');

INSERT INTO Empleados (Nombre, Correo) VALUES
('Juan Pérez', 'juan.perez@empresa.com'),
('Ana García', 'ana.garcia@empresa.com'),
('Luis Fernández', 'luis.fernandez@empresa.com'),
('Marta López', 'marta.lopez@empresa.com'),
('Carlos Gómez', 'carlos.gomez@empresa.com');

INSERT INTO Tareas (Nombre, Descripcion, FechaInicio, FechaFin, ProyectoID) VALUES
('Diseño de Página de Inicio', 'Crear el diseño de la página de inicio del sitio web', '2024-08-01', '2024-08-15', 1),
('Desarrollo del Backend', 'Desarrollar la API para la aplicación móvil', '2024-08-10', '2024-09-01', 2),
('Diseño del Logotipo', 'Diseñar el nuevo logotipo de la empresa', '2024-08-05', '2024-08-25', 3),
('Implementación de Funcionalidades', 'Implementar las funcionalidades del sistema de gestión', '2024-08-15', '2024-09-30', 4),
('Estrategia en Redes Sociales', 'Desarrollar una estrategia de publicidad en redes sociales', '2024-08-20', '2024-09-10', 5);

INSERT INTO TareaEmpleado (TareaID, EmpleadoID) VALUES
(1, 1),  -- Juan Pérez trabaja en la tarea "Diseño de Página de Inicio"
(1, 2),  -- Ana García trabaja en la tarea "Diseño de Página de Inicio"
(2, 3),  -- Luis Fernández trabaja en la tarea "Desarrollo del Backend"
(2, 4),  -- Marta López trabaja en la tarea "Desarrollo del Backend"
(3, 5),  -- Carlos Gómez trabaja en la tarea "Diseño del Logotipo"
(4, 1),  -- Juan Pérez trabaja en la tarea "Implementación de Funcionalidades"
(4, 4),  -- Marta López trabaja en la tarea "Implementación de Funcionalidades"
(5, 2),  -- Ana García trabaja en la tarea "Estrategia en Redes Sociales"
(5, 3);  -- Luis Fernández trabaja en la tarea "Estrategia en Redes Sociales"

