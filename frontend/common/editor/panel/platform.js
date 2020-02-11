import React, {useState} from 'react';
import Line from './line';
import styled from 'styled-components';
import EditorPanel from './editor/panel';

const Button = styled.div`
    width: 25px;
    height: 25px;
    background-image: ${props => {
        if(props.type == 'remove') return 'url(data:image/svg+xml, '+encodeURIComponent('<svg version="1.1" id="Camada_1" focusable="false" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 24 24" style="enable-background:new 0 0 24 24;" xml:space="preserve"><path fill="'+document.documentElement.style.getPropertyValue('--text-color')+'" d="M6,19c0,1.1,0.9,2,2,2h8c1.1,0,2-0.9,2-2V7H6V19z M19,4h-3.5l-1-1h-5l-1,1H5v2h14V4z"/></svg>')+')'
        else return 'url(data:image/svg+xml, '+encodeURIComponent('<svg version="1.1" id="Camada_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 1125 1120" style="enable-background:new 0 0 1125 1120;" xml:space="preserve"><g><polygon fill="'+document.documentElement.style.getPropertyValue('--text-color')+'" points="0,888.13 0,1120.03 245.54,1120.03 934.43,431.14 695.71,192.42 	"/><path fill="'+document.documentElement.style.getPropertyValue('--text-color')+'" d="M1105.42,151.96L973.04,19.58c-25.38-25.38-66.26-26.19-92.63-1.85l-79,72.92c-3.73,3.45-6.9,7.25-9.66,11.26l-41.47,35.94 l231.9,231.9l95.49-95.49l0,0l27.75-27.75C1131.53,220.41,1131.53,178.07,1105.42,151.96z"/></g></svg>')+')'
    }};
    background-repeat: no-repeat;
    background-size: ${props => props.type == 'remove' ? '100%' : '75%'};
    background-position: center;
    float: right;
    margin-left: 10px;
    cursor: pointer;
`;

const Bar = styled.div`
    width: 100%; 
    border-bottom: 1px solid var(--border-color);
    height: 40px;
    padding: 7.5px 10px;
    box-sizing: border-box;
`;
const Wrapper = styled.div`
    position: absolute;
    top: ${props => props.active == true ? props.top : '0%'};
    left: 0px;
    width: 100%;
    height: 250px;
    overflow: auto;
    transition: all 0.3s;
`;
const Content = styled.div``;
const Top = styled.div`
    width: 100%;
    height: 250px;
    max-height: calc(100vh - 40px);
`;

export default function Platform({get, set, id}){
    const [edit, setEdit] = useState(false);
    const [props, setProps] = useState([]);

    if(props != get.blockProps && props.length == 0) setProps(get.blockProps)

    const change = (e, index) => {
        const data = Object.assign({}, get);
        const value = props.slice();
        
        value[index].value = e;
        data.platform.movable.platform[id].opt[Replace(props[index].title)] = e;
        data.blockProps = value;
        
        setProps(value);
        set(data);
    }
    const remove = () => {
        const data = Object.assign({}, get);
        let arr = data.platform.movable.platform.filter((value, i) => {
            if(i !== id) return value;
        })

        data.platform.movable.platform = arr;
        data.block.open({key: undefined});
        set(data);
    }

    const checkValues = () => {        
        const data = Object.assign({}, get);
        const value = props.slice();
        let opt = data.platform.movable.platform[id].opt;

        for(let i = 0; i < value.length; i++){
            const key = Replace(value[i].title);
            
            if(opt[key] != value[i].value && opt[key] != undefined){
                value[i].value = data.platform.movable.platform[id].opt[key];
            }
        }
    }

    const Replace = str => {
        let string = '';
        for(let i = 0; i < str.length; i++){
            let key = str[i];
            if(str[i-1] == ' ') key = str[i].toUpperCase();
            if(str[i] != ' ') string += key;
        }

        return string;
    }

    checkValues();
    return <Top>
        <Wrapper active={!edit} top='-100%'>
            <EditorPanel get={props} set={setProps} set2={set} end={() => setEdit(false)} />
        </Wrapper>
        <Wrapper active={edit} top='100%'>                
        <Bar>
            <Button onClick={remove} type='remove' />
            <Button onClick={() => setEdit(true)} />
        </Bar>
            <Content>
                {props.map((value, i) => <Line
                    key={i} 
                    type={value.type} 
                    value={value.value} 
                    opt={value.opt} 
                    title={value.title} 
                    change={e => change(e, i)}
                />)}
            </Content>
        </Wrapper>
    </Top>;
}