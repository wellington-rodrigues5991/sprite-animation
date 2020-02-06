import React from 'react';
import styled from 'styled-components';

const Content = styled.div`
    width: 100%;
    height: 100%;
    position: absolute;
    transition: all 0.1s;
    background: ${props => props.background};
`;

const BlockPart = styled.div`
    position: absolute;
    background: ${props => props.color == undefined ? 'var(--border-color)' : 'url('+props.color+')' };
    box-shadow: ${props => props.clean == undefined ? '0px 0px 0px 5px var(--color-default) inset' : ''};
    transition: all 0.3s;
    ${props => {
        let data = '';
        let size = '0px';
        // eslint-disable-next-line default-case
        switch(props.type){
            case "top-left":{
                if(props.parent == 3) size = props.size;
                if(props.parent == 2) size = '50%';
                data = `width: ${size}; height: ${size}; left: 0px; top: 0px; background-size: ${size} auto; background-position: top left;`
                break;
            }
            case "top-right":{
                if(props.parent == 3) size = props.size;
                if(props.parent == 2) size = '50%';
                data = `width: ${size}; height: ${size}; right: 0px; top: 0px; background-size: ${size} auto; background-position: top right;`
                break;
            }
            case "bottom-left":{
                if(props.parent == 3) size = props.size;
                if(props.parent == 2) size = '50%';
                data = `width: ${size}; height: ${size}; left: 0px; bottom: 0px; background-size: ${size} auto; background-position: bottom left;`
                break;
            }
            case "bottom-right":{
                if(props.parent == 3) size = props.size;
                if(props.parent == 2) size = '50%';
                data = `width: ${size}; height: ${size}; right: 0px; bottom: 0px; background-size: ${size} auto; background-position: bottom right;`
                break;
            }
            case "top":{
                if(props.parent != 1 || props.parent != 3) size = {left: '0%', height: '0%', b: '0px'};
                if(props.parent == 3) size = {left: props.size, height: props.size, b: props.size};
                if(props.parent == 1) size = {left: '0px', height: props.size, b: props.size};
                data = `height: ${size.height}; right: ${size.left}; left: ${size.left}; top: 0px; background-size: auto ${size.b};`;
                break;
            }
            case "bottom":{
                if(props.parent == 3) size = props.size;
                data = `height: ${size}; right: ${size}; left: ${size}; bottom: 0px; background-size: auto ${size};`
                break;
            }
            case "left":{
                if(props.parent == 3) size = props.size;
                data = `width: ${size}; left: 0px; top: ${size}; bottom: ${size}; background-size: auto ${size};`
                break;
            }
            case "right":{
                if(props.parent == 3) size = props.size;
                data = `width: ${size}; right: 0px; top: ${size}; bottom: ${size}; background-size: auto ${size};`
                break;
            }
            case "inner": {
                if(props.parent != 0 || props.parent != 1 || props.parent != 3) size = {top: '50%', bottom: '50%', left: '50%', right: '50%', b: 'auto', b2: '0px'};
                if(props.parent == 3) size = {top: props.size, bottom: props.size, left: props.size, right: props.size, b: 'auto', b2: props.size};
                if(props.parent == 1) size = {top: props.size, bottom: '0px', left: '0px', right: '0px', b2: 'auto', b: '100%'};
                if(props.parent == 0) size = {top: '0%', bottom: '0%', left: '0%', right: '0%', b: 'auto', b2: '100%'};
                data = `left: ${size.left}; right: ${size.right}; top: ${size.top}; bottom: ${size.bottom}; background-size: ${size.b} ${size.b2};`;
                break;
            }
        }

        return data
    }}
`;

export default function View({color, type, size, clean, edit, open}){
    let click = edit == undefined ? () => {} : edit;
    let modal = edit == undefined ? () => {} : open;

    return <Content>
        <BlockPart type="top" parent={type} size={size} color={color.top} clean={clean} onClick={() => modal(e=> click(e, 'top'))} />

        <BlockPart type="left" parent={type} size={size} color={color.left} clean={clean} onClick={() => modal(e=> click(e, 'left'))} />
        <BlockPart type="right" parent={type} size={size} color={color.right} clean={clean} onClick={() => modal(e=> click(e, 'right'))} />
        <BlockPart type="inner" parent={type} size={size} color={color.inner} clean={clean} onClick={() => modal(e=> click(e, 'inner'))} />
        <BlockPart type="bottom" parent={type} size={size} color={color.bottom} clean={clean} onClick={() => modal(e=> click(e, 'bottom'))} />

        <BlockPart type="bottom-left" parent={type} size={size} color={color.bottomLeft} clean={clean} onClick={() => modal(e=> click(e, 'bottomLeft'))} />
        <BlockPart type="bottom-right" parent={type} size={size} color={color.bottomRight} clean={clean} onClick={() => modal(e=> click(e, 'bottomRight'))} />
        <BlockPart type="top-left" parent={type} size={size} color={color.topLeft} clean={clean} onClick={() => modal(e=> click(e, 'topLeft'))} />
        <BlockPart type="top-right" parent={type} size={size} color={color.topRight} clean={clean} onClick={() => modal(e=> click(e, 'topRight'))} />
    </Content>;
}