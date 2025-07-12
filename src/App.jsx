import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import PageHome from './pages/PageHome';
import PageMetaAgua from './pages/PageMetaAgua';
import Layout from './layout/Layout';
import useAlertScheduler from './hooks/useAlertScheduler';
import { useEffect } from 'react';


function App() {
  const { initNotificacoes } = useAlertScheduler();
 useEffect(() => {
    initNotificacoes();
  }, []);
  
  return (
    <Authenticator  loginMechanisms={[ 'email']} // permite login por nome de usuário ou email
>
      {({ signOut, user }) => (
        <Router>
          <Routes>
            <Route
              path="/"
              element={
                <Layout>
                  <PageHome signOut={signOut} user={user} />
                </Layout>
              }
            />
             <Route
              path="/meta-agua"
              element={
                <Layout>
                  <PageMetaAgua />
                </Layout>
              }
            />
            
          </Routes>
        </Router>
      )}
    </Authenticator>
  );
}

export default App;
