import { useEffect, useState } from "react";
import { Box } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import * as productService from "../../services/productService";
import ComponentWrapper from "../../components/ComponentWrapper";
import CustomTextInput from "../../components/CustomTextInput";
import CustomDropdown from "../../components/CustomDropdown";

const AddProducts = () => {
  const navigate = useNavigate();
  const { product_id, mode } = useLocation().state || {};

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    manufacturer: "",
    supplier_id: "",
    code_name: "",
  });

  useEffect(() => {
    if (mode === "edit" && product_id) {
      (async () => {
        try {
          const res = await productService.getProductDetails(product_id);
          if (res?.status === 200 && res?.data?.data)
            setFormData(res.data.data);
        } catch {}
      })();
    }
  }, [mode, product_id]);

  const inputs = [
    { label: "Product Name", name: "name", component: CustomTextInput },
    { label: "Description", name: "description", component: CustomTextInput },
    { label: "Manufacturer", name: "manufacturer", component: CustomTextInput },
    { label: "Supplier", name: "supplier_id", component: CustomDropdown },
    { label: "Code Name", name: "code_name", component: CustomTextInput },
  ];

  return (
    <ComponentWrapper
      navigationHeaderTitle="View Product Details"
      onNavigationPressed={() => navigate(-1)}
    >
      <Box sx={{ flex: 1, backgroundColor: "#fff", borderRadius: 16, p: 4 }}>
        {inputs.map(({ label, name, component: Component }) => (
          <Component
            key={name}
            label={label}
            name={name}
            value={formData[name]}
            disabled
          />
        ))}
      </Box>
    </ComponentWrapper>
  );
};

export default AddProducts;
