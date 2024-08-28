import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Empleado } from '../types';
import './EmployeeManagement.css';

const EmployeeManagement: React.FC = () => {
    const [employees, setEmployees] = useState<Empleado[]>([]);
    const [selectedEmployee, setSelectedEmployee] = useState<Empleado | null>(null);

    useEffect(() => {
        fetchEmployees();
    }, []);

    const fetchEmployees = async () => {
        try {
            const response = await axios.get('http://localhost:3000/empleados');
            setEmployees(response.data);
        } catch (error) {
            console.error('Error fetching employees:', error);
        }
    };

    const handleDeleteEmployee = async (employeeId: number) => {
        try {
            await axios.delete(`http://localhost:3000/empleados/${employeeId}`);
            fetchEmployees();
        } catch (error) {
            console.error('Error deleting employee:', error);
        }
    };

    return (
        <div className="employee-management">
            <h1>Gestión de Empleados</h1>
            <DataTable value={employees} selectionMode="single" selection={selectedEmployee} onSelectionChange={(e) => setSelectedEmployee(e.value as Empleado)}>
                <Column field="Nombre" header="Nombre" />
                <Column field="Correo" header="Correo" />
                <Column
                    header="Acciones"
                    body={(rowData: Empleado) => (
                        <div>
                            <Button icon="pi pi-pencil" onClick={() => setSelectedEmployee(rowData)} />
                            <Button 
                                icon="pi pi-trash" 
                                onClick={() => {
                                    if (rowData.EmpleadoID !== undefined) {
                                        handleDeleteEmployee(rowData.EmpleadoID);
                                    } else {
                                        console.error('EmpleadoID es undefined');
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

export default EmployeeManagement;
