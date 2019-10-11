import React from 'react';
import styled from 'styled-components';
import CustomVcc from '@withkoji/custom-vcc-sdk';

const Wrapper = styled.div`
    padding: 0;
    margin: 0;
    background-color: ${({ backgroundColor }) => backgroundColor || '#fafafa'};
    border: 1px solid #eee;
    width: calc(100vw - 2px);
    height: calc(100vh - 2px);
    display: flex;
`;

const Title = styled.div`
    width: 100%;
    margin-bottom: 12px;
    font-weight: bold;
`

const Card = styled.div`
    width: 100%;
    display: flex;
    padding: 12px;
    flex-direction: column;
`;

const Name = styled.input`
    outline: none;
    border: none;
    padding: 8px;
    font-size: 14px;
    width: calc(100% - 16px);
    border: 1px solid rgba(0,0,0,0.1);
`;

const Image = styled.img`
    width: 100%;
    height: 300px;
    object-fit: cover;
    margin: 12px 0;
`;

const ChooseImage = styled.div`
    cursor: pointer;
    width: 100%;
    margin: 12px 0;
    height: 100%
    object-fit: contain;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 2px dashed blue;
    font-size: 14px;

    &:hover {
        background-color: rgba(0,0,0,0.1);
        text-decoration: underline;
    }
`;

const Description = styled.textarea`
    outline: none;
    border: none;
    padding: 8px;
    font-size: 14px;
    height: 64px;
    width: calc(100% - 16px);
    border: 1px solid rgba(0,0,0,0.1);
`;

class App extends React.PureComponent {
    constructor(props) {
        super(props);

        this.customVcc = new CustomVcc();

        this.state = {
            value: {
                name: '',
                image: '',
                description: '',
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
        this.customVcc.register('300px', '480px');
    }

    onChange(key, value) {
        this.customVcc.change({
            ...this.state.value,
            [key]: value,
        });
    }

    render() {
        const {
            name,
            image,
            description,
        } = this.state.value || {};

        return (
            <Wrapper backgroundColor={this.state.theme.colors['splash.background']}>
                <Card>
                    <Title>{this.state.name}</Title>
                    <Name
                        value={name}
                        onChange={(e) => this.onChange('name', e.target.value)}
                        onFocus={() => this.customVcc.focus()}
                        onBlur={() => {
                            this.customVcc.blur();
                            this.customVcc.save();
                        }}
                        placeholder="Character name..."
                    />
                    {image ? (
                        <Image
                            src={image}
                            onClick={() => {
                                this.customVcc.showModal('image', image, (newValue) => {
                                    this.onChange('image', newValue);
                                    this.customVcc.save();
                                });
                            }}
                        />
                    ) : (
                        <ChooseImage
                            onClick={() => {
                                this.customVcc.showModal('image', image, (newValue) => {
                                    this.onChange('image', newValue);
                                    this.customVcc.save();
                                });
                            }}
                        >
                            Select an image...
                        </ChooseImage>
                    )}
                    <Description
                        value={description}
                        onChange={(e) => this.onChange('description', e.target.value)}
                        onFocus={() => this.customVcc.focus()}
                        onBlur={() => {
                            this.customVcc.blur();
                            this.customVcc.save();
                        }}
                        placeholder="Character description..."
                    />
                </Card>
            </Wrapper>
        );
    }
}

export default App;
