import React from 'react';
import styled from 'styled-components';
import CustomVcc from '@withkoji/custom-vcc-sdk';

const Wrapper = styled.div`
    padding: 0;
    margin: 0;
    width: 100vw;
    display: flex;
    flex-direction: column;
    ${({ theme }) => theme.mixins['card.default'] || ''}
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
    width: 100vw;
    display: flex;
    flex-direction: column;
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
            this.setState({
                ...this.state,
                ...newProps,
            });
        });

        this.customVcc.onTheme((theme) => {
            this.setState({
                theme
            });
        });
    }

    componentDidMount() {
        this.customVcc.register('100%', '200px');
        console.log(this.customVcc)
    }

    upload(){
        this.customVcc.showModal('image', 'http://www.xionplayer.com/skins/junior_alves/Mini%20Player%20Mp3_full.jpg', (newUrl) => {
            console.log(newUrl)
        });
    }

    render() {
        return (
            <Wrapper theme={this.state.theme}>
                <Title>{this.state.name}</Title>
                <Container theme={this.state.theme}>
                    <button onClick={this.upload}>Upload image</button>
                </Container>
            </Wrapper>
        );
    }
}

export default App;
