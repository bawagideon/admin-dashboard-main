import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './layouts/Layout';
import Overview from './pages/Overview';
import Customers from './pages/Customers';
import Orders from './pages/Orders';
import Products from './pages/Products';
import Coupons from './pages/Coupons';
import AuditLogs from './pages/AuditLogs';
import ContactMessages from './pages/ContactMessages';
import RegisteredUsers from './pages/RegisteredUsers';
import AdminInbox from './pages/AdminInbox';
import SpecialistWorkspace from './pages/SpecialistWorkspace';
import MDDashboard from './pages/MDDashboard';

// Placeholders for other pages
const Placeholder = ({ title }) => (
  <div className="p-6 bg-white rounded-xl shadow-sm border border-gray-100">
    <h1 className="text-2xl font-bold text-slate-800">{title}</h1>
    <p className="text-slate-500 mt-2">Coming soon...</p>
  </div>
);

import { RoleProvider } from './lib/RoleContext';
import { WorkflowProvider } from './lib/WorkflowContext';
import WorkflowTour from './components/WorkflowTour';

function App() {
  return (
    <WorkflowProvider>
      <RoleProvider>
        <WorkflowTour />
        <BrowserRouter>
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<Overview />} />
              <Route path="/products" element={<Products />} />
              <Route path="/orders" element={<Orders />} />
              <Route path="/customers" element={<Customers />} />
              <Route path="/coupons" element={<Coupons />} />
              <Route path="/audit-logs" element={<AuditLogs />} />
              <Route path="/users" element={<RegisteredUsers />} />
              <Route path="/messages" element={<ContactMessages />} />
              <Route path="/inbox" element={<AdminInbox />} />
              <Route path="/mission-control" element={<SpecialistWorkspace />} />
              <Route path="/governance" element={<MDDashboard />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </RoleProvider>
    </WorkflowProvider>
  );
}

export default App;
