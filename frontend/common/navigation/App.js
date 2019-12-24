import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import Block from './Block';
import {customVcc} from './../VCC';

const Container = styled.div`
    position: fixed; 
    bottom: 25px;
    right: 0px;
    min-width: 40px;
    max-width: ${window.innerWidth}px;
    overflow-x: auto;
    overflow-y: hidden;
`;
const Tab = styled.div`
    background: black;
    padding: 15px;
    height: 40px;
`;

const Wrapper = styled.div`
    float: left
`;

const Button = styled.div`
    width: 40px;
    height: 40px;
    background: blue;
    float: left;
    margin-left: 35px;

    &:last-child{
        margin-left: 15px;
    }
    &:hover{background: yellow}
`;

export default function App(){
    const [score, setScore] = useState([[Math.random() * 255, Math.random() * 255, Math.random() * 255]]);
    const [render, setRender] = useState(false);

    useEffect(() => {
        customVcc.register('100%', '500px');
    }, []);

    
    function add(){
        customVcc.showModal('image', 'http://www.xionplayer.com/skins/junior_alves/Mini%20Player%20Mp3_full.jpg', (newUrl) => {
            const newValue = JSON.parse(JSON.stringify(score));
            newValue.image = newUrl;

            console.log(score, newUrl)
            
            //customVcc.change(newValue);
            //customVcc.save();
        });
        //const color = [Math.random() * 255, Math.random() * 255, Math.random() * 255]
        //setScore([color].concat(score))
    }

    function select(){
        if(!render) setRender(true);
        else setRender(false);
    }

    function remove(i){
        setScore(window.arrayRemove(score, score[i]))
    }
    
    return <Container>
        <Tab style={{width: ((score.length + 2) * 55 + 5)+'px'}}>
            <Wrapper>{score.map((map, i) => <Block remove={remove} i={i} color={map} type={render} key={i}/>)}</Wrapper>
            <Button onClick={add}/>
            <Button onClick={select}/>
        </Tab>
    </Container>
}