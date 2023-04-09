export const baseApi = "https://64277ab946fd35eb7c406e8f.mockapi.io/"
export const baseApiService = "https://64277ab946fd35eb7c406e8f.mockapi.io/service"

export const dataSource = [
    {
        key: '1',
        nameService: 'Mike',
        age: 32,
        address: '10 Downing Street',
    },
    {
        key: '2',
        nameService: 'John',
        age: 42,
        address: '10 Downing Street',
    },
];
// cột bảng
export const columns = [
    {
        title: 'Tên dịch vụ',
        dataIndex: 'nameService',
        key: 'nameService',
    },
    {
        title: 'Hành động',
        dataIndex: 'age',
        key: 'age',
    },
    {
        title: 'Type',
        dataIndex: 'address',
        key: 'address',
    },
    {
        title: 'Active',
        dataIndex: 'address',
        key: 'address',
    },
];

// array filter 
export const arrayFilterSearch = [
    {
        field: "nameService",
        placeHolder: "Tên dịch vụ",
        type: "text",
    },
]