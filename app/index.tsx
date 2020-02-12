import React from 'react';
import ReactDOM from 'react-dom';

import { configure } from 'mobx';

import { App } from './app';

import './index.css';

configure({ enforceActions: 'observed' });

ReactDOM.render(<App />, document.getElementById('app'));
