import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from "./pages/HomePage";
import { Client } from 'rr-apilib';
import CategoriesPage from './pages/CategoriesPage';

const client = new Client();

export default function App() {

    return (
        <div>
            <Navbar />
            <Routes>
                <Route path="/" element={<HomePage client={client} />} />
                <Route path="/categories" element={<CategoriesPage client={client} />} />
            </Routes>
        </div>
    );
}