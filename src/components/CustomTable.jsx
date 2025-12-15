import {
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from "@mui/material";
import { useState } from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteIcon from "@mui/icons-material/Delete";
import { ArrowBackRounded, ArrowForwardRounded } from "@mui/icons-material";

const CustomTable = ({
  columns = [],
  data = [],
  onViewItemPressed = () => {},
  onDeleteItemPressed = () => {},
}) => {
  // pagination
  const [page, setPageOnChange] = useState(1);
  const handleChangePage = (e, value) => {
    setPageOnChange(value);
  };

  return (
    <>
      <TableContainer
        sx={{
          flex: 1,
          borderTopLeftRadius: "16px",
          borderTopRightRadius: "16px",
        }}
      >
        <Table>
          <TableHead>
            <TableRow sx={{ height: 48 }}>
              <TableCell>#</TableCell>
              {columns.map((column) => (
                <TableCell key={column.key} sx={{ width: "auto" }}>
                  {column.label}
                </TableCell>
              ))}
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {data.map((row, index) => (
              <TableRow key={row.id || index}>
                <TableCell>{index + 1}</TableCell>
                {columns.map((col) => (
                  <TableCell key={col.key}>{row[col.key]}</TableCell>
                ))}
                <TableCell>
                  <IconButton onClick={() => onViewItemPressed(row)}>
                    <VisibilityIcon sx={{ fontSize: 16 }} />
                  </IconButton>
                  <IconButton
                    color="error"
                    onClick={() => onDeleteItemPressed(row)}
                  >
                    <DeleteIcon sx={{ fontSize: 16 }} />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        component="div"
        count={100} // ideally pass total count from props
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={10}
        labelRowsPerPage={false}
        rowsPerPageOptions={[]}
        backIconButtonProps={{
          children: <ArrowBackRounded />,
        }}
        nextIconButtonProps={{
          children: <ArrowForwardRounded />,
        }}
      />
    </>
  );
};

export default CustomTable;
