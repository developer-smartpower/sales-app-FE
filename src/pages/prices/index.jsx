import { useEffect, useState } from "react";
import { Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import * as priceService from "../../services/priceService";
import nodatafound from "../../assets/images/utils/nodatafound.png";
import ComponentWrapper from "../../components/ComponentWrapper";
import CustomTable from "../../components/CustomTable";
import CustomSearchbar from "../../components/CustomSearchbar";
import { Add, FilterAlt } from "@mui/icons-material";
import * as COLORS from "../../assets/colors";

const Prices = () => {
  const navigate = useNavigate();

  const [priceList, setPriceList] = useState([]);
  const [searchValue, setSearchValue] = useState("");

  // table
  const columnsArr = [
    { label: "Product Name", key: "product_id" },
    { label: "Selling Price", key: "selling_price" },
    { label: "Updated By", key: "updated_by" },
    { label: "Created At", key: "created_at" },
    { label: "Updated At", key: "updated_at" },
  ];

  // add item
  const onAddPriceItemPressed = () => navigate("/prices/addPrice");

  const onViewItemPressed = (row) => {
    const { price_id } = row;
    navigate("/prices/addPrice", { state: { price_id, mode: "edit" } });
  };

  // fetch list
  const getPriceList = async () => {
    try {
      const response = await priceService.getPriceList();
      if (response && response.status === 200 && response.data.data) {
        setPriceList(response.data.data);
      }
    } catch (error) {}
  };

  useEffect(() => {
    getPriceList();
  }, []);

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
      primaryBtnText={"Add New Price Item"}
      onPrimaryBtnPressed={onAddPriceItemPressed}
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
        {priceList && priceList.length > 0 ? (
          <CustomTable
            columns={columnsArr}
            data={priceList}
            onViewItemPressed={(row) => onViewItemPressed(row)}
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

export default Prices;
