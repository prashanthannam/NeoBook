<template>
  <div>
    <v-layout row wrap class="d-flex justify-center">
      
    <v-flex sm12 xs12 lg12 md12  >
      
    <v-card class="my-4 mb-8">
     <v-container class="justify-start">
        <v-row justify="center">
<v-img :aspect-ratio="16/5" class="cover fill-height mx-1" :src='user.coverPic!=""?user.coverPic:"/defCover.png"'>
      <v-row class=" fill-height" justify="center" align="end">
       
         <v-avatar color="grey" class="profAv align-center white lighten-2"  size="200">
           <v-img
                   :src='user.profPic!=""?user.profPic:(user.gender!="female"?"/male_defDP.png":"/female_defDP.png")'
                  style="object-fit:cover"
                   > </v-img>
        </v-avatar>
      </v-row>
</v-img>
        </v-row> 
        <v-row justify="space-between">
        <div class="pl-2">    
    <h1 class="black--text mt-4">{{user.name}}</h1>
        <h3 class="grey--text text--darken-3">email id: {{user.email}}</h3>
        <h4 class="grey--text text--darken-3">Gender: {{user.gender}}</h4>
        </div><div class="mt-6 mr-2">
         <v-btn  class=" teal" small v-if="user.requested==false && user.accepted==false" @click="sendRequest(user.id)"  >
                <v-icon left>mdi-account-plus</v-icon> Request
            </v-btn>
            <v-btn small v-if="user.requested==true && user.accepted==false" @click="cancelRequest(user.id)"  >
                <v-icon left color="indigo darken-3">mdi-account-plus</v-icon>  cancel 
            </v-btn>
            <v-btn small class="teal lighten-2"  v-if="user.requested==false && user.accepted==true" @click="unfriend(user.id)">
            <v-icon left color="" >mdi-account-remove</v-icon>  Unfriend 
            </v-btn>
            <div class="mt-3 pl-0">
                  <v-btn @click="$router.push({path:'/teamMut/'+$route.params.id})"  small elevation="" color="teal lighten-2"> <p class="mt-4 ml-1">Friends list</p> </v-btn>
              
            </div>
            </div>
            </v-row>
                  </v-container>

    </v-card>
     </v-flex>
    </v-layout>
    <v-layout row wrap=""> 
      <Team v-bind:id="this.$route.params.id" v-if="$vuetify.breakpoint.name!='xs' && $vuetify.breakpoint.name!='sm'"></Team>
      
    <v-flex sm8  xs12 lg7 md8 >
    

    <v-layout row wrap class="d-flex justify-center">

       <v-flex xs12 sm10 md8 lg6 xl4 v-if="myProjects.length==0">
         
        <v-card  class="pa-1 mt-0 mt-15">
          <v-card-title class="pa-1 d-flex justify-center">
              No Posts Yet!!!
          </v-card-title>
        </v-card>
      </v-flex>
        <v-flex xs12 sm11 md8 lg9 xl4 color="primary">
                  <v-card v-if="this.projects.length!=0" class="py-4 mx-4 grey--text body-1 text--darken-3 d-flex justify-center"> {{user.name}}'s Posts</v-card>  

        <v-card v-for="(project,index) in myProjects" :key="index"
            class="ma-4"
        elevation=""
            max-width=""
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
                      <div class="grey--text text--darken-1 caption">{{howLongPosted(project.date)}}</div>

                  </v-flex>
              </v-layout>
               <v-spacer></v-spacer>
                  <v-menu offset-y>
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn icon color="white"  v-bind="attrs" v-on="on" >
                         <v-icon color="grey">mdi-dots-vertical</v-icon>
                        
                      </v-btn>
                    </template>
                    <v-list class="py-0">
                      <v-list-item class="" @click="deletePost(project.id)">
                           <v-icon left  color="">mdi-share</v-icon>
                            <span>Share post</span>
                      </v-list-item>
                    </v-list>
                  </v-menu>
             
          </v-card-title>
          <v-card-text class="py-0"  >
             <p class="mb-1 black--text">{{project.content}}</p>
          </v-card-text>
          
              <v-divider
                class=""
              ></v-divider>
            
              <v-img v-if="project.img!=null" class="postImg" @click="$router.push({path:'/postView/'+project.id})" max-height="500" :src="project.img"></v-img>
              <div v-else class="c-video">
              <video loop :id="'video'+index" :controls="project.playing" class="videoPlayer" v-if='project.vid!=null'>
                <source :src="project.vid">
              </video>
              <div  class="control" v-if='project.vid!=null'>
                   <v-icon style="opacity:0.8" size="60" v-if="!project.playing" @click="playVid(index)" color="white">mdi-play-circle-outline</v-icon>
              </div>  
             
              </div>
             
            
                <v-divider
                  class=""
                ></v-divider>
                 
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
                <v-icon @click="likePost(project.id,index)" v-if="!project.iliked">mdi-heart-outline</v-icon>
                <v-icon  @click="unlikePost(project.id,index)" v-if="project.iliked"  color="red">mdi-heart</v-icon>
                <v-icon v-if="!project.writeComment" @click="project.writeComment=!project.writeComment;myComment=''" color="">mdi-comment-text-outline</v-icon>
                <v-icon v-if="project.writeComment" @click="project.writeComment=!project.writeComment;myComment=''" color="indigo">mdi-comment-text</v-icon>
             </div>
                    </v-col>
                </v-container>
            </v-card-actions>
                <v-divider v-if="project.writeComment"
                  class=""
                ></v-divider>
                 <v-row v-if="project.writeComment" class="mx-2 mt-4">
