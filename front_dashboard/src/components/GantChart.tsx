import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import React from 'react';
import { Line } from 'react-chartjs-2';
import { useNavigate } from 'react-router-dom';
import { GANTT_LABELS } from '../constants/labels';
import '../styles/GantChart.css';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface IssueData {
  date: string;
  count: number;
}

export const GantChart: React.FC<{ issueData: IssueData[], project: string }> = ({ issueData, project }) => {

  const navigate = useNavigate();

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    onClick: (_event: any, elements: any[]) => { // event -> _event로 변경 (사용하지 않을 경우 대비)
      if (elements.length > 0) {
        const index = elements[0].index;
        const selectedDate = issueData[index].date;
        const selectedCount = issueData[index].count;

        navigate('/detail', {
          state: {
            date: selectedDate,
            count: selectedCount,
            project: project,
            from: 'gantt'
          }
        });
      }
    },
    plugins: {
      legend: { position: 'top' as const }, // as const 추가
      title: { display: true, text: GANTT_LABELS.TITLE },
    },
    onHover: (event: any, chartElement: any) => {
      // chartElement가 존재할 때만 커서 변경
      if (event.native && event.native.target) {
        event.native.target.style.cursor = chartElement[0] ? 'pointer' : 'default';
      }
    }
  };

  const data = {
    labels: issueData.map((d) => d.date),
    datasets: [
      {
        label: GANTT_LABELS.LABLE,
        data: issueData.map((d) => d.count),
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
        pointRadius: 6,
        pointHoverRadius: 10,
      },
    ],
  };

  return (
    <div className="chart-card-container">
      <Line options={options} data={data} />
    </div>
  );
};