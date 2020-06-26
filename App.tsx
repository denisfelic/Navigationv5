import 'react-native-gesture-handler';
import * as React from 'react';
import {View, Text, Button, Alert} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Feather';
import {SafeAreaView} from 'react-native-safe-area-context';
import {createStackNavigator} from '@react-navigation/stack';
import {TouchableOpacity, ScrollView} from 'react-native-gesture-handler';
import {createDrawerNavigator} from '@react-navigation/drawer';

const Tab = createBottomTabNavigator();
const StackHOME = createStackNavigator();
const STACKLOGIN = createStackNavigator();
const StackSETTINGS = createStackNavigator();
const Drawer = createDrawerNavigator();

const navOptionHandler = () => ({
  headerShown: false,
});

const CustomHeader = ({props}) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        height: 50,
        borderColor: '#333',
        borderWidth: 1,
      }}>
      <View style={{flex: 1, borderWidth: 1}}>
        {
          // Is Home?
          props.isHome ? (
            <TouchableOpacity
              onPress={() => {
                props.navigation.openDrawer();
              }}>
              <Icon name="menu" size={30} color="#000" />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={() => {
                props.navigation.goBack();
              }}>
              <Icon name="arrow-left" size={30} color="#000" />
            </TouchableOpacity>
          )
        }
      </View>
      <View
        style={{
          flex: 1.5,
          borderWidth: 1,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Text>{props.title}</Text>
      </View>
      <View style={{flex: 1, borderWidth: 1}} />
    </View>
  );
};

// Stack Navigation
function Home({navigation}) {
  return (
    <SafeAreaView style={{flex: 1}}>
      <CustomHeader
        props={{title: 'Home Stack', isHome: true, navigation: navigation}}
      />
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text>Home Screen! Stack</Text>
        <Button
          title="Go to HomeDetails"
          onPress={() => navigation.navigate('HomeDetail')}
        />
      </View>
    </SafeAreaView>
  );
}

function HomeDetail({navigation}) {
  return (
    <SafeAreaView style={{flex: 1}}>
      <CustomHeader
        props={{
          title: 'HomeDetail Stack',
          isHome: false,
          navigation: navigation,
        }}
      />
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text>HomeDetail Screen! Stack</Text>
      </View>
    </SafeAreaView>
  );
}

function Settings({navigation}) {
  return (
    <SafeAreaView style={{flex: 1}}>
      <CustomHeader
        props={{
          title: 'Settings Stack',
          isHome: true,
          navigation: navigation,
        }}
      />
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text>Settings Screen! Stack</Text>
        <Button
          title="Go to SettingsDetail"
          onPress={() => navigation.navigate('SettingsDetail')}
        />
      </View>
    </SafeAreaView>
  );
}
function SettingsDetail({navigation}) {
  return (
    <SafeAreaView style={{flex: 1}}>
      <CustomHeader
        props={{
          title: 'SettingsDetail Stack',
          isHome: false,
          navigation: navigation,
        }}
      />
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text>SettingsDetail Screen! Stack</Text>
      </View>
    </SafeAreaView>
  );
}

function HomeStack() {
  return (
    <StackHOME.Navigator initialRouteName="Home">
      <StackHOME.Screen
        name="Home"
        component={Home}
        options={navOptionHandler}
      />
      <StackHOME.Screen
        name="HomeDetail"
        component={HomeDetail}
        options={navOptionHandler}
      />
    </StackHOME.Navigator>
  );
}
function SettingsStack() {
  return (
    <StackSETTINGS.Navigator initialRouteName="Settings">
      <StackSETTINGS.Screen
        name="Settings"
        component={Settings}
        options={navOptionHandler}
      />
      <StackSETTINGS.Screen
        name="SettingsDetail"
        component={SettingsDetail}
        options={navOptionHandler}
      />
    </StackSETTINGS.Navigator>
  );
}

// Drawer Navigation
function DrawerNavigation() {
  return (
    <Drawer.Navigator
      initialRouteName="TabNavigator"
      drawerContent={(props) => CustomDrawerContent(props)}>
      <Drawer.Screen name="TabNavigator" component={TabNavigator} />
      <Drawer.Screen name="Notifications" component={NotificationsScreen} />
    </Drawer.Navigator>
  );
}
function NotificationsScreen({navigation}) {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Button
        onPress={() => navigation.goBack()}
        title="Go Back to Tab navegation"
      />
    </View>
  );
}

function CustomDrawerContent(props) {
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#eee'}}>
      <ScrollView>
        <TouchableOpacity
          onPress={() => {
            props.navigation.navigate('TabNavigator');
          }}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: 25,
            marginHorizontal: 10,
          }}>
          <Icon name="home" size={30} color="#000" />
          <Text style={{marginLeft: 10}}>Tab Navigation</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            props.navigation.navigate('Notifications');
          }}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: 25,
            marginHorizontal: 10,
          }}>
          <Icon name="bell" size={30} color="#000" />
          <Text style={{marginLeft: 10}}>Notifications Screen</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

// Tab Navigation
function TabNavigator() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="HomeTab"
        component={HomeStack}
        options={{
          tabBarIcon: ({color, size}) => (
            <Icon name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="SettingsTab"
        component={SettingsStack}
        options={{
          tabBarIcon: ({color, size}) => (
            <Icon name="settings" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

// Login Stack Navigation
function LoginScreenStack() {
  return (
    <STACKLOGIN.Navigator initialRouteName="Login">
      <STACKLOGIN.Screen
        name="LoginScreen"
        component={LoginScreen}
        options={navOptionHandler}
      />
      <STACKLOGIN.Screen
        name="RegisterScreen"
        component={RegisterScreen}
        options={navOptionHandler}
      />
      <STACKLOGIN.Screen
        name="DrawerNavigation"
        component={DrawerNavigation}
        options={navOptionHandler}
      />
    </STACKLOGIN.Navigator>
  );
}

function LoginScreen({navigation}) {
  return (
    <View style={{flex: 1}}>
      <Text>LoginScreen</Text>
      <Button
        onPress={() => {
          navigation.navigate('DrawerNavigation');
        }}
        title="Login Now"
      />
      <Text>Register</Text>

      <Button
        onPress={() => {
          navigation.navigate('RegisterScreen');
        }}
        title="Register"
      />
    </View>
  );
}

function RegisterScreen() {
  return (
    <View>
      <Text>RegisterScreen</Text>
      <TouchableOpacity>
        <Text>Register NOW!</Text>
      </TouchableOpacity>
    </View>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <LoginScreenStack />
    </NavigationContainer>
  );
}
