import React, { useState } from 'react';
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

const Title = styled.div`
    width: 120px;
    height: 35px;
    text-transform: capitalize;
    font-size: 12pt;
    line-height: 35px;
`;

const Value = styled.div`
    width: calc(100% - 10px);
    min-height: 35px;
    margin-left: 10px;
    
`;
const Button = styled.div`
    width: 25px;
    height: 25px;
    background: var(--color-secundary);
    float: right;
    margin-left: 10px;
    line-height: 25px;
    text-align: center;
    cursor: pointer;
`;

export default function Select({change, value, opt}) {
    const Add = () => {
        const d = opt.slice();

        d.push('');
        change(d, 'opt');
    }
    const Edit = (e, i) => {
        const d = opt.slice();

        d[i] = e;
        change(d, 'opt');
    }

    return <Wrapper>
        <Value>
            {opt.map((value, i) => <input 
                type="text" 
                placeholder="Your Select name" 
                onBlur={e => Edit(e.target.value, i)} 
                key={i} 
                defaultValue={value}
                style={{marginBottom: '10px'}}
            />)}
            <Button onClick={Add} />
        </Value>
    </Wrapper>;
}