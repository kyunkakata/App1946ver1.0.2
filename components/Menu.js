import React, { Component } from 'react'
import { Text, View,AsyncStorage,StyleSheet,Image,ImageBackground,Dimensions,TouchableOpacity,Vibration} from 'react-native'
import FastImage from 'react-native-fast-image'
import {databaseOptions,createMealDatabase} from '../realm/allSchema'
import {imageMenu1,imageIcon} from '../realm/image'
var SoundPlayer = require('react-native-sound');
var song = null;
const {width,height} = Dimensions.get('window')
const images = imageMenu1;
  const titles={
    "1":"TẤM QUÀ 1930",
    "2":"PHỐ CHỢ 1932",
    "3":"RAU 1935",
    "4":"DƯA CAY 1940",
    "5":"ĐÔNG DƯƠNG 1942",
    "6":"HỘI LÀNG 1944",
    "7":"TOÀN QUỐC    KHÁNG CHIẾN 1946",
    "8":"CƠM NHÀ 1950",
    "9":"CANH 1954",
    "10":"GIẢI PHÓNG     THỦ ĐÔ",
    "11":"RƯỢU QUÊ",
    "12":"QUÀ TẶNG",
    "1a":"PLATES GIFTS 1930",
    "2a":"MARKET STREET 1932",
    "3a":"VEGETABLE 1935",
    "4a":"PUTTING SPICY 1940",
    "5a":"INDOCHINA 1942",
    "6a":"VILLAGE FESTIVAL 1944",
    "7a":"NATIONAL RESISTANCE 1946",
    "8a":"HOME COOKED 1950",
    "9a":"SOUP 1954",
    "10a":"LIBERATION CAPITAL",
    "11a":"LOCAL SPIRITS",
    "12a":"THE GIFT"
  }
  
