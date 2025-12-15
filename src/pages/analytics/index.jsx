import React from "react";
import {
  Box,
  Grid,
  Paper,
  Typography,
  Card,
  CardContent,
  Divider,
  Container,
} from "@mui/material";
import AssessmentIcon from "@mui/icons-material/Assessment";
import ComponentWrapper from "../../components/ComponentWrapper";

const Analytics = () => {
  // Example stats – later you can load real data from API
  const stats = [
    {
      label: "Total Products",
      value: 128,
    },
    {
      label: "Sales This Month",
      value: 542,
    },
    {
      label: "Purchases",
      value: 86,
    },
    {
      label: "Revenue",
      value: "$24,530",
    },
  ];

  return (
    <ComponentWrapper mainTitle={"Analytics"}>
      <Grid container spacing={3}>
        {stats.map((stat, index) => (
          <Box
            sx={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between", // pushes label up, value down
              p: 2,
              borderRadius: 2,
              backgroundColor: "#fff",
              height: "100%", // equal height
            }}
          >
            <Typography color="black" variant="subtitle1" mb={6}>
              {stat.label}
            </Typography>
            <Typography variant="h4" fontWeight={700}>
              {stat.value}
            </Typography>
          </Box>
        ))}
      </Grid>
    </ComponentWrapper>
  );
};

export default Analytics;
