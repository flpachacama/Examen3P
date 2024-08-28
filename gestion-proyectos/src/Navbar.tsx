import React from 'react';
import { Menubar } from 'primereact/menubar';
import './Navbar.css';

const Navbar: React.FC = () => {
  const items = [
    { label: 'Inicio', icon: 'pi pi-home', command: () => window.location.href = '/' },
    { label: 'Gestión de Tareas', icon: 'pi pi-tasks', command: () => window.location.href = '/tasks' }
  ];

  return (
    <div className="navbar-container">
      <Menubar model={items} />
    </div>
  );
};

export default Navbar;
