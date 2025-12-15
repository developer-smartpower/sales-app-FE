import axiosInstance from "./common/axiosInstance";
import * as endpoints from "./common/endpoints";

export const signIn = async (payload) => {
  return await axiosInstance.post(endpoints.signin, payload);
};

export const signout = async () => {
  return await axiosInstance.get(endpoints.signout);
};

export const getProductDetails = async () => {
  return await axiosInstance.get(endpoints.getProfileDetails);
};

export const getNewTokens = async (payload) => {
  return await axiosInstance.post(endpoints.getNewTokens, payload);
};

export const forgotPassword = async () => {
  return await axiosInstance.post(endpoints.forgotPassword);
};

export const resetPassword = async (payload) => {
  return await axiosInstance.post(endpoints.resetPassword, payload);
};
