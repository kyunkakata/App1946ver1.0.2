import React, { Component } from 'react'
import { Text, View,Button,Alert,StyleSheet,Image,ImageBackground,Dimensions,Vibration,TouchableOpacity,TextInput,FlatList,AsyncStorage} from 'react-native'
import Realm from 'realm'
import FastImage from '../node_modules/react-native-fast-image';
import {databaseOptions} from '../realm/allSchema'
import {image,imageIcon} from '../realm/image'
import PopupDialog,{SlideAnimation,DialogTitle,DialogButton} from 'react-native-popup-dialog'
var SoundPlayer = require('react-native-sound');
var song = null;

const slideAnimation = new SlideAnimation({slideFrom:'top'});
const {width,height} = Dimensions.get('window')
export class ItemMenu extends React.PureComponent {
  _onPressItem =(id:string) =>{
    this.setState(state=>{
      const selected = new Map(state.selected);
      selected.set(id,!selected.get(id));
      return {selected};
    })
  }
constructor(props){
    super(props)

    this.state={
      refresh:false,
      amountClick:0,
      selected:(new Map():Map<string,boolean>),
      itemMenu:"TẤM QUÀ 1930",
      lang:'VN',
      meals_MAIN:[],
      reload:false,
      secret:false,
      password:'',
    }
}
async componentDidMount(){
    const lang=await AsyncStorage.getItem('LANGUAGE');
    this.setState({lang});
    Realm.open(databaseOptions)
    .then(realm=>{
      let info = realm.objects('Meal');
      let filteredInfo = info.filtered('type=="TAMQUA"')
      let filteredInfo1 = info.filtered('type=="PHOCHO"')
      let filteredInfo2 = info.filtered('type=="DUACAY"')
      let filteredInfo3 = info.filtered('type=="RAU"')
      let filteredInfo4 = info.filtered('type=="DONGDUONG"')
      let filteredInfo5 = info.filtered('type=="HOILANG"')
      let filteredInfo6 = info.filtered('type=="TQKC"')
      let filteredInfo7 = info.filtered('type=="COMNHA"')
      let filteredInfo8 = info.filtered('type=="CANH"')
      let filteredInfo9 = info.filtered('type=="GPTD"')
      let filteredInfo10 = info.filtered('type=="RUOUQUE"')
      let filteredInfo11 = info.filtered('type=="QUATANG"')
    switch(this.props.navigation.getParam('itemSelected')){
      case "1930":
        if(this.state.lang=="VN"){
        this.setState({itemMenu:"TẤM QUÀ 1930"})
        }else{
          this.setState({itemMenu:"PLATES GIFTS 1930"});
        }
        this.setState({meals_MAIN:filteredInfo})
        break;
      case "1932":
      if(this.state.lang=="VN"){
        this.setState({itemMenu:"PHỐ CHỢ 1932"})
        }else{
          this.setState({itemMenu:"MARKET STREET 1932"});
        }
        this.setState({meals_MAIN:filteredInfo1})
        break;
      case "1940":
      if(this.state.lang=="VN"){
        this.setState({itemMenu:"DƯA CAY 1940"})
        }else{
          this.setState({itemMenu:"PUTTING SPICY 1940"});
        }
        this.setState({meals_MAIN:filteredInfo2})
        break;
      case "1935":
      if(this.state.lang=="VN"){
        this.setState({itemMenu:"RAU 1935"})
        }else{
          this.setState({itemMenu:"VEGETABLE 1935"});
        }
        this.setState({meals_MAIN:filteredInfo3})
        break;
      case "1940_1":
      if(this.state.lang=="VN"){
        this.setState({itemMenu:"ĐÔNG DƯƠNG 1942"})
        }else{
          this.setState({itemMenu:"INDOCHINA 1942"});
        }
        this.setState({meals_MAIN:filteredInfo4})
        break;
        case "1944":
        if(this.state.lang=="VN"){
          this.setState({itemMenu:"HỘI LÀNG 1944"})
          }else{
            this.setState({itemMenu:"VILLAGE FESTIVAL 1944"});
          }
        this.setState({meals_MAIN:filteredInfo5})
        break;
      
      case "1946":
      if(this.state.lang=="VN"){
        this.setState({itemMenu:"TOÀN QUỐC KHÁNG CHIẾN 1946"})
        }else{
          this.setState({itemMenu:"NATIONAL RESISTANCE 1946"});
        }
        this.setState({meals_MAIN:filteredInfo6})
        break;
      case "1950":
      if(this.state.lang=="VN"){
        this.setState({itemMenu:"CƠM NHÀ 1950"})
        }else{
          this.setState({itemMenu:"HOME COOKED 1950"});
        }
        this.setState({meals_MAIN:filteredInfo7})
        break;
      case "1954":
      if(this.state.lang=="VN"){
        this.setState({itemMenu:"CANH 1954"})
        }else{
          this.setState({itemMenu:"SOUP 1954"});
        }
        this.setState({meals_MAIN:filteredInfo8})
        break;
      case "1976":
      if(this.state.lang=="VN"){
        this.setState({itemMenu:"GIẢI PHÓNG THỦ ĐÔ"})
        }else{
        this.setState({itemMenu:"LIBERATION CAPITAL 1954"})
          
        }
        this.setState({meals_MAIN:filteredInfo9})
        break;
      case "DRINKS":
      if(this.state.lang=="VN"){
        this.setState({itemMenu:"RƯỢU QUÊ"})
        }else{
        this.setState({itemMenu:"LOCAL SPIRITS"})
        }
        this.setState({meals_MAIN:filteredInfo10})
        this.setState({secret:true})
        break;
      case "GIFTS":
      if(this.state.lang=="VN"){
        this.setState({itemMenu:"QUÀ TẶNG"})
        }else{
        this.setState({itemMenu:"THE GIFT"})
        }
        this.setState({meals_MAIN:filteredInfo11})
        break;
    }
  })
}
gotoSetting(){
  this.slideAnimationDialogAlert.show();
}
renderBottomBar(s){
  if(s=="VN"){
    return(
    <View>
    <FastImage
      style={{height:20,width:width}}
      source={imageIcon['borderWidth']}
     />
    <View style={{height:60,justifyContent:'center',flexDirection:'row',alignItems: 'center',paddingTop:40}}>
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
    <Image 
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
      <View style={{height:60,justifyContent:'center',flexDirection:'row',alignItems: 'center',paddingTop:40}}>
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
      color:'white'}}>Order</Text>
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
renderTextTopBar(){
  if(this.state.itemMenu=='TOÀN QUỐC KHÁNG CHIẾN 1946'){
    return(
      <Text style={{fontFamily:"Trixi Pro Regular",textAlign:'center',fontSize:23,marginTop:20,
      color:'white'}} >{this.state.itemMenu}</Text>
    )
  }else if(this.state.itemMenu=='VILLAGE FESTIVAL 1944'){
    return(
      <Text style={{fontFamily:"Trixi Pro Regular",textAlign:'center',fontSize:24,marginTop:20,
      color:'white'}} >{this.state.itemMenu}</Text>
    )
  }else if(this.state.itemMenu=='LIBERATION CAPITAL 1954'){
    return(
      <Text style={{fontFamily:"Trixi Pro Regular",textAlign:'center',fontSize:24,marginTop:20,
      color:'white'}} >{this.state.itemMenu}</Text>
    )
  }else if(this.state.itemMenu=='NATIONAL RESISTANCE 1946'){
    return(
      <Text style={{fontFamily:"Trixi Pro Regular",textAlign:'center',fontSize:24,marginTop:20,
      color:'white'}} >{this.state.itemMenu}</Text>
    )
  }
  else{
    return(
    <Text style={{fontFamily:"Trixi Pro Regular",textAlign:'center',fontSize:30,marginTop:17,
      color:'white'}} >{this.state.itemMenu}</Text>
    )
  }
}
renderTopBar(){
  if(!this.state.secret){
    return(
    <View style={{height:280,width:width,alignItems:'center'}}>
      
      <TouchableOpacity onPress={()=>this._gotoAbout()}>
      
      <FastImage
        source={imageIcon['logo1946gif']} 
        style={{height:160,width:200,marginTop:20}}
      />
      </TouchableOpacity>
      <ImageBackground
        source={imageIcon['title']}
        style={{height:70,width:350,marginTop:10}}
      >
      {this.renderTextTopBar()}
      </ImageBackground>
    </View>
    )}
    else{
      return(
      <View style={{height:280,width:width,alignItems:'center'}}>
      <View style={{height:170,width:width,flexDirection:'row'}}>
      <View style={{height:170,width:70,alignItems:'center'}}>
      <TouchableOpacity onPress={()=>this.gotoSetting()}>
        <Image 
          source={imageIcon['setting']}
          style={{height:64,width:64,marginTop:10}}
        />
      </TouchableOpacity>
      </View>
      <View style={{flex:1,flexDirection:'column'}}>
      <TouchableOpacity onPress={()=>this._gotoAbout()}>
      
      <FastImage
        source={imageIcon['logo1946gif']} 
        style={{height:160,width:200,marginTop:20,alignSelf:'center'}}
      />
      </TouchableOpacity>
      </View>
      <View style={{height:170,width:70}}></View>
      </View>
      <ImageBackground
        source={imageIcon['title']}
        style={{height:70,width:350,marginTop:10}}
      >
      {this.renderTextTopBar()}
      </ImageBackground>
    </View>
      )
    }
}
_gotoShowItem(id){
    this.playSound();
    this.props.navigation.navigate('ShowItem',{
      itemId:id,
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
_gotoAbout(){
    this.playSound();
    this.props.navigation.navigate('AboutUs')
}
_gotoBill(){
  this.playSound();
  Realm.open(databaseOptions)
    .then(realm=>{
      let data = realm.objects('Meal').filtered('amount > 0')
      const length= data.length;
      if(length>0){
        this.props.navigation.navigate('Bill')
      }else{
        Alert.alert('Thông báo','Xin quý khách hãy đặt món')
      }
    })
}
_gotoBack(){
    this.playSound();
    this.props.navigation.goBack(null)
 } 
popupDialogControl(bool){
if(!bool){
  this.slideAnimationDialogAlert.dismiss();
}else if(bool&&this.state.password=="tuannam1946"){
  this.slideAnimationDialogAlert.dismiss();
  this.props.navigation.navigate('Setting');
}
}
  render() {
    if(this.state.lang=="VN"){
    return (
      <View
        style={{flex:1}}
      >
      <PopupDialog 
          width={0.6}
          height={0.2}
          ref={(popupDialog)=>{
            this.slideAnimationDialogAlert = popupDialog;
          }}
          dialogAnimation={slideAnimation}
        >
          <View style={{flex:1,backgroundColor:'#263238',borderRadius:5}}>
            <Text style={{fontSize:30,color:'#29b6f6',alignSelf:'center',fontWeight:'bold',marginTop:10}}>Nhập mật khẩu</Text>
            <View style={{height:1,width:width*0.8,backgroundColor:'white',marginTop:10}} />
            
            <TextInput 
              placeholder="Mật khẩu"
              placeholderTextColor={'#29b6f6'}
              secureTextEntry
              onChangeText={(text)=>this.setState({password:text})}                                                     
              style={{width:width*0.4,alignSelf:'center',paddingLeft:20,paddingRight:20,marginTop:40,borderWidth:2,borderColor:'#9e9e9e',borderRadius:17}}
            />
            <View style={{flexDirection:'row',marginTop:30,flex:1,borderTopWidth:1,borderTopColor:'#9e9e9e'}}>
              <TouchableOpacity style={{flex:1,borderRightWidth:1,borderRightColor:'#9e9e9e',alignItems:'center',justifyContent:'center'}}
                onPress={()=>this.popupDialogControl(false)}
              >
                <Text style={{fontWeight:'100',color:'#bdbdbd',fontSize:24}}>Hủy</Text>
              </TouchableOpacity>
              <TouchableOpacity style={{flex:1,borderLeftWidth:1,borderLeftColor:'#9e9e9e',alignItems:'center',justifyContent:'center'}}
                onPress={()=>this.popupDialogControl(true)}
              >
                <Text style={{fontWeight:'100',color:'#bdbdbd',fontSize:24}}>OK</Text>
              </TouchableOpacity>
            </View>
          </View>
        </PopupDialog>
      <ImageBackground source={imageIcon['background']} style={{flex:1}} >
        {this.renderTopBar()}
        <View style={{flex:1,paddingLeft:5,paddingRight:0,paddingTop:10}}>
        <FastImage 
          style={{height:20,width:width}}
          source={imageIcon['borderWidth']}
        />
          {/*Main View*/}
          <View style={{height:810,width:width,paddingTop:10}}>

          <FlatList
          data={this.state.meals_MAIN}
          showsVerticalScrollIndicator
          numColumns={3}
          extraData={this.state.meals_MAIN}
          renderItem={({item}) => 
            <MenuListItem 
              id={item.id}
              image={item.image}
              name={item.name}
              amount={item.amount}
              desc={item.desc}
              onPressItem={this._onPressItem}
              onLongPressItem={()=>this._gotoShowItem(item.id)}
              selected={!!this.state.selected.get(item.id)}
              
            />
          }
          keyExtractor={(item) => item.id}
          />
          </View>
           {/*</Main View*/}
          {this.renderBottomBar("VN")}
        </View>
      </ImageBackground>
      </View>
      
    )
  }else{
    return (
      <View
        style={{flex:1}}
      >
      <PopupDialog 
          width={0.6}
          height={0.2}
          ref={(popupDialog)=>{
            this.slideAnimationDialogAlert = popupDialog;
          }}
          dialogAnimation={slideAnimation}
        >
          <View style={{flex:1,backgroundColor:'#263238',borderRadius:5}}>
            <Text style={{fontSize:30,color:'#29b6f6',alignSelf:'center',fontWeight:'bold',marginTop:10}}>Nhập mật khẩu</Text>
            <View style={{height:1,width:width*0.8,backgroundColor:'white',marginTop:10}} />
            
            <TextInput 
              placeholder="Mật khẩu"
              placeholderTextColor={'#29b6f6'}
              secureTextEntry
              onChangeText={(text)=>this.setState({password:text})}                                                     
              style={{width:width*0.4,alignSelf:'center',paddingLeft:20,paddingRight:20,marginTop:40,borderWidth:2,borderColor:'#9e9e9e',borderRadius:17}}
            />
            <View style={{flexDirection:'row',marginTop:30,flex:1,borderTopWidth:1,borderTopColor:'#9e9e9e'}}>
              <TouchableOpacity style={{flex:1,borderRightWidth:1,borderRightColor:'#9e9e9e',alignItems:'center',justifyContent:'center'}}
                onPress={()=>this.popupDialogControl(false)}
              >
                <Text style={{fontWeight:'100',color:'#bdbdbd',fontSize:24}}>Hủy</Text>
              </TouchableOpacity>
              <TouchableOpacity style={{flex:1,borderLeftWidth:1,borderLeftColor:'#9e9e9e',alignItems:'center',justifyContent:'center'}}
                onPress={()=>this.popupDialogControl(true)}
              >
                <Text style={{fontWeight:'100',color:'#bdbdbd',fontSize:24}}>OK</Text>
              </TouchableOpacity>
            </View>
          </View>
        </PopupDialog>
      <ImageBackground source={imageIcon['background']} style={{flex:1}} >
        {this.renderTopBar()}
        <View style={{flex:1,paddingLeft:5,paddingRight:0,paddingTop:10}}>
        <FastImage 
          style={{height:20,width:width}}
          source={imageIcon['borderWidth']}
        />
          {/*Main View*/}
          <View style={{height:810,width:width,paddingTop:10}}>
          <FlatList
          data={this.state.meals_MAIN}
          showsVerticalScrollIndicator
          numColumns={3}
          extraData={this.state.meals_MAIN}
          renderItem={({item}) => 
            <MenuListItem 
              id={item.id}
              image={item.image}
              name={item.nameEN}
              amount={item.amount}
              desc={item.descEN}
              onPressItem={this._onPressItem}
              onLongPressItem={()=>this._gotoShowItem(item.id)}
              selected={!!this.state.selected.get(item.id)}
              
            />
          }
          keyExtractor={(item) => item.id}
          />
          </View>
           {/*</Main View*/}
          {this.renderBottomBar("EN")}
        </View>
      </ImageBackground>
      </View>
      
    )
  }
  
  }
}
export default ItemMenu
class MenuListItem extends React.PureComponent{
  constructor(props){
    super(props)
    this.state={
      amount:1,
      selected:false,
      id:0,
    }
  }

  componentWillMount(){
    if(this.props.amount==0){
    this.setState({selected:this.props.selected})
    this.setState({id:this.props.id})
    }else{
      this.setState({selected:true})
      this.setState({id:this.props.id})
      this.setState({amount:this.props.amount})
    }
  }
  storeAmount(s){
    if(s){
      Realm.open(databaseOptions)
      .then(realm =>{
        realm.write(()=>{
        realm.create('Meal',{id:this.state.id,amount:this.state.amount},true);
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
  addAmount=(s)=>{
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
        this.props.onPressItem(this.props.id);
        this.setState({selected:false})
        this.storeAmount(false);
        
      }
    }
  }
  clearChecked(){
    this.props.onPressItem(this.props.id);
        this.setState({selected:false})
        this.storeAmount(false);
  }
  _onPress= () =>{
    this.props.onPressItem(this.props.id);
    this.setState({selected:!this.state.selected});
    this.storeAmount(true);
  }
  _onLongPress = () =>{
    this.props.onLongPressItem();
  }
  renderTextItem(){
    if(this.props.name.length<=27){
    return(
      <Text style={styles.textStyle}>{this.props.name}</Text>
    )}
    else{
      return(
        <Text style={{fontFamily:"Trixi Pro Regular",textAlign:'center',fontSize:18,marginTop:5,lineHeight:20,color:'#6B2C24',}}>{this.props.name}</Text>
      )
    }
  }
  render(){
      
    if(!this.state.selected){
    return(
    
    <View style={styles.cardStyle}>
      <TouchableOpacity onPress={()=>this._onLongPress()}
       
       >
      <Image source={image[this.props.image]}
        style={{height:180,width:180}}
      />
      </TouchableOpacity>
      <TouchableOpacity onPress={()=>this._onLongPress()}>
      {this.renderTextItem()}
      </TouchableOpacity>
    </View>
    )
  }else{
    return(
      <View style={styles.cardStyle}>
      <ImageBackground source={image[this.props.image]}
        style={{height:180,width:180}}
      >
      <View style={{flex:1}}>
        <TouchableOpacity onPress={()=>this._onLongPress()}
        >  
        <FastImage source={imageIcon['cooked']}
        style={{height:80,width:80,alignSelf: 'flex-end',marginTop:5,marginRight:5}}
        />
        </TouchableOpacity>
        <View style={{height:60}}>
          <View style={{height:30,flexDirection:'row'}}>
          <TouchableOpacity onPress={()=>this._onLongPress()}>
          <View style={{width:75}}/>
          </TouchableOpacity>
          <View style={{height:30,width:30}}>
          <TouchableOpacity onPress={()=>this.clearChecked()}>
          <FastImage
            source={imageIcon['cancel']}
            style={{height:30,width:30}}
          />
          </TouchableOpacity>
          </View>
          <TouchableOpacity onPress={()=>this._onLongPress()}>
          <View style={{width:75}}/>
          </TouchableOpacity>
          </View>
          <TouchableOpacity onPress={()=>this.addAmount(true)}
              onLongPress={()=>this._onLongPress()}    
          >
            <View  style={{height:30}}/>
          </TouchableOpacity>
        </View>
    
      </View>
      <View style={{height:40,backgroundColor:'white',alignItems: 'center',justifyContent: 'center',flexDirection:'row',marginLeft:5,marginRight:5}} >
        <TouchableOpacity onPress={()=>this.addAmount(false)}>
        <View style={{height:28,borderWidth:1,borderColor:'black',width:40,alignItems:'center',justifyContent:'center'}}><Text style={{fontFamily:'Trixi Pro Regular',fontSize:20}}>-</Text></View>
        </TouchableOpacity>
        <View style={{height:28,borderWidth:1,borderColor:'black',width:40,alignItems:'center',justifyContent:'center'}}>
          <Text>{this.state.amount}</Text>
        </View>
        <TouchableOpacity onPress={()=>this.addAmount(true)}>
        <View style={{height:28,borderWidth:1,borderColor:'black',width:40,alignItems:'center',justifyContent:'center'}}><Text style={{fontFamily:'Trixi Pro Regular',fontSize:20}}>+</Text></View>
        </TouchableOpacity>
      </View>
      </ImageBackground>
      <TouchableOpacity onPress={()=>this._onLongPress()}>{this.renderTextItem()}
      </TouchableOpacity>
    </View>
 
    )
  }
  }
}
const styles = StyleSheet.create({
  textStyle:{
    fontFamily:"Trixi Pro Regular",textAlign:'center',fontSize:20,marginTop:5,lineHeight:30,color:'#6B2C24',
  },
  descStyle:{
    fontFamily:"Trixi Pro Lig",
    textAlign:'center',
    fontSize:16,
    marginTop:5,
    color:'grey',
  },
  cardStyle:{
    height:250,
    width:180,
    marginBottom:10,
    marginLeft:60,
    
  }
})