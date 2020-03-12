import React from 'react';
import ReactDOM from 'react-dom';

import { Root } from './Root';
import { App } from './components/App/App';

// Import Style
import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/css/styles.css';

ReactDOM.render(
    <Root>
        <App />
    </Root>
, document.getElementById('root'));
