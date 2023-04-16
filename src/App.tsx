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
                <Route element={<WithoutNavbar />}>
                    <Route path="/" element={<LoginPage client={client} />} />
                </Route>
                <Route element={<WithNavbar />}>
                    <Route path="/resources" element={<ResourcesPage client={client} />} />
                </Route>
                <Route element={<WithNavbar />}>
                    <Route path="/resource-detail" element={<ResourceDetailPage />} />
                </Route>
                <Route element={<WithNavbar />}>
                    <Route path="/share" element={<ShareResourcesPage client={client}/>} />
                </Route>
                <Route element={<WithNavbar />}>
                    <Route path="/create" element={<CreateResourcePage />} />
                </Route>
                <Route element={<WithoutNavbar />}>
                    <Route path="/edit" element={<EditResourcePage/>} />
                </Route>
                <Route element={<WithNavbar />}>
                    <Route path="/categories" element={<CategoriesPage client={client} />} />
                </Route>
                <Route element={<WithNavbar />}>
                    <Route path="/category-detail" element={<CategoryDetailPage />} />
                </Route>
                <Route element={<WithNavbar />}>
                    <Route path="/profile" element={<ProfilePage/>}/>
                </Route>
            </Routes>
        </div>
    );
}