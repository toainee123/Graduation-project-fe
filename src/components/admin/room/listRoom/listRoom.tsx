import { Tabs } from 'antd';
import CardRoom from '../cardRoom/cardRoom';
import { useAppDispatch, useAppSelector } from 'src/store/hooks';
import { useEffect } from 'react';
import { getAllHouse } from 'src/features/room/houseSlice';

const ListRooms = () => {
    const house = useAppSelector(state => state.house.value)
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(getAllHouse())
    }, [])

    const items = house?.result?.map((item: any, i: any) => {
        return {
            key: i,
            label: item.name,
            children: <CardRoom />
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