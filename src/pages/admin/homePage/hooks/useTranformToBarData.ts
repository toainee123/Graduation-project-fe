import { RootState } from './../../../../store/store';
import moment from "moment"

type data = {
    month: Date,
    totalRevenue: string,
    total: string
    year: string
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
    month: item.month + '/' + item.year,
    totalRevenue: +item.total
}))

export const TransFormToElecData = (data: data[]): any => data.map(item => ({
    month: item.month + '/' + item.year,
    total: +item.total
}))

export const TransFormToWaterData = (data: data[]): any => data.map(item => ({
    month: item.month + '/' + item.year,
    total: +item.total
}))

export const TransFormToPieChart = (data: dataPie): transFormDataPie[] => Object.entries(data).map(([roomStatus, count]) => ({ roomStatus, count }));