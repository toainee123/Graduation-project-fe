import React from 'react'
import "./createRoom.scss"

import FormCreateRoom from 'src/components/admin/room/form/createRoom/formCreateRoom'
import { useNavigate, useLocation } from 'react-router-dom'

const CreateRoom = () => {
    const navigate = useNavigate()
    const search = useLocation().search;
    const keyLocation = new URLSearchParams(search).get('key');
    return (
        <div className='create_page h-full'>
            <div className='title_page'>
                {keyLocation === "update" ? (
                    <h1>Cập nhật Phòng</h1>
                ) : (
                    <h1>Thêm Phòng</h1>
                )}
            </div>
            <div className='float-right'>
                <button onClick={() => navigate(-1)} className='focus:outline-none text-white bg-green-700 hover:bg-green-800 font-medium rounded-lg text-sm px-5 py-2.5 mr-2'>
                    <i className="fa-solid fa-angles-left"></i> Quay về
                </button>
            </div><br />
            <FormCreateRoom />
        </div >
    )
}

export default CreateRoom