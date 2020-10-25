import React, { useState, useEffect } from 'react';
import styled from "styled-components";
import Countdown from "react-countdown";
import Spinner from "react-bootstrap/Spinner";
import { savePhoneNumber } from '../../api/phoneNumber';


function Widget() {
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
      return "wee!";
    } else if (loading) {
      return <Spinner animation="border" variant="dark" size="sm" />;
    } else {
      return "yas";
    }
  }

  return (
    <Container>
      <NeonContainer>
        <Header>TIME UNTIL DROP</Header>
        <CountdownTimerText daysInHours date={new Date("10/27/2020")} />
      </NeonContainer>
      <CTAContainer>
        <CTAText>Want to get notified before the public?</CTAText>
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
      </CTAContainer>
    </Container>
  );
}

const Header = styled.h2`
  margin-bottom: 8px;
  color: #C9FD5E;
  padding-top: 16px;
  font-size: 43px;
  letter-spacing: 0.165em;
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
  background: rgba(255, 255, 255, 0.15);
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
  background: #C9FD5E;
  color: black;
  box-shadow: rgba(15, 15, 15, 0.1) 0px 1px 2px;
  text-align: center;
  width: 90px;
  outline: none;

  &:focus {
    border: 1px solid white;
  }
`

const CTAText = styled.span`
  color: #fff;
`

const CTAContainer = styled.div`
  margin-top: 32px;
  width: 335px;
`

const NeonContainer = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid #C9FD5E;
  padding: 80px;
  align-items: center;
  border-radius: 89px;
  width: 710px;
`

const CountdownTimerText = styled(Countdown)`
  font-size: 140px;
  color: #C9FD5E;
`

const Container = styled.div`
  display: flex;
  justify-content: center; 
  align-items: center;
  flex-direction: column;
  background: #000;
  margin-top: 24px;
`

export default Widget;
