import * as React from "react";
// import Box from "@mui/material/Box";
//import TextField from "@mui/material/TextField";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
// import { Button } from "@mui/material";
import SearchBox from "./search";
import "./display.css";
const ActorPage = ({ arrayOfEmp, job_typeOnClick }) => {
  const [searchKeyword, setSearchKeyword] = React.useState("");

  const handleSearch = (keyword) => {
    const searchString = keyword.toString().toLowerCase();
    setSearchKeyword(searchString);
  };

  const filteredBooks = arrayOfEmp.filter((book) =>
    Object.values(book).some(
      (value) =>
        typeof value === "string" &&
        value.toLowerCase().includes(searchKeyword.toLowerCase())
    )
  );
  if (job_typeOnClick === "Actor") {
    return (
      <>
        <div
          style={{ width: "300px", marginLeft: "1000px", marginBottom: "20px" }}
        >
          <SearchBox onSearch={handleSearch} />
        </div>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
            <TableHead>
              <TableRow>
                <TableCell>Thông tin tìm kiếm</TableCell>
                <TableCell align="right">ID</TableCell>
                <TableCell align="right">Name</TableCell>
                <TableCell align="right">Nationality</TableCell>
                <TableCell align="right">DOB</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredBooks.map((row, index) => (
                <TableRow
                  key={index}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell>{job_typeOnClick}</TableCell>
                  <TableCell align="right">{row.CUSTOMID}</TableCell>
                  <TableCell align="right">{row.NAME}</TableCell>
                  <TableCell align="right">{row.NATIONALITY}</TableCell>
                  <TableCell align="right">{row.DOB}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </>
    );
  } else return <h1 className="Sy">Sy</h1>;
};
export default ActorPage;
