import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import axios from "axios";

const DataTable = ({ arrayOfEmp, job_typeOnClick }) => {
  const [editRowId, setEditRowId] = React.useState(null);
  const [editedData, setEditedData] = React.useState({});
  const [openEditForm, setOpenEditForm] = React.useState(false);

  const handleEdit = (row) => {
    setEditRowId(row.id);
    setEditedData({ ...row });
    setOpenEditForm(true);
  };

  const handleCloseEditForm = () => {
    setEditRowId(null);
    setEditedData({});
    setOpenEditForm(false);
  };

  const handleSaveEdit = async () => {
    try {
      const { D_NAME, dob, nationality } = editedData;
      const response = await axios.post(
        "http://localhost:3001/film/update/director",
        {
          D_name: D_NAME,
          dob,
          nationality,
          old_D_name: editedData.D_NAME,
        }
      );

      if (response.status === 200) {
        console.log("Director updated successfully!");
        // Close the edit form and reset state
        handleCloseEditForm();
      }
    } catch (error) {
      console.error("Error updating director:", error);
      // You may want to handle error scenarios, e.g., show an error message
    }
  };

  const handleDelete = async (D_name) => {
    try {
      const response = await axios.delete(
        "http://localhost:3001/director/delete",
        {
          data: {
            D_name: D_name,
          },
        }
      );

      if (response.status === 200) {
        console.log("Director deleted successfully!");
      }
    } catch (error) {
      console.error("Error deleting director:", error);
    }
  };

  const directorColumns = [
    { field: "D_NAME", headerName: "Director Name", width: 300 },
    { field: "DOB", headerName: "Date of Birth", width: 500 },
    { field: "NATIONALITY", headerName: "Nationality", width: 500 },
    {
      field: "actions",
      headerName: "Actions",
      width: 150,
      renderCell: (params) => (
        <div>
          <IconButton onClick={() => handleEdit(params.row)}>
            <EditIcon />
          </IconButton>
          <IconButton onClick={() => handleDelete(params.row.D_NAME)}>
            <DeleteIcon />
          </IconButton>
        </div>
      ),
    },
  ];

  const directorRowsWithId = arrayOfEmp.map((row, index) => ({
    ...row,
    id: index + 1,
  }));

  return (
    job_typeOnClick === "Director" && (
      <div style={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={directorRowsWithId}
          columns={directorColumns}
          pageSize={5}
          checkboxSelection
        />
        <Dialog open={openEditForm} onClose={handleCloseEditForm}>
          <DialogTitle>Edit Director</DialogTitle>
          <DialogContent>
            <TextField
              label="Director Name"
              value={editedData.D_NAME || ""}
              onChange={(e) =>
                setEditedData({ ...editedData, D_NAME: e.target.value })
              }
            />
            <TextField
              label="Date of Birth"
              value={editedData.dob || ""}
              onChange={(e) =>
                setEditedData({ ...editedData, dob: e.target.value })
              }
            />
            <TextField
              label="Nationality"
              value={editedData.nationality || ""}
              onChange={(e) =>
                setEditedData({ ...editedData, nationality: e.target.value })
              }
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseEditForm}>Cancel</Button>
            <Button onClick={handleSaveEdit}>Save</Button>
          </DialogActions>
        </Dialog>
      </div>
    )
  );
};

export default DataTable;
