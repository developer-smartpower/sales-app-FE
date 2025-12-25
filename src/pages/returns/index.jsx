import { useEffect, useState } from "react";
import { Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import * as returnsService from "../../services/returnsService";
import nodatafound from "../../assets/images/utils/nodatafound.png";
import ComponentWrapper from "../../components/ComponentWrapper";
import CustomTable from "../../components/CustomTable";
import CustomSearchbar from "../../components/CustomSearchbar";
import { Add, FilterAlt } from "@mui/icons-material";
import * as COLORS from "../../assets/colors";

const Returns = () => {
  const navigate = useNavigate();
  const [returnList, setReturnList] = useState([]);
  const [searchValue, setSearchValue] = useState("");

  // fetch list
  const returnList_ = async () => {
    try {
      const response = await returnsService.returnList();
      if (response && response.status === 200 && response.data.data) {
        setReturnList(response.data.data);
      }
    } catch (error) {}
  };

  useEffect(() => {
    returnList_();
  }, []);

  // add item
  const onAddReturnPressed = () => navigate("/returns/addReturn");

  // table
  const columnsArr = [
    { label: "Product Name", key: "name" },
    { label: "Description", key: "description" },
    { label: "Supplier", key: "supplier_id" },
    { label: "Manufacturer", key: "manufacturer" },
    { label: "Code", key: "code_name" },
  ];

  const onViewItemPressed = (row) => {
    const { product_id } = row;
    navigate("/returns/addReturn", { state: { product_id, mode: "edit" } });
  };

  const onDeleteItemPressed = async (row) => {
    try {
      const response = await returnsService.deleteProduct(row.product_id);
      if (response && response.status === 200) {
        // Refresh the list after delete
        returnList();
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
      primaryBtnText={"Add Return"}
      onPrimaryBtnPressed={onAddReturnPressed}
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
        {returnList && returnList.length > 0 ? (
          <CustomTable
            columns={columnsArr}
            data={returnList}
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

export default Returns;
