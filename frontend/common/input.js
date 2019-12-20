import React from 'react';
import styled from 'styled-components';

export default class Input extends React.PureComponent {
    constructor(props){

    }

    render(){
        return <>
            <label>{props.label}</label>
            <input type="number" value={props.value} onBlur={props.change} />
        </>;
    }
}