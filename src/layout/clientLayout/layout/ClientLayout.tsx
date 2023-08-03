import { Layout } from 'antd';
import { Outlet } from 'react-router-dom';

import Sidebar from '../sidebar/Sidebar';

import './ClientLayout.scss';

type Props = {};

const { Content } = Layout;

const ClientLayout = (props: Props) => {
  return (
    <div>
      <Layout>
        <Sidebar />
        <Layout>
          <Content>
            <div className='layout-admin '>
              <div className='outlet shadow-md'>
                <Outlet />
              </div>
            </div>
          </Content>
          {/* <FooterComponent /> */}
        </Layout>
      </Layout>
    </div>
  );
};

export default ClientLayout;
