import React from 'react'
import './globalStyles.scss'

interface IGlobalStylesProps {
    children: React.ReactElement
}

const GlobalStyles = ({ children }: IGlobalStylesProps) => {
    return children
}

export default GlobalStyles