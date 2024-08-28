import React from 'react';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import './Home.css';

const Home: React.FC = () => {
  return (
    <div className="home-container">
      <Card title="Freddy Leonel Pachacama" className="home-card">
        <p>
            Examen 3P<br></br>
            Administra tus proyectos, tareas y empleados de manera eficiente.
        </p>
      </Card>
    </div>
  );
};

export default Home;
