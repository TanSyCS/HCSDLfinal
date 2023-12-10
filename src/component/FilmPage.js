import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import "./display.css";
import "tippy.js/dist/tippy.css";
import { useState } from "react";
import axios from "axios";
import SearchBox from "./search";

const FilmPage = ({ arrayOfEmp, job_typeOnClick }) => {
  const [arrayOfActor, setArrayOfActor] = useState([]);
  const [arrayOfDirector, setArrayOfDirector] = useState([]);
  const [selectedMovieId, setSelectedMovieId] = useState(null);
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

  const handleButtonClick = (movie_ID) => {
    setSelectedMovieId(movie_ID);
    console.log(selectedMovieId);
    axios
      .post("http://localhost:3001/actor", { movie_ID: movie_ID })
      .then((response) => {
        setArrayOfActor(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
    axios
      .post("http://localhost:3001/director", { movie_ID: movie_ID })
      .then((response) => {
        setArrayOfDirector(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    job_typeOnClick === "Film" && (
      <>
        <div
          style={{ width: "300px", marginLeft: "1000px", marginBottom: "20px" }}
        >
          <SearchBox onSearch={handleSearch} />
        </div>

        <TableContainer className="table" component={Paper}>
          <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
            <TableHead>
              <TableRow>
                <TableCell>Thông tin tìm kiếm</TableCell>
                <TableCell align="right">ID</TableCell>
                <TableCell align="right">Name</TableCell>
                <TableCell align="right">Genre</TableCell>
                <TableCell align="right">Release</TableCell>
                <TableCell align="right">Restriction</TableCell>
                <TableCell align="right">Duration</TableCell>
                <TableCell align="right">Company</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredBooks.map((row, index) => (
                <TableRow
                  key={index}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell>{job_typeOnClick}</TableCell>
                  <TableCell align="right">
                    <Button
                      variant="outlined"
                      color="primary"
                      onClick={() => handleButtonClick(row.movie_ID)}
                    >
                      {row.movie_ID}
                    </Button>
                  </TableCell>
                  <TableCell align="right">{row.movie_name}</TableCell>
                  <TableCell align="right">{row.genre}</TableCell>
                  <TableCell align="right">{row.release_day}</TableCell>
                  <TableCell align="right">{row.restriction}</TableCell>
                  <TableCell align="right">{row.duration}</TableCell>
                  <TableCell align="right">{row.Company_name}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        {selectedMovieId && (
          <div className="Tansy">
            <div>
              <h3>{`Thông tin actor về của movie ${selectedMovieId}`}</h3>
              {arrayOfActor.map((actor, actorIndex) => (
                <TableRow key={`actor-${actorIndex}`}>
                  <TableCell align="right">{actor.name}</TableCell>
                </TableRow>
              ))}
            </div>
            <div>
              <h3>{`Thông tin director về của movie ${selectedMovieId}`}</h3>
              {arrayOfDirector.map((director, directorIndex) => (
                <TableRow key={`director-${directorIndex}`}>
                  <TableCell align="right">{director.D_Name}</TableCell>
                </TableRow>
              ))}
            </div>
          </div>
        )}
      </>
    )
  );
};

export default FilmPage;
