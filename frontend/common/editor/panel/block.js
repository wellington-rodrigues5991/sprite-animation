import React from 'react';
import Line from './line';
import styled from 'styled-components';
import View from '../block/view';

const Viewer = styled.div`
    width: calc(100% - 30px);
    height: 200px;
    margin: 0 auto;
    margin-top: 15px;
    position: relative;
`;
const Content = styled.div`
    width: calc(100% - 35px);
    height: 40px;
    background: var(--border-color);
    margin: 0 auto;
    margin-top: 10px;
    margin-bottom: 15px;
`;
const Button = styled.div`
    width: 25px;
    height: 25px;
    background: var(--color-secundary);
    float: right;
    margin-left: 10px;
    cursor: pointer;
`;

const Bar = styled.div`
    width: 100%; 
    height: 40px;
    padding: 7.5px 10px;
    box-sizing: border-box;
`;

export default function Block({get, set, id}){
    const remove = () => {
        const data = Object.assign({}, get);
        let arr = data.block.movable.blocks.filter((value, i) => {
            if(i !== id) return value;
        });

        if(arr.length > 0) data.block.movable.blocks = arr;
        data.block.open({key: undefined});
        set(data);
    };

    const change = (type, key) => {
        const data = Object.assign({}, get);
        
        if(key != undefined) data.block.movable.blocks[id].data[key] = type;
        else data.block.movable.blocks[id].type = type;
        set(data);
    }

    let type = get.block.movable.blocks[id].type;
    return <>
        <Bar>
            <Button onClick={remove} />
        </Bar>
        <Viewer>
            <View open={get.open} type={type} size='50px' color={get.block.movable.blocks[id].data} edit={change} />
        </Viewer>
        <Content>
            <button onClick={() => change(0)} >0</button>
            <button onClick={() => change(1)} >0</button>
            <button onClick={() => change(2)} >0</button>
            <button onClick={() => change(3)} >0</button>
        </Content>
    </>;
}