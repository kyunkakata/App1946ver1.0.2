import React, { Component } from 'react'
import Menu from './components/Menu'
import ItemMenu from './components/ItemMenu'
import ShowItem from './components/ShowItem'
import Bill from './components/Bill'
import AboutUs from './components/AboutUs'
import Setting from './setting/Setting'
import Setting2 from './setting/Setting2'
import {createStackNavigator} from 'react-navigation'

export class App extends Component {
  render() {
    return (
      <RootStack />
    )
  }
}
const RootStack =createStackNavigator({
  Menu:Menu,
  ItemMenu:ItemMenu,
  ShowItem:ShowItem,
  Bill:Bill,
  AboutUs:AboutUs,
  Setting:Setting,
  Setting2:Setting2
},
{
  initialRouteName:'Menu',
  headerMode:'none',
  navigationOptions:{
    headerVisible:false,
  }
})

export default App