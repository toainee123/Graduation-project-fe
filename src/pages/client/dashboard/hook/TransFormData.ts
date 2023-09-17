
export const TransFormToBarData = (data: any): any => data?.revenue?.map((item: any) => ({
    month: item.month + '/' + item.year,
    totalRevenue: +item.total
}))

export const TransFormToElecData = (data: any): any => data?.indexElectric?.map((item: any) => ({
    month: item.month + '/' + item.year,
    total: +item.total
}))

export const TransFormToWaterData = (data: any): any => data?.indexWater?.map((item: any) => ({
    month: item.month + '/' + item.year,
    total: +item.total
}))

export const TransFormToTotalBillData = (data: any): any => data?.totalBill?.map((item: any) => ({
    month: item.month + '/' + item.year,
    total: +item.total
}))




