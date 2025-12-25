import { useEffect, useState } from "react";
import { Box, Grid } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import * as productService from "../../services/productService";
import * as priceService from "../../services/priceService";
import ComponentWrapper from "../../components/ComponentWrapper";
import CustomTextInput from "../../components/CustomTextInput";
import CustomButton from "../../components/CustomButton";
import CustomDropdown from "../../components/CustomDropdown";

const AddPrices = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { price_id, mode } = location.state || "";

  const [productList, setProductList] = useState([]);

  // input fields
  const [formData, setFormData] = useState({
    product_id: "",
    selling_price: "",
  });

  const [errorData, setErrorData] = useState({
    product_id: false,
    selling_price: false,
  });

  const getProductLookup_ = async () => {
    try {
      const response = await productService.getProductLookUp();
      if (response && response.status === 200 && response.data.data) {
        setProductList(response.data.data);
      }
    } catch (error) {}
  };

  const viewPriceDetails_ = async () => {
    try {
      const response = await priceService.viewPriceDetails(price_id);
      if (response && response.status === 200 && response.data.data) {
        const priceItemDetails = response.data.data;
        setFormData({
          product_id: priceItemDetails.product_id,
          selling_price: priceItemDetails.selling_price,
        });
      }
    } catch (error) {}
  };

  useEffect(() => {
    getProductLookup_();
    if (mode && mode === "edit" && price_id) {
      viewPriceDetails_();
    }
  }, [mode, price_id]);

  // handle input fields
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const onError = (name, status) => {
    setErrorData({
      ...errorData,
      [name]: status,
    });
  };

  // on submit
  const onSubmitPressed = async () => {
    try {
      const response = await priceService.addNewPriceItem(formData);
      if (response && response.status === 201) {
        navigate(-1);
      }
    } catch (error) {}
  };

  return (
    <ComponentWrapper
      navigationHeaderTitle="Add New Price"
      onNavigationPressed={() => navigate(-1)}
    >
      <Box
        sx={{
          flex: 1,
          backgroundColor: "#fff",
          borderRadius: "16px",
          p: 4,
        }}
      >
        <Box>
          <CustomDropdown
            label="Product Name"
            name="product_id"
            value={formData.product_id}
            placeholder="Select Product"
            options={productList}
            onChange={handleChange}
          />
          <CustomTextInput
            label="Selling Price"
            name="selling_price"
            value={formData.selling_price}
            placeholder="Enter selling price"
            onChange={handleChange}
            onError={onError}
            regex={/^\d{1,8}(\.\d{1,2})?$/}
            errorMessage="Enter a valid price (up to 10 digits, max 2 decimals)"
          />
        </Box>
        <CustomButton
          label={"Add Price"}
          onClick={onSubmitPressed}
          // disabled={Object.values(errorData).includes(true)}
        />
      </Box>
    </ComponentWrapper>
  );
};

export default AddPrices;
