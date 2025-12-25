import { Box, Container, Typography } from "@mui/material";
import Header from "./Header";
import CustomButton from "./CustomButton";

const ComponentWrapper = ({
  navigationHeaderTitle,
  onNavigationPressed = () => {},
  content,
  primaryBtnText,
  primaryBtnIcon,
  onPrimaryBtnPressed = () => {},
  children,
  //footer
  footer = false,
  footerLabel = "",
  customFooterStyles = {},
  footerBtnLabel = "",
  onFooterBtnPressed = () => {},
  footerBtnIcon = "",
}) => (
  <Container
    sx={{ display: "flex", flexDirection: "column", flex: 1 }}
    maxWidth={false}
    disableGutters
  >
    <Header
      navigationHeaderTitle={navigationHeaderTitle}
      onNavigationPressed={onNavigationPressed}
    />
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        flex: 1,
        borderRadius: "16px",
      }}
      maxWidth={false}
      disableGutters
    >
      <Box sx={{ display: "flex", flexDirection: "row" }}>
        <Box sx={{ display: "flex", flex: 1 }}>{content && content()}</Box>
        {primaryBtnText && (
          <Box sx={{ display: "flex", justifyContent: "flex-end" }} mb={4}>
            <CustomButton
              label={primaryBtnText}
              onClick={onPrimaryBtnPressed}
              primaryBtnIcon={primaryBtnIcon}
            />
          </Box>
        )}
      </Box>
      <Box
        sx={{
          display: "flex",
          flex: 1,
          overflowY: "auto",
          flexDirection: "column",
        }}
      >
        {children}
      </Box>
      {footer && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            backgroundColor: "#fff",
            borderRadius: 2,
          }}
          p={2}
        >
          <Box sx={{ display: "flex", flex: 1 }}>
            {footerLabel && (
              <Typography variant="subtitle1" sx={{ ...customFooterStyles }}>
                {footerLabel}
              </Typography>
            )}
          </Box>
          {footerBtnLabel && (
            <CustomButton
              label={footerBtnLabel}
              onClick={onFooterBtnPressed}
              primaryBtnIcon={footerBtnIcon}
            />
          )}
        </Box>
      )}
    </Container>
  </Container>
);

export default ComponentWrapper;
