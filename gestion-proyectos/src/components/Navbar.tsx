import React from 'react';
import { Menubar } from 'primereact/menubar';
import './Navbar.css';

const Navbar: React.FC = () => {
  const items = [
    { label: 'Inicio', icon: 'pi pi-home', command: () => window.location.href = '/' },
    { label: 'Gestión de Tareas', icon: 'pi pi-check', command: () => window.location.href = '/tasks' },
    { label: 'Gestión de Proyectos', icon: 'pi pi-briefcase', command: () => window.location.href = '/projects' },
    { label: 'Gestión de Empleados', icon: 'pi pi-users', command: () => window.location.href = '/employees' }
  ];

  return (
    <div className="navbar-container">
      <Menubar model={items} />
    </div>
  );
};

export default Navbar;
