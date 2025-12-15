import { useEffect, useState } from "react";
import { Box, Grid } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import * as productService from "../../services/productService";
import ComponentWrapper from "../../components/ComponentWrapper";
import CustomTextInput from "../../components/CustomTextInput";
import CustomButton from "../../components/CustomButton";
import CustomDropdown from "../../components/CustomDropdown";

const AddProducts = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { product_id, mode } = location.state;

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

  return (
    <ComponentWrapper
      navigationHeaderTitle="Add New Product"
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
            disabled
          />
          <CustomTextInput
            label="Description"
            name="description"
            value={formData.description}
            disabled
          />
          <CustomTextInput
            label="Manufacturer"
            name="manufacturer"
            value={formData.manufacturer}
            disabled
          />
          <CustomTextInput
            label="Supplier"
            name="supplier_id"
            value={formData.supplier_id}
            disabled
          />
          <CustomDropdown
            label="Supplier"
            name="supplier_id"
            value={formData.supplier_id}
            options={supplierList}
            disabled
          />
          <CustomTextInput
            label="Code Name"
            name="code_name"
            value={formData.code_name}
            disabled
          />
        </Box>
      </Box>
    </ComponentWrapper>
  );
};

export default AddProducts;
