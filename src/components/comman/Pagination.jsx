
import React from 'react';
import { Icon } from '@iconify/react';

const Pagination = ({ pagination, onPageChange }) => {
  console.log(pagination);
  
  const { page, pages } = pagination;

  if (pages <= 1) return null; // Don't render if only 1 page

  const getPages = () => {
    const range = [];
    for (let i = 1; i <= pages; i++) {
      range.push(i);
    }
    return range;
  };

  return (
    <div className="d-flex justify-content-between align-items-center mt-4 flex-wrap gap-2">
      <span>
        Page {page} of {pages}
      </span>
      <ul className="pagination d-flex flex-wrap align-items-center gap-2 mb-0">
        <li className={`page-item ${page === 1 && 'disabled'}`}>
          <button
            className="page-link"
            onClick={() => page > 1 && onPageChange(page - 1)}
          >
            <Icon icon="ep:d-arrow-left" className="text-xl" />
          </button>
        </li>

        {getPages().map((p) => (
          <li key={p} className={`page-item ${p === page ? 'active' : ''}`}>
            <button
              className={`page-link ${p === page ? 'bg-primary-600 text-white' : ''}`}
              onClick={() => onPageChange(p)}
            >
              {p}
            </button>
          </li>
        ))}

        <li className={`page-item ${page === pages && 'disabled'}`}>
          <button
            className="page-link"
            onClick={() => page < pages && onPageChange(page + 1)}
          >
            <Icon icon="ep:d-arrow-right" className="text-xl" />
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Pagination;
