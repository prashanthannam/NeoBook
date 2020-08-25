<template>
<div>
     <v-dialog  :disabled="this.comments.length==0"
                              max-width="500px"
                              transition="dialog-transition"
                              v-model="dialog"
                          >
                          <template v-slot:activator="{on,attrs}">
                                 <a  text class="ml-2" color=""  v-bind="attrs" v-on="on"  > comments </a>

                           </template>
                         
   <v-progress-circular  color="grey" v-if="!render"></v-progress-circular>
                                <v-card v-if="render">
                                    <v-card-title primary-title>
                                    <v-row justify="space-between">
                                        <div>Comments</div>
                                         <v-icon @click="dialog=false" color="">mdi-close</v-icon>
                                        
                                    </v-row>
                                    </v-card-title>
                                        <v-divider></v-divider>
            <v-card-text class="pb-0 pt-2">
                <v-card  flat max-height="350"  class="repliesCard px-2 mb-1 overflow-y-auto d-flex flex-column-reverse" >
                <v-list class="my-0 py-0" >
                    <div v-for="(comment,index) in comments" :key="index">
                    <v-list-item  class="ccc my-0 py-0" >
                        <v-list-item-avatar size="40">
                            <v-img onMouseOver="this.style.cursor='pointer'" :src="commenterData[comment.sentBy].profPic!=''?commenterData[comment.sentBy].profPic:'male_defDP.png'" @click="$router.push({path:'/othersProfile/'+comment.sentBy})"></v-img>
                            
                        </v-list-item-avatar>
                        <v-list-item-content class="py-1">
                        <v-list-item-title><span class="body-1">{{commenterData[comment.sentBy].name}}</span>
                            <span class="caption" > {{comment.comment}}</span>
                        </v-list-item-title>
                        
                        <v-list-item-subtitle class="pl-3">
                           
                           <v-row> <v-icon small @click="replyIndex=index;myReply='@'+commenterData[comment.sentBy].name" color="">mdi-share</v-icon>
                            <a class="caption ml-1 grey--text text--darken-2" v-show="comment.replyComments.length!=0" @click="comments[index].replies=!comments[index].replies,$forceUpdate()">replies...</a>

                           </v-row>
                            </v-list-item-subtitle>
                        </v-list-item-content>
                        <v-list-item-action>{{howLongPosted(comment.date)}}</v-list-item-action>
                    </v-list-item>
                        <v-card flat v-show="comments[index].replies" max-height="160" class="mr-1 repliesCard overflow-y-auto">
                        <v-list  class="ml-14 py-0 my-0">
                             <div v-for="(commenty,indexy) in comment.replyComments" :key="indexy">
                    <v-list-item  class="ccc mb-2" >
                        <v-list-item-avatar size="30">
                            <v-img onMouseOver="this.style.cursor='pointer'" :src="commenterData[commenty.sentBy].profPic!=''?commenterData[commenty.sentBy].profPic:'male_defDP.png'" @click="$router.push({path:'/othersProfile/'+commenty.sentBy})"></v-img>
                            
                        </v-list-item-avatar>
                        <v-list-item-content class="py-0">
                        <v-list-item-title><span class="body-1">{{commenterData[commenty.sentBy].name}}</span>
                            <span class="caption"> {{commenty.comment}}</span>

                        </v-list-item-title>
                        <v-list-item-subtitle class="pl-3">
                           <v-row> <v-icon small @click="replyIndex=index;myReply='@'+commenterData[commenty.sentBy].name" color="">mdi-share</v-icon>
                           </v-row>
                            </v-list-item-subtitle>
                        </v-list-item-content>
                        <v-list-item-action class="mr-4">{{howLongPosted(commenty.date)}}</v-list-item-action>
                    </v-list-item>
                             </div>
                            
                        </v-list>
                        </v-card>
                    </div>
                </v-list>
                </v-card>
            </v-card-text>
                <v-divider
                  class=""
                ></v-divider>
             <v-card-actions class="mt-3 mx-2 ml-6">
        <v-row v-if="this.myReply==''" class="">
            <v-textarea autofocus="" solo rounded  placeholder="Add a comment"  rows="1" auto-grow=""
             v-model="myComment" color></v-textarea>

            <v-btn :disabled="myComment==''" text class="mt-2" color="indigo" @click="sendComment()" >
            post</v-btn>
        </v-row>
        <v-row v-else class="">
            <v-textarea autofocus="" solo rounded append-icon="mdi-close" @click:append='replyIndex="";myReply=""'  placeholder="Add a Reply"  rows="1" auto-grow=""
             v-model="myReply" color></v-textarea>

            <v-btn :disabled="myReply==''" text class="mt-2" color="indigo" @click="replyComment()" >
            post</v-btn>
        </v-row>
             </v-card-actions>                      
                        
            </v-card>
            </v-dialog>
        </div>
          </template>            
<script>
import db from '@/fb'
import firebase from 'firebase'
export default{
    props:{
        comments:Array,
        postId:String
    },
    data(){
        return{
            reply:'',
            myReply:'',
            replyIndex:'',
           render:true,
           dialog:false,
           myComment:'',
            Arr:[],
            commenterData:{},

        }
    },

    
    
    methods:{
        
        replyComment(){
            
             let d=new Date()
            let commentDate={comment:this.myReply,sentBy:this.$store.state.uid,timestamp:d.getTime(),date:d}
            this.comments[this.replyIndex].replyComments.push(commentDate)
            db.collection('project').doc(this.postId).update({comments:this.comments})
            this.myReply=''
            this.replyIndex=''
        },
        sendComment(){
            let d=new Date()
            let commentDate={comment:this.myComment,replyComments:[],sentBy:this.$store.state.uid,timestamp:d.getTime(),date:d}
            db.collection('project').doc(this.postId).update({comments:firebase.firestore.FieldValue.arrayUnion(commentDate)})
        this.myComment=''
        },
          howLongPosted(date){
      var d1=date.toDate()
      var d2=new Date()
      var diff=(d2.getTime()-d1.getTime())/(1000 * 3600)
      if(diff<1){
        if(Math.floor(diff*60)==0){
          return "just now"
        }
        return Math.floor(diff*60)+'m ago'
      }
      else if(diff>24){
            if(diff/24>30){
          return String(d1).substring(4,15)
        }else{
          return Math.floor(diff/24)+'d ago'
        }
      }
      return Math.floor(diff) +'h ago'
    },
    },
 
 async created(){
     this.comments.forEach((ele)=>{
        ele.replies=false
     })
         this.render=false
            this.comments.sort((a, b) => (a.timestamp > b.timestamp) ? 1 : -1)
            db.collection('users').get().then((res)=>{
                res.docs.forEach(element=>{
                    var id=element.id
                    var data=element.data()
                    this.commenterData[id]=data
            })
this.render=true
            })
 }
}

</script>
<style scoped>
.ccc{
    border-radius: 18px;
}
.v-img:hover{
    cursor: pointer;
}
.repliesCard::-webkit-scrollbar {
  width: 7px;
}
.repliesCard::-webkit-scrollbar-track {
    box-shadow: inset 0 0 6px rgba(0, 0, 0, 0); 
  border-radius: 20px;
}
.repliesCard::-webkit-scrollbar-thumb {
  background-color: darkgrey;
  outline: 1px solid slategrey;
  border-radius: 20px;
}

</style>