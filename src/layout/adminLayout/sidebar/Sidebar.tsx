import { HomeOutlined, MailOutlined, SettingOutlined, SketchOutlined, UserOutlined } from '@ant-design/icons'
import { Avatar, Layout, Menu, MenuProps, MenuTheme } from 'antd'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AuthSliceAction } from '../../../features/auth/authSlice'
import { useAppDispatch } from '../../../store/hooks'
import { urlRouter } from '../../../utils/constants'

import './sidebar.scss'
type Props = {}

const { Sider } = Layout

const Sidebar = (props: Props) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate()
  const [mode, setMode] = useState<'vertical' | 'inline'>('inline');
  const [theme, setTheme] = useState<MenuTheme>('light');

  type MenuItem = Required<MenuProps>['items'][number];

  const menuListItem: MenuItem[] = [
    {
      label: (<Link to={urlRouter.DASHBOARD}>Dashboard</Link>),
      key: '1',
      icon: <HomeOutlined />,
      children: [
        {
          label: (<Link to={urlRouter.DASHBOARD}>Dashboard</Link>),
          key: '1.1',
          icon: <HomeOutlined />,
        },
        {
          label: (<Link to={urlRouter.DASHBOARD}>Dashboard</Link>),
          key: '1.2',
          icon: <HomeOutlined />,
        },
      ]
    },
    {
      label: (<Link to={urlRouter.PG}>Pg</Link>),
      key: '2',
      icon: <MailOutlined />
    },
    {
      label: <Link to={urlRouter.PG}>Setting</Link>,
      key: '3',
      icon: <SettingOutlined />
    },
  ]

  const logout = () => {
    dispatch(AuthSliceAction.logout())
    navigate(`/${urlRouter.AUTH}`)
  }

  return (
    <div id='sidebar' >
        <Sider>
          <div className='sidebarLogo'>
            <SketchOutlined />
          </div>
          <Menu
            // style={{ width: 70 }}
            // style={{ minHeight: '100vh' }}
            // onClick={handleOpenMenu}
            defaultSelectedKeys={['1']}
            // defaultOpenKeys={['2']}
            mode={mode}
            theme={theme}
            items={menuListItem}
            // selectedKeys={[current]}
          />

          <div className='userLogin'>
            <Avatar size={32} style={{margin: 'auto'}} icon={<UserOutlined />} />
            <span className='userTitle' style={{cursor: 'pointer'}} onClick={logout}>Đăng xuất</span>
          </div>
        </Sider>
        
        {/* {showMenu && <Sider collapsed={collapsedSide} className='first-child-sider'>
            <div className={`${collapsedSide ? 'sidebar-top-collapse' : 'sidebar-top'}`}>
              <button onClick={() => setCollapsedSide(!collapsedSide)}>
                {!collapsedSide && <LeftCircleOutlined />}
                {collapsedSide && <RightCircleOutlined />}
              </button>
            </div>

            <Menu mode={mode} items={menuListItem} />
        </Sider>} */}
        
    </div>
  )
}

export default Sidebar