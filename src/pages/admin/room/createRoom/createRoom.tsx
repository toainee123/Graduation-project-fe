import React from 'react'
import "./createRoom.scss"

import FormCreateRoom from 'src/components/admin/room/form/createRoom/formCreateRoom'

const CreateRoom = () => {
    return (
        <div className='create_page h-full'>
            <div className='title_page'>
                <h1>Thêm Phòng</h1>
            </div>
            <FormCreateRoom />
        </div>
    )
}

export default CreateRoom