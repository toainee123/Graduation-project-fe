import { Layout } from 'antd';
import React from 'react';
import { Outlet } from 'react-router-dom';
import FooterComponent from '../footer/Footer';
import HeaderComponent from '../header/Header';
import Sidebar from '../sidebar/Sidebar';


type Props = {};

const { Content  } = Layout

const AdminLayout = (props: Props) => {
  return (
    <div>
      <Layout >
        <Sidebar />
        <Layout>
          
          <HeaderComponent />
          
          <Content>
            <Outlet/>
          </Content>
          
          <FooterComponent />
        
        </Layout>
      </Layout>
    </div>
  );
};

export default AdminLayout;
