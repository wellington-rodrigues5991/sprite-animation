import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import Block from './block';
import PanelManager from '../panel/manager';

const Panel = styled.div`
    width: calc(100% - 40px);
    max-width: ${props => props.max.key == undefined ? '100%' : window.innerWidth > 500 ? '350px' : '100%'};
    background: var(--color-default);
    position: fixed;
    bottom: 20px;
    display: ${props => props.active ? 'none' : 'block'};
    left: 20px;
    transition: all 0.5s;
    box-shadow: 0px 0px 0px 1px var(--border-color) inset;
`;

const Button = styled.div`
    width: 50px;
    height: 70px;
    bottom: 0px;
    right: 0px;
    position: absolute;
    transform: scale(1);
    z-index: 10000;
`;
const Btn = styled.div`
    width: 100%;
    height: 70%;
    background: var(--color-default);
    border-left: 1px solid var(--border-color);
    border-right: 1px solid var(--border-color);
    border-top: 1px solid var(--border-color);
`;

const Content = styled.div`
    width: calc(100% - 50px);
    height: 70px;
    padding: 10px;
    box-sizing: border-box;
    overflow-x: auto;
    overflow-y: hidden;
`;
const Wrapper = styled.div`
    display: flex;
    width: ${props => (props.size) * 60}px;
    min-width: calc(100% - 60px);
    justify-content: flex-end;
    margin-left: 60px;
`;

export default function BlockPanel({mailer, setMailer}){
    const [panel, setPanel] = useState({});
    const [movableBlock, setMovableBlock] = useState(mailer.block.movable);

    const Add = () => {
        const b = Object.assign({}, movableBlock);
        let temp = {
            data: {
                top:undefined,
                inner: undefined
            },
            type: 1
        }

        b.blocks.push(temp);
        setMovableBlock(b);
    }

    const Start = (e, type, id) => {
        const pos = e.target.getBoundingClientRect();
        let event = { x: e.clientX, y: e.clientY };

        if(e.type == 'touchstart') event = { x: e.touches[0].clientX, y: e.touches[0].clientY };

        let data = {
            active: true, 
            pos: {x: pos.x, y: pos.y}, 
            event: event, 
            elem: e.currentTarget,
            type: 'block',
            blocks: movableBlock.blocks,
            id: id
        };

        e.currentTarget.style.position = 'fixed';
        e.currentTarget.style.zIndex = '10';
        e.currentTarget.style.transform = 'scale(0.8)';
        e.currentTarget.style.transition = 'none';

        e.currentTarget.style.left = pos.x+'px';
        e.currentTarget.style.top = pos.y+'px';

        mailer.block.open({key: undefined });
        updateMailer(data, id);
    }

    const updateMailer = (arg, select) => {
        let data = Object.assign({}, mailer);

        if(data.block == undefined) data.block = {};

        data.block.add = Add;
        data.block.update = Update;
        data.block.open = key => setPanel(key);
        data.block.movable = (arg == undefined ? movableBlock : arg);
        //data.platform.children = platform;
        if(select != undefined) data.selection.block = select; 

        setMailer(data);
    }

    const Update = () => {
        const data = Object.assign({}, movableBlock);
        data.active = false;
        data.elem = null;

        setMovableBlock(data);
        updateMailer();
    }

    if(mailer.block.add == undefined) updateMailer();
    if(mailer.block.add != undefined && mailer.block.movable.blocks != movableBlock.blocks) setMovableBlock(mailer.block.movable);

    return <Panel active={mailer.background.status} size={movableBlock.blocks.length} max={panel}>
        <PanelManager active={panel} set={setPanel} get={mailer} setm={setMailer}/>
        <Content>
            <Wrapper size={movableBlock.blocks.length}>
            {movableBlock.blocks.map((value, i) => <Block 
                key={i} 
                id={i}
                color={value.data}
                type={value.type}
                down={Start}
                selection={mailer.selection.block}
            />)}
            </Wrapper>
        </Content>
        <Button>
            <Btn onClick={Add} />
            <Btn style={{height: '30%', borderBottom: '1px solid var(--border-color)'}} onClick={() => setPanel({key: 'grid'})} />
        </Button>
    </Panel>;
}