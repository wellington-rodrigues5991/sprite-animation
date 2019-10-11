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

const GridRow = styled.div`
    width: 100%;
    display: flex;
`;

const GridItem = styled.div`

    cursor: pointer;
    background-color: ${({ theme }) => theme.colors['splash.background'] || 'white'};
    border: 1px solid ${({ theme }) => theme.colors['border.default'] || 'black'};
    ${({ isSelected, theme }) => isSelected && `
        background-color: ${theme.colors['button.background'] || 'red'};
    `}
    width: 10vw;
    height: 10vw;

    &:hover {
        ${({ isSelected, theme }) => !isSelected && `background-color: ${theme.colors['button.background#active'] || 'red'}`};
    }
`;

class App extends React.PureComponent {
    constructor(props) {
        super(props);

        this.customVcc = new CustomVcc();

        const initialGrid = Array(10).fill(Array(10).fill(0));
        this.state = {
            value: initialGrid,
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

    onToggle(row, item) {
        const newValue = [...this.state.value];
        const newRow = [...newValue[row]];
        newRow[item] = (newRow[item] === 0) ? 1 : 0;
        newValue[row] = newRow;
        this.customVcc.change(newValue);
    }

    render() {
        return (
            <Wrapper>
                <Title>{this.state.name}</Title>
                <Grid theme={this.state.theme}>
                    {this.state.value.map((row, i) => (
                        <GridRow key={i}>
                            {this.state.value[i].map((item, j) => (
                                <GridItem
                                    key={`${i}-${j}`}
                                    isSelected={item === 1}
                                    onClick={() => this.onToggle(i, j)}
                                    theme={this.state.theme}
                                />
                            ))}
                        </GridRow>
                    ))}
                </Grid>
            </Wrapper>
        );
    }
}

export default App;
