import React, { Component } from 'react'
import { Text, View,ImageBackground,TouchableOpacity,Image,Dimensions,FlatList,StyleSheet,TextInput} from 'react-native'
import {BoxShadow} from 'react-native-shadow'
import FastImage from 'react-native-fast-image'
import PopupDialog,{SlideAnimation,DialogTitle,DialogButton} from 'react-native-popup-dialog'
import {image,imageIcon} from '../realm/image'
import {databaseOptions,MEAL_SCHEMA,fixDatabase,addNewDatabase,deleteDatabase} from '../realm/allSchema'
import Realm from 'realm'
const {width,height} = Dimensions.get('screen')
const slideAnimation = new SlideAnimation({slideFrom:'top'});
const newDatbase={
    name:'Thêm món ăn',
    nameEN:'Add new meal',
    image:'base',
    id:22,
    type:'BASE',
}
export class Setting2 extends Component {
    constructor(props){
        super(props);
        this.state={
            itemMenu:'TẤM QUÀ 1930',
            meals_MAIN:[],
            // Meal properties
            meals_name:"",
            meals_nameEN:"",
            meals_price:0,
            meals_desc:'',
            meals_descEN:'',
            meals_image:'base',
            meals_id:0,
        }
    }
    gotoBack(){
        this.props.navigation.goBack();
    }
    aboutVersion(){
        alert('Version: 1.0.1')
    }
    componentWillMount(){
        //Set title,database:
        switch(this.props.navigation.getParam('value')){
            case 1:
                this.setState({itemMenu:'TẤM QUÀ 1930'})
                Realm.open(databaseOptions).then(realm=>{
                   let data =realm.objects(MEAL_SCHEMA).filtered('type =="TAMQUA"')
                    this.setState({meals_MAIN:data})
                })
                break;
            case 2:
                this.setState({itemMenu:'PHỐ CHỢ 1932'})
                Realm.open(databaseOptions).then(realm=>{
                    let data =realm.objects(MEAL_SCHEMA).filtered('type =="PHOCHO"')
                     this.setState({meals_MAIN:data})
                 })
                break;
            case 3:
                this.setState({itemMenu:'RAU 1935'})
                Realm.open(databaseOptions).then(realm=>{
                    let data =realm.objects(MEAL_SCHEMA).filtered('type =="RAU"')
                     this.setState({meals_MAIN:data})
                 })
                break;
            case 4:
                this.setState({itemMenu:'DUA CAY 1940'})
                Realm.open(databaseOptions).then(realm=>{
                    let data =realm.objects(MEAL_SCHEMA).filtered('type =="DUACAY"')
                     this.setState({meals_MAIN:data})
                 })
                break;
            case 5:
                this.setState({itemMenu:'ĐÔNG DƯƠNG 1942'})
                Realm.open(databaseOptions).then(realm=>{
                    let data =realm.objects(MEAL_SCHEMA).filtered('type =="DONGDUONG"')
                     this.setState({meals_MAIN:data})
                 })
            break;
            case 6:
                this.setState({itemMenu:'HỘI LÀNG 1944'})
                Realm.open(databaseOptions).then(realm=>{
                    let data =realm.objects(MEAL_SCHEMA).filtered('type =="HOILANG"')
                     this.setState({meals_MAIN:data})
                 })
            break;
            case 7:
                this.setState({itemMenu:'TOÀN QUỐC                  KHÁNG CHIẾN 1946'})
                Realm.open(databaseOptions).then(realm=>{
                    let data =realm.objects(MEAL_SCHEMA).filtered('type =="TQKC"')
                     this.setState({meals_MAIN:data})
                 })
            break;
            case 8:
            this.setState({itemMenu:'CƠM NHÀ 1950'})
            Realm.open(databaseOptions).then(realm=>{
                let data =realm.objects(MEAL_SCHEMA).filtered('type =="COMNHA"')
                 this.setState({meals_MAIN:data})
             })
            break;
            case 9:
            this.setState({itemMenu:'CANH 1954'})
            Realm.open(databaseOptions).then(realm=>{
                let data =realm.objects(MEAL_SCHEMA).filtered('type =="CANH"')
                 this.setState({meals_MAIN:data})
             })
            break;
            case 10:
            this.setState({itemMenu:'GIẢI PHÓNG THỦ ĐÔ'})
            Realm.open(databaseOptions).then(realm=>{
                let data =realm.objects(MEAL_SCHEMA).filtered('type =="GPTD"')
                 this.setState({meals_MAIN:data})
             })
            break;
            case 11:
            this.setState({itemMenu:'RƯỢU QUÊ'})
            
            break;
            case 12:
            this.setState({itemMenu:'QUÀ TẶNG'})
            Realm.open(databaseOptions).then(realm=>{
                let data =realm.objects(MEAL_SCHEMA).filtered('type =="QUATANG"')
                 this.setState({meals_MAIN:data})
             })
            break;
        }
      

    }
    onPressItem(id){
        Realm.open(databaseOptions).then(realm=>{
            let data=realm.objectForPrimaryKey(MEAL_SCHEMA,id);
            this.setState({meals_name:data.name});
            this.setState({meals_nameEN:data.nameEN});
            this.setState({meals_price:data.price});
            this.setState({meals_desc:data.desc});
            this.setState({meals_descEN:data.descEN});
            this.setState({meals_image:data.image});
            this.setState({meals_id:id})

        })
        
        this.slideAnimationDialogAlert.show();
    }
    addNew(){
        this.setState({meals_name:''});
        this.setState({meals_nameEN:''});
        this.setState({meals_price:0});
        this.setState({meals_desc:''});
        this.setState({meals_descEN:''});
        this.setState({meals_image:'base'});
        this.addNewDialogAlert.show();   
    }
    popupDialogControl(bool){
        if(bool==1){
        this.slideAnimationDialogAlert.dismiss()
        }else if(bool==2){
        fixDatabase(this.state.meals_id,this.state.meals_name,this.state.nameEN,this.state.meals_price,this.state.meals_desc,this.state.meals_descEN)
        this.componentWillMount();
        this.slideAnimationDialogAlert.dismiss();
        }else{
            deleteDatabase(this.state.meals_id);
            this.componentWillMount();
            this.slideAnimationDialogAlert.dismiss();
        }
    }
    
