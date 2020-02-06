import React, {useState} from 'react';
import styled from 'styled-components';

import Platform from './platform';
import Grid from './grid';
import Block from './block';

const Panel = styled.div`
    width: 100%;
    height: auto;
    transition: all 0.5s;
    box-sizing: border-box;
    position: relative;
    overflow: hidden;
    border-bottom: 1px solid  var(--border-color);
    transform: translateY(1px)
`;

const Close = styled.div`
    width: 40px;
    height: 40px;
    background: var(--color-default);
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