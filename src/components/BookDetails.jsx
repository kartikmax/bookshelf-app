import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const BookDetails = () => {
  const { nameofbook, isbnnoofbook } = useParams();
  const [bookDetails, setBookDetails] = useState(null);

  useEffect(() => {
    // Fetch additional details from localStorage based on nameofbook
    const storedData = JSON.parse(localStorage.getItem("bookFormData")) || [];
    
    // Remove spaces from the book name for the route
    const formattedBookName = nameofbook.replace(/\s/g, "");
  
    const foundBook = storedData.find(
      (book) => book.bookName.replace(/\s/g, "") === formattedBookName && book.bookISBN === isbnnoofbook
    );
  
    setBookDetails(foundBook);
  }, [nameofbook, isbnnoofbook]);

  return (
    <div>
      <h1>Book Details</h1>
      {bookDetails ? (
        <>
          <p>Name of Book: {bookDetails.bookName}</p>
          <p>ISBN No of Book: {bookDetails.bookISBN}</p>
          <p>Category: {bookDetails.bookCategory}</p>
          <p>Row Number: {bookDetails.rowNumber}</p>
          <p>Cost: {bookDetails.cost}</p>
          <p>Availability: {bookDetails.availability}</p>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default BookDetails;
