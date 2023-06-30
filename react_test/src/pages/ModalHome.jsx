import styled from "styled-components";
import { Modal } from '@mui/material';
import styles from './ModalHome.module.css';
import { useCallback, useContext, useState } from 'react';

const Main = styled.div`
  width: 800px;
  height: 800px;
  
  position: absolute;
  left: 10px;
  top: 20px;
  background: skyblue;
`;

function ModalHome() {
    const [openModal, setOpenModal] = useState(false);
    const [openModal2, setOpenModal2] = useState(false);

    const onClickModalOpen = useCallback(() => {
        setOpenModal(true);
    }, []);

    const onClickModalClose = useCallback(() => {
        setOpenModal(false);
    }, []);
    
    const onClickModalOpen2 = useCallback(() => {
        setOpenModal2(true);
    }, []);

    const onClickModalClose2 = useCallback(() => {
        setOpenModal2(false);
    }, []);

    return (
            <Main>
               <button
                onClick={onClickModalOpen}
                className={styles.loginErrorButton}>
                    모달
                </button>

                <button
                onClick={onClickModalOpen2}
                className={styles.loginErrorButton}>
                    모달2
                </button>

                <Modal open={openModal}>
                    <div className={styles.window}>
                    <p className={styles.title}>모달창 닫기</p>
                    <p className={styles.description}>
                        모달모달모달
                    </p>
                    <button
                        onClick={onClickModalClose}
                        className={styles.button}
                    >
                    확인
                    </button>
                    </div>
                </Modal>

                <Modal open={openModal2}>
                    <div className={styles.window}>
                    <p className={styles.title}>두번째 모달창 닫기</p>
                    <p className={styles.description}>
                        모달모달모달2
                    </p>
                    <button
                        onClick={onClickModalClose2}
                        className={styles.button}
                    >
                    확인
                    </button>
                    </div>
                </Modal>
            </Main>   
    );
}

export default ModalHome;