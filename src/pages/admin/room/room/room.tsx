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
                    <h1>
                        Danh sách phòng
                    </h1>
                </div>
                <NavRoom />
                <ListRoom />
            </div>
        </div >
    )
}

export default Room