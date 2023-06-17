import { Client } from 'rr-apilib';
import { useEffect, useMemo, useState } from 'react';
import { TailSpin } from 'react-loader-spinner';
import { Routes, Route, useNavigate } from 'react-router-dom';
import CategoriesPage from './pages/Category/CategoriesPage';
import LoginPage from './pages/LoginPage';
import ResourcesPage from './pages/Resource/ResourcesPage';
import ShareResourcesPage from './pages/ShareResourcesPage';
import ResourceDetailPage from './pages/Resource/ResourceDetailsPage';
import CreateResourcePage from './pages/Resource/CreateResourcePage';
import EditResourcePage from './pages/Resource/EditResourcePage';
import CategoryDetailPage from './pages/Category/CategoryDetailsPage';
import AdminUsersPage from './pages/Admin/AdminUsersPage';
import AdminMenuPage from './pages/Admin/AdminMenuPage';
import AdminUserPage from './pages/Admin/AdminUserPage';
import AdminValidationsPage from './pages/Admin/AdminValidationsPage';
import AdminValidationPage from './pages/Admin/AdminValidationPage';
import ProfilePage from './pages/User/ProfilePage';
import NotFoundPage from './pages/NotFoundPage';
import WithNavbar from './components/WithNavbar';
import AdminCategoriesPage from './pages/Admin/Categories/AdminCategoriesPage';
import AdminCategoryPage from './pages/Admin/Categories/AdminCategoryPage';
import AdminEditUserPage from './pages/Admin/AdminEditUserPage';
import AdminCategoryCreatePage from './pages/Admin/Categories/AdminCategoryCreatePage';
import CommonStyles from "./styles/CommonStyles.module.css";
import SendResetPasswordPage from './pages/SendResetPassword';
import ResetPasswordPage from './pages/ResetPassword';
import UserDetailPage from './pages/User/UserDetailPage';
import UsersPage from './pages/User/UsersPage';

export default function App() {
    
    const navigate = useNavigate();
    
    const [ isLoad, setIsLoad ] = useState<boolean>(false);
    const client = useMemo(() => new Client(), []);

    const loadClient = async () => {
        await client.fetch();

        const refresh_token = localStorage.getItem('refresh_token');

        if (refresh_token !== null) {
            client.auth.refresh_token = refresh_token;

            try {
                await client.auth.refresh();
            } catch (error) {
                localStorage.removeItem('refresh_token');
                navigate('/');                
            }
        }

        setIsLoad(true);
    }

    useEffect(() => {
        loadClient()
    }, []);

    if (!isLoad) {
        return (
            <div className={CommonStyles.container}>
                <div className={CommonStyles.contentWithoutNavBar}>
                    <div className={CommonStyles.loader}>
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
                </div>
            </div>
        )
    }

    return (
        <div>
            
            <WithNavbar client={client} />

            <Routes>
                
                <Route path='/' element={<ResourcesPage client={client} />} />

                <Route path="/login" element={<LoginPage client={client} />} />
                <Route path="/send-reset-password" element={<SendResetPasswordPage client={client} />} />
                <Route path="/forgot-password/:token" element={<ResetPasswordPage client={client} />} />

                {/* User */}
                <Route path="/profile" element={<ProfilePage client={client} />}/>
                <Route path="/users" element={<UsersPage client={client} />}/>
                <Route path="/user/:id" element={<UserDetailPage client={client} />}/>
                
                {/* Resources */}
                <Route path='/resources' element={<ResourcesPage client={client} />} />
                <Route path="/resources/create" element={<CreateResourcePage client={client} />} />
                <Route path="/resources/:id" element={<ResourceDetailPage client={client} />} />
                <Route path="/resources/:id/edit" element={<EditResourcePage client={client} />} />
                <Route path="/share" element={<ShareResourcesPage client={client} />} />

                {/* Categorie */}
                <Route path="/categories" element={<CategoriesPage client={client} />} />
                <Route path="/categories/:id" element={<CategoryDetailPage client={client} />} />

                {/* Admin */}
                <Route path="/admin" element={<AdminMenuPage client={client} />} />
                <Route path="/admin/users" element={<AdminUsersPage client={client} />} />
                <Route path="/admin/users/:id" element={<AdminUserPage client={client} />} />
                <Route path="/admin/users/:id/edit" element={<AdminEditUserPage client={client} />} />
                <Route path="/admin/validations/" element={<AdminValidationsPage client={client} />} />
                <Route path="/admin/validations/:id" element={<AdminValidationPage client={client} />} />
                
                {/* categories */}
                <Route path="/admin/categories" element={<AdminCategoriesPage client={client} />} />
                <Route path="/admin/categories/create" element={<AdminCategoryCreatePage client={client} />} />
                <Route path="/admin/categories/:id" element={<AdminCategoryPage client={client} />} />
                
                <Route path="/*" element={<NotFoundPage />} />
            </Routes>
        </div>
    );
}