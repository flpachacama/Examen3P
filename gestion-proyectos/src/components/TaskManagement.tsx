import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';
import { MultiSelect } from 'primereact/multiselect'; // Importa MultiSelect para seleccionar múltiples empleados
import { Tarea, Proyecto, Empleado } from '../types';
import './TaskManagement.css';

const TaskManagement: React.FC = () => {
    const [tasks, setTasks] = useState<Tarea[]>([]);
    const [projects, setProjects] = useState<Proyecto[]>([]);
    const [employees, setEmployees] = useState<Empleado[]>([]);
    const [selectedTask, setSelectedTask] = useState<Tarea | null>(null);
    const [newTask, setNewTask] = useState<Tarea>({
        TareaID: 0,
        Nombre: '',
        Descripcion: '',
        FechaInicio: '',
        FechaFin: '',
        ProyectoID: 0,
        Empleados: [] // Asegúrate de tener un campo para almacenar los empleados asignados
    });

    useEffect(() => {
        fetchTasks();
        fetchProjects();
        fetchEmployees();
    }, []);

    const fetchTasks = async () => {
        const response = await axios.get('http://localhost:3000/tareas');
        setTasks(response.data);
    };

    const fetchProjects = async () => {
        const response = await axios.get('http://localhost:3000/proyectos');
        setProjects(response.data);
    };

    const fetchEmployees = async () => {
        const response = await axios.get('http://localhost:3000/empleados');
        setEmployees(response.data);
    };

    const handleCreateTask = async () => {
        await axios.post('http://localhost:3000/tareas', newTask);
        fetchTasks();
        setNewTask({
            TareaID: 0,
            Nombre: '',
            Descripcion: '',
            FechaInicio: '',
            FechaFin: '',
            ProyectoID: 0,
            Empleados: [] // Resetea el campo de empleados asignados
        });
    };

    const handleUpdateTask = async () => {
        if (selectedTask) {
            await axios.put(`http://localhost:3000/tareas/${selectedTask.TareaID}`, selectedTask);
            fetchTasks();
            setSelectedTask(null);
        }
    };

    const handleDeleteTask = async (taskId: number) => {
        await axios.delete(`http://localhost:3000/tareas/${taskId}`);
        fetchTasks();
    };

    return (
        <div>
            <h1>Gestión de Tareas</h1>
            <DataTable value={tasks} selectionMode="single" selection={selectedTask} onSelectionChange={(e) => setSelectedTask(e.value as Tarea)}>
                <Column field="Nombre" header="Nombre" />
                <Column field="Descripcion" header="Descripción" />
                <Column field="FechaInicio" header="Fecha Inicio" />
                <Column field="FechaFin" header="Fecha Fin" />
                <Column
                    header="Acciones"
                    body={(rowData: Tarea) => (
                        <div>
                            <Button icon="pi pi-pencil" onClick={() => setSelectedTask(rowData)} />
                            <Button 
                                icon="pi pi-trash" 
                                onClick={() => {
                                    if (rowData.TareaID !== undefined) {
                                        handleDeleteTask(rowData.TareaID);
                                    } else {
                                        console.error('TareaID es undefined');
                                    }
                                }} 
                            />
                        </div>
                    )}
                />
            </DataTable>

            <h2>{selectedTask ? 'Actualizar Tarea' : 'Crear Nueva Tarea'}</h2>
            <div>
                <InputText 
                    value={newTask.Nombre} 
                    onChange={(e) => setNewTask({ ...newTask, Nombre: e.target.value })} 
                    placeholder="Nombre" 
                />
                <InputText 
                    value={newTask.Descripcion} 
                    onChange={(e) => setNewTask({ ...newTask, Descripcion: e.target.value })} 
                    placeholder="Descripción" 
                />
                <InputText 
                    type="date" 
                    value={newTask.FechaInicio} 
                    onChange={(e) => setNewTask({ ...newTask, FechaInicio: e.target.value })} 
                />
                <InputText 
                    type="date" 
                    value={newTask.FechaFin} 
                    onChange={(e) => setNewTask({ ...newTask, FechaFin: e.target.value })} 
                />
                <Dropdown 
                    value={newTask.ProyectoID} 
                    options={projects} 
                    optionLabel="Nombre" 
                    onChange={(e) => setNewTask({ ...newTask, ProyectoID: e.value })} 
                    placeholder="Seleccionar Proyecto" 
                />
                <MultiSelect 
                    value={newTask.Empleados} 
                    options={employees} 
                    optionLabel="Nombre" 
                    onChange={(e) => setNewTask({ ...newTask, Empleados: e.value })} 
                    placeholder="Seleccionar Empleados" 
                />
                <Button 
                    label={selectedTask ? 'Actualizar' : 'Crear'} 
                    onClick={selectedTask ? handleUpdateTask : handleCreateTask} 
                />
            </div>
        </div>
    );
};

export default TaskManagement;
