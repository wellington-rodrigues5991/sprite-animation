import React, {useState} from 'react';
import Line from './line';
import styled from 'styled-components';
import EditorPanel from './editor/panel';

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
            <Button onClick={remove} />
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