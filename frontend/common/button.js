import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
    position: absolute;
    top: 6px;
    right: 6px;
    z-index: 9;
    display: flex;
    align-items: flex-end;
    background: red
`;

const Button = styled.div`
    cursor: pointer;
    user-select: none;
    font-weight: 500;
    text-transform: uppercase;
    line-height: 1;
    font-size: 11px;
    background-color: rgb(21, 122, 251);
    color: rgb(211, 211, 211);
    padding: 4px;
    
    &:hover{
        background-color: rgb(53, 138, 235)
    }

    & svg{
        width: 18px;
        height: 18px;
    }
    
`;

export default class Input extends React.PureComponent {
    render(){
        return <Container>
            <Button onClick={this.props.upload}>
                <svg class="MuiSvgIcon-root" focusable="false" viewBox="0 0 24 24" aria-hidden="true" role="presentation">
                    <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34a.9959.9959 0 0 0-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" style={{fill: 'white'}}></path>
                </svg>
            </Button>
            <Button onClick={this.props.clear}>
                <svg class="MuiSvgIcon-root" focusable="false" viewBox="0 0 24 24" aria-hidden="true" role="presentation">
                    <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" style={{fill: 'white'}}></path>
                </svg>
            </Button>
        </Container>;
    }
}