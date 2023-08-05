import { RootState } from './../../../../store/store';
import moment from "moment"

type data = {
<<<<<<< HEAD
    year: string,
    month: string,
    total: string,
=======
    month: Date,
    totalRevenue: string,
    total: string
    year: string
>>>>>>> ae2f9056f0796f8efdd1968797c79effc5c26d7b
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
<<<<<<< HEAD
    month: `${item.month}/${item.year}`,
    totalRevenue: item.total
=======
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
>>>>>>> ae2f9056f0796f8efdd1968797c79effc5c26d7b
}))

export const TransFormToPieChart = (data: dataPie): transFormDataPie[] => Object.entries(data).map(([roomStatus, count]) => ({ roomStatus, count }));