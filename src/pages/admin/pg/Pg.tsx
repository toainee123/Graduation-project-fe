import React from 'react';
import { Outlet } from 'react-router-dom';

type Props = {};

const Pg = (props: Props) => {
  return (
    <div>
      <h2>Pg</h2>
      <div>
        <Outlet />
      </div>
    </div>
  );
};

export default Pg;
