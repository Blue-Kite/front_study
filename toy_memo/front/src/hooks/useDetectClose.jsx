import { useState, useEffect } from 'react';

//https://velog.io/@ahsy92/React-styled-component%EB%A1%9C-%EB%93%9C%EB%A1%AD%EB%8B%A4%EC%9A%B4-%EB%A9%94%EB%89%B4-%EA%B5%AC%ED%98%84%ED%95%98%EA%B8%B0
/*
커스텀 훅의 이름 use로 시작함 
return jsx가 아닌 배열로 value와 setValue
- isOpen은 평소에 false 상태로 두고, 드롭다운 메뉴를 클릭했을 때 true로 바뀐다.
- 드롭다운에 있는 메뉴를 클릭했을 경우 isOpen이 false로 바뀐다.
- 드롭다운 이외의 메뉴를 클릭했을 경우 isOpen이 false로 바뀐다.
*/
const useDetectClose = (ref, initialState) => {
    const [isOpen, setIsOpen] = useState(initialState); //initialState는 false임

    useEffect(() => {
        const pageClickEvent = e => {
          //드롭다운 영역 이외의 부분을 클릭 
          if (ref.current && !ref.current.contains(e.target)) {
            setIsOpen(!isOpen);
          }
        };

        if (isOpen) {
          //이벤트종류('click':클릭이벤트), 살향헐 함수
          window.addEventListener('click', pageClickEvent);
        }
    
        return () => {
          //element.removeEventListener('이벤트타입', 이벤트 콜백 함수)
          window.removeEventListener('click', pageClickEvent);
        };
    }, [isOpen, ref]);
    return [isOpen, setIsOpen];
}

export default useDetectClose;