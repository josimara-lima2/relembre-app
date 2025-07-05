import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { Amplify } from 'aws-amplify';  
import awsConfig from './aws-exports.js';
import '@aws-amplify/ui-react/styles.css';

Amplify.configure(awsConfig);

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
