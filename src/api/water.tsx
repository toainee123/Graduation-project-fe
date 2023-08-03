import axiosClient from './axiosClient';
export const getListIndexWater = async (date: any) => {
  console.log(date);

  const url = `water?date=${date}`;
  return axiosClient.get(url);
};
