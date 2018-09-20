import Realm from 'realm'
// TODO: Add new data. 
// TODO: Fixing old database. Done
// TODO: Rerange.
// TODO: Create Meal Database. Done
export const MEAL_SCHEMA="Meal"
export const MODE_SHCEMA="ModeApp"
export const MealSchema={
    name:MEAL_SCHEMA,
    primaryKey:'id',
    properties:{
      name:{type:'string',default:'Tên món ăn'},
      nameEN:{type:'string',default:'Meal name'},
      price:{type:'int',default:0},
      desc:{type:'string',default:''},
      descEN:{type:'string',default:''},
      image:'string',
      id:'int',
      type:'string',
      checked:{type:'bool',default:false},
      amount:{type:'int',default:0},
      status:{type:'int',default:0},
    }
}
export const ModeSchema={
    name:MODE_SHCEMA,
    primaryKey:'id',
    properties:{
        id:'int',
        mode:'int',
    }
}
export const databaseOptions={
    schema:[MealSchema,ModeSchema]
}

export const createMealDatabase=()=>{
    Realm.open(databaseOptions)
    .then(realm =>{
        let checkMode=realm.objects(MEAL_SCHEMA).length;
        if(checkMode==0){
        realm.write(()=>{
            let data= realm.objects('Meal');
            realm.delete(data);
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
                decc:'Bánh đúc khi ăn có vị giòn, mát, mịn và không béo, rất hợp với người ăn kiêng, là món quà thể hiện phong vị ẩm thực rất thanh tao, dân dã của người Hà Nội.',
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
                desc:'Móng heo có màu vàng cánh gián trông rất đẹp, sốt thấm đều, vị hơi mằn mặn, ngọt ngọt và thơm mùi nước mắm.',
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
                desc:'Phần quế của dạ dầy heo ướp gia vị và ớt cánh, chiên ròn.',
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
                desc:'Hoa thiên lý xào tỏi có tác dụng lợi gan, thanh nhiệt, giải độc, làm sáng mắt, chữa đau mình nhức xương cốt, còn là vị thuốc an thần để điều trị chứng mất ngủ.',
                id:403,
                type:'RAU',
            })
            realm.create('Meal',{
                name:'NGỌN RAU BÍ XÀO TỎI',
                price:60,
                nameEN:'SAUTEED PUMPKIN BRANCHES WITH GARLIC',
                image:'rau4',
                desc:'Rau bí ăn vừa giòn giòn mà nhìn lại xanh bắt mắt hòa quyện với hương thơm nồng ấm của tỏi.',
                id:404,
                type:'RAU',
            })
            realm.create('Meal',{
                name:'MÙNG TƠI XÀO TỎI',
                price:50,
                nameEN:'STIR FRIED MALABAR N IGHTSHADE WITH GARLIC',
                image:'rau5',
                desc:'Mùng tơi được xào với tỏi đã đập dập, phi thơm vàng',
                id:405,
                type:'RAU',
            })
            realm.create('Meal',{
                name:'NGỌN SU XÀO TỎI',
                price:60,
                nameEN:'SAUTEED CHAYOTE BRANCHES WITH GARLIC',
                image:'rau6',
                desc:'Vị giòn, ngọt của ngọn su su, vị thơm nồng ngào ngạt của tỏi, được nêm nếm vừa miệng với gia vị',
                id:406,
                type:'RAU',
            })
            realm.create('Meal',{
                name:'RAU MUỐNG XÀO GIÒN',
                price:50,
                decc:'',
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
      }
    })
  
}
export const addNewDatabase=(type,id,name,nameEN,price,desc,descEN)=>{
    Realm.open(databaseOptions)
    .then(realm=>{
        realm.write(()=>{
            realm.create(MEAL_SCHEMA,{id,type,name,nameEN,price:parseInt(price),desc,descEN,image:'base'});
        })
    })
}
export const fixDatabase=(id,name,nameEN,price,desc,descEN)=>{
    Realm.open(databaseOptions)
    .then(realm=>{
        realm.write(()=>{
            realm.create(MEAL_SCHEMA,{id,name,nameEN,price:parseInt(price),desc,descEN},true);
        })
    })
}
export const clearMeal=()=>{
    Realm.open(databaseOptions)
    .then(realm=>{
        let data= realm.objects(MEAL_SCHEMA).filtered('amount > 0');
        realm.write(()=>{
            for(i=0;i<data.length;i++){
                console.log('Kyun Log:'+i+'of'+data.length)
                realm.create(MEAL_SCHEMA,{id:data[i].id,amount:0,check:false},true);
            }
        })
        realm.write(()=>{
            for(i=0;i<data.length;i++){
                console.log('Kyun Log:'+i+'of'+data.length)
                realm.create(MEAL_SCHEMA,{id:data[i].id,amount:0,check:false},true);
            }
        })
        realm.write(()=>{
            for(i=0;i<data.length;i++){
                console.log('Kyun Log:'+i+'of'+data.length)
                realm.create(MEAL_SCHEMA,{id:data[i].id,amount:0,check:false},true);
            }
        })
        realm.write(()=>{
            for(i=0;i<data.length;i++){
                console.log('Kyun Log:'+i+'of'+data.length)
                realm.create(MEAL_SCHEMA,{id:data[i].id,amount:0,check:false},true);
            }
        })
        realm.write(()=>{
            for(i=0;i<data.length;i++){
                console.log('Kyun Log:'+i+'of'+data.length)
                realm.create(MEAL_SCHEMA,{id:data[i].id,amount:0,check:false},true);
            }
        })
        realm.write(()=>{
            for(i=0;i<data.length;i++){
                console.log('Kyun Log:'+i+'of'+data.length)
                realm.create(MEAL_SCHEMA,{id:data[i].id,amount:0,check:false},true);
            }
        })
    })
}
export const deleteDatabase=(id)=>{
    Realm.open(databaseOptions)
    .then(realm=>{
        let data = realm.objectForPrimaryKey(MEAL_SCHEMA,id);
        realm.write(()=>{
            realm.delete(data);
        })
        })
    
}
export const moveDatabase=()=>{

}
