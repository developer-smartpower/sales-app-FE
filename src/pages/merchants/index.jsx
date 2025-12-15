import { useEffect, useState } from "react";
import { Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import * as merchantService from "../../services/merchantService";
import nodatafound from "../../assets/images/utils/nodatafound.png";
import ComponentWrapper from "../../components/ComponentWrapper";
import CustomTable from "../../components/CustomTable";
import CustomSearchbar from "../../components/CustomSearchbar";
import { Add, FilterAlt } from "@mui/icons-material";
import * as COLORS from "../../assets/colors";

const Merchants = () => {
  const navigate = useNavigate();
  const [merchants, setMerchantList] = useState([]);
  const [searchValue, setSearchValue] = useState("");

  // fetch list
  const getMerchantList = async () => {
    try {
      const response = await merchantService.getMerchantList();
      if (response && response.status === 200 && response.data.data) {
        setMerchantList(response.data.data);
      }
    } catch (error) {}
  };

  useEffect(() => {
    getMerchantList();
  }, []);

  // add item
  const onAddMerchantPressed = () => navigate("/merchants/addMerchant");

  // table
  const columnsArr = [
    { label: "Merchant Name", key: "company_name" },
    { label: "SPOC Name", key: "spoc_name" },
    { label: "Address", key: "address" },
    { label: "Mobile Number", key: "mobile_number" },
    { label: "Landline", key: "landline" },
  ];

  const onViewItemPressed = (row) => {
    const { merchant_id } = row;
    navigate("/merchants/addMerchant", {
      state: { merchant_id, mode: "edit" },
    });
  };

  const onDeleteItemPressed = async (row) => {
    try {
      const response = await merchantService.disableMerchant(row.merchant_id);
      if (response && response.status === 200) {
        // Refresh the list after delete
        getMerchantList();
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
      primaryBtnText={"Add Merchant"}
      onPrimaryBtnPressed={onAddMerchantPressed}
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
        {merchants && merchants.length > 0 ? (
          <CustomTable
            columns={columnsArr}
            data={merchants}
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

export default Merchants;
