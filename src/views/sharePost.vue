<template>
<div>
    <v-dialog
        v-model="dialog"
            max-width="500px"
        transition="dialog-transition"
    >
    <template v-slot:activator="{on,attrs}">
        <div v-on="on" v-bind="attrs">
            <v-icon left  color="">mdi-share</v-icon>
     <span>Share post</span>
        </div>
    </template>
    <v-card>
        <v-card-title>
            <span>Share Post</span>
            <v-spacer></v-spacer>
             <v-icon @click="dialog=!dialog" color="">mdi-close</v-icon>
            
        </v-card-title>
        <v-card-text>
        <v-textarea autofocus="" class=" heading" auto-grow clear-icon="" rounded="" rows="1" :placeholder="'Say something about this , '+this.$store.state.uname+'????'" v-model="message" prepend-inner-icon="edit" ></v-textarea> 

        <v-text-field  dense="" @input="searchforUsers()" rounded="" placeholder="Search for Users" 
         append-icon=""  v-model="searchVal" outlined color></v-text-field>
        
            <v-card flat height="300"  class="overflow-y-auto d-flex flex-column">
            <v-list >
                <v-list-item v-for="(listitem,index) in list" :key="index">
                    <v-list-item-avatar color="grey">
                        <v-img :src='listitem.data().profPic!=""?listitem.data().profPic:(listitem.data().gender!="male"?"/female_defDP.png":"/male_defDP.png")'></v-img>
                        
                    </v-list-item-avatar>
                    <v-list-item-content>
                    <v-list-item-title >{{listitem.data().name}}
                    </v-list-item-title>
                    <v-list-item-subtitle>{{listitem.data().email}}
                    </v-list-item-subtitle>
                    </v-list-item-content>
                    <v-list-item-action class="mr-4">
                             <!-- <v-btn small icon depressed="" class="grey lighten-1">  -->
                         <v-icon class="" @click="sendPost(listitem.id)">mdi-send</v-icon>
                        
                        
                    </v-list-item-action>
                </v-list-item>
            </v-list>
            </v-card>
        </v-card-text>
    </v-card>
    </v-dialog>
</div>
</template>

<script>
import db from '@/fb'
export default {
    props:{
        post:Object
    },
    data(){
        return{
            dialog:false,
            friends:[],
            searchUsers:[],
            searchVal:'',
            message:''
        }
    },
    methods:{
    sendPost(id){
        console.log(id)
        var chatRoomID=''
        if(id<this.$store.state.uid){
             chatRoomID=id+'_'+this.$store.state.uid
        }else{
                 chatRoomID=this.$store.state.uid+'_'+id
        }
        var arr=[id,this.$store.state.uid]
         var d=new Date()
         console.log(chatRoomID,this.post_id)
        
        db.collection('chatRooms').doc(chatRoomID).collection('chats').add({
            message:this.message,
            timestamp:d.getTime(),
            post:this.post,
            date:d,
            sentBy:this.$store.state.uid
        })
         
        db.collection('chatRooms').doc(chatRoomID).set({lastMess:this.message==''?'Shared a Post':this.message,
        timestamp:d.getTime(),
        date:d,
        names:arr,
        sentBy:this.$store.state.uid})
    },
    searchforUsers(){
        this.searchUsers=[]
        db.collection('users').where('name','>=',this.searchVal).where('name','<=',this.searchVal+ '\uf8ff').get().then((val)=>{
        this.searchUsers=val.docs
        console.log(val.docs)
        })
    }
    },
    computed:{
        list:function(){
            if(this.searchVal=='')
            return this.friends
            else{
                return this.searchUsers
            }
        }
    },
    mounted(){
     db.collection('users').where('friends','array-contains',this.$store.state.uid).get().then((res)=>{
        console.log(res.docs)
        this.friends=res.docs
   })
    }
}
</script>
<style scoped>

</style>