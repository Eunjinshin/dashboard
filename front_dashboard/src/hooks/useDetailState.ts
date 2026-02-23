import { useState, useCallback, useEffect } from 'react';
import { handleSearchApi, type SearchAllParams } from '../api/handleSearchApi';
import { useLoading } from './useLoading';
import { DETAIL_DEFAULT_VALUES } from '../constants/defaultValue';
import { DETAIL_FILTER_OPTION, NAV_SOURCE } from '../constants/labels';
import { useLocation } from 'react-router-dom';

interface NavigationState {
    labels: string;
    date: string;
    count: number;
    from: string;
    status?: string;
}

// 1. 상태(Params)를 한 번에 관리하도록 인터페이스 정의
interface SearchParams {
    labels: string;
    status: string;
    startDate: string;
    endDate: string;
    page: number;
    limit: number;
}

export const useDetailState = () => {
    const location = useLocation();
    const state = location.state as NavigationState | null;

    // 2. 검색 조건, 페이지, 리밋 상태를 하나로 통합
    const [searchParams, setSearchParams] = useState<SearchParams>({
        labels: state?.labels || DETAIL_DEFAULT_VALUES.PROJECT,
        status: state?.status || (state?.from === NAV_SOURCE.GANTT ? DETAIL_FILTER_OPTION.ALL : DETAIL_DEFAULT_VALUES.STATUS),
        startDate: state?.date || '',
        endDate: state?.date || '',
        page: 1,
        limit: 10,
    });

    const [issues, setIssues] = useState<any[]>([]);
    const [totalCount, setTotalCount] = useState<number>(0);
    const { isLoading, withLoading } = useLoading();

    // 3. API Fetch 함수 (의존성을 최소화하고 searchParams를 인자로 받아 곧바로 실행)
    const fetchIssues = useCallback(async (params: SearchParams) => {
        if (!params.startDate || !params.endDate) return;

        await withLoading(async () => {
            const apiParams: SearchAllParams = {
                ...params // 현재 파라미터를 그대로 넘겨줍니다. 
                // (만약 api 인터페이스와 파라미터 구조가 완벽히 일치하면 이렇게 전개 구문 구조분해 재조립 가능합니다)
            };

            const response = await handleSearchApi(apiParams);

            if (Array.isArray(response)) {
                setIssues(response);
                setTotalCount(response.length);
            } else {
                setIssues(response.issues || []);
                setTotalCount(response.totalCount || 0);
            }
        });
    }, [withLoading]);

    // 4. 핸들러 단순화
    // 필터 조건(날짜, 상태, 라벨) 변경 핸들러
    const handleFilterChange = useCallback((newFilters: { status: string; startDate: string; endDate: string; labels: string }) => {
        setSearchParams(prev => ({
            ...prev,
            ...newFilters,
            page: 1
        }));
    }, []);

    // 페이지 변경 핸들러
    const handlePageChange = useCallback((page: number) => {
        setSearchParams(prev => ({ ...prev, page }));
    }, []);

    // 목록 개수 핸들러
    const handleLimitChange = useCallback((limit: number) => {
        setSearchParams(prev => ({ ...prev, limit, page: 1 }));
    }, []);

    // 5. useEffect 의존성 (searchParams 객체 자체가 렌더링될 때만 감시)
    // 파라미터 상태가 변경될 때마다 자동 검색
    useEffect(() => {
        fetchIssues(searchParams);
    }, [fetchIssues, searchParams]);

    return {
        filters: { // 기존 UI 컴포넌트와의 호환성을 위해 형태는 유지
            status: searchParams.status,
            startDate: searchParams.startDate,
            endDate: searchParams.endDate,
            labels: searchParams.labels
        },
        currentPage: searchParams.page,
        limit: searchParams.limit,
        issues,
        totalCount,
        isLoading,
        handleFilterChange,
        handlePageChange,
        handleLimitChange
    };
};
