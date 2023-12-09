import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button } from "@mui/material";
import axios from "axios";

const currencies = [
  {
    value: "Film",
    label: "Film",
  },
  {
    value: "Director",
    label: "Director",
  },
  {
    value: "Actor",
    label: "Actor",
  },
];
function ShowEmp() {
  const [job_type, setJobType] = React.useState("Film");
  const [isDirector, setDirector] = React.useState(false);
  const [job_typeOnClick, setJob_TypeOnClick] = React.useState("Film");
  const [arrayOfEmp, setArrayOfEmp] = React.useState([]);
  const handleSubmit = () => {
    axios
      .get("http://localhost:3001/admin/film")
      .then((respone) => {
        setArrayOfEmp(respone.data);
        setJob_TypeOnClick(job_type);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div className="wrapper m-7">
      <h3>Chọn thông tin</h3>
      <Box
        className="m-8"
        component="form"
        sx={{
          "& .MuiTextField-root": { m: 1, width: "25ch" },
        }}
        noValidate
        autoComplete="off"
        encType="multipart/form-data"
      >
        <div>
          <TextField
            id="standard-select-currency-native"
            select
            onChange={(e) => setJobType(e.target.value)}
            label="Thông tin tìm kiếm"
            defaultValue="EUR"
            SelectProps={{
              native: true,
            }}
            helperText="Please select information"
            variant="standard"
            size="large"
          >
            {currencies.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </TextField>
        </div>
        <Button color="primary" variant="outlined" onClick={handleSubmit}>
          Tìm kiếm
        </Button>
      </Box>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell>Thông tin tìm kiếm</TableCell>
              <TableCell align="right">movie_ID</TableCell>
              <TableCell align="right">movie_name</TableCell>
              <TableCell align="right">genre</TableCell>
              <TableCell align="right">release_day</TableCell>
              <TableCell align="right">restriction</TableCell>
              <TableCell align="right">duration</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {arrayOfEmp.map((row, index) => (
              <TableRow
                key={index}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell>{job_typeOnClick}</TableCell>
                <TableCell align="right">{row.movie_ID}</TableCell>
                <TableCell align="right">{row.movie_name}</TableCell>
                <TableCell align="right">{row.genre}</TableCell>
                <TableCell align="right">{row.release_day}</TableCell>
                <TableCell align="right">{row.restriction}</TableCell>
                <TableCell align="right">{row.duration}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default ShowEmp;
