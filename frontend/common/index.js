import React from 'react';
import ReactDOM from 'react-dom';
import VCC from './CustomControl.js';
import { AppContainer } from 'react-hot-loader';

const render = Component => {
    ReactDOM.render(
        <AppContainer>
            <Component />
        </AppContainer>,
        document.getElementById('root')
    );
}

render(VCC);


if (module.hot) {
    module.hot.accept('./CustomControl.js', () => { render(VCC) });
}