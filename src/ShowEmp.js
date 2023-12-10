import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
// import Table from "@mui/material/Table";
// import TableBody from "@mui/material/TableBody";
// import TableCell from "@mui/material/TableCell";
// import TableContainer from "@mui/material/TableContainer";
// import TableHead from "@mui/material/TableHead";
// import TableRow from "@mui/material/TableRow";
//import Paper from "@mui/material/Paper";
import { Button } from "@mui/material";
import axios from "axios";
import FilmPage from "./component/FilmPage";
import DirectorPage2 from "./component/DirectorPage2";
import ActorPage2 from "./component/ActorPage2";
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
  const [job_typeOnClick, setJob_TypeOnClick] = React.useState("Film");
  const [arrayOfEmp, setArrayOfEmp] = React.useState([]);

  const handleSubmit = async () => {
    console.log(job_type);
    if (job_type === "Film") {
      axios
        .get("http://localhost:3001/film")
        .then((respone) => {
          setArrayOfEmp(respone.data);
          setJob_TypeOnClick(job_type);
        })
        .catch((error) => {
          console.log(error);
        });
    } else if (job_type === "Actor") {
      axios
        .get("http://localhost:3001/actor")
        .then((respone) => {
          setArrayOfEmp(respone.data);
          setJob_TypeOnClick(job_type);
        })
        .catch((error) => {
          console.log(error);
        });
    } else if (job_type === "Director") {
      axios
        .get("http://localhost:3001/director")
        .then((respone) => {
          setArrayOfEmp(respone.data);
          setJob_TypeOnClick(job_type);
        })
        .catch((error) => {
          console.log(error);
        });
    }
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

      <FilmPage arrayOfEmp={arrayOfEmp} job_typeOnClick={job_typeOnClick} />
      <ActorPage2 arrayOfEmp={arrayOfEmp} job_typeOnClick={job_typeOnClick} />
      <DirectorPage2
        arrayOfEmp={arrayOfEmp}
        job_typeOnClick={job_typeOnClick}
      />
    </div>
  );
}

export default ShowEmp;
