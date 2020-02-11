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
    background: ${props => {
        if(props.color == undefined) return 'url(data:image/svg+xml, '+encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="400" height="400" fill-opacity="0.3" ><rect x="200" width="200" height="200" /><rect y="200" width="200" height="200" /></svg>')+') 0% 0% / 18px 18px var(--color-default); background-size: 18px !important';
        return 'url('+props.color+')' 
    }};
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
    
        ${props => props.clean == undefined ? `
        &:before{
            content: '';
            position: absolute;
            top: 5px;
            left: 5px;
            width: calc(100% - 10px);
            height: calc(100% - 10px);
            box-shadow: 0px 0px 0px 1px var(--border-color) inset;
        }        
        &:hover::before{
            background-color: var(--color-secundary);
            opacity: 0.8;
            background-image: url(data:image/svg+xml, ${encodeURIComponent('<svg version="1.1" id="Camada_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 1125 1120" style="enable-background:new 0 0 1125 1120;" xml:space="preserve"><g><polygon fill="#FFF" points="0,888.13 0,1120.03 245.54,1120.03 934.43,431.14 695.71,192.42 	"/><path fill="#FFF" d="M1105.42,151.96L973.04,19.58c-25.38-25.38-66.26-26.19-92.63-1.85l-79,72.92c-3.73,3.45-6.9,7.25-9.66,11.26l-41.47,35.94 l231.9,231.9l95.49-95.49l0,0l27.75-27.75C1131.53,220.41,1131.53,178.07,1105.42,151.96z"/></g></svg>')});
            background-position: center;
            background-size: 20px;
            background-repeat: no-repeat;
        }     
        &:active::before{
            background-color: var(--color-secundary);
            opacity: 0.8;
            background-image: url(data:image/svg+xml, ${encodeURIComponent('<svg version="1.1" id="Camada_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 1125 1120" style="enable-background:new 0 0 1125 1120;" xml:space="preserve"><g><polygon fill="#FFF" points="0,888.13 0,1120.03 245.54,1120.03 934.43,431.14 695.71,192.42 	"/><path fill="#FFF" d="M1105.42,151.96L973.04,19.58c-25.38-25.38-66.26-26.19-92.63-1.85l-79,72.92c-3.73,3.45-6.9,7.25-9.66,11.26l-41.47,35.94 l231.9,231.9l95.49-95.49l0,0l27.75-27.75C1131.53,220.41,1131.53,178.07,1105.42,151.96z"/></g></svg>')});
            background-position: center;
            background-size: 20px;
            background-repeat: no-repeat;
        }
        ` : ''};
    
        ${props => props.preview != undefined ? `
        &:before{
            content: '';
            position: absolute;
            top: 0px;
            left: 0px;
            width: 100%;
            height: 100%;
            box-shadow: 0px 0px 0px 1px var(--border-color) inset;
        }` : ''};
`;

export default function View({color, type, size, clean, edit, open, preview}){
    let click = edit == undefined ? () => {} : edit;
    let modal = edit == undefined ? () => {} : open;

    return <Content>
        <BlockPart type="top" parent={type} size={size} color={color.top} clean={clean} onClick={() => modal(e=> click(e, 'top'))} preview={preview} />

        <BlockPart type="left" parent={type} size={size} color={color.left} clean={clean} onClick={() => modal(e=> click(e, 'left'))} preview={preview} />
        <BlockPart type="right" parent={type} size={size} color={color.right} clean={clean} onClick={() => modal(e=> click(e, 'right'))} preview={preview} />
        <BlockPart type="inner" parent={type} size={size} color={color.inner} clean={clean} onClick={() => modal(e=> click(e, 'inner'))} preview={preview} />
        <BlockPart type="bottom" parent={type} size={size} color={color.bottom} clean={clean} onClick={() => modal(e=> click(e, 'bottom'))} preview={preview} />

        <BlockPart type="bottom-left" parent={type} size={size} color={color.bottomLeft} clean={clean} onClick={() => modal(e=> click(e, 'bottomLeft'))} preview={preview} />
        <BlockPart type="bottom-right" parent={type} size={size} color={color.bottomRight} clean={clean} onClick={() => modal(e=> click(e, 'bottomRight'))} preview={preview} />
        <BlockPart type="top-left" parent={type} size={size} color={color.topLeft} clean={clean} onClick={() => modal(e=> click(e, 'topLeft'))} preview={preview} />
        <BlockPart type="top-right" parent={type} size={size} color={color.topRight} clean={clean} onClick={() => modal(e=> click(e, 'topRight'))} preview={preview} />
    </Content>;
}