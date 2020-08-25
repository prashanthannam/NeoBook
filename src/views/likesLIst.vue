<template>
<div>
     <v-dialog  :disabled="this.likes.length==0"
                              max-width="500px"
                              transition="dialog-transition"
                              v-model="dialog"
                          >
                          <template v-slot:activator="{on,attrs}">
                                 <a text class="ml-2" color=""  v-bind="attrs" v-on="on"  > {{like}} </a>
                           </template>
                         
   <v-progress-circular  color="grey" v-if="!render"></v-progress-circular>
                                <v-card v-if="render">
                                    <v-card-title primary-title>
                                    <v-row justify="space-between">
                                        <div>Likes</div>
                                         <v-icon @click="dialog=false" color="">mdi-close</v-icon>
                                        
                                    </v-row>
                                    </v-card-title >
                                        <v-divider></v-divider>
                                <v-card  max-height="500" class="overflow-y-auto d-flex flex-column-reverse">
                                   
                                  <v-list-item 
                                    v-for="(like, index) in likeDet"
                                    :key="index"
                                  >
                                   <v-list-item-avatar size="50">
                                       <v-img
                   :src='like.profPic!=""?like.profPic:(like.gender!="male"?"/female_defDP.png":"/male_defDP.png")'
                  ></v-img>
                                    </v-list-item-avatar>
                                    <v-list-item-title >
                                        <div class=" body-1 font-weight-medium">{{ like.name }}</div>
                                        <div class=" caption font-weight-medium">{{like.email}}</div>
                                        </v-list-item-title>
                                    <v-list-item-action class="mr-8"  v-if="like.name!=$store.state.uname" >
                                              <v-btn depressed="" class="grey lighten-1" small v-if="like.requested==false && like.accepted==false" @click="sendRequest(like.id,index)"  >
                <v-icon left>mdi-account-plus</v-icon> Request
            </v-btn>
            <v-btn small depressed="" class="grey lighten-1" v-if="like.requested==true && like.accepted==false" @click="cancelRequest(like.id,index)"  >
                <v-icon left color="indigo">mdi-account-plus</v-icon>  cancel 
            </v-btn>
            <v-btn small depressed="" disabled="" class="grey lighten-1"  v-if="like.requested==false && like.accepted==true">
            <v-icon left >mdi-account-multiple</v-icon> Friends
            </v-btn>
                                        
                                    </v-list-item-action>
                                  </v-list-item>
                                </v-card>
                                </v-card>
                                 </v-dialog>
                                </div>
          </template>            
<script>
import db from '../fb'
import firebase from 'firebase'
export default({
    props:{
        likes:Array,
    },
    data(){
        return{
            
            reload:0,
            dialog:false,
            likeDet:[],
            render:false,

        }
    },
    methods:{
         sendRequest:function(userID,index){
            this.likeDet[index].requested=true
            db.collection('users').doc(userID).update({inRequests:firebase.firestore.FieldValue.arrayUnion(this.$store.state.uid)})
        },
        cancelRequest:function(userID,index){
            this.likeDet[index].requested=false
            db.collection('users').doc(userID).update({inRequests:firebase.firestore.FieldValue.arrayRemove(this.$store.state.uid)})
        }
    },
    watch:{
        
        likes:function(){
          this.likeDet=[] 
 if(this.likes.length!=0){
            db.collection('users').get().then((res)=>{
                res.docs.forEach(element=>{
                    if(this.likes.includes(element.id)){
                    var ele=element.data()
                        if(ele.inRequests.includes(this.$store.state.uid)){
                            ele.requested=true
                        }else{
                            ele.requested=false}
                        if(ele.friends.includes(this.$store.state.uid)){
                            ele.accepted=true
                        }else{
                            ele.accepted=false}
                            ele.id=element.id
                        this.likeDet.push(ele)
                    }
                })
                    this.render=true
                   
            })
        }
        }
    },
    computed:{
         like:function(){
              if(this.likes.length==1)
            return 'like'
            else
            return 'likes'
         }
    },
    async created(){
        if(this.likes.length!=0){
            db.collection('users').get().then((res)=>{
                res.docs.forEach(element=>{
                    if(this.likes.includes(element.id)){
                    var ele=element.data()
                        if(ele.inRequests.includes(this.$store.state.uid)){
                            ele.requested=true
                        }else{
                            ele.requested=false}
                        if(ele.friends.includes(this.$store.state.uid)){
                            ele.accepted=true
                        }else{
                            ele.accepted=false}
                            ele.id=element.id
                        this.likeDet.push(ele)
                    }
                })
                    this.render=true
                   
            })
        }
        }
})
</script>
<style scoped>

</style>