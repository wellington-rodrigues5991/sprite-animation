import React, { useState, useRef } from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
    width: 100%;
    display: flex;

    & input {
        -webkit-appearance: none;
        appearance: none;
        width: calc(100% - 10px);
        margin-left: 10px;
        height: 36px;
        text-align: left;
        border: none;
        padding: 0px 8px;
        box-sizing: border-box;
        background: var(--color-primary);
        box-shadow: 0px 0px 0px 1px var(--border-color) inset;
    }
`;

export default function Text({value, change, opt}) {
    return <Wrapper>
        <input type="text" onChange={e => change(e.target.value, 'opt')} defaultValue={opt}  />
    </Wrapper>;
}