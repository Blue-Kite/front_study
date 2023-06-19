import { useState, useEffect } from 'react';

const useDetectSide = (ref, initialState) => {
    const [backToMemoList, setbackToMemoList] = useState(initialState); //initialState는 false임

    useEffect(() => {
        const pageClickEvent = e => {
          //드롭다운 영역 이외의 부분을 클릭 
          if (ref.current && !ref.current.contains(e.target)) {
            setbackToMemoList(!backToMemoList);
          }
        };

        if (backToMemoList) {
          //이벤트종류('click':클릭이벤트), 살향헐 함수
          window.addEventListener('click', pageClickEvent);
        }
    
        return () => {
          //element.removeEventListener('이벤트타입', 이벤트 콜백 함수)
          window.removeEventListener('click', pageClickEvent);
        };
    }, [backToMemoList, ref]);
    return [backToMemoList, setbackToMemoList];
}

export default useDetectSide;