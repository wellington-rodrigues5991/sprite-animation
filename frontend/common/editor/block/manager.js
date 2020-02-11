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
`;
const Btn = styled.div`
    width: 100%;
    height: 65%;
    background: var(--color-default);
    border-left: 1px solid var(--border-color);
    border-right: 1px solid var(--border-color);
    border-top: 1px solid var(--border-color);
    position: relative;
    cursor:pointer;

    &:after{
        content: '';
        position: absolute;
        background-image: url(data:image/svg+xml, ${props => encodeURIComponent('<svg version="1.1" id="Camada_1" focusable="false" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 24 24" style="enable-background:new 0 0 24 24;" xml:space="preserve"><path fill="'+document.documentElement.style.getPropertyValue('--text-color')+'" d="M19,6.4L17.6,5L12,10.6L6.4,5L5,6.4l5.6,5.6L5,17.6L6.4,19l5.6-5.6l5.6,5.6l1.4-1.4L13.4,12L19,6.4z"/></svg>')});
        background-size: 50%;
        background-position: center;
        background-repeat: no-repeat;
        width: 100%;
        height: 100%;
        transform: rotate(45deg);
        display: ${props => props.icon == undefined ? 'block' : 'none'};
    }
`;

const BtnTag = styled.div`
    width: 100%;
    height: 35%;
    background: var(--color-default);
    border: 1px solid var(--border-color);
    position: relative;
    cursor:pointer;

    &:after{
        content: 'GRID';
        line-height: 22px;
        font-size: 8pt;
        position: absolute;
        width: calc(100% - 5px);
        height: 100%;
        padding-left: 17px;
        box-sizing: border-box;
        background-image: url(data:image/svg+xml, ${props => encodeURIComponent('<svg version="1.1" id="Camada_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 1125 1120" style="enable-background:new 0 0 1125 1120;" xml:space="preserve"><path fill="'+document.documentElement.style.getPropertyValue('--text-color')+'" d="M997.14,880.08c-2.2,4.1-3.88,10.09-7.71,13.93c-27.85,27.92-55.93,55.63-84.57,82.74c-3.51,3.32-11.2,4.67-16.17,3.53 c-16.11-3.7-32.2-8.06-47.66-13.87c-29.65-11.15-58.79-23.67-88.34-35.1c-4.13-1.6-9.4-0.32-14.14-0.18	c-1.1,0.03-2.18,0.86-3.27,1.33c-11.66,5.03-26.04,7.41-34.21,15.83c-8.2,8.44-10.07,22.95-14.96,34.71	c-11.83,28.42-23.66,56.85-35.82,85.13c-2.31,5.37-5.23,11.15-9.51,14.84c-4.81,4.15-11.43,8.55-17.35,8.67	c-38.54,0.77-77.1,0.33-115.66,0.45c-9.33,0.03-16.36-4.26-20.34-12.02c-11.87-23.16-23.53-46.45-34.4-70.09	c-8.66-18.82-15.88-38.3-24.18-57.29c-1.36-3.12-4.54-6.24-7.65-7.64c-11.6-5.24-23.42-10.06-35.4-14.33	c-3.1-1.1-7.49-0.49-10.67,0.83c-34.44,14.36-68.6,29.4-103.19,43.37c-11.11,4.49-23.17,6.97-35.03,9.11	c-3.9,0.7-9.66-1.4-12.63-4.24c-28.71-27.47-57.02-55.35-85.4-83.15c-5.62-5.5-7.26-12.57-4.92-19.7	c7.46-22.74,14.87-45.54,23.46-67.86c8.29-21.55,18.22-42.46,26.92-63.87c1.46-3.6,1-8.42,0.15-12.4	c-0.91-4.26-4.07-8.05-4.98-12.31c-4.32-20.3-18-29.12-36.82-35.56c-32.73-11.19-64.54-25.09-96.68-38	c-3.81-1.53-7.23-4.04-10.9-5.97c-11.17-5.86-15.44-14.68-15.17-27.57c0.72-34.98,0.51-69.99,0.09-104.98	c-0.12-10.4,3.45-18.41,12.32-22.8c23.59-11.67,47.35-23.02,71.42-33.65c19.22-8.49,39.08-15.53,58.45-23.69	c3.37-1.42,5.74-5.23,8.56-7.96c0.19-0.19,0.23-0.54,0.34-0.82c4.99-12.33,14.02-24.72,13.84-36.98	c-0.18-12.26-9.66-24.35-14.89-36.58c-12.09-28.31-24.2-56.63-36-85.06c-2.01-4.85-2.8-10.27-3.7-15.5	c-1.4-8.14,1.05-14.77,7.22-20.73c26.87-25.96,53.61-52.07,79.94-78.58c5.97-6.01,12.26-8.39,19.85-6.33	c16.26,4.39,32.69,8.5,48.43,14.39c29.67,11.1,58.84,23.53,88.39,34.98c3.65,1.41,8.66,1.27,12.43,0.01	c9.81-3.28,19.16-7.94,28.93-11.35c7.3-2.55,11.19-6.98,14.08-14.29c14.48-36.62,29.59-72.98,44.71-109.34	c2.02-4.87,5.35-9.19,8.08-13.77c5.37-9,13.2-12.59,23.75-12.5c36.18,0.33,72.37,0.36,108.54-0.02	c10.98-0.11,19.24,3.77,24.31,13.16c8.85,16.4,17.81,32.8,25.47,49.77c11.08,24.56,20.8,49.74,31.7,74.39	c1.89,4.28,6.14,8.6,10.37,10.56c12.32,5.72,25.21,14.21,37.84,14.13c12.26-0.07,24.38-9.61,36.72-14.61	c30.17-12.24,60.36-24.42,90.67-36.31c14.79-5.8,27.06-3.7,38.94,8.97c22.3,23.76,45.89,46.39,69.9,68.45 c11.54,10.6,14.26,21.97,9.47,35.86c-6.08,17.63-12.09,35.31-19.05,52.59c-9.29,23.08-19.3,45.87-29.37,68.62 c-2.34,5.28-3.05,9.84-0.18,14.99c1.86,3.35,3.7,6.92,4.5,10.62c4.54,20.83,18.48,30.06,38.05,36.58 c32.52,10.84,64.04,24.72,95.89,37.55c4.89,1.97,9.29,5.2,13.89,7.88c8.43,4.92,12.18,12.06,12.1,22.04 c-0.29,36.18-0.35,72.37,0.04,108.54c0.11,10.04-3.37,17.73-11.8,22.21c-17.75,9.44-35.6,18.83-54.01,26.86 c-24.97,10.89-50.58,20.28-75.7,30.82c-3.84,1.61-7.79,5.38-9.53,9.15c-5.58,12.06-14.16,24.65-13.96,36.92 c0.2,12.27,9.66,24.35,14.88,36.59c12.1,28.32,24.25,56.61,36,85.07C994.33,865.18,995.11,871.8,997.14,880.08z M563.09,746.3 c104.32-0.15,189.83-84.5,189.28-186.72c-0.56-102.64-85.02-185.6-189.21-185.83c-104.06-0.24-189.93,83.92-190,186.21 C373.08,662.09,459.07,746.44,563.09,746.3z"/></svg>')});
        background-size: 25%;
        background-position: 5px center;
        background-repeat: no-repeat;
    }
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
                preview={true}
                down={Start}
                selection={mailer.selection.block}
            />)}
            </Wrapper>
        </Content>
        <Button>
            <Btn onClick={Add} />
            <BtnTag icon={true} onClick={() => setPanel({key: 'grid'})} />
        </Button>
    </Panel>;
}