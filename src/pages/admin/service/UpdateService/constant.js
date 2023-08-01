export const baseApi = "https://64c85221a1fe0128fbd5c2b1.mockapi.io/api/v1"
export const baseApiService = "https://64c85221a1fe0128fbd5c2b1.mockapi.io/api/v1/service"

export const textType = "TEXT"
export const numberType = "NUMBER"
export const selectType = "SELECT"
export const dateType = "DATE"
export const textAreaType = "TEXT-AREA"
export const checkBoxType = "CHECK-BOX"
// list các trường cần sd để thêm và updates
export const listItemService = [
    {
        label: "Tên dịch vụ",
        field: "serviceName",
        placeholder: "Tên dịch vụ",
        type: textType,
        required: true,
    },
    {
        label: "Loại dịch vụ",
        field: "serviceType",
        placeholder: "Loại dịch vụ",
        type: selectType,
        required: true,
    },
    {
        label: "Đơn giá",
        field: "price",
        placeholder: "Đơn giá",
        type: numberType,
        required: true,
    },
    {
        label: "Đang sử dụng",
        field: "using",
        placeholder: "Đang sử dụng",
        type: checkBoxType,
        required: true,
    },
    {
        label: "Mô tả",
        field: "serviceDescription",
        placeholder: "Thông tin mô tả ...",
        type: textAreaType,
        required: true,
    },
]