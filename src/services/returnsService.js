import axiosInstance from "./common/axiosInstance";
import * as endpoints from "./common/endpoints";

export const addReturn = async (payload) => {
  return await axiosInstance.post(endpoints.addReturn, payload);
};

export const getReturnList = async () => {
  return await axiosInstance.get(endpoints.getReturnList);
};

export const viewReturnDetails = async () => {
  return await axiosInstance.get(
    `${endpoints.viewReturnDetails}/${return_id}`
  );
};

export const updateReturn = async (return_id, payload) => {
  return await axiosInstance.put(
    `${endpoints.updateReturn}/${return_id}`,
    payload
  );
};

export const cancelReturn = async (return_id) => {
  return await axiosInstance.patch(
    `${endpoints.cancelReturn}/${return_id}`
  );
};


