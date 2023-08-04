import axiosClient from "./axiosClient";
type TgetListReportCustomerRentParams = {
    houseId: string;
    roomId: string
}
export const getListReportCustomerRent = async (param?: TgetListReportCustomerRentParams) => {
    const url = `http://localhost:5000/api/roomTenant/renting-room?${param?.houseId ? `houseId=${param?.houseId}` : ''}${param?.roomId ? `&roomId=${param?.roomId}` : ''}`;
    return axiosClient.get(url)
}

export const getListReportCustomerContractExpired = async (param?: TgetListReportCustomerRentParams) => {
    const url = `http://localhost:5000/api/contract/?${param?.houseId ? `houseId=${param?.houseId}` : ''}${param?.roomId ? `&roomId=${param?.roomId}` : ''}`;
    return axiosClient.get(url)
}
export const getListReportInvoiceDetail = async (params?: TgetListReportCustomerRentParams) => {
    const url = 'http://localhost:5000/api/roomTenant/detail-bill?date=2023-07-10';
    return axiosClient.get(url, { params })
}