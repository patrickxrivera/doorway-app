import React from "react";
import { BackgroundImage, HeaderText } from "../Settings";
import NavBar from "../NavBar";
import { PatuaText, PinkButton } from "../Lottery/styles";
import styled from "styled-components";

export function Error() {
    return (
      <BackgroundImage>
        <NavBar />
        <HeaderText>Oops...</HeaderText>
        <PatuaText fontSize={30}>
            Looks like something went wrong.
        </PatuaText>
        <div style={{marginTop: 42}}>
            <StyledLink href="https://twitter.com/messages/compose?recipient_id=63534037" target="_blank">
                <PinkButton>
                    Contact Us
                </PinkButton>
            </StyledLink>
        </div>
      </BackgroundImage>
    )
}

const StyledLink = styled.a`
    &:hover {
        text-decoration: none;
    }
`

export default Error;
