import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import LoginScreen from "./login.screen.js/LoginScreen";
import Home from './pages/Home';
import Notification from './pages/Notification';
import Profile from './pages/Profile';
import Search from './pages/Search';
import teste from './pages/teste';

import { Entypo, Feather } from '@expo/vector-icons'

const Tab = createBottomTabNavigator();

export default function Routes() {
    return (
        <Tab.Navigator
            screenOptions={{
                tabBarStyle: {
                    backgroundColor: '#fff',
                    borderTopColor: 'transparent',
                },
                tabBarActiveTintColor: '#000',
                tabBarInactiveTintColor: '#888',
                tabBarShowLabel: false,

            }}


        >
            <Tab.Screen
                name="Login"
                component={LoginScreen}
                options={{
                    tabBarIcon: ({ size, color }) => <Entypo name="login" size={size} color={color} />
                }}
            />

            <Tab.Screen
                name="Home"
                component={Home}
                options={{
                    tabBarIcon: ({ size, color }) => <Entypo name="home" size={size} color={color} />
                }}
            />
            <Tab.Screen
                name="Search"
                component={Search}
                options={{
                    tabBarIcon: ({ size, color }) => <Feather name="search" size={size} color={color} />
                }}
            />
            <Tab.Screen
                name="teste"
                component={teste}
                options={{
                    tabBarIcon: ({ size, color }) => <Feather name="search" size={size} color={color} />
                }}
            />

            <Tab.Screen
                name="Notification"
                component={Notification}
                options={{
                    tabBarIcon: ({ size, color }) => <Entypo name="notification" size={size} color={color} />
                }}
            />
            <Tab.Screen
                name="Profile"
                component={Profile}
                options={{
                    tabBarIcon: ({ size, color }) => <Entypo name="user" size={size} color={color} />
                }}
            />
        </Tab.Navigator>



    )
}
