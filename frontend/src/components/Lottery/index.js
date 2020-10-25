import React, { useState, useEffect } from 'react';
import styled from "styled-components";
import { savePhoneNumber } from "../../api/phone-number";
import Spinner from "react-bootstrap/Spinner";
import Countdown from "react-countdown";

function Lottery() {
    const [phoneNumber, setPhoneNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    setPhoneNumber(e.target.value)
  }

  const handleSubmit = async () => {
    setLoading(true);
    
    
    const successResponse = await savePhoneNumber(phoneNumber)
    
    if (successResponse) {
      setSuccess(true);
      setErrorMessage("");
    } else if (success) {
      setErrorMessage("you're already registered silly goose :-)")
      setLoading(false);
    }
    else {
      setErrorMessage("oops. something went wrong. plz try agen.");
      setLoading(false);
    }
  }

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSubmit();
    }
  }

  const handleTeaserCountdownComplete = () => {
    console.log("Teaser countdown complete")
  }

  const renderButtonChildren = () => {
    if (success) {
      return "Done!";
    } else if (loading) {
      return <Spinner animation="border" variant="dark" size="sm" />;
    } else {
      return "Submit";
    }
  }

  return (
    <div style={{
        backgroundImage: `url("/lottery-background.png")`,
        backgroundSize: "cover",
        overflow: "hidden",
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
        position: "relative"
    }}>
        <img src="/twitter-board.png" style={{ 
            height: 700,
            position: "relative",
            maxWidth: 924
        }} />
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
            <CountdownTimerText daysInHours date={new Date("10/27/2020")} />
        </div>
        <div style={{
            marginTop: 80,
            fontSize: 20,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            color: "white",
            width: 720
        }}>
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
        </div>
        <div style={{
            marginTop: 80,
            marginBottom: 220
        }}>
            <SmallHeader>
                Get notified before the public:
            </SmallHeader>
            <EmailInputSectionContainer>
                <EmailInputContainer>
                    <EmailInput value={phoneNumber} onChange={handleChange} placeholder="+19045620299" type="email" autoComplete="off" />
                </EmailInputContainer>
                <EmailButton onKeyDown={handleKeyDown} onClick={handleSubmit} role="button" tabIndex="0">
                    {renderButtonChildren()}
                </EmailButton>
            </EmailInputSectionContainer>
                {errorMessage && <ErrorMessageContainer>
                    <span>oops. something went wrong. plz try agen.</span>
                </ErrorMessageContainer>}
        </div>
        <img src="/pyramid-scheme.png" style={{ 
            width: "100%"
        }} />
    </div>
  );
}

const SmallHeader = styled.span`
    font-size: 25px;
    font-weight: 500;
    font-family: "Patua One";
    color: #E0E003;
    text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25), 0px 7px 14px #000000;
    -webkit-text-stroke-width: 1px;
    -webkit-text-stroke-color: #E40000;
    font-size: 25px;
`

const PatuaText = styled.span`
    text-align: center;
    margin-top: 24px;
    font-family: "Patua One";
    -webkit-text-stroke-width: 1px;
    -webkit-text-stroke-color: black;
`


const CountdownTimerText = styled(Countdown)`
  font-size: 140px;
  color: #white;
  font-family: Sansita;
  background: -webkit-linear-gradient(213.02deg, #EEB911 16.36%, #D48311 22.95%, #CE6E18 26.29%, #CC661B 29.32%, #D26F19 32.71%, #E08115 35.85%, #EE9611 38.91%, #EEBB11 42.37%, #EBEBA6 49.19%, #EEBB11 64.14%, #D1721A 76.13%, #CC661B 84.72%, #D27419 97.57%, #ECB712 117.14%, #CECC00 150.06%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  -webkit-text-stroke-color: black;
  -webkit-text-stroke-width: 4px;
`

const EmailInput = styled.input`
  font-size: inherit;
  line-height: inherit;
  border: none;
  background: none;
  width: 100%;
  display: block;
  resize: none;
  padding: 0px;
  color: #fff;
  
  &:focus {
      outline: none;
  }
`

const ErrorMessageContainer = styled.div`
  display: flex;
  justify-content: center;
  color: #fff;
  margin-top: 8px;
  font-style: italic;
`

const EmailInputContainer = styled.div`
  display: flex;
  align-items: center;
  background: rgba(0, 0, 0, 0.72);
  border: 2px solid #FF95C8;
  width: 100%;
  font-size: 15px;
  line-height: 26px;
  padding: 4px 10px;
  position: relative;
  border-radius: 6px;
  cursor: text;
  height: 36px;
  flex: 1 1 0%;
  margin-right: 8px;
  margin-top: 0px;
`

const EmailInputSectionContainer = styled.div`
  display: flex;
  margin-top: 12px;
  align-items: center;
`

const EmailButton = styled.div`
  user-select: none;
  transition: background 20ms ease-in 0s;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  white-space: nowrap;
  height: 36px;
  border-radius: 3px;
  font-size: 14px;
  line-height: 1;
  padding-left: 12px;
  padding-right: 12px;
  font-weight: 500;
  background: linear-gradient(128.65deg, #DF006B 29.94%, #FF449E 42.32%, #FF00A8 61.81%), #FFFFFF;
  color: white;
  box-shadow: rgba(15, 15, 15, 0.1) 0px 1px 2px;
  text-align: center;
  width: 90px;
  outline: none;

  &:focus {
    border: 1px solid black;
  }
`

export default Lottery;