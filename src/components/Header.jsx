import { Box, Typography, IconButton } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";

const Header = ({ navigationHeaderTitle, onNavigationPressed }) => {
  const navigate = useNavigate();
  const userDetails = JSON.parse(localStorage.getItem("user_details")) || {};

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "#fff",
        borderRadius: 2,
      }}
      mb={4}
      p={2}
    >
      <Box sx={{ display: "flex", flex: 1 }}>
        {navigationHeaderTitle && (
          <Box sx={{ display: "flex", alignItems: "center", flex: 1 }}>
            <IconButton
              onClick={onNavigationPressed}
              sx={{
                backgroundColor: "#e4e4e4",
                borderRadius: "50%",
                p: 1,
                "&:hover": { backgroundColor: "#d3d3d3" },
              }}
            >
              <ArrowBackIcon sx={{ color: "#000" }} />
            </IconButton>
            <Typography variant="h6" ml={1}>
              {navigationHeaderTitle}
            </Typography>
          </Box>
        )}
      </Box>

      {userDetails && (
        <Box
          sx={{ display: "flex", alignItems: "center" }}
          onClick={() => navigate("/profile")}
        >
          <Typography sx={{ mr: 1, fontSize: 14 }}>
            {userDetails.fullname ?? ""}
          </Typography>
          {userDetails.profile_image_url && (
            <img
              src={userDetails.profile_image_url}
              alt="dp"
              style={{ height: 40, width: 40, borderRadius: "100px" }}
            />
          )}
        </Box>
      )}
    </Box>
  );
};

export default Header;
