import { useEffect, useState } from "react";
import { Box, Grid } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import * as merchantService from "../../services/merchantService";
import ComponentWrapper from "../../components/ComponentWrapper";
import CustomTextInput from "../../components/CustomTextInput";
import CustomButton from "../../components/CustomButton";
import CustomDropdown from "../../components/CustomDropdown";

const AddMerchants = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { merchant_id, mode } = location.state || "";


  // input fields
  const [formData, setFormData] = useState({
    company_name: "",
    spoc_name: "",
    address: "",
    mobile_number: "",
    landline: "",
  });

  const getMerchantDetails_ = async () => {
    try {
      const response = await merchantService.getMerchantDetails(merchant_id);
      if (response && response.status === 200 && response.data.data) {
        const merchantDetails = response.data.data;
        setFormData({
          company_name: merchantDetails.company_name,
          spoc_name: merchantDetails.spoc_name,
          address: merchantDetails.address,
          mobile_number: merchantDetails.mobile_number,
          landline: merchantDetails.landline,
        });
      }
    } catch (error) {}
  };

  useEffect(() => {
    if (mode && mode === "edit" && merchant_id) {
      getMerchantDetails_();
    }
  });

  const [errorData, setErrorData] = useState({
    company_name: false,
    spoc_name: false,
    address: false,
    mobile_number: false,
    landline: false,
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
      const response = await merchantService.addMerchant(formData);
      if (response && response.status === 201) {
        navigate(-1);
      }
    } catch (error) {}
  };

  return (
    <ComponentWrapper
      navigationHeaderTitle="Add New Merchants"
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
            label="Merchant Name"
            name="company_name"
            value={formData.company_name}
            placeholder="Enter the merchant name"
            onChange={handleChange}
            onError={onError}
            regex={/^[A-Za-z0-9\s\-]{2,50}$/}
            errorMessage={
              "Product name should be 2–50 characters and cannot include special characters"
            }
          />
          <CustomTextInput
            label="SPOC Name"
            name="spoc_name"
            value={formData.spoc_name}
            placeholder="Enter the spoc name"
            onChange={handleChange}
            onError={onError}
            regex={/^[A-Za-z0-9\s\-]{2,50}$/}
            errorMessage={
              "Product name should be 2–50 characters and cannot include special characters"
            }
          />
          <CustomTextInput
            label="Address"
            name="address"
            value={formData.address}
            placeholder="Enter address"
            onChange={handleChange}
            onError={onError}
            regex={/^[A-Za-z0-9\s\-&,]{2,50}$/}
            errorMessage={
              "Manufacturer must be 2–50 characters and contain only letters, numbers, spaces, or basic symbols"
            }
          />
          <CustomTextInput
            label="Mobile number"
            name="mobile_number"
            value={formData.mobile_number}
            placeholder="Enter product mobile number"
            onChange={handleChange}
          />
          <CustomTextInput
            label="landline"
            name="landline"
            value={formData.landline}
            placeholder="Enter product landline"
            onChange={handleChange}
          />
        </Box>
        <CustomButton
          label={"Add Merchant"}
          onClick={onSubmitPressed}
          disabled={Object.values(errorData).includes(true)}
        />
      </Box>
    </ComponentWrapper>
  );
};

export default AddMerchants;
