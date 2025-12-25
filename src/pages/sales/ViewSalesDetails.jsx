import { useEffect, useState } from "react";
import { Box, Grid } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import * as productService from "../../services/productService";
import ComponentWrapper from "../../components/ComponentWrapper";
import CustomTextInput from "../../components/CustomTextInput";
import CustomButton from "../../components/CustomButton";
import CustomDropdown from "../../components/CustomDropdown";

const ViewSalesDetails = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { product_id, mode } = location.state || "";

  // input fields
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    manufacturer: "",
    supplier_id: "",
    code_name: "",
  });

  const getProductDetails_ = async () => {
    try {
      const response = await productService.getProductDetails(product_id);
      if (response && response.status === 200 && response.data.data) {
        const productDetails = response.data.data;
        setFormData({
          name: productDetails.name,
          description: productDetails.description,
          manufacturer: productDetails.manufacturer,
          supplier_id: productDetails.supplier_id,
          code_name: productDetails.code_name,
        });
      }
    } catch (error) {}
  };

  useEffect(() => {
    if (mode && mode === "edit") {
      getProductDetails_();
    }
  });

  const supplierList = [
    { data: "cc1c1097-5c48-48c7-ae7b-b5554f5f6008", label: "company" },
  ];

  const [errorData, setErrorData] = useState({
    name: false,
    description: false,
    manufacturer: false,
  });

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
      const response = await productService.addProduct(formData);
      if (response && response.status === 200) {
        navigate(-1);
      }
    } catch (error) {}
  };

  return (
    <ComponentWrapper
      navigationHeaderTitle="Add Sales"
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
          <CustomTextInput
            label="Product Name"
            name="name"
            value={formData.name}
            placeholder="Enter the product name"
            onChange={handleChange}
            onError={onError}
            regex={/^[A-Za-z0-9\s\-]{2,50}$/}
            errorMessage={
              "Product name should be 2–50 characters and cannot include special characters"
            }
          />
          <CustomTextInput
            label="Description"
            name="description"
            value={formData.description}
            placeholder="Enter product description"
            onChange={handleChange}
            onError={onError}
            regex={/^[A-Za-z0-9\s.,\-()]{5,200}$/}
            errorMessage={
              "Description should be 5–200 characters and must not contain invalid symbols"
            }
          />
          <CustomTextInput
            label="Manufacturer"
            name="manufacturer"
            value={formData.manufacturer}
            placeholder="Enter product manufacturer"
            onChange={handleChange}
            onError={onError}
            regex={/^[A-Za-z0-9\s\-&,]{2,50}$/}
            errorMessage={
              "Manufacturer must be 2–50 characters and contain only letters, numbers, spaces, or basic symbols"
            }
          />
          <CustomTextInput
            label="Supplier"
            name="supplier_id"
            value={formData.supplier_id}
            placeholder="Select supplier"
            onChange={handleChange}
          />
          <CustomDropdown
            label="Select Order"
            name="order_id"
            value={formData.supplier_id}
            placeholder="Select supplier"
            options={supplierList}
            onChange={handleChange}
          />
          <CustomTextInput
            label="Code Name"
            name="code_name"
            value={formData.code_name}
            placeholder="Enter the code name"
            onChange={handleChange}
            onError={onError}
            regex={/^[A-Za-z0-9\s\-]{2,50}$/}
            errorMessage={
              "Product name should be 2–50 characters and cannot include special characters"
            }
          />
        </Box>
        <CustomButton
          label={"Add Product"}
          onClick={onSubmitPressed}
          disabled={Object.values(errorData).includes(true)}
        />
      </Box>
    </ComponentWrapper>
  );
};

export default ViewSalesDetails;
