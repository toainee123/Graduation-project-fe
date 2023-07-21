import axiosClient from './axiosClient';
export const createDeposit = async (deposit: any) => {
  const url = `http://localhost:5000/api/deposit`;
  return axiosClient.post(url, deposit);
};
export const getListDeposit = async (data: any) => {
  const url = `http://localhost:5000/api/deposit`;
  return axiosClient.get(url, {
    params: data,
  });
};
export const updateStatus = async (id: any, status: any) => {
  const url = `http://localhost:5000/api/deposit/${id}/status`;
  return axiosClient.put(url, { status });
};

export const deleteDeposit = async (id: number) => {
  const url = `http://localhost:5000/api/deposit/${id}`;
  return axiosClient.delete(url);
};

export const updateDeposit = async (id: number, data: any) => {
  const url = `http://localhost:5000/api/deposit/${id}`;
  return axiosClient.put(url, data);
};

export const getDeposit = async (id: number) => {
  const url = `http://localhost:5000/api/deposit/${id}`;
  return axiosClient.get(url);
};
