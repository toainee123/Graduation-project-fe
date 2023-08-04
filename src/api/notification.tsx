import axiosClient from './axiosClient';

export const sendNotification = (data: any) => {
  const url = `/dashboard/send-notification`;
  return axiosClient.post(url, data);
};

export const getAllNotification = () => {
  const url = `/dashboard/history-notification`;
  return axiosClient.get(url);
};
