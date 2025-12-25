import axiosInstance from "./common/axiosInstance";
import * as endpoints from "./common/endpoints";

export const createOrder = async (payload) => {
  return await axiosInstance.post(endpoints.createOrder, payload);
};

export const getOrderList = async () => {
  return await axiosInstance.get(endpoints.getOrderList);
};

export const getOrderLookup = async () => {
  return await axiosInstance.get(endpoints.getOrderLookup);
};

export const viewOrderDetails = async (order_id) => {
  return await axiosInstance.get(
    `${endpoints.viewOrderDetails}/${order_id}`
  );
};

export const updateOrder = async (order_id) => {
  return await axiosInstance.put(`${endpoints.updateOrder}/${order_id}`);
};

export const updateStatus = async () => {
  return await axiosInstance.patch(`${endpoints.updateStatus}/${order_id}`);
};
