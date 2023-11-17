import axios from 'axios';

const apiProvinces = axios.create({
  baseURL: `https://vapi.vnappmob.com/api`,
});

export const getProvinces = async () => {
  const url = '/province';
  return apiProvinces.get(url);
};

export const getDistrict = async (provincesId: any) => {
  console.log('provincesId', provincesId);
  const url = `/province/district/${provincesId}`;
  return apiProvinces.get(url);
};

export const getWards = async (districtId: any) => {
  const url = `/province/ward/${districtId}`;
  return apiProvinces.get(url);
};
