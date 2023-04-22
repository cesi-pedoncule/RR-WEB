import { Routes, Route } from 'react-router-dom';
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
import WithoutNavbar from './components/WithoutNavbar';
import WithNavbar from './components/WithNavbar';

const client = new Client();

export default function App() {

    return (
        <div>
            <Routes>
                <Route element={<WithNavbar client={client} />}>
                    <Route path="/" element={<ResourcesPage client={client} />} />
                    <Route path="/resources" element={<ResourcesPage client={client} />} />
                </Route>
                <Route element={<WithoutNavbar />}>
                    <Route path="/login" element={<LoginPage client={client} />} />
                </Route>
                <Route element={<WithNavbar client={client} />}>
                    <Route path="/resource-detail" element={<ResourceDetailPage client={client} />} />
                </Route>
                <Route element={<WithNavbar client={client} />}>
                    <Route path="/share" element={<ShareResourcesPage client={client} />} />
                </Route>
                <Route element={<WithNavbar client={client} />}>
                    <Route path="/create" element={<CreateResourcePage client={client} />} />
                </Route>
                <Route element={<WithoutNavbar />}>
                    <Route path="/edit" element={<EditResourcePage client={client} />} />
                </Route>
                <Route element={<WithNavbar client={client} />}>
                    <Route path="/categories" element={<CategoriesPage client={client} />} />
                </Route>
                <Route element={<WithNavbar client={client} />}>
                    <Route path="/category-detail" element={<CategoryDetailPage client={client} />} />
                </Route>
                <Route element={<WithNavbar client={client} />}>
                    <Route path="/profile" element={<ProfilePage client={client} />}/>
                </Route>
            </Routes>
        </div>
    );
}