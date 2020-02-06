import React, { useState, useRef } from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
    width: 100%;

    & input {
        -webkit-appearance: none;
        appearance: none;
        width: 100%;
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
    const [text, setText] = useState(null); 
    const input = useRef();

    return <Wrapper>
        <input 
            ref={input}
            type="text"  
            defaultValue={value}
            placeholder={(opt == undefined ? "" : opt)}
            onBlur={e => change(e.target.value)}            
        />
    </Wrapper>;
}