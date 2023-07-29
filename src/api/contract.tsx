import axiosClient from './axiosClient';

export const addContract = async (value: any) => {
  const url = `/contract`;
  return axiosClient.post(url, value);
};

export const getContractByIdRoom = async (id: any) => {
  console.log(typeof +id);

  const url = `/contract/${+id}`;
  console.log(`url: ${url}`);

  return axiosClient.get(url);
};
