import { useState } from "react";
import { Box, Typography, TextField, Stack, Container } from "@mui/material";
import { useNavigate } from "react-router-dom";
import * as authService from "../../services/authService";
import CustomButton from "../../components/CustomButton";
import CustomTextInput from "../../components/CustomTextInput";

const SignIn = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    mobile_number: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmitPressed = async () => {
    try {
      const response = await authService.signIn(formData);
      if (response.status === 200 && response.data && response.data.data) {
        localStorage.setItem("access_token", response.data.data.access_token);
        localStorage.setItem("refresh_token", response.data.data.refresh_token);
        localStorage.setItem(
          "user_details",
          JSON.stringify(response.data.data.user_details)
        );
        navigate("/analytics");
      }
    } catch (error) {}
  };

  return (
    <Container
      disableGutters
      maxWidth={false}
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "row",
        backgroundColor: "#fff",
      }}
    >
      <Box
        sx={{
          display: "flex",
          width: "60%",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            display: "flex",
            width: "40%",
            flexDirection: "column",
          }}
        >
          <Typography
            variant="h4"
            fontWeight={600}
            align="left"
            sx={{ marginBottom: "20%" }}
          >
            Sign In
          </Typography>
          <CustomTextInput
            label={"Mobile Number"}
            name={"mobile_number"}
            placeholder={"Enter your mobile number"}
            value={formData.mobile_number}
            onChange={handleChange}
          />
          <CustomTextInput
            label={"Password"}
            name={"password"}
            placeholder={"Enter your password"}
            value={formData.password}
            onChange={handleChange}
          />
          <CustomButton
            label={"Sign In"}
            onClick={() => onSubmitPressed()}
            buttonStyles={{
              backgroundColor: "#EBEAFB",
              color: "#6C63DD",
              borderRadius: "8px",
              fontWeight: "500",
              height: "50px",
              fontSize: "14px",
            }}
            fullWidth={true}
          />
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          width: "40%",
          alignItems: "center",
          justifyContent: "center",
          m: 2,
        }}
      >
        <Box
          sx={{
            display: "flex",
            width: "100%",
            flexDirection: "column",
            borderRadius: "16px",
            height: "100%",
            alignItems: "flex-start",
            justifyContent: "flex-end",
            backgroundColor: "#6C63DD",
            pl: 2,
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              mb: "20%",
            }}
          >
            <Typography
              sx={{ fontWeight: 500, mb: 3, color: "#fff", fontSize: 24 }}
            >
              Your Ultimate Inventory Managment Partner
            </Typography>
            <Typography sx={{ fontWeight: 600, color: "#fff", fontSize: 32 }}>
              Inverra
            </Typography>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default SignIn;
