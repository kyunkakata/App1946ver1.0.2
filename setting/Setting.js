import React, { Component } from 'react'
import { Text, View,Dimensions,ScrollView,ImageBackground,Image,TouchableOpacity,StyleSheet,TextInput} from 'react-native'
import FastImage from 'react-native-fast-image'
import codePush from "react-native-code-push";
import {BoxShadow} from 'react-native-shadow'
const {height,width} =Dimensions.get('screen')
import {imageMenu1,imageIcon} from '../realm/image'
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
}
const images=imageMenu1
export class Setting extends Component {
    

    constructor(props){
        super(props);
        this.state={  
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
    gotoSetting2=(value)=>{
        
      this.props.navigation.navigate('Setting2',{value:value})
        
    }
    gotoMenu(){
      this.props.navigation.navigate('Menu');
    }
    onButtonPress=()=>{
      codePush.sync({
        updateDialog: true,
        installMode: codePush.InstallMode.IMMEDIATE
      });
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
              <BoxShadow setting={{width:width,height:70,color:'#000',radius:10,opacity:0.5,x:0,y:4,style:{marginVertical:5}}}>
                <View style={{height:70,width:width,backgroundColor:'#424242',flexDirection:'row',alignItems:'center',elevation:10}}>
                    <TouchableOpacity onPress={()=>this.gotoMenu()}>
                    <View style={{height:70,width:90,marginLeft:2,borderWidth:2,borderColor:'#f5f5f5',alignItems:'center',justifyContent:'center'}}>
                        <Image 
                            source={imageIcon['back-arrow']}
                            style={{height:60,width:60}}
                        />
                    </View>
                    </TouchableOpacity>
                    <View style={{height:70,width:613,marginLeft:2,borderWidth:2,borderColor:'#f5f5f5',alignSelf:'flex-end',alignItems:'center',justifyContent:'center'}}>
                        <Text style={{color:'#29b6f6',fontSize:40,fontWeight:'900'}}>Quản lý món ăn</Text>
                    </View>
                    <TouchableOpacity onPress={()=>this.onButtonPress()}>
                    <View style={{height:70,width:90,marginLeft:2,borderWidth:2,borderColor:'#f5f5f5',alignSelf:'flex-end',alignItems:'center',justifyContent:'center'}}>
                    <Image 
                            source={imageIcon['update']}
                            style={{height:45,width:45}}
                        />
                    </View>
                    </TouchableOpacity>
                </View>
                </BoxShadow>
              <FastImage
                source={imageIcon['logo1946gif']} 
                style={{height:120,width:150}}
              />
              </View>
              <View style={{flex:1,alignItems:'flex-end'}}>
                  
              </View>
            </View>
            <View style={{flex:1,paddingLeft:5,paddingRight:0,paddingTop:10,paddingBottom:20}}>
              <View style={{flexDirection:'row',marginBottom:15}} >
              {/**card1**/}  
                <TouchableOpacity onPress={()=>this.gotoSetting2(1)}> 
                <View style={styles.cardStyle}>
                  <Image source={images["1"]}
                    style={{height:180,width:180}}
                  />
                  <Text style={styles.textStyle}>{this.state.title1}</Text>
                </View>
                </TouchableOpacity>   
                {/**card2**/}
                <TouchableOpacity onPress={()=>this.gotoSetting2(2)}>
                <View style={styles.cardStyle}>
                  <Image source={images["2"]}
                    style={{height:180,width:180}}
                  />
                  <Text style={styles.textStyle}>{this.state.title2}</Text>
                </View>
                </TouchableOpacity>
                {/**card3**/}
                <TouchableOpacity onPress={()=>this.gotoSetting2(3)}>
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
                <TouchableOpacity onPress={()=>this.gotoSetting2(4)}>
                <View style={styles.cardStyle}>
                  <Image source={images["4"]}
                    style={{height:180,width:180}}
                  />
                  <Text style={styles.textStyle}>{this.state.title4}</Text>
                </View>
                </TouchableOpacity>
                {/**card5**/}
                <TouchableOpacity onPress={()=>this.gotoSetting2(5)}>
                <View style={styles.cardStyle}>
                  <Image source={images["5"]}
                    style={{height:180,width:180}}
                  />
                  <Text style={styles.textStyle}>{this.state.title5}</Text>
                </View>
                </TouchableOpacity>
                {/**card6**/}
                <TouchableOpacity onPress={()=>this.gotoSetting2(6)}>
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
               <TouchableOpacity onPress={()=>this.gotoSetting2(7)}>
               <View style={styles.cardStyle}>
               <Image source={images["7"]}
                 style={{height:180,width:180}}
               />
               <Text style={styles.textStyle}>{this.state.title7}</Text>
               </View>
               </TouchableOpacity>
              {/**card8**/}
              <TouchableOpacity onPress={()=>this.gotoSetting2(8)}>
              <View style={styles.cardStyle}>
              <Image source={images["8"]}
                style={{height:180,width:180}}
              />
              <Text style={styles.textStyle}>{this.state.title8}</Text>
              </View>
              </TouchableOpacity>
                {/**card9**/}
                <TouchableOpacity onPress={()=>this.gotoSetting2(9)}>
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
                <TouchableOpacity onPress={()=>this.gotoSetting2(10)}>
                <View style={styles.cardStyle}>
                  <Image source={images["10"]}
                    style={{height:180,width:180}}
                  />
                  <Text style={styles.textStyle}>{this.state.title10}</Text>
                </View>
                </TouchableOpacity>
                {/**card11**/}
                <TouchableOpacity onPress={()=>this.gotoSetting2(11)}>
                <View style={styles.cardStyle}>
                  <Image source={images["11"]}
                    style={{height:180,width:180}}
                  />
                  <Text style={styles.textStyle}>{this.state.title11}</Text>
                </View>
                </TouchableOpacity>
                {/**card12**/}
                <TouchableOpacity
                  onPress={()=>this.gotoSetting2(12)}
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

export default Setting
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