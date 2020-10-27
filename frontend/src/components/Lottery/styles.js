import styled from "styled-components";
import Countdown from "react-countdown";

export const JoinContainer = styled.div`
    margin-top: 80px;
    margin-bottom: 280px;
    display: flex;
    flex-direction: column;
    width: 80%;
    justify-content: center;
    align-items: center;

    @media (max-width: 768px) {
        margin-bottom: 140px;
    }
`

export const HowItWorksContainer = styled.div`
    margin-top: ${props => props.marginTop ? `${props.marginTop}px` : "80px"};
    font-size: 20px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: white;
    width: ${props => props.width ? `${props.width}px` : "720px"};

    @media (max-width: 768px) {
        width: 330px;
    }
`

export const TwitterBoardImage = styled.img`
    height: 700px;
    position: relative;
    max-width: 924;

    @media (max-width: 768px) {
        height: 300px;
    }
`

export const SmallHeader = styled.span`
    font-size: ${props => props.fontSize ? `${props.fontSize}px` : "25px"};
    font-weight: 500;
    font-family: "Patua One";
    color: #E0E003;
    text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25), 0px 7px 14px #000000;
    -webkit-text-stroke-width: 1px;
    -webkit-text-stroke-color: #E40000;
`

export const PointItemContainer = styled.div`
    display: flex;
    flex-direction: column;
    padding-top: 18px;
`

export const PatuaText = styled.span`
    text-align: center;
    margin-top: 24px;
    font-size: ${props => props.fontSize ? `${props.fontSize}px` : null};
    font-family: "Patua One";
    -webkit-text-stroke-width: 1px;
    -webkit-text-stroke-color: black;

    @media (max-width: 768px) {
        text-align: left;
    }
`

export const PointItem = styled.span`
    text-align: left;
    margin-bottom: 8px;
    font-size: ${props => props.fontSize ? `${props.fontSize}px` : null};
    font-family: "Patua One";
    -webkit-text-stroke-width: 1px;
    -webkit-text-stroke-color: black;
`


export const CountdownTimerText = styled(Countdown)`
  font-size: 140px;
  color: #white;
  font-family: Sansita;
  background: -webkit-linear-gradient(213.02deg, #EEB911 16.36%, #D48311 22.95%, #CE6E18 26.29%, #CC661B 29.32%, #D26F19 32.71%, #E08115 35.85%, #EE9611 38.91%, #EEBB11 42.37%, #EBEBA6 49.19%, #EEBB11 64.14%, #D1721A 76.13%, #CC661B 84.72%, #D27419 97.57%, #ECB712 117.14%, #CECC00 150.06%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  -webkit-text-stroke-color: black;
  -webkit-text-stroke-width: 4px;

  @media (max-width: 768px) {
      font-size: 60px;
      -webkit-text-stroke-width: 2px;
      margin-top: 25%;
  }
`

export const ReferralInput = styled.input`
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

export const ErrorMessageContainer = styled.div`
  display: flex;
  justify-content: center;
  color: #fff;
  margin-top: 8px;
  font-style: italic;
`

export const ReferralInputContainer = styled.div`
  display: flex;
  align-items: center;
  background: rgba(0, 0, 0, 0.72);
  border: 2px solid #FF95C8;
  line-height: 26px;
  padding: 4px 10px;
  position: relative;
  border-radius: 6px;
  cursor: text;
  height: 36px;
  flex: 1 1 0%;
  margin-right: 8px;
  margin-top: 0px;
  height: 70px;
  width: 500px;
  font-size: 25px;

  @media (max-width: 768px) {
    padding: 18px 10px;
    width: 100%;
    margin-bottom: 12px;
    margin-right: 0px;
    font-size: 20px;
}
`

export const EmailInputSectionContainer = styled.div`
  display: flex;
  margin-top: 12px;
  align-items: center;
  font-family: "Patua One";
`

export const PinkButton = styled.div`
  font-family: "Patua One";
  margin-top: ${props => props.marginTop || props.marginTop === 0 ? `${props.marginTop}px` : "18px"};
  width: ${props => props.width ? `${props.width}px` : null};
  user-select: none;
  transition: background 20ms ease-in 0s;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  white-space: nowrap;
  height: 36px;
  border-radius: 5px;
  font-size: 25px;
  line-height: 1;
  padding: 30px 34px;
  border: 2px solid black;
  font-weight: 500;
  background: linear-gradient(128.65deg, rgb(223, 0, 107) 29.94%, rgb(255, 68, 158) 42.32%, rgb(255, 0, 168) 61.81%), rgb(255, 255, 255);
  color: white;
  box-shadow: rgba(15, 15, 15, 0.1) 0px 1px 2px;
  text-align: center;
  outline: none;
  width: ${props => props.width ? `${props.width}` : null};

  &:focus {
    border: 1px solid black;
  }

  &:hover {
    text-decoration: none;
  }

  @media (max-width: 768px) {
    width: ${props => props.mobileWidth ? props.mobileWidth : null};
  }
`

export const ConnectTwitterButton = styled.div`
  font-family: "Patua One";
  margin-top: 18px;
  user-select: none;
  transition: background 20ms ease-in 0s;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  white-space: nowrap;
  height: 36px;
  border-radius: 5px;
  font-size: 25px;
  line-height: 1;
  padding: 28px;
  font-weight: 500;
  background: #1DA1F2;
  color: white;
  box-shadow: rgba(15, 15, 15, 0.1) 0px 1px 2px;
  text-align: center;
  outline: none;

  &:focus {
    border: 1px solid black;
  }
`