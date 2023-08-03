import { Layout } from 'antd';
import React from 'react';

type Props = {};

const { Footer } = Layout;

const FooterComponent = (props: Props) => {
  return (
    <div>
      <Footer>Footer Client</Footer>
    </div>
  );
};

export default FooterComponent;
