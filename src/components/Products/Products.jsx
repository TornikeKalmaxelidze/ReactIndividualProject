import { useState, useEffect } from 'react';
import fetchReadingList from '../../api/BooksFetch';

const ProductsComponent = () => {
  const [books, setBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
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
            author: work.author_names ? work.author_names.join(', ') : 'Unknown author'
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

  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = books.slice(indexOfFirstBook, indexOfLastBook);

  const totalPages = Math.ceil(books.length / booksPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  if (isLoading) return (
    <div className="d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
      <div className="spinner-border text-primary" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
  if (error) return <div className="alert alert-danger">Error: {error}</div>;

  return (
    <div className="container mt-4" >
      {books.length === 0 ? (
        <div className="alert alert-info">No books found</div>
      ) : (
        <>
          <div className="row row-cols-1 row-cols-md-3 g-4" style={{paddingTop: 100}}>
            {currentBooks.map((book) => (
              <div key={book.id} className="col">
                <div className="card h-100 shadow-sm">
                  <div className="card-body">
                    <h5 className="card-title text-truncate">{book.title}</h5>
                    <p className="card-text text-muted">{book.author}</p>
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
    </div>
  );
};

export default ProductsComponent;