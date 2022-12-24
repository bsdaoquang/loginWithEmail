import {View, Text} from 'react-native';
import React from 'react';
import Login from './screens/Login';
import Profile from './screens/Profile';

const App = () => {
  return 1 > 2 ? <Profile /> : <Login />;
};

export default App;
