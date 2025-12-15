import { createTheme } from "@mui/material";
import "@fontsource/inter/300.css"; // light
import "@fontsource/inter/400.css"; // regular
import "@fontsource/inter/500.css"; // medium
import "@fontsource/inter/700.css"; // bold
import * as COLORS from "../colors";

const theme = createTheme({
  typography: {
    fontFamily: `'Inter', sans-serif`,
    h1: { fontWeight: 700, fontSize: "2.5rem" },
    h2: { fontWeight: 500, fontSize: "2rem" },
    subtitle1: { fontWeight: 500, fontSize: "0.875rem" }, // text1 replacement
    subtitle2: { fontWeight: 500, fontSize: "0.75rem" }, // text2 replacement
    body1: { fontWeight: 400, fontSize: "1rem" },
    body2: { fontWeight: 300, fontSize: "0.875rem" },
  },
  components: {
    MuiTableCell: {
      styleOverrides: {
        head: {
          color: COLORS.SECONDARY_TEXT,
          fontWeight: 500,
          fontSize: "0.875rem",
          backgroundColor: "#F9FAFB",
        },
        body: {
          color: COLORS.CHARCOAL_BLACK,
          fontWeight: 500,
          fontSize: "0.875rem",
        },
      },
    },
    MuiTableRow: {
      styleOverrides: {
        root: {
          "&:nth-of-type(odd)": {
            backgroundColor: "#ffffffff",
          },
          "&:hover": {
            backgroundColor: "#F3F4F6",
          },
        },
      },
    },
    MuiTableSortLabel: {
      styleOverrides: {
        root: {
          color: "#6B7280 !important",
        },
        icon: {
          color: "#9CA3AF !important",
        },
      },
    },
    MuiTablePagination: {
      styleOverrides: {
        root: {
          fontWeight: 500,
          "& .MuiTablePagination-toolbar": {
            marginRight: "16px",
          },
        },
        actions: {
          "& .MuiIconButton-root": {
            backgroundColor: `${COLORS.ROYAL_PURPLE}`,
            color: "#fff",
            borderRadius: "50%",
            width: 24,
            height: 24,
            margin: "0 4px",
          },
        },
      },
    },
  },
});

export default theme;
