import React from 'react';
import styled from 'styled-components';

import Bool from './types/bool';
import Select from './types/select';
import Number from './types/number';
import Text from './types/text';

const Wrapper = styled.div`
    width: 100%;
    box-sizing: border-box;
    padding: 10px;
    padding-bottom: 0px;
    display: flex
`;

const Title = styled.div`
    width: ${props => props.wrap ? '40px' : '120px'};
    height: 35px;
    text-transform: capitalize;
    font-size: 12pt;
`;

const Value = styled.div`
    width: ${props => props.wrap ? 'calc(100% - 50px)' : 'calc(100% - 130px)'};
    min-height: 35px;
    margin-left: 10px;
`;

export default function Line({title, value, type, change, opt, wrap, blur}){
    return <Wrapper>
        <Title wrap={true}>{title}</Title>
        <Value wrap={true}>
            {type == 'text' && <Text change={change} value={value} opt={opt == undefined ? '' : opt} />}
            {type == 'number' && <Number change={change} value={value} opt={opt == undefined ? {} : opt} wrap={wrap} blur={blur} />}
            {type == 'bool' && <Bool change={change} value={value} />}
            {type == 'select' && <Select change={change} value={value} opt={Array.isArray(opt)? opt : []} />}
        </Value>
    </Wrapper>;
}

/*
    text
    number
    bool
    select

*/