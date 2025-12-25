import { useEffect, useState } from "react";
import { Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import * as salesService from "../../services/salesService";
import nodatafound from "../../assets/images/utils/nodatafound.png";
import ComponentWrapper from "../../components/ComponentWrapper";
import CustomTable from "../../components/CustomTable";
import CustomSearchbar from "../../components/CustomSearchbar";
import { Add, FilterAlt } from "@mui/icons-material";
import * as COLORS from "../../assets/colors";

const Sales = () => {
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [searchValue, setSearchValue] = useState("");

  // fetch list
  const getProductList = async () => {
    try {
      const response = await salesService.getSalesList();
      if (response && response.status === 200 && response.data.data) {
        setProducts(response.data.data);
      }
    } catch (error) {}
  };

  useEffect(() => {
    getProductList();
  }, []);

  // add item
  const onAddProductPressed = () => navigate("/sales/addSales");

  // table
  const columnsArr = [
    { label: "Order ID", key: "order_id" },
    { label: "Created At", key: "created_at" },
    { label: "Updated By", key: "updated_by" },
    { label: "Updated At", key: "updated_at" },
  ];

  const onViewItemPressed = (row) => {
    const { product_id } = row;
    navigate("/sales/viewSalesDetails", {
      state: { product_id, mode: "edit" },
    });
  };

  const onDeleteItemPressed = async (row) => {
    try {
      const response = await salesService.deleteProduct(row.product_id);
      if (response && response.status === 200) {
        // Refresh the list after delete
        getProductList();
      }
    } catch (error) {}
  };

  const renderHeaderContent = () => {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          width: "90%",
        }}
      >
        <CustomSearchbar
          placeholder={"search here"}
          value={searchValue}
          onSearchChange={(value) => setSearchValue(value)}
          customParentStyles={{ mr: 4 }}
        />
        <Box
          sx={{
            display: "flex",
            height: "50px",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <FilterAlt sx={{ fontSize: 24, color: COLORS.BLACK }} />
        </Box>
      </Box>
    );
  };

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
          borderRadius: "16px",
          backgroundColor: "#fff",
        }}
      >
        {products && products.length > 0 ? (
          <CustomTable
            columns={columnsArr}
            data={products}
            onViewItemPressed={(row) => onViewItemPressed(row)}
            onDeleteItemPressed={(row) => onDeleteItemPressed(row)}
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

export default Sales;
