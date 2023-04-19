import { View, Text } from 'react-native';
import React from 'react';
import BookedAppointments from './BookedAppointments';
import TodoTasks from './TodoTasks';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Constants from 'expo-constants';


const Tab = createMaterialTopTabNavigator();

const TaskPage = () => {
  const notchHeight = Constants.statusBarHeight - Constants.statusBarHeight;

  return (
    <Tab.Navigator tabBarPosition="top" style={{ marginTop: notchHeight }}>
      <Tab.Screen name="Prenotati" component={BookedAppointments} />
      <Tab.Screen name="Da fare" component={TodoTasks} />
    </Tab.Navigator>
  )
}

export default TaskPage