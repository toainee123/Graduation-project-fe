import axiosClient from './axiosClient';

export const addContract = async (value: any) => {
  const url = `/contract`;
  return axiosClient.post(url, value);
};
