import React from 'react';
import styled from 'styled-components';
import CustomVcc from '@withkoji/custom-vcc-sdk';

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
`;

const Title = styled.div`
    width: 100%;
    height: 32px;
    display: flex;
    align-items: center;
    font-weight: bold;
`;

const Container = styled.div`
    border: 1px solid ${({ theme }) => theme.colors['border.default'] || 'black'};
    width: 216px;
    display: flex;
    flex-direction: column;
    position: absolute;
    top: 0px;
    left:0px;
    height: 100%;
    background: ${({ theme }) => theme.colors['editor.transparencyGridOverlay.background'] || 'black'}
`;

const Viewer = styled.div`
    position:absolute;
    left: 216px;
    right: 0%;
    top: 0px;
    height: 100%;
    padding: 15px;
    display: flex;
    box-sizing: border-box;
`;
class App extends React.PureComponent {
    constructor(props) {
        super(props);

        this.customVcc = new CustomVcc();
        
        this.upload = this.upload.bind(this)
        
        this.state = {
            value: {
                image: null,
                scale: {x: 1, y: 1},
                jump: 400
            },
            theme: this.customVcc.theme,
        };

        this.customVcc.onUpdate((newProps) => {
            const state = this.state.value;
            const value = newProps.value;

            state.image = (value.image == undefined ? state.image : value.image);
            state.scale = (value.scale == undefined ? state.scale : value.scale);
            state.jump = (value.jump == undefined ? state.jump : value.jump);
            this.setState({value: state});
        });

        this.customVcc.onTheme((theme) => {
            this.setState({
                theme
            });
        });
    }

    componentDidMount() {
        this.customVcc.register('100%', '200px');
    }

    upload(){
        this.customVcc.showModal('image', 'http://www.xionplayer.com/skins/junior_alves/Mini%20Player%20Mp3_full.jpg', (newUrl) => {
            const newValue = JSON.parse(JSON.stringify(this.state.value));
            newValue.image = newUrl;
            
            this.customVcc.change(newValue);
            this.customVcc.save();
        });
    }

    render() {
        console.error(this.state)
        return (
            <Wrapper theme={this.state.theme}>
                <Viewer>
                    <img src={this.state.value.image} width="auto" height="100%" />
                </Viewer>
                <Container theme={this.state.theme}>
                    <Title>{this.state.name}</Title>
                    <button onClick={this.upload}>Upload image</button>
                </Container>
            </Wrapper>
        );
    }
}

export default App;
