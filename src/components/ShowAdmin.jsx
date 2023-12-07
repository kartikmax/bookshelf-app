import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  TextField,
  InputAdornment,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";

const ShowAdmin = () => {
  const [bookData, setBookData] = useState([
    {
      bookName: "The Great Gatsby",
      bookISBN: "9780142437834",
      bookCategory: "Fiction",
      rowNumber: 101,
      cost: 20.99,
      availability: "In Stock",
    },
    {
      bookName: "To Kill a Mockingbird",
      bookISBN: "9780061120084",
      bookCategory: "Classics",
      rowNumber: 102,
      cost: 15.99,
      availability: "Out of Stock",
    },
    {
      bookName: "1984",
      bookISBN: "9780451524935",
      bookCategory: "Science Fiction",
      rowNumber: 103,
      cost: 18.99,
      availability: "In Stock",
    },
    {
      bookName: "The Catcher in the Rye",
      bookISBN: "9780241950425",
      bookCategory: "Classics",
      rowNumber: 104,
      cost: 22.99,
      availability: "In Stock",
    },
    {
      bookName: "Pride and Prejudice",
      bookISBN: "9780141439518",
      bookCategory: "Classics",
      rowNumber: 105,
      cost: 19.99,
      availability: "In Stock",
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [editIndex, setEditIndex] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    // Retrieve bookFormData from localStorage
    const storedData = JSON.parse(localStorage.getItem("bookFormData")) || [];
    setBookData(storedData);
  }, []);
  

  const handleEdit = (index) => {
    setEditIndex(index);
    setOpenDialog(true);
  };

  const handleSave = () => {
    const updatedData = [...bookData];
    localStorage.setItem("bookFormData", JSON.stringify(updatedData));
    setOpenDialog(false);
  };
  
  const handleDelete = (index) => {
    const updatedData = [...bookData];
    updatedData.splice(index, 1);
    setBookData(updatedData);
    localStorage.setItem("bookFormData", JSON.stringify(updatedData));
  };
  

  const handleCancel = () => {
    // Reset editIndex and close the dialog
    setEditIndex(null);
    setOpenDialog(false);
  };

  const filteredData = bookData.filter(
    (row) =>
      row.bookName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      row.bookISBN.includes(searchTerm)
  );

  return (
    <div>
      <TextField
        fullWidth
        label="Search by Book Name or ISBN"
        variant="outlined"
        margin="normal"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <i className="material-icons">search</i>
            </InputAdornment>
          ),
        }}
      />
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Book Name</TableCell>
              <TableCell>Book ISBN</TableCell>
              <TableCell>Book Category</TableCell>
              <TableCell>Row Number</TableCell>
              <TableCell>Cost</TableCell>
              <TableCell>Availability</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredData.map((row, index) => (
              <TableRow key={index}>
                <TableCell>{row.bookName}</TableCell>
                <TableCell>{row.bookISBN}</TableCell>
                <TableCell>{row.bookCategory}</TableCell>
                <TableCell>{row.rowNumber}</TableCell>
                <TableCell>{row.cost}</TableCell>
                <TableCell>{row.availability}</TableCell>
                <TableCell>
                  <Button color="primary" onClick={() => handleEdit(index)}>
                    Edit
                  </Button>
                  <Button color="error" onClick={() => handleDelete(index)}>
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Edit Dialog */}
      <Dialog open={openDialog} onClose={handleCancel}>
        <DialogTitle>Edit Book</DialogTitle>
        <DialogContent>
          {/* Display read-only fields */}
          <TextField
            label="Book Name"
            variant="outlined"
            margin="normal"
            fullWidth
            value={bookData[editIndex]?.bookName || ""}
            InputProps={{ readOnly: true }}
          />
          <TextField
            label="Book ISBN"
            variant="outlined"
            margin="normal"
            fullWidth
            value={bookData[editIndex]?.bookISBN || ""}
            InputProps={{ readOnly: true }}
          />
          <TextField
            label="Book Category"
            variant="outlined"
            margin="normal"
            fullWidth
            value={bookData[editIndex]?.bookCategory || ""}
            InputProps={{ readOnly: true }}
          />
          {/* Add other read-only fields as needed */}

          {/* Editable fields */}
          <TextField
            label="Row Number"
            variant="outlined"
            margin="normal"
            fullWidth
            value={bookData[editIndex]?.rowNumber || ""}
            onChange={(e) => {
              // Handle changes to the editable field
              // You may want to update the local state or form data
              const updatedData = [...bookData];
              updatedData[editIndex].rowNumber = e.target.value;
              setBookData(updatedData);
            }}
          />
          <TextField
            label="Cost"
            variant="outlined"
            margin="normal"
            fullWidth
            value={bookData[editIndex]?.cost || ""}
            onChange={(e) => {
              // Handle changes to the editable field
              // You may want to update the local state or form data
              const updatedData = [...bookData];
              updatedData[editIndex].cost = e.target.value;
              setBookData(updatedData);
            }}
          />
          {/* Add other editable fields as needed */}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancel}>Cancel</Button>
          <Button onClick={handleSave}>Save</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ShowAdmin;
