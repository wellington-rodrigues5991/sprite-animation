import React, {useRef} from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
    width: 100%;
    position: relative
`;

const Label = styled.div`
    width: ${props => props.select ? 'calc(100% - 75px)' : 'calc(100% - 10px)'};
    font-size: 9pt;
    position: absolute;
    top: 5px;
    left: 5px;
    text-transform: uppercase;
`;

const Value = styled.div`
    width: 100%;
    position: relative;
`;

const Text = styled.input`
	-webkit-appearance: none;
    appearance: none;
    width: ${props => props.select ? 'calc(100% - 65px)' : '100%'};
    box-sizing: border-box;
    height: 55px;
    padding: 0px 8px;
    padding-top: 15px;
    background-color: var(--color-primary);
    outline: none;
    box-shadow: 0px 0px 0px 1px var(--border-color) inset;
    border: none;
    text-transform: capitalize;
    transition: all 0.5s;
`;

const Delete = styled.button`
    width: 55px;
    height: 55px;
    position: absolute;
    top: 0px;
    right: 0px;
    transform: ${props => props.select ? 'scale(1)' : 'scale(0)'};
    transition: all 0.5s;
    border: none;
    background: none;
    background: url(data:image/svg+xml, ${props => encodeURIComponent('<svg version="1.1" id="Camada_1" focusable="false" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 24 24" style="enable-background:new 0 0 24 24;" xml:space="preserve"><path fill="'+document.documentElement.style.getPropertyValue('--text-color')+'" d="M6,19c0,1.1,0.9,2,2,2h8c1.1,0,2-0.9,2-2V7H6V19z M19,4h-3.5l-1-1h-5l-1,1H5v2h14V4z"/></svg>')});
    background-size: 30px;
    background-position: center;
    background-repeat: no-repeat;
`;


export default function Input({label, type, onchange, remove, text, select, setSelect}){
    const ref = useRef();

    if(!select && ref.current != undefined) ref.current.value = text;

    return <Wrapper>
        <Value>
            <Text
                type={type != undefined ? type : 'text'}
                defaultValue={text != undefined ? text : ''}
                onBlur={onchange != undefined ? onchange : () => {}}
                onFocus={remove != undefined ? () => setSelect(true) : () => {}}
                select={select}
                ref={ref}
            />
            {remove != undefined && <Delete select={select} onClick={remove} />}
        </Value>
        <Label select={select}>{label}</Label>
    </Wrapper>;
}