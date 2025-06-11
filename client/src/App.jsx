import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Programs from './pages/Programs';
import Contact from './pages/Contact';
import './App.css';

function App() {
    return (
        <Router>
            <div className="min-h-screen bg-gray-50 flex flex-col">
                <Navbar />
                    <main className="flex-grow pt-16">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/nosotros" element={<About />} />
                        <Route path="/programas" element={<Programs />} />
                        <Route path="/contacto" element={<Contact />} />
                        </Routes>
                    </main>
                    <Footer />
            </div>
                <Toaster position="top-right" />
        </Router>
    );
}

export default App;
