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
import dayjs from "dayjs";

const Merchants = () => {
  const navigate = useNavigate();
  const [merchants, setMerchantList] = useState([]);
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const res = await merchantService.getMerchantList();
        if (res?.status === 200 && res?.data?.data) {
          setMerchantList(
            res.data.data.map((item) => ({
              ...item,
              created_at: item.created_at
                ? dayjs(item.created_at).format("DD MMM YYYY")
                : null,
              updated_at: item.updated_at
                ? dayjs(item.updated_at).format("DD MMM YYYY")
                : null,
            }))
          );
        }
      } catch {}
    })();
  }, []);

  const columnsArr = [
    { label: "Merchant Name", key: "company_name" },
    { label: "Contact Person", key: "contact_person_name" },
    { label: "Email", key: "email" },
    { label: "Mobile Number", key: "mobile_number" },
    { label: "Landline", key: "landline" },
    { label: "Address", key: "address" },
    { label: "Status", key: "status" },
    { label: "Created At", key: "created_at" },
    { label: "Updated By", key: "updated_by" },
    { label: "Updated At", key: "updated_at" },
  ];

  const onViewItemPressed = (row) =>
    navigate("/merchants/addMerchant", {
      state: { merchant_id: row.merchant_id, mode: "edit" },
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
      primaryBtnText="Add Merchant"
      onPrimaryBtnPressed={() => navigate("/merchants/addMerchant")}
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
        {merchants.length > 0 ? (
          <CustomTable
            columns={columnsArr}
            data={merchants}
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

export default Merchants;
