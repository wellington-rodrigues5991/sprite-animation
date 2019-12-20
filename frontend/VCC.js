import React from 'react';
import styled from 'styled-components';
import CustomVcc from '@withkoji/custom-vcc-sdk';

const Wrapper = styled.div`
    padding: 0;
    margin: 0;
    width: 100vw;
    display: flex;
    flex-direction: column;
`;

const Title = styled.div`
    width: 100%;
    height: 32px;
    display: flex;
    align-items: center;
    font-weight: bold;
`;

const Grid = styled.div`
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
        this.customVcc.register('500px', '534px');
    }

    upload(){
        this.customVcc.showModal('image', currentImageUrl, (newUrl) => {
            console.log(newUrl)
        });
    }

    render() {
        return (
            <Wrapper>
                <Title>{this.state.name}</Title>
                <Grid theme={this.state.theme}>
                    <button onClick={this.upload}>Upload image</button>
                </Grid>
            </Wrapper>
        );
    }
}

export default App;
