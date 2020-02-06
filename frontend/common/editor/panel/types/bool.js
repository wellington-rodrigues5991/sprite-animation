import React, { useState } from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
    width: 46px;
    height: 26px;
    border-radius: 13px;
    cursor: pointer;
    box-sizing: border-box;
    padding: 2px;
    transition: all 0.2s;
    background: ${props => (props.toggle == true ? 'var(--color-secundary)' : 'var(--color-base)')};
    box-shadow: 0px 0px 0px 1px var(--border-color);
`;

const Ball = styled.div`
    width: 22px;
    height: 22px;
    border-radius: 100%;
    margin-left: ${props => (props.toggle == true ? '20px' : '0px')};
    transition: all 0.2s;
    background: var(--color-base);    
    box-shadow: 0px 0px 0px 1px var(--border-color);
`;

export default function Bool({change, value}) {
    return <Wrapper toggle={value} onClick={() => change(!value)}>
        <Ball toggle={value} />
    </Wrapper>;
}