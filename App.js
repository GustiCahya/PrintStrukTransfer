import React from 'react';
import {DataStrukProvider} from './src/context/DataStruk';
import FormTransfer from './src/screens/FormTransfer';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Print from './src/screens/Print';

const Stack = createStackNavigator();

export default function App() {
  return (
    <DataStrukProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="FormTransfer">
          <Stack.Screen name="FormTransfer" component={FormTransfer} options={{title: "Transfer Bank"}} />
          <Stack.Screen name="Print" component={Print} />
        </Stack.Navigator>
      </NavigationContainer>
    </DataStrukProvider>
  );
}
