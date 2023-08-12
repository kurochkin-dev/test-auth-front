import React from "react";
import "./Pagination.css";

const Pagination = ({
                        prevPageUrl,
                        nextPageUrl,
                        lastPageUrl,
                        currentPage,
                        lastPage,
                        fetchPrev,
                        fetchPage,
                        fetchNext,
                        fetchLast
                    }) => {
    const generateNumberRange = (centerNumber, max, range) => {
        let start = centerNumber - range;
        let end = centerNumber + range;

        if (start < 1) {
            end += 1 - start;
            start = 1;
        }

        if (end > max) {
            start -= end - max;
            end = max;
        }

        const result = [];
        for (let i = start; i <= end; i++) {
            result.push(i);
        }
        return result;
    };

    return (
        <div className="pagination">
            {prevPageUrl && (
                <button
                    className="pagination-button"
                    onClick={() => fetchPrev(prevPageUrl)}
                >
                    Back
                </button>
            )}
            <span className="pagination-info">
                Page {currentPage} of {lastPage}
            </span>

            {generateNumberRange(currentPage, lastPage, 2).map((page) => (
                <span
                    key={page}
                    className={`pagination-button-page ${
                        page === currentPage ? "active" : ""
                    }`}
                    onClick={() => fetchPage(page)}
                >
                    {page}
                </span>
            ))}

            {nextPageUrl && (
                <button
                    className="pagination-button"
                    onClick={() => fetchNext(nextPageUrl)}>
                    Next
                </button>
            )}

            {lastPageUrl && (
                <button
                    className="pagination-button"
                    onClick={() => fetchLast(lastPageUrl)}>
                    Last
                </button>
            )}
        </div>
    );
};

export default Pagination;
