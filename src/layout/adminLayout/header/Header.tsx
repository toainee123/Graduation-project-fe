import React, { useState } from 'react'
import { Layout } from 'antd'
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons'

type Props = {}

const { Header } = Layout

const HeaderComponent = (props: Props) => {

  return (
    <div>
      <Header>
        Header
      </Header>
    </div>
  )
}

export default HeaderComponent