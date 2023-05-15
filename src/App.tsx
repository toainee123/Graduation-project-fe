import './components/specific/globalStyles/globalStyles';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import { adminRoutes, authRoute } from './routes/adminRoute';
// component
import AdminLayout from './layout/adminLayout/layout/AdminLayout';
import ProtectedRoute from './components/specific/protectedRoute/ProtectedRoute';
import AuthLayout from './layout/authLayout/AuthLayout';
import LandingLayout from './layout/landing/LandingLayout';
import Dialog from './components/specific/dialogConfirm/Dialog';

//path router
import { urlRouter } from './utils/constants';
import ProtectedAuth from './components/specific/ProtectedAuth/ProtectedAuth';
import Loading from './components/common/loading/Loading';

function App() {
  return (
    <div className='App'>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<ProtectedAuth Component={LandingLayout} />} />

          <Route path={urlRouter.AUTH} element={<AuthLayout />}>
            <Route index element={<Navigate to={urlRouter.LOGIN} />} />

            {authRoute.map((route, index) => {
              const Page = route.component;

              return <Route key={index} path={route.path} element={<Page />} />;
            })}

            <Route path='*' element={<Navigate to={''} replace />} />
          </Route>

          <Route
            path='admin'
            element={
              // <ProtectedRoute roles={'ADMIN'} Component={
              <AdminLayout />
              // } />
            }
          >
            <Route index element={<Navigate to={urlRouter.DASHBOARD} />} />
            {adminRoutes.map((route, index) => {
              const Page = route.component;

              return (
                <Route key={index} path={route.path} element={<Page />}>
                  {route.children &&
                    route.children.length > 0 &&
                    route.children.map((children, index) => {
                      const ComponentChildren = children.component;
                      return children.index ? (
                        <Route key={index}>
                          <Route key={index} index element={<Navigate to={children.path} />} />
                          <Route key={index} path={children.path} element={<ComponentChildren />} />
                        </Route>
                      ) : (
                        <Route key={index} path={children.path} element={<ComponentChildren />} />
                      );
                    })}
                </Route>
              );
            })}
          </Route>

          <Route path='*' element={<Navigate to={'/'} />} />
        </Routes>
      </BrowserRouter>

      <Dialog />
      <Loading />
    </div>
  );
}

export default App;
