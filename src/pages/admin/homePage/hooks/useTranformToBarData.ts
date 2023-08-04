import { RootState } from './../../../../store/store';
import moment from "moment"

type data = {
    year: string,
    month: string,
    total: string,
}

type transformData = {
    month: string,
    totalRevenue: string
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
    month: `${item.month}/${item.year}`,
    totalRevenue: item.total
}))

export const TransFormToPieChart = (data: dataPie): transFormDataPie[] => Object.entries(data).map(([roomStatus, count]) => ({ roomStatus, count }));