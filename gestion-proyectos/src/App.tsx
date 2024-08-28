import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home'; 
import TaskManagement from './components/TaskManagement';
import './App.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css'; 
import 'primereact/resources/primereact.min.css';                
import 'primeicons/primeicons.css';        
import ProjectManagement from './components/ProjectManagement';
import EmployeeManagement from './components/EmployeeManagement';                     


const App: React.FC = () => {
  return (
    <Router>
      <div className="app-container">
        <Navbar /> 
        <div className="content-container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/tasks" element={<TaskManagement />} />
            <Route path="/projects" element={<ProjectManagement />} />
            <Route path="/employees" element={<EmployeeManagement />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
