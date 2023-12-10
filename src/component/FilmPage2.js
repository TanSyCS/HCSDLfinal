import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import axios from "axios";

export default function CollapsibleTable({ arrayOfEmp, job_typeOnClick }) {
  const [open, setOpen] = useState(false);
  const [actors, setActors] = useState([]);
  const [directors, setDirectors] = useState([]);

  const Row = (props) => {
    const { row } = props;

    useEffect(() => {
      axios
        .post("http://localhost:3001/actor-director", {
          movie_ID: row.movie_ID,
        })
        .then((response) => {
          setActors(response.data.actors);
          setDirectors(response.data.directors);
        })
        .catch((error) => {
          console.log(error);
        });
    }, [row.movie_ID]);

    return (
      <React.Fragment>
        <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
          <TableCell>
            <IconButton
              aria-label="expand row"
              size="small"
              onClick={() => setOpen(!open)}
            >
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          </TableCell>
          <TableCell component="th" scope="row">
            {row.movie_name}
          </TableCell>
          <TableCell align="right">{row.genre}</TableCell>
          <TableCell align="right">{row.release_day}</TableCell>
          <TableCell align="right">{row.duration}</TableCell>
          <TableCell align="right">{row.restriction}</TableCell>
          <TableCell align="right">{row.Company_name}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={7}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Box sx={{ margin: 1 }}>
                <Typography variant="h6" gutterBottom component="div">
                  Movie Details
                </Typography>
                <Table size="small" aria-label="movie-details">
                  <TableHead>
                    <TableRow>
                      <TableCell>Movie ID</TableCell>
                      <TableCell>Duration</TableCell>
                      <TableCell>Restriction</TableCell>
                      <TableCell>Actors</TableCell>
                      <TableCell>Directors</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      <TableCell>{row.movie_ID}</TableCell>
                      <TableCell>{row.duration}</TableCell>
                      <TableCell>{row.restriction}</TableCell>
                      <TableCell>
                        {actors.map((actor) => (
                          <div key={actor.ACTOR_ID}>{actor.name}</div>
                        ))}
                      </TableCell>
                      <TableCell>
                        {directors.map((director) => (
                          <div key={director.D_NAME}>{director.name}</div>
                        ))}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
      </React.Fragment>
    );
  };

  return (
    job_typeOnClick === "Film" && (
      <TableContainer component={Paper}>
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell>Movie Name</TableCell>
              <TableCell align="right">Genre</TableCell>
              <TableCell align="right">Release Day</TableCell>
              <TableCell align="right">Duration</TableCell>
              <TableCell align="right">Restriction</TableCell>
              <TableCell align="right">Company Name</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {arrayOfEmp.map((row) => (
              <Row key={row.movie_ID} row={row} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    )
  );
}
