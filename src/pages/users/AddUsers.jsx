import React, { useState } from "react";
import { Box, Grid } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import * as userManagementService from "../../services/userManagementService";
import ComponentWrapper from "../../components/ComponentWrapper";
import CustomTextInput from "../../components/CustomTextInput";
import CustomDropdown from "../../components/CustomDropdown";

const AddUsers = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { user_id, mode } = location.state || "";

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    gender: "",
    designation: "",
    email: "",
    mobile_number: "",
    landline: "",
    role: "",
  });

  const genderArray = [
    { value: "male", label: "Male" },
    { value: "demale", label: "Female" },
  ];

  const designationArray = [{ value: "executive", label: "Executive" }];

  const roleArray = [
    { value: "admin", label: "Admin" },
    { value: "office_staff", label: "Office Staff" },
  ];

  // const getStockDetails_ = async () => {
  //   try {
  //     const response = await stockService.getStockDetails(stock_id);
  //     if (response && response.status === 200 && response.data.data) {
  //       const stockDetails = response.data.data;
  //       setFormData({
  //         product_id: stockDetails.product_id,
  //         available_quantity: stockDetails.available_quantity,
  //       });
  //     }
  //   } catch (error) {}
  // };

  // useEffect(() => {
  //   if (mode && mode === "edit") {
  //     getStockDetails_();
  //   }
  // });

  const onSubmitPressed = async () => {
    try {
      const response = await userManagementService.addUser(formData);
      if (response && response.status === 201) {
        navigate(-1);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <ComponentWrapper
      navigationHeaderTitle="Add New User"
      onNavigationPressed={() => navigate(-1)}
      primaryBtnText="Add User"
      onPrimaryBtnPressed={onSubmitPressed}
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
            label="First name"
            name="first_name"
            value={formData.first_name}
            placeholder="Enter first_name"
            onChange={handleChange}
          />
          <CustomTextInput
            label="last name"
            name="last_name"
            value={formData.last_name}
            placeholder="Enter last name"
            onChange={handleChange}
          />
          <CustomDropdown
            label="gender"
            name="gender"
            value={formData.gender}
            placeholder="Select gender"
            onChange={handleChange}
            options={genderArray}
          />
          <CustomDropdown
            label="designation"
            name="designation"
            value={formData.designation}
            placeholder="Select designation"
            onChange={handleChange}
            options={designationArray}
          />
          <CustomTextInput
            label="email"
            name="email"
            value={formData.email}
            placeholder="Enter email"
            onChange={handleChange}
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
          <CustomDropdown
            label="role"
            name="role"
            value={formData.role}
            placeholder="Select role"
            onChange={handleChange}
            options={roleArray}
          />
        </Box>
      </Box>
    </ComponentWrapper>
  );
};

export default AddUsers;
