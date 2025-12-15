import { Box, Grid, Typography } from "@mui/material";
import ComponentWrapper from "../../components/ComponentWrapper";
import * as authService from "../../services/authService";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as COLORS from "../../assets/colors";

const Profile = () => {
  const navigate = useNavigate();

  const [profileDetails, setProfileDetails] = useState({});

  const getProfileDetails = async () => {
    try {
      const response = await authService.getProductDetails();
      if (response.status === 200 && response.data && response.data.data) {
        setProfileDetails(response.data.data);
      }
    } catch (error) {}
  };

  useEffect(() => {
    getProfileDetails();
  }, []);

  const detailsRow = (label, value) => {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          mb: 1,
        }}
      >
        <Typography
          variant="subheading1"
          sx={{ width: "20%", color: COLORS.SECONDARY_TEXT }}
        >
          {label}
        </Typography>
        <Typography variant="subheading2" sx={{ color: COLORS.CHARCOAL_BLACK }}>
          {value}
        </Typography>
      </Box>
    );
  };
  return (
    <ComponentWrapper
      navigationHeaderTitle={"Profile"}
      onNavigationPressed={() => navigate("/analytics", { replace: true })}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          backgroundColor: COLORS.WHITE,
          width: "40%",
          flex: 1,
          borderRadius: "8px",
          p: 2,
        }}
      >
        <img
          src={profileDetails.profile_image_url}
          style={{ height: "100px", width: "100px", mb: 1 }}
          alt="dp"
        />
        <Typography sx={{ mb: 2 }}>{profileDetails.fullname}</Typography>
        <Box>
          <Typography sx={{ mb: 2 }}>Employee Details</Typography>
          <Box>
            {detailsRow("Email", profileDetails.email)}
            {detailsRow("Mobile Number", profileDetails.mobile_number)}
          </Box>
        </Box>
      </Box>
    </ComponentWrapper>
  );
};

export default Profile;
