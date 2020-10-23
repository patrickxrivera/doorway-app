import styled from "styled-components";

export const SectionContainer = styled.div`
    display: flex;
    justify-content: center;
    margin-top: 8px;
    ${props => props.css}
`

export const Link = styled.a`
    &:hover {
        text-decoration: none;
    }
`