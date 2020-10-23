import React from 'react';
import Modal from "react-bootstrap/Modal";
import { css } from "styled-components";
import BounceLoader from "react-spinners/BounceLoader";

import {
    SectionContainer,
} from "./styles";

function Loading() {
    return (
        <React.Fragment>
            <Modal.Header style={styles.ModalHeader}>
                <Modal.Title>Working some magic...</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <SectionContainer css={styles.SectionContainer}>
                    <BounceLoader  
                        size={100}
                        color="#00acee"
                        loading
                    />
                </SectionContainer>
            </Modal.Body>
        </React.Fragment>
    )
}

const styles =  {
    SectionContainer: css`
        flex-direction: column;
        align-items: center;
    `,
    ModalHeader: {
        justifyContent: "center"
    },
}


export default Loading;