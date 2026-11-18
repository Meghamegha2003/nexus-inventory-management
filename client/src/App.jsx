
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'sonner';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Products from './pages/Products';

function App() {
    return (
        <BrowserRouter>
            <Toaster
                position="top-right"
                richColors
                closeButton
                duration={3000}
            />

            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/login" element={<Login />} />
                <Route path="/dashboard" element={<Dashboard />} />
                 <Route path="/products" element={<Products />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
