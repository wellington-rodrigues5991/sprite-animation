import React from 'react';
import styled from 'styled-components';

import Koji from '@withkoji/vcc';
import Dispatch, { DISPATCH_EVENT, Utils } from '@withkoji/dispatch';

const Container = styled.div`
    background-color: ${() => Koji.config.colors.backgroundColor};
    min-height: 100vh;
    height: 100vh;
    max-height: 100vh;
    width: 100vw;
    max-width: 100vw;
    min-width: 100vw;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-size: 16px;
    color: ${() => Koji.config.colors.textColor};
`;

const Header = styled.div`
    font-size: 1.5rem;
    font-weight: bold;
    padding: 12px;
    display: flex;
    flex-direction: column;
    text-align: center;
    justify-content: center;
`;

const SubHeader = styled.div`
    font-size: 14px;
    font-weight: normal;
`;

const MessageList = styled.div`
    width: calc(100% - 24px);
    padding: 12px;
    display: flex;
    flex-direction: column;
    height: 100%;
    overflow: scroll;
`;

const Message = styled.div`
    width: 100%;

    span {
        font-weight: bold;
    }
`;

const InputRow = styled.div`
    width: calc(100% - 24px);
    display: flex;
    padding: 12px;
`;

const Input = styled.input`
    width: 100%;
    padding: 8px;
    font-size: 16px;
`;

const SendButton = styled.button`
    padding: 8px;
    font-size: 16px;
    font-weight: bold;
`;

class HomePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            connectedClients: {},
            latency: null,
            clientId: null,
            shardName: null,
            messages: [],

            username: 'Anonymous',
            messageBody: '',
        };

        this.dispatch = new Dispatch({
            projectId: Koji.config.metadata.projectId,
        });

        this.dispatch.on(DISPATCH_EVENT.CONNECTED_CLIENTS_CHANGED, (payload) => {
            this.setState({
                connectedClients: payload.connectedClients, 
                latency: this.dispatch.latency,
            });
        });

        this.dispatch.on(DISPATCH_EVENT.CONNECTED, (payload) => {
            this.setState({
                clientId: payload.clientId,
                shardName: payload.shardName,
                latency: this.dispatch.latency,
            });
        });

        this.dispatch.on('message_sent', (payload) => {
            this.setState({
                messages: [
                    ...this.state.messages,
                    payload,
                ],
                latency: this.dispatch.latency,
            })
        });
    }

    componentDidMount() {
        this.dispatch.connect();
    }

    componentWillUnmount() {
      this.dispatch.disconnect();
    }

    sendMessage() {
        if (!this.state.messageBody) {
            return;
        }

        this.dispatch.emitEvent('message_sent', {
            author: this.state.username,
            body: Utils.filterProfanity(this.state.messageBody),
        });

        this.setState({ 
            messageBody: '',
        });
    }

    render() {
        const numOnlineUsers = Object.keys(this.state.connectedClients).length;

        return (
            <Container>
                <Header>
                    {Koji.config.strings.title}
                    <SubHeader>{numOnlineUsers} user{numOnlineUsers !== 1 && 's'} online &bull; {this.state.latency}ms replication latency</SubHeader>
                </Header>
                <MessageList>
                    {this.state.messages.map((message, i) => (
                        <Message key={i}>
                            <span>{message.author}</span>&nbsp;
                            {message.body}
                        </Message>
                    ))}
                </MessageList>
                <InputRow>
                    <Input
                        type="text"
                        placeholder="Type a message..."
                        value={this.state.messageBody}
                        onChange={(e) => this.setState({ messageBody: e.target.value })}
                        onKeyUp={(e) => {
                            if (e.keyCode === 13) {
                                this.sendMessage();
                            }
                        }}
                    />
                    <SendButton onClick={() => this.sendMessage()}>Send</SendButton>
                </InputRow>
            </Container>
        );
    }
}

export default HomePage;
