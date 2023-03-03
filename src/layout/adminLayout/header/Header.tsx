import { Layout } from 'antd'
import React from 'react'

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