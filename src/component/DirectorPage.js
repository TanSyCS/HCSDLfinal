import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import SearchBox from "./search";
import "./display.css";

const DirectorPage = ({ arrayOfEmp, job_typeOnClick }) => {
  const [searchKeyword, setSearchKeyword] = React.useState("");

  const handleSearch = (keyword) => {
    const searchString = keyword.toString().toLowerCase();
    setSearchKeyword(searchString);
  };

  const filteredDirectors = arrayOfEmp.filter((director) =>
    Object.values(director).some(
      (value) =>
        typeof value === "string" &&
        value.toLowerCase().includes(searchKeyword.toLowerCase())
    )
  );

  return (
    job_typeOnClick === "Director" && (
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
                <TableCell align="right">Name</TableCell>
                <TableCell align="right">Nationality</TableCell>
                <TableCell align="right">DOB</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredDirectors.map((director, index) => (
                <TableRow
                  key={index}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell>{job_typeOnClick}</TableCell>
                  <TableCell align="right">{director.D_NAME}</TableCell>
                  <TableCell align="right">{director.NATIONALITY}</TableCell>
                  <TableCell align="right">{director.DOB}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </>
    )
  );
};

export default DirectorPage;
