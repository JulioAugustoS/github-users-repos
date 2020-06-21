import 'react-native-gesture-handler';
import React from 'react';
import { StatusBar } from 'react-native';

// Routes
import Routes from './routes';

const App = () => {
  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#34495e" />
      <Routes />
    </>
  );
};

export default App;
