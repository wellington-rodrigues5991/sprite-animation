import React from 'react';
import styled from 'styled-components';
import CustomVcc from '@withkoji/custom-vcc-sdk';

import Input from './common/input.js';
import Button from './common/button.js';

const Wrapper = styled.div`
    padding: 0;
    margin: 0;
    width: 100vw;
    height: 100vh;
    position: fixed; 
    top: 0px;
    left: 0px;
    ${({ theme }) => theme.mixins['card.default'] || ''}
    background: url('data:image/svg+xml, ${({ theme }) => theme.mixins["background.transparencyGrid"] || ""}') 0% 0% / 18px 18px ${({ theme }) => theme.colors["editor.transparencyGridOverlay.background"] || ""};
    font-family: ${({ theme }) => theme.colors['font.defaultFamily'] || ''};
`;

const Title = styled.div`
    width: 100%;
    height: 32px;
    display: flex;
    align-items: center;
    font-weight: bold;
`;

const Container = styled.div`
    width: 150px;
    display: flex;
    flex-direction: column;
    position: absolute;
    top: 10px;
    left:10px;
    height: calc(100% - 20px);
    padding: 20px;
    box-sizing: border-box;
    background: ${({ theme }) => theme.colors['editor.transparencyGridOverlay.background'] || 'black'}
`;

const Viewer = styled.div`
    position:absolute;
    left: 170px;
    right: 0%;
    top: 0px;
    height: 100%;
    padding: 20px;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const Group = styled.div`
    padding-bottom: 30px;
    color: ${({ theme }) => theme.colors['input.foreground'] || 'white'}

    & span{
        padding-bottom: 5px;
        display: block;
        font-size: 10pt
    }
`;

class App extends React.PureComponent {
    constructor(props) {
        super(props);

        this.customVcc = new CustomVcc();
        
        this.upload = this.upload.bind(this);
        this.updateLabel = this.updateLabel.bind(this);
        this.clear = this.clear.bind(this);
        
        this.state = {
            value: {
                image: null,
                scale: {x: 1, y: 1},
                jump: 400
            },
            theme: this.customVcc.theme,
        };

        this.customVcc.onUpdate((newProps) => {
            const state = this.state;
            const value = newProps.value;

            state.value.image = (
                value.image == undefined ? 
                state.image :
                value.image
            );
            state.value.scale = (value.scale == undefined ? state.scale : value.scale);
            state.value.jump = (value.jump == undefined ? state.jump : value.jump);

            console.log(state, value)

            this.setState({state});
        });

        this.customVcc.onTheme((theme) => {
            console.log(theme);
            this.setState({
                theme
            });
        });
    }

    componentDidMount() {
        this.customVcc.register('100%', '215px');
    }

    upload(){
        this.customVcc.showModal('image', 'http://www.xionplayer.com/skins/junior_alves/Mini%20Player%20Mp3_full.jpg', (newUrl) => {
            const newValue = JSON.parse(JSON.stringify(this.state.value));
            newValue.image = newUrl;
            
            this.customVcc.change(newValue);
            this.customVcc.save();
        });
    }

    clear(){
        const newValue = JSON.parse(JSON.stringify(this.state.value));
        newValue.image = "";
        
        this.customVcc.change(newValue);
        this.customVcc.save();
    }

    updateLabel(prop, value){
        const newValue = JSON.parse(JSON.stringify(this.state.value));
        if(prop != 'Jump Height') newValue.scale[prop] = parseFloat(value);
        else newValue.jump = parseFloat(value);
        
        this.customVcc.change(newValue);
        this.customVcc.save();
    }

    render() {
        return (
            <Wrapper theme={this.state.theme}>
                <Viewer onClick={this.upload}>
                    <img src={this.state.value.image} width="auto" height="100%" />
                </Viewer>
                <Button clear={this.clear} upload={this.upload} />
                <Container theme={this.state.theme}>
                    <Group theme={this.state.theme}>
                        <span>SCALE</span>
                        <Input theme={this.state.theme} label="x" value={this.state.value.scale.x} change={this.updateLabel} />
                        <Input theme={this.state.theme} label="y" value={this.state.value.scale.y} change={this.updateLabel} />
                    </Group>
                    <Group theme={this.state.theme}>
                        <span>JUMP HEIGHT</span>
                        <Input theme={this.state.theme} label="Jump Height" value={this.state.value.jump} change={this.updateLabel} />
                    </Group>
                </Container>
            </Wrapper>
        );
    }
}

export default App;
