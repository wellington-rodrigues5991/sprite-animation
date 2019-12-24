import React, {useState} from 'react';
import styled from 'styled-components';

const Container = styled.div`
    width: 72.50px;
    height: 30px;
    background: black;
    position: absolute;
    top: ${props => props.position.y}px;
    left: ${props => props.position.x}px;
    color: white;
    font-size: 12pt;
    display: flex;
`;

const Link = styled.div`
    text-align: center;
    line-height: 30px;
    heihgt: 30px;
    float: left;
    padding: 0px 15px;
    cursor: pointer
`;

export default function ContextMenu(){
    const [position, setPosition] = useState({x: 0, y: 0, active: false});

    window.config.selection.onSelect = (target) => {setPosition({x: target.x + (target.width/2 - 36.25), y: target.bottom + 5, active: true})}
    window.config.selection.onDeslect = () => {setPosition({x: 0, y: 0, active: false})}

    return <>
    {position.active && <Container className="tip" position={position}>
        <Link onClick={window.config.delete}>Delete</Link>
    </Container>}
    </>;
}