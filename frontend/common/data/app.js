import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import Canvas from './canvas';
import View from './view';

const Content = styled.div`
    width: 350px;
    background: var(--color-base);
    box-shadow: 0px 0px 0px 1px var(--back-default);
    position: fixed;
    bottom: 10px;
    left: 10px;
    box-sizing: border-box;
    padding: 10px;
    padding-top: 0px;

    @media only screen and (max-width: 360px){
        & {width: calc(100% - 0px);}
    }
`;

const Button = styled.button`   
    appearance: none;
    -webkit-appearance: none;
    border: none;
    width: 30px;
    height: 30px;
    background: none;
    float: ${props => props.type != undefined ? 'left' : 'right'};
    margin-left: ${props => props.type != undefined ? '0px' : '10px'};
    ${
        props => {
            let data = '';

            switch(props.icon){
                case "remove":
                    data = 'background: url(data:image/svg+xml, '+encodeURIComponent('<svg version="1.1" id="Camada_1" focusable="false" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 24 24" style="enable-background:new 0 0 24 24;" xml:space="preserve"><path fill="'+document.documentElement.style.getPropertyValue('--text-color')+'" d="M6,19c0,1.1,0.9,2,2,2h8c1.1,0,2-0.9,2-2V7H6V19z M19,4h-3.5l-1-1h-5l-1,1H5v2h14V4z"/></svg>')+')';
                    break;
                case "edit":
                    data = 'background: url(data:image/svg+xml, '+encodeURIComponent('<svg version="1.1" id="Camada_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 1125 1120" style="enable-background:new 0 0 1125 1120;" xml:space="preserve"><g><polygon fill="'+document.documentElement.style.getPropertyValue('--text-color')+'" points="0,888.13 0,1120.03 245.54,1120.03 934.43,431.14 695.71,192.42 	"/><path fill="'+document.documentElement.style.getPropertyValue('--text-color')+'" d="M1105.42,151.96L973.04,19.58c-25.38-25.38-66.26-26.19-92.63-1.85l-79,72.92c-3.73,3.45-6.9,7.25-9.66,11.26l-41.47,35.94 l231.9,231.9l95.49-95.49l0,0l27.75-27.75C1131.53,220.41,1131.53,178.07,1105.42,151.96z"/></g></svg>')+')';
                    break;
                case "novo":
                    data = 'background: url(data:image/svg+xml, '+encodeURIComponent('<svg version="1.1" id="Camada_1" focusable="false" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"	 x="0px" y="0px" viewBox="0 0 24 24" style="enable-background:new 0 0 24 24;" xml:space="preserve"><path fill="'+document.documentElement.style.getPropertyValue('--text-color')+'" d="M13.34,0.02h-2.68v10.63H0.02v2.68h10.63v10.63h2.68V13.34h10.63v-2.68H13.34V0.02z"/></svg>')+')';
                    break;
            }

            return data;
        }
    };
    background-size: ${props => props.icon == 'remove' ? '25px' : '18px'};
    background-position: center;
    background-repeat: no-repeat;
`;

const Timeline = styled.div`
    width: 100%;
    height: 70px;
    margin: 10px 0;
    box-sizing: border-box;
    overflow-x: auto;
    overflow-y: hidden
`;

const Inner = styled.div`
    width: ${props => props.size * 80}px;
    min-width: 100%;
    display: ${props => props.size > 0 ? 'flex' : 'block'};
    box-sizing: border-box;
    text-align: center;
    line-height: 80px;
`;

const Bar = styled.div`
    width: calc(100%);

    & input {
        -webkit-appearance: none;
        appearance: none;
        width: 100px;
        height: 40px;
        text-align: right;
        border: none;
        float: right;
        padding: 0px 8px;
        padding-left: 55px;
        box-sizing: border-box;
        background: var(--color-primary);
        box-shadow: 0px 0px 0px 1px var(--border-color) inset;
    }
`;

