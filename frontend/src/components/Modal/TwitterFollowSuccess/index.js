import React from 'react';
import Modal from "react-bootstrap/Modal";
import { css } from "styled-components";

import {
    SectionContainer,
    Link
} from "./styles";
import { EmailButton } from '../InitialStep/styles';

function TwitterFollowSuccess({ followedTwitterUsers }) {
    return (
        <React.Fragment>
            <Modal.Header style={styles.ModalHeader}>
                <Modal.Title>Successful Twitter follow 🎉</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <SectionContainer css={styles.SectionContainer}>
                    <span>Congrats 🤗 You just followed these Twitter accounts:</span>
                    <ul>
                        {followedTwitterUsers.map((user) => {
                            return <li><a href={user.profileLink} target="_blank">{user.screenName}</a></li>
                        })}
                    </ul>
                    <span>You can now access the super duper secret content here:</span>
                    <Link href="https://usemicro.com/super-duper-secret-content" target="_blank">
                        <EmailButton css={styles.EmailButton}>Leggo</EmailButton>
                    </Link>
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
    EmailButton: css`
        margin-top: 8px;
        background: #4BB543;
        border: none;
    `
}


export default TwitterFollowSuccess;