export interface Tarea {
    TareaID?: number;
    Nombre: string;
    Descripcion: string;
    FechaInicio: string;
    FechaFin: string;
    ProyectoID: number;
    Empleados: number[];
  }
  
  export interface Proyecto {
    ProyectoID: number;
    Nombre: string;
    Descripcion: string;
  }
  
  export interface Empleado {
    EmpleadoID: number;
    Nombre: string;
    Correo: string;
  }
  