import { useEffect, useState } from "react";
import { Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import nodatafound from "../../assets/images/utils/nodatafound.png";
import * as userManagementService from "../../services/userManagementService";
import ComponentWrapper from "../../components/ComponentWrapper";
import CustomSearchbar from "../../components/CustomSearchbar";
import CustomTable from "../../components/CustomTable";
import { Add, FilterAlt } from "@mui/icons-material";
import * as COLORS from "../../assets/colors";

const Users = () => {
  const navigate = useNavigate();

  //fetch data
  const [userList, setUserList] = useState([]);
  const [searchValue, setSearchValue] = useState("");

  const getUserList = async () => {
    try {
      const response = await userManagementService.getUserList();
      if (response && response.status === 200 && response.data.data) {
        setUserList(response.data.data);
      }
    } catch (error) {}
  };

  useEffect(() => {
    getUserList();
  }, []);

  // add item
  const addUser = () => {
    navigate("users/addUser");
  };

  //table

  const columnsArr = [
    { label: "Mobile number", key: "mobile_number" },
    { label: "Role", key: "role" },
    { label: "Firstname", key: "first_name" },
    { label: "Lastname", key: "last_name" },
    { label: "Email", key: "email" },
    { label: "Landline", key: "landline" },
    { label: "Gender", key: "gender" },
    { label: "Designation", key: "designation" },
  ];
  const onViewUserDetailsPressed = (user_id) => {
    navigate("/users/addUsers", {
      state: {
        user_id,
        mode: "edit",
      },
    });
  };
  const handleDelete = async () => {};

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
      primaryBtnText={"Add User"}
      onPrimaryBtnPressed={() => navigate("/users/addUsers")}
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
        {userList && userList.length > 0 ? (
          <CustomTable
            columns={columnsArr}
            data={userList}
            onViewItemPressed={(row) => onViewUserDetailsPressed(row)}
            onDeleteItemPressed={(row) => handleDelete(row)}
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

export default Users;
