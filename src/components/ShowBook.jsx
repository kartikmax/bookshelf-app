import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  Typography,
  TextField,
  InputAdornment,
  Box,
  Container,
  Button,
  Link,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import QrScanner from "./QrScanner";

const ShowBook = () => {
  const [bookData, setBookData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedBook, setSelectedBook] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch bookFormData from localStorage
    const storedData = JSON.parse(localStorage.getItem("bookFormData")) || [];
    setBookData(storedData);
  }, []);

  const handleSearch = () => {
    // Find the book by book name or ISBN
    const foundBook = bookData.find(
      (row) =>
        row.bookName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        row.bookISBN.includes(searchTerm)
    );

    // Update selectedBook state
    setSelectedBook(foundBook);
  };

  const handleBookLinkClick = () => {
    // Navigate to the BookDetails component when the book link is clicked
    navigate(
      `/book/${selectedBook.bookName.replace(/\s/g, "")}/${
        selectedBook.bookISBN
      }`
    );
  };

  return (
    <Container maxWidth="md">
      <Box mt={5}>
        <Typography variant="h4" gutterBottom>
          Show Book
        </Typography>
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
        <Button variant="contained" onClick={handleSearch}>
          Search
        </Button>

        {selectedBook && (
          <Card>
            <CardContent>
              <Typography variant="h5" component="div" gutterBottom>
                {selectedBook.bookName}
              </Typography>
              <Typography
                variant="subtitle1"
                color="textSecondary"
                gutterBottom
              >
                ISBN: {selectedBook.bookISBN}
              </Typography>
              <Typography
                variant="subtitle1"
                color="textSecondary"
                gutterBottom
              >
                Category: {selectedBook.bookCategory}
              </Typography>
              <Typography
                variant="subtitle1"
                color="textSecondary"
                gutterBottom
              >
                Row Number: {selectedBook.rowNumber}
              </Typography>
              <Typography
                variant="subtitle1"
                color="textSecondary"
                gutterBottom
              >
                Cost: {selectedBook.cost}
              </Typography>
              <Typography
                variant="subtitle1"
                color="textSecondary"
                gutterBottom
              >
                Availability: {selectedBook.availability}
              </Typography>
              <Link href="#" onClick={handleBookLinkClick}>
                Go to Book Details
              </Link>
              link :{" "}
              {`/book/${selectedBook.bookName.replace(/\s/g, "")}/${
                selectedBook.bookISBN
              }`}
               <QrScanner url={`/book/${selectedBook.bookName.replace(/\s/g, "")}/${selectedBook.bookISBN}`} />
            </CardContent>
          </Card>
        )}
      </Box>
    </Container>
  );
};

export default ShowBook;
