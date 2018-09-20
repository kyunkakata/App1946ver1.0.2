import React, { Component } from 'react'
import { Text, View,ImageBackground,Image,Dimensions,TouchableOpacity,Slider,ScrollView,Vibration} from 'react-native'
import Video from 'react-native-video'
import {imageIcon} from '../realm/image'
var SoundPlayer = require('react-native-sound');
var song = null;
const {width,height} =Dimensions.get('window')
export default class AboutUs extends Component {
    state = {
        volume:1,
        resizeMode:'stretch',
        paused:false,
        value:0,
        mute:false,
        fullscreen:false,
        duration:0.0,
        currTime:0.0,
    }
    // Adding pause state on-click in main screen
  onPausePress(){
    this.setState({pause:!this.state.pause});
  }
  onMutePress(){
    this.setState({mute:!this.state.mute})
  }
  onFullScreenPress(){ 
    alert('Not currently support for this version.') 
  }
  onLoad = (data)=>{
    this.setState({duration:parseInt(data.duration)})
  }
  onProgress = (data) =>{
    this.setState({currTime:parseInt(data.currentTime)})
    this.setState({value:parseFloat(this.state.currTime/this.state.duration)})
  }
  onEnd = ()=>{
    this.setState({value:0});
    this.setState({pause:true});
    this.setState({currTime:0});
  }
  slider(pos){
    this.setState({value:pos*this.state.duration});
    this.setState({currTime:pos*this.state.duration});
    this.player.seek(pos*this.state.duration);
  }
    playSound(){
        song = new SoundPlayer('bell_sound.mp3', SoundPlayer.MAIN_BUNDLE, (error) => {
          if(error)
          {}
          else {
            Vibration.vibrate(200);
            song.play((success) => {
              if(!success)
            {}
            song.setVolume(1);
            });
          }
        });
        song.release();
      }
    _gotoBack(){
        this.playSound();
        this.props.navigation.goBack();
    }
    gotoSetting(){
        this.props.navigation.navigate('Setting')
    }
    renderTopBar(){
        return(
        <View style={{height:175,width:width,flexDirection:'row'}}>
            <View style={{width:100,height:175,alignItems:'center'}}>
                
            </View>
            <View style={{flex:1}}>
            <Image
            source={imageIcon['logo1946gif']} 
            style={{height:160,width:200,marginTop:20,alignSelf:'center'}}
            />
            </View>
            <View style={{width:100,height:175}}></View>
            </View>
        )
    }
    renderBottomBar(){
        return(
        <View style={{height:40,justifyContent:'center',flexDirection:'row',alignItems: 'center',marginTop:20,marginBottom:20}}>
    {/*Button Back*/}
        <View style={{flex:1,alignItems: 'center',}}>
        
        </View>
    {/*</Button Back*/}
    {/*Button About*/}
        <View style={{flex:1,alignItems: 'center',}}>
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
        )
    }
    render() {
    return (
        <View style={{flex:1}}>
            <ImageBackground style={{flex:1,alignItems:'center'}}
                source={imageIcon['background']}
            >    
            {this.renderTopBar()}
            <Image 
                source={imageIcon['borderImageUp']}
                style={{width:width-100,height:(width-100)/16}}
            />
            <TouchableOpacity onPress={()=>this.onPausePress()}>
            <Video source={require('../banner.mp4')}
                ref={(ref) => {
                    this.player = ref
                }}
                paused={this.state.pause}
                muted={this.state.mute}
                onLoad={this.onLoad}
                onProgress={this.onProgress}
                onEnd={this.onEnd}
                style={{height:(width-150)/1.8,width:width-150}}
            />
            </TouchableOpacity>
            <View style={{width:width-156,height:40,backgroundColor:'black',flexDirection:'row'}}>
          <TouchableOpacity onPress={()=>this.onPausePress()}>
            <Image 
            //Add pause button on control tabbar
              source={this.state.pause ? require('../media/Play.png') : require('../media/Pause.png')}
              style={{marginLeft:5,height:25,width:25,marginTop:8,alignSelf:'flex-start'}}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={()=>this.onMutePress()}>
            <Image
              // Add muted button on control tabbar
              source={this.state.mute ? require('../media/Mute.png') : require('../media/HighVolume.png')}
              style={{marginLeft:5,height:25,width:25,marginTop:8,alignSelf:'flex-start'}}
            />
          </TouchableOpacity>
          <Text style={{color:'white',alignSelf:'center',width:70,marginLeft:5}}>{parseInt(this.state.currTime/60)}:{parseInt(this.state.currTime%60)}/{parseInt(this.state.duration/60)}:{this.state.duration%60}</Text>
          <Slider
          value={this.state.value}
          style={{height:30,width:465,alignSelf:'center'}}
          minimumValue={0.0}
          maximumValue={1.0}
          onValueChange={value=>this.slider(value)}
          minimumTrackTintColor={'#9c27b0'}
          maximumTrackTintColor={'white'}
          thumbTintColor={'#9575cd'}
        />
            <TouchableOpacity onPress={()=>this.onFullScreenPress()}>
                <Image 
                    source={require('../media/FullScreen.png')}
                    style={{marginLeft:5,height:25,width:25,marginTop:8}}
                />
            </TouchableOpacity>  
        </View>
            <Image 
                source={imageIcon['borderImageDown']}
                style={{width:width-100,height:(width-100)/15,marginBottom:10}}
            />
            {/*Video*/}
            <ScrollView showsVerticalScrollIndicator={false}>
            <Text style={{fontFamily:'Trixi Pro Regular',fontSize:36,alignSelf:'center',color:'#6B2C24'}}>TẠI SAO LÀ 1946 ?</Text>
            <Text style={{fontFamily:'Trixi Pro Regular',fontSize:25,marginTop:20,marginBottom:20,lineHeight:24,color:'#6B2C24',marginLeft:70,marginRight:70}}>  Đọc cái tên quán vừa lạ lẫm, vừa ngồ ngộ khiến nhiều người không khỏi tò mò. Người thì cho rằng có lẽ 1946 là tuổi của chủ quán. Cũng có người đoán già đoán non là quán đã có lịch sử từ năm 1946 ?</Text>
            <Text style={{fontFamily:'Trixi Pro Regular',fontSize:25,marginTop:20,marginBottom:20,lineHeight:24,color:'#6B2C24',marginLeft:70,marginRight:70}}>  Cái tên 1946 ra đời do ngẫu hứng nhưng lại phản ánh đầy đủ ý tưởng và trách nhiệm của chủ quán không chỉ đối với bề dày lịch sử, mà còn là thái độ trân trọng đối với nét văn hóa ẩm thực vốn gắn liền với đất Kẻ Chợ, Kinh Kỳ, Thăng Long – Hà Nội ngàn năm văn hiến.</Text>
            <Text style={{fontFamily:'Trixi Pro Regular',fontSize:25,marginTop:20,marginBottom:20,lineHeight:24,color:'#6B2C24',marginLeft:70,marginRight:70}}>  1946, vì thế, vừa quen vừa lạ với mọi người. Quen vì bạn sẽ tìm thấy đâu đó trong không gian giản dị và ấm cúng của 1946 những hương vị gần gũi mà bà và mẹ vẫn thường nấu cho cả nhà mỗi khi đoàn tụ. Lạ vì mỗi món ăn dù tên gọi có giống như ở nhà hàng khác nhưng hương vị của 1946 lại mộc mạc, độc đáo khiến bạn nếu đã thử một lần sẽ còn nhớ mãi.</Text>
            <Text style={{fontFamily:'Trixi Pro Regular',fontSize:25,marginTop:20,marginBottom:20,lineHeight:24,color:'#6B2C24',marginLeft:70,marginRight:70}}>  Dưới góc độ văn hóa ẩm thực, bạn hãy tự khám phá và cảm nhận 1946 theo cách rêng của mình.</Text>
            <Text style={{fontFamily:'Vongdohl',fontSize:54,alignSelf:'center',color:'#6B2C24'}}>Lôøi töï baïch</Text>
            <Text style={{fontFamily:'VNI-JackieO',fontSize:36,marginTop:20,marginBottom:20,color:'#6B2C24',marginLeft:70,marginRight:70}}>  Toâi sinh ra vaø lôùn lean taïi ngaõ töø Trung Hieàn saùt chôï Mô, caùi beán cuoái cuûa taøu ñieän baùnh ray phía nam Haø Noäi trong nhöõng ngaøy thaùng ngheøo khoù.Thôøi thô aáu vaát vaû nhöng trong saùng vaø ñeïp ñeõ ñaõ khieán toâi coù moät tình caûm yeâu quyù nôi naøy moät caùch ñaëc bieät.</Text>
            <Text style={{fontFamily:'VNI-JackieO',fontSize:36,marginTop:20,marginBottom:20,color:'#6B2C24',marginLeft:70,marginRight:70}}>  Bao nhieâu daáu aán, kyû nieäm ñeïp ngaøy moät maát daàn ñi bôûi moät xaõ hoäi ñang phaùt trieån töøng ngaøy. Laâu roài khoâng nghe tieáng taøu ñieän leng keng chôï Mô, chaúng coøn nhöõng tieáng phaùo teùp khoùi thôm thôm ngaøy teát, ruoäng rau hung Laùng chuaån bò xaây chung cö, moät baùt phôû chæ ñöôïc aên khi bò oám nay ñaâu coøn laø öôùc ao ? Meï toâi cuõng chaúng coøn naáu nhöõng moùn caàu kì nhö xöa bôûi baø phaûi aên kieâng vì beänh tieåu ñöôøng…</Text>
            <Text style={{fontFamily:'VNI-JackieO',fontSize:36,marginTop:20,marginBottom:20,color:'#6B2C24',marginLeft:70,marginRight:70}}>  Nhöõng hoaøi nieäm ñoù chaúng phaûi cuûa rieâng mình toâi maø coøn cuûa nhieàu ngöôøi vôùi cuøng chung taâm traïng tieác nuoái.Vôùi mong muoán löu giöõ laïi phaàn naøo nhöõng kyû nieäm thieâng lieâng vaø ñeïp ñeõ, nhaø haøng 1946 ñöôïc hình thaønh vaø hoaït ñoäng.</Text>
            <Text style={{fontFamily:'VNI-JackieO',fontSize:36,marginTop:20,marginBottom:20,color:'#6B2C24',marginLeft:70,marginRight:70}}>  Nhöõng caùi baùt  “chieát yeâu” ñöôïc söu taàm mang töø queâ ra, moùn canh cua aên vôùi caø phaùo, baùnh cuoán Thanh Trì vaø ñaäu Mô taåm haønh thôm muøi khoùi rôm… laø nhöõng ñieàu toâi vaø baïn beø – nhöõng ngöôøi gaén boù vaø yeâu say meâ Haø Noäi ñaõ coá gaéng taïo döïng moät caùch chaân thöïc nhaùt vôùi mong muoán mang laïi cho moïi ngöôøi söï hoaøi nieäm.</Text>
            <Text style={{fontFamily:'VNI-JackieO',fontSize:36,marginTop:20,marginBottom:20,color:'#6B2C24',marginLeft:70,marginRight:70}}>  Taïi nhaø haøng, toâi ñaõ töøng raát xuùc ñoäng khi thaáy may baùc khaùch haøng cao tuoåi ñöùng hoài laâu xem boä söu taäp nhieáp aûnh coå 1880 – 1942 treo treân töôøng ñeå so saùnh  “ngaøy ñoù - baây  giôø” hoaëc toø moø nghe nhoùm baïn treû tranh loaïn soâi noåi veà moùn laåu rieâu cua boãng röôïu. Toâi thöôøng möôøng töôïng mình seõ cho hai caäu con trai cuûa toâi thaáy taän töôøng vaên hoùa Haø Noäi : theá naøo laø baùt chieát yeâu, quaû saáu chua, haùt ca truø… ñieàu maø neáu khoâng theá thì chuùng chæ coù theå tham khaûo ñöôïc treân Internet chöù seõ khoâng coøn coù thaät nöõa bôûi baây giôø nhöõng ñieàu thieâng lieâng ñoù ñaõ bò mai moät nhieàu roài.</Text>
            <Text style={{fontFamily:'VNI-JackieO',fontSize:36,marginTop:20,marginBottom:20,color:'#6B2C24',marginLeft:70,marginRight:70}}>  Baïn vaø toâi, chuùng ta haõy cuøng nhau gìn giöõ toái ña nhöõng giaù trò vaên hoùa voâ giaù cuûa Haø Noäi.</Text>
            <Text style={{fontFamily:'VNI-JackieO',fontSize:36,marginTop:20,marginBottom:20,color:'#6B2C24',marginLeft:70,marginRight:70,alignSelf:'flex-end'}}>  Caûm ôn baïn ñaõ uûng hoä !</Text>
            </ScrollView>
            {this.renderBottomBar()}
            </ImageBackground>
        </View>
    )
}
}