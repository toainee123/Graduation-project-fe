import moment from "moment"

type data = {
    month: Date,
    totalRevenue: string
}

type transformData = {
    month: string,
    totalRevenue: string
}

export const TransFormToBarData = (data: data[]): transformData[] => data.map(item => ({
    month: moment(item.month).format('DD/MM/YYYY'),
    totalRevenue: item.totalRevenue
}))