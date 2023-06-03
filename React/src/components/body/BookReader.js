import React, { useState, useEffect, useRef } from 'react';
import { usePdf } from 'react-pdf-js';
import { Button } from '@material-ui/core';

const MyPdfViewer = () => {
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(null);

  const renderPagination = (page, pages) => {
    if (!pages) {
      return null;
    }
    const previousButton = (
      <Button
        variant="contained"
        color="primary"
        disabled={page === 1}
        onClick={() => setPage(page - 1)}
      >
        Previous
      </Button>
    );
    const nextButton = (
      <Button
        variant="contained"
        color="primary"
        disabled={page === pages}
        onClick={() => setPage(page + 1)}
      >
        Next
      </Button>
    );
    return (
      <div className="pagination">
        {previousButton}
        {nextButton}
      </div>
    );
  };

  const canvasEl = useRef(null);

  const [loading, numPages] = usePdf({
    file: 'test.pdf',
    page,
    canvasEl
  });

  const onDocumentComplete = (numPages) => {
    setPages(numPages);
  };

  useEffect(() => {
    setPages(numPages);
  }, [numPages]);

  return (
    <div>
      {loading && <span>Loading...</span>}
      <canvas ref={canvasEl} />
      {renderPagination(page, pages)}
    </div>
  );
};

export default MyPdfViewer;
