import { Tabs } from 'antd';
import CardRoom from '../cardRoom/cardRoom';

const room = [
    "Tầng 1", "Tầng 2"
]

const ListRoom = () => {
    return (
        <div className='mt-9'>
            <Tabs
                defaultActiveKey="1"
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

export default ListRoom