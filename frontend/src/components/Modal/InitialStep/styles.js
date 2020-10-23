import styled from "styled-components";

export const EmailInputContainer = styled.div`
    display: flex;
    align-items: center;
    width: 100%;
    font-size: 15px;
    line-height: 26px;
    padding: 4px 10px;
    position: relative;
    border-radius: 3px;
    box-shadow: rgba(15, 15, 15, 0.1) 0px 0px 0px 1px inset, rgba(15, 15, 15, 0.1) 0px 1px 1px inset;
    background: white;
    cursor: text;
    height: 36px;
    flex: 1 1 0%;
    margin-right: 8px;

    &:focus-within {
        box-shadow: rgba(46, 170, 220, 0.7) 0px 0px 0px 1px inset, rgba(46, 170, 220, 0.4) 0px 0px 0px 2px;
    }
`

export const EmailInput = styled.input`
    font-size: inherit;
    line-height: inherit;
    border: none;
    background: none;
    width: 100%;
    display: block;
    resize: none;
    padding: 0px;

    &:focus {
        outline: none;
    }
`

export const EmailButton = styled.div`
    user-select: none;
    transition: background 20ms ease-in 0s;
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    white-space: nowrap;
    height: 36px;
    border-radius: 3px;
    color: white;
    font-size: 14px;
    line-height: 1;
    padding-left: 12px;
    padding-right: 12px;
    font-weight: 500;
    background: rgb(207, 83, 74);
    border: 1px solid rgb(190, 86, 67);
    box-shadow: rgba(15, 15, 15, 0.1) 0px 1px 2px;
    text-align: center;
    width: 90px;
    outline: none;
    ${props => props.css}
`

export const TwitterButton = styled.div`
    user-select: none;
    transition: background 20ms ease-in 0s;
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    white-space: nowrap;
    height: 36px;
    border-radius: 3px;
    color: white;
    font-size: 14px;
    line-height: 1;
    padding-left: 12px;
    padding-right: 12px;
    font-weight: 500;
    background: #00acee;
    border: 1px solid #00acee;
    box-shadow: rgba(15, 15, 15, 0.1) 0px 1px 2px;
    text-align: center;
    outline: none;
`

export const EmailInputSectionContainer = styled.div`
    display: flex;
    margin-top: 8px;
`

export const SectionContainer = styled.div`
    display: flex;
    justify-content: center;
    margin-top: 16px;
`

export const EmailErrorText = styled.span`
    font-size: 14px;
    color: #FF0000;
`