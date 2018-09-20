import React, { Component } from 'react'
import { Text, View,Alert,StyleSheet,Image,ImageBackground,Dimensions,Vibration,ActivityIndicator,TouchableOpacity,AsyncStorage,ScrollView} from 'react-native'
import Swiper from 'react-native-swiper'  
import FastImage from 'react-native-fast-image'
import {databaseOptions,MEAL_SCHEMA} from '../realm/allSchema'
import {imageMenu2,imageIcon} from '../realm/image'
var SoundPlayer = require('react-native-sound');
var song = null;
const {width,height} = Dimensions.get('window')
import Realm from 'realm'
const image = imageMenu2;

export default class ShowItem extends Component{
  constructor(props){
    super(props);
    this.state={
      idItem:0,
      lang:'',
      foo:'',
      amount:0,
      startSwiper:false,
    }
  }
  componentDidMount(){
    this.forceUpdate();
  }
  renderLoading(){
    return(
      <View  style={{flex:1}}>
          <ImageBackground 
          style={{flex:1,justifyContent:'center',alignItems:'center'}}
          source={imageIcon['background']}>
          <Image
            source={imageIcon['logo1946gif']} 
            style={{height:160,width:200,marginTop:20}}
          />
          <Image 
              source={imageIcon['loadinggif']}
          />
          </ImageBackground>
        </View>
    )
  }
  playBell(){
    song = new SoundPlayer('bell_sound.mp3', SoundPlayer.MAIN_BUNDLE, (error) => {
      if(error)
      {}
      else {
        Vibration.vibrate(200)
        song.play((success) => {
          if(!success)
        {}
        song.setVolume(1);
        });
      }
    });
    song.release();
  }
  playSound(){
    song = new SoundPlayer('sound.wav', SoundPlayer.MAIN_BUNDLE, (error) => {
      if(error)
      {}
      else {
        Vibration.vibrate(200)
        song.play((success) => {
          if(!success)
        {}
        song.setVolume(1);
        });
      }
    });
    song.release();
  }
  async componentWillMount(){
    setTimeout(()=>{
      this.setState({startSwiper:true})
    },500)
    const {navigation} =this.props;
    const itemId = navigation.getParam('itemId','NO-ID');
    const lang = await AsyncStorage.getItem('LANGUAGE');
    this.setState({lang});
    const foo = navigation.getParam('itemSelected','NO-ID')
    this.setState({foo});
    this.setState({idItem:itemId});
    if(100<itemId&&itemId<<200){
      Realm.open(databaseOptions).then(realm=>{
        let data=realm.objects(MEAL_SCHEMA).filtered('type == "TAMQUA"');
        this.setState({amount:data.length});
      })
    }
    if(200<itemId&&itemId<<300){
      Realm.open(databaseOptions).then(realm=>{
        let data=realm.objects(MEAL_SCHEMA).filtered('type == "PHOCHO"');
        this.setState({amount:data.length});
      })
    }
    if(300<itemId&&itemId<<400){
      Realm.open(databaseOptions).then(realm=>{
        let data=realm.objects(MEAL_SCHEMA).filtered('type == "DUACAY"');
        this.setState({amount:data.length});
      })
    }
    if(400<itemId&&itemId<<500){
      Realm.open(databaseOptions).then(realm=>{
        let data=realm.objects(MEAL_SCHEMA).filtered('type == "RAU"');
        this.setState({amount:data.length});
      })
    }
    if(500<itemId&&itemId<<600){
      Realm.open(databaseOptions).then(realm=>{
        let data=realm.objects(MEAL_SCHEMA).filtered('type == "DONGDUONG"');
        this.setState({amount:data.length});
      })
    }
    if(600<itemId&&itemId<<700){
      Realm.open(databaseOptions).then(realm=>{
        let data=realm.objects(MEAL_SCHEMA).filtered('type == "HOILANG"');
        this.setState({amount:data.length});
      })
    }
    if(700<itemId&&itemId<<800){
      Realm.open(databaseOptions).then(realm=>{
        let data=realm.objects(MEAL_SCHEMA).filtered('type == "TQKC"');
        this.setState({amount:data.length});
      })
    }
    if(800<itemId&&itemId<<900){
      Realm.open(databaseOptions).then(realm=>{
        let data=realm.objects(MEAL_SCHEMA).filtered('type == "COMNHA"');
        this.setState({amount:data.length});
      })
    }
    if(900<itemId&&itemId<<1000){
      Realm.open(databaseOptions).then(realm=>{
        let data=realm.objects(MEAL_SCHEMA).filtered('type == "CANH"');
        this.setState({amount:data.length});
      })
    }
    if(1000<itemId&&itemId<<1100){
      Realm.open(databaseOptions).then(realm=>{
        let data=realm.objects(MEAL_SCHEMA).filtered('type == "QPTD"');
        this.setState({amount:data.length});
      })
    }
    if(1100<itemId&&itemId<<1200){
      Realm.open(databaseOptions).then(realm=>{
        let data=realm.objects(MEAL_SCHEMA).filtered('type == "RUOUQUE"');
        this.setState({amount:data.length});
      })
    }
    if(1200<itemId){
      Realm.open(databaseOptions).then(realm=>{
        let data=realm.objects(MEAL_SCHEMA).filtered('type == "QUATANG"');
        this.setState({amount:data.length});
      })
    }
  }
  renderAmountSlider(amount,num,left,right,lang,index){
    if(amount==0){
      return(
        <Swiper
            onIndexChanged={()=>this.playSound()}
            index={index}
            dot={<View />}
            activeDot={<View />}
            loop={false}
          >
            
          </Swiper>
      )
    }
    else if(amount==1){
      return(
        <Swiper
            onIndexChanged={()=>this.playSound()}
            index={index}
            dot={<View />}
            activeDot={<View />}
            loop={false}
          >
            <Slider idItem={num} leftResize={left} rightResize={right} lang={lang}/>
          </Swiper>
      )
    }
    else if(amount==2){
      return(
        <Swiper
            onIndexChanged={()=>this.playSound()}
            index={index}
            dot={<View />}
            activeDot={<View />}
            loop={false}
          >
            <Slider idItem={num} leftResize={left} rightResize={right} lang={lang}/>
            <Slider idItem={num+1} leftResize={left} rightResize={right} lang={lang}/>
          </Swiper>
      )
    }
    else if(amount==3){
      return (
      <Swiper
        onIndexChanged={()=>this.playSound()}
        index={index}
        dot={<View />}
        activeDot={<View />}
        loop={false}
        >
        <Slider idItem={num} leftResize={left} rightResize={right} lang={lang}/>
        <Slider idItem={num+1} leftResize={left} rightResize={right} lang={lang}/>
        <Slider idItem={num+2} leftResize={left} rightResize={right} lang={lang}/>
      </Swiper>
      )
    }
    else if(amount==4){
      return (
      <Swiper
        onIndexChanged={()=>this.playSound()}
        index={index}
        dot={<View />}
        activeDot={<View />}
        loop={false}
        >
        <Slider idItem={num} leftResize={left} rightResize={right} lang={lang}/>
        <Slider idItem={num+1} leftResize={left} rightResize={right} lang={lang}/>
        <Slider idItem={num+2} leftResize={left} rightResize={right} lang={lang}/>
        <Slider idItem={num+3} leftResize={left} rightResize={right} lang={lang}/>
      </Swiper>
      )
    }
    else if(amount==5){
      return (
      <Swiper
        onIndexChanged={()=>this.playSound()}
        index={index}
        dot={<View />}
        activeDot={<View />}
        loop={false}
        >
        <Slider idItem={num} leftResize={left} rightResize={right} lang={lang}/>
        <Slider idItem={num+1} leftResize={left} rightResize={right} lang={lang}/>
        <Slider idItem={num+2} leftResize={left} rightResize={right} lang={lang}/>
        <Slider idItem={num+3} leftResize={left} rightResize={right} lang={lang}/>
        <Slider idItem={num+4} leftResize={left} rightResize={right} lang={lang}/>
      </Swiper>
      )
    }
    else if(amount==6){
      return (
      <Swiper
        onIndexChanged={()=>this.playSound()}
        index={index}
        dot={<View />}
        activeDot={<View />}
        loop={false}
        >
        <Slider idItem={num} leftResize={left} rightResize={right} lang={lang}/>
        <Slider idItem={num+1} leftResize={left} rightResize={right} lang={lang}/>
        <Slider idItem={num+2} leftResize={left} rightResize={right} lang={lang}/>
        <Slider idItem={num+3} leftResize={left} rightResize={right} lang={lang}/>
        <Slider idItem={num+4} leftResize={left} rightResize={right} lang={lang}/>
        <Slider idItem={num+5} leftResize={left} rightResize={right} lang={lang}/>
      </Swiper>
      )
    }
    else if(amount==7){
      return (
      <Swiper
        onIndexChanged={()=>this.playSound()}
        index={index}
        dot={<View />}
        activeDot={<View />}
        loop={false}
        >
        <Slider idItem={num} leftResize={left} rightResize={right} lang={lang}/>
        <Slider idItem={num+1} leftResize={left} rightResize={right} lang={lang}/>
        <Slider idItem={num+2} leftResize={left} rightResize={right} lang={lang}/>
        <Slider idItem={num+3} leftResize={left} rightResize={right} lang={lang}/>
        <Slider idItem={num+4} leftResize={left} rightResize={right} lang={lang}/>
        <Slider idItem={num+5} leftResize={left} rightResize={right} lang={lang}/>
        <Slider idItem={num+6} leftResize={left} rightResize={right} lang={lang}/>
      </Swiper>
      )
    }
    else if(amount==8){
      return (
      <Swiper
        onIndexChanged={()=>this.playSound()}
        index={index}
        dot={<View />}
        activeDot={<View />}
        loop={false}
        >
        <Slider idItem={num} leftResize={left} rightResize={right} lang={lang}/>
        <Slider idItem={num+1} leftResize={left} rightResize={right} lang={lang}/>
        <Slider idItem={num+2} leftResize={left} rightResize={right} lang={lang}/>
        <Slider idItem={num+3} leftResize={left} rightResize={right} lang={lang}/>
        <Slider idItem={num+4} leftResize={left} rightResize={right} lang={lang}/>
        <Slider idItem={num+5} leftResize={left} rightResize={right} lang={lang}/>
        <Slider idItem={num+6} leftResize={left} rightResize={right} lang={lang}/>
        <Slider idItem={num+7} leftResize={left} rightResize={right} lang={lang}/>
      </Swiper>
      )
    }
    else if(amount==9){
      return (
      <Swiper
        onIndexChanged={()=>this.playSound()}
        index={index}
        dot={<View />}
        activeDot={<View />}
        loop={false}
        >
        <Slider idItem={num} leftResize={left} rightResize={right} lang={lang}/>
        <Slider idItem={num+1} leftResize={left} rightResize={right} lang={lang}/>
        <Slider idItem={num+2} leftResize={left} rightResize={right} lang={lang}/>
        <Slider idItem={num+3} leftResize={left} rightResize={right} lang={lang}/>
        <Slider idItem={num+4} leftResize={left} rightResize={right} lang={lang}/>
        <Slider idItem={num+5} leftResize={left} rightResize={right} lang={lang}/>
        <Slider idItem={num+6} leftResize={left} rightResize={right} lang={lang}/>
        <Slider idItem={num+7} leftResize={left} rightResize={right} lang={lang}/>
        <Slider idItem={num+8} leftResize={left} rightResize={right} lang={lang}/>
      </Swiper>
      )
    }
    else if(amount==10){
      return (
      <Swiper
        onIndexChanged={()=>this.playSound()}
        index={index}
        dot={<View />}
        activeDot={<View />}
        loop={false}
        >
        <Slider idItem={num} leftResize={left} rightResize={right} lang={lang}/>
        <Slider idItem={num+1} leftResize={left} rightResize={right} lang={lang}/>
        <Slider idItem={num+2} leftResize={left} rightResize={right} lang={lang}/>
        <Slider idItem={num+3} leftResize={left} rightResize={right} lang={lang}/>
        <Slider idItem={num+4} leftResize={left} rightResize={right} lang={lang}/>
        <Slider idItem={num+5} leftResize={left} rightResize={right} lang={lang}/>
        <Slider idItem={num+6} leftResize={left} rightResize={right} lang={lang}/>
        <Slider idItem={num+7} leftResize={left} rightResize={right} lang={lang}/>
        <Slider idItem={num+8} leftResize={left} rightResize={right} lang={lang}/>
        <Slider idItem={num+9} leftResize={left} rightResize={right} lang={lang}/>
      </Swiper>
      )
    }
    else if(amount==11){
      return (
      <Swiper
        onIndexChanged={()=>this.playSound()}
        index={index}
        dot={<View />}
        activeDot={<View />}
        loop={false}
        >
        <Slider idItem={num} leftResize={left} rightResize={right} lang={lang}/>
        <Slider idItem={num+1} leftResize={left} rightResize={right} lang={lang}/>
        <Slider idItem={num+2} leftResize={left} rightResize={right} lang={lang}/>
        <Slider idItem={num+3} leftResize={left} rightResize={right} lang={lang}/>
        <Slider idItem={num+4} leftResize={left} rightResize={right} lang={lang}/>
        <Slider idItem={num+5} leftResize={left} rightResize={right} lang={lang}/>
        <Slider idItem={num+6} leftResize={left} rightResize={right} lang={lang}/>
        <Slider idItem={num+7} leftResize={left} rightResize={right} lang={lang}/>
        <Slider idItem={num+8} leftResize={left} rightResize={right} lang={lang}/>
        <Slider idItem={num+9} leftResize={left} rightResize={right} lang={lang}/>
        <Slider idItem={num+10} leftResize={left} rightResize={right} lang={lang}/>
      </Swiper>
      )
    }
    else if(amount==12){
      return (
      <Swiper
        onIndexChanged={()=>this.playSound()}
        index={index}
        dot={<View />}
        activeDot={<View />}
        loop={false}
        >
        <Slider idItem={num} leftResize={left} rightResize={right} lang={lang}/>
        <Slider idItem={num+1} leftResize={left} rightResize={right} lang={lang}/>
        <Slider idItem={num+2} leftResize={left} rightResize={right} lang={lang}/>
        <Slider idItem={num+3} leftResize={left} rightResize={right} lang={lang}/>
        <Slider idItem={num+4} leftResize={left} rightResize={right} lang={lang}/>
        <Slider idItem={num+5} leftResize={left} rightResize={right} lang={lang}/>
        <Slider idItem={num+6} leftResize={left} rightResize={right} lang={lang}/>
        <Slider idItem={num+7} leftResize={left} rightResize={right} lang={lang}/>
        <Slider idItem={num+8} leftResize={left} rightResize={right} lang={lang}/>
        <Slider idItem={num+9} leftResize={left} rightResize={right} lang={lang}/>
        <Slider idItem={num+10} leftResize={left} rightResize={right} lang={lang}/>
        <Slider idItem={num+11} leftResize={left} rightResize={right} lang={lang}/>
      </Swiper>
      )
    }
    else if(amount==13){
      return (
      <Swiper
        onIndexChanged={()=>this.playSound()}
        index={index}
        dot={<View />}
        activeDot={<View />}
        loop={false}
        >
        <Slider idItem={num} leftResize={left} rightResize={right} lang={lang}/>
        <Slider idItem={num+1} leftResize={left} rightResize={right} lang={lang}/>
        <Slider idItem={num+2} leftResize={left} rightResize={right} lang={lang}/>
        <Slider idItem={num+3} leftResize={left} rightResize={right} lang={lang}/>
        <Slider idItem={num+4} leftResize={left} rightResize={right} lang={lang}/>
        <Slider idItem={num+5} leftResize={left} rightResize={right} lang={lang}/>
        <Slider idItem={num+6} leftResize={left} rightResize={right} lang={lang}/>
        <Slider idItem={num+7} leftResize={left} rightResize={right} lang={lang}/>
        <Slider idItem={num+8} leftResize={left} rightResize={right} lang={lang}/>
        <Slider idItem={num+9} leftResize={left} rightResize={right} lang={lang}/>
        <Slider idItem={num+10} leftResize={left} rightResize={right} lang={lang}/>
        <Slider idItem={num+11} leftResize={left} rightResize={right} lang={lang}/>
        <Slider idItem={num+12} leftResize={left} rightResize={right} lang={lang}/>
      </Swiper>
      )
    }
    else if(amount==14){
      return (
      <Swiper
        onIndexChanged={()=>this.playSound()}
        index={index}
        dot={<View />}
        activeDot={<View />}
        loop={false}
        >
        <Slider idItem={num} leftResize={left} rightResize={right} lang={lang}/>
        <Slider idItem={num+1} leftResize={left} rightResize={right} lang={lang}/>
        <Slider idItem={num+2} leftResize={left} rightResize={right} lang={lang}/>
        <Slider idItem={num+3} leftResize={left} rightResize={right} lang={lang}/>
        <Slider idItem={num+4} leftResize={left} rightResize={right} lang={lang}/>
        <Slider idItem={num+5} leftResize={left} rightResize={right} lang={lang}/>
        <Slider idItem={num+6} leftResize={left} rightResize={right} lang={lang}/>
        <Slider idItem={num+7} leftResize={left} rightResize={right} lang={lang}/>
        <Slider idItem={num+8} leftResize={left} rightResize={right} lang={lang}/>
        <Slider idItem={num+9} leftResize={left} rightResize={right} lang={lang}/>
        <Slider idItem={num+10} leftResize={left} rightResize={right} lang={lang}/>
        <Slider idItem={num+11} leftResize={left} rightResize={right} lang={lang}/>
        <Slider idItem={num+12} leftResize={left} rightResize={right} lang={lang}/>
        <Slider idItem={num+13} leftResize={left} rightResize={right} lang={lang}/>
      </Swiper>
      )
    }
    else if(amount==15){
      return (
      <Swiper
        onIndexChanged={()=>this.playSound()}
        index={index}
        dot={<View />}
        activeDot={<View />}
        loop={false}
        >
        <Slider idItem={num} leftResize={left} rightResize={right} lang={lang}/>
        <Slider idItem={num+1} leftResize={left} rightResize={right} lang={lang}/>
        <Slider idItem={num+2} leftResize={left} rightResize={right} lang={lang}/>
        <Slider idItem={num+3} leftResize={left} rightResize={right} lang={lang}/>
        <Slider idItem={num+4} leftResize={left} rightResize={right} lang={lang}/>
        <Slider idItem={num+5} leftResize={left} rightResize={right} lang={lang}/>
        <Slider idItem={num+6} leftResize={left} rightResize={right} lang={lang}/>
        <Slider idItem={num+7} leftResize={left} rightResize={right} lang={lang}/>
        <Slider idItem={num+8} leftResize={left} rightResize={right} lang={lang}/>
        <Slider idItem={num+9} leftResize={left} rightResize={right} lang={lang}/>
        <Slider idItem={num+10} leftResize={left} rightResize={right} lang={lang}/>
        <Slider idItem={num+11} leftResize={left} rightResize={right} lang={lang}/>
        <Slider idItem={num+12} leftResize={left} rightResize={right} lang={lang}/>
        <Slider idItem={num+13} leftResize={left} rightResize={right} lang={lang}/>
        <Slider idItem={num+14} leftResize={left} rightResize={right} lang={lang}/>
      </Swiper>
      )
    }
    else if(amount==16){
      return (
      <Swiper
        onIndexChanged={()=>this.playSound()}
        index={index}
        dot={<View />}
        activeDot={<View />}
        loop={false}
        >
        <Slider idItem={num} leftResize={left} rightResize={right} lang={lang}/>
        <Slider idItem={num+1} leftResize={left} rightResize={right} lang={lang}/>
        <Slider idItem={num+2} leftResize={left} rightResize={right} lang={lang}/>
        <Slider idItem={num+3} leftResize={left} rightResize={right} lang={lang}/>
        <Slider idItem={num+4} leftResize={left} rightResize={right} lang={lang}/>
        <Slider idItem={num+5} leftResize={left} rightResize={right} lang={lang}/>
        <Slider idItem={num+6} leftResize={left} rightResize={right} lang={lang}/>
        <Slider idItem={num+7} leftResize={left} rightResize={right} lang={lang}/>
        <Slider idItem={num+8} leftResize={left} rightResize={right} lang={lang}/>
        <Slider idItem={num+9} leftResize={left} rightResize={right} lang={lang}/>
        <Slider idItem={num+10} leftResize={left} rightResize={right} lang={lang}/>
        <Slider idItem={num+11} leftResize={left} rightResize={right} lang={lang}/>
        <Slider idItem={num+12} leftResize={left} rightResize={right} lang={lang}/>
        <Slider idItem={num+13} leftResize={left} rightResize={right} lang={lang}/>
        <Slider idItem={num+14} leftResize={left} rightResize={right} lang={lang}/>
        <Slider idItem={num+15} leftResize={left} rightResize={right} lang={lang}/>
      </Swiper>
      )
    }
    else if(amount==17){
      return (
      <Swiper
        onIndexChanged={()=>this.playSound()}
        index={index}
        dot={<View />}
        activeDot={<View />}
        loop={false}
        >
        <Slider idItem={num} leftResize={left} rightResize={right} lang={lang}/>
        <Slider idItem={num+1} leftResize={left} rightResize={right} lang={lang}/>
        <Slider idItem={num+2} leftResize={left} rightResize={right} lang={lang}/>
        <Slider idItem={num+3} leftResize={left} rightResize={right} lang={lang}/>
        <Slider idItem={num+4} leftResize={left} rightResize={right} lang={lang}/>
        <Slider idItem={num+5} leftResize={left} rightResize={right} lang={lang}/>
        <Slider idItem={num+6} leftResize={left} rightResize={right} lang={lang}/>
        <Slider idItem={num+7} leftResize={left} rightResize={right} lang={lang}/>
        <Slider idItem={num+8} leftResize={left} rightResize={right} lang={lang}/>
        <Slider idItem={num+9} leftResize={left} rightResize={right} lang={lang}/>
        <Slider idItem={num+10} leftResize={left} rightResize={right} lang={lang}/>
        <Slider idItem={num+11} leftResize={left} rightResize={right} lang={lang}/>
        <Slider idItem={num+12} leftResize={left} rightResize={right} lang={lang}/>
        <Slider idItem={num+13} leftResize={left} rightResize={right} lang={lang}/>
        <Slider idItem={num+14} leftResize={left} rightResize={right} lang={lang}/>
        <Slider idItem={num+15} leftResize={left} rightResize={right} lang={lang}/>
        <Slider idItem={num+16} leftResize={left} rightResize={right} lang={lang}/>
      </Swiper>
      )
    }
    else if(amount==18){
      return (
      <Swiper
        onIndexChanged={()=>this.playSound()}
        index={index}
        dot={<View />}
        activeDot={<View />}
        loop={false}
        >
        <Slider idItem={num} leftResize={left} rightResize={right} lang={lang}/>
        <Slider idItem={num+1} leftResize={left} rightResize={right} lang={lang}/>
        <Slider idItem={num+2} leftResize={left} rightResize={right} lang={lang}/>
        <Slider idItem={num+3} leftResize={left} rightResize={right} lang={lang}/>
        <Slider idItem={num+4} leftResize={left} rightResize={right} lang={lang}/>
        <Slider idItem={num+5} leftResize={left} rightResize={right} lang={lang}/>
        <Slider idItem={num+6} leftResize={left} rightResize={right} lang={lang}/>
        <Slider idItem={num+7} leftResize={left} rightResize={right} lang={lang}/>
        <Slider idItem={num+8} leftResize={left} rightResize={right} lang={lang}/>
        <Slider idItem={num+9} leftResize={left} rightResize={right} lang={lang}/>
        <Slider idItem={num+10} leftResize={left} rightResize={right} lang={lang}/>
        <Slider idItem={num+11} leftResize={left} rightResize={right} lang={lang}/>
        <Slider idItem={num+12} leftResize={left} rightResize={right} lang={lang}/>
        <Slider idItem={num+13} leftResize={left} rightResize={right} lang={lang}/>
        <Slider idItem={num+14} leftResize={left} rightResize={right} lang={lang}/>
        <Slider idItem={num+15} leftResize={left} rightResize={right} lang={lang}/>
        <Slider idItem={num+16} leftResize={left} rightResize={right} lang={lang}/>
        <Slider idItem={num+17} leftResize={left} rightResize={right} lang={lang}/>
      </Swiper>
      )
    }
    else if(amount==19){
      return (
      <Swiper
        onIndexChanged={()=>this.playSound()}
        index={index}
        dot={<View />}
        activeDot={<View />}
        loop={false}
        >
        <Slider idItem={num} leftResize={left} rightResize={right} lang={lang}/>
        <Slider idItem={num+1} leftResize={left} rightResize={right} lang={lang}/>
        <Slider idItem={num+2} leftResize={left} rightResize={right} lang={lang}/>
        <Slider idItem={num+3} leftResize={left} rightResize={right} lang={lang}/>
        <Slider idItem={num+4} leftResize={left} rightResize={right} lang={lang}/>
        <Slider idItem={num+5} leftResize={left} rightResize={right} lang={lang}/>
        <Slider idItem={num+6} leftResize={left} rightResize={right} lang={lang}/>
        <Slider idItem={num+7} leftResize={left} rightResize={right} lang={lang}/>
        <Slider idItem={num+8} leftResize={left} rightResize={right} lang={lang}/>
        <Slider idItem={num+9} leftResize={left} rightResize={right} lang={lang}/>
        <Slider idItem={num+10} leftResize={left} rightResize={right} lang={lang}/>
        <Slider idItem={num+11} leftResize={left} rightResize={right} lang={lang}/>
        <Slider idItem={num+12} leftResize={left} rightResize={right} lang={lang}/>
        <Slider idItem={num+13} leftResize={left} rightResize={right} lang={lang}/>
        <Slider idItem={num+14} leftResize={left} rightResize={right} lang={lang}/>
        <Slider idItem={num+15} leftResize={left} rightResize={right} lang={lang}/>
        <Slider idItem={num+16} leftResize={left} rightResize={right} lang={lang}/>
        <Slider idItem={num+17} leftResize={left} rightResize={right} lang={lang}/>
        <Slider idItem={num+18} leftResize={left} rightResize={right} lang={lang}/>
      </Swiper>
      )
    }
    else if(amount==20){
      return (
      <Swiper
        onIndexChanged={()=>this.playSound()}
        index={index}
        dot={<View />}
        activeDot={<View />}
        loop={false}
        >
        <Slider idItem={num} leftResize={left} rightResize={right} lang={lang}/>
        <Slider idItem={num+1} leftResize={left} rightResize={right} lang={lang}/>
        <Slider idItem={num+2} leftResize={left} rightResize={right} lang={lang}/>
        <Slider idItem={num+3} leftResize={left} rightResize={right} lang={lang}/>
        <Slider idItem={num+4} leftResize={left} rightResize={right} lang={lang}/>
        <Slider idItem={num+5} leftResize={left} rightResize={right} lang={lang}/>
        <Slider idItem={num+6} leftResize={left} rightResize={right} lang={lang}/>
        <Slider idItem={num+7} leftResize={left} rightResize={right} lang={lang}/>
        <Slider idItem={num+8} leftResize={left} rightResize={right} lang={lang}/>
        <Slider idItem={num+9} leftResize={left} rightResize={right} lang={lang}/>
        <Slider idItem={num+10} leftResize={left} rightResize={right} lang={lang}/>
        <Slider idItem={num+11} leftResize={left} rightResize={right} lang={lang}/>
        <Slider idItem={num+12} leftResize={left} rightResize={right} lang={lang}/>
        <Slider idItem={num+13} leftResize={left} rightResize={right} lang={lang}/>
        <Slider idItem={num+14} leftResize={left} rightResize={right} lang={lang}/>
        <Slider idItem={num+15} leftResize={left} rightResize={right} lang={lang}/>
        <Slider idItem={num+16} leftResize={left} rightResize={right} lang={lang}/>
        <Slider idItem={num+17} leftResize={left} rightResize={right} lang={lang}/>
        <Slider idItem={num+18} leftResize={left} rightResize={right} lang={lang}/>
        <Slider idItem={num+19} leftResize={left} rightResize={right} lang={lang}/>
      </Swiper>
      )
    }
    else if(amount==21){
      return (
      <Swiper
        onIndexChanged={()=>this.playSound()}
        index={index}
        dot={<View />}
        activeDot={<View />}
        loop={false}
        >
        <Slider idItem={num} leftResize={left} rightResize={right} lang={lang}/>
        <Slider idItem={num+1} leftResize={left} rightResize={right} lang={lang}/>
        <Slider idItem={num+2} leftResize={left} rightResize={right} lang={lang}/>
        <Slider idItem={num+3} leftResize={left} rightResize={right} lang={lang}/>
        <Slider idItem={num+4} leftResize={left} rightResize={right} lang={lang}/>
        <Slider idItem={num+5} leftResize={left} rightResize={right} lang={lang}/>
        <Slider idItem={num+6} leftResize={left} rightResize={right} lang={lang}/>
        <Slider idItem={num+7} leftResize={left} rightResize={right} lang={lang}/>
        <Slider idItem={num+8} leftResize={left} rightResize={right} lang={lang}/>
        <Slider idItem={num+9} leftResize={left} rightResize={right} lang={lang}/>
        <Slider idItem={num+10} leftResize={left} rightResize={right} lang={lang}/>
        <Slider idItem={num+11} leftResize={left} rightResize={right} lang={lang}/>
        <Slider idItem={num+12} leftResize={left} rightResize={right} lang={lang}/>
        <Slider idItem={num+13} leftResize={left} rightResize={right} lang={lang}/>
        <Slider idItem={num+14} leftResize={left} rightResize={right} lang={lang}/>
        <Slider idItem={num+15} leftResize={left} rightResize={right} lang={lang}/>
        <Slider idItem={num+16} leftResize={left} rightResize={right} lang={lang}/>
        <Slider idItem={num+17} leftResize={left} rightResize={right} lang={lang}/>
        <Slider idItem={num+18} leftResize={left} rightResize={right} lang={lang}/>
        <Slider idItem={num+19} leftResize={left} rightResize={right} lang={lang}/>
        <Slider idItem={num+20} leftResize={left} rightResize={right} lang={lang}/>
      </Swiper>
      )
    }
    else if(amount==22){
      return (
      <Swiper
        onIndexChanged={()=>this.playSound()}
        index={index}
        dot={<View />}
        activeDot={<View />}
        loop={false}
        >
        <Slider idItem={num} leftResize={left} rightResize={right} lang={lang}/>
        <Slider idItem={num+1} leftResize={left} rightResize={right} lang={lang}/>
        <Slider idItem={num+2} leftResize={left} rightResize={right} lang={lang}/>
        <Slider idItem={num+3} leftResize={left} rightResize={right} lang={lang}/>
        <Slider idItem={num+4} leftResize={left} rightResize={right} lang={lang}/>
        <Slider idItem={num+5} leftResize={left} rightResize={right} lang={lang}/>
        <Slider idItem={num+6} leftResize={left} rightResize={right} lang={lang}/>
        <Slider idItem={num+7} leftResize={left} rightResize={right} lang={lang}/>
        <Slider idItem={num+8} leftResize={left} rightResize={right} lang={lang}/>
        <Slider idItem={num+9} leftResize={left} rightResize={right} lang={lang}/>
        <Slider idItem={num+10} leftResize={left} rightResize={right} lang={lang}/>
        <Slider idItem={num+11} leftResize={left} rightResize={right} lang={lang}/>
        <Slider idItem={num+12} leftResize={left} rightResize={right} lang={lang}/>
        <Slider idItem={num+13} leftResize={left} rightResize={right} lang={lang}/>
        <Slider idItem={num+14} leftResize={left} rightResize={right} lang={lang}/>
        <Slider idItem={num+15} leftResize={left} rightResize={right} lang={lang}/>
        <Slider idItem={num+16} leftResize={left} rightResize={right} lang={lang}/>
        <Slider idItem={num+17} leftResize={left} rightResize={right} lang={lang}/>
        <Slider idItem={num+18} leftResize={left} rightResize={right} lang={lang}/>
        <Slider idItem={num+19} leftResize={left} rightResize={right} lang={lang}/>
        <Slider idItem={num+20} leftResize={left} rightResize={right} lang={lang}/>
        <Slider idItem={num+21} leftResize={left} rightResize={right} lang={lang}/>
      </Swiper>
      )
    }
    else if(amount==23){
      return (
      <Swiper
        onIndexChanged={()=>this.playSound()}
        index={index}
        dot={<View />}
        activeDot={<View />}
        loop={false}
        >
        <Slider idItem={num} leftResize={left} rightResize={right} lang={lang}/>
        <Slider idItem={num+1} leftResize={left} rightResize={right} lang={lang}/>
        <Slider idItem={num+2} leftResize={left} rightResize={right} lang={lang}/>
        <Slider idItem={num+3} leftResize={left} rightResize={right} lang={lang}/>
        <Slider idItem={num+4} leftResize={left} rightResize={right} lang={lang}/>
        <Slider idItem={num+5} leftResize={left} rightResize={right} lang={lang}/>
        <Slider idItem={num+6} leftResize={left} rightResize={right} lang={lang}/>
        <Slider idItem={num+7} leftResize={left} rightResize={right} lang={lang}/>
        <Slider idItem={num+8} leftResize={left} rightResize={right} lang={lang}/>
        <Slider idItem={num+9} leftResize={left} rightResize={right} lang={lang}/>
        <Slider idItem={num+10} leftResize={left} rightResize={right} lang={lang}/>
        <Slider idItem={num+11} leftResize={left} rightResize={right} lang={lang}/>
        <Slider idItem={num+12} leftResize={left} rightResize={right} lang={lang}/>
        <Slider idItem={num+13} leftResize={left} rightResize={right} lang={lang}/>
        <Slider idItem={num+14} leftResize={left} rightResize={right} lang={lang}/>
        <Slider idItem={num+15} leftResize={left} rightResize={right} lang={lang}/>
        <Slider idItem={num+16} leftResize={left} rightResize={right} lang={lang}/>
        <Slider idItem={num+17} leftResize={left} rightResize={right} lang={lang}/>
        <Slider idItem={num+18} leftResize={left} rightResize={right} lang={lang}/>
        <Slider idItem={num+19} leftResize={left} rightResize={right} lang={lang}/>
        <Slider idItem={num+20} leftResize={left} rightResize={right} lang={lang}/>
        <Slider idItem={num+21} leftResize={left} rightResize={right} lang={lang}/>
        <Slider idItem={num+22} leftResize={left} rightResize={right} lang={lang}/>
      </Swiper>
      )
    }
    else if(amount==24){
      return (
      <Swiper
        onIndexChanged={()=>this.playSound()}
        index={index}
        dot={<View />}
        activeDot={<View />}
        loop={false}
        >
        <Slider idItem={num} leftResize={left} rightResize={right} lang={lang}/>
        <Slider idItem={num+1} leftResize={left} rightResize={right} lang={lang}/>
        <Slider idItem={num+2} leftResize={left} rightResize={right} lang={lang}/>
        <Slider idItem={num+3} leftResize={left} rightResize={right} lang={lang}/>
        <Slider idItem={num+4} leftResize={left} rightResize={right} lang={lang}/>
        <Slider idItem={num+5} leftResize={left} rightResize={right} lang={lang}/>
        <Slider idItem={num+6} leftResize={left} rightResize={right} lang={lang}/>
        <Slider idItem={num+7} leftResize={left} rightResize={right} lang={lang}/>
        <Slider idItem={num+8} leftResize={left} rightResize={right} lang={lang}/>
        <Slider idItem={num+9} leftResize={left} rightResize={right} lang={lang}/>
        <Slider idItem={num+10} leftResize={left} rightResize={right} lang={lang}/>
        <Slider idItem={num+11} leftResize={left} rightResize={right} lang={lang}/>
        <Slider idItem={num+12} leftResize={left} rightResize={right} lang={lang}/>
        <Slider idItem={num+13} leftResize={left} rightResize={right} lang={lang}/>
        <Slider idItem={num+14} leftResize={left} rightResize={right} lang={lang}/>
        <Slider idItem={num+15} leftResize={left} rightResize={right} lang={lang}/>
        <Slider idItem={num+16} leftResize={left} rightResize={right} lang={lang}/>
        <Slider idItem={num+17} leftResize={left} rightResize={right} lang={lang}/>
        <Slider idItem={num+18} leftResize={left} rightResize={right} lang={lang}/>
        <Slider idItem={num+19} leftResize={left} rightResize={right} lang={lang}/>
        <Slider idItem={num+20} leftResize={left} rightResize={right} lang={lang}/>
        <Slider idItem={num+21} leftResize={left} rightResize={right} lang={lang}/>
        <Slider idItem={num+22} leftResize={left} rightResize={right} lang={lang}/>
        <Slider idItem={num+23} leftResize={left} rightResize={right} lang={lang}/>
      </Swiper>
      )
    }
    else if(amount==25){
      return (
      <Swiper
        onIndexChanged={()=>this.playSound()}
        index={index}
        dot={<View />}
        activeDot={<View />}
        loop={false}
        >
        <Slider idItem={num} leftResize={left} rightResize={right} lang={lang}/>
        <Slider idItem={num+1} leftResize={left} rightResize={right} lang={lang}/>
        <Slider idItem={num+2} leftResize={left} rightResize={right} lang={lang}/>
        <Slider idItem={num+3} leftResize={left} rightResize={right} lang={lang}/>
        <Slider idItem={num+4} leftResize={left} rightResize={right} lang={lang}/>
        <Slider idItem={num+5} leftResize={left} rightResize={right} lang={lang}/>
        <Slider idItem={num+6} leftResize={left} rightResize={right} lang={lang}/>
        <Slider idItem={num+7} leftResize={left} rightResize={right} lang={lang}/>
        <Slider idItem={num+8} leftResize={left} rightResize={right} lang={lang}/>
        <Slider idItem={num+9} leftResize={left} rightResize={right} lang={lang}/>
        <Slider idItem={num+10} leftResize={left} rightResize={right} lang={lang}/>
        <Slider idItem={num+11} leftResize={left} rightResize={right} lang={lang}/>
        <Slider idItem={num+12} leftResize={left} rightResize={right} lang={lang}/>
        <Slider idItem={num+13} leftResize={left} rightResize={right} lang={lang}/>
        <Slider idItem={num+14} leftResize={left} rightResize={right} lang={lang}/>
        <Slider idItem={num+15} leftResize={left} rightResize={right} lang={lang}/>
        <Slider idItem={num+16} leftResize={left} rightResize={right} lang={lang}/>
        <Slider idItem={num+17} leftResize={left} rightResize={right} lang={lang}/>
        <Slider idItem={num+18} leftResize={left} rightResize={right} lang={lang}/>
        <Slider idItem={num+19} leftResize={left} rightResize={right} lang={lang}/>
        <Slider idItem={num+20} leftResize={left} rightResize={right} lang={lang}/>
        <Slider idItem={num+21} leftResize={left} rightResize={right} lang={lang}/>
        <Slider idItem={num+22} leftResize={left} rightResize={right} lang={lang}/>
        <Slider idItem={num+23} leftResize={left} rightResize={right} lang={lang}/>
        <Slider idItem={num+24} leftResize={left} rightResize={right} lang={lang}/>
      </Swiper>
      )
    }
    else if(amount==26){
      return (
      <Swiper
        onIndexChanged={()=>this.playSound()}
        index={index}
        dot={<View />}
        activeDot={<View />}
        loop={false}
        >
        <Slider idItem={num} leftResize={left} rightResize={right} lang={lang}/>
        <Slider idItem={num+1} leftResize={left} rightResize={right} lang={lang}/>
        <Slider idItem={num+2} leftResize={left} rightResize={right} lang={lang}/>
        <Slider idItem={num+3} leftResize={left} rightResize={right} lang={lang}/>
        <Slider idItem={num+4} leftResize={left} rightResize={right} lang={lang}/>
        <Slider idItem={num+5} leftResize={left} rightResize={right} lang={lang}/>
        <Slider idItem={num+6} leftResize={left} rightResize={right} lang={lang}/>
        <Slider idItem={num+7} leftResize={left} rightResize={right} lang={lang}/>
        <Slider idItem={num+8} leftResize={left} rightResize={right} lang={lang}/>
        <Slider idItem={num+9} leftResize={left} rightResize={right} lang={lang}/>
        <Slider idItem={num+10} leftResize={left} rightResize={right} lang={lang}/>
        <Slider idItem={num+11} leftResize={left} rightResize={right} lang={lang}/>
        <Slider idItem={num+12} leftResize={left} rightResize={right} lang={lang}/>
        <Slider idItem={num+13} leftResize={left} rightResize={right} lang={lang}/>
        <Slider idItem={num+14} leftResize={left} rightResize={right} lang={lang}/>
        <Slider idItem={num+15} leftResize={left} rightResize={right} lang={lang}/>
        <Slider idItem={num+16} leftResize={left} rightResize={right} lang={lang}/>
        <Slider idItem={num+17} leftResize={left} rightResize={right} lang={lang}/>
        <Slider idItem={num+18} leftResize={left} rightResize={right} lang={lang}/>
        <Slider idItem={num+19} leftResize={left} rightResize={right} lang={lang}/>
        <Slider idItem={num+20} leftResize={left} rightResize={right} lang={lang}/>
        <Slider idItem={num+21} leftResize={left} rightResize={right} lang={lang}/>
        <Slider idItem={num+22} leftResize={left} rightResize={right} lang={lang}/>
        <Slider idItem={num+23} leftResize={left} rightResize={right} lang={lang}/>
        <Slider idItem={num+24} leftResize={left} rightResize={right} lang={lang}/>
        <Slider idItem={num+25} leftResize={left} rightResize={right} lang={lang}/>
      </Swiper>
      )
    }
    else if(amount==27){
      return (
      <Swiper
        onIndexChanged={()=>this.playSound()}
        index={index}
        dot={<View />}
        activeDot={<View />}
        loop={false}
        >
        <Slider idItem={num} leftResize={left} rightResize={right} lang={lang}/>
        <Slider idItem={num+1} leftResize={left} rightResize={right} lang={lang}/>
        <Slider idItem={num+2} leftResize={left} rightResize={right} lang={lang}/>
        <Slider idItem={num+3} leftResize={left} rightResize={right} lang={lang}/>
        <Slider idItem={num+4} leftResize={left} rightResize={right} lang={lang}/>
        <Slider idItem={num+5} leftResize={left} rightResize={right} lang={lang}/>
        <Slider idItem={num+6} leftResize={left} rightResize={right} lang={lang}/>
        <Slider idItem={num+7} leftResize={left} rightResize={right} lang={lang}/>
        <Slider idItem={num+8} leftResize={left} rightResize={right} lang={lang}/>
        <Slider idItem={num+9} leftResize={left} rightResize={right} lang={lang}/>
        <Slider idItem={num+10} leftResize={left} rightResize={right} lang={lang}/>
        <Slider idItem={num+11} leftResize={left} rightResize={right} lang={lang}/>
        <Slider idItem={num+12} leftResize={left} rightResize={right} lang={lang}/>
        <Slider idItem={num+13} leftResize={left} rightResize={right} lang={lang}/>
        <Slider idItem={num+14} leftResize={left} rightResize={right} lang={lang}/>
        <Slider idItem={num+15} leftResize={left} rightResize={right} lang={lang}/>
        <Slider idItem={num+16} leftResize={left} rightResize={right} lang={lang}/>
        <Slider idItem={num+17} leftResize={left} rightResize={right} lang={lang}/>
        <Slider idItem={num+18} leftResize={left} rightResize={right} lang={lang}/>
        <Slider idItem={num+19} leftResize={left} rightResize={right} lang={lang}/>
        <Slider idItem={num+20} leftResize={left} rightResize={right} lang={lang}/>
        <Slider idItem={num+21} leftResize={left} rightResize={right} lang={lang}/>
        <Slider idItem={num+22} leftResize={left} rightResize={right} lang={lang}/>
        <Slider idItem={num+23} leftResize={left} rightResize={right} lang={lang}/>
        <Slider idItem={num+24} leftResize={left} rightResize={right} lang={lang}/>
        <Slider idItem={num+25} leftResize={left} rightResize={right} lang={lang}/>
        <Slider idItem={num+26} leftResize={left} rightResize={right} lang={lang}/>
      </Swiper>
      )
    }
    else if(amount==28){
      return (
      <Swiper
        onIndexChanged={()=>this.playSound()}
        index={index}
        dot={<View />}
        activeDot={<View />}
        loop={false}
        >
        <Slider idItem={num} leftResize={left} rightResize={right} lang={lang}/>
        <Slider idItem={num+1} leftResize={left} rightResize={right} lang={lang}/>
        <Slider idItem={num+2} leftResize={left} rightResize={right} lang={lang}/>
        <Slider idItem={num+3} leftResize={left} rightResize={right} lang={lang}/>
        <Slider idItem={num+4} leftResize={left} rightResize={right} lang={lang}/>
        <Slider idItem={num+5} leftResize={left} rightResize={right} lang={lang}/>
        <Slider idItem={num+6} leftResize={left} rightResize={right} lang={lang}/>
        <Slider idItem={num+7} leftResize={left} rightResize={right} lang={lang}/>
        <Slider idItem={num+8} leftResize={left} rightResize={right} lang={lang}/>
        <Slider idItem={num+9} leftResize={left} rightResize={right} lang={lang}/>
        <Slider idItem={num+10} leftResize={left} rightResize={right} lang={lang}/>
        <Slider idItem={num+11} leftResize={left} rightResize={right} lang={lang}/>
        <Slider idItem={num+12} leftResize={left} rightResize={right} lang={lang}/>
        <Slider idItem={num+13} leftResize={left} rightResize={right} lang={lang}/>
        <Slider idItem={num+14} leftResize={left} rightResize={right} lang={lang}/>
        <Slider idItem={num+15} leftResize={left} rightResize={right} lang={lang}/>
        <Slider idItem={num+16} leftResize={left} rightResize={right} lang={lang}/>
        <Slider idItem={num+17} leftResize={left} rightResize={right} lang={lang}/>
        <Slider idItem={num+18} leftResize={left} rightResize={right} lang={lang}/>
        <Slider idItem={num+19} leftResize={left} rightResize={right} lang={lang}/>
        <Slider idItem={num+20} leftResize={left} rightResize={right} lang={lang}/>
        <Slider idItem={num+21} leftResize={left} rightResize={right} lang={lang}/>
        <Slider idItem={num+22} leftResize={left} rightResize={right} lang={lang}/>
        <Slider idItem={num+23} leftResize={left} rightResize={right} lang={lang}/>
        <Slider idItem={num+24} leftResize={left} rightResize={right} lang={lang}/>
        <Slider idItem={num+25} leftResize={left} rightResize={right} lang={lang}/>
        <Slider idItem={num+26} leftResize={left} rightResize={right} lang={lang}/>
        <Slider idItem={num+27} leftResize={left} rightResize={right} lang={lang}/>
      </Swiper>
      )
    }
    else if(amount==29){
      return (
      <Swiper
        onIndexChanged={()=>this.playSound()}
        index={index}
        dot={<View />}
        activeDot={<View />}
        loop={false}
        >
        <Slider idItem={num} leftResize={left} rightResize={right} lang={lang}/>
        <Slider idItem={num+1} leftResize={left} rightResize={right} lang={lang}/>
        <Slider idItem={num+2} leftResize={left} rightResize={right} lang={lang}/>
        <Slider idItem={num+3} leftResize={left} rightResize={right} lang={lang}/>
        <Slider idItem={num+4} leftResize={left} rightResize={right} lang={lang}/>
        <Slider idItem={num+5} leftResize={left} rightResize={right} lang={lang}/>
        <Slider idItem={num+6} leftResize={left} rightResize={right} lang={lang}/>
        <Slider idItem={num+7} leftResize={left} rightResize={right} lang={lang}/>
        <Slider idItem={num+8} leftResize={left} rightResize={right} lang={lang}/>
        <Slider idItem={num+9} leftResize={left} rightResize={right} lang={lang}/>
        <Slider idItem={num+10} leftResize={left} rightResize={right} lang={lang}/>
        <Slider idItem={num+11} leftResize={left} rightResize={right} lang={lang}/>
        <Slider idItem={num+12} leftResize={left} rightResize={right} lang={lang}/>
        <Slider idItem={num+13} leftResize={left} rightResize={right} lang={lang}/>
        <Slider idItem={num+14} leftResize={left} rightResize={right} lang={lang}/>
        <Slider idItem={num+15} leftResize={left} rightResize={right} lang={lang}/>
        <Slider idItem={num+16} leftResize={left} rightResize={right} lang={lang}/>
        <Slider idItem={num+17} leftResize={left} rightResize={right} lang={lang}/>
        <Slider idItem={num+18} leftResize={left} rightResize={right} lang={lang}/>
        <Slider idItem={num+19} leftResize={left} rightResize={right} lang={lang}/>
        <Slider idItem={num+20} leftResize={left} rightResize={right} lang={lang}/>
        <Slider idItem={num+21} leftResize={left} rightResize={right} lang={lang}/>
        <Slider idItem={num+22} leftResize={left} rightResize={right} lang={lang}/>
        <Slider idItem={num+23} leftResize={left} rightResize={right} lang={lang}/>
        <Slider idItem={num+24} leftResize={left} rightResize={right} lang={lang}/>
        <Slider idItem={num+25} leftResize={left} rightResize={right} lang={lang}/>
        <Slider idItem={num+26} leftResize={left} rightResize={right} lang={lang}/>
        <Slider idItem={num+27} leftResize={left} rightResize={right} lang={lang}/>
        <Slider idItem={num+28} leftResize={left} rightResize={right} lang={lang}/>
      </Swiper>
      )
    }
    else if(amount==30){
      return (
      <Swiper
        onIndexChanged={()=>this.playSound()}
        index={index}
        dot={<View />}
        activeDot={<View />}
        loop={false}
        >
        <Slider idItem={num} leftResize={left} rightResize={right} lang={lang}/>
        <Slider idItem={num+1} leftResize={left} rightResize={right} lang={lang}/>
        <Slider idItem={num+2} leftResize={left} rightResize={right} lang={lang}/>
        <Slider idItem={num+3} leftResize={left} rightResize={right} lang={lang}/>
        <Slider idItem={num+4} leftResize={left} rightResize={right} lang={lang}/>
        <Slider idItem={num+5} leftResize={left} rightResize={right} lang={lang}/>
        <Slider idItem={num+6} leftResize={left} rightResize={right} lang={lang}/>
        <Slider idItem={num+7} leftResize={left} rightResize={right} lang={lang}/>
        <Slider idItem={num+8} leftResize={left} rightResize={right} lang={lang}/>
        <Slider idItem={num+9} leftResize={left} rightResize={right} lang={lang}/>
        <Slider idItem={num+10} leftResize={left} rightResize={right} lang={lang}/>
        <Slider idItem={num+11} leftResize={left} rightResize={right} lang={lang}/>
        <Slider idItem={num+12} leftResize={left} rightResize={right} lang={lang}/>
        <Slider idItem={num+13} leftResize={left} rightResize={right} lang={lang}/>
        <Slider idItem={num+14} leftResize={left} rightResize={right} lang={lang}/>
        <Slider idItem={num+15} leftResize={left} rightResize={right} lang={lang}/>
        <Slider idItem={num+16} leftResize={left} rightResize={right} lang={lang}/>
        <Slider idItem={num+17} leftResize={left} rightResize={right} lang={lang}/>
        <Slider idItem={num+18} leftResize={left} rightResize={right} lang={lang}/>
        <Slider idItem={num+19} leftResize={left} rightResize={right} lang={lang}/>
        <Slider idItem={num+20} leftResize={left} rightResize={right} lang={lang}/>
        <Slider idItem={num+21} leftResize={left} rightResize={right} lang={lang}/>
        <Slider idItem={num+22} leftResize={left} rightResize={right} lang={lang}/>
        <Slider idItem={num+23} leftResize={left} rightResize={right} lang={lang}/>
        <Slider idItem={num+24} leftResize={left} rightResize={right} lang={lang}/>
        <Slider idItem={num+25} leftResize={left} rightResize={right} lang={lang}/>
        <Slider idItem={num+26} leftResize={left} rightResize={right} lang={lang}/>
        <Slider idItem={num+27} leftResize={left} rightResize={right} lang={lang}/>
        <Slider idItem={num+28} leftResize={left} rightResize={right} lang={lang}/>
        <Slider idItem={num+29} leftResize={left} rightResize={right} lang={lang}/>
      </Swiper>
      )
    }

  }
  renderItem(s){
    //TODO :Tam qua
    if(100<s &&s <200){
      const num= 101;
      const index=s-101;
      return(
        <ImageBackground source={imageIcon['background']} style={{flex:1}} >
          {/*Slide*/}
          <View style={{height:160,width:width,alignItems:'center'}}>
          <TouchableOpacity onPress={()=>this._gotoAbout()}>
          <FastImage
          source={imageIcon['logo1946gif']} 
          style={{height:160,width:200,marginTop:20,alignSelf:'center'}}
          />
          </TouchableOpacity>
          </View>
          {this.renderAmountSlider(this.state.amount,num,0,-5,this.state.lang,index)}
          {this.renderBottomBar()}
        </ImageBackground>
      )
    }
    //TODO :Pho cho
    if(200<s &&s <300){
      const num= 201;
      const index=s-201;
          return(
            <ImageBackground source={imageIcon['background']} style={{flex:1}} >
              {/*Slide*/}
              <View style={{height:160,width:width,alignItems:'center'}}>
              <TouchableOpacity onPress={()=>this._gotoAbout()}>
              <FastImage
              source={imageIcon['logo1946gif']} 
              style={{height:160,width:200,marginTop:20,alignSelf:'center'}}
              />
              </TouchableOpacity>
              </View>
              {this.renderAmountSlider(this.state.amount,num,0,-5,this.state.lang,index)}
              {this.renderBottomBar()}
            </ImageBackground>
          )
        }
    //TODO :Dua cay
    if(300<s &&s <400){
      const num= 301;
      const index=s-301;
      return(
        <ImageBackground source={imageIcon} style={{flex:1}} >
          {/*Slide*/}
          <View style={{height:160,width:width,alignItems:'center'}}>
          <TouchableOpacity onPress={()=>this._gotoAbout()}>
          <FastImage
          source={imageIcon['logo1946gif']} 
          style={{height:160,width:200,marginTop:20,alignSelf:'center'}}
          />
          </TouchableOpacity>
          </View>
          {this.renderAmountSlider(this.state.amount,num,0,-5,this.state.lang,index)}
          {this.renderBottomBar()}
        </ImageBackground>
      )
    }
    //TODO :Rau
    if(400<s &&s <500){
          const num= 401;
          const index=s-401;
              return(
                <ImageBackground source={imageIcon['background']} style={{flex:1}} >
                  {/*Slide*/}
                  <View style={{height:160,width:width,alignItems:'center'}}>
                  <TouchableOpacity onPress={()=>this._gotoAbout()}>
                  <Image
                  source={imageIcon['logo1946gif']}
                  style={{height:160,width:200,marginTop:20}}
                  />
                  </TouchableOpacity>
                  </View>
                  {this.renderAmountSlider(this.state.amount,num,0,-5,this.state.lang,index)}
                  {this.renderBottomBar()}
                </ImageBackground>
              )
            }
    //TODO:Dong duong
    if(500<s &&s <600){
      const num= 501;
      const index=s-501;
          return(
            <ImageBackground source={imageIcon['background']} style={{flex:1}} >
              {/*Slide*/}
              <View style={{height:160,width:width,alignItems:'center'}}>
              <TouchableOpacity onPress={()=>this._gotoAbout()}>
              <Image
              source={imageIcon['logo1946gif']}
              style={{height:160,width:200,marginTop:20}}
              />
              </TouchableOpacity>
              </View>
              {this.renderAmountSlider(this.state.amount,num,0,-5,this.state.lang,index)}
              {this.renderBottomBar()}
            </ImageBackground>
          )
        }
    //TODO: Hoi lang.
    if(600<s &&s <700){
          const num= 601;
          const index=s-601;
              return(
                <ImageBackground source={imageIcon['background']} style={{flex:1}} >
                  {/*Slide*/}
                  <View style={{height:160,width:width,alignItems:'center'}}>
                  <TouchableOpacity onPress={()=>this._gotoAbout()}>
                  <Image
                  source={imageIcon['logo1946gif']} 
                  style={{height:160,width:200,marginTop:20}}
                  />
                  </TouchableOpacity>
                  </View>
                  {this.renderAmountSlider(this.state.amount,num,0,-5,this.state.lang,index)}
                  {this.renderBottomBar()}
                </ImageBackground>
              )
        }
    //TODO: tqkc
    if(700<s &&s <800){
      const num= 701;
      const index=s-701;
      return(
        <ImageBackground source={imageIcon['background']} style={{flex:1}} >
          {/*Slide*/}
          <View style={{height:160,width:width,alignItems:'center'}}>
          <TouchableOpacity onPress={()=>this._gotoAbout()}>
          <Image
          source={imageIcon['logo1946gif']} 
          style={{height:160,width:200,marginTop:20}}
          />
          </TouchableOpacity>
          </View>
          {this.renderAmountSlider(this.state.amount,num,0,-5,this.state.lang,index)}
          {this.renderBottomBar()}
        </ImageBackground>
      )
    }
    //TODO: comnha
    if(800<s &&s <900){
      const num= 801;
      const index=s-801;
      return(
        <ImageBackground source={imageIcon['background']} style={{flex:1}} >
          {/*Slide*/}
          <View style={{height:160,width:width,alignItems:'center'}}>
          <TouchableOpacity  onPress={()=>this._gotoAbout()}>
          <Image
          source={imageIcon['logo1946gif']} 
          style={{height:160,width:200,marginTop:20}}
          />
          </TouchableOpacity>
          </View>
          {this.renderAmountSlider(this.state.amount,num,0,-5,this.state.lang,index)}
          {this.renderBottomBar()}
        </ImageBackground>
      )
    }
    //TODO: canh
    if(900<s &&s <1000){
      const num= 901;
      const index=s-901;
      return(
        <ImageBackground source={imageIcon['background']} style={{flex:1}} >
          {/*Slide*/}
          <View style={{height:160,width:width,alignItems:'center'}}>
          <TouchableOpacity  onPress={()=>this._gotoAbout()}>
          <Image
          source={imageIcon['logo1946gif']} 
          style={{height:160,width:200,marginTop:20}}
          />
          </TouchableOpacity>
          </View>
          {this.renderAmountSlider(this.state.amount,num,0,-5,this.state.lang,index)}
          {this.renderBottomBar()}
        </ImageBackground>
      )
    }
    //TODO: gptd
    if(1000<s &&s <1100){
      const num= 1001;
      const index=s-1001;
      return(
        <ImageBackground source={imageIcon['background']} style={{flex:1}} >
          {/*Slide*/}
          <View style={{height:160,width:width,alignItems:'center'}}>
          <TouchableOpacity  onPress={()=>this._gotoAbout()}>
          <Image
          source={imageIcon['logo1946gif']} 
          style={{height:160,width:200,marginTop:20}}
          />
          </TouchableOpacity>
          </View>
          {this.renderAmountSlider(this.state.amount,num,0,-5,this.state.lang,index)}
          {this.renderBottomBar()}
        </ImageBackground>
      )
    }
    //TODO: ruou que
    if(1100<s &&s <1200){
      const num= 1101;
      const index=s-1101;
      return(
        <ImageBackground source={imageIcon['background']} style={{flex:1}} >
          {/*Slide*/}
          <View style={{height:160,width:width,alignItems:'center'}}>
          <TouchableOpacity onPress={()=>this._gotoAbout()}>
          <Image
          source={imageIcon['logo1946gif']} 
          style={{height:160,width:200,marginTop:20}}
          />
          </TouchableOpacity>
          </View>
          {this.renderAmountSlider(this.state.amount,num,0,-5,this.state.lang,index)}
          {this.renderBottomBar()}
        </ImageBackground>
      )
    }
    if(1200<s &&s <1300){
      const num= 1201;
      const index=s-1201;
      return(
        <ImageBackground source={imageIcon['background']} style={{flex:1}} >
          {/*Slide*/}
          <View style={{height:160,width:width,alignItems:'center'}}>
          <TouchableOpacity onPress={()=>this._gotoAbout()}>
          
          <Image
          source={imageIcon['logo1946gif']} 
          style={{height:160,width:200,marginTop:20}}
          />
          </TouchableOpacity>
          </View>
          {this.renderAmountSlider(this.state.amount,num,0,-5,this.state.lang,index)}
          {this.renderBottomBar()}
        </ImageBackground>
      )
    }
  }
  componentDidMount(){
    this.setState({loading:true});
  }
  _gotoAbout(){
    this.playBell();
    this.props.navigation.navigate('AboutUs')
  }
  _gotoBill(){
    this.playBell();
    Realm.open(databaseOptions)
    .then(realm=>{
      let data = realm.objects('Meal').filtered('amount > 0')
      const length= data.length;
      if(length>0){
        this.props.navigation.navigate('Bill')
      }else{
        Alert.alert('Thông báo','Xin quý khách hãy chọn món')
      }
    })
    
  }
  _gotoBack(){
    this.playBell();
    this.props.navigation.goBack();
  }
  renderBottomBar(){
    if(this.state.lang=="VN"){
    return(
    <View>
    <Image
      style={{height:20,width:width}}
      source={imageIcon['borderWidth']}
     />
    <View style={{height:60,justifyContent:'center',flexDirection:'row',alignItems: 'center'}}>
{/*Button Back*/}
    <View style={{flex:1,alignItems: 'center',}}>
    <TouchableOpacity onPress={() => this._gotoBill()}>
    <ImageBackground
      source={imageIcon['button']}
      style={{height:45,width:145,flexDirection:'row'}}
    >
    <Text style={{ fontFamily:"Trixi Pro Regular",
    marginLeft:9,
    fontSize:24,
    marginTop:7,
    color:'white',}}>Đặt món</Text>
    <FastImage
      source={imageIcon['noodle']}
      style={{width:20,height:18,marginTop:12, marginLeft:8}}
    />
    </ImageBackground>  
    </TouchableOpacity>
    </View>
{/*</Button Back*/}
{/*Button About*/}
  
    <View style={{flex:1,alignItems: 'center',}}>
    <TouchableOpacity onPress={() =>this._gotoAbout()} >
    <ImageBackground
      source={imageIcon['button']}
      style={{height:45,width:145}}
    >
    <Text style={{ fontFamily:"Trixi Pro Regular",
    textAlign:'center',
    fontSize:22,
    marginTop:7,
    color:'white',}}>Giới thiệu</Text>
    </ImageBackground>  
    </TouchableOpacity>
    </View>
  
{/*</Button About*/}
{/*Button Order*/}
  
    <View style={{flex:1,alignItems: 'center',}}>
    <TouchableOpacity onPress={()=>this._gotoBack()}>
    <ImageBackground
      source={imageIcon['button']}
      style={{height:45,width:145}}
    >
    <Text style={{ fontFamily:"Trixi Pro Regular",
    textAlign:'center',
    fontSize:24,
    marginTop:7,
    color:'white',}}>Trở về</Text>
    </ImageBackground>  
    </TouchableOpacity>
    </View>
  
{/*</Button Order*/}
  </View>
  </View>
    )
  }else{
    return(
      <View>
      <Image
        style={{height:20,width:width}}
        source={imageIcon['borderWidth']}
       />
      <View style={{height:60,justifyContent:'center',flexDirection:'row',alignItems: 'center'}}>
  {/*Button Back*/}
      <View style={{flex:1,alignItems: 'center',}}>
      <TouchableOpacity onPress={() => this._gotoBill()}>
      <ImageBackground
        source={imageIcon['button']}
        style={{height:45,width:145,flexDirection:'row'}}
      >
      <Text style={{ fontFamily:"Trixi Pro Regular",
      marginLeft:25,
      fontSize:24,
      marginTop:7,
      color:'white',}}>Order</Text>
      <FastImage
        source={imageIcon['noodle']}
        style={{width:20,height:18,marginTop:12, marginLeft:8}}
      />
      </ImageBackground>  
      </TouchableOpacity>
      </View>
  {/*</Button Back*/}
  {/*Button About*/}
    
      <View style={{flex:1,alignItems: 'center',}}>
      <TouchableOpacity onPress={() =>this._gotoAbout()} >
      <ImageBackground
        source={imageIcon['button']}
        style={{height:45,width:145}}
      >
      <Text style={{ fontFamily:"Trixi Pro Regular",
      textAlign:'center',
      fontSize:22,
      marginTop:7,
      color:'white',}}>About Us</Text>
      </ImageBackground>  
      </TouchableOpacity>
      </View>
    
  {/*</Button About*/}
  {/*Button Order*/}
    
      <View style={{flex:1,alignItems: 'center',}}>
      <TouchableOpacity onPress={()=>this._gotoBack()}>
      <ImageBackground
        source={imageIcon['button']}
        style={{height:45,width:145}}
      >
      <Text style={{ fontFamily:"Trixi Pro Regular",
      textAlign:'center',
      fontSize:24,
      marginTop:7,
      color:'white',}}>Back</Text>
      </ImageBackground>  
      </TouchableOpacity>
      </View>
    
  {/*</Button Order*/}
    </View>
    </View>
      )
  }
  }
  render(){
    return(
      <View style={{flex:1}} >
      {this.state.startSwiper===true ? this.renderItem(this.state.idItem) : this.renderLoading()}
      </View>
    )
  }
}
 class Slider extends Component {
  constructor(props){
    super(props);
    this.state={
      name:'',
      price:0,
      desc:'',
      image:'',
      amount:1,
      id:0,
      foo:false,
      selected:false,
      leftResize:0,
      rightResize:0,
      topResize:0,
      lang:'',
      type:'',
    }
  }
storeAmount(s){
  if(s){
    Realm.open(databaseOptions)
    .then(realm =>{
      realm.write(()=>{
      realm.create('Meal',{id:this.state.id,amount:parseInt(this.state.amount)},true);
      realm.create('Meal',{id:this.state.id,checked:true},true)
    })
    })
}else{
    Realm.open(databaseOptions)
    .then(realm =>{
      realm.write(() =>{
      realm.create('Meal',{id:this.state.id,amount:0},true)
      this.setState({amount:1})
      realm.create('Meal',{id:this.state.id,checked:false},true)
      }
      )
    })
  }
}
renderTopBar(){
  if(this.state.type=="NATIONAL RESISTANCE 1946"){
    return(
      <View style={{height:110,marginTop:10,width:width,alignItems:'center'}}>
          
          <ImageBackground
            source={imageIcon['title']}
            style={{height:70,width:350,marginTop:10}}
          >
          <Text style={{fontFamily:"Trixi Pro Regular",textAlign:'center',fontSize:22,marginTop:17,
          color:'white'}} >{this.state.type}</Text>
          </ImageBackground>
        </View>
    )
  }else if(this.state.type==""){
    return(
      <View style={{height:110,marginTop:10,width:width,alignItems:'center'}}>
          <ImageBackground
            source={imageIcon['title']}
            style={{height:70,width:350,marginTop:10}}
          >
          <Text style={{fontFamily:"Trixi Pro Regular",textAlign:'center',fontSize:22,marginTop:17,
          color:'white'}} >{this.state.type}</Text>
          </ImageBackground>
        </View>
    )
  }
  else{
  return(
    <View style={{height:110,marginTop:10,width:width,alignItems:'center'}}>
        
        <ImageBackground
          source={imageIcon['title']}
          style={{height:70,width:350,marginTop:10}}
        >
        <Text style={{fontFamily:"Trixi Pro Regular",textAlign:'center',fontSize:24,marginTop:17,
        color:'white'}} >{this.state.type}</Text>
        </ImageBackground>
      </View>
  )
}
}
playBell(){
  song = new SoundPlayer('bell_sound.mp3', SoundPlayer.MAIN_BUNDLE, (error) => {
    if(error)
    {}
    else {
      
      song.play((success) => {
        if(!success)
      {}
      song.setVolume(1);
      });
    }
  });
  song.release();
}
addAmount=(s)=>{
  this.playBell();
  if(s){
    this.setState({
      amount:this.state.amount+1
      
    })
    this.storeAmount(true);
  }else{
    if(this.state.amount>1){
    this.setState({
      amount:this.state.amount-1
    })
    this.storeAmount(true);
  }
    else{
      this.setState({selected:false})
      this.storeAmount(false); 
    }
  }
}
onPressItem(){
  this.playBell();
  this.setState({selected:true});
  this.setState({amount:1});
  this.storeAmount(true);
}
  componentWillMount(){
    const itemId= this.props.idItem;
    if(this.props.lang=="VN"){
    if(itemId>100&& itemId<200){
      this.setState({type:"TẤM QUÀ 1930"})
    }else if(itemId>200&& itemId<300){
      this.setState({type:"PHỐ CHỢ 1932"})
    }else if(itemId>300&& itemId<400){
      this.setState({type:"DƯA CAY 1940"})
    }else if(itemId>400&& itemId<500){
      this.setState({type:"RAU 1935"})
    }else if(itemId>500&& itemId<600){
      this.setState({type:"ĐÔNG DƯƠNG 1942"})
    }else if(itemId>600&& itemId<700){
      this.setState({type:"HỘI LÀNG 1944"})
    }else if(itemId>700&& itemId<800){
      this.setState({type:"TOÀN QUỐC KHÁNG CHIẾN 1946"})
    }else if(itemId>800&& itemId<900){
      this.setState({type:"CƠM NHÀ 1950"})
    }else if(itemId>900&& itemId<1000){
      this.setState({type:"CANH 1954"})
    }else if(itemId>1000&& itemId<1100){
      this.setState({type:"GIẢ PHÓNG THỦ ĐÔ"})
    }else if(itemId>1100&& itemId<1200){
      this.setState({type:"RƯỢU QUÊ"})
    }else if(itemId>1200&& itemId<1300){
      this.setState({type:"QUÀ TẶNG"})
    }
    this.setState({leftResize:this.props.leftResize})
    this.setState({rightResize:this.props.rightResize})
    this.setState({topResize:this.props.topResize})
    Realm.open(databaseOptions)
    .then(realm=>{
      let data= realm.objectForPrimaryKey('Meal',parseInt(itemId))
      this.setState({name:data.name});
      this.setState({price:data.price});
      this.setState({desc:data.desc});
      this.setState({image:data.image});
      this.setState({id:data.id});

      this.setState({amount:data.amount})
      if(data.amount>0){
        this.setState({selected:true})
      }else{
        this.setState({selected:false})
      }    
    })
  }else{
    if(itemId>100&& itemId<200){
      this.setState({type:"PLATES GIFTS 1930"})
    }else if(itemId>200&& itemId<300){
      this.setState({type:"MARKET STREET 1932"})
    }else if(itemId>300&& itemId<400){
      this.setState({type:"PUTTING SPICY 1940"})
    }else if(itemId>400&& itemId<500){
      this.setState({type:"VEGETABLE 1935"})
    }else if(itemId>500&& itemId<600){
      this.setState({type:"INDOCHINA 1942"})
    }else if(itemId>600&& itemId<700){
      this.setState({type:"VILLAGE FESTIVAL 1944"})
    }else if(itemId>700&& itemId<800){
      this.setState({type:"NATIONAL RESISTANCE 1946"})
    }else if(itemId>800&& itemId<900){
      this.setState({type:"HOME COOKED 1950"})
    }else if(itemId>900&& itemId<1000){
      this.setState({type:"SOUP 1954"})
    }else if(itemId>1000&& itemId<1100){
      this.setState({type:"LIBERATION CAPITAL"})
    }else if(itemId>1100&& itemId<1200){
      this.setState({type:"LOCAL SPIRITS"})
    }else if(itemId>1200&& itemId<1300){
      this.setState({type:"THE GIFT"})
    }
    this.setState({leftResize:this.props.leftResize})
    this.setState({rightResize:this.props.rightResize})
    this.setState({topResize:this.props.topResize})
    Realm.open(databaseOptions)
    .then(realm=>{
      let data= realm.objectForPrimaryKey('Meal',parseInt(itemId))
      this.setState({name:data.nameEN});
      this.setState({price:data.price});
      this.setState({desc:data.descEN});
      this.setState({image:data.image});
      this.setState({id:data.id});
      this.setState({amount:data.amount})
      if(data.amount>0){
        this.setState({selected:true})
      }else{
        this.setState({selected:false})
      }    
    })
  }
  }
  render() {
    if(this.props.lang=="VN"){
    if(!this.state.selected){
      return (
          <ScrollView style={{flex:1}}>
          {this.renderTopBar()}
          <View style={{height:860,paddingLeft:5,paddingRight:0}}>
            <View style={{height:700,width:width,alignItems:'center'}}>
            <View style={{flex:2,alignItems:'center'}}>
            <TouchableOpacity onPress={()=>this.onPressItem()}>
            <FastImage source={image[this.state.image]}
                style={{height:700,width:700,alignSelf:'center'}}
                resizeMethod='auto'
                resizeMode="stretch"
            />
            </TouchableOpacity>
            </View>
            </View>
            {/*Title Meal*/}
            <View style={{height:40,marginTop:10}}>
              <Text style={{fontFamily:'Trixi Pro Regular',textAlign:'center',fontSize:35,color:'#6b2c24'}}>{this.state.name}</Text>
            </View>
            {/*Price*/}
            <View style={{height:30}}>
              <Text style={{fontFamily:'Trixi Pro Regular',textAlign:'center',fontSize:30,color:'#6b2c24'}}>{this.state.price} đồng bạc</Text>
            </View>
            {/*Desc */}
            <View style={{height:20,alignItems:'center',justifyContent:'center',padding:20,paddingRight:40,paddingLeft:40}}>
              {/*Main Desc*/}
            <View style={{height:40}}>
              <Text style={{fontFamily:'Trixi Pro Regular',textAlign:'center',fontSize:28,color:'grey'}}>{this.state.desc}</Text>
            </View>
            </View>  
          </View>         
          </ScrollView>
      )
    }else{
    return (
        <View>
        {this.renderTopBar()}
        <View style={{height:860,paddingLeft:5,paddingRight:0,}}>
          <View style={{height:700,width:width,alignItems:'center'}}>
          <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
            
            <ImageBackground source={image[this.state.image]}
              style={{height:700,width:700}}
              resizeMethod='resize'
              > 
                <TouchableOpacity onPress={()=>this.addAmount(true)}>
                <View style={{height:180}}>
                <FastImage
                style={{height:300,width:300,alignSelf:'flex-end',marginRight:20}}
                  source={imageIcon['cooked']}
                />
                </View>
                <View style={{height:425}} />
                </TouchableOpacity>
                <View style={{height:70,marginTop:this.props.topResize,marginLeft:0,marginRight:(20-this.state.rightResize),backgroundColor:'white',alignItems: 'center',justifyContent: 'center',flexDirection:'row'}} >
                  <TouchableOpacity onPress={()=>this.addAmount(false)} >
                  <View style={{height:64,borderWidth:3,borderBottomLeftRadius:10,borderTopLeftRadius:10,borderColor:'red',width:120,alignItems:'center',justifyContent:'center'}}><Text style={{fontFamily:'Trixi Pro Regular',fontSize:35,color:'black'}}>-</Text></View>
                  </TouchableOpacity>
                  <View style={{height:64,borderWidth:3,borderColor:'red',width:120,alignItems:'center',justifyContent:'center'}}>
                  <Text style={{fontFamily:'Trixi Pro Regular',fontSize:35,color:'black'}}>{this.state.amount}</Text>
                 </View>
                <TouchableOpacity onPress={()=>this.addAmount(true)} >
                  <View style={{height:64,borderWidth:3,borderBottomRightRadius:10,borderTopRightRadius:10,borderColor:'black',width:120,alignItems:'center',justifyContent:'center'}}><Text style={{fontFamily:'Trixi Pro Regular',fontSize:35,color:'black'}}>+</Text></View>
                </TouchableOpacity>
              
                </View>
            </ImageBackground>
            
          </View>
          </View>
          {/*Title Meal*/}
          <View style={{height:40,marginTop:10}}>
            <Text style={{fontFamily:'Trixi Pro Regular',textAlign:'center',fontSize:35,color:'#6b2c24'}}>{this.state.name}</Text>
          </View>
          {/*Price*/}
          <View style={{height:30}}>
            <Text style={{fontFamily:'Trixi Pro Regular',textAlign:'center',fontSize:30,color:'#6b2c24'}}>{this.state.price} đồng bạc</Text>
          </View>
          
          
          {/*Desc */}
          <View style={{height:40,alignItems:'center',justifyContent:'center',padding:20,paddingTop:10,paddingRight:40,paddingLeft:40}}>
            {/*Main Desc*/}
          <View style={{height:30}}>
            <Text style={{fontFamily:'Trixi Pro Regular',textAlign:'center',fontSize:28,color:'grey'}}>{this.state.desc}</Text>
          </View>
          </View>
        </View>
        </View>
    )
    }
  }
  else{
    if(!this.state.selected){
      return (
          <View style={{flex:1}}>
          {this.renderTopBar()}
          <View style={{height:860,paddingLeft:5,paddingRight:0}}>
            <View style={{height:700,width:width,alignItems:'center'}}>
            <View style={{flex:2,alignItems:'center'}}>
            <TouchableOpacity onPress={()=>this.onPressItem()}>
            <FastImage source={image[this.state.image]}
                style={{height:700,width:700,alignSelf:'center'}} />
            </TouchableOpacity>
            </View>
            </View>
            {/*Title Meal*/}
            <View style={{height:60,marginTop:10}}>
              <Text style={{fontFamily:'Trixi Pro Regular',textAlign:'center',fontSize:35,color:'#6b2c24'}}>{this.state.name}</Text>
            </View>
            {/*Price*/}
            <View style={{height:30}}>
              <Text style={{fontFamily:'Trixi Pro Regular',textAlign:'center',fontSize:30,color:'#6b2c24'}}>{this.state.price} coins</Text>
            </View>
            {/*Desc */}
            <View style={{height:20,alignItems:'center',justifyContent:'center',padding:20,paddingRight:40,paddingLeft:40}}>
              {/*Main Desc*/}
            <View style={{height:40}}>
              <Text style={{fontFamily:'Trixi Pro Regular',textAlign:'center',fontSize:28,color:'grey'}}>{this.state.desc}</Text>
            </View>
            </View>  
          </View> 
          
          </View>
      )
    }else{
    return (
        <View>
        {this.renderTopBar()}
        <View style={{height:860,paddingLeft:5,paddingRight:0,}}>
          <View style={{height:700,width:width,alignItems:'center'}}>
          <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
            
            <ImageBackground source={image[this.state.image]}
              style={{height:700,width:700}}
              > 
                <TouchableOpacity onPress={()=>this.addAmount(true)}>
                <View style={{height:180}}>
                <FastImage style={{height:300,width:300,alignSelf:'flex-end',marginRight:20}}
                  source={imageIcon['cooked']}
                />
                </View>
                <View style={{height:425}} />
                </TouchableOpacity>
                <View style={{height:70,marginTop:this.props.topResize,marginLeft:0,marginRight:(20-this.state.rightResize),backgroundColor:'white',alignItems: 'center',justifyContent: 'center',flexDirection:'row'}} >
                  <TouchableOpacity onPress={()=>this.addAmount(false)} >
                  <View style={{height:64,borderWidth:3,borderBottomLeftRadius:10,borderTopLeftRadius:10,borderColor:'red',width:120,alignItems:'center',justifyContent:'center'}}><Text style={{fontFamily:'Trixi Pro Regular',fontSize:35,color:'black'}}>-</Text></View>
                  </TouchableOpacity>
                  <View style={{height:64,borderWidth:2,borderColor:'black',width:120,alignItems:'center',justifyContent:'center'}}>
                  <Text style={{fontFamily:'Trixi Pro Regular',fontSize:35,color:'black'}}>{this.state.amount}</Text>
                 </View>
                <TouchableOpacity onPress={()=>this.addAmount(true)} >
                  <View style={{height:64,borderWidth:3,borderBottomRightRadius:20,borderTopRightRadius:20,borderColor:'black',width:120,alignItems:'center',justifyContent:'center'}}><Text style={{fontFamily:'Trixi Pro Regular',fontSize:35,color:'black'}}>+</Text></View>
                </TouchableOpacity>
              
                </View>
            </ImageBackground>
            
          </View>
          </View>
          {/*Title Meal*/}
          <View style={{height:60,marginTop:10}}>
            <Text style={{fontFamily:'Trixi Pro Regular',textAlign:'center',fontSize:35,color:'#6b2c24'}}>{this.state.name}</Text>
          </View>
          {/*Price*/}
          <View style={{height:30}}>
            <Text style={{fontFamily:'Trixi Pro Regular',textAlign:'center',fontSize:30,color:'#6b2c24'}}>{this.state.price} coins</Text>
          </View>
          
          
          {/*Desc */}
          <View style={{height:40,alignItems:'center',justifyContent:'center',padding:20,paddingTop:10,paddingRight:40,paddingLeft:40}}>
            {/*Main Desc*/}
          <View style={{height:30}}>
            <Text style={{fontFamily:'Trixi Pro Regular',textAlign:'center',fontSize:28,color:'grey'}}>{this.state.desc}</Text>
          </View>
          </View>
            
        </View>
        </View>
    )
    }
  }
  }

}

const styles = StyleSheet.create({
  textStyle:{
    fontFamily:"Trixi Pro Regular",
    textAlign:'center',
    fontSize:20,
    marginTop:5,
    color:'#6B2C24',
  },
  descStyle:{
    fontFamily:"Trixi Pro Lig",
    textAlign:'center',
    fontSize:16,
    marginTop:5,
    color:'black',
  },
  cardStyle:{
    height:220,
    width:180,
    marginBottom:35,
    marginLeft:60,
    
  }
})