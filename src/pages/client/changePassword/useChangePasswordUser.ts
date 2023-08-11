import { message } from 'antd';
import React, { useState } from 'react'
import { UserChangepassword } from 'src/api/infomation';

type UserChangepasswordreq = {
    passwordOld: string;
    password: string;
    password_confirmation: string;
};

export const useChangePasswordUser = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const changePassWord = async (values: UserChangepasswordreq) => {
        try {
            setIsLoading(true)
            await UserChangepassword(values)
            message.success('Cập nhật mật khẩu thành công')
        } catch (error: any) {
            message.error(error.message)
        } finally {
            setIsLoading(false)
        }
    }

    return { isLoading, changePassWord }
}
