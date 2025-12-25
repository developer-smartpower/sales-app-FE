import axiosInstance from "./common/axiosInstance";
import * as endpoints from "./common/endpoints";

export const addMerchant = async (payload) => {
  return await axiosInstance.post(endpoints.addMerchant, payload);
};

export const getMerchantList = async () => {
  return await axiosInstance.get(endpoints.getMerchantList);
};

export const getMerchantDetails = async () => {
  return await axiosInstance.get(
    `${endpoints.getMerchantDetails}/${merchant_id}`
  );
};

export const updateMerchant = async (merchant_id, payload) => {
  return await axiosInstance.put(
    `${endpoints.updateMerchant}/${merchant_id}`,
    payload
  );
};

export const deActivateMerchant = async (merchant_id) => {
  return await axiosInstance.patch(
    `${endpoints.deActivateMerchant}/${merchant_id}`
  );
};

export const getMerchatLookup = async () => {
  return await axiosInstance.get(endpoints.getMerchatLookup);
};
