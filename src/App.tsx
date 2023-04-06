import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import { Client } from 'rr-apilib';
import CategoriesPage from './pages/CategoriesPage';
import LoginPage from './pages/LoginPage';
import ResourcesPage from './pages/ResourcesPage';
import ShareResourcesPage from './pages/ShareResourcesPage';
import ResourceDetailPage from './pages/ResourceDetailsPage';
import CreateResourcePage from './pages/CreateResourcePage';
import EditResourcePage from './pages/EditResourcePage';
import CategoryDetailPage from './pages/CategoryDetailsPage';
import ProfilePage from './pages/ProfilePage';

const client = new Client();

export default function App() {

    return (
        <div>
            <Navbar />
            <Routes>
                <Route path="/categories" element={<CategoriesPage client={client} />} />
                <Route path="categorie-detail" element={<CategoryDetailPage />} />
                <Route path="/share" element={<ShareResourcesPage client={client}/>} />
                <Route path="/resources" element={<ResourcesPage client={client} />} />
                <Route path="resource-detail" element={<ResourceDetailPage />} />
                <Route path="/" element={<LoginPage client={client} />} />
                <Route path="/create" element={<CreateResourcePage />} />
                <Route path="/edit" element={<EditResourcePage/>} />
                <Route path="/profile" element={<ProfilePage/>}/>
            </Routes>
        </div>
    );
}