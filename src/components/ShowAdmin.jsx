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
} from "@mui/material";

const ShowAdmin = () => {
  const [bookData, setBookData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    // Fetch bookFormData from localStorage
    const storedData = JSON.parse(localStorage.getItem("bookFormData")) || [];
    setBookData(storedData);
  }, []);

  const handleEdit = (index) => {
    // Handle edit logic based on your requirements
    console.log("Edit button clicked for index:", index);
  };

  const handleDelete = (index) => {
    // Handle delete logic based on your requirements
    const updatedData = [...bookData];
    updatedData.splice(index, 1);
    setBookData(updatedData);
    localStorage.setItem("bookFormData", JSON.stringify(updatedData));
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
    </div>
  );
};

export default ShowAdmin;
