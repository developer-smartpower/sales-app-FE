import React, { useState } from "react";
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Stack,
  Container,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import * as authService from "../../services/authService";
import CustomButton from "../../components/CustomButton";

const ForgotPassword = () => {
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
          <Stack spacing={0} sx={{ marginBottom: "20%" }}>
            <Box>
              <Typography variant="subtitle1" fontWeight={500} sx={{ mb: 1 }}>
                Mobile Number
              </Typography>
              <TextField
                name="mobile_number"
                placeholder="Enter your mobile number"
                value={formData.mobile_number}
                onChange={handleChange}
                fullWidth
                required
                InputProps={{
                  sx: { borderRadius: "8px", height: "50px" },
                }}
              />
            </Box>

            <Box>
              <Typography
                variant="subtitle1"
                fontWeight={500}
                sx={{ mb: 1, mt: 3 }}
              >
                Password
              </Typography>
              <TextField
                name="password"
                type="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                fullWidth
                required
                InputProps={{
                  sx: { borderRadius: "8px", height: "50px" },
                }}
              />
            </Box>
          </Stack>

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

export default ForgotPassword;
