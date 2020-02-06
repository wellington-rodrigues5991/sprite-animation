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

export default function Number({value, change, opt}) {
    const before = (e, key) => {
        const d = Object.assign({}, opt);

        d[key] = parseFloat(e);
        change(d, 'opt')
    }

    console.log()
    return <Wrapper>
        <input type="number" placeholder={'Minimum'} onChange={e => before(e.target.value, 'min')} defaultValue={opt.min} />
        <input type="number" placeholder={'Maximum'} onChange={e => before(e.target.value, 'max')} defaultValue={opt.max} />
        <input type="number" placeholder={'Step'} onChange={e => before(e.target.value, 'step')} defaultValue={opt.step} />
    </Wrapper>;
}