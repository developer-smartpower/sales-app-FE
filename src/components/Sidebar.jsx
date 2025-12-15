import { Box, Typography } from "@mui/material";
import {
  Bento,
  Inventory,
  Storefront,
  ShoppingCartCheckout as PurchaseIcon,
  Equalizer,
  Badge,
  Logout as LogoutIcon,
} from "@mui/icons-material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import applogo from "../assets/images/logo.png";
import * as authService from "../services/authService";
import * as COLORS from "../assets/colors";

const Sidebar = ({ drawer_width = 220 }) => {
  const navigate = useNavigate();
  const [selected, setSelected] = useState(1);

  const menuItems = [
    { id: 1, label: "Analytics", icon: Equalizer, path: "/analytics" },
    { id: 2, label: "Products", icon: Storefront, path: "/products" },
    { id: 3, label: "Merchants", icon: Inventory, path: "/merchants" },
    { id: 4, label: "Orders", icon: PurchaseIcon, path: "/orders" },
    { id: 5, label: "Sales", icon: Bento, path: "/sales" },
    { id: 6, label: "Prices", icon: Bento, path: "/prices" },
    { id: 7, label: "Returns", icon: Bento, path: "/returns" },
    { id: 8, label: "Users", icon: Badge, path: "/users" },
  ];

  const profileItems = [
    {
      id: 9,
      label: "Logout",
      icon: LogoutIcon,
      action: async () => {
        try {
          const res = await authService.signout();
          if (res.status === 200) {
            ["access_token", "refresh_token", "user_details"].forEach((k) =>
              localStorage.removeItem(k)
            );
            navigate("/signin");
          }
        } catch {}
      },
    },
  ];

  const handleClick = (item) => {
    setSelected(item.id);
    item.path ? navigate(item.path) : item.action?.();
  };

  const SidebarItem = ({ item }) => {
    const Icon = item.icon;
    const isActive = selected === item.id;
    const color =
      item.id === 9
        ? COLORS.RUST_RED
        : isActive
        ? COLORS.ROYAL_PURPLE
        : COLORS.BLACK;
    const iconColor =
      item.id === 9
        ? COLORS.RUST_RED
        : isActive
        ? COLORS.ROYAL_PURPLE
        : COLORS.BLACK;

    return (
      <Box
        onClick={() => handleClick(item)}
        sx={{ display: "flex", alignItems: "center", py: 2, cursor: "pointer" }}
      >
        <Icon style={{ fontSize: 20, color: iconColor, marginRight: 16 }} />
        <Typography
          variant="subtitle1"
          sx={{ color, fontFamily: "Inter, sans-serif" }}
        >
          {item.label}
        </Typography>
      </Box>
    );
  };

  const renderList = (items) =>
    items.map((item) => <SidebarItem key={item.id} item={item} />);

  return (
    <Box
      sx={{
        width: drawer_width,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        backgroundColor: "#fff",
        borderRadius: 4,
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", pt: 3, pb: 6, px: 2 }}>
        <img src={applogo} alt="logo" style={{ height: 32, marginRight: 8 }} />
        <Typography
          variant="h6"
          fontWeight={600}
          sx={{ fontFamily: "Inter, sans-serif" }}
        >
          Inverra
        </Typography>
      </Box>
      <Box sx={{ flex: 1, px: 3 }}>{renderList(menuItems)}</Box>
      <Box sx={{ mb: 3, px: 3 }}>{renderList(profileItems)}</Box>
    </Box>
  );
};

export default Sidebar;
