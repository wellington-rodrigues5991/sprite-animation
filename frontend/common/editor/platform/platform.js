import React, { useState } from 'react';
import styled from 'styled-components';
import View from '../block/view';

const Block = styled.div`
    width: ${props => props.data.w}px;
    height: ${props => props.data.h}px;
    position: absolute;
    top: ${props => props.data.y}px;
    left: ${props => props.data.x}px;
    min-width: ${props => props.data.min}px;
    min-height: ${props => props.data.min}px;
`;

export default function Platform({color, x, y, w, h, down, id, size, block}){
    const data = {
        x: (window.innerWidth/2) + x * size, 
        y: (window.innerHeight/2) + y * size, 
        w:w * size, 
        h:h * size,
        min: size * 1.1
    };

    return <Block
        data={data} 
        onTouchStart={ e => down(e, 'platform', id) }
        onMouseDown={ e => down(e, 'platform', id) } 
    >
        <View type={block.type} clean={true} size={(size/2)+'px'} color={block.data} />
    </Block>;
}