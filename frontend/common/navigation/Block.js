import React, {useState} from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';

const Bloc = styled.div`
    width: 40px;
    height: 40px;
    background: ${props => `rgb(${props.color[0]}, ${props.color[1]}, ${props.color[2]})`};
    float: left;
    margin-left: 15px;
    transition: all 0.5s;
    animation-name: ${props => (props.type === 'true' ? 'delete' : '')};
    animation-duration: 1.5s;
    animation-iteration-count: infinite;

    &:first-child{margin: 0px}

    @keyframes delete {
        0% {transform: rotate(-20deg)}
        50% {transform: rotate(20deg)}
        100% {transform: rotate(-20deg)}
      }
    @keyframes false {}
`;

export default function Block({remove, i, color, type}){
    const ref = React.createRef();
    const name = 'block'+i;

    function action() {
        if(type) remove(i);
        else{
            window.config.add(`rgb(${color[0]}, ${color[1]}, ${color[2]})`, name);
        }
    }
    
    return <Bloc color={color} ref={ref} type={type.toString()} onClick={action} />;
}