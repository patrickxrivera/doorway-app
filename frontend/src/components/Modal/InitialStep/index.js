import React, { useState } from 'react';
import Modal from "react-bootstrap/Modal";
import { getRequestToken } from '../../../api/twitter';
import { TWITTER_OAUTH_URL } from "../../../utils/endpoints";

import {
    TwitterButton,
    SectionContainer,
    EmailErrorText
} from "./styles";

function InitialStep() {
    const [showRequestTokenErrorMessage, setShowRequestTokenErrorMessage] = useState(false);
  
    const handleContinueClick = async () => {
        const requestToken = await getRequestToken();

        if (!requestToken) {
            setShowRequestTokenErrorMessage(true);
            return;
        }

        window.location.href = `${TWITTER_OAUTH_URL}?oauth_token=${requestToken}`;
    }

    return (
        <React.Fragment>
            <Modal.Header style={styles.ModalHeader}>
                <Modal.Title>Welcome to Patrick's Follow Gate 👋</Modal.Title>
            </Modal.Header>
            <Modal.Body style={styles.ModalBody}>
                <span>To access this content, you must:</span>
                <SectionContainer>
                    <TwitterButton onClick={handleContinueClick}>Follow on Twitter</TwitterButton>
                </SectionContainer>
                {showRequestTokenErrorMessage && <SectionContainer>
                    <EmailErrorText>Something went wrong.</EmailErrorText>
                </SectionContainer>}
            </Modal.Body>
        </React.Fragment>
    )
}

const styles = {
    ModalHeader: {
        justifyContent: "center"
    },
    ModalBody: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column"
    }
}

export default InitialStep;