import { Tabs } from 'antd';
import CardRoom from '../cardRoom/cardRoom';

const room = [
    "Tầng 1", "Tầng 2"
]

const ListRooms = () => {
    return (
        <div className='mt-9'>
            <Tabs
                defaultActiveKey="1"
                type='card'
                items={room.map((Icon, i) => {
                    const id = String(i + 1);

                    return {
                        label: (
                            <span>
                                {Icon}
                            </span>
                        ),
                        key: id,
                        children: <CardRoom />,
                    };
                })}
            />

        </div>
    )
}

export default ListRooms