/**
 * Pagination 계산 로직을 분리한 커스텀 훅
 */

import { useMemo } from 'react';
interface UsePaginationProps {
    totalItems: number;
    itemsPerPage: number;
    currentPage: number;
    pageRange?: number;
}

export const usePagination = ({
    totalItems,
    itemsPerPage,
    currentPage,
    pageRange = 5,
}: UsePaginationProps) => {
    return useMemo(() => {
        // 1. 전체 페이지 수 계산
        const totalPages = itemsPerPage > 0 ? Math.ceil(totalItems / itemsPerPage) : 0;

        // 2. 시작 페이지와 끝 페이지 계산
        const startPage = Math.max(1, Math.min(currentPage - Math.floor(pageRange / 2), totalPages - pageRange + 1));
        const endPage = Math.min(totalPages, startPage + pageRange - 1);

        // 3. 페이지 배열 생성
        const pages = [];
        for (let i = startPage; i <= endPage; i++) {
            pages.push(i);
        }
        return { totalPages, pages };
    }, [totalItems, itemsPerPage, currentPage, pageRange]);
};