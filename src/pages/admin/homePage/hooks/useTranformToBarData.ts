import { RootState } from './../../../../store/store';
import moment from "moment"

type data = {
    month: Date,
    totalRevenue: string
}

type transformData = {
    month: string,
    totalRevenue: number
}

type dataPie = {
    roomAlready: number,
    roomAvailable: number,
}

type transFormDataPie = {
    roomStatus: string,
    count: number
}

export const TransFormToBarData = (data: data[]): transformData[] => data.map(item => ({
    month: moment(item.month).subtract(1, 'months').format('MM/YYYY'),
    totalRevenue: +item.totalRevenue
}))

export const TransFormToPieChart = (data: dataPie): transFormDataPie[] => Object.entries(data).map(([roomStatus, count]) => ({ roomStatus, count }));