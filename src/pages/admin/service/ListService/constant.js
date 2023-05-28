import { CloseCircleFilled, EditFilled } from "@ant-design/icons";
import { Space } from "antd";

export const baseApi = "https://64277ab946fd35eb7c406e8f.mockapi.io/"
export const baseApiArise = "https://64277ab946fd35eb7c406e8f.mockapi.io/arise"

export const dataSource = [
    {
        "createdAt": "2023-05-28T05:50:51.077Z",
        "ariseName": "Incredible Concrete Towels",
        "type": "Sedan",
        "price": "185.00",
        "using": 49143,
        "id": "1"
    },
    {
        "createdAt": "2023-05-28T06:20:34.924Z",
        "ariseName": "Elegant Granite Mouse",
        "type": "SUV",
        "price": "183.00",
        "using": 48895,
        "id": "2"
    },
    {
        "createdAt": "2023-05-27T12:10:27.053Z",
        "ariseName": "Electronic Bronze Shirt",
        "type": "Minivan",
        "price": "258.00",
        "using": 64742,
        "id": "3"
    },
    {
        "createdAt": "2023-05-27T17:39:07.762Z",
        "ariseName": "Ergonomic Plastic Computer",
        "type": "Extended Cab Pickup",
        "price": "261.00",
        "using": 49162,
        "id": "4"
    },
    {
        "createdAt": "2023-05-27T08:40:39.901Z",
        "ariseName": "Incredible Cotton Pants",
        "type": "SUV",
        "price": "764.00",
        "using": 77040,
        "id": "5"
    },
    {
        "createdAt": "2023-05-27T08:13:56.077Z",
        "ariseName": "Tasty Cotton Hat",
        "type": "Convertible",
        "price": "482.00",
        "using": 88825,
        "id": "6"
    },
    {
        "createdAt": "2023-05-27T19:13:47.457Z",
        "ariseName": "Generic Concrete Salad",
        "type": "Crew Cab Pickup",
        "price": "992.00",
        "using": 27450,
        "id": "7"
    },
    {
        "createdAt": "2023-05-27T11:34:14.032Z",
        "ariseName": "Intelligent Cotton Bike",
        "type": "Extended Cab Pickup",
        "price": "700.00",
        "using": 53531,
        "id": "8"
    }
];
// cột bảng
export const columns = [
    {
        title: 'Action',
        key: 'action',
        render: () => (
            <Space size="middle">
                <EditFilled className="color-green action-table" />
                <CloseCircleFilled className="color-red action-table" />
            </Space>
        ),
    },
    {
        title: 'Tên dịch vụ',
        dataIndex: 'ariseName',
        key: 'nameArise',
    },
    {
        title: 'Loại dịch vụ',
        dataIndex: 'typeSẻ',
        key: 'typeSẻ',
    },
    {
        title: 'Đơn giá ($)',
        dataIndex: 'price',
        key: 'price',
    },
    {
        title: 'Đang dùng',
        dataIndex: 'using',
        key: 'using',
    },
];
