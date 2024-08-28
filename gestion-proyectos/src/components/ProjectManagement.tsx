import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Proyecto } from '../types';
import './ProjectManagement.css';

const ProjectManagement: React.FC = () => {
    const [projects, setProjects] = useState<Proyecto[]>([]);
    const [selectedProject, setSelectedProject] = useState<Proyecto | null>(null);

    useEffect(() => {
        fetchProjects();
    }, []);

    const fetchProjects = async () => {
        try {
            const response = await axios.get('http://localhost:3000/proyectos');
            setProjects(response.data);
        } catch (error) {
            console.error('Error fetching projects:', error);
        }
    };

    const handleDeleteProject = async (projectId: number) => {
        try {
            await axios.delete(`http://localhost:3000/proyectos/${projectId}`);
            fetchProjects();
        } catch (error) {
            console.error('Error deleting project:', error);
        }
    };

    return (
        <div className="project-management">
            <h1>Gestión de Proyectos</h1>
            <DataTable value={projects} selectionMode="single" selection={selectedProject} onSelectionChange={(e) => setSelectedProject(e.value as Proyecto)}>
                <Column field="Nombre" header="Nombre" />
                <Column field="Descripcion" header="Descripción" />
                <Column
                    header="Acciones"
                    body={(rowData: Proyecto) => (
                        <div>
                            <Button icon="pi pi-pencil" onClick={() => setSelectedProject(rowData)} />
                            <Button 
                                icon="pi pi-trash" 
                                onClick={() => {
                                    if (rowData.ProyectoID !== undefined) {
                                        handleDeleteProject(rowData.ProyectoID);
                                    } else {
                                        console.error('ProyectoID es undefined');
                                    }
                                }} 
                            />
                        </div>
                    )}
                />
            </DataTable>
        </div>
    );
};

export default ProjectManagement;
