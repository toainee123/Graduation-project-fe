import axiosClient from './axiosClient';

export const addContract = async (value: any) => {
  const url = `/contract`;
  return axiosClient.post(url, value);
};

export const getContractByIdRoom = async (id: any) => {
  const url = `/contract/${id}`;
  return axiosClient.get(url);
};
