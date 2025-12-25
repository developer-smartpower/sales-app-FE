import { useEffect, useState } from "react";
import { Box, Grid } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import * as merchantService from "../../services/merchantService";
import ComponentWrapper from "../../components/ComponentWrapper";
import CustomTextInput from "../../components/CustomTextInput";
import CustomButton from "../../components/CustomButton";
import CustomDropdown from "../../components/CustomDropdown";
import InputBoxRenderer from "../../components/InputBoxRenderer";

const AddMerchants = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // get route state
  const { merchant_id, mode } = location.state || "";

  // input fields
  const [formData, setFormData] = useState({
    merchant_name: "",
    contact_person_name: "",
    email: "",
    mobile_number: "",
    landline: "",
    address: "",
  });
  const [errorData, setErrorData] = useState({
    merchant_name: false,
    contact_person_name: false,
    email: false,
    mobile_number: false,
    landline: false,
    address: false,
  });

  const getMerchantDetails_ = async () => {
    try {
      const response = await merchantService.getMerchantDetails(merchant_id);
      if (response && response.status === 200 && response.data.data) {
        const merchantDetails = response.data.data;
        setFormData({
          merchant_name: merchantDetails.merchant_name,
          contact_person_name: merchantDetails.contact_person_name,
          email: merchantDetails.email,
          mobile_number: merchantDetails.mobile_number,
          landline: merchantDetails.landline,
          address: merchantDetails.address,
        });
      }
    } catch (error) {}
  };

  useEffect(() => {
    if (mode && mode === "edit" && merchant_id) {
      getMerchantDetails_();
    }
  });

  // handle input
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
      <InputBoxRenderer title={"Merchant Details"}>
        <CustomTextInput
          label="Merchant Name"
          name="company_name"
          value={formData.company_name}
          placeholder="Enter the merchant name"
          onChange={handleChange}
          onError={onError}
          regex={/^[A-Za-z0-9\s\-&,]{2,200}$/}
          errorMessage={
            "Company name should be 2–200 characters and can include letters, numbers, spaces, -, & ,"
          }
          customMainStyles={{ mr: 10 }}
        />
        <CustomTextInput
          label="SPOC Name"
          name="contact_person_name"
          value={formData.contact_person_name}
          placeholder="Enter the spoc name"
          onChange={handleChange}
          onError={onError}
          regex={/^[A-Za-z\s]{2,150}$/}
          errorMessage={"Contact person name should be 2–150 letters only"}
        />
      </InputBoxRenderer>
      <InputBoxRenderer title={"Merchant Details"}>
        <CustomTextInput
          label="Address"
          name="address"
          value={formData.address}
          placeholder="Enter address"
          onChange={handleChange}
          onError={onError}
          regex={/^[A-Za-z0-9\s\-&,]{2,250}$/}
          errorMessage={
            "Address must be 2–250 characters and can include letters, numbers, spaces, -, &, ,"
          }
        />
      </InputBoxRenderer>
      <InputBoxRenderer title={"Primary Contact Details"}>
        <CustomTextInput
          label="Mobile number"
          name="mobile_number"
          value={formData.mobile_number}
          placeholder="Enter mobile number"
          onChange={handleChange}
          onError={onError}
          regex={/^\+?\d{7,15}$/}
          errorMessage={"Mobile number must be 7–15 digits, can include +"}
        />

        <CustomTextInput
          label="Landline"
          name="landline"
          value={formData.landline}
          placeholder="Enter landline number"
          onChange={handleChange}
          onError={onError}
          regex={/^\+?\d{7,15}$/}
          errorMessage={"Landline must be 7–15 digits, can include +"}
        />
      </InputBoxRenderer>
      <InputBoxRenderer title={"Secondary Contact Details"}>
        <CustomTextInput
          label="Email"
          name="email"
          value={formData.email}
          placeholder="Enter email"
          onChange={handleChange}
          onError={onError}
          regex={/^[^\s@]+@[^\s@]+\.[^\s@]+$/}
          errorMessage={"Enter a valid email address"}
        />
      </InputBoxRenderer>

      <CustomButton
        label={"Add Merchant"}
        onClick={onSubmitPressed}
        disabled={Object.values(errorData).includes(true)}
      />
    </ComponentWrapper>
  );
};

export default AddMerchants;
