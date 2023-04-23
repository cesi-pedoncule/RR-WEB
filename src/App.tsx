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
import WithNavbar from './components/WithNavbar';
import { useState } from 'react';
import { TailSpin } from 'react-loader-spinner';

const client = new Client();

export default function App() {
    const [ isLoad, setIsLoad ] = useState<boolean>(false);

    const loadClient = async () => {
        await client.fetch();
        setIsLoad(true);
    }

    loadClient();

    if (!isLoad) {
        return (
            <div
                style={{
                    position: 'absolute',
                    top: "50%",
                    left: "50%"
                }}
            >
                <TailSpin
                    height="80"
                    width="80"
                    color="#03989E"
                    ariaLabel="tail-spin-loading"
                    radius="1"
                    wrapperStyle={{}}
                    wrapperClass=""
                    visible={true}
                />
            </div>
        )
    }

    return (
        <div>
            
            <WithNavbar client={client} />

            <Routes>
                
                <Route path='/' element={<ResourcesPage client={client} />} />

                <Route path="/login" element={<LoginPage client={client} />} />
                <Route path="/share" element={<ShareResourcesPage client={client} />} />
                <Route path="/profile" element={<ProfilePage client={client} />}/>
                
                {/* Resources */}
                <Route path='/resources' element={<ResourcesPage client={client} />} />
                <Route path="/resources/create" element={<CreateResourcePage client={client} />} />
                <Route path="/resources/:id" element={<ResourceDetailPage client={client} />} />
                <Route path="/resources/:id/edit" element={<EditResourcePage client={client} />} />

                {/* Categorie */}
                <Route path="/categories" element={<CategoriesPage client={client} />} />
                <Route path="/categories/:id" element={<CategoryDetailPage client={client} />} />
            </Routes>
        </div>
    );
}