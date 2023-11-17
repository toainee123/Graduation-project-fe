import { BrowserRouter, Navigate, Route, Routes, useLocation } from 'react-router-dom';
import './components/specific/globalStyles/globalStyles';

import { adminRoutes, authRoute } from './routes/adminRoute';
// component
import Dialog from './components/specific/dialogConfirm/Dialog';
import AdminLayout from './layout/adminLayout/layout/AdminLayout';
import AuthLayout from './layout/authLayout/AuthLayout';

//path router
import Loading from './components/common/loading/Loading';
import ProtectedAuth from './components/specific/ProtectedAuth/ProtectedAuth';
import { urlRouter } from './utils/constants';
import ProtectedRoute from './components/specific/protectedRoute/ProtectedRoute';
import Forgotpassword from './pages/auth/forgot-password/Forgotpassword';
import Createpassword from './pages/auth/forgot-password/Createpassword';
import ClientLayout from './layout/clientLayout/layout/ClientLayout';
import ClientService from './pages/client/service/ClientService';
import { clientRoute } from './routes/clientRoute';
import { useLayoutEffect } from 'react';
import Homempage from './pages/client/homepage/homepage';

const Wrapper = ({ children }: any) => {
  const location = useLocation();
  useLayoutEffect(() => {
    document.documentElement.scrollTo(0, 0);
  }, [location.pathname]);
  return children;
};

function App() {
  return (
    <div className='App'>
      <BrowserRouter>
        <Wrapper>
          <Routes>
            <Route
              path='/'
              element={
                <ProtectedAuth>
                  <ClientLayout />
                </ProtectedAuth>
              }
            >
              <Route index element={<Navigate to={urlRouter.CLIENT_DASHBOARD} />} />
              {clientRoute?.map((route: any, index) => {
                const Page = route.component;
                return (
                  <>
                    <Route key={index} path={route.path} element={<Page />} />
                    {route.children &&
                      route.children.length > 0 &&
                      route.children.map((children: any, index: number) => {
                        const ComponentChildren = children.component;
                        return children.index ? (
                          <Route key={index} path={route.path}>
                            <Route key={index} element={<Navigate to={children.path} />} />
                            <Route key={index} path={children.path} element={<ComponentChildren />} />
                          </Route>
                        ) : (
                          <Route key={index} path={children.path} element={<ComponentChildren />} />
                        );
                      })}
                  </>
                );
              })}
            </Route>
            <Route path='/lading-page' element={<Homempage />}></Route>
            <Route path={urlRouter.AUTH} element={<AuthLayout />}>
              <Route index element={<Navigate to={urlRouter.AUTH} />} />

              {authRoute.map((route, index) => {
                const Page = route.component;
                return <Route key={index} path={route.path} element={<Page />} />;
              })}

              <Route path='*' element={<Navigate to={''} replace />} />
            </Route>

            <Route path='/auth/forgot-password' element={<Forgotpassword />} />
            <Route path='/auth/create-new-password' element={<Createpassword />} />

            <Route
              path='admin'
              element={
                <ProtectedRoute>
                  <AdminLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<Navigate to={urlRouter.HOMEPAGE} />} />
              {adminRoutes.map((route, index) => {
                const Page = route.component;

                return (
                  <>
                    <Route key={index} path={route.path} element={<Page />} />
                    {route.children &&
                      route.children.length > 0 &&
                      route.children.map((children, index) => {
                        const ComponentChildren = children.component;
                        return children.index ? (
                          <Route key={index} path={route.path}>
                            <Route key={index} element={<Navigate to={children.path} />} />
                            <Route key={index} path={children.path} element={<ComponentChildren />} />
                          </Route>
                        ) : (
                          <Route key={index} path={children.path} element={<ComponentChildren />} />
                        );
                      })}
                  </>
                );
              })}
            </Route>

            <Route path='*' element={<Navigate to={'/'} />} />
          </Routes>
        </Wrapper>
      </BrowserRouter>

      <Dialog />
      <Loading />
    </div>
  );
}

export default App;
