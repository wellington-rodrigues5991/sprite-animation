import React from 'react';
import styled from 'styled-components';

import Select from './types/select';
import Number from './types/number';
import Text from './types/text';

const Wrapper = styled.div`
    width: 100%;
    box-sizing: border-box;
    padding: 10px;
    display: flex
`;

const Title = styled.div`
    width: 120px;
    height: 35px;
    text-transform: capitalize;
    font-size: 12pt;
    line-height: 35px;
    position: relative;

    & input{
        -webkit-appearance: none;
        appearance: none;
        width: 100%;
        box-sizing: border-box;
        height: 40px;
        padding: 0px 8px;
        background-color: var(--color-primary);
        outline: none;
        box-shadow: 0px 0px 0px 1px var(--border-color) inset;
        border: none;
    }
`;

const Value = styled.div`
    width: calc(100% - 130px);
    min-height: 35px;
    margin-left: 10px;
    
`;

const Choose = styled.select`
    -webkit-appearance: none;
    appearance: none;
    width: 100%;
    box-sizing: border-box;
    height: 40px;
    padding: 0px 8px;
    background-image: url(data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23157afb%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E);
    background-size: 0.85em, 100%;
    background-repeat: no-repeat;
    background-position: right 0.7em top 50%, 0px 0px;
    background-color: var(--color-primary);
    outline: none;
    box-shadow: 0px 0px 0px 1px var(--border-color) inset;
    border: none;
    text-transform: capitalize;

    & option{
        background: pink
    }
`;

const Option = styled.div`
    width: calc(100% - 10px);
    padding: 10px 0px;
    padding-top: 0px;
    padding-bottom: 20px;
`;

export default function Line({title, value, type, change, opt}){
    return <>
    <Wrapper>
        <Title><input type="text" defaultValue={title} placeholder="Label" onChange={e => change(e.target.value, 'title')} /></Title>
        <Value>
            <Choose onChange={e => change(e.target.value, 'type')} defaultValue={type}>
                <option value='bool'>Bool</option>
                <option value='number'>Number</option>
                <option value='select'>Select</option>
                <option value='text'>Text</option>
            </Choose>
        </Value>
    </Wrapper>
    {type != 'bool' && <Option>
        {type == 'text' && <Text change={change} value={value} opt={opt == undefined ? '' : opt} />}
        {type == 'number' && <Number change={change} value={value} opt={opt == undefined ? {} : opt} />}
        {type == 'select' && <Select change={change} value={value} opt={Array.isArray(opt)? opt : []} />}
    </Option>}
    </>;
}

/*
    <Title>Placeholder</Title>
    <Value><input type="text" /></Value>
*/