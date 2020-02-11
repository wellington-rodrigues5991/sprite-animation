import React, {useState} from 'react';
import styled from 'styled-components';
import Line from './line';

const Wrapper = styled.div`
    width: 100%;
`;
const Bar = styled.div`
    width: 100%; 
    border-top: 1px solid var(--border-color);
    height: 40px;
    padding: 7.5px 10px;
    box-sizing: border-box;
    position: absolute;
    bottom: 0px;
`;

const Button = styled.div`
    width: 25px;
    height: 25px;
    background-image: ${props => 'url(data:image/svg+xml, '+encodeURIComponent('<svg version="1.1" id="Camada_1" focusable="false" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 24 24" style="enable-background:new 0 0 24 24;" xml:space="preserve"><path fill="'+document.documentElement.style.getPropertyValue('--text-color')+'" d="M6,19c0,1.1,0.9,2,2,2h8c1.1,0,2-0.9,2-2V7H6V19z M19,4h-3.5l-1-1h-5l-1,1H5v2h14V4z"/></svg>')+')'};
    background-repeat: no-repeat;
    background-size: 100%;
    background-position: center;
    float: right;
    margin-left: 10px;
    line-height: 25px;
    text-align: center;
    cursor: pointer;
`;

const Cont = styled.div`
    width: 100%;
    box-sizing: border-box;
    padding: 10px;
    padding-top: 38px;
    position: absolute;
    top: 0px;
    left: 0px;
    bottom: 40px;
    overflow: auto;
`;

export default function EditorPanel({get, set, end}){
    const Add = () => {
        const data = get.slice();

        data.push({title: "", type: "bool", opt: [], value: ""})
        set(data)
    };
    
    const change = (e, i, key) => {
        const data = get.slice();
        
        data[i][key] = e;
        set(data)
    };

    return <Wrapper>
        <Cont>{get.map((value, i) => <Line 
            key={i}
            title={value.title} 
            type={value.type}
            opt={value.opt}
            blur={(e, key) => change(e, i, key)}
        />)}</Cont>
        <Bar>
            <Button onClick={Add} />
            <Button style={{width: 'calc(100% - 35px)', marginLeft: '0px', background: 'none'}} onClick={end}>Done</Button>
        </Bar>
    </Wrapper>;
}

//{title: 'angle', type: 'number', opt: {min: 0, max: 360, step: 1}, value: 0}