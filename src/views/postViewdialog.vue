<template>
 <v-dialog 
 fullscreen=""
v-model="postdialog"
transition="dialog-transition"
>
<template v-slot:activator="{on,attrs}">
    <v-card  v-on="on" v-bind="attrs" dark width="150" height="210" :color="color" class="my-0 ">
        <v-list-item class="px-1 my-0 py-0">
            <v-list-item-avatar class="mr-2 my-0" size="30">
                <v-img :src="post.personProfPic" alt=""></v-img>
            </v-list-item-avatar >
            <v-list-item-title class="caption pl-0">{{post.person}}</v-list-item-title>
        </v-list-item>
            <v-img height="120" :src="post.img"></v-img>
            <v-card-actions class="pb-0" >
                    <p  class=" my-0 text-truncate" style="max-width: 150px; font-size: 10px;" >{{post.content}}</p>
                
            </v-card-actions>
        <v-row class="mr-2 ml-2 pb-0" :justify="justify">  <p style="font-size: 8px;">{{time}}</p></v-row>
        <!-- <v-row class="mr-2 ml-2 pt-0" :justify="justify">  <p style="font-size: 8px;">{{message}}</p></v-row> -->

    </v-card>
    </template>
    <v-progress-circular  v-if="!render"    
          color="grey"
        ></v-progress-circular>
<v-card  v-if="render" class=" overflow-y-hidden overflow-x-hidden">
    <v-layout row wrap class="ma-2">
        <v-flex xs12 sm9 md9 lg9 class="">
                  <v-card class="bg " height="580" width="900">  
                      <v-card-title class="py-0 my-2">
                          <v-btn dark icon large @click="postdialog=!postdialog" >
                           <v-icon dark large  color="">mdi-close</v-icon>
                          </v-btn>
                          </v-card-title> 
                      <v-card-text>                    
                         <v-img max-height="500"  contain="" cover :src='project.img'></v-img>
                      </v-card-text>
                  </v-card>
                

        </v-flex>
        <v-flex xs12 sm3 md3 lg3>
                    <v-card  
            class=""
        elevation=""
          >
          <v-card-title primary-title class="pb-1 pt-2">
            <v-btn large width="50" height="50" @click="$router.push({path:'/othersProfile/'+project.personID})" icon text="">
             <v-avatar class="grey">
                   <v-img
                   :src='project.personProfPic!=""?project.personProfPic:(project.personGender!="male"?"/female_defDP.png":"/male_defDP.png")'
                   lazy-src="/acc.png"
                   ></v-img>
                 </v-avatar>
                 </v-btn>
             
             <v-layout column="" class="ml-2">
                
                  <v-flex class="mb-0">

                     <span class="black--text">
                   {{project.person}}
                  </span>
                  </v-flex>
                  <v-flex>
                      <!-- <div class="grey--text text--darken-1 caption">{{howLongPosted(project.date)}}</div> -->

                  </v-flex>
              </v-layout>
             
          </v-card-title>
          <v-card-text class="py-0"  >
             <p class="mb-1 black--text">{{project.content}}</p>
          </v-card-text>
                 
            <v-card-actions class="py-0">
               <v-container class='py-0'>
                  
                    <v-col class="pl-2 py-1">
                      <v-row class=" px-3 py-1 d-flex justify-space-between">
                         <div class="text--primary d-flex justify-space-between">
                          {{project.likes.length}}
                          <!-- <li></li> -->
                          
                              <LikesList v-bind:likes="project.likes"></LikesList>
                          </div>
                          <div class="text--primary d-flex justify-space-between"> 
                            {{project.comments.length}}
                            <Comments v-bind:comments="project.comments" v-bind:postId='project.id'></Comments>

                          </div>
                      </v-row>
                      
                  <v-divider
                    class=""
                  ></v-divider>
              <div class='d-flex justify-space-around mt-2'>
                <v-icon @click="likePost()" v-if="!project.iliked">mdi-heart-outline</v-icon>
                <v-icon  @click="unlikePost()" v-if="project.iliked"  color="red">mdi-heart</v-icon>
                <v-icon v-if="!writeComment" @click="writeComment=!writeComment;myComment=''" color="">mdi-comment-text-outline</v-icon>
                <v-icon v-if="writeComment" @click="writeComment=!writeComment;myComment=''" color="indigo">mdi-comment-text</v-icon>
             </div>
                    </v-col>
                </v-container>
            </v-card-actions>
               <v-divider v-if="writeComment"
                  class=""
                ></v-divider>
                 <v-row v-if="writeComment" class="mx-2 mt-4">
<v-textarea  autofocus="" class=" heading" auto-grow clear-icon="" rounded="" v-model="myComment" solo rows="1" placeholder="Add a comment" ></v-textarea>         
    <v-btn text  color="indigo" @click="sendComment()" >
            post</v-btn>
        </v-row>
          </v-card>
           
        </v-flex>

    </v-layout>
</v-card>
 </v-dialog>
  
</template>

<script>
import db from '@/fb'
import firebase from 'firebase'
import LikesList from '../views/likesLIst'
import Comments from '../views/comments'
export default {
components:{
    LikesList,Comments
},
props:{
  projectID:String,
  time:String,
  post:Object,
  sentBy:String,
  message:String,
},
data(){
    return{
        project:{},
        postdialog:false,
        render:false,
        myComment:'',
        writeComment:false
    }
},

methods:{
     likePost(){
      this.project.iliked=true
      this.project.likes.push(this.$store.state.uid)
      db.collection('project').doc(this.project.id).update({likes:firebase.firestore.FieldValue.arrayUnion(this.$store.state.uid)})
    },
    unlikePost(){
      this.project.iliked=false
      this.project.likes=this.project.likes.filter((item)=>item!=this.$store.state.uid)
      db.collection('project').doc(this.project.id).update({likes:firebase.firestore.FieldValue.arrayRemove(this.$store.state.uid)})
    },
    sendComment(){
            let d=new Date()
            let commentDate={comment:this.myComment,sentBy:this.$store.state.uid,timestamp:d.getTime(),date:d}
            db.collection('project').doc(this.project.id).update({comments:firebase.firestore.FieldValue.arrayUnion(commentDate)})
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
        return Math.floor(diff*60)+' m'
      }
      else if(diff>24){
          return Math.floor(diff/24)+' d'
      }
      return Math.floor(diff) +' h'
    },
},
computed:{
color(){
    if(this.sentBy==this.$store.state.uid){
        return 'indigo darken-2'
    }else{
        return 'grey darken-1'
    }
},
justify(){
    if(this.sentBy==this.$store.state.uid){
        return 'end'
    }else{
        return 'start'
    }
}
},
watch:{
    postdialog:function(val){
if(val==true){

db.collection('project').doc(this.projectID).onSnapshot((res)=>{
    console.log(res.data())
    this.project=res.data()
    this.project.id=res.id
    if(this.project.likes.includes(this.$store.state.uid)){
        this.project.iliked=true
    }else{
        this.project.iliked=false
    }
    console.log(this.project,this.post)
    this.render=true
})
}
}
}
}
</script>

<style>
.bg{
    background-image: url('/vbanner.jpg');
}
</style>