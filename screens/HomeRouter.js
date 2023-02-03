import { View, Text } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import HomePage from './HomePage';
import SearchPage from './SearchPage';
import AddPage from './AddPage';
import TaskPage from './TaskPage';
import SettingsPage from './ProfilePage';
import { Ionicons, AntDesign, FontAwesome } from '@expo/vector-icons';

const HomeRouter = () => {

  const Tab = createBottomTabNavigator();  

  return (
    <Tab.Navigator initialRouteName="Home"
    tabBarOptions={{
        showLabel: false,
        activeTintColor: 'black',
        inactiveTintColor: 'black',
    }}>
        <Tab.Screen options={{
            headerShown: false,
            tabBarIcon: ({ focused }) => (
                <Ionicons
                  name={focused ? 'ios-home' : 'ios-home-outline'}
                  size={26}
                  color={focused ? 'black' : 'black'}
                />
              ),
            }} name="HomePage" component={HomePage}/>
        <Tab.Screen options={{
            headerShown: false,
            tabBarIcon: ({ focused }) => (
                <Ionicons
                  name={focused ? 'search' : 'search-outline'}
                  size={26}
                  color={focused ? 'black' : 'black'}
                />
              ),
            }} name="SearchPage" component={SearchPage}/>
        <Tab.Screen options={{
            headerShown: false,
            tabBarIcon: ({ focused }) => (
                <AntDesign
                  name={focused ? 'plussquare' : 'plussquareo'}
                  size={26}
                  color={focused ? 'black' : 'black'}
                />
              ),
            }} name="AddPage" component={AddPage}/>
        <Tab.Screen options={{
            headerShown: false,
            tabBarIcon: ({ focused }) => (
                <AntDesign
                  name={focused ? 'checksquare' : 'checksquareo'}
                  size={26}
                  color={focused ? 'black' : 'black'}
                />
              ),
            }} name="TaskPage" component={TaskPage}/>
        <Tab.Screen options={{
            headerShown: false,
            tabBarIcon: ({ focused }) => (
                <FontAwesome
                  name={focused ? 'user' : 'user-o'}
                  size={26}
                  color={focused ? 'black' : 'black'}
                />
              ),
            }} name="SettingsPage" component={SettingsPage}/>
    </Tab.Navigator>
  )
}

export default HomeRouter