import React, { useState, useEffect, useCallback } from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import appRoutes from './routes';
import Nav from './components/Nav';
import PermissionPopup from './components/PermissionPopup/PermissionPopup';
import { messaging, getToken as getTokenFunc } from './utils/firebase';
import { BrowserRouter as Router } from 'react-router-dom';
import api from './api';


const App = () => {

  const state = {
    hidden: true,
    rejected: false
  }

  const [{ hidden, rejected }, setState] = useState(state)

  const requestPermissionUI = () => {
    setState({ hidden: false })
  }

  const [{ data, loading }, setData] = useState({ data: { results: [], notifications: [] }, loading: true })

  useEffect(() => {
    const fetchData = async () => {
      const [results, notifications] = await Promise.all([api.fetchResults(), api.fetchNotifications()])
      setData({ data: { results, notifications }, loading: false })
    }
    fetchData()
  }, [])


  const getToken = useCallback(() => {
    if (Notification.permission === 'default') {
      !rejected && requestPermissionUI();
    }
  }, [requestPermissionUI])

  const handlePermission = () => {
    messaging.requestPermission &&
      messaging.requestPermission().then(function () {
        console.log('Notification permission granted.');
        setState({ hidden: true })
        // Get token for current instance
        getTokenFunc()
      }).catch(function (err) {
        console.log('Unable to get permission to notify.', err);
      });
  }

  const handleClose = () => {
    setState({ rejected: true, hidden: true })
  }

  useEffect(() => {
    navigator.serviceWorker &&
      navigator.serviceWorker.ready.then(() => {
        getToken()
      })
  }, [])

  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <h1 className="App-title"><span>easy</span><span style={{ color: '#d65a5a' }}>KU</span></h1>
        </header>
        <Nav />
        <Switch>
          {
            appRoutes.map((route, key) =>
              <Route key={key} path={route.path} exact={!!route.exact} render={() => route.view({ data, loading })} />
            )
          }
        </Switch>
      <PermissionPopup hidden={hidden} handleYes={handlePermission} handleClose={handleClose} />
    </div>
    </Router >
  );
}


export default App;