<v-textarea  autofocus="" class=" heading" auto-grow clear-icon="" rounded="" v-model="myComment" solo rows="1" placeholder="Add a comment" ></v-textarea>         
    <v-btn text  color="indigo" @click="sendComment(project.id)" >
            post</v-btn>
        </v-row>
          </v-card>

      </v-flex>
    </v-layout>
  </v-flex>
</v-layout>
  </div>
</template>
<script>
import db from '@/fb'
import firebase from 'firebase'
import LikesList from '../views/likesLIst'
import Comments from '../views/comments'
import Team from '../views/mutualfriends'

export default {
  components: {
    LikesList,Comments,Team
  },
  data(){
    return{
      user:{},
      projects:[],
      myComment:''
    }
  },
  methods:{
     playVid(index){
      index
      var myVid=document.getElementById('video'+String(index))
       if (myVid.paused) {
    myVid.play(); 
    this.projects[index].playing=true
      myVid.muted=true

       }    },    
    sendComment(id){
            let d=new Date()
            let commentDate={comment:this.myComment,sentBy:this.$store.state.uid,timestamp:d.getTime(),date:d}
            db.collection('project').doc(id).update({comments:firebase.firestore.FieldValue.arrayUnion(commentDate)})
        this.myComment=''
        },

    unfriend(id){
       console.log(this.user.requested,this.user.accepted)
      this.user.accepted=false
      db.collection('users').doc(id).update({friends:firebase.firestore.FieldValue.arrayRemove(this.$store.state.uid)})
      db.collection('users').doc(this.$store.state.uid).update({friends:firebase.firestore.FieldValue.arrayRemove(id)})
       console.log(this.user.requested,this.user.accepted)


    },
     sendRequest:function(userID){
             console.log(this.user.requested,this.user.accepted)
            this.user.requested=true
 console.log(this.user.requested,this.user.accepted)      
       db.collection('users').doc(userID).update({inRequests:firebase.firestore.FieldValue.arrayUnion(this.$store.state.uid)})
        },
        cancelRequest:function(userID){
                console.log(this.user.requested,this.user.accepted)

            this.user.requested=false
                 console.log(this.user.requested,this.user.accepted)

            db.collection('users').doc(userID).update({inRequests:firebase.firestore.FieldValue.arrayRemove(this.$store.state.uid)})
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
            if(diff/24>30){
          return String(d1).substring(4,15)
        }else{
          return Math.floor(diff/24)+' d'
        }
      }
      return Math.floor(diff) +' h'
    },
    likePost(id,index){
      this.projects[index].iliked=true
      this.projects[index].likes.push(this.$store.state.uid)

      db.collection('project').doc(id).update({likes:firebase.firestore.FieldValue.arrayUnion(this.$store.state.uid)})
    },
    unlikePost(id,index){
      this.projects[index].iliked=false
            this.projects[index].likes.pop()
      for(var i=0;i<this.projects[index].likes.length;i++){
        if(this.projects[index].likes[i]==this.$store.state.uid){
          delete this.projects[index].likes[i]
          break
        }
      }
      db.collection('project').doc(id).update({likes:firebase.firestore.FieldValue.arrayRemove(this.$store.state.uid)})
    },
    arrayRemove(arr, value) { 
  
   return arr.filter(function(geeks){ 
       return geeks != value; 
   }); 
  
} ,
    checkliked(likes){
      if(likes.includes(this.$store.state.uid)){
        return true
      }
      else{return false}

    },
  },
  watch:{
    $route(to,from){
      console.log('watch',to,from)
        //  console.log(this.$route.params.id)
     db.collection('users').doc(to.params.id).get().then((res)=>{
         this.user=res.data()
     })
     this.projects=[]

      db.collection('project').where('personID','==',to.params.id).onSnapshot(res=>{
        const changes=res.docChanges();
        changes.forEach(change => {
          if(change.type==='added'){
           let proj=change.doc.data()
            proj.id=change.doc.id
            
          
              if(proj.likes.includes(this.$store.state.uid)){
                proj.iliked=true
              }
              else{
                proj.liked=false
              }
            this.projects.unshift(
                proj
            )
          }
        });
      })
    }
  },
  async created (){
      console.log(this.$route.params.id)
     db.collection('users').doc(this.$route.params.id).get().then((res)=>{
         let use=res.data()
use.id=res.id
         
          if(use.inRequests.includes(this.$store.state.uid)){
                            use.requested=true
                        }else{
                            use.requested=false}
                        if(use.friends.includes(this.$store.state.uid)){
                            use.accepted=true
                        }else{
                            use.accepted=false}
                                  console.log('bef',use.requested,use.accepted)
        this.user=use
     })

      db.collection('project').where('personID','==',this.$route.params.id).onSnapshot(res=>{
        const changes=res.docChanges();
        changes.forEach(change => {
          if(change.type==='modified'){
            console.log('mod',change)
            var ind=this.projects.findIndex((a=>a.id===change.doc.id))
            console.log(ind)
            if(this.projects[ind].comments.length!=change.doc.data().comments){
            this.projects[ind].comments=(change.doc.data().comments)
            }

          }
          if(change.type==='added'){
           let proj=change.doc.data()
            proj.id=change.doc.id
            proj.playing=false

          
              if(proj.likes.includes(this.$store.state.uid)){
                proj.iliked=true
              }
              else{
                proj.liked=false
              }
            proj.writeComment=false

            this.projects.unshift(
                proj
            )
          }
        });
      })
  },
  computed:{
     myProjects(){
         var pro=this.projects
        pro.sort((a,b)=>{
        var x = a.timestamp; var y = b.timestamp;
        return ((x > y) ? -1 : ((x < y) ? 1 : 0));
       }) 
       return pro
     },


  }
}
</script>

<style scoped>
div.v-menu__content{
  /* margin-top: 6px; */
  align-content: center;
  /* margin-inline-end: 10px; */
}
.profPic{
  /* width: 235px; */ 

}
button.edit{
  align-content: left;
  width: 200px;
  height: 200px;
}
button.edit:hover{
  color:white;
}
.profAv {
    border:3px solid grey;
}
img{
  border: 1px solid grey;
}
.cover{
  border-radius: 10px;
}
.postImg:hover{
  cursor: pointer;
}
.videoPlayer{
  width: 100%;
  max-height: 450px;
  overflow: hidden;
  outline: 0px solid transparent;
}
.c-video{
  max-height: 450px;
  position: relative;
  overflow: hidden;
}
.control{
  position: absolute;
  bottom:45%;
  left: 45%;
  display: flex;
  flex-wrap: wrap;
}
</style>