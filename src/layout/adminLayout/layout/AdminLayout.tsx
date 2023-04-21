import { Layout } from 'antd';
import React from 'react';
import { Outlet } from 'react-router-dom';
import FooterComponent from '../footer/Footer';
import HeaderComponent from '../header/Header';
import Sidebar from '../sidebar/Sidebar';

import './AdminLayout.scss';

type Props = {};

const { Content } = Layout;

const AdminLayout = (props: Props) => {
  return (
    <div>
      <Layout>
        <Sidebar />
        <Layout>
          <HeaderComponent />

          <Content>
            <div className='layout-admin'>
              <div className='outlet'>
                <Outlet />
              </div>
            </div>
          </Content>

          <FooterComponent />
        </Layout>
      </Layout>
    </div>
  );
};

export default AdminLayout;
