// auth
export const signin = "/auth/signin";
export const signout = "/auth/signout";
export const getProfileDetails = "/auth/me";
export const getNewTokens = "/auth/tokens";
export const forgotPassword = "/auth/password/forgot";
export const resetPassword = "/auth/password/reset";

// user management
export const addUser = "/users";
export const getUserList = "/users/";
export const viewUserDetails = "/users";
export const updateUser = "/users";

// products
export const getProductList = "/products";
export const getProductDetails = "/products";
export const getProductLookUp = "/products/lookup";

// merchants
export const addMerchant = "/merchants";
export const getMerchantList = "/merchants";
export const getMerchantDetails = "/merchants";
export const updateMerchant = "/merchants";
export const deActivateMerchant = "/merchants";
export const getMerchatLookup = "/merchants/lookup";

// orders
export const createOrder = "/orders";
export const getOrderList = "/orders";
export const viewOrderDetails = "/orders";
export const updateOrder = "/orders";
export const updateStatus = "/orders";
export const getOrderLookup = "/orders/lookup";

// prices
export const addNewPriceItem = "/prices";
export const getPriceList = "/prices";
export const viewPriceDetails = "/prices";
export const updatePrice = "/prices";
export const deletePriceItem = "/prices";

// sales
export const createSale = "/sales";
export const getSalesList = "/sales";
export const getSaleById = "/sales";
export const updateSales = "/sales";

// returns
export const addReturn = "/returns";
export const getReturnList = "/returns";
export const viewReturnDetails = "/returns";
export const updateReturn = "/returns";
export const cancelReturn = "/returns";
