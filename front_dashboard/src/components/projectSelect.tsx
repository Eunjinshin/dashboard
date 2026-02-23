import { useEffect, useState } from "react";
import { fetchProjectList } from "../api/handleSearchApi";

/**
 * 프로젝트 선택 부분
 */

interface ProjectSelectProps {
    filters: {
        labels: string;
    };
    handleChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    isLoading: boolean;
}

export const ProjectSelect: React.FC<ProjectSelectProps> = ({ filters, handleChange, isLoading }) => {

    const [projectList, setProjectList] = useState<string[]>([]);

    useEffect(() => {
        const getProjects = async () => {
            const data = await fetchProjectList();
            if (data && Array.isArray(data)) setProjectList(data);
        };
        getProjects();
    }, []);

    return (
        <select
            name="labels"
            value={filters.labels}
            onChange={handleChange}
            disabled={isLoading}
        >
            {projectList.map((proj) => (
                <option
                    key={proj}
                    value={proj}>{proj}</option>
            ))}
        </select>
    );
};