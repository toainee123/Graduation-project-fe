import { Tabs } from 'antd';
import CardRoom from '../cardRoom/cardRoom';
import { useAppDispatch, useAppSelector } from 'src/store/hooks';
import { useEffect } from 'react';
import { HouseSliceAction, getAllHouse, selectIsDelete, selectIsSuccess } from 'src/features/room/houseSlice';

const ListRooms = () => {
    const house = useAppSelector(state => state.house.value)
    const isDelete = useAppSelector(selectIsDelete)
    const isSuccess = useAppSelector(selectIsSuccess)

    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(getAllHouse())
    }, [])

    useEffect(() => {
        if (isDelete) {
            dispatch(getAllHouse())
            HouseSliceAction.resetIsDelete()
        }
        if (isSuccess) {
            dispatch(getAllHouse())
            HouseSliceAction.resetIsSuccess()
        }

    }, [isDelete, isSuccess])

    const items = house?.result?.map((item: any, i: any) => {
        return {
            key: item.id,
            label: item.name,
            children: <CardRoom idHouse={item?.id} />
        }
    })

    return (
        <div className='mt-9'>
            <Tabs
                defaultActiveKey="1"
                type='card'
                items={items}
            />

        </div>
    )
}

export default ListRooms