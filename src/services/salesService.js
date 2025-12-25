import axiosInstance from "./common/axiosInstance";
import * as endpoints from "./common/endpoints";

export const createSale = async (payload) => {
  return await axiosInstance.post(endpoints.createSale, payload);
};

export const getSalesList = async () => {
  return await axiosInstance.get(endpoints.getSalesList);
};

export const getSaleById = async () => {
  return await axiosInstance.get(`${endpoints.getSaleById}/${sales_id}`);
};

export const updateSales = async (sales_id, payload) => {
  return await axiosInstance.put(
    `${endpoints.updateSales}/${sales_id}`,
    payload
  );
};
