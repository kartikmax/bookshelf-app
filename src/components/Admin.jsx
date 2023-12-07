import React, { useState } from "react";
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";

const Admin = () => {
  const [formData, setFormData] = useState({
    bookName: "",
    bookISBN: "",
    bookCategory: "",
    rowNumber: "",
    cost: "",
    availability: "",
  });

  const [formErrors, setFormErrors] = useState({
    bookName: "",
    rowNumber: "",
    cost: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Basic validation
    if (name === "rowNumber" && !Number.isNaN(Number(value))) {
      setFormErrors((prevErrors) => ({
        ...prevErrors,
        rowNumber: "",
      }));
    } else if (name === "cost" && !Number.isNaN(Number(value))) {
      setFormErrors((prevErrors) => ({
        ...prevErrors,
        cost: "",
      }));
    } else if (name === "bookName") {
      setFormErrors((prevErrors) => ({
        ...prevErrors,
        bookName: typeof value === "string" ? "" : "Must be a string",
      }));
    }

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Additional validation
    let isValid = true;
    const newErrors = {};

    if (!formData.bookName || typeof formData.bookName !== "string") {
      newErrors.bookName = "Please enter a valid book name";
      isValid = false;
    }

    if (!formData.rowNumber || isNaN(Number(formData.rowNumber))) {
      newErrors.rowNumber = "Please enter a valid row number";
      isValid = false;
    }

    if (!formData.cost || isNaN(Number(formData.cost))) {
      newErrors.cost = "Please enter a valid cost";
      isValid = false;
    }

    if (!isValid) {
      setFormErrors(newErrors);
      return;
    }

    const storedData = JSON.parse(localStorage.getItem("bookFormData")) || [];
    storedData.push(formData);
    localStorage.setItem("bookFormData", JSON.stringify(storedData));

    console.log("Form submitted:", formData, storedData);
  };

  return (
    <Container maxWidth="sm">
      <Box mt={5}>
        <Typography variant="h4" gutterBottom>
          Add Book
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Book Name"
            variant="outlined"
            margin="normal"
            name="bookName"
            value={formData.bookName}
            onChange={handleChange}
            error={!!formErrors.bookName}
            helperText={formErrors.bookName}
            required
          />
          <TextField
            fullWidth
            label="Book ISBN"
            variant="outlined"
            margin="normal"
            name="bookISBN"
            value={formData.bookISBN}
            onChange={handleChange}
            required
          />
          <TextField
            fullWidth
            label="Book Category"
            variant="outlined"
            margin="normal"
            name="bookCategory"
            value={formData.bookCategory}
            onChange={handleChange}
            required
          />
          <TextField
            fullWidth
            label="Row Number"
            variant="outlined"
            margin="normal"
            name="rowNumber"
            value={formData.rowNumber}
            onChange={handleChange}
            error={!!formErrors.rowNumber}
            helperText={formErrors.rowNumber}
            required
          />
          <TextField
            fullWidth
            label="Cost"
            variant="outlined"
            margin="normal"
            name="cost"
            value={formData.cost}
            onChange={handleChange}
            error={!!formErrors.cost}
            helperText={formErrors.cost}
            required
          />
          <FormControl fullWidth variant="outlined" margin="normal">
            <InputLabel id="availability-label">Availability</InputLabel>
            <Select
              labelId="availability-label"
              label="Availability"
              name="availability"
              value={formData.availability}
              onChange={handleChange}
              required
            >
              <MenuItem value="In Stock">Available</MenuItem>
              <MenuItem value="Out of Stock">Unavailable</MenuItem>
            </Select>
          </FormControl>
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Add Book
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default Admin;
