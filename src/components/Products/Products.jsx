import { useState, useEffect } from 'react';
import fetchReadingList from '../../api/BooksFetch';

const ProductsComponent = () => {
  const [books, setBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedBook, setSelectedBook] = useState(null);
  const [bookDetails, setBookDetails] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [loadingDetails, setLoadingDetails] = useState(false);
  const booksPerPage = 15;

  useEffect(() => {
    setIsLoading(true);
    fetchReadingList()
      .then((data) => {
        const bookEntries = data.reading_log_entries || [];
        const formattedBooks = bookEntries.map(entry => {
          const work = entry.work || {};
          return {
            id: work.key || entry.work_key || Math.random().toString(),
            title: work.title || 'Unknown title',
            author: work.author_names ? work.author_names.join(', ') : 'Unknown author',
            workKey: work.key || entry.work_key 
          };
        });
        setBooks(formattedBooks);
        setIsLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setIsLoading(false);
      });
  }, []);
   
  // fetch for book details 
  const fetchBookDetails = async (workKey) => {
    try {
      setLoadingDetails(true);
      const response = await fetch(`https://openlibrary.org${workKey}.json`);
      if (!response.ok) {
        throw new Error('Failed to fetch book details');
      }
      const data = await response.json();
      setBookDetails(data);
      setLoadingDetails(false);
    } catch (error) {
      console.error('Error fetching book details:', error);
      setBookDetails({ error: 'Failed to load book details' });
      setLoadingDetails(false);
    }
  };

  const openBookDetails = async (book) => {
    setSelectedBook(book);
    setShowModal(true);
    setBookDetails(null);
    
    if (book.workKey) {
      await fetchBookDetails(book.workKey);
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedBook(null);
    setBookDetails(null);
  };

  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = books.slice(indexOfFirstBook, indexOfLastBook);

  const totalPages = Math.ceil(books.length / booksPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }
  // for description
  const formatDescription = (description) => {
    if (typeof description === 'string') {
      return description;
    } else if (description && description.value) {
      return description.value;
    }
    return 'No description available';
  };

  if (isLoading) return (
    <div className="d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
      <div className="spinner-border text-primary" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
  if (error) return <div className="alert alert-danger">Error: {error}</div>;

  return (
    <div className="container mt-4">
      {books.length === 0 ? (
        <div className="alert alert-info">No books found</div>
      ) : (
        <>
          <div className="row row-cols-1 row-cols-md-3 g-4" style={{ paddingTop: 100 }}>
            {currentBooks.map((book) => (
              <div key={book.id} className="col">
                <div className="card h-100 shadow-sm">
                  <div className="card-body d-flex flex-column">
                    <h5 className="card-title text-truncate">{book.title}</h5>
                    <p className="card-text text-muted">{book.author}</p>
                    <div className="mt-auto">
                      <button 
                        className="btn btn-outline-primary btn-sm"
                        onClick={() => openBookDetails(book)}
                      >
                        📖 Description

                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <nav className="mt-4">
            <ul className="pagination justify-content-center">
              <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                <button
                  className="page-link"
                  onClick={() => paginate(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  Previous
                </button>
              </li>

              {pageNumbers.map(number => (
                <li key={number} className={`page-item ${currentPage === number ? 'active' : ''}`}>
                  <button
                    className="page-link"
                    onClick={() => paginate(number)}
                  >
                    {number}
                  </button>
                </li>
              ))}

              <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                <button
                  className="page-link"
                  onClick={() => paginate(currentPage + 1)}
                  disabled={currentPage === totalPages}
                >
                  Next
                </button>
              </li>
            </ul>
          </nav>
        </>
      )}

      {/* Modal for Book Details */}
      {showModal && selectedBook && (
        <div className="modal fade show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title"> {selectedBook.title}</h5>
                <button 
                  type="button" 
                  className="btn-close" 
                  onClick={closeModal}
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                {loadingDetails ? (
                  <div className="text-center py-4">
                    <div className="spinner-border text-primary" role="status">
                      <span className="visually-hidden">Loading book details...</span>
                    </div>
                    <p className="mt-2">Loading book summary...</p>
                  </div>
                ) : bookDetails ? (
                  <div>
                    <div className="row">
                      <div className="col-md-12">
                        <h6 className="text-primary">📖 Book Information</h6>
                        <div className="card bg-light mb-3">
                          <div className="card-body">
                            <p><strong>Title:</strong> {selectedBook.title}</p>
                            <p><strong>Author:</strong> {selectedBook.author}</p>
                            {bookDetails.first_publish_date && (
                              <p><strong>First Published:</strong> {bookDetails.first_publish_date}</p>
                            )}
                            {bookDetails.subjects && bookDetails.subjects.length > 0 && (
                              <div>
                                <p><strong>Subjects:</strong></p>
                                <div className="d-flex flex-wrap gap-1">
                                  {bookDetails.subjects.slice(0, 8).map((subject, index) => (
                                    <span key={index} className="badge bg-secondary text-white">
                                      {subject}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="mt-3">
                      <h6 className="text-primary">📄 Book Summary</h6>
                      <div className="card">
                        <div className="card-body">
                          {bookDetails.description ? (
                            <p className="text-justify">
                              {formatDescription(bookDetails.description)}
                            </p>
                          ) : (
                            <div className="text-muted text-center py-3">
                              <p>📭 No summary available for this book.</p>
                              <small>Some books may not have detailed descriptions in the Open Library database.</small>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    {bookDetails.excerpts && bookDetails.excerpts.length > 0 && (
                      <div className="mt-3">
                        <h6 className="text-primary">✨ Excerpts</h6>
                        <div className="card">
                          <div className="card-body">
                            {bookDetails.excerpts.slice(0, 2).map((excerpt, index) => (
                              <blockquote key={index} className="blockquote">
                                <p className="mb-0">{excerpt.excerpt}</p>
                                {excerpt.comment && (
                                  <footer className="blockquote-footer">{excerpt.comment}</footer>
                                )}
                              </blockquote>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="alert alert-warning">
                    Unable to load book details. Please try again later.
                  </div>
                )}
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={closeModal}>
                  Close
                </button>
                {bookDetails && bookDetails.key && (
                  <a 
                    href={`https://openlibrary.org${bookDetails.key}`} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="btn btn-primary"
                  >
                    View on Open Library
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductsComponent;