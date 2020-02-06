import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import View from './view';

const Container = styled.div`
    width: 50px;
    height: 50px;
    position: relative;
    margin-right: 10px
`;
const Content = styled.div`
    width: 50px;
    height: 50px;
    position: absolute;
    transition: all 0.1s;
    background: ${props => props.background};
    ${props => props.i == props.selection ? 'box-shadow: 0px 0px 0px 4px var(--color-secundary);' : ''}
`;

export default function Block({color, down, id, type, selection}){

    return <Container>
        <Content 
            onTouchStart={ e => down(e, 'block', id) }
            onMouseDown={ e => down(e, 'block', id) }
            i={id}
            selection={selection}
        >
            <View type={type} size='19px' color={color} clean={true}/>
        </Content>
    </Container>;
}