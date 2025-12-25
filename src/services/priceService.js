import axiosInstance from "./common/axiosInstance";
import * as endpoints from "./common/endpoints";

export const addNewPriceItem = async (payload) => {
  return await axiosInstance.post(endpoints.addNewPriceItem, payload);
};

export const getPriceList = async () => {
  return await axiosInstance.get(endpoints.getPriceList);
};

export const viewPriceDetails = async (price_id) => {
  return await axiosInstance.get(`${endpoints.viewPriceDetails}/${price_id}`);
};

export const updatePrice = async (price_id, payload) => {
  return await axiosInstance.put(
    `${endpoints.updatePrice}/${price_id}`,
    payload
  );
};

export const deletePriceItem = async (price_id) => {
  return await axiosInstance.patch(`${endpoints.deletePriceItem}/${price_id}`);
};
