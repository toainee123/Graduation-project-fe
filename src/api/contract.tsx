import axiosClient from './axiosClient';

export const addContract = async (value: any) => {
  console.log(value);

  const url = `/contract`;
  return axiosClient.post(url, value);
};

export const updateContract = async (value: any, id: any) => {
  console.log(value, id);

  const url = `/contract/${id}`;
  return axiosClient.put(url, value);
};

export const getContractByIdRoom = async (id: any) => {
  console.log(typeof +id);

  const url = `/contract/${+id}`;
  console.log(`url: ${url}`);

  return axiosClient.get(url);
};

export const getImgContract = async () => {
  const url = `/contract/link-contract`;
  return axiosClient.get(url);
};

export const uploadImageContract = async (file: any) => {
  const url = `/dashboard/upload-file`;
  return axiosClient.post(url, file);
};
