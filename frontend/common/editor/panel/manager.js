import React, {useState} from 'react';
import styled from 'styled-components';

import Platform from './platform';
import Grid from './grid';
import Block from './block';

const Panel = styled.div`
    width: 100%;
    height: auto;
    max-height: calc(100vh - 130px);
    transition: all 0.5s;
    box-sizing: border-box;
    position: relative;
    overflow: hidden;
    border-bottom: 1px solid  var(--border-color);
    transform: translateY(1px)
`;

const Close = styled.button`
    border: none;
    width: 40px;
    height: 40px;
    background-image: url(data:image/svg+xml, ${props => encodeURIComponent('<svg version="1.1" id="Camada_1" focusable="false" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 24 24" style="enable-background:new 0 0 24 24;" xml:space="preserve"><path fill="'+document.documentElement.style.getPropertyValue('--text-color')+'" d="M19,6.4L17.6,5L12,10.6L6.4,5L5,6.4l5.6,5.6L5,17.6L6.4,19l5.6-5.6l5.6,5.6l1.4-1.4L13.4,12L19,6.4z"/></svg>')});
    background-size: 80%;
    background-position: center;
    background-repeat: no-repeat;
    background-color: var(--color-default);
    box-shadow: 0px 0px 0px 1px var(--border-color) inset;
    position: absolute;
    top: 0px;
    left: 0px;    
`;

const Content = styled.div`
    width: 100%;
    box-sizing: border-box;
`

export default function PanelManager({active, set, get, setm}){
    const close = () => {
        const data = Object.assign({}, get);

        data.selection.block = -1;
        setm(data);
        set({});
    }
    return <>
        <Panel selection={active}>
            <Content>
                {active.key == 'grid' && <Grid get={get} set={setm} />}
                {active.key == 'platform' && <Platform get={get} set={setm} id={active.id} />}
                {active.key == 'block' && <Block get={get} set={setm} id={active.id} />}
            </Content>
            <Close onClick={close} />
        </Panel>
    </>;
}