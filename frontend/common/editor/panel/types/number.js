import React, { useState, useRef } from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
    width: 100%;

    & input {
        -webkit-appearance: none;
        appearance: none;
        width: 48px;
        height: 40px;
        margin-left: 10px;
        text-align: center;
        border: none;
        padding: 0px 8px;
        box-sizing: border-box;
        background: var(--color-primary);
        box-shadow: 0px 0px 0px 1px var(--border-color) inset;
        transform: ${props => props.wrap == true ? 'translateY(-30px)' : 'translateY(0px)'};
        float: ${props => props.wrap == true ? 'right' : ''};
    }

    & input[type=number]::-webkit-inner-spin-button {
    -webkit-appearance: none;
    }

    & input[type=range]{
        -webkit-appearance: none;
        appearance: none;
        width: ${props => props.wrap == true ? window.innerWidth < 450 ? '100%' :' 170px' : 'calc(100% - 60px)'};
        padding: 0px;
        margin-left: 0px;
        height: 6px;
        outline: none;
        border-radius: 4px;
        background: var(--color-primary); 
        transform: ${props => props.wrap == true ? 'translateY(30px)' : 'translateY(0px)'};
    }

    & input[type=range]::-webkit-slider-thumb {
        -webkit-appearance: none;
        appearance: none;
        width: 20px;
        height: 20px;
        border-radius: 20px;
        cursor: pointer;
        background: var(--color-secundary);
    }
`;

export default function Number({value, change, opt, wrap, blur}) {
    const number = useRef();
    const text = useRef();
    const [start, setStart] = useState(0);

    const Change = () => {
        text.current.value = value.toString();
        number.current.value = value;

        setStart(value);
    }

    if(start != value && wrap == true) Change();
    return <Wrapper wrap={wrap}>
        <input 
            type="range"
            ref={number}
            step={(opt.step == undefined ? "1" : opt.step)}
            max={(opt.max == undefined ? "100" : opt.max)}
            min={(opt.min == undefined ? "0" : opt.min)}
            defaultValue={value}
            onChange={e => {
                text.current.value = number.current.value.toString();
                if(change != undefined) change(e.target.value)
            }}
            onBlur={e =>{if(blur != undefined) blur(e.target.value)}}
        />
        <input
            type="text"
            ref={text}
            defaultValue={value.toString()}
            onChange={e => {
                number.current.value = parseFloat(text.current.value);
                if(change != undefined) change(e.target.value);
            }}
            onBlur={e =>{if(blur != undefined) blur(e.target.value)}}
        />
    </Wrapper>;
}