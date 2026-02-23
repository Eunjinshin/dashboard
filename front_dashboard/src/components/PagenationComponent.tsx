import React from 'react';
import { usePagination } from '../hooks/usePagination';
import '../styles/PagenationComponent.css';

interface PagenationProps {
  totalItems: number;
  itemsPerPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

export const PagenationComponent: React.FC<PagenationProps> = ({
  totalItems = 0,
  itemsPerPage = 10,
  currentPage = 1,
  onPageChange,
}) => {
  const { totalPages, pages } = usePagination({
    totalItems,
    itemsPerPage,
    currentPage
  });

  if (totalPages <= 1) return null;

  return (
    <div className="pagenation-container">
      <ul className="pagination-list">
        {/* 처음으로 가기 */}
        <li onClick={() => onPageChange(1)} className={currentPage === 1 ? 'disabled' : ''}>«</li>

        {/* 이전 페이지 */}
        <li onClick={() => onPageChange(Math.max(1, currentPage - 1))} className={currentPage === 1 ? 'disabled' : ''}>‹</li>

        {/* 페이지 번호 목록 */}
        {pages.map((page) => (
          <li
            key={page}
            onClick={() => onPageChange(page)}
            className={currentPage === page ? 'active' : ''}
          >
            {page}
          </li>
        ))}

        {/* 다음 페이지 */}
        <li onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))} className={currentPage === totalPages ? 'disabled' : ''}>›</li>

        {/* 마지막으로 가기 */}
        <li onClick={() => onPageChange(totalPages)} className={currentPage === totalPages ? 'disabled' : ''}>»</li>
      </ul>
    </div>
  );
};
