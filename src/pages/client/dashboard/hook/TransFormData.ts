export const TransFormToBarData = (data: any[]): any[] => data.map(item => ({
    month: item.month + '/' + item.year,
    totalRevenue: +item.total
}))