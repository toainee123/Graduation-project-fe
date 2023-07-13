import axiosClient from './axiosClient';
export const createDeposit = async (deposit: any) => {
  const url = `http://localhost:5000/api/deposit`;
  return axiosClient.post(url, deposit);
};
export const getListDeposit = async () => {
  const url = `http://localhost:5000/api/deposit`;
  return axiosClient.get(url);
};
