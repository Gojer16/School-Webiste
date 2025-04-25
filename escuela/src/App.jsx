import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';
import { ProtectedRoute } from './components/ProtectedRoute';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Programs from './pages/Programs';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import AdminPanel from './pages/AdminPanel';
import './App.css';

const queryClient = new QueryClient();

function App() {
    return (
        <Router>
            <QueryClientProvider client={queryClient}>
            <AuthProvider>
                <div className="min-h-screen bg-gray-50 flex flex-col">
                    <Navbar />
                    <main className="flex-grow pt-16">
                    <Routes>
                    {/* Public routes */}
                        <Route path="/" element={<Home />} />
                        <Route path="/nosotros" element={<About />} />
                        <Route path="/programas" element={<Programs />} />
                        <Route path="/contacto" element={<Contact />} />
                        {/*
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        */}

                            
                    {/* Protected routes */}
                        <Route
                        path="/dashboard"
                        element={
                        <ProtectedRoute>
                            <Dashboard />
                        </ProtectedRoute>}
                        />

                    {/* Admin routes */}
                        <Route
                        path="/admin/*"
                        element={
                        <ProtectedRoute adminOnly>
                            <AdminPanel />
                        </ProtectedRoute>}
                        />
                      
                    </Routes>
                    </main>
                    <Footer />
                </div>
                <Toaster position="top-right" />
                </AuthProvider>
            </QueryClientProvider>
        </Router>
    );
}

export default App;
