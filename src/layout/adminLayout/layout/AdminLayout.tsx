import { Layout } from 'antd';
import { Outlet } from 'react-router-dom';

import Sidebar from '../sidebar/Sidebar';

import "./AdminLayout.scss"
import HeaderComponent from '../header/Header';

type Props = {};

const { Content } = Layout

const AdminLayout = (props: Props) => {
  return (
    <div>
      <Layout >
        <Sidebar />
        <Layout>
          <Content>
            <div className='layout-admin '>
              <HeaderComponent />

              <div className="outlet shadow-md">
                <Outlet />
              </div>
            </div>
          </Content>
          {/* <FooterComponent /> */}
        </Layout>
      </Layout>
    </div >
  );
};

export default AdminLayout;
