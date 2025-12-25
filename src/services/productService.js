import axiosInstance from "./common/axiosInstance";
import * as endpoints from "./common/endpoints";

export const getProductList = async () => {
  return await axiosInstance.get(endpoints.getProductList);
};

export const getProductDetails = async (product_id) => {
  return await axiosInstance.get(
    `${endpoints.getProductDetails}/${product_id}`
  );
};

export const getProductLookUp = async () => {
  return await axiosInstance.get(endpoints.getProductLookUp);
};
