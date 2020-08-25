<template>
    <div class="d-flex justify-center">
        
        <v-card  v-if="showChat" class="chatRoom">
       <!-- <v-card tile style="border-radius-top-right:10px" > -->
            <v-container class="py-0">
           <v-row class="d-flex justify-space-between">
               <v-list class="mx-1 py-0">
                <v-list-item>
                    <v-list-item-avatar size="50">
                        <v-img :src='chatRoom.pic!=""?chatRoom.pic:(chatRoom.gender!="male"?"/female_defDP.png":"/male_defDP.png")'></v-img>
                    </v-list-item-avatar>
                    <v-list-item-title>{{chatRoom.name}}</v-list-item-title>
                </v-list-item>
            </v-list>
            
            <v-btn icon=""  @click="showChat=false">
            <v-icon>mdi-close</v-icon>
            </v-btn>
           </v-row>
            </v-container>
            
                <!-- </v-card> -->
                    <v-divider 
                      class="grey lighten-2"
                    ></v-divider>
        <v-card flat=""   class="chating overflow-y-auto d-flex flex-column-reverse" align-end>
            <div
                   id="scroller"
                 ></div>
             <div v-for="mess in messList" :key="mess.timestamp">
                 <div v-if="mess.message=='' && mess.post==null" class="d-flex justify-center">
                      <v-chip 
                           class="caption py-0 grey lighten-2"
                           color=""
                         >
                           {{mess.date}}
                         </v-chip>
                 </div>
                  <div v-if="mess.post!=null" class="d-flex justify-center">
                        <v-row v-if="mess.sentBy==$store.state.uid" class="ma-1 d-flex justify-end" >
    
        <v-card  @click="$router.push({path:'/postView/'+mess.post.id})" dark width="150" height="210" color="indigo darken-2" class="my-0 ">
        <v-list-item class="px-1 my-0 py-0">
            <v-list-item-avatar color="grey" class="mr-2 my-0" size="30">
                <v-img :src="mess.post.personProfPic!=''?mess.post.personProfPic:'/male_defDP.png'" alt=""></v-img>
            </v-list-item-avatar >
            <v-list-item-title class="caption pl-0">{{mess.post.person}}</v-list-item-title>
        </v-list-item>
            <v-img v-if="mess.post.img!=null" height="120" :src="mess.post.img"></v-img>
            <div v-else class="c-video" >
              <video class="videoPlayer" v-if='mess.post.vid!=null'>
                <source type="video/ogv" :src="mess.post.vid">
                <source type="video/webm" :src="mess.post.vid">
              </video>
              <div  class="control" v-if='mess.post.vid!=null'>
                   <v-icon style="opacity:0.8" large  color="white">mdi-play-circle-outline</v-icon>
              </div>  
              </div>
            <v-card-actions class="pb-0" >
                    <p  class=" my-0 text-truncate" style="max-width: 150px; font-size: 10px;" >{{mess.post.content}}</p>
                
            </v-card-actions>
        <v-row class="mr-2 ml-2 pb-0" justify="end">  <p style="font-size: 8px;">{{mess.time}}</p></v-row>

    </v-card>
                        </v-row>
                           
                        <v-row v-if="mess.sentBy!=$store.state.uid" class="ma-1 d-flex justify-start" >
                        
                            <!-- <PostViewDialog v-bind:message='mess.message' v-bind:post='mess.post' v-bind:sentBy="mess.sentBy" v-bind:projectID="mess.post.id" v-bind:time="mess.time"></PostViewDialog>    -->
        <v-card @click="$router.push({path:'/postView/'+mess.post.id})" v-on="on" v-bind="attrs" dark width="150" height="210" color="grey darken-2" class="my-0 ">
        <v-list-item class="px-1 my-0 py-0">
            <v-list-item-avatar color="grey" class="mr-2 my-0" size="30">
                <v-img :src="mess.post.personProfPic!=''?mess.post.personProfPic:'/male_defDP.png'" alt=""></v-img>
            </v-list-item-avatar >
            <v-list-item-title class="caption pl-0">{{mess.post.person}}</v-list-item-title>
        </v-list-item>
            <v-img v-if="mess.post.img!=null" height="120" :src="mess.post.img"></v-img>
           <div v-else class="c-video1" >
              <video class="videoPlayer1" v-if='mess.post.vid!=null'>
                <source type="video/ogv" :src="mess.post.vid">
                <source type="video/webm" :src="mess.post.vid">
              </video>
              <div  class="control1" v-if='mess.post.vid!=null'>
                   <v-icon style="opacity:0.8" large  color="white">mdi-play-circle-outline</v-icon>
              </div>  
              </div>
              <v-card-actions>
                    <p  class=" my-0 text-truncate" style="max-width: 150px; font-size: 10px;" >{{mess.post.content}}</p>
                
            </v-card-actions>
        <v-row class="mr-2 ml-2 pb-0" justify="end">  <p style="font-size: 8px;">{{mess.time}}</p></v-row>

    </v-card>
                        </v-row>
                           
                 </div>
                
                 <div v-if="mess.message!=''" >
                <v-row v-if="mess.sentBy==$store.state.uid" class="ma-1 d-flex justify-end" >
             <v-card flat max-width="200" class="message indigo darken-2 pt-1 px-3" dark="" >
                <p class="ma-0 body-2 d-flex  justify-end"> {{mess.message}} </p>   
                   <p class="mb-0 d-flex justify-end" style="  font-size: 8px;"> {{mess.time}}</p>
                </v-card>
                </v-row> 
                 <v-row  v-if="mess.sentBy!=$store.state.uid" class="ma-1 d-flex justify-start   " >
             <v-card flat outlined=""
              max-width="200" dark="" class="message grey darken-1 pt-1 px-3"  >
             <p class="ma-0 body-2 d-flex justify-start"> {{mess.message}} </p>   
                   <p class="mb-0 d-flex justify-start" style="  font-size: 8px;"> {{mess.time}}</p>

                </v-card>
                </v-row> 
                </div>
             </div>
                 
        </v-card> 
            <v-divider
              class=""
            ></v-divider>
         <v-card flat class="px-2" max-height="41">
            <v-row>
            <v-text-field class="mx-2" dense="" type="" solo error-count="" placeholder="" 
            label="" v-model="message"  outlined color></v-text-field>
            <v-btn :disabled="message==''" class="mr-1" large color="indigo" @click="sendMessage(chatRoom.id)" icon>
            <v-icon>mdi-send</v-icon></v-btn>
        </v-row>
         </v-card>
          <!-- </v-card> -->
        </v-card>
        <v-card  v-show="!showChat" class="chatTileList" >
            <v-card-title primary-title>
           
            <v-menu v-model="menu" offset-overflow="" class="ma-0" :close-on-content-click="menu">
              <template  v-slot:activator="{ on, attrs }">
                <v-btn large text v-bind="attrs" v-on="on" >
                    <v-icon>mdi-magnify</v-icon>
                  Search USer...
                </v-btn>
              </template>
              <v-list dense="" class="searchList pa-0 ma-0">
               <v-list-item  class="ma-0 pa-0 "> 
                   <v-text-field autofocus=""  type="text" placeholder="" class=" mt-2"
         label='' append-icon="mdi-account-search" @input="searchForUser" dense rounded v-model="searchValue" color="indigo"></v-text-field>
               </v-list-item>
               <v-list-item :v-if="searchresArray.length!=0 && searchValue!='' && searchShow" v-for="(searchres,index) in searchresArray" :key="index" class="searchTile" @click="searchOpenChatRoom(index)">
        <v-list-item-avatar size="45" >
                     <v-img class="profImg" :src='searchres.profPic!=""?searchres.profPic:(searchres.gender!="male"?"/female_defDP.png":"/male_defDP.png")'
            >
            </v-img>            
        </v-list-item-avatar >
        <v-list-item-title class="">
                     <div class="grey--text text-body-1 text--darken-2 font-weight-bold">
                   {{searchres.name}}
                  </div>
                  <div class="caption grey--text">
                   {{searchres.email}}
                  </div>
                    </v-list-item-title>
               </v-list-item>
              </v-list>
            </v-menu>
             </v-card-title>
                    <v-divider :v-if="chatRooms.length!=0"
                    class=""
                    ></v-divider>
             <v-card-text>
                  <v-card height="420" flat class="chatList pa-0 overflow-y-auto">
               <v-list-item  v-for="(chatRoom,index) in chatRooms" :key="index" class="searchTile py-0 " @click="openChatRoom(index,chatRoom.chatRoomID)">
        <v-list-item-avatar color="grey" size="50">
                     <v-img class="profImg" :src='chatRoom.profPic!=""?chatRoom.profPic:(chatRoom.gender!="male"?"/female_defDP.png":"/male_defDP.png")'
            >
            </v-img>            
        </v-list-item-avatar>
        <v-list-item-title class="px-3">
            <v-row justify="space-between">
                     <div class=" grey--text body-1 text--darken-2 font-weight-bold">
                   {{chatRoom.name}}
                  </div>
                <div class=" caption grey--text">{{chatRoom.time}}</div>

                  </v-row>
                  <v-row >
                       <v-icon v-if="chatRoom.sentBy==$store.state.uid" small color="">check</v-icon>
                  <div class="caption grey--text">
                   {{chatRoom.lastMess}}
                  </div>
                  </v-row>
                    </v-list-item-title>
               </v-list-item>
              </v-card>
             </v-card-text>
        </v-card>
    </div>
