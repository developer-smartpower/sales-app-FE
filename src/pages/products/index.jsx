import { useEffect, useState } from "react";
import { Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import * as productService from "../../services/productService";
import nodatafound from "../../assets/images/utils/nodatafound.png";
import ComponentWrapper from "../../components/ComponentWrapper";
import CustomTable from "../../components/CustomTable";
import CustomSearchbar from "../../components/CustomSearchbar";
import { Add, FilterAlt } from "@mui/icons-material";
import * as COLORS from "../../assets/colors";

const Products = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [searchValue, setSearchValue] = useState("");

  const columnsArr = [
    { label: "Product Name", key: "name" },
    { label: "Description", key: "description" },
    { label: "Code", key: "code_name" },
    { label: "Manufacturer", key: "manufacturer" },
    { label: "Supplier", key: "supplier_id" },
  ];

  useEffect(() => {
    getProductList();
  }, []);

  const getProductList = async () => {
    try {
      const res = await productService.getProductList();
      if (res?.status === 200) setProducts(res.data.data || []);
    } catch (err) {}
  };

  const onViewItemPressed = (row) =>
    navigate("/products/addProduct", {
      state: { product_id: row.product_id, mode: "edit" },
    });

  const renderHeaderContent = () => (
    <Box sx={{ display: "flex", flexDirection: "row", width: "90%" }}>
      <CustomSearchbar
        placeholder="search here"
        value={searchValue}
        onSearchChange={setSearchValue}
        customParentStyles={{ mr: 4 }}
      />
      <Box
        sx={{
          display: "flex",
          height: 50,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <FilterAlt sx={{ fontSize: 24, color: COLORS.BLACK }} />
      </Box>
    </Box>
  );

  return (
    <ComponentWrapper
      primaryBtnIcon={<Add sx={{ fontSize: 18, color: COLORS.BLACK }} />}
      content={renderHeaderContent}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          flex: 1,
          borderRadius: 16,
          backgroundColor: "#fff",
        }}
      >
        {products.length > 0 ? (
          <CustomTable
            columns={columnsArr}
            data={products}
            onViewItemPressed={onViewItemPressed}
            disableSecondaryBtn
          />
        ) : (
          <Box
            sx={{
              display: "flex",
              flex: 1,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <img src={nodatafound} style={{ height: "40%" }} />
          </Box>
        )}
      </Box>
    </ComponentWrapper>
  );
};

export default Products;