const Select = styled.select`
    -webkit-appearance: none;
    appearance: none;
    width: 120px;
    box-sizing: border-box;
    height: 40px;
    padding: 0px 8px;
    background-image: url(data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23157afb%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E);
    background-size: 0.85em, 100%;
    background-repeat: no-repeat;
    background-position: right 0.7em top 50%, 0px 0px;
    background-color: var(--color-primary);
    outline: none;
    box-shadow: 0px 0px 0px 1px var(--border-color) inset;
    border: none;
    text-transform: capitalize;

    & option{
        background: white
    }
`;

const Frame = styled.div`
    width: 70px;
    height: 70px;
    margin-right: 10px
    position: relative;
    display: flex;
    justify-content:center;
    align-items:center;

    & img{
        width: 80%;
        height: auto;
        transform: scale(1);
    }

    &:before{
        content: '';
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0px;
        left: 0px;
        opacity: 0.3;
        background-image: var(--grid-back); 
        background-size: 18px; 
        background-color: var(--color-base);
        box-shadow: ${props => props.select != 'true' ?  '0px 0px 0px 1px var(--back-default) inset' : '0px 0px 0px 5px var(--text-color) inset'};
    }
`;

const Input = styled.div`
    position: relative;
    float: right;
    width: 100px;
    height: 40px;

    &:before{
        content: 'FRAME RATE';
        display: block;
        position: absolute;
        top: 5px;
        left: 5px;
        font-size: 9pt;
        width: 40px;
    }
`;

export default function App({data, setData, addImage}){
    const fps = useRef();
    const [selection, setSelection] = useState(null);

    const Add = url => {
        const d = Object.assign({}, data);
        d.animations[select].frames.push(url);
        setData(d);
    };

    const Edit = url => {
        const d = Object.assign({}, data);
        d.animations[select].frames[data.select] = url;
        setData(d);
    };

    const Remove = () => {
        const d = Object.assign({}, data);
        const arr = [];
        d.animations[select].frames.forEach((value, i) => i != data.select ? arr.push(value) : '' );
        d.animations[select].frames = arr;
        setData(d);
        if(data.generate != undefined) data.generate(d, select, setData);
    }

    const SelectFrame = id => {
        const d = Object.assign({}, data);
        d.select = id;
        
        setData(d);
    }

    const SelectAnimation = value => {
        if(fps.current != null) fps.current.value = data.animations[value].fps;
        setSelection(value);
        if(data.generate != undefined) data.generate(data, select, setData);
    }

    const changeFrameRate = value => {
        const d = Object.assign({}, data);
        d.animations[d.selection].fps = value;
        setData(d);
        if(data.generate != undefined) data.generate(d, select, setData);
    }
    
    const select = selection == null ? data.selection : selection;
    
    return <> 
    <Canvas data={data} set={setData} view={View} />   
    <Content>
        <Bar style={{marginTop: '10px'}}>
            <Input>
                <input defaultValue={data.animations[select].fps} ref={fps} type="number" onChange={e => changeFrameRate(e.target.value)}/>
            </Input>
            <Select className="select" onChange={e => SelectAnimation(e.target.value)}>
                {Object.keys(data.animations).map((value, i) => <option value={value} key={i}>{value}</option>)}
            </Select>
        </Bar>
        <Timeline>
            <Inner size={data.animations[select].frames.length}>
                {data.animations[select].frames.map((value, i) => <Frame 
                    key={i} 
                    onClick={() => SelectFrame(i)} 
                    select={(i == data.select).toString()}
                >
                    <img src={value} onLoad={() => data.generate != undefined ? data.generate(data, select, setData) : ''} />
                </Frame>)}
                {data.animations[select].frames.length == 0 && 'Click + to add frames'}
            </Inner>
        </Timeline>
        <Bar style={{marginTop: '10px'}}>
            <Button onClick={Remove} icon="remove" />
            <Button onClick={() => addImage(url => Edit(url))} icon="edit" />
            <Button type="left"  onClick={() => addImage(url => Add(url))} icon="novo" />
        </Bar>
    </Content>
    </>
}