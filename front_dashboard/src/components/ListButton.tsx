import { useState } from 'react';
import '../styles/ListButton.css';


/**
 * 리스트에 출력하는 게시물 수 제한 버튼 컨포넌트
 * 
 * 1. 10개, 20개 단위로 설정
 * 2. Defult는 10개
 * 3. 선택된 버튼은 색상으로 구분함( 활성화 표시 )
 * 
 */

interface ListButtonProps {
  onLimitChange: (limit: number) => void;
  defaultLimit?: number;
}

export const ListButton: React.FC<ListButtonProps> = ({
  onLimitChange,
  defaultLimit = 10
}) => {
  const [activeLimit, setActiveLimit] = useState<number>(defaultLimit);

  const handleLimitClick = (limit: number) => {
    setActiveLimit(limit);     // 버튼 활성화 상태 변경
    onLimitChange(limit);      // 부모 컴포넌트에 알림
  };

  return (
    <div className="button-container">
      <button
        className={`limit-btn ${activeLimit === 10 ? 'active' : ''}`}
        onClick={() => handleLimitClick(10)}
      >
        10개씩 보기
      </button>
      <button
        className={`limit-btn ${activeLimit === 20 ? 'active' : ''}`}
        onClick={() => handleLimitClick(20)}
      >
        20개씩 보기
      </button>
    </div>
  );

}