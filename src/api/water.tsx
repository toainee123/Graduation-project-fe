import axiosClient from './axiosClient';
export const getListIndexWater = async (date: any) => {
  const url = `water?date=${date}`;
  return axiosClient.get(url);
};
