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
export const getListReportInvoiceDetail = async (params?: any) => {
    const url = `http://localhost:5000/api/roomTenant/detail-bill`;
    return axiosClient.get(url, { params })
}