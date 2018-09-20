import React, { Component } from 'react'
import { Text, View,StyleSheet,Image,ImageBackground,AsyncStorage,ScrollView,Dimensions,TextInput,FlatList,TouchableOpacity,Alert} from 'react-native'
import PopupDialog,{SlideAnimation,DialogTitle,DialogButton} from 'react-native-popup-dialog'
const {width,height} = Dimensions.get('window')
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
 async componentWillMount(){

    const lang = await AsyncStorage.getItem("LANGUAGE");
    this.setState({lang});
    Realm.open({schema:[MealSchema,ModeSchema]})
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
    if(this.state.pass2=="nhahang1946"||this.state.pass2=="Nhahang1946"){
      this.slideAnimationDialogConfirm.dismiss();
      Realm.open({schema:[MealSchema,ModeSchema]})
        .then(realm=>{
           realm.write(()=>{
            let data= realm.objects('Meal');
            realm.delete(data);
            let mode= realm.objects('ModeApp');
            realm.delete(mode);
           })
           realm.write(()=>{
            // TODO : TAM QUA.
            realm.create('Meal',{
                name:'DƯA CẢI ĐÔNG DƯ',
                nameEN:'"DONG DU" PICKLES WITH',
                price:25,
                desc:'Ngồng cải phơi nắng, muối chua lối Đông Dư, trộn cay',
                image:'tamqua1',
                id:101,
                type:'TAMQUA',
            })
            realm.create('Meal',{
                name:'LẠC RANG MUỐI ỚT',
                price:15,
                nameEN:'SALTY ROASTED PEANUTS',
                image:'tamqua2',
                desc:'Lạc đỏ xứ Nghệ, hạt nhỏ và đậm đà rang với muối ớt',
                id:102,
                type:'TAMQUA',
            })
            // TODO : PHOCHO
            realm.create('Meal',{
                name:'KHOAI LANG NGHỆ CHIÊN',
                nameEN:'FRIED SWEET POTATO',
                descEN:'Fried sweet potato with chilli sauce',
                price:50,
                desc:'Khoai lang nghệ chiên ròn chấm với sốt chua ngọt.',
                image:'phocho1',
                id:201,
                type:'PHOCHO',
            })
            realm.create('Meal',{
                name:'ĐẬU PHỤ TẨM HÀNH',
                nameEN:'FRIED TOFU WITH GREEN ONION',
                price:60,
                descEN:'Fried tofu mixed with green onion and fish sauce',
                desc:'Đậu phụ rán ròn, tẩm hành hoa với nước mắm',
                image:'phocho2',
                id:202,
                type:'PHOCHO',
            })
            realm.create('Meal',{
                name:'NGÔ NGỌT CHIÊN BƠ',
                price:50,
                nameEN:'FRIED CORN IN BUTTER',
                desc:'Ngô non chiên ròn với bơ',
                image:'phocho3',
                id:203,
                type:'PHOCHO',
            })
            realm.create('Meal',{
                name:'BÁNH CUỐN THANH TRÌ',
                nameEN:'"THANH TRI" STEAMED ROLLS',
                price:55,
                descEN:'Thanh Tri steamed rolls made of rice flour , tasteful with fish sauce and village meatloaf',
                desc:'Chấm nước mắm chua ngọt ăn với chả nhà quê, hành phi giòn, rau bạc hà và tinh dầu cà cuống.',
                image:'phocho4',
                id:204,
                type:'PHOCHO',
            })
            realm.create('Meal',{
                name:'BÁNH ĐÚC LẠC TƯƠNG BẦN',
                price:40,
                nameEN:'PLAIN RICE FLAN',
                descEN:'Plain rice flan with peanuts and  sweet soya sauce',
                image:'phocho5',
                id:205,
                type:'PHOCHO',
            })
            realm.create('Meal',{
                name:'GỎI CỦ HŨ DỪA TRỘN THỊT VỊT',
                nameEN:'JAR OF COCONUT ROOTS & DUCK',
                price:105,
                desc:'Món ăn đặc trưng vùng nam bộ. Lấy lõi non thân cây dừa bào mỏng trộn nước mắm với thịt vịt bầu và các loại rau thơm, lạc rang, rau húng.',
                image:'phocho6',
                id:206,
                type:'PHOCHO',
            })
            realm.create('Meal',{
                name:'NỘM HOA CHUỐI BẮP BÒ',
                price:95,
                nameEN:'GREEN BANANA FLOWER SALAD WITH BEEF MARINATE',
                desc:'Hoa chuối non bào mỏng trộn cùng rau muống chẻ, bắp bò trần, lạc rang, tỏi ớt và dấm nếp, chua chua  ngòn ngọt.',
                image:'phocho7',
                id:207,
                type:'PHOCHO',
            })
            realm.create('Meal',{
                name:'RAU CÀNG CUA TRỘN BẮP BÒ',
                nameEN:'"CANG CUA" VEGETABLE WITH BEEF',
                price:145,
                desc:'Giống rau lạ ven suối có vị chua mát trộn với bắp bò và nước mắm',
                image:'phocho8',
                id:208,
                type:'PHOCHO',
            })
            realm.create('Meal',{
                name:'GỎI XOÀI TÉP MOI',
                nameEN:'GREEN MANGO SALAD WITH DRIED SHRIMP',
                descEN:'Green mango mixed with dried shrimp, fish',
                price:50,
                desc:'Xoài xanh thái con chì, trộn nước mắm, tép moi với ớt bột, ớt tươi',
                image:'phocho9',
                id:209,
                type:'PHOCHO',
            })
            // TODO DUA CAY.
            realm.create('Meal',{
                name:'ẾCH XÀO MĂNG CAY',
                nameEN:'SAUTEED FROG LEG WITH SOUR BAMBOO ',
                descEN:'Frog leg sauteed with sour bamboo shoots and ',
                price:85,
                desc:'Thịt ếch xào với măng rừng muối cay và quả móc mật.',
                image:'duacay1',
                id:301,
                type:'DUACAY',
            })
            realm.create('Meal',{
                name:'CÁ TRẠCH ĐỒNG',
                nameEN:'FRIED CODFISH',
                descEN:'Field codfish fried with fish sauce and ginger',
                price:75,
                desc:'Cá trạch đồng rán giòn chấm với nước mắm gừng',
                image:'duacay2',
                id:302,
                type:'DUACAY',
            })
            realm.create('Meal',{
                name:'CÁ RÔ RON',
                nameEN:'FRIED ANABAS',
                descEN:'Young fresh water anabas deep fried with fish sauce',
                price:75,
                desc:'Cá rô ron rán giòn chấm với nước mắm gừng.',
                image:'duacay3',
                id:303,
                type:'DUACAY',
            })
            realm.create('Meal',{
                name:'CHIM NGHỆ CHIÊN',
                nameEN:'FRIED “NGHE” BIRD',
                descEN:'Nghe bird fried with hot mint leaves,  chilli',
                price:75,
                desc:'Chim Nghệ chiên với rau răm, ớt sừng và hạt tiêu sọ.',
                image:'duacay4',
                id:304,
                type:'DUACAY',
            })
            realm.create('Meal',{
                name:'GÀ TRE HẤP LÁ CHANH',
                nameEN:'STEAMED “TRE” CHICKEN',
                price:450,
                descEN:'Special mountain’s chicken steamed with lemon leaf',
                desc:'Gà ngon nhất trong các giống gà, thịt chắc, mềm, ngọt được hấp khéo cả con cùng lòng mề vài lá chanh.',
                image:'duacay5',
                id:305,
                type:'DUACAY',
            })
            realm.create('Meal',{
                name:'GÀ ĐÔNG TẢO',
                nameEN:'STEAMED “DONG TAO” JUMBO',
                price:440,
                desc:'Gà đặc sản của vùng Hưng Yên, chân to thịt chắc hấp chín với lá chanh.',
                image:'duacay6',
                id:306,
                type:'DUACAY',
            })
            realm.create('Meal',{
                name:'GÀ BỌC LÁ SEN NƯỚNG',
                price:365,
                nameEN:'STEAMED YOUNG CHICKEN ON',
                desc:'Gà ri Bắc Giang tẩm gia vị thật kỹ, bọc trong lá sen, lá chuối rồi nướng cả buổi trên bếp than. Khi chín thịt gà mềm mọng, ngọt ngọt thơm thơm mùi đồng quê.',
                image:'duacay7',
                id:307,
                type:'DUACAY',
            })
            realm.create('Meal',{
                name:'GÀ CHIÊN MẮM',
                nameEN:'FRIED CHICKEN WITH FISH SAUCE',
                descEN:'Garden chicken deep fried with fish sauce, lemon',
                price:195,
                desc:'Gà chiên chín vàng rồi đảo với nước mắm ngon, lá chanh và tiêu sọ.',
                image:'duacay8',
                id:308,
                type:'DUACAY',
            })
            realm.create('Meal',{
                name:'GÀ RANG MUỐI',
                nameEN:'FRIED CHICKEN WITH SALT',
                descEN:'Garden chicken deep fried with salt, lemon leaf',
                price:195,
                desc:'Gà đồi rang muối với xả và lá chanh.',
                image:'duacay9',
                id:309,
                type:'DUACAY',
            })
            realm.create('Meal',{
                name:'BÁNH TRÁNG THỊT HEO',
                price:115,
                nameEN:'BOILED PORK WITH SPRING ROLL WRAPPER',
                descEN:'Boiled pork and green banana, peppermint,',
                desc:'Thịt ba chỉ heo luộc cuốn bánh tráng kèm với rau và tôm chua miền Trung.',
                image:'duacay10',
                id:310,
                type:'DUACAY',
            })
            realm.create('Meal',{
                name:'DẠ DẦY HEO XÀO DƯA CHUA',
                price:85,
                nameEN:'SAUTEED PORK STOMACH WITH PICKLES',
                desc:'Cổ hũ dạ dầy heo xào với dưa chua.',
                image:'duacay11',
                id:311,
                type:'DUACAY',
            })
            realm.create('Meal',{
                name:'BẮP BÒ MUỐI TỎI - LUỘC MẮM',
                price:110,
                nameEN:'BOILED SHANK OF BEEF WITH FISH SAUCE',
                descEN:'Shank of beef stuffed with pepper corns and',
                desc:'Món muối chua lạ miệng tăng cường sức khỏe, sinh lực.',
                image:'duacay12',
                id:312,
                type:'DUACAY',
            })
            realm.create('Meal',{
                name:'SƯỜN RÁN MUỐI ỚT',
                price:125,
                nameEN:'FRIED PORK RIBS WITH SALT AND CHILLI',
                descEN:'Pork ribs soaked with salt, chilli, and fried with garlic',
                desc:'Dẻ sườn heo tẩm muối ớt, rán áp chảo với tỏi phi thơm',
                image:'duacay13',
                id:313,
                type:'DUACAY',
            })
            realm.create('Meal',{
                name:'CHÂN GIÒ MUỐI',
                nameEN:'SALTY PORK LEG',
                desc:'Thịt chân giò heo rút xương, ủ muối với rơm nếp rồi hun khói.',
                descEN:'Pork leg without bron, marinated in salt and smoked with straw',
                price:95,
                image:'duacay14',
                id:314,
                type:'DUACAY',
            })
            realm.create('Meal',{
                name:'NGAO HẤP LÁ XẢ',
                nameEN:'STEAMED CLAMS WITH LEMONGRASS',
                price:85,
                desc:'Ngao hấp với lá húng và dầu tỏi',
                image:'duacay15',
                id:315,
                type:'DUACAY',
            })
            realm.create('Meal',{
                name:'NGAO NƯỚNG MỠ HÀNH',
                nameEN:'GRILLED CLAMS WITH ONION',
                price:85,
                descEN:'Clams  sprinkled  with  hot  onion,  Vietnamese  hot  mint  and  grilled  on charcoal',
                desc:'Ngao rắc hành khô với lá răm thái nhỏ, tưới mỡ nước rồi nướng trên than hoa',
                image:'duacay16',
                id:316,
                type:'DUACAY',
            })
            realm.create('Meal',{
                name:'MÓNG GIÒ CHIÊN GIÒN',
                price:95,
                nameEN:'CRISPY DEEP FRIED PORK LEG',
                image:'duacay17',
                id:317,
                type:'DUACAY',
            })
            realm.create('Meal',{
                name:'TÉP MOI RANG KHẾ',
                price:75,
                nameEN:'TINY SHRIMP FRIED WITH STAR FRUIT',
                descEN:'Dried tiny  shrimp  from Nghe An pr ovince  fried with  star fruit, chilli andVietnamese hot mint',
                desc:'Tép moi phơi khô rang với khế, ớt, rau dăm',
                image:'duacay18',
                id:318,
                type:'DUACAY',
            })
            realm.create('Meal',{
                name:'DẠ DẦY QUẾ CHIÊN CAY',
                price:85,
                nameEN:'FRIED PORK STOMACH WITH CHILLI',
                descEN:'Pork stomach soaked in spices and  deep fried',
                desc:'Phần quế của dạ dầy heo ướp gia vị và ớt cánh, chiên ròn',
                image:'duacay19',
                id:319,
                type:'DUACAY',
            })
            realm.create('Meal',{
                name:'KHÔ MỰC CHIÊN BƠ TỎI',
                desc:'Khô mực Nha Trang thái sợi, chiên ròn với bơ, tỏi phi thơm.',
                price:145,
                nameEN:'DRIED CUTTLEFISH FRIED IN BUTTER AND GARLIC',
                image:'duacay20',
                descEN:'Dried cuttlefish from Nha Trang fried in  butter and garlic',
                id:320,
                type:'DUACAY',
            })
            realm.create('Meal',{
                name:'BÒ GÁC BẾP CHẨM CHÉO',
                price:85,
                nameEN:'SMOKED BEEF WITH “CHAM CHEO” SAUCE',
                descEN:'Smoked beef made by Black Thai ethnic minority',
                desc:'Món “Nhứa ngua giảng” của người “Tày Đăm” hay còn gọi là người Thái đen trên vùng cao Sơn La',
                image:'duacay21',
                id:321,
                type:'DUACAY',
            })
            realm.create('Meal',{
                name:'BÊ SỮA MỘC CHÂU',
                price:165,
                nameEN:'DAIRY VEAL FROM MOC CHAU',
                desc:'Thịt con bê sữa non vùng cao nguyên Mộc Châu trộn tép tỏi chao nhanh trên mỡ nóng hoặc ướp xả',
                image:'duacay22',
                id:322,
                type:'DUACAY',
            })
            realm.create('Meal',{
                name:'LỢN MƯỜNG HẤP - NƯỚNG - XÀO LĂN',
                price:165,
                nameEN:'MUONG PORK',
                descEN:'Pork raised by Muong ethni c minority, (1) soaked in spices and grilled on charcoal or (2) steamed with lemongrass or (3) sauteed with green onion roots',
                desc:'Thịt lợn Mường ướp giềng mẻ nướng trên than hoa,Hấp với xả hoặc xào với gốc hành',
                image:'duacay23',
                id:323,
                type:'DUACAY',
            })
            realm.create('Meal',{
                name:'CUA ĐỒNG RANG MUỐI',
                price:75,
                nameEN:'FRIED FRIED CRAB WITH SALT',
                descEN:'Field crab soaked in spices and fired with wild betel leaf',
                desc:'Cua đồng bóc mai, lột yếm tẩm gia vị, chiên ròn với lá lốt thái sợi.',
                image:'duacay24',
                id:324,
                type:'DUACAY',
            })
            // TODO : RAU
            realm.create('Meal',{
                name:'SU HÀO XÀO KHÔ MỰC',
                nameEN:'KOHLRABI SAUTEED WITH DRIED CUTTLEFIS',
                price:145,
                desc:'Món đặc sản vùng Đa Tốn – Bát Tràng có mùi vị thơm ngon độc đáo.',
                image:'rau1',
                id:401,
                type:'RAU',
            })
            realm.create('Meal',{
                name:'CỦ QUẢ LUỘC CHẤM KHO QUẸT',
                price:60,
                nameEN:'BOILED MIXED VEGETABLES WITH ‘POOR’ SAUCE',
                descEN:'Boiled chayote, white radish, carrot, kohlrabi with ‘poor’ fish sauce',
                desc:'Quả su su, củ cải trắng, cà rốt, súp lơ xanh, bí đao theo mùa luộc tái chấm với kho quẹt tôm khô theo kiểu người Nam Bộ.',
                image:'rau2',
                id:402,
                type:'RAU',
            })
            realm.create('Meal',{
                name:'HOA THIÊN LÝ XÀO TỎI',
                nameEN:'SAUTEED FRAGRANT CYNANTHE FLOWERS WITH GARLIC',
                price:60,
                image:'rau3',
                id:403,
                type:'RAU',
            })
            realm.create('Meal',{
                name:'NGỌN RAU BÍ XÀO TỎI',
                price:60,
                nameEN:'SAUTEED PUMPKIN BRANCHES WITH GARLIC',
                image:'rau4',
                id:404,
                type:'RAU',
            })
            realm.create('Meal',{
                name:'MÙNG TƠI XÀO TỎI',
                price:50,
                nameEN:'STIR FRIED MALABAR N IGHTSHADE WITH GARLIC',
                image:'rau5',
                id:405,
                type:'RAU',
            })
            realm.create('Meal',{
                name:'NGỌN SU XÀO TỎI',
                price:60,
                nameEN:'SAUTEED CHAYOTE BRANCHES WITH GARLIC',
                image:'rau6',
                id:406,
                type:'RAU',
            })
            realm.create('Meal',{
                name:'RAU MUỐNG XÀO GIÒN',
                price:50,
                nameEN:'SAUTEED WATER MORNING GLORY WITH GARLIC',
                image:'rau7',
                id:407,
                type:'RAU',
            })
            realm.create('Meal',{
                name:'CẢI MÈO XÀO NẤM',
                nameEN:'CAI MEO',
                desc:'Loại rau cải đặc biệt được trồng trên vùng núi cao Sơn La xào với nấm hương và gừng.',
                price:60,
                image:'rau8',
                id:408,
                type:'RAU',
            })
            realm.create('Meal',{
                name:'MĂNG TĂM XÀO MỰC',
                nameEN:'STIR FRIED BAMBOO SHOOTS WITH DRIED CUTTLEFISH',
                price:140,
                image:'rau9',
                id:409,
                type:'RAU',
            })
            realm.create('Meal',{
                name:'RAU BÒ KHAI XÀO',
                nameEN:'STIR FRIED “BO KHAI” MOUNTAIN PURE VEGETABLE WITH GARLIC',
                price:85,
                image:'rau10',
                id:410,
                type:'RAU',
            })
            realm.create('Meal',{
                name:'MĂNG TRÚC YÊN TỬ',
                price:60,
                nameEN:'BOILED "YEN TU" BAMBOO SHOOTS',
                descEN:'Boiled  bamboo  shoots  from  holy  Yen  Tu',
                image:'rau11',
                id:411,
                type:'RAU',
            })
            realm.create('Meal',{
                name:'MĂNG RỪNG MẮC KHÉN',
                nameEN:'BOILED WILD BAMBOO SHOOTS',
                descEN:'Wild bamboo shoots boiled, and Thai’s  ethnic minority “mac khen” sauce',
                price:60,
                image:'rau12',
                id:412,
                type:'RAU',
            })
            // TODO DONGDUONG
            realm.create('Meal',{
                name:'CÁ MỎ VẸT KẸP QUE TRE',
                price:475,
                nameEN:'PARROTFISH CLUSTERED WITH BAMBOO STICKS',
                desc:'Cá Mỏ Vẹt, tên gọi khác là Mỹ nhân ngư - một đặc sản rất hiếm của biển cả, với thịt thơm ngọt',
                image:'dongduong1',
                id:501,
                type:'DONGDUONG',
            })
            realm.create('Meal',{
                name:'CÁ NHÓI NƯỚNG MỠ HÀNH',
                price:415,
                nameEN:'GRILLED FISH ON GREASE',
                desc:'Giống cá đặc biệt thịt trắng, xương xanh. Được phủ mỡ hành nướng trên than hoa, ăn kèm với lá cải xanh và nước tương.',
                image:'dongduong2',
                id:502,
                type:'DONGDUONG',
            })
            realm.create('Meal',{
                name:'CÁ BÒ DA GIẤY',
                price:525,
                nameEN:'UNICORN FILEFISH',
                desc:'Thân cá mỏng chắc, được khứa chéo tẩm sốt đặc biệt rồi nướng chín vàng trên than hoa. Là mồi nhậu tuyệt hảo của dân vùng biển.',
                image:'dongduong3',
                id:503,
                type:'DONGDUONG',
            })
            realm.create('Meal',{
                name:'CÁ BÒ HÒM',
                price:545,
                nameEN:'CUBE TRUNKFISH',
                descEN:'A very special fish in deep sea outside Ninh Thuan province',
                desc:'Loại cá hiếm và độc đáo ở vùng biển miền Trung, mình như chiếc hộp vuông vức, vảy cứng như áo giáp. Thịt cá có thớ chắc dầy, trắng và ngọt. Cá nướng muối ớt theo kiểu dân chài Ninh Thuận.',
                image:'dongduong4',
                id:504,
                type:'DONGDUONG',
            })
            realm.create('Meal',{
                name:'CÁ TẮC KÈ',
                price:415,
                nameEN:'FLYING GURNARD',
                desc:'Giống cá rất quý hiếm vùng biển xa bờ, cá vây to có thể bay lên khỏi mặt nước. Thịt trắng ngọt và không hề có xương dăm.',
                image:'dongduong5',
                id:505,
                type:'DONGDUONG',
            })
            realm.create('Meal',{
                nameEN:'HARD ROCK FISH',
                name:'CÁ SƠN ĐÁ',
                price:385,
                desc:'Cá sơn đá có vẩy cứng và rất sắc, sau khi chế biến vẩy ròn, thơm, đặc biệt thịt chắc và rất ngọt.',
                image:'dongduong6',
                id:506,
                type:'DONGDUONG',
            })
            realm.create('Meal',{
                name:'CÁ BÃ TRẦU',
                nameEN:'RED SCAD',
                price:385,
                desc:'Cá bã trầu mình dẹt, mắt to, vẩy nhỏ, có mầu nâu bã trầu, sau khi nướng thịt dai có vị ngọt đậm,chấm muối ớt.',
                image:'dongduong7',
                id:507,
                type:'DONGDUONG',
            })
            realm.create('Meal',{
                name:'CÁ CHÌA VÔI',
                nameEN:'SEA DRAGON FISH',
                price:595,
                desc:'Cá chìa vôi sống trong vùng biển nước sâu, thân dài, mỏ hình ống, thịt mầu trắng. Nướng với muối ớt',
                image:'dongduong8',
                id:508,
                type:'DONGDUONG',
            })
            // TODO : HOILANG
            realm.create('Meal',{
                name:'LẨU CHÁO GÀ',
                nameEN:'RICE PORRIDGE HOTPOT',
                descEN:'Rice porridge hotpot with young chicken',
                price:345,
                desc:'Lẩu cháo gạo nếp, đỗ xanh với  gà quê ăn cùng cà pháo muối nén.',
                image:'hoilang1',
                id:601,
                type:'HOILANG',
            })
            realm.create('Meal',{
                name:'LẨU CÁ BỚP BIỂN',
                nameEN:'"BOP" FISH HOTPOT',
                price:350,
                desc:'Giống cá Bớp đặc sản Đà nẵng được đánh bắt ngoài biển xa ướp nước mắm tiêu, nấu lẩu chua me, lá chanh, đậu bắp dọc mùng kiểu Nam Bộ.',
                image:'hoilang2',
                id:602,
                type:'HOILANG',
            })
            realm.create('Meal',{
                name:'CÁ CHÉP OM DƯA',
                nameEN:'STEAMED CARP',
                price:350,
                image:'hoilang3',
                id:603,
                type:'HOILANG',
            })
            realm.create('Meal',{
                name:'LẨU CHÁO CÁ CHÉP',
                nameEN:'CARP CONGEE HOTPOT WITH CRISPY ONION',
                price:350,
                desc:'Cá chép tươi thả trong cháo gạo Tám thơm ninh nhừ, ăn nóng với hành khô phi thơm, quẩy và ớt bột.',
                image:'hoilang4',
                id:604,
                type:'HOILANG',
            })
            realm.create('Meal',{
                name:'CHÁO CHÂN DÊ',
                nameEN:'GOAT\'S LEG SOUP ',
                price:295,
                desc:'Chân dê núi ở vùng Ninh Bình hầm nhừ với đậu xanh và gạo nếp cái hoa vàng. Có tác dụng tăng cường sức khỏe và giải nhiệt tốt.',
                image:'hoilang5',
                id:605,
                type:'HOILANG',
            })
            realm.create('Meal',{
                name:'GÂN BÒ OM SẤU/ ĐUÔI BÒ OM SẤU',
                nameEN:'BEEF TENDON BRAISED "SAU"',
                price:250,
                desc:'Gân bò hoặc đuôi bò ninh mềm với sấu chua rắc thêm rau thơm, ngổ và húng quế ăn cùng bún sợi nhỏ.',
                image:'hoilang6',
                id:606,
                type:'HOILANG',
            })
            realm.create('Meal',{
                name:'CHÂN GIÒ GIẢ CẦY',
                nameEN:'BARBECUE PIG LEGS',
                price:275,
                desc:'Chân giò thui vàng nấu với giềng mẻ trong nồi đất ăn kèm với bún.',
                image:'hoilang7',
                id:607,
                type:'HOILANG',
            })
            realm.create('Meal',{
                name:'ỐC NẤU CHUỐI ĐẬU',
                nameEN:'JUMBO SNAILS WITH GREEN BANANA IN HOTPOT',
                descEN:'Big snails with green banana, tofu and served with fresh noodle',
                price:275,
                desc:'Ốc nhồi nấu với chuối, đậu trong nồi đất, ăn kèm với bún.',
                image:'hoilang8',
                id:608,
                type:'HOILANG',
            })
            realm.create('Meal',{
                name:'LẨU GÀ MĂNG CHUA',
                nameEN:'CHICKEN HOTPOT WITH SOUR BAMBOO SHOOT',
                descEN:'Chicken in hotpot with  sour bamboo shoot with  water  morning  glory and served with fresh noodle',
                price:330,
                desc:'Gà quê nấu với măng muối chua và quả móc mật, ăn kèm rau muống và bún sợi nhỏ.',
                image:'hoilang9',
                id:609,
                type:'HOILANG',
            })
            realm.create('Meal',{
                name:'LẨU SƯỜN OM SẤU',
                nameEN:'HOTPOT WITH PORK RIBS WITH SAPINDUS FRUIT',
                descEN:'Pork ribs in hotpot with sapindus fruit Indian taro and served with fresh noodle',
                price:300,
                desc:'Sườn non om với quả sấu và dọc mùng ăn kèm bún tươi.',
                image:'hoilang10',
                id:610,
                type:'HOILANG',
            })
            realm.create('Meal',{
                name:'LẨU CUA GÀ',
                nameEN:'CHICKEN AND CRAB HOTPOT',
                price:395,
                desc:'Lẩu cua nấu vị thanh với gà mái tơ và rất nhiều loại rau củ quả ngọt: bí, cà rốt, khoai môn, mồng tơi ... ăn kèm với miến dong.',
                image:'hoilang11',
                id:611,
                type:'HOILANG',
            })
            realm.create('Meal',{
                name:'LẨU CUA BỖNG RƯỢU',
                price:330,
                nameEN:'FIELD CRAB HOTPOT',
                descEN:'Crab hotpot with beef and water morning glory, served with fresh noodle',
                desc:'Nấu bỗng rượu, nước quả dọc nướng, tai chua, thịt bắp bò nhúng ăn với ớt chưng và rau muống chẻ',
                image:'hoilang12',

                id:612,
                type:'HOILANG',
            })
            // TODO_TQKC
            realm.create('Meal',{
                name:'CON CHÍP',
                nameEN:'CHIP SEA SNAILS',
                price:145,
                desc:'Loại sò lạ ở biển miền Trung hấp với lá húng non',
                image:'tqkc1',
                id:701,
                type:'TQKC',
            })
            realm.create('Meal',{
                name:'MỰC TRỨNG CHIÊN',
                price:145,
                image:'tqkc2',
                nameEN:'FRIED EGG SQUID',
                id:702,
                type:'TQKC',
            })
            realm.create('Meal',{
                name:'SÒ CHÉN NHA TRANG',
                price:40,
                nameEN:'NHA TRANG GRAND ARK CLAM',
                desc:'Loại sò lớn ngoài tự nhiên nướng mỡ hành.',
                image:'tqkc3',
                id:703,
                type:'TQKC',
            })
            realm.create('Meal',{
                name:'CHẢ ỐC',
                nameEN:'DEEP FRIED SNAIL MEATBALL',
                price:155,
                desc:'Lựa ốc nhồi to bắt ngoài ruộng về ngâm sạch, luộc chín, thái hạt lựu trộn với mỡ phần, trứng gà, lá lốt, hạt tiêu và nước mắm ngon… bọc giấy bạc và hấp cách thủy sau đó nướng thơm ăn kèm với mắm ớt.',
                image:'tqkc4',
                id:704,
                type:'TQKC',
            })
            realm.create('Meal',{
                name:'CHẢ LƯƠN NƯỚNG LÁ XƯƠNG SÔNG',
                price:150,
                nameEN: 'EEL GRILLED PASTE',
                desc:'Lươn đồng cuốn mỡ chài rồi bọc bằng lá xương sông. Chả được nướng chín thơm ăn nóng với nước mắm gừng.',
                image:'tqkc5',
                id:705,
                type:'TQKC',
            })
            realm.create('Meal',{
                name:'CHẢ RƯƠI',
                nameEN:'FRIED SEA SLUG PASTE',
                price:155,
                image:'tqkc6',
                id:706,
                type:'TQKC',
            })
            // TODO : COMNHA
            realm.create('Meal',{
                name:'CÁ XƯƠNG XANH RIM TIÊU',
                nameEN:'"XUONG XANH" FISH SAUCE',
                price:95,
                desc:'Cá xương xanh biển Ninh thuận có thớ thịt dày ,chắc và thơm ngọt được rim xém với nước ngon, rau',
                image:'comnha1',
                id:801,
                type:'COMNHA',
            })
            realm.create('Meal',{
                name:'CÀ PHÁO MUỐI NÉN',
                nameEN:'SALTY EGGPLANT',
                price:10,
                image:'comnha2',
                id:802,
                type:'COMNHA',
            })
            realm.create('Meal',{
                name:'CƠM TÁM',
                nameEN:'STEAMED RICE',
                price:10,
                image:'comnha3',
                id:803,
                type:'COMNHA',
            })
            realm.create('Meal',{
                name:'CƠM RANG GÀ ĐẢO',
                nameEN:'FRIED RICE AND SAUTEED CHICKEN',
                price:115,
                desc:'Cơm tám rang ăn với gà quê đảo gừng.',
                image:'comnha4',
                id:804,
                type:'COMNHA',
            })
            realm.create('Meal',{
                name:'CƠM RANG BẮC THÀNH',
                nameEN:'BAC THANH FRIED RICE',
                descEN:' Fried rice mixed with sour pic kles, pork paste and onion',
                price:75,
                desc:'Cơm tám rang mỡ lợn với dưa chua, lạp xường và chả nhà quê.',
                image:'comnha5',
                id:805,
                type:'COMNHA',
            })
            realm.create('Meal',{
                name:'TRỨNG TRÁNG THỊT BẰM',
                price:65,
                nameEN:'FRIED EGG-MEAT MIX',
                image:'comnha6',
                id:806,
                type:'COMNHA',
            })
            realm.create('Meal',{
                name:'CÁ KHO TỘ',
                nameEN:'FISH STEW',
                price:65,
                image:'comnha7',
                id:807,
                type:'COMNHA',
            })
            realm.create('Meal',{
                name:'TRẠCH ĐỒNG RIM TIÊU',
                nameEN:'SAUTEED FIELD CODFISH WITH PEPPER',
                price:65,
                image:'comnha8',
                id:808,
                type:'COMNHA',
            })
            realm.create('Meal',{
                name:'GÀ QUÊ RANG GỪNG',
                price:95,
                nameEN:'SAUTEED CHICKEN WITH GINGER',
                image:'comnha9',
                id:809,
                type:'COMNHA',
            })
            realm.create('Meal',{
                name:'THỊT BA CHỈ RANG CHÁY CẠNH',
                price:65,
                nameEN:'FRIED LEAN AND FAT MEAT',
                descEN:'Fried lean and fat meat mixed with  sweet-salt-sour fish sauce and spring onion',
                desc:'Thịt ba chỉ  thái con chì rang khô cháy cạnh với mắm và hành hoa',
                image:'comnha10',
                id:810,
                type:'COMNHA',
            })
            // TODO :CANH 
            realm.create('Meal',{
                name:'CANH MĂNG MỰC BÁT TRÀNG',
                nameEN:'BAMBOO SHOOT & DRIED CUTTLEFISH',
                price:150,
                desc:'Món ăn nổi tiếng của người ngoại thành được chế biến hết sức cầu kỳ với măng khô xé sợi nhỏ, mực khô, nước luộc gà,...',
                image:'canh1',
                id:901,
                type:'CANH',
            })
            realm.create('Meal',{
                name:'CANH CHUA NAM BỘ',
                nameEN:'SOUR SOUP WITH CHOPPED MEAT',
                price:75,
                image:'canh2',
                id:902,
                type:'CANH',
            })
            realm.create('Meal',{
                name:'CANH CẢI CÁ RÔ ĐỒNG',
                nameEN:'TILAPIA FISH BROTH WITH MUSTARD GREENS',
                price:60,
                image:'canh3',
                id:903,
                type:'CANH',
            })
            realm.create('Meal',{
                name:'CANH HOA THIÊN LÝ NẤU THỊT NẠC',
                nameEN:'FRAGRANT CYNANTHE FLOWERS AND MEAT STOCK',
                price:60,
                image:'canh4',
                id:904,
                type:'CANH',
            })
            realm.create('Meal',{
                name:'CANH NGAO CHUA',
                nameEN:'CLAM STOCK WITH CORIANDERS,SOUR FRUIT AND CHILLI',
                price:60,
                image:'canh5',
                id:905,
                type:'CANH',
            })
            realm.create('Meal',{
                name:'CANH CUA MÙNG TƠI',
                nameEN:'FIELD CRAB AND MALABAR NIGHTSHADE BROTH',
                price:60,
                image:'canh6',
                id:906,
                type:'CANH',
            })
            // TODO : GPTD
            realm.create('Meal',{
                name:'ĐUÔI BÒ HẤP GỪNG',
                nameEN:'OXTAIL STEAM WITH GINGER',
                desc:'Đuôi bò tơ được hấp khéo gừng và hành, thái thành khoanh chấm tương Cự Đà ăn kèm rau dăm, rau húng, rau ngổ.',
                price:155,
                image:'gptd1',
                id:1001,
                type:'GPTD',
            })
            realm.create('Meal',{
                name:'RỰA MẬN',
                nameEN:'RUA MAN',
                price:230,
                desc:'Thịt lợn Mường thui vàng bằng rơm rồi nấu với giềng non, gừng, xả và tiết ăn kèm với bún và các loại rau thơm.',
                image:'gptd2',
                id:1002,
                type:'GPTD',
            })
            realm.create('Meal',{
                name:'LÒNG LỢN MƯỜNG HẤP',
                nameEN:'MUONG PIG\'S INTESTINE STEAM',
                price:170,
                image:'gptd3',
                id:1003,
                type:'GPTD',
            })
            realm.create('Meal',{
                name:'MỀ GÀ CHIÊN CAY',
                nameEN:'CHICKEN STOMACH FRY',
                price:130,
                desc:'Tim, gan, mề gà ri Bắc Giang tẩm ớt khô cùng các loại gia vị chiên với rau húng bạc hà và rất nhiểu tỏi củ.',
                image:'gptd4',
                id:1004,
                type:'GPTD',
            })
            realm.create('Meal',{
                name:'SƯỜN SỤN CHIÊN MẮM ỚT',
                nameEN:'GRISTLE FRY WITH FISH SAUCE',                
                price:135,
                desc:'Sườn sụn non bào mỏng tẩm với gia vị cay nóng chiên chín vàng trên mỡ sôi văn kèm với rau thơm bạc hà.',
                image:'gptd5',
                id:1005,
                type:'GPTD',
            })
            realm.create('Meal',{
                name:'LƯỠI BÒ NƯỚNG ỐNG TRE',
                nameEN:'GRILLED COW\'S TONGUE WITH BAMBOO',                
                price:155,
                desc:'Lưỡi bò trộn hành tây rồi nướng trong ống tre với lá húng',
                image:'gptd6',
                id:1006,
                type:'GPTD',
            })
            // TODO :RUOU QUE : NOTHING
            realm.create('Meal',{
                name:'MŨ CA LÔ',
                nameEN:'HOCKEY HAT',
                price:0,
                image:'quatang1',
                id:1201,
                type:'QUATANG',
            })
            realm.create('Meal',{
                name:'BÁT CHIẾT YÊU',
                nameEN:'SLENDER-WAISTED BOWL',                
                price:0,
                image:'quatang2',
                id:1202,
                type:'QUATANG',
            })
        })
      this.props.navigation.navigate('Menu');
    })
      
    }
  }
  checkBill(){
      //this.props.navigation.navigate('BillMeal')
      this.slideAnimationDialogConfirm.show();  
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
    this.slideAnimationDialog.show();
  }
  _gotoMenu(){
    this.props.navigation.navigate('Menu')
  }
  _gotoBack(){
    this.props.navigation.goBack();
  }
  renderTopBar(){
    if(this.state.lang=="VN"){
    return(
      <View style={{height:280,width:width,alignItems:'center'}}>
      <TouchableOpacity onPress={()=>this._gotoAbout()}>
      <Image
        source={require('../assets/icon/logo1946.gif')} 
        style={{height:160,width:200,marginTop:20}}
      />
      </TouchableOpacity>
      <ImageBackground
        source={require('../assets/icon/titlebar.png')}
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
          source={require('../assets/icon/logo1946.gif')} 
          style={{height:160,width:200,marginTop:20}}
        />
        </TouchableOpacity>
        <ImageBackground
          source={require('../assets/icon/titlebar.png')}
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
    this.props.navigation.navigate('AboutUs')
  }
  _gotoBack(){
    this.props.navigation.goBack();
  }
  render() {
    if(this.state.loading){
    if(this.state.lang=="VN"){
    if(this.state.checked==0){
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
          source={require('../assets/menu/logo.png')}
          style={{height:150,width:150}}
        />
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
          source={require('../assets/menu/logo.png')}
          style={{height:150,width:150}}
        />
        <Text style={{fontSize:36,color:'#6B2C24',fontFamily:'Trixi Pro Regular',margin:40,textAlign:'center'}}>CẢM ƠN QUÝ KHÁCH ĐÃ LỰA CHỌN SỬ DỤNG DỊCH VỤ CỦA HỆ THỐNG NHÀ HÀNG 1946 ĐÔNG DƯƠNG PHONG VỊ.</Text>
        <Image 
          source={require('../assets/icon/enjoymeal.png')}
          style={{height:220,width:220}}
        />
        <Text style={{fontSize:28,color:'#6B2C24',fontFamily:'Trixi Pro Regular',marginLeft:60,marginRight:60,textAlign:'center'}}>Quý khách vừa lựa chọn xong thực đơn và xin vui lòng chờ trong giây lát trong khi các đầu bếp thể hiện.</Text>
        <Text style={{fontSize:28,color:'#6B2C24',fontFamily:'Trixi Pro Tex',textAlign:'center',margin:30}}>Chúc quý khách có một bữa ăn hài lòng và vui vẻ!</Text>
        <Text style={{fontSize:28,color:'#6B2C24',fontFamily:'Trixi Pro Tex',textAlign:'center',marginTop:20}}>Trân trọng!</Text>
      </View>
    </PopupDialog>
    {/*Pop-up Cancel*/}
    <PopupDialog 
      width={0.7}
      height={0.3}
      ref={(popupDialog)=>{
        this.slideAnimationDialogCancel = popupDialog;
      }}
      dialogAnimation={slideAnimation}
    >
      <View style={styles.dialogContentView} >
        <Image 
          source={require('../assets/icon/cancel_symbol.jpg')}
          style={{height:150,width:150}}
        />

        <Text style={{color:'black',fontSize:24}}>Sai mật khẩu</Text>
        <Text style={{fontSize:20,color:'black',marginTop:20}}>Quý khách xin vui lòng gọi phục vụ bàn để được hỗ trợ.</Text>
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
            source={require('../assets/menu/logo.png')}
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
          source={require('../assets/icon/titlebar.png')}
          style={{height:50,width:250,justifyContent:'center',alignItems:'center',marginTop:30}}
        >
          <Text style={{fontFamily:"Trixi Pro Regular",fontSize:24,color:'#6B2C24'}}>Trở lại</Text>
        </ImageBackground>
        </TouchableOpacity>
      </View>
    </PopupDialog>
    
    <ImageBackground source={require('../assets/menu/background.png')} style={{flex:1}} >
      {this.renderTopBar()}
    {/*Meal orders*/}
    <Image 
      style={{height:20,width:width}}
      source={require('../assets/icon/border.png')}
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
          source={require('../assets/icon/border.png')}
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
          {/*Discount*/}
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
          source={require('../assets/icon/border.png')}
          style={{height:10,width:width}}
        />
    </View>
      {/*</Calculation*/}
    {/*Bottom bar*/}
    <View style={{height:210,alignItems:'center'}}>
    {/*Password*/}
      <View style={{marginTop:20,backgroundColor:'white',borderWidth:4,borderColor:'#6b2c24',width:300,height:60,borderRadius:30}}>
        <TextInput  placeholder="Nhập mật khẩu" placeholderTextColor="grey" 
          style={{fontFamily:'Trixi Pro Regular',width:245,marginLeft:22}}
          onChangeText={(pass)=>{this.setState({pass})}}
        />
      </View>
    <TouchableOpacity onPress={()=>this.showSlideAnimationDialog()}>
      <Image 
        source={require('../assets/icon/dat_mon_icon.png')}
        style={{height:77,width:250,marginTop:10,marginLeft:10}}
      />
    </TouchableOpacity>
    </View>
    
    <View style={{height:90}}>
        <Image 
          source={require('../assets/icon/border.png')}
          style={{height:20,width:width}}
        />
        <View style={{flex:1,flexDirection:'row',alignItems:'center',paddingTop:40}}>
        {/*Button Back*/}
          <View style={{flex:1,alignItems: 'center',}}>
            
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
          source={require('../assets/menu/logo.png')}
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
            source={require('../assets/icon/bb_tt.png')}
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
          source={require('../assets/menu/logo.png')}
          style={{height:150,width:150}}
        />
        <Text style={{fontSize:36,color:'#6B2C24',fontFamily:'Trixi Pro Regular',margin:40,textAlign:'center'}}>CẢM ƠN QUÝ KHÁCH ĐÃ LỰA CHỌN SỬ DỤNG DỊCH VỤ CỦA HỆ THỐNG NHÀ HÀNG 1946 ĐÔNG DƯƠNG PHONG VỊ.</Text>
        <Image 
          source={require('../assets/icon/lastday.png')}
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
            source={require('../assets/menu/logo.png')}
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
          source={require('../assets/icon/titlebar.png')}
          style={{height:50,width:250,justifyContent:'center',alignItems:'center',marginTop:30}}
        >
          <Text style={{fontFamily:"Trixi Pro Regular",fontSize:24,color:'#6B2C24'}}>Trở lại</Text>
        </ImageBackground>
        </TouchableOpacity>
      </View>
    </PopupDialog>
      <ImageBackground source={require('../assets/menu/background.png')} style={{flex:1}} >
        {this.renderTopBar()}
      {/*Meal orders*/}
      <Image 
        style={{height:20,width:width}}
        source={require('../assets/icon/border.png')}
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
            source={require('../assets/icon/border.png')}
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
            source={require('../assets/icon/border.png')}
            style={{height:10,width:width}}
          />
      </View>
        {/*</Calculation*/}
      {/*Bottom bar*/}
      <View style={{height:210,alignItems:'center'}}>
      {/*Password*/}
          <Text style={{fontFamily:'Trixi Pro Regular',color:'#6B2C24',marginTop:30,fontSize:24,alignSelf:'center'}}>Chúc quý khách ngon miệng !</Text>
      <TouchableOpacity onPress={()=>this.checkBill()}>
        <ImageBackground
            source={require('../assets/icon/bb_tt.png')}
            style={{height:77,width:250,marginTop:10,marginLeft:10,alignItems:'center',justifyContent:'center'}}
        >
            <Text style={{fontFamily:'Trixi Pro Regular',color:'white',fontSize:24,alignSelf:'center'}}>Thanh toán</Text>
        </ImageBackground>
      </TouchableOpacity>
      </View>
      
      <View style={{height:90}}>
          <Image 
            source={require('../assets/icon/border.png')}
            style={{height:20,width:width}}
          />
          <View style={{flex:1,flexDirection:'row',alignItems:'center',paddingTop:40}}>
          {/*Button Back*/}
            <View style={{flex:1,alignItems: 'center',}}>
            <TouchableOpacity onPress={() => this.showMealLog()}>
          <ImageBackground
            source={require('../assets/icon/button.png')}
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
      
       {/*</Bottom bar*/}
      </ImageBackground>
      </View>
      )
}
    }else{
      if(this.state.checked==0){
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
              source={require('../assets/menu/logo.png')}
              style={{height:150,width:150}}
            />
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
              source={require('../assets/menu/logo.png')}
              style={{height:150,width:150}}
            />
            <Text style={{fontSize:36,color:'#6B2C24',fontFamily:'Trixi Pro Regular',margin:40,textAlign:'center'}}>THANK YOU FOR USING OUR SERVICE OF STORE 1946 ĐÔNG DƯƠNG PHONG VỊ.</Text>
            <Image 
              source={require('../assets/icon/enjoymeal.png')}
              style={{height:220,width:220}}
            />
            <Text style={{fontSize:28,color:'#6B2C24',fontFamily:'Trixi Pro Regular',marginLeft:60,marginRight:60,textAlign:'center'}}>You have just ordered.Please wait.</Text>
            <Text style={{fontSize:28,color:'#6B2C24',fontFamily:'Trixi Pro Tex',textAlign:'center',margin:30}}>Enjoy the meal!</Text>
            <Text style={{fontSize:28,color:'#6B2C24',fontFamily:'Trixi Pro Tex',textAlign:'center',marginTop:20}}>Thank you!</Text>
          </View>
        </PopupDialog>
        {/*Pop-up Cancel*/}
        <PopupDialog 
          width={0.7}
          height={0.3}
          ref={(popupDialog)=>{
            this.slideAnimationDialogCancel = popupDialog;
          }}
          dialogAnimation={slideAnimation}
        >
          <View style={styles.dialogContentView} >
            <Image 
              source={require('../assets/icon/cancel_symbol.jpg')}
              style={{height:150,width:150}}
            />
    
            <Text style={{color:'black',fontSize:24}}>Incorrect Password</Text>
            <Text style={{fontSize:20,color:'black',marginTop:20}}>Please call the assitant to get help</Text>
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
                source={require('../assets/menu/logo.png')}
                style={{height:100,width:100}}
              />
              <View style={{borderColor:'#6B2C24',borderWidth:3,height:600,width:500,marginTop:20}}>
              <View style={{borderColor:'#6B2C24',borderWidth:2,height:585,width:485,marginTop:5,marginLeft:5}}>
              
              <View style={{height:50,flexDirection:'row'}}>
                <View style={{flex:3,borderRightWidth:2,borderRightColor:'#6B2C24',borderBottomColor:'#6B2C24',borderBottomWidth:2,alignItems:'center',justifyContent:'center'}}>
                  <Text style={{fontFamily:"Trixi Pro Regular",fontSize:24,color:'#6B2C24'}}>Meal Name</Text>
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
              source={require('../assets/icon/titlebar.png')}
              style={{height:50,width:250,justifyContent:'center',alignItems:'center',marginTop:30}}
            >
              <Text style={{fontFamily:"Trixi Pro Regular",fontSize:24,color:'#6B2C24'}}>Back</Text>
            </ImageBackground>
            </TouchableOpacity>
          </View>
        </PopupDialog>
        
        <ImageBackground source={require('../assets/menu/background.png')} style={{flex:1}} >
          {this.renderTopBar()}
        {/*Meal orders*/}
        <Image 
          style={{height:20,width:width}}
          source={require('../assets/icon/border.png')}
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
              source={require('../assets/icon/border.png')}
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
              {/*Discount*/}
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
              source={require('../assets/icon/border.png')}
              style={{height:10,width:width}}
            />
        </View>
          {/*</Calculation*/}
        {/*Bottom bar*/}
        <View style={{height:210,alignItems:'center'}}>
        {/*Password*/}
          <View style={{marginTop:20,backgroundColor:'white',borderWidth:4,borderColor:'#6b2c24',width:300,height:60,borderRadius:30}}>
            <TextInput  placeholder="Input Password" placeholderTextColor="grey" 
              style={{fontFamily:'Trixi Pro Regular',width:245,marginLeft:22}}
              onChangeText={(pass)=>{this.setState({pass})}}
            />
          </View>
        <TouchableOpacity onPress={()=>this.showSlideAnimationDialog()}>
        <ImageBackground
                source={require('../assets/icon/bb_tt.png')}
                style={{height:77,width:250,marginTop:10,marginLeft:10,alignItems:'center',justifyContent:'center'}}
            >
                <Text style={{fontFamily:'Trixi Pro Regular',color:'white',fontSize:24,alignSelf:'center'}}>Order</Text>
        </ImageBackground>
        </TouchableOpacity>
        </View>
        
        <View style={{height:90}}>
            <Image 
              source={require('../assets/icon/border.png')}
              style={{height:20,width:width}}
            />
            <View style={{flex:1,flexDirection:'row',alignItems:'center',paddingTop:40}}>
            {/*Button Back*/}
              <View style={{flex:1,alignItems: 'center',}}>
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
              source={require('../assets/menu/logo.png')}
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
                source={require('../assets/icon/bb_tt.png')}
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
              source={require('../assets/menu/logo.png')}
              style={{height:150,width:150}}
            />
            <Text style={{fontSize:36,color:'#6B2C24',fontFamily:'Trixi Pro Regular',margin:40,textAlign:'center'}}>CẢM ƠN QUÝ KHÁCH ĐÃ LỰA CHỌN SỬ DỤNG DỊCH VỤ CỦA HỆ THỐNG NHÀ HÀNG 1946 ĐÔNG DƯƠNG PHONG VỊ.</Text>
            <Image 
              source={require('../assets/icon/lastday.png')}
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
                source={require('../assets/menu/logo.png')}
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
              source={require('../assets/icon/titlebar.png')}
              style={{height:50,width:250,justifyContent:'center',alignItems:'center',marginTop:30}}
            >
              <Text style={{fontFamily:"Trixi Pro Regular",fontSize:24,color:'#6B2C24'}}>Back</Text>
            </ImageBackground>
            </TouchableOpacity>
          </View>
        </PopupDialog>
          <ImageBackground source={require('../assets/menu/background.png')} style={{flex:1}} >
            {this.renderTopBar()}
          {/*Meal orders*/}
          <Image 
            style={{height:20,width:width}}
            source={require('../assets/icon/border.png')}
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
                source={require('../assets/icon/border.png')}
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
                source={require('../assets/icon/border.png')}
                style={{height:10,width:width}}
              />
          </View>
            {/*</Calculation*/}
          {/*Bottom bar*/}
          <View style={{height:210,alignItems:'center'}}>
          {/*Password*/}
              <Text style={{fontFamily:'Trixi Pro Regular',color:'#6B2C24',marginTop:30,fontSize:24,alignSelf:'center'}}>Enjoy the meal !</Text>
          <TouchableOpacity onPress={()=>this.checkBill()}>
            <ImageBackground
                source={require('../assets/icon/bb_tt.png')}
                style={{height:77,width:250,marginTop:10,marginLeft:10,alignItems:'center',justifyContent:'center'}}
            >
                <Text style={{fontFamily:'Trixi Pro Regular',color:'white',fontSize:24,alignSelf:'center'}}>Pay</Text>
            </ImageBackground>
          </TouchableOpacity>
          </View>
          
          <View style={{height:90}}>
              <Image 
                source={require('../assets/icon/border.png')}
                style={{height:20,width:width}}
              />
              <View style={{flex:1,flexDirection:'row',alignItems:'center',paddingTop:40}}>
              {/*Button Back*/}
                <View style={{flex:1,alignItems: 'center',}}>
                <TouchableOpacity onPress={() => this.showMealLog()}>
              <ImageBackground
                source={require('../assets/icon/button.png')}
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
          
           {/*</Bottom bar*/}
          </ImageBackground>
          </View>
          )
    }
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
