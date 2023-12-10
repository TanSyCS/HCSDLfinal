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
      const { name, dob, nationality } = editedData;
      const response = await axios.post(
        "http://localhost:3001/film/update/actor",
        {
          Actor_ID: editRowId,
          name,
          dob,
          nationality,
        }
      );

      if (response.status === 200) {
        console.log("Actor updated successfully!");
        // Close the edit form and reset state
        handleCloseEditForm();
      }
    } catch (error) {
      console.error("Error updating actor:", error);
      // You may want to handle error scenarios, e.g., show an error message
    }
  };

  const handleDelete = async (id, movieId) => {
    try {
      const response = await axios.delete(
        "http://localhost:3001/actor/delete",
        {
          data: {
            ACTOR_ID: id,
            movie_ID: movieId, // Assuming you have access to movie_ID
          },
        }
      );

      if (response.status === 200) {
        console.log("Actor deleted successfully!");
        // You may want to handle state updates or UI changes after a successful delete
      }
    } catch (error) {
      console.error("Error deleting actor:", error);
      // You may want to handle error scenarios, e.g., show an error message
    }
  };

  const columns = [
    { field: "ACTOR_ID", headerName: "Actor ID", width: 150 },
    { field: "NATIONALITY", headerName: "Nationality", width: 300 },
    { field: "DOB", headerName: "Date of Birth", width: 300 },
    { field: "NAME", headerName: "Name", width: 300 },
    { field: "CUSTOMID", headerName: "Custom ID", width: 300 },
    {
      field: "actions",
      headerName: "Actions",
      width: 150,
      renderCell: (params) => (
        <div>
          <IconButton onClick={() => handleEdit(params.row)}>
            <EditIcon />
          </IconButton>
          <IconButton
            onClick={() =>
              handleDelete(params.row.ACTOR_ID, params.row.movie_ID)
            }
          >
            <DeleteIcon />
          </IconButton>
        </div>
      ),
    },
  ];

  // Add a unique identifier to each row
  const rowsWithId = arrayOfEmp.map((row, index) => ({
    ...row,
    id: index + 1,
  }));

  return (
    <>
      {job_typeOnClick === "Actor" && (
        <div style={{ height: 400, width: "100%" }}>
          <DataGrid
            rows={rowsWithId}
            columns={columns}
            pageSizeOptions={[5, 10]}
            checkboxSelection
          />
        </div>
      )}

      <Dialog open={openEditForm} onClose={handleCloseEditForm}>
        <DialogTitle>Edit Actor</DialogTitle>
        <DialogContent>
          <TextField
            label="Name"
            value={editedData.name || ""}
            onChange={(e) =>
              setEditedData({ ...editedData, name: e.target.value })
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
    </>
  );
};

export default DataTable;
