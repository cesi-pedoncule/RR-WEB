import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from "./pages/HomePage";
import { Client } from 'rr-apilib';
import CategoriesPage from './pages/CategoriesPage';
import LoginPage from './pages/LoginPage';
import ResourcesPage from './pages/ResourcesPage';
import ShareResourcesPage from './pages/ShareResourcesPage';
import ResourceDetailPage from './pages/ResourceDetailsPage';
import CreateResourcePage from './pages/CreateResourcePage';
import EditResourcePage from './pages/EditResourcePage';
import CategoryDetailPage from './pages/CategoryDetailsPage';

const client = new Client();

export default function App() {

    return (
        <div>
            <Navbar />
            <Routes>
                <Route path="/" element={<HomePage client={client} />} />
                <Route path="/categories" element={<CategoriesPage client={client} />} />
                <Route path="categorie-detail" element={<CategoryDetailPage />} />
                <Route path="/share" element={<ShareResourcesPage client={client}/>} />
                <Route path="/resources" element={<ResourcesPage />} />
                <Route path="resource-detail" element={<ResourceDetailPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/create" element={<CreateResourcePage />} />
                <Route path="/edit" element={<EditResourcePage/>} />
            </Routes>
        </div>
    );
}