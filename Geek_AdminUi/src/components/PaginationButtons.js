import { Button } from "@mui/material";

const PaginationButtons = ({ totalPages, currentPage, setCurrentPage }) => {
  const paginationButtons = Array.from({ length: totalPages }, (_, i) => i + 1)
    .filter(
      (page) =>
        Math.abs(page - currentPage) <= 2 || page === 1 || page === totalPages
    )
    .map((page) => (
      <button
        key={page}
        onClick={() => setCurrentPage(page)}
        disabled={page === currentPage}
      >
        {page}
      </button>
    ));

  return (
    <div className="pagination">
      <Button
        style={{ margin: "2px" }}
        variant="outlined"
        color="info"
        onClick={() => setCurrentPage((prevPage) => prevPage - 1)}
        disabled={currentPage === 1}
      >
        Previous
      </Button>
      {paginationButtons}
      <Button
        style={{ margin: "2px" }}
        variant="outlined"
        color="info"
        onClick={() => setCurrentPage((prevPage) => prevPage + 1)}
        disabled={currentPage === totalPages}
      >
        Next
      </Button>
    </div>
  );
};

export default PaginationButtons;