    popupDialogANConstrol(bool){
        if(!bool){
            this.addNewDialogAlert.dismiss()
        }else{
            switch(this.props.navigation.getParam('value')){
                case 1:
                var data= this.state.meals_MAIN;
                var idSet = 100+data.length+1;
                addNewDatabase('TAMQUA',idSet,this.state.meals_name,this.state.meals_nameEN,this.state.meals_price,this.state.meals_desc,this.state.meals_descEN)
                
                break;
                case 2:
                var data= this.state.meals_MAIN;
                var idSet = 200+data.length+1;
                addNewDatabase('PHOCHO',idSet,this.state.meals_name,this.state.meals_nameEN,this.state.meals_price,this.state.meals_desc,this.state.meals_descEN)
                break;
                case 3:
                var data= this.state.meals_MAIN;
                var idSet = 300+data.length+1;
                addNewDatabase('DUACAY',idSet,this.state.meals_name,this.state.meals_nameEN,this.state.meals_price,this.state.meals_desc,this.state.meals_descEN)
                
                break;
                case 4:
                var data= this.state.meals_MAIN;
                var idSet = 400+data.length+1;
                addNewDatabase('RAU',idSet,this.state.meals_name,this.state.meals_nameEN,this.state.meals_price,this.state.meals_desc,this.state.meals_descEN)
                break;
                case 5:
                var data= this.state.meals_MAIN;
                var idSet = 500+data.length+1;
                addNewDatabase('DONGDUONG',idSet,this.state.meals_name,this.state.meals_nameEN,this.state.meals_price,this.state.meals_desc,this.state.meals_descEN)
                break;
                case 6:
                var data= this.state.meals_MAIN;
                var idSet = 600+data.length+1;
                addNewDatabase('HOILANG',idSet,this.state.meals_name,this.state.meals_nameEN,this.state.meals_price,this.state.meals_desc,this.state.meals_descEN)
                break;
                case 7:
                var data= this.state.meals_MAIN;
                var idSet = 700+data.length+1;
                addNewDatabase('TQKC',idSet,this.state.meals_name,this.state.meals_nameEN,this.state.meals_price,this.state.meals_desc,this.state.meals_descEN)
                break;
                case 8:
                var data= this.state.meals_MAIN;
                var idSet = 800+data.length+1;
                addNewDatabase('COMNHA',idSet,this.state.meals_name,this.state.meals_nameEN,this.state.meals_price,this.state.meals_desc,this.state.meals_descEN)
                break;
                case 9:
                var data= this.state.meals_MAIN;
                var idSet = 900+data.length+1;
                addNewDatabase('CANH',idSet,this.state.meals_name,this.state.meals_nameEN,this.state.meals_price,this.state.meals_desc,this.state.meals_descEN)
                break;
                case 10:
                var data= this.state.meals_MAIN;
                var idSet = 1000+data.length+1;
                addNewDatabase('GPTD',idSet,this.state.meals_name,this.state.meals_nameEN,this.state.meals_price,this.state.meals_desc,this.state.meals_descEN)
                break;
                case 11:
                var data= this.state.meals_MAIN;
                var idSet = 1100+data.length+1;
                addNewDatabase('RUOUQUE',idSet,this.state.meals_name,this.state.meals_nameEN,this.state.meals_price,this.state.meals_desc,this.state.meals_descEN)
                break;
                case 12:
                var data= this.state.meals_MAIN;
                var idSet = 1200+data.length+1;
                addNewDatabase('QUATANG',idSet,this.state.meals_name,this.state.meals_nameEN,this.state.meals_price,this.state.meals_desc,this.state.meals_descEN)
                break;
            }
            this.componentWillMount();
            this.addNewDialogAlert.dismiss()
            
        }
    }
    renderTopBar(){
        return(
            <View style={{height:150,width:width,alignItems:'center',justifyContent:'center'}}>
                <ImageBackground
                    source={imageIcon['title']}
                    style={{height:90,width:450,justifyContent:'center'}}
                >
                    <Text style={{fontFamily:'Trixi Pro Regular',textAlign:'center',fontSize:30,color:'white'}}>{this.state.itemMenu}</Text>
                </ImageBackground>
            </View>
        )
    }
  render() {
    return (
     <View style={{flex:1}}>
     {/*Show popup fix data*/}
     <PopupDialog 
          width={0.9}
          height={0.7}
          ref={(popupDialog)=>{
            this.slideAnimationDialogAlert = popupDialog;
          }}
          dialogAnimation={slideAnimation}
        >
          <View style={{padding:10}} >
          
            <FastImage
                source={imageIcon['logo1946gif']} 
                style={{height:120,width:150,alignSelf:'center',marginTop:10}}
            />
            <ImageBackground
                    source={imageIcon['title']}
                    style={{height:70,width:350,justifyContent:'center',alignSelf:'center',marginBottom:10}}
                >
                    <Text style={{fontFamily:'Trixi Pro Regular',textAlign:'center',fontSize:30,color:'white'}}>Chỉnh sửa món ăn</Text>
            </ImageBackground>
            <View style={{backgroundColor:'skyblue',flexDirection:'row'}}>
            <View style={{flexDirection:'column',padding:10}}>
            <Text style={{color:'black',fontWeight:'bold',fontSize:20,marginLeft:5,marginTop:20}}>Tên món ăn (Tiếng Việt) :</Text>
            <TextInput 
                value={this.state.meals_name}
                style={{width:400}}
                onChangeText={(text)=>this.setState({meals_name:text})}
            />
            <Text style={{color:'black',fontWeight:'bold',fontSize:20,marginLeft:5,marginTop:20}}>Tên món ăn (Tiếng Anh) :</Text>
            <TextInput 
                value={this.state.meals_nameEN}
                style={{width:400}}
                onChangeText={(text)=>this.setState({meals_nameEN:text})}
            />
            <Text style={{color:'black',fontWeight:'bold',fontSize:20,marginLeft:5,marginTop:20}}>Giá :</Text>
            <TextInput 
                value={''+this.state.meals_price}
                style={{width:400}}
                keyboardType='number-pad'
                onChangeText={(text)=>this.setState({meals_price:text})}
            />
            <Text style={{color:'black',fontWeight:'bold',fontSize:20,marginLeft:5,marginTop:20}}>Mô tả (Tiếng Việt) :</Text>
            <TextInput 
                value={this.state.meals_desc}
                multiline={true}
                style={{width:400,height:80}}
                onChangeText={(text)=>this.setState({meals_desc:text})}
            />
            <Text style={{color:'black',fontWeight:'bold',fontSize:20,marginLeft:5,marginTop:20}}>Mô tả (Tiếng Anh) :</Text>
            <TextInput 
                value={this.state.meals_descEN}
                multiline={true}
                style={{width:400}}
                onChangeText={(text)=>this.setState({meals_descEN:text})}
                style={{width:400,height:80}}
            />
            </View>
            <View style={{backgroundColor:'skyblue',flex:1,alignItems:'center',justifyContent:'center'}}>
                    <Image 
                        source={image[this.state.meals_image]}
                        style={{height:250,width:250}}
                    />
                     <Text  style={{fontFamily:"Trixi Pro Regular",textAlign:'center',fontSize:30,marginTop:10,marginLeft:30,marginRight:30,color:'#6B2C24',}}>{this.state.meals_name}</Text>
            </View>
            </View>
            <View style={{width:700,height:70,backgroundColor:'white',borderTopWidth:1,borderColor:'grey',flexDirection:'row'}}>
                <TouchableOpacity
                    onPress={()=>this.popupDialogControl(1)}
                    style={{flex:1,borderRightWidth:1,borderColor:'grey',borderLeftWidth:1,borderBottomWidth:1,justifyContent:'center',alignItems:'center'}}
                >
                <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                    <Text style={{color:'black',fontSize:20}}>Hủy</Text>
                </View>
                </TouchableOpacity>
                
                <TouchableOpacity
                    onPress={()=>this.popupDialogControl(2)}
                    style={{flex:1,justifyContent:'center',alignItems:'center',borderRightWidth:1,borderBottomWidth:1,borderLeftWidth:1,borderColor:'grey'}}
                >
                <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                    <Text style={{color:'black',fontSize:20}}>Cập nhật</Text>
                </View>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={()=>this.popupDialogControl(3)}
                    style={{flex:1,justifyContent:'center',alignItems:'center',borderRightWidth:1,borderBottomWidth:1,borderLeftWidth:1,borderColor:'grey'}}
                >
                <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                    <Text style={{color:'black',fontSize:20}}>Xóa</Text>
                </View>
                </TouchableOpacity>
            </View>
          </View>
        </PopupDialog>
     {/*Show popup add new data*/}  
     <PopupDialog 
          width={0.9}
          height={0.7}
          ref={(popupDialog)=>{
            this.addNewDialogAlert = popupDialog;
          }}
          dialogAnimation={slideAnimation}
        >
          <View style={{padding:10}} >
          
            <FastImage
                source={imageIcon['logo1946gif']} 
                style={{height:120,width:150,alignSelf:'center',marginTop:10}}
            />
            <ImageBackground
                    source={imageIcon['title']}
                    style={{height:70,width:350,justifyContent:'center',alignSelf:'center',marginBottom:10}}
                >
                    <Text style={{fontFamily:'Trixi Pro Regular',textAlign:'center',fontSize:30,color:'white'}}>Thêm món ăn</Text>
            </ImageBackground>
            <View style={{backgroundColor:'skyblue',flexDirection:'row'}}>
            <View style={{flexDirection:'column',padding:10}}>
            <Text style={{color:'black',fontWeight:'bold',fontSize:20,marginLeft:5,marginTop:20}}>Tên món ăn (Tiếng Việt) :</Text>
            <TextInput 
                value={this.state.meals_name}
                style={{width:400}}
                onChangeText={(text)=>this.setState({meals_name:text})}
            />
            <Text style={{color:'black',fontWeight:'bold',fontSize:20,marginLeft:5,marginTop:20}}>Tên món ăn (Tiếng Anh) :</Text>
            <TextInput 
                value={this.state.meals_nameEN}
                style={{width:400}}
                onChangeText={(text)=>this.setState({meals_nameEN:text})}
            />
            <Text style={{color:'black',fontWeight:'bold',fontSize:20,marginLeft:5,marginTop:20}}>Giá :</Text>
            <TextInput 
                value={''+this.state.meals_price}
                style={{width:400}}
                keyboardType='number-pad'
                onChangeText={(text)=>this.setState({meals_price:text})}
            />
            <Text style={{color:'black',fontWeight:'bold',fontSize:20,marginLeft:5,marginTop:20}}>Mô tả (Tiếng Việt) :</Text>
            <TextInput 
                value={this.state.meals_desc}
                multiline={true}
                style={{width:400,height:80}}
                onChangeText={(text)=>this.setState({meals_desc:text})}
            />
            <Text style={{color:'black',fontWeight:'bold',fontSize:20,marginLeft:5,marginTop:20}}>Mô tả (Tiếng Anh) :</Text>
            <TextInput 
                value={this.state.meals_descEN}
                multiline={true}
                style={{width:400}}
                onChangeText={(text)=>this.setState({meals_descEN:text})}
                style={{width:400,height:80}}
            />
            </View>
            <View style={{backgroundColor:'skyblue',flex:1,alignItems:'center',justifyContent:'center'}}>
                    <Image 
                        source={image[this.state.meals_image]}
                        style={{height:250,width:250}}
                    />
                     <Text  style={{fontFamily:"Trixi Pro Regular",textAlign:'center',fontSize:30,marginTop:10,marginLeft:30,marginRight:30,color:'#6B2C24',}}>{this.state.meals_name}</Text>
            </View>
            </View>
            <View style={{width:700,height:70,backgroundColor:'white',borderTopWidth:1,borderColor:'grey',flexDirection:'row'}}>
                <TouchableOpacity
                    onPress={()=>this.popupDialogANConstrol(false)}
                    style={{flex:1,borderRightWidth:1,borderColor:'grey',borderLeftWidth:1,borderBottomWidth:1,justifyContent:'center',alignItems:'center'}}
                >
                <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                    <Text style={{color:'black',fontSize:20}}>Hủy</Text>
                </View>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={()=>this.popupDialogANConstrol(true)}
                    style={{flex:1,justifyContent:'center',alignItems:'center',borderRightWidth:1,borderBottomWidth:1,borderLeftWidth:1,borderColor:'grey'}}
                >
                <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                    <Text style={{color:'black',fontSize:20}}>Thêm món ăn</Text>
                </View>
                </TouchableOpacity>
            </View>
          </View>
        </PopupDialog>
        <ImageBackground source={imageIcon['background']} style={{flex:1}} >
            <BoxShadow setting={{width:width,height:70,color:'#000',radius:10,opacity:0.5,x:0,y:4,style:{marginVertical:5}}}>
                <View style={{height:70,width:width,backgroundColor:'#424242',flexDirection:'row',alignItems:'center',elevation:10}}>
                    <TouchableOpacity onPress={()=>this.gotoBack()}>
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
                    <TouchableOpacity onPress={()=>this.aboutVersion()}>
                    <View style={{height:70,width:90,marginLeft:2,borderWidth:2,borderColor:'#f5f5f5',alignSelf:'flex-end',alignItems:'center',justifyContent:'center'}}>
                    <Image 
                            source={imageIcon['menu']}
                            style={{height:45,width:45}}
                        />
                    </View>
                    </TouchableOpacity>
                </View>
            </BoxShadow>
            {this.renderTopBar()}
            <FastImage 
                style={{height:20,width:width}}
                source={imageIcon['borderWidth']}
            />
            <View style={{height:850,width:width,paddingTop:10}}>
                
                <FlatList 
                    data={this.state.meals_MAIN}
                    numColumns={3}
                    renderItem={({item})=>(
                        <MenuItem 
                            id={item.id}
                            name={item.name}
                            image={item.image}
                            onPressItem={()=>this.onPressItem(item.id)}
                            onLongPress={()=>this.onLongPressItem(item.id)}
                        />
                    )}
                    keyExtractor={(item)=>item.id}
                />
            </View>
            
            <FastImage 
                style={{height:20,width:width}}
                source={imageIcon['borderWidth']}
            />
            <TouchableOpacity onPress={()=>this.addNew()}>
            <ImageBackground
                    source={imageIcon['title']}
                    style={{height:70,width:350,justifyContent:'center',alignSelf:'center',marginTop:10}}
                >
                    <Text style={{fontFamily:'Trixi Pro Regular',textAlign:'center',fontSize:30,color:'white'}}>Thêm món ăn mới</Text>
            </ImageBackground>
            </TouchableOpacity>
        </ImageBackground>
     </View>
    )
  }
}
class MenuItem extends React.Component{
    constructor(props){
        super(props);
        this.state={
            id:0,
        }
    }
    componentWillMount(){
        this.setState({id:this.props.id});
    }
    _onPressItem(){
        this.props.onPressItem();
    }
    _onLongPressItem(){
        this.props.onLongPress();
    }
    renderTextItem(){
            return(
                <Text  style={{fontFamily:"Trixi Pro Regular",textAlign:'center',fontSize:18,marginTop:5,lineHeight:20,color:'#6B2C24',}}>{this.props.name}</Text>
            )
    }
    render(){
        return(
            <View style={styles.cardStyle}>
                <TouchableOpacity onPress={()=>this._onPressItem()}
                    onLongPress={()=>this._onLongPressItem()}
                >
                    <Image 
                        source={image[this.props.image]}
                        style={{height:180,width:180}}
                    />
                    {this.renderTextItem()}
                </TouchableOpacity>
            </View>
        )
    }
}
export default Setting2
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