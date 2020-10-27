import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";

import {
  TwitterBoardImage,
  CountdownTimerText,
  HowItWorksContainer,
  SmallHeader,
  PatuaText,
  PointItemContainer,
  PointItem,
  JoinContainer,
  PinkButton,
} from "./styles";

function Lottery() {
  return (
    <div style={{
        backgroundImage: `url("/lottery-background-v2.png")`,
        backgroundSize: "cover",
        overflow: "hidden",
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
        position: "relative"
    }}>
        <TwitterBoardImage src="/twitter-board.png" />
        <div style={{
            color: "#fff",
            position: "relative",
            display: "flex",
            width: 710,
            justifyContent: "center",
            marginBottom: 100,
            marginTop: -300,
            fontSize: 50
        }}>
            <CountdownTimerText daysInHours date={new Date("10/28/2020")} />
        </div>
        <HowItWorksContainer>
            <SmallHeader>
                How it works:
            </SmallHeader>
            <PatuaText>
                On October 28th at 8am PT, the ✨ Twitter Follower Lottery ✨ will begin.
            </PatuaText>
            <PatuaText>
                You will have 24 hours to connect your Twitter account on this site and gain as many points as possible.
            </PatuaText>
            <PatuaText>
                At the end of the 24 hours, your points will be converted to lottery tickets and we will randomly select one person to receive a follow from everybody that joined.
            </PatuaText>
            <SmallHeader style={{marginTop: 40}}>
                Point System
            </SmallHeader>
            <PointItemContainer>
                <PointItem>10 points - Connect your Twitter account</PointItem>
                <PointItem>10 points - Refer a friend</PointItem>
                <PointItem>5 points - Join using referral link</PointItem>
            </PointItemContainer>
        </HowItWorksContainer>
        <JoinContainer>
            <SmallHeader>
                Ready to join?
            </SmallHeader>
            <Link to="/get-started" style={{textDecoration: "none"}}>
              <PinkButton role="button" tabIndex="0">
                  Get Started
              </PinkButton>
            </Link>
        </JoinContainer>
    </div>
  );
}

export default Lottery;