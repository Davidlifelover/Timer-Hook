/* eslint-disable no-undef */
import { createRoot } from 'react-dom';

import './index.css';

import App from './Components/App';

const domNode = document.getElementById('root');
const root = createRoot(domNode);

root.render(<App />);

