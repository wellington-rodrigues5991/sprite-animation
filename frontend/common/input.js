import React from 'react';
import styled from 'styled-components';

export default class Input extends React.PureComponent {
    constructor(props){
        super(props);
        
        this.updateProp = this.updateProp.bind(this);
        this.selector = React.createRef();
    }

    updateProp(){
        this.props.change(this.props.label, this.selector.current.value)
    }

    componentDidUpdate(){
        this.selector.current.value = this.props.value;
    }

    render(){
        return <>
            <label>{this.props.label}</label>
            <input type="number" ref={this.selector} defaultValue={this.props.value} onChange={this.updateProp} />
        </>;
    }
}