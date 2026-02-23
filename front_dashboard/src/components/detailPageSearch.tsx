import '../styles/FilterCheck.css';
import { DETAIL_FILTER_LABELS } from '../constants/labels';
import { useForm } from '../hooks/useForm';
import { DETAIL_DEFAULT_VALUES } from '../constants/defaultValue';
import { useLoading } from '../hooks/useLoading';
import { DatePicker } from './DatePicker';
import { StatusSelect } from './StatusSelect';
import { ProjectSelect } from './projectSelect';

/**
 * 상세 페이지 검색 필터 컴포넌트
 */

interface DetailPageSearchProps {
    initialStatus?: string;
    initialDate?: string;
    initialLabels?: string;
    onFilterChange: (params: { status: string; startDate: string; endDate: string; labels: string }) => void;
}

export const DetailPageSearch: React.FC<DetailPageSearchProps> = ({
    initialStatus = DETAIL_DEFAULT_VALUES.STATUS,
    initialDate = '',
    initialLabels = '',
    onFilterChange
}) => {

    const { values: params, handleChange } = useForm({
        status: initialStatus,
        startDate: initialDate,
        endDate: initialDate,
        labels: initialLabels
    });

    // 커스텀 훅 사용으로 로딩 상태 관리 단순화
    const { isLoading, withLoading } = useLoading();

    const handleSearchClick = async () => {
        await withLoading(async () => {
            await onFilterChange(params);
        });
    };

    return (
        <div className="check-container">
            <div className="filter-group">
                <label>
                    {DETAIL_FILTER_LABELS.PROJECT}
                </label>
                <ProjectSelect
                    filters={params}
                    handleChange={handleChange}
                    isLoading={isLoading}
                />
            </div>
            <div className="date-group">
                <label>
                    {DETAIL_FILTER_LABELS.TERM}
                </label>
                <DatePicker
                    name="startDate"
                    value={params.startDate}
                    onChange={handleChange}
                    disabled={isLoading}
                />
                <span> ~ </span>
                <DatePicker
                    name="endDate"
                    value={params.endDate}
                    min={params.startDate}
                    onChange={handleChange}
                    disabled={isLoading}
                />
            </div>
            <div className="status-group">
                <label>
                    {DETAIL_FILTER_LABELS.STATUS}
                </label>
                <StatusSelect
                    value={params.status}
                    onChange={handleChange}
                    disabled={isLoading}
                />
            </div>

            <button
                className={`search-button ${isLoading ? 'blocked' : ''}`}
                onClick={handleSearchClick}
                disabled={isLoading}
            >
                {isLoading ? DETAIL_FILTER_LABELS.BUTTON_LOADING : DETAIL_FILTER_LABELS.BUTTON}
            </button>
        </div>
    );
};