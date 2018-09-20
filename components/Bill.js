import React, { Component } from 'react'
import { Text, View,StyleSheet,Image,ImageBackground,AsyncStorage,ScrollView,Dimensions,Vibration,TextInput,FlatList,TouchableOpacity,Alert} from 'react-native'
import PopupDialog,{SlideAnimation,DialogTitle,DialogButton} from 'react-native-popup-dialog'
import {databaseOptions,clearMeal} from '../realm/allSchema'
import {imageIcon} from '../realm/image'
var SoundPlayer = require('react-native-sound');
var song = null;
const {width,height} = Dimensions.get('window')
const slideAnimation = new SlideAnimation({slideFrom:'top'});
export class Bill extends Component {
  constructor(props){
    super(props)
    this.state={
      itemMenu:"TẤM QUÀ 1930",
      meals_MAIN:[],
      sum:0,
      lang:'',
      pass:'',// Pass is : nhahang1946
      checked:0,
      pass2:'',
      loading:false
    }
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
 async componentWillMount(){

    const lang = await AsyncStorage.getItem("LANGUAGE");
    this.setState({lang});
    Realm.open(databaseOptions)
    .then(realm=>{
      let info=realm.objects('Meal').filtered('amount>0')
      this.setState({meals_MAIN:info});
      //Calculating sum of all products
      for( i=0;i<info.max('amount');i++){
        let data=realm.objects('Meal').filtered('amount>'+i+'');
        this.setState({sum:this.state.sum+data.sum('price')})
      }
      let lala=realm.objects('ModeApp').length;
      if(lala==1){
          this.setState({checked:1})
      }
    })
    this.setState({loading:true})
  }
  clear(){
      this.playSound();
      clearMeal();
      this.props.navigation.navigate('Menu');
  }
  checkBill(){
      //this.props.navigation.navigate('BillMeal')
      this.slideAnimationDialogConfirm.show();  
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
  showSlideAnimationDialog(){
    if(this.state.pass=="1946"){
    this.slideAnimationDialogAlert.show();
    Realm.open({schema:[MealSchema,ModeSchema]})
    .then(realm=>{
      realm.write(()=>{
        realm.create('ModeApp',{id:1,mode:1})
      })
    })
    this.setState({checked:1})
    }else{
      this.slideAnimationDialogCancel.show();
    }
  }
  showMealLog(){
    this.playSound();
    this.slideAnimationDialog.show();
  }
  _gotoMenu(){
    this.playSound();
    this.props.navigation.navigate('Menu')
  }
  _gotoBack(){
    this.playSound();
    this.props.navigation.goBack();
  }
  renderTopBar(){
    if(this.state.lang=="VN"){
    return(
      <View style={{height:280,width:width,alignItems:'center'}}>
      <TouchableOpacity onPress={()=>this._gotoAbout()}>
      <Image
        source={imageIcon['logo1946gif']} 
        style={{height:160,width:200,marginTop:20}}
      />
      </TouchableOpacity>
      <ImageBackground
        source={imageIcon['title']}
        style={{height:70,width:350,marginTop:10}}
      >
      <Text style={{fontFamily:"Trixi Pro Regular",textAlign:'center',fontSize:30,marginTop:17,
      color:'white'}} >HÓA ĐƠN</Text>
      </ImageBackground>
      </View>
    )}else{
      return(
        <View style={{height:280,width:width,alignItems:'center'}}>
        <TouchableOpacity onPress={()=>this._gotoAbout()}>
        <Image
          source={imageIcon['logo1946gif']} 
          style={{height:160,width:200,marginTop:20}}
        />
        </TouchableOpacity>
        <ImageBackground
          source={imageIcon['title']}
          style={{height:70,width:350,marginTop:10}}
        >
        <Text style={{fontFamily:"Trixi Pro Regular",textAlign:'center',fontSize:30,marginTop:17,
        color:'white'}} >BILL</Text>
        </ImageBackground>
        </View>
      ) 
    }
  }
  _gotoAbout(){
    this.playSound();
    this.props.navigation.navigate('AboutUs')
  }
  _gotoBack(){
    this.playSound();
    this.props.navigation.goBack();
  }
  render() {
    if(this.state.loading){
    if(this.state.lang=="VN"){
    return (
        <View
        style={{flex:1}}
      >
    <PopupDialog 
      width={0.9}
      height={0.4}
      ref={(popupDialog)=>{
        this.slideAnimationDialogConfirm = popupDialog;
      }}
      dialogAnimation={slideAnimation}
    >
      <View style={styles.dialogContentView} >
      <Image 
          source={imageIcon['logo']}
          style={{height:150,width:150}}
        />
      <View style={{marginTop:20,backgroundColor:'white',marginBottom:50,borderWidth:4,borderColor:'#6b2c24',width:300,height:60,borderRadius:30}}>
        <TextInput  placeholder="Nhập mật khẩu" placeholderTextColor="grey" 
          style={{fontFamily:'Trixi Pro Regular',width:245,marginLeft:22}}
          onChangeText={(pass2)=>{this.setState({pass2})}}
        />
      </View>
      <TouchableOpacity onPress={()=>this.clear()}>
        <ImageBackground
            source={imageIcon['button']}
            style={{height:77,width:250,marginTop:10,marginLeft:10,alignItems:'center',justifyContent:'center'}}
        >
            <Text style={{fontFamily:'Trixi Pro Regular',color:'white',fontSize:24,alignSelf:'center'}}>Xác nhận</Text>
        </ImageBackground>
      </TouchableOpacity>
      </View>
    </PopupDialog>
    <PopupDialog 
      width={0.9}
      height={0.7}
      ref={(popupDialog)=>{
        this.slideAnimationDialogAlert = popupDialog;
      }}
      dialogAnimation={slideAnimation}
    >
      <View style={styles.dialogContentView} >
        <Image 
          source={imageIcon['logo']}
          style={{height:150,width:150}}
        />
        <Text style={{fontSize:36,color:'#6B2C24',fontFamily:'Trixi Pro Regular',margin:40,textAlign:'center'}}>CẢM ƠN QUÝ KHÁCH ĐÃ LỰA CHỌN SỬ DỤNG DỊCH VỤ CỦA HỆ THỐNG NHÀ HÀNG 1946 ĐÔNG DƯƠNG PHONG VỊ.</Text>
        <Image 
          source={imageIcon['ready']}
          style={{height:220,width:220}}
        />
        <Text style={{fontSize:28,color:'#6B2C24',fontFamily:'Trixi Pro Regular',marginLeft:60,marginRight:60,textAlign:'center'}}>Quý khách vừa lựa chọn xong thực đơn và xin vui lòng chờ trong giây lát trong khi các đầu bếp thể hiện.</Text>
        <Text style={{fontSize:28,color:'#6B2C24',fontFamily:'Trixi Pro Tex',textAlign:'center',margin:30}}>Chúc quý khách có một bữa ăn hài lòng và vui vẻ!</Text>
        <Text style={{fontSize:28,color:'#6B2C24',fontFamily:'Trixi Pro Tex',textAlign:'center',marginTop:20}}>Trân trọng!</Text>
      </View>
    </PopupDialog>
      {/*Pop-up Meal show*/}
    <PopupDialog 
      width={0.7}
      height={0.7}
      ref={(popupDialog)=>{
        this.slideAnimationDialog = popupDialog;
      }}
      dialogAnimation={slideAnimation}
    >
      <View style={styles.dialogContentView} >
          <Image
            source={imageIcon['logo']}
            style={{height:100,width:100}}
          />
          <View style={{borderColor:'#6B2C24',borderWidth:3,height:600,width:500,marginTop:20}}>
          <View style={{borderColor:'#6B2C24',borderWidth:2,height:585,width:485,marginTop:5,marginLeft:5}}>
          
          <View style={{height:50,flexDirection:'row'}}>
            <View style={{flex:3,borderRightWidth:2,borderRightColor:'#6B2C24',borderBottomColor:'#6B2C24',borderBottomWidth:2,alignItems:'center',justifyContent:'center'}}>
              <Text style={{fontFamily:"Trixi Pro Regular",fontSize:24,color:'#6B2C24'}}>Tên món</Text>
            </View>
            <View style={{flex:1,borderRightColor:'#6B2C24',borderBottomColor:'#6B2C24',borderBottomWidth:2,alignItems:'center',justifyContent:'center'}}>
              <Text style={{fontFamily:"Trixi Pro Regular",fontSize:24,color:'#6B2C24'}}>Số lượng</Text>
            </View>
          </View>
          <FlatList 
            data={this.state.meals_MAIN}
            showsVerticalScrollIndicator
            keyExtractor={(item)=>item.id}
            renderItem={({item})=>(
              <View style={{height:50,flexDirection:'row'}}>
            <View style={{flex:3,borderRightWidth:2,borderRightColor:'#6B2C24',borderBottomColor:'grey',borderBottomWidth:1,alignItems:'center',justifyContent:'center'}}>
              <Text style={{fontFamily:"Trixi Pro Regular",fontSize:24,color:'#6B2C24'}}>{item.name}</Text>
            </View>
            <View style={{flex:1,borderRightColor:'#6B2C24',borderBottomColor:'grey',borderBottomWidth:1,alignItems:'center',justifyContent:'center'}}>
              <Text style={{fontFamily:"Trixi Pro Regular",fontSize:24,color:'#6B2C24'}}>{item.amount}</Text>
            </View>
            </View>
            )}
          />
          
          </View>
        </View>
        <TouchableOpacity onPress={()=>this.slideAnimationDialog.dismiss()}>
        <ImageBackground 
          source={imageIcon['title']}
          style={{height:50,width:250,justifyContent:'center',alignItems:'center',marginTop:30}}
        >
          <Text style={{fontFamily:"Trixi Pro Regular",fontSize:24,color:'#6B2C24'}}>Trở lại</Text>
        </ImageBackground>
        </TouchableOpacity>
      </View>
    </PopupDialog>
      <ImageBackground source={imageIcon['background']} style={{flex:1}} >
        {this.renderTopBar()}
      {/*Meal orders*/}
      <Image 
        style={{height:20,width:width}}
        source={imageIcon['borderWidth']}
      />
      <View style={{height:400,flexDirection:'column'}}>
        {/*TopBar Flat List Item */}
        <View style={{height:80,width:width,flexDirection:'row'}}>
          <View style={{width:width*0.5,justifyContent:'center'}}>
            <Text style={{marginLeft:40,fontFamily:"Trixi Pro Regular",fontSize:24,
            marginTop:5,color:'#6B2C24'}}>Tên món</Text>
          </View>
          <View style={{width:width*0.25,justifyContent:'center',alignItems:'center'}}>
              <Text style={styles.textStyle}>Giá tiền</Text> 
              <Text style={styles.textStyle}>(đồng bạc)</Text>         
          </View>
          <View style={{width:width*0.25,justifyContent:'center',alignItems:'center'}}>
              <Text style={styles.textStyle}>Số lượng</Text>
          </View>
        </View>
         {/*</TopBar Flat List Item */}
         {/*Flat List Item*/}
          <FlatList
            data={this.state.meals_MAIN}
            showsVerticalScrollIndicator
            renderItem={({item}) => 
            <View style={{height:80,width:width,flexDirection:'row'}}>
              <View style={{width:width*0.5,justifyContent:'center'}}>
                  <Text style={{marginLeft:45,fontFamily:"Trixi Pro Regular",fontSize:20,
                  marginTop:5,color:'black'}}>{item.name}</Text>
              </View>
              <View style={{width:width*0.25,justifyContent:'center',alignItems:'center'}}>
                <Text style={{fontFamily:"Trixi Pro Regular",color:'black',fontSize:24}}>{item.price}</Text> 
                         
              </View>
              <View style={{width:width*0.25,justifyContent:'center',alignItems:'center'}}>
                <Text style={{fontFamily:"Trixi Pro Regular",color:'black',fontSize:24}} >{item.amount}</Text>
              </View>
            </View>
            }
            keyExtractor={(item) => item.id}
          />
             {/*</Flat List Item*/}
      </View>
      {/*</Meal orders*/}
      {/*Calculation*/}
      <View style={{height:200,justifyContent:'space-between'}}>
          <Image 
            source={imageIcon['borderWidth']}
            style={{height:10,width:width}}
          />
          {/*Sum*/}
          <View style={{height:40,width:width,flexDirection:'row'}}>
            <View style={{width:width*0.5,justifyContent:'center'}}>
              <Text style={{marginLeft:40,fontFamily:"Trixi Pro Regular",color:'black',fontSize:24}}>Tổng tiền</Text>
            </View>
            <View style={{width:width*0.25,justifyContent:'center',alignItems:'center'}}>
              <Text style={{fontFamily:"Trixi Pro Regular",color:'black',fontSize:24}}>{this.state.sum}</Text> 
            </View>
          </View>
           {/*</Sum*/}
            {/*Last sum*/}
          <View style={{height:40,width:width,flexDirection:'row'}}>
            <View style={{width:width*0.5,justifyContent:'center'}}>
              <Text style={{marginLeft:40,fontFamily:"Trixi Pro Regular",color:'black',fontSize:24}}>Thanh toán</Text>
            </View>
            <View style={{width:width*0.25,justifyContent:'center',alignItems:'center'}}>
              <Text style={{fontFamily:"Trixi Pro Regular",color:'black',fontSize:24}}>{this.state.sum}</Text> 
            </View>
          </View>
           {/*</ Last sum*/}
           <Image 
            source={imageIcon['borderWidth']}
            style={{height:10,width:width}}
          />
      </View>
        {/*</Calculation*/}
      {/*Bottom bar*/}
      <View style={{height:210,alignItems:'center'}}>
      {/*Password*/}
          <Text style={{fontFamily:'Trixi Pro Regular',color:'#6B2C24',marginTop:30,fontSize:24,alignSelf:'center'}}>Chúc quý khách ngon miệng !</Text>
      <TouchableOpacity onPress={()=>this.clear()}>
        <ImageBackground
            source={imageIcon['button']}
            style={{height:77,width:250,marginTop:10,marginLeft:10,alignItems:'center',justifyContent:'center'}}
        >
            <Text style={{fontFamily:'Trixi Pro Regular',color:'white',fontSize:24,alignSelf:'center'}}>Đặt lại</Text>
        </ImageBackground>
      </TouchableOpacity>
      </View>
      
      <View style={{height:90}}>
          <Image 
            source={imageIcon['borderWidth']}
            style={{height:20,width:width}}
          />
          <View style={{flex:1,flexDirection:'row',alignItems:'center',paddingTop:40}}>
          {/*Button Back*/}
            <View style={{flex:1,alignItems: 'center',}}>
            <TouchableOpacity onPress={() => this.showMealLog()}>
          <ImageBackground
            source={imageIcon['button']}
            style={{height:45,width:145,flexDirection:'row'}}
          >
            <Text style={{ fontFamily:"Trixi Pro Regular",
              marginLeft:9,
              fontSize:22,
              marginTop:9,
              color:'white',}}>Xem hoá đơn</Text>
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
      
       {/*</Bottom bar*/}
      </ImageBackground>
      </View>
      )
}else{
        return (
            <View
            style={{flex:1}}
          >
        <PopupDialog 
          width={0.9}
          height={0.4}
          ref={(popupDialog)=>{
            this.slideAnimationDialogConfirm = popupDialog;
          }}
          dialogAnimation={slideAnimation}
        >
          <View style={styles.dialogContentView} >
          <Image 
              source={imageIcon['logo']}
              style={{height:150,width:150}}
            />
          <View style={{marginTop:20,backgroundColor:'white',marginBottom:50,borderWidth:4,borderColor:'#6b2c24',width:300,height:60,borderRadius:30}}>
            <TextInput  placeholder="Input Password" placeholderTextColor="grey" 
              style={{fontFamily:'Trixi Pro Regular',width:245,marginLeft:22}}
              onChangeText={(pass2)=>{this.setState({pass2})}}
            />
          </View>
          <TouchableOpacity onPress={()=>this.clear()}>
            <ImageBackground
                source={imageIcon['button']}
                style={{height:77,width:250,marginTop:10,marginLeft:10,alignItems:'center',justifyContent:'center'}}
            >
                <Text style={{fontFamily:'Trixi Pro Regular',color:'white',fontSize:24,alignSelf:'center'}}>Confirm</Text>
            </ImageBackground>
          </TouchableOpacity>
          </View>
        </PopupDialog>
        <PopupDialog 
          width={0.9}
          height={0.7}
          ref={(popupDialog)=>{
            this.slideAnimationDialogAlert = popupDialog;
          }}
          dialogAnimation={slideAnimation}
        >
          <View style={styles.dialogContentView} >
            <Image 
              source={imageIcon['logo']}
              style={{height:150,width:150}}
            />
            <Text style={{fontSize:36,color:'#6B2C24',fontFamily:'Trixi Pro Regular',margin:40,textAlign:'center'}}>CẢM ƠN QUÝ KHÁCH ĐÃ LỰA CHỌN SỬ DỤNG DỊCH VỤ CỦA HỆ THỐNG NHÀ HÀNG 1946 ĐÔNG DƯƠNG PHONG VỊ.</Text>
            <Image 
              source={imageIcon['ready']}
              style={{height:220,width:220}}
            />
            <Text style={{fontSize:28,color:'#6B2C24',fontFamily:'Trixi Pro Regular',marginLeft:60,marginRight:60,textAlign:'center'}}>Quý khách vừa lựa chọn xong thực đơn và xin vui lòng chờ trong giây lát trong khi các đầu bếp thể hiện.</Text>
            <Text style={{fontSize:28,color:'#6B2C24',fontFamily:'Trixi Pro Tex',textAlign:'center',margin:30}}>Chúc quý khách có một bữa ăn hài lòng và vui vẻ!</Text>
            <Text style={{fontSize:28,color:'#6B2C24',fontFamily:'Trixi Pro Tex',textAlign:'center',marginTop:20}}>Trân trọng!</Text>
          </View>
        </PopupDialog>
          {/*Pop-up Meal show*/}
        <PopupDialog 
          width={0.7}
          height={0.7}
          ref={(popupDialog)=>{
            this.slideAnimationDialog = popupDialog;
          }}
          dialogAnimation={slideAnimation}
        >
          <View style={styles.dialogContentView} >
              <Image
                source={imageIcon['logo']}
                style={{height:100,width:100}}
              />
              <View style={{borderColor:'#6B2C24',borderWidth:3,height:600,width:500,marginTop:20}}>
              <View style={{borderColor:'#6B2C24',borderWidth:2,height:585,width:485,marginTop:5,marginLeft:5}}>
              
              <View style={{height:50,flexDirection:'row'}}>
                <View style={{flex:3,borderRightWidth:2,borderRightColor:'#6B2C24',borderBottomColor:'#6B2C24',borderBottomWidth:2,alignItems:'center',justifyContent:'center'}}>
                  <Text style={{fontFamily:"Trixi Pro Regular",fontSize:24,color:'#6B2C24'}}>Meal name</Text>
                </View>
                <View style={{flex:1,borderRightColor:'#6B2C24',borderBottomColor:'#6B2C24',borderBottomWidth:2,alignItems:'center',justifyContent:'center'}}>
                  <Text style={{fontFamily:"Trixi Pro Regular",fontSize:24,color:'#6B2C24'}}>Amount</Text>
                </View>
              </View>
              <FlatList 
                data={this.state.meals_MAIN}
                showsVerticalScrollIndicator
                keyExtractor={(item)=>item.id}
                renderItem={({item})=>(
                  <View style={{height:50,flexDirection:'row'}}>
                <View style={{flex:3,borderRightWidth:2,borderRightColor:'#6B2C24',borderBottomColor:'grey',borderBottomWidth:1,alignItems:'center',justifyContent:'center'}}>
                  <Text style={{fontFamily:"Trixi Pro Regular",fontSize:24,color:'#6B2C24'}}>{item.nameEN}</Text>
                </View>
                <View style={{flex:1,borderRightColor:'#6B2C24',borderBottomColor:'grey',borderBottomWidth:1,alignItems:'center',justifyContent:'center'}}>
                  <Text style={{fontFamily:"Trixi Pro Regular",fontSize:24,color:'#6B2C24'}}>{item.amount}</Text>
                </View>
                </View>
                )}
              />
              
              </View>
            </View>
            <TouchableOpacity onPress={()=>this.slideAnimationDialog.dismiss()}>
            <ImageBackground 
              source={imageIcon['title']}
              style={{height:50,width:250,justifyContent:'center',alignItems:'center',marginTop:30}}
            >
              <Text style={{fontFamily:"Trixi Pro Regular",fontSize:24,color:'#6B2C24'}}>Back</Text>
            </ImageBackground>
            </TouchableOpacity>
          </View>
        </PopupDialog>
          <ImageBackground source={imageIcon['background']} style={{flex:1}} >
            {this.renderTopBar()}
          {/*Meal orders*/}
          <Image 
            style={{height:20,width:width}}
            source={imageIcon['borderWidth']}
          />
          <View style={{height:400,flexDirection:'column'}}>
            {/*TopBar Flat List Item */}
            <View style={{height:80,width:width,flexDirection:'row'}}>
              <View style={{width:width*0.5,justifyContent:'center'}}>
                <Text style={{marginLeft:40,fontFamily:"Trixi Pro Regular",fontSize:24,
                marginTop:5,color:'#6B2C24'}}>Meal Name</Text>
              </View>
              <View style={{width:width*0.25,justifyContent:'center',alignItems:'center'}}>
                  <Text style={styles.textStyle}>Price</Text> 
                  <Text style={styles.textStyle}>(coins)</Text>         
              </View>
              <View style={{width:width*0.25,justifyContent:'center',alignItems:'center'}}>
                  <Text style={styles.textStyle}>Amount</Text>
              </View>
            </View>
             {/*</TopBar Flat List Item */}
             {/*Flat List Item*/}
              <FlatList
                data={this.state.meals_MAIN}
                showsVerticalScrollIndicator
                renderItem={({item}) => 
                <View style={{height:80,width:width,flexDirection:'row'}}>
                  <View style={{width:width*0.5,justifyContent:'center'}}>
                      <Text style={{marginLeft:45,fontFamily:"Trixi Pro Regular",fontSize:20,
                      marginTop:5,color:'black'}}>{item.nameEN}</Text>
                  </View>
                  <View style={{width:width*0.25,justifyContent:'center',alignItems:'center'}}>
                    <Text style={{fontFamily:"Trixi Pro Regular",color:'black',fontSize:24}}>{item.price}</Text> 
                             
                  </View>
                  <View style={{width:width*0.25,justifyContent:'center',alignItems:'center'}}>
                    <Text style={{fontFamily:"Trixi Pro Regular",color:'black',fontSize:24}} >{item.amount}</Text>
                  </View>
                </View>
                }
                keyExtractor={(item) => item.id}
              />
                 {/*</Flat List Item*/}
          </View>
          {/*</Meal orders*/}
          {/*Calculation*/}
          <View style={{height:200,justifyContent:'space-between'}}>
              <Image 
                source={imageIcon['borderWidth']}
                style={{height:10,width:width}}
              />
              {/*Sum*/}
              <View style={{height:40,width:width,flexDirection:'row'}}>
                <View style={{width:width*0.5,justifyContent:'center'}}>
                  <Text style={{marginLeft:40,fontFamily:"Trixi Pro Regular",color:'black',fontSize:24}}>Summary</Text>
                </View>
                <View style={{width:width*0.25,justifyContent:'center',alignItems:'center'}}>
                  <Text style={{fontFamily:"Trixi Pro Regular",color:'black',fontSize:24}}>{this.state.sum}</Text> 
                </View>
              </View>
               {/*</Sum*/}
                {/*Last sum*/}
              <View style={{height:40,width:width,flexDirection:'row'}}>
                <View style={{width:width*0.5,justifyContent:'center'}}>
                  <Text style={{marginLeft:40,fontFamily:"Trixi Pro Regular",color:'black',fontSize:24}}>Pay</Text>
                </View>
                <View style={{width:width*0.25,justifyContent:'center',alignItems:'center'}}>
                  <Text style={{fontFamily:"Trixi Pro Regular",color:'black',fontSize:24}}>{this.state.sum}</Text> 
                </View>
              </View>
               {/*</ Last sum*/}
               <Image 
                source={imageIcon['borderWidth']}
                style={{height:10,width:width}}
              />
          </View>
            {/*</Calculation*/}
          {/*Bottom bar*/}
          <View style={{height:210,alignItems:'center'}}>
          {/*Password*/}
              <Text style={{fontFamily:'Trixi Pro Regular',color:'#6B2C24',marginTop:30,fontSize:24,alignSelf:'center'}}>Enjoy the meal !</Text>
          <TouchableOpacity onPress={()=>this.clear()}>
            <ImageBackground
                source={imageIcon['button']}
                style={{height:77,width:250,marginTop:10,marginLeft:10,alignItems:'center',justifyContent:'center'}}
            >
                <Text style={{fontFamily:'Trixi Pro Regular',color:'white',fontSize:24,alignSelf:'center'}}>Confirm</Text>
            </ImageBackground>
          </TouchableOpacity>
          </View>
          
          <View style={{height:90}}>
              <Image 
                source={imageIcon['borderWidth']}
                style={{height:20,width:width}}
              />
              <View style={{flex:1,flexDirection:'row',alignItems:'center',paddingTop:40}}>
              {/*Button Back*/}
                <View style={{flex:1,alignItems: 'center',}}>
                <TouchableOpacity onPress={() => this.showMealLog()}>
              <ImageBackground
                source={imageIcon['button']}
                style={{height:45,width:145,flexDirection:'row'}}
              >
                <Text style={{ fontFamily:"Trixi Pro Regular",
                  marginLeft:9,
                  fontSize:22,
                  marginTop:9,
                  color:'white',}}>Check Bill</Text>
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
           {/*</Bottom bar*/}
          </ImageBackground>
          </View>
          )
  }
}else{
    return(
      <View style={{flex:1}}>
      {this.renderLoading()}
      </View>
    )
  }
  }
}

export default Bill
const styles = StyleSheet.create({
  textStyle:{
    fontFamily:"Trixi Pro Regular",
    textAlign:'center',
    fontSize:24,
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
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dialogContentView: {
    flex: 1,
    alignItems: 'center',
    marginTop:30,
  },
  navigationBar: {
    borderBottomColor: '#b5b5b5',
    borderBottomWidth: 0.5,
    backgroundColor: '#ffffff',
  },
  navigationTitle: {
    padding: 10,
  },
  navigationButton: {
    padding: 10,
  },
  navigationLeftButton: {
    paddingLeft: 20,
    paddingRight: 40,
  },
  navigator: {
    flex: 1,
    // backgroundColor: '#000000',
  },
})
