import { useEffect, useState } from "react";
import { Box, Grid, Typography } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import * as productService from "../../services/productService";
import * as orderService from "../../services/orderService";
import * as merchantService from "../../services/merchantService";
import ComponentWrapper from "../../components/ComponentWrapper";
import CustomTextInput from "../../components/CustomTextInput";
import CustomButton from "../../components/CustomButton";
import CustomDropdown from "../../components/CustomDropdown";
import CustomDatePicker from "../../components/CustomDatePicker";

const AddOrders = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { product_id, mode } = location.state || "";

  const [merchantList, setMerchantList] = useState([]);
  // input fields
  const [formData, setFormData] = useState({
    merchant_id: "",
    order_date: "",
    order_items: [],
  });

  const getMerchatLookup_ = async () => {
    try {
      const response = await merchantService.getMerchatLookup();
      if (response && response.data && response.data.data) {
        setMerchantList(response.data.data);
        console.log("asdasdsadsad", response.data.data);
      }
    } catch (error) {}
  };

  const [productList, setProductList] = useState([]);
  const getProductLookup_ = async () => {
    try {
      const response = await productService.getProductLookUp();
      if (response && response.status === 200 && response.data.data) {
        setProductList(response.data.data);
      }
    } catch (error) {}
  };

  const getProductDetails_ = async () => {
    try {
      const response = await productService.getProductDetails(product_id);
      if (response && response.status === 200 && response.data.data) {
        const productDetails = response.data.data;
        setFormData({
          name: productDetails.name,
          description: productDetails.description,
          manufacturer: productDetails.manufacturer,
          supplier_id: productDetails.supplier_id,
          code_name: productDetails.code_name,
        });
      }
    } catch (error) {}
  };

  useEffect(() => {
    getMerchatLookup_();
    getProductLookup_();
    if (mode && mode === "edit") {
      getProductDetails_();
    }
  }, []);

  const supplierList = [
    { data: "cc1c1097-5c48-48c7-ae7b-b5554f5f6008", label: "company" },
  ];

  const [errorData, setErrorData] = useState({
    name: false,
    description: false,
    manufacturer: false,
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const onError = (name, status) => {
    setErrorData({
      ...errorData,
      [name]: status,
    });
  };

  // on submit
  const onSubmitPressed = async () => {
    try {
      const response = await orderService.createOrder(formData);
      if (response && response.status === 200) {
        navigate(-1);
      }
    } catch (error) {}
  };

  const renderOrderItems = () => {
    const onAddOrderItemPressed = () => {
      setFormData((prev) => ({
        ...prev,
        order_items: [
          ...prev.order_items,
          {
            product_id: " ",
            quantity: "",
            selling_price: "",
            discount: "",
          },
        ],
      }));
    };

    const onOrderItemChanged = (index, name, value) => {
      const updatedOrderItems = [...formData.order_items];
      updatedOrderItems[index][name] = value;

      setFormData({
        ...formData,
        order_items: updatedOrderItems,
      });
    };

    const onDeleteItemPressed = (index) => {
      const updateArr = formData.order_items.filter((item, itemIndex) => {
        return itemIndex !== index;
      });

      setFormData({
        ...formData,
        order_items: updateArr,
      });
    };

    return (
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <Box sx={{ display: "flex", flexDirection: "row" }}>
          <Typography>{"Add Order Item"}</Typography>
          <CustomButton
            label={"add Item"}
            onClick={() => onAddOrderItemPressed()}
          />
        </Box>
        {formData.order_items.map((item, index) => {
          return (
            <Box sx={{ display: "flex", flexDirection: "row" }}>
              <CustomDropdown
                label="Product Name"
                name="product_id"
                onChange={(e) =>
                  onOrderItemChanged(index, e.target.name, e.target.value)
                }
                value={formData.product_id}
                options={productList}
              />
              <CustomTextInput
                label="quantity"
                name="quantity"
                value={formData.quantity}
                placeholder="Enter product quantity"
                onChange={(e) =>
                  onOrderItemChanged(index, e.target.name, e.target.value)
                }
              />
              <CustomTextInput
                label="selling_price"
                name="selling_price"
                value={formData.selling_price}
                placeholder="Enter product selling_price"
                onChange={(e) =>
                  onOrderItemChanged(index, e.target.name, e.target.value)
                }
              />
              <CustomTextInput
                label="discount"
                name="discount"
                value={formData.discount}
                placeholder="Enter product discount"
                onChange={(e) =>
                  onOrderItemChanged(index, e.target.name, e.target.value)
                }
              />

              <CustomButton
                label={"Remove Item"}
                onClick={() => onDeleteItemPressed(index)}
              />
            </Box>
          );
        })}
      </Box>
    );
  };

  return (
    <ComponentWrapper
      navigationHeaderTitle="Add New Order"
      onNavigationPressed={() => navigate(-1)}
    >
      <Box
        sx={{
          flex: 1,
          backgroundColor: "#fff",
          borderRadius: "16px",
          p: 4,
        }}
      >
        <Box>
          <CustomDropdown
            label="Merchant Name"
            name="merchant_id"
            value={formData.merchant_id}
            onChange={handleChange}
            options={merchantList}
          />
          <CustomDatePicker
            label="Order Date"
            name="order_date"
            value={formData.order_date}
            onChange={handleChange}
          />

          <Box>{renderOrderItems()}</Box>
        </Box>
        <CustomButton
          label={"Add Order"}
          onClick={onSubmitPressed}
          // disabled={Object.values(errorData).includes(true)}
        />
      </Box>
    </ComponentWrapper>
  );
};

export default AddOrders;