export class Menu extends Component {
    constructor(props){
        super(props);
        this.state={
            lang:'VN',
            title1:titles["1"],
            title2:titles["2"],
            title3:titles["3"],
            title4:titles["4"],
            title5:titles["5"],
            title6:titles["6"],
            title7:titles["7"],
            title8:titles["8"],
            title9:titles["9"],
            title10:titles["10"],
            title11:titles["11"],
            title12:titles["12"],
        }
    }
  _gotoItemMenu(data){
    this.playSound();
    this.props.navigation.navigate('ItemMenu',{
      itemSelected:data,
    })
  }
  playSound(){
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
 async componentWillMount(){
    const lang = await AsyncStorage.getItem('LANGUAGE');
    createMealDatabase();
    if(lang=="EN"){
        this.setState({lang:"EN"});
        this.setState({title1:titles["1a"]});
        this.setState({title2:titles["2a"]});
        this.setState({title3:titles["3a"]});
        this.setState({title4:titles["4a"]});
        this.setState({title5:titles["5a"]});
        this.setState({title6:titles["6a"]});
        this.setState({title7:titles["7a"]});
        this.setState({title8:titles["8a"]});
        this.setState({title9:titles["9a"]});
        this.setState({title10:titles["10a"]});
        this.setState({title11:titles["11a"]});
        this.setState({title12:titles["12a"]}); 
    }else{
        this.setState({lang:"VN"});
        this.setState({title1:titles["1"]});
        this.setState({title2:titles["2"]});
        this.setState({title3:titles["3"]});
        this.setState({title4:titles["4"]});
        this.setState({title5:titles["5"]});
        this.setState({title6:titles["6"]});
        this.setState({title7:titles["7"]});
        this.setState({title8:titles["8"]});
        this.setState({title9:titles["9"]});
        this.setState({title10:titles["10"]});
        this.setState({title11:titles["11"]});
        this.setState({title12:titles["12"]}); 
        try {
            await AsyncStorage.setItem('LANGUAGE','VN');
        } catch (error) {
        }
    }
    
  }
  
  async setLanguage(s){
        codePush.sync({
        updateDialog: true,
        installMode: codePush.InstallMode.IMMEDIATE
        });
        this.setState({lang:s});
        if(this.state.lang=="VN"){
        this.setState({title1:titles["1a"]});
        this.setState({title2:titles["2a"]});
        this.setState({title3:titles["3a"]});
        this.setState({title4:titles["4a"]});
        this.setState({title5:titles["5a"]});
        this.setState({title6:titles["6a"]});
        this.setState({title7:titles["7a"]});
        this.setState({title8:titles["8a"]});
        this.setState({title9:titles["9a"]});
        this.setState({title10:titles["10a"]});
        this.setState({title11:titles["11a"]});
        this.setState({title12:titles["12a"]});
        }else{
        this.setState({title1:titles["1"]});
        this.setState({title2:titles["2"]});
        this.setState({title3:titles["3"]});
        this.setState({title4:titles["4"]});
        this.setState({title5:titles["5"]});
        this.setState({title6:titles["6"]});
        this.setState({title7:titles["7"]});
        this.setState({title8:titles["8"]});
        this.setState({title9:titles["9"]});
        this.setState({title10:titles["10"]});
        this.setState({title11:titles["11"]});
        this.setState({title12:titles["12"]});
        }
        try {
            await AsyncStorage.setItem('LANGUAGE',s);
        } catch (error) {
        }
  }
  renderLanguage(){
    if(this.state.lang=="VN"){
        return(
            <TouchableOpacity onPress={()=>{this.setLanguage("EN")}}>
        <View style={{height:50,width:150,backgroundColor:'white',flexDirection:'row',marginRight:5,paddingLeft:6,alignItems:'center',marginTop:10,borderColor:'#6B2C24',borderWidth:2}} >
            
            <FastImage 
                source={imageIcon['flagE']}
                style={{height:35,width:55}}
            />
            
           
            <Text style={{color:'#6B2C24',fontWeight:'900',fontSize:30,marginLeft:13}}>ENG</Text>
        </View> 
        </TouchableOpacity>
        )
    }else{
        return(
            <TouchableOpacity onPress={()=>{this.setLanguage("VN")}}>
        <View style={{height:50,width:150,backgroundColor:'white',flexDirection:'row',marginRight:5,paddingLeft:6,alignItems:'center',marginTop:10,borderColor:'#6B2C24',borderWidth:2}} >
            <FastImage 
                source={imageIcon['flagV']}
                style={{height:35,width:55}}
            />
            
           
            <Text style={{color:'#6B2C24',fontWeight:'900',fontSize:30,marginLeft:18}}>VN</Text>
        </View> 
        </TouchableOpacity>
            )
    }
  }
  gotoAbout(){
      this.props.navigation.navigate('AboutUs');
  }
  render() {
    
    return (
      <View
      style={{flex:1}}
    >
    <ImageBackground source={imageIcon['background']} style={{flex:1}} 
        resizeMode='cover'
    >
      <View style={{height:210,width:width,flexDirection:'row'}}>
        <View  style={{flex:1}}/>
        <View style={{flex:2,alignItems:'center'}}>
        <TouchableOpacity onPress={()=>this.gotoAbout()}>
        <FastImage
          source={imageIcon['logo1946gif']} 
          style={{height:160,width:200,marginTop:20}}
        />
        </TouchableOpacity>
        </View>
        <View style={{flex:1,alignItems:'flex-end'}}>
            {this.renderLanguage()}
        </View>
      </View>
      <View style={{flex:1,paddingLeft:5,paddingRight:0,paddingTop:10,paddingBottom:20}}>
        <View style={{flexDirection:'row',marginBottom:15}} >
        {/**card1**/}  
          <TouchableOpacity onPress={()=>this._gotoItemMenu("1930")}> 
          <View style={styles.cardStyle}>
             
            <Image source={images["1"]}
              style={{height:180,width:180}}
            />
            <Text style={styles.textStyle}>{this.state.title1}</Text>
          </View>
          </TouchableOpacity>   
          {/**card2**/}
          <TouchableOpacity onPress={()=>this._gotoItemMenu("1932")}>
          <View style={styles.cardStyle}>
            <Image source={images["2"]}
              style={{height:180,width:180}}
            />
            <Text style={styles.textStyle}>{this.state.title2}</Text>
          </View>
          </TouchableOpacity>
          {/**card3**/}
          <TouchableOpacity onPress={()=>this._gotoItemMenu("1935")}>
          <View style={styles.cardStyle}>
            <Image source={images["3"]}
              style={{height:180,width:180}}
            />
            <Text style={styles.textStyle}>{this.state.title3}</Text>
          </View>
          </TouchableOpacity>
        </View>
        <View style={{flexDirection:'row',marginBottom:15}} >
          {/**card4**/}
          <TouchableOpacity onPress={()=>this._gotoItemMenu("1940")}>
          <View style={styles.cardStyle}>
            <Image source={images["4"]}
              style={{height:180,width:180}}
            />
            <Text style={styles.textStyle}>{this.state.title4}</Text>
          </View>
          </TouchableOpacity>
          {/**card5**/}
          <TouchableOpacity onPress={()=>this._gotoItemMenu("1940_1")}>
          <View style={styles.cardStyle}>
            <Image source={images["5"]}
              style={{height:180,width:180}}
            />
            <Text style={styles.textStyle}>{this.state.title5}</Text>
          </View>
          </TouchableOpacity>
          {/**card6**/}
          <TouchableOpacity onPress={()=>this._gotoItemMenu("1944")}>
          <View style={styles.cardStyle}>
            <Image source={images["6"]}
              style={{height:180,width:180}}
            />
            <Text style={styles.textStyle}>{this.state.title6}</Text>
          </View>
          </TouchableOpacity>
        </View>
        <View style={{flexDirection:'row',marginBottom:15}} >
         {/**card7**/}
         <TouchableOpacity onPress={()=>this._gotoItemMenu("1946")}>
         <View style={styles.cardStyle}>
         <Image source={images["7"]}
           style={{height:180,width:180}}
         />
         <Text style={styles.textStyle}>{this.state.title7}</Text>
         </View>
         </TouchableOpacity>
        {/**card8**/}
        <TouchableOpacity onPress={()=>this._gotoItemMenu("1950")}>
        <View style={styles.cardStyle}>
        <Image source={images["8"]}
          style={{height:180,width:180}}
        />
        <Text style={styles.textStyle}>{this.state.title8}</Text>
        </View>
        </TouchableOpacity>
          {/**card9**/}
          <TouchableOpacity onPress={()=>this._gotoItemMenu("1954")}>
          <View style={styles.cardStyle}>
            <Image source={images["9"]}
              style={{height:180,width:180}}
            />
            <Text style={styles.textStyle}>{this.state.title9}</Text>
          </View>
          </TouchableOpacity>
        </View>
        <View style={{flexDirection:'row'}} >
          {/**card10**/}
          <TouchableOpacity onPress={()=>this._gotoItemMenu("1976")}>
          <View style={styles.cardStyle}>
            <Image source={images["10"]}
              style={{height:180,width:180}}
            />
            <Text style={styles.textStyle}>{this.state.title10}</Text>
          </View>
          </TouchableOpacity>
          {/**card11**/}
          <TouchableOpacity onPress={()=>this._gotoItemMenu("DRINKS")}>
          <View style={styles.cardStyle}>
            <Image source={images["11"]}
              style={{height:180,width:180}}
            />
            <Text style={styles.textStyle}>{this.state.title11}</Text>
          </View>
          </TouchableOpacity>
          {/**card12**/}
          <TouchableOpacity
            onPress={()=>this._gotoItemMenu("GIFTS")}
           >
          <View style={styles.cardStyle}>
            <Image source={images["12"]}
              style={{height:180,width:180}}
            />
            <Text style={styles.textStyle}>{this.state.title12}</Text>
          </View>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
    </View>
    
    )
  }
}

export default Menu
const styles = StyleSheet.create({
  textStyle:{
    fontFamily:"Trixi Pro Regular",
    textAlign:'center',
    fontSize:20,
    marginTop:5,
    color:'#6B2C24',
  },
  cardStyle:{
    height:220,
    width:180,
    marginBottom:15,
    marginLeft:60,
    
    
  }
})
