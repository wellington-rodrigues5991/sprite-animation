import React from 'react';
import styled from 'styled-components';

const Text = styled.input`
    background: ${({ theme }) => theme.colors['input.background'] || ''};
    color: ${({ theme }) => theme.colors['input.foreground'] || ''};
    font-family: ${({ theme }) => theme.colors['font.defaultFamily'] || ''};
`;

const Label = styled.label`
    color: ${({ theme }) => theme.colors['input.foreground'] || ''}
`;

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
            <Text theme={this.props.theme} type="number" ref={this.selector} defaultValue={this.props.value} onChange={this.updateProp} />
            {this.props.label != "Jump Height" && <Label theme={this.props.theme}>{this.props.label}</Label>}
        </>;
    }
}