</template>

<script>
import db from '@/fb'
export default {
    components:{
    },
    data(){
        return{
            showChat:false,
            menu:false,
            postdialog:false,
            searchresArray:[],
            searchValue:'',
            chatRooms:[],
            chatRoom:{},
            messList:[],
            message:'',
            searchShow:false
            
        }
    },
    methods:{
        searchOpenChatRoom(index){
            let arr=[this.searchresArray[index].id,this.$store.state.uid]
            arr.sort()
            const chatRoomID=arr[0]+'_'+arr[1]
            var res=this.chatRooms.find(obj=>{
                return obj.chatRoomID==chatRoomID
            })
       
            if(res==undefined){
            db.collection('chatRooms').doc(chatRoomID).set({names:arr,timestamp:0,
            lastMess:'',
            date:0,
            sentBy:''})
            }
                this.menu=false
                this.chatRoom={}
            this.messList=[]
            this.chatRoom.pic=this.searchresArray[index].profPic
            this.chatRoom.name=this.searchresArray[index].name
            this.chatRoom.gender=this.searchresArray[index].gender
            this.chatRoom.id=chatRoomID
            // var list=[]
            db.collection('chatRooms').doc(chatRoomID).collection('chats').orderBy('timestamp').onSnapshot(res=>{
                const changes=res.docChanges()
                changes.forEach(change=>{
                    if(change.type==='added'){
                        let mess=change.doc.data()
                        let time=mess.date.toDate()
                     if(parseInt(time.getHours())>12){
                                 mess.time=String(parseInt(time.getHours())-12)+':'
                                 if(time.getMinutes()>=10)
                                 mess.time=mess.time+time.getMinutes()
                                 else
                                 mess.time=mess.time+'0'+time.getMinutes()
                                 mess.time=String(mess.time)+' PM'
                             }
                             else{
                                 mess.time=time.getHours()+':'
                                  if(time.getMinutes()>=10)
                                 mess.time=mess.time+time.getMinutes()
                                 else
                                 mess.time=mess.time+'0'+time.getMinutes()
                                 mess.time=String(mess.time)+' AM'
                             }
                             if(this.messList.length!=0){
                             if(time.getDate()!=this.messList[0].date.toDate().getDate()){
                                 this.messList.unshift({post:null,message:'',date:time.getDate()+'/'+String(parseInt(time.getMonth())+1)+'/'+time.getFullYear()})

                             }
                             } else{
                    this.messList.unshift({post:null,message:'',date:time.getDate()+'/'+String(parseInt(time.getMonth())+1)+'/'+time.getFullYear()})

                             } 
                    
                            if(this.messList.length>0){
                            if(this.messList[0].timestamp!=mess.timestamp)
                            this.messList.unshift(mess)
                            }
                            else{
                                this.messList.unshift(mess)
                            }    
                    }
                })
                     this.showChat=true
            })
             this.searchValue=''
                this.searchresArray=[]
        },
        sendMessage(id){
            var d=new Date()
            db.collection('chatRooms').doc(id).collection('chats').add({
                message:this.message,
                post:null,
                timestamp:d.getTime(),
                date:d,
                sentBy:this.$store.state.uid
            })
            db.collection('chatRooms').doc(id).update({lastMess:this.message,
            timestamp:d.getTime(),
            date:d,
            sentBy:this.$store.state.uid})
                                this.message=''
            const filtere = this.chatRooms.filter((item) => item.chatRoomID !== id);
            this.chatRooms=filtere
        },
        openChatRoom(index,chatRoomID){
            this.chatRoom={}
            this.messList=[]
            this.chatRoom.pic=this.chatRooms[index].profPic
            this.chatRoom.name=this.chatRooms[index].name
            this.chatRoom.gender=this.chatRooms[index].gender
            this.chatRoom.id=this.chatRooms[index].chatRoomID
            // var list=[]
            db.collection('chatRooms').doc(chatRoomID).collection('chats').orderBy('timestamp').onSnapshot(res=>{
                const changes=res.docChanges()
                changes.forEach(change=>{
                    if(change.type==='added'){
                        let mess=change.doc.data()
                        let time=mess.date.toDate()
                     if(parseInt(time.getHours())>12){
                                 mess.time=String(parseInt(time.getHours())-12)+':'
                                 if(time.getMinutes()>=10)
                                 mess.time=mess.time+time.getMinutes()
                                 else
                                 mess.time=mess.time+'0'+time.getMinutes()
                                 mess.time=String(mess.time)+' PM'
                             }
                             else{
                                 mess.time=time.getHours()+':'
                                  if(time.getMinutes()>=10)
                                 mess.time=mess.time+time.getMinutes()
                                 else
                                 mess.time=mess.time+'0'+time.getMinutes()
                                 mess.time=String(mess.time)+' AM'
                             }
                             if(this.messList.length!=0){
                             if(time.getDate()!=this.messList[0].date.toDate().getDate()){
                                 this.messList.unshift({post:null,message:'',date:time.getDate()+'/'+String(parseInt(time.getMonth())+1)+'/'+time.getFullYear()})

                             }
                             } else{
                    this.messList.unshift({post:null,message:'',date:time.getDate()+'/'+String(parseInt(time.getMonth())+1)+'/'+time.getFullYear()})

                             } 
                            if(this.messList.length>0){
                            if(this.messList[0].timestamp!=mess.timestamp)
                            this.messList.unshift(mess)
                            }
                            else{
                                this.messList.unshift(mess)
                            }    
                    }
                })
                     this.showChat=true
            })
        },
        searchForUser:function() {
            if(this.searchValue==''){
                  this.searchShow=false
                  this.searchresArray=[]
              }
            else{
                this.menu=true
            db.collection('users').where('name','>=',this.searchValue).where('name','<=',this.searchValue+ '\uf8ff').get().then((val)=>{
            this.searchresArray=[]

               if(val.size!=0)
                    val.docs.forEach(element => {

                        var ele=element.data()
                        ele.id=element.id
                if(ele.name!=this.$store.state.uname){
                    this.searchresArray.push(ele)
                }
    })
            })  
            }   
        }  
},

created(){
    db.collection('chatRooms').orderBy('timestamp').onSnapshot(result=>{
        
       const res=result.docChanges()
    // this.chatRooms=[]
       res.forEach(elem=>{
           if(elem.doc.data().names.includes(this.$store.state.uid)){
           let ele=elem.doc

            let oid=''
            if(ele.data().names[0]==this.$store.state.uid)
                oid=ele.data().names[1]
            else 
                oid=ele.data().names[0]
                    db.collection('users').doc(oid).get().then((res)=>{
                    let resul=res.data()
                    resul.chatRoomID=ele.id
                    if(ele.data().timestamp!=0){
                    resul.lastMess=ele.data().lastMess
                    resul.sentBy=ele.data().sentBy
                     let time=ele.data().date.toDate()
                     let today=new Date()
                     let weekDic=['Sunday','Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday',
            ]

                    if(time.getFullYear()==today.getFullYear()){
                        if(time.getMonth()==today.getMonth()){
                            if(time.getDate()==today.getDate()){
                     if(parseInt(time.getHours())>12){
                                 resul.time=String(parseInt(time.getHours())-12)+':'
                                 if(time.getMinutes()>=10)
                                 resul.time=resul.time+time.getMinutes()
                                 else
                                 resul.time=resul.time+'0'+time.getMinutes()
                                 resul.time=String(resul.time)+' PM'
                             }
                             else{
                                 resul.time=time.getHours()+':'
                                  if(time.getMinutes()>=10)
                                 resul.time=resul.time+time.getMinutes()
                                 else
                                 resul.time=resul.time+'0'+time.getMinutes()
                                 resul.time=String(resul.time)+' AM'
                             }
                            }
                            else{
                                if(parseInt(today.getDate())-parseInt(time.getDate())<=6){
                                if(parseInt(today.getDate())-parseInt(time.getDate())==1){
                                    resul.time='yesterday'
                                }
                                else
                                resul.time=weekDic[parseInt(time.getDay())]
                               
                                }
                                else{
                                    resul.time=time.getDate()+'/'+String(parseInt(time.getMonth())+1)+'/'+String(time.getFullYear()).substring(2,4)
                                }

                            }
                        }
                         else{
                                    resul.time=time.getDate()+'/'+String(parseInt(time.getMonth())+1)+'/'+String(time.getFullYear()).substring(2,4)
                                }

                    }
                     else{
                                    resul.time=time.getDate()+'/'+String(parseInt(time.getMonth())+1)+'/'+String(time.getFullYear()).substring(2,4)
                                }
                    // resul.time=String(time).substring(10,15)+String(time).substring(19,20)
                    if(elem.type=='modified'){
                     const filtere = this.chatRooms.filter((item) => item.chatRoomID != resul.chatRoomID);
            this.chatRooms=filtere
                    }
                    this.chatRooms.unshift(resul)                    
                    }
                   
                })
           }
    })
        })
        
}
}
</script>

