type Tservice = {
    nameService: string,
    priceService: string,
    total?: number
}

type data = {
    code: string,
    date: Date | string
    houseid: number
    id: number
    name: string
    namehouse: string
    nameroom: string
    nameservice: string
    phone: string
    price: string
    priceservice: string
    roomid: number
    service: Tservice[]
}

export type transFormData = Omit<data, 'service'> & {
    totalService: number,
    total: number
}

const getAllTotalService = (record: Tservice[]) => {
    const updatedData = record.map(item => {
        if (!item.total && item.priceService) {
            const priceService = parseInt(item.priceService, 10);
            const total = priceService; // Assuming there is a quantity property, otherwise default to 1
            return { ...item, total };
        }
        return item;
    });

    const total = updatedData.reduce((acc, item) => {
        const price = Number(item.priceService);
        const itemTotal = item.total ? item.total : price; // If total exists, use it, otherwise calculate from price
        return acc + itemTotal;
    }, 0);

    return total
}

export const transFormDataReportCustomRent = (data: data[]): transFormData[] => data.map(item => ({
    code: item.code,
    date: item.date,
    houseid: item.houseid,
    id: item.id,
    name: item.name,
    namehouse: item.namehouse,
    nameroom: item.nameroom,
    nameservice: item.nameservice,
    phone: item.phone,
    price: item.price,
    priceservice: item.priceservice,
    roomid: item.roomid,
    totalService: getAllTotalService(item.service),
    total: Number(item.price) + getAllTotalService(item.service)
}))