import React, { Component } from 'react'
import { Text, View,Alert,StyleSheet,Image,ImageBackground,Dimensions,ActivityIndicator,TouchableOpacity,AsyncStorage,ScrollView} from 'react-native'
import Swiper from 'react-native-swiper'  
import FastImage from 'react-native-fast-image'
var SoundPlayer = require('react-native-sound');
var song = null;
const {width,height} = Dimensions.get('window')
import Realm from 'realm'
const MealSchema = {
  name:'Meal',
  primaryKey:'id',
  properties:{
    name:{type:'string',default:'Tên món ăn'},
    nameEN:{type:'string',default:'Meal name'},
    price:{type:'int',default:0},
    desc:{type:'string',default:'Không có mô tả'},
    descEN:{type:'string',default:'No description'},
    image:'string',
    id:'int',
    type:'string',
    checked:{type:'bool',default:false},
    amount:{type:'int',default:0},
    status:{type:'int',default:0},
//0-Chua dat,1-Da dat 2.Nhap pass 3. Da giao,,4-- Da thanh toan.
    table:{type:'string',default:'ban0'},
    stage:{type:'string',default:'tang0'},
  }
}
const ModeSchema ={
  name:'ModeApp',
  primaryKey:'id',
  properties:{
    id:'int',
    mode:'int',// 0 - Can delete all, 1-- lock,2--
  }
}
const image={
  "tamqua1":require('../data1946/tamqua1930/1.png'),
  "tamqua2":require('../data1946/tamqua1930/2.png'),
  "phocho1":require('../data1946/phocho1932/1.png'),
  "phocho2":require('../data1946/phocho1932/2.png'),
  "phocho3":require('../data1946/phocho1932/3.png'),
  "phocho4":require('../data1946/phocho1932/4.png'),
  "phocho5":require('../data1946/phocho1932/5.png'),
  "phocho6":require('../data1946/phocho1932/6.png'),
  "phocho7":require('../data1946/phocho1932/7.png'),
  "phocho8":require('../data1946/phocho1932/8.png'),
  "phocho9":require('../data1946/phocho1932/9.png'),
  "duacay1":require('../data1946/duacay1940/1.png'),
  "duacay2":require('../data1946/duacay1940/2.png'),
  "duacay3":require('../data1946/duacay1940/3.png'),
  "duacay4":require('../data1946/duacay1940/4.png'),
  "duacay5":require('../data1946/duacay1940/5.png'),
  "duacay6":require('../data1946/duacay1940/6.png'),
  "duacay7":require('../data1946/duacay1940/7.png'),
  "duacay8":require('../data1946/duacay1940/8.png'),
  "duacay9":require('../data1946/duacay1940/9.png'),
  "duacay10":require('../data1946/duacay1940/10.png'),
  "duacay11":require('../data1946/duacay1940/11.png'),
  "duacay12":require('../data1946/duacay1940/12.png'),
  "duacay13":require('../data1946/duacay1940/13.png'),
  "duacay14":require('../data1946/duacay1940/14.png'),
  "duacay15":require('../data1946/duacay1940/15.png'),
  "duacay16":require('../data1946/duacay1940/16.png'),
  "duacay17":require('../data1946/duacay1940/17.png'),
  "duacay18":require('../data1946/duacay1940/18.png'),
  "duacay19":require('../data1946/duacay1940/19.png'),
  "duacay20":require('../data1946/duacay1940/20.png'),
  "duacay21":require('../data1946/duacay1940/21.png'),
  "duacay22":require('../data1946/duacay1940/22.png'),
  "duacay23":require('../data1946/duacay1940/23.png'),
  "duacay24":require('../data1946/duacay1940/24.png'),
  "rau1":require('../data1946/rau1935/1.png'),
  "rau2":require('../data1946/rau1935/2.png'),
  "rau3":require('../data1946/rau1935/3.png'),
  "rau4":require('../data1946/rau1935/4.png'),
  "rau5":require('../data1946/rau1935/5.png'),
  "rau6":require('../data1946/rau1935/6.png'),
  "rau7":require('../data1946/rau1935/7.png'),
  "rau8":require('../data1946/rau1935/8.png'),
  "rau9":require('../data1946/rau1935/9.png'),
  "rau10":require('../data1946/rau1935/10.png'),
  "rau11":require('../data1946/rau1935/11.png'),
  "rau12":require('../data1946/rau1935/12.png'),
  "dongduong1":require('../data1946/dongduong1942/1.png'),
  "dongduong2":require('../data1946/dongduong1942/2.png'),
  "dongduong3":require('../data1946/dongduong1942/3.png'),
  "dongduong4":require('../data1946/dongduong1942/4.png'),
  "dongduong5":require('../data1946/dongduong1942/5.png'),
  "dongduong6":require('../data1946/dongduong1942/6.png'),
  "dongduong7":require('../data1946/dongduong1942/7.png'),
  "dongduong8":require('../data1946/dongduong1942/8.png'),
  "hoilang1":require('../data1946/hoilang1944/1.png'),
  "hoilang2":require('../data1946/hoilang1944/2.png'),
  "hoilang3":require('../data1946/hoilang1944/3.png'),
  "hoilang4":require('../data1946/hoilang1944/4.png'),
  "hoilang5":require('../data1946/hoilang1944/5.png'),
  "hoilang6":require('../data1946/hoilang1944/6.png'),
  "hoilang7":require('../data1946/hoilang1944/7.png'),
  "hoilang8":require('../data1946/hoilang1944/8.png'),
  "hoilang9":require('../data1946/hoilang1944/9.png'),
  "hoilang10":require('../data1946/hoilang1944/10.png'),
  "hoilang11":require('../data1946/hoilang1944/11.png'),
  "hoilang12":require('../data1946/hoilang1944/12.png'),
  "tqkc1":require('../data1946/toanquockhangchien1946/1.png'),
  "tqkc2":require('../data1946/toanquockhangchien1946/2.png'),
  "tqkc3":require('../data1946/toanquockhangchien1946/3.png'),
  "tqkc4":require('../data1946/toanquockhangchien1946/4.png'),
  "tqkc5":require('../data1946/toanquockhangchien1946/5.png'),
  "tqkc6":require('../data1946/toanquockhangchien1946/6.png'),
  "comnha1":require('../data1946/comnha1950/1.png'),
  "comnha2":require('../data1946/comnha1950/2.png'),
  "comnha3":require('../data1946/comnha1950/3.png'),
  "comnha4":require('../data1946/comnha1950/4.png'),
  "comnha5":require('../data1946/comnha1950/5.png'),
  "comnha6":require('../data1946/comnha1950/6.png'),
  "comnha7":require('../data1946/comnha1950/7.png'),
  "comnha8":require('../data1946/comnha1950/8.png'),
  "comnha9":require('../data1946/comnha1950/9.png'),
  "comnha10":require('../data1946/comnha1950/10.png'),
  "canh1":require('../data1946/canh1945/1.png'),
  "canh2":require('../data1946/canh1945/2.png'),
  "canh3":require('../data1946/canh1945/3.png'),
  "canh4":require('../data1946/canh1945/4.png'),
  "canh5":require('../data1946/canh1945/5.png'),
  "canh6":require('../data1946/canh1945/6.png'),
  "gptd1":require('../data1946/giaiphongthudo/1.png'),
  "gptd2":require('../data1946/giaiphongthudo/2.png'),
  "gptd3":require('../data1946/giaiphongthudo/3.png'),
  "gptd4":require('../data1946/giaiphongthudo/4.png'),
  "gptd5":require('../data1946/giaiphongthudo/5.png'),
  "gptd6":require('../data1946/giaiphongthudo/6.png'),
  "quatang1":require('../data1946/quatang/1.png'),
  "quatang2":require('../data1946/quatang/2.png')
}
export default class ShowItem extends Component{
  constructor(props){
    super(props);
    this.state={
      idItem:0,
      lang:'',
      foo:'',
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
          source={require('../assets/menu/background.png')}>
          <Image
            source={require('../assets/icon/logo1946.gif')} 
            style={{height:160,width:200,marginTop:20}}
          />
          <Image 
              source={require('../assets/icon/show-loader.gif')}
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
  }
  renderItem(s){
    
    //TODO :Tam qua
    if(100<s &&s <200){
      const num= 101;
      const index=s-101;
      return(
        <ImageBackground source={require('../assets/menu/background.png')} style={{flex:1}} >
          {/*Slide*/}
          <View style={{height:160,width:width,alignItems:'center'}}>
          <TouchableOpacity onPress={()=>this._gotoAbout()}>
          <FastImage
          source={require('../assets/icon/logo1946.gif')} 
          style={{height:160,width:200,marginTop:20,alignSelf:'center'}}
          />
          </TouchableOpacity>
          </View>
          <Swiper
            onIndexChanged={()=>this.playSound()}
            index={index}
            dot={<View />}
            activeDot={<View />}
            loop={false}
          >
            <Slider idItem={num} leftResize={0} rightResize={-5} lang={this.state.lang}/>
            <Slider idItem={num+1} leftResize={0} rightResize={-5} lang={this.state.lang}/>
          </Swiper>
          {this.renderBottomBar()}
        </ImageBackground>
      )
    }
    //TODO :Pho cho
    if(200<s &&s <300){
      const num= 201;
      const index=s-201;
          return(
            <ImageBackground source={require('../assets/menu/background.png')} style={{flex:1}} >
              {/*Slide*/}
              <View style={{height:160,width:width,alignItems:'center'}}>
              <TouchableOpacity onPress={()=>this._gotoAbout()}>
              <FastImage
              source={require('../assets/icon/logo1946.gif')} 
              style={{height:160,width:200,marginTop:20,alignSelf:'center'}}
              />
              </TouchableOpacity>
              </View>
              <Swiper
                onIndexChanged={()=>this.playSound()}
                index={index}
                dot={<View />}
                activeDot={<View />}
                loop={false}
              >
                <Slider idItem={num} rightResize={-2} leftResize={-3} lang={this.state.lang}/>
                <Slider idItem={num+1} rightResize={-2} leftResize={-3} lang={this.state.lang}/>
                <Slider idItem={num+2} topResize={5} rightResize={-1} leftResize={-3} lang={this.state.lang}/>
                <Slider idItem={num+3} rightResize={-2} leftResize={-3} lang={this.state.lang}/>
                <Slider idItem={num+4} rightResize={-2} leftResize={-3} lang={this.state.lang}/>
                <Slider idItem={num+5} rightResize={-2} leftResize={-3} lang={this.state.lang}/>
                <Slider idItem={num+6} rightResize={-2} leftResize={-3} lang={this.state.lang}/>
                <Slider idItem={num+7} rightResize={-2} topResize={5} leftResize={1} lang={this.state.lang}/>
                <Slider idItem={num+8} rightResize={-2} leftResize={-3} lang={this.state.lang}/>
              </Swiper>
              {this.renderBottomBar()}
            </ImageBackground>
          )
        }
    //TODO :Dua cay
    if(300<s &&s <400){
      const num= 301;
      const index=s-301;
      return(
        <ImageBackground source={require('../assets/menu/background.png')} style={{flex:1}} >
          {/*Slide*/}
          <View style={{height:160,width:width,alignItems:'center'}}>
          <TouchableOpacity onPress={()=>this._gotoAbout()}>
          <FastImage
          source={require('../assets/icon/logo1946.gif')} 
          style={{height:160,width:200,marginTop:20,alignSelf:'center'}}
          />
          </TouchableOpacity>
          </View>
          <Swiper
            onIndexChanged={()=>this.playSound()}
            index={index}
            dot={<View />}
            activeDot={<View />}
            loop={false}
          >
            <Slider idItem={num} rightResize={-2} leftResize={-3} lang={this.state.lang}/>
            <Slider idItem={num+1} rightResize={-2} leftResize={-3} lang={this.state.lang}/>
            <Slider idItem={num+2} rightResize={-2} leftResize={-3} lang={this.state.lang}/>
            <Slider idItem={num+3} rightResize={-2} leftResize={-3} lang={this.state.lang}/>
            <Slider idItem={num+4} rightResize={-2} leftResize={1} lang={this.state.lang}/>
            <Slider idItem={num+5} rightResize={-2} leftResize={-3} lang={this.state.lang}/>
            <Slider idItem={num+6} rightResize={-2} leftResize={-3} lang={this.state.lang}/>
            <Slider idItem={num+7} rightResize={-2} leftResize={-3} lang={this.state.lang}/>
            <Slider idItem={num+8} rightResize={-9} leftResize={15} lang={this.state.lang}/>
            <Slider idItem={num+9} rightResize={-13} leftResize={9} lang={this.state.lang}/>
            <Slider idItem={num+10} rightResize={-9} leftResize={11} lang={this.state.lang}/>
            <Slider idItem={num+11} rightResize={-9} leftResize={11} lang={this.state.lang}/>
            <Slider idItem={num+12} rightResize={-9} leftResize={11} lang={this.state.lang}/>
            <Slider idItem={num+13} rightResize={-2} leftResize={-3} lang={this.state.lang}/>
            <Slider idItem={num+14} rightResize={-15} leftResize={11} lang={this.state.lang}/>
            <Slider idItem={num+15} rightResize={-3} leftResize={11} lang={this.state.lang}/>
            <Slider idItem={num+16} rightResize={-2} leftResize={11} lang={this.state.lang}/>
            <Slider idItem={num+17} rightResize={-2} leftResize={11} lang={this.state.lang}/>
            <Slider idItem={num+18} rightResize={-2} leftResize={11} lang={this.state.lang}/>
            <Slider idItem={num+19} rightResize={-5} leftResize={11} lang={this.state.lang}/>
            <Slider idItem={num+20} rightResize={-5} leftResize={11} lang={this.state.lang}/>
            <Slider idItem={num+21} rightResize={-2} leftResize={11} lang={this.state.lang}/>
            <Slider idItem={num+22} rightResize={-5} leftResize={11} lang={this.state.lang}/>
            <Slider idItem={num+23} rightResize={-5} leftResize={11} topResize={5} lang={this.state.lang}/>
          </Swiper>
          {this.renderBottomBar()}
        </ImageBackground>
      )
    }
    //TODO :Rau
    if(400<s &&s <500){
          const num= 401;
          const index=s-401;
              return(
                <ImageBackground source={require('../assets/menu/background.png')} style={{flex:1}} >
                  {/*Slide*/}
                  <View style={{height:160,width:width,alignItems:'center'}}>
                  <TouchableOpacity onPress={()=>this._gotoAbout()}>
                  <Image
                  source={require('../assets/icon/logo1946.gif')} 
                  style={{height:160,width:200,marginTop:20}}
                  />
                  </TouchableOpacity>
                  </View>
                  <Swiper
                    onIndexChanged={()=>this.playSound()}
                    index={index}
                    dot={<View />}
                    activeDot={<View />}
                    loop={false}
                  >
                    <Slider idItem={num} rightResize={-5} leftResize={-2} lang={this.state.lang}/>
                    <Slider idItem={num+1} rightResize={-2} leftResize={-2} lang={this.state.lang}/>
                    <Slider idItem={num+2} rightResize={-2} leftResize={-2} lang={this.state.lang}/>
                    <Slider idItem={num+3} rightResize={-2} leftResize={-2} lang={this.state.lang}/>
                    <Slider idItem={num+4} rightResize={-2} leftResize={11} lang={this.state.lang}/>
                    <Slider idItem={num+5} rightResize={-2} leftResize={11} lang={this.state.lang}/>
                    <Slider idItem={num+6} rightResize={-2} leftResize={11} lang={this.state.lang}/>
                    <Slider idItem={num+7} rightResize={1} leftResize={11} lang={this.state.lang}/>
                    <Slider idItem={num+8} rightResize={-2} topResize={3} leftResize={-2} lang={this.state.lang}/>
                    <Slider idItem={num+9} rightResize={-5} leftResize={11} lang={this.state.lang}/>
                    <Slider idItem={num+10} rightResize={-9} leftResize={15} lang={this.state.lang}/>
                    <Slider idItem={num+11} rightResize={-7} leftResize={13} lang={this.state.lang}/>
                  </Swiper>
                  {this.renderBottomBar()}
                </ImageBackground>
              )
            }
    //TODO:Dong duong
    if(500<s &&s <600){
      const num= 501;
      const index=s-501;
          return(
            <ImageBackground source={require('../assets/menu/background.png')} style={{flex:1}} >
              {/*Slide*/}
              <View style={{height:160,width:width,alignItems:'center'}}>
              <TouchableOpacity onPress={()=>this._gotoAbout()}>
              <Image
              source={require('../assets/icon/logo1946.gif')} 
              style={{height:160,width:200,marginTop:20}}
              />
              </TouchableOpacity>
              </View>
              <Swiper
                onIndexChanged={()=>this.playSound()}
                index={index}
                dot={<View />}
                activeDot={<View />}
                loop={false}
              >
                <Slider idItem={num} rightResize={-4} leftResize={11} lang={this.state.lang}/>
                <Slider idItem={num+1} rightResize={-4} leftResize={3} lang={this.state.lang}/>
                <Slider idItem={num+2} rightResize={-4} leftResize={7} lang={this.state.lang}/>
                <Slider idItem={num+3} rightResize={-2} leftResize={5} lang={this.state.lang}/>
                <Slider idItem={num+4} rightResize={-2} topResize={3} leftResize={5} lang={this.state.lang}/>
                <Slider idItem={num+5} rightResize={-2} leftResize={11} lang={this.state.lang}/>
                <Slider idItem={num+6} rightResize={-2} leftResize={11} lang={this.state.lang}/>
                <Slider idItem={num+7} rightResize={-2} leftResize={11} lang={this.state.lang}/>
                
              </Swiper>
              {this.renderBottomBar()}
            </ImageBackground>
          )
        }
    //TODO: Hoi lang.
    if(600<s &&s <700){
          const num= 601;
          const index=s-601;
              return(
                <ImageBackground source={require('../assets/menu/background.png')} style={{flex:1}} >
                  {/*Slide*/}
                  <View style={{height:160,width:width,alignItems:'center'}}>
                  <TouchableOpacity onPress={()=>this._gotoAbout()}>
                  <Image
                  source={require('../assets/icon/logo1946.gif')} 
                  style={{height:160,width:200,marginTop:20}}
                  />
                  </TouchableOpacity>
                  </View>
                  <Swiper
                    onIndexChanged={()=>this.playSound()}
                    index={index}
                    dot={<View />}
                    activeDot={<View />}
                    loop={false}
                  >
                    <Slider idItem={num} rightResize={-2} leftResize={5} lang={this.state.lang}/>
                    <Slider idItem={num+1} rightResize={-2} leftResize={5} lang={this.state.lang}/>
                    <Slider idItem={num+2} rightResize={-2} topResize={3} leftResize={5} lang={this.state.lang}/>
                    <Slider idItem={num+3} rightResize={-2} leftResize={11} lang={this.state.lang}/>
                    <Slider idItem={num+4} rightResize={-2} leftResize={11} lang={this.state.lang}/>
                    <Slider idItem={num+5} rightResize={-2} leftResize={11} lang={this.state.lang}/>
                    <Slider idItem={num+6} rightResize={-2} leftResize={11} lang={this.state.lang}/>
                    <Slider idItem={num+7} rightResize={-2} leftResize={11} lang={this.state.lang}/>
                    <Slider idItem={num+8} rightResize={-2} topResize={3} leftResize={11} lang={this.state.lang}/>
                    <Slider idItem={num+9} rightResize={-2} topResize={3} leftResize={11} lang={this.state.lang}/>
                    <Slider idItem={num+10} rightResize={-2} leftResize={11} lang={this.state.lang}/>
                    <Slider idItem={num+11} rightResize={-5} leftResize={11} lang={this.state.lang}/>
                  </Swiper>
                  {this.renderBottomBar()}
                </ImageBackground>
              )
        }
    //TODO: tqkc
    if(700<s &&s <800){
      const num= 701;
      const index=s-701;
      return(
        <ImageBackground source={require('../assets/menu/background.png')} style={{flex:1}} >
          {/*Slide*/}
          <View style={{height:160,width:width,alignItems:'center'}}>
          <TouchableOpacity onPress={()=>this._gotoAbout()}>
          <Image
          source={require('../assets/icon/logo1946.gif')} 
          style={{height:160,width:200,marginTop:20}}
          />
          </TouchableOpacity>
          </View>
          <Swiper
            onIndexChanged={()=>this.playSound()}
            index={index}
            dot={<View />}
            activeDot={<View />}
            loop={false}
          >
            <Slider idItem={num} rightResize={-4} leftResize={9} lang={this.state.lang}/>
            <Slider idItem={num+1} rightResize={-4} leftResize={9} lang={this.state.lang}/>
            <Slider idItem={num+2} rightResize={-2} topResize={3} leftResize={9} lang={this.state.lang}/>
            <Slider idItem={num+3} rightResize={-2} leftResize={9} lang={this.state.lang}/>
            <Slider idItem={num+4} rightResize={-2} leftResize={9} lang={this.state.lang}/>
            <Slider idItem={num+5} rightResize={-2} leftResize={9} lang={this.state.lang}/>
            
          </Swiper>
          {this.renderBottomBar()}
        </ImageBackground>
      )
    }
    //TODO: comnha
    if(800<s &&s <900){
      const num= 801;
      const index=s-801;
      return(
        <ImageBackground source={require('../assets/menu/background.png')} style={{flex:1}} >
          {/*Slide*/}
          <View style={{height:160,width:width,alignItems:'center'}}>
          <TouchableOpacity  onPress={()=>this._gotoAbout()}>
          <Image
          source={require('../assets/icon/logo1946.gif')} 
          style={{height:160,width:200,marginTop:20}}
          />
          </TouchableOpacity>
          </View>
          <Swiper
            onIndexChanged={()=>this.playSound()}
            index={index}
            dot={<View />}
            activeDot={<View />}
            loop={false}
          >
            <Slider idItem={num} rightResize={-9} leftResize={9} lang={this.state.lang}/>
            <Slider idItem={num+1} rightResize={-6} leftResize={9} lang={this.state.lang}/>
            <Slider idItem={num+2} rightResize={-2} leftResize={9} lang={this.state.lang}/>
            <Slider idItem={num+3} rightResize={-2} leftResize={9} lang={this.state.lang}/>
            <Slider idItem={num+4} rightResize={-2} leftResize={9} lang={this.state.lang}/>
            <Slider idItem={num+5} rightResize={-2} leftResize={9} lang={this.state.lang}/>
            <Slider idItem={num+6} rightResize={-2} leftResize={9} lang={this.state.lang}/>
            <Slider idItem={num+7} rightResize={-2} leftResize={-2} lang={this.state.lang}/>
            <Slider idItem={num+8} rightResize={-2} leftResize={9} lang={this.state.lang}/>
            <Slider idItem={num+9} rightResize={-2} leftResize={9} lang={this.state.lang}/>
            
          </Swiper>
          {this.renderBottomBar()}
        </ImageBackground>
      )
    }
    //TODO: canh
    if(900<s &&s <1000){
      const num= 901;
      const index=s-901;
      return(
        <ImageBackground source={require('../assets/menu/background.png')} style={{flex:1}} >
          {/*Slide*/}
          <View style={{height:160,width:width,alignItems:'center'}}>
          <TouchableOpacity  onPress={()=>this._gotoAbout()}>
          <Image
          source={require('../assets/icon/logo1946.gif')} 
          style={{height:160,width:200,marginTop:20}}
          />
          </TouchableOpacity>
          </View>
          <Swiper
            onIndexChanged={()=>this.playSound()}
            index={index}
            dot={<View />}
            activeDot={<View />}
            loop={false}
          >
            <Slider idItem={num} rightResize={-2} leftResize={9} lang={this.state.lang}/>
            <Slider idItem={num+1} rightResize={-2} leftResize={2} lang={this.state.lang}/>
            <Slider idItem={num+2} rightResize={-2} leftResize={9} lang={this.state.lang}/>
            <Slider idItem={num+3} rightResize={-2} leftResize={9} lang={this.state.lang}/>
            <Slider idItem={num+4} rightResize={-2} leftResize={9} lang={this.state.lang}/>
            <Slider idItem={num+5} rightResize={-2} leftResize={9} lang={this.state.lang}/>      
          </Swiper>
          {this.renderBottomBar()}
        </ImageBackground>
      )
    }
    //TODO: gptd
    if(1000<s &&s <1100){
      const num= 1001;
      const index=s-1001;
      return(
        <ImageBackground source={require('../assets/menu/background.png')} style={{flex:1}} >
          {/*Slide*/}
          <View style={{height:160,width:width,alignItems:'center'}}>
          <TouchableOpacity  onPress={()=>this._gotoAbout()}>
          <Image
          source={require('../assets/icon/logo1946.gif')} 
          style={{height:160,width:200,marginTop:20}}
          />
          </TouchableOpacity>
          </View>
          <Swiper
            onIndexChanged={()=>this.playSound()}
            index={index}
            dot={<View />}
            activeDot={<View />}
            loop={false}
          >
            <Slider idItem={num} rightResize={-2} topResize={3} leftResize={9} lang={this.state.lang}/>
            <Slider idItem={num+1} rightResize={-2} topResize={3} leftResize={9} lang={this.state.lang}/>
            <Slider idItem={num+2} rightResize={-2} leftResize={9} lang={this.state.lang}/>
            <Slider idItem={num+3} rightResize={-2} leftResize={9} lang={this.state.lang}/>
            <Slider idItem={num+4} rightResize={-2} leftResize={9} lang={this.state.lang}/>
            <Slider idItem={num+5} rightResize={-2} leftResize={9} lang={this.state.lang}/>      
          </Swiper>
          {this.renderBottomBar()}
        </ImageBackground>
      )
    }
    //TODO: ruou que
    if(1100<s &&s <1200){
      const num= 1101;
      const index=s-1101;
      return(
        <ImageBackground source={require('../assets/menu/background.png')} style={{flex:1}} >
          {/*Slide*/}
          <View style={{height:160,width:width,alignItems:'center'}}>
          <TouchableOpacity onPress={()=>this._gotoAbout()}>
          <Image
          source={require('../assets/icon/logo1946.gif')} 
          style={{height:160,width:200,marginTop:20}}
          />
          </TouchableOpacity>
          </View>
          <Swiper
            onIndexChanged={()=>this.playSound()}
            index={index}
            dot={<View />}
            activeDot={<View />}
            loop={false}
          >  
          </Swiper>
          {this.renderBottomBar()}
        </ImageBackground>
      )
    }
    if(1200<s &&s <1300){
      const num= 1201;
      const index=s-1201;
      return(
        <ImageBackground source={require('../assets/menu/background.png')} style={{flex:1}} >
          {/*Slide*/}
          <View style={{height:160,width:width,alignItems:'center'}}>
          <TouchableOpacity onPress={()=>this._gotoAbout()}>
          
          <Image
          source={require('../assets/icon/logo1946.gif')} 
          style={{height:160,width:200,marginTop:20}}
          />
          </TouchableOpacity>
          </View>
          <Swiper
            onIndexChanged={()=>this.playSound()}
            index={index}
            dot={<View />}
            activeDot={<View />}
            loop={false}
          >  
          <Slider idItem={num} rightResize={-2} leftResize={7} lang={this.state.lang}/>
          <Slider idItem={num+1} rightResize={-2} leftResize={7} lang={this.state.lang}/>
          </Swiper>
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
    Realm.open({schema:[MealSchema,ModeSchema]})
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
      source={require('../assets/icon/border.png')}
     />
    <View style={{height:60,justifyContent:'center',flexDirection:'row',alignItems: 'center'}}>
{/*Button Back*/}
    <View style={{flex:1,alignItems: 'center',}}>
    <TouchableOpacity onPress={() => this._gotoBill()}>
    <ImageBackground
      source={require('../assets/icon/button.png')}
      style={{height:45,width:145,flexDirection:'row'}}
    >
    <Text style={{ fontFamily:"Trixi Pro Regular",
    marginLeft:9,
    fontSize:24,
    marginTop:7,
    color:'white',}}>Đặt món</Text>
    <FastImage
      source={require('../assets/icon/icon-noodle.png')}
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
      source={require('../assets/icon/button.png')}
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
      source={require('../assets/icon/button.png')}
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
        source={require('../assets/icon/border.png')}
       />
      <View style={{height:60,justifyContent:'center',flexDirection:'row',alignItems: 'center'}}>
  {/*Button Back*/}
      <View style={{flex:1,alignItems: 'center',}}>
      <TouchableOpacity onPress={() => this._gotoBill()}>
      <ImageBackground
        source={require('../assets/icon/button.png')}
        style={{height:45,width:145,flexDirection:'row'}}
      >
      <Text style={{ fontFamily:"Trixi Pro Regular",
      marginLeft:25,
      fontSize:24,
      marginTop:7,
      color:'white',}}>Order</Text>
      <FastImage
        source={require('../assets/icon/icon-noodle.png')}
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
        source={require('../assets/icon/button.png')}
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
        source={require('../assets/icon/button.png')}
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
    Realm.open({schema:[MealSchema,ModeSchema]})
    .then(realm =>{
      realm.write(()=>{
      realm.create('Meal',{id:this.state.id,amount:this.state.amount},true);
      realm.create('Meal',{id:this.state.id,checked:true},true)
    })
    })
}else{
    Realm.open({schema:[MealSchema,ModeSchema]})
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
            source={require('../assets/icon/titlebar.png')}
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
            source={require('../assets/icon/titlebar.png')}
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
          source={require('../assets/icon/titlebar.png')}
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
    Realm.open({schema:[MealSchema,ModeSchema]})
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
    Realm.open({schema:[MealSchema,ModeSchema]})
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
                  source={require('../assets/icon/icon-cooked.png')}
                />
                </View>
                <View style={{height:425}} />
                </TouchableOpacity>
                <View style={{height:70,marginTop:this.props.topResize,marginLeft:0,marginRight:(20-this.state.rightResize),backgroundColor:'white',alignItems: 'center',justifyContent: 'center',flexDirection:'row'}} >
                  <TouchableOpacity onPress={()=>this.addAmount(false)} >
                  <View style={{height:64,borderWidth:3,borderBottomLeftRadius:10,borderTopLeftRadius:10,borderWidthColor:'red',width:120,alignItems:'center',justifyContent:'center'}}><Text style={{fontFamily:'Trixi Pro Regular',fontSize:35,color:'black'}}>-</Text></View>
                  </TouchableOpacity>
                  <View style={{height:64,borderWidth:2,borderWidthColor:'black',width:120,alignItems:'center',justifyContent:'center'}}>
                  <Text style={{fontFamily:'Trixi Pro Regular',fontSize:35,color:'black'}}>{this.state.amount}</Text>
                 </View>
                <TouchableOpacity onPress={()=>this.addAmount(true)} >
                  <View style={{height:64,borderWidth:3,borderBottomRightRadius:20,borderTopRightRadius:20,borderWidthColor:'black',width:120,alignItems:'center',justifyContent:'center'}}><Text style={{fontFamily:'Trixi Pro Regular',fontSize:35,color:'black'}}>+</Text></View>
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
                  source={require('../assets/icon/icon-cooked.png')}
                />
                </View>
                <View style={{height:425}} />
                </TouchableOpacity>
                <View style={{height:70,marginTop:this.props.topResize,marginLeft:0,marginRight:(20-this.state.rightResize),backgroundColor:'white',alignItems: 'center',justifyContent: 'center',flexDirection:'row'}} >
                  <TouchableOpacity onPress={()=>this.addAmount(false)} >
                  <View style={{height:64,borderWidth:3,borderBottomLeftRadius:10,borderTopLeftRadius:10,borderWidthColor:'red',width:120,alignItems:'center',justifyContent:'center'}}><Text style={{fontFamily:'Trixi Pro Regular',fontSize:35,color:'black'}}>-</Text></View>
                  </TouchableOpacity>
                  <View style={{height:64,borderWidth:2,borderWidthColor:'black',width:120,alignItems:'center',justifyContent:'center'}}>
                  <Text style={{fontFamily:'Trixi Pro Regular',fontSize:35,color:'black'}}>{this.state.amount}</Text>
                 </View>
                <TouchableOpacity onPress={()=>this.addAmount(true)} >
                  <View style={{height:64,borderWidth:3,borderBottomRightRadius:20,borderTopRightRadius:20,borderWidthColor:'black',width:120,alignItems:'center',justifyContent:'center'}}><Text style={{fontFamily:'Trixi Pro Regular',fontSize:35,color:'black'}}>+</Text></View>
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