<style scoped>
.searchTile:hover{
    /* cursor: pointer; */
}
.chatRoom{
    width: 90%;
    max-width: 400px;
    position: fixed;
    height: 80%;
}
.chating::-webkit-scrollbar {
  width: 10px;
}
.chating::-webkit-scrollbar-track {
  /* box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3); */
  border-radius: 20px;
}
.chating::-webkit-scrollbar-thumb {
  background-color: darkgrey;
  outline: 1px solid slategrey;
  border-radius: 20px;
}
.chatTileList{
    overflow-y:auto;
    position: fixed;
    width: 90%;
    max-width: 400px;
    height: 86%;
}
.chating{
    overflow-y: auto;
    height: 370px;
}

.message{
    border-radius: 10px;
}
.videoPlayer{
  width: 100%;
  height:120px;
  overflow: hidden;
  background-color: rgb(228, 227, 227);
}
.c-video{
  height: 120px;
  position: relative;
  overflow: hidden;
}
.control{
  position: absolute;
  bottom:32%;
  left: 40%;
  /* display: flex; */
  /* flex-wrap: wrap; */
}
.videoPlayer1{
  width: 100%;
  height:120px;
  overflow: hidden;
    background-color: rgb(228, 227, 227);

}
.c-video1{
  height: 120px;
  position: relative;
  overflow: hidden;
}
.control1{
  position: absolute;
  bottom:32%;
  left: 40%;
  /* display: flex; */
  /* flex-wrap: wrap; */
}

</style>