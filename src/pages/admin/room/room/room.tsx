import React from 'react'
import { Link } from 'react-router-dom'
import ListRoom from 'src/components/admin/room/listRoom/listRoom'
import NavRoom from 'src/components/admin/room/navRoom/navRoom'

import "./room.scss"

const Room = () => {
    return (
        <div className='room'>
            <div className="room_filter">
                <div className="row">
                    <div className='title_page'>
                        <h1>Danh Sách Phòng</h1>
                    </div>
                </div>
                <NavRoom />
                <ListRoom />
            </div>
        </div >
    )
}

export default Room