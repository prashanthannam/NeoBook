<template class='primary'>
  <div v-if="render">
    <!-- <Crp></Crp> -->
    <v-layout row wrap class="d-flex justify-center"
                            
    >
      <v-flex v-if="$vuetify.breakpoint.name!='sm' && $vuetify.breakpoint.name!='xs'" md3 lg3 >
        
    <v-card class="userDet my-4 mx-2">
     <v-container class="justify-start">
        <v-row justify="center">
         <v-avatar color="grey" class="profAv align-center white lighten-2"  size="180">
           <v-img
                   :src='$store.state.profPic!=""?$store.state.profPic:($store.state.gender!="female"?"/male_defDP.png":"/female_defDP.png")'
                   ></v-img>
        </v-avatar>
        <!-- </v-responsive> -->
        </v-row>
          
    <h2 class="black--text text-h5">{{this.$store.state.uname}}</h2>
        <h4 class="grey--text text--darken-1 body-1"> {{this.$store.state.email}}</h4>
        <h5 class="grey--text text--darken-1 body-2">Gender: {{this.$store.state.gender}}</h5>
      </v-container>
      <div class=" d-flex justify-center"><PopUp></PopUp></div>
      
      <Search></Search>
    </v-card>
      </v-flex>
      <v-flex  xs12 sm8 md6 lg6 xl4 color="primary" class="">
        <v-card class="mt-15 postCard"
        elevation=""
            max-width="550" height="60" v-if="projects.length==0">
            <v-card-text class="body-1 d-flex justify-center">
          No Posts from friends!!!!</v-card-text>
        </v-card>
        <v-card v-for="(project,index) in projects" :key="index"
            class=" postCard"
        elevation=""
            max-width="550"
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
                  <v-menu offset-y close-on-content-click="">
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn icon color="white"  v-bind="attrs" v-on="on" >
                         <v-icon color="grey">mdi-dots-vertical</v-icon>
                        
                      </v-btn>
                    </template>
                    <v-list class="py-0">
                      <v-list-item class="">
                          <SharePost v-bind:post="project"></SharePost>
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
            <v-card-text class="pa-0">
              <v-img v-if="project.img!=null" class="postImg" @click="$router.push({path:'/postView/'+project.id})" max-height="500" :src="project.img"></v-img>
             <div v-else class="c-video" >
              <video onMouseOver="this.style.cursor='pointer'" @click="$router.push({path:'/postView/'+project.id})" loop :id="'video'+index" :controls="project.playing" class="videoPlayer" v-if='project.vid!=null'>
                <source type="video/mp4" :src="project.vid">
                <source type="video/ogv" :src="project.vid">
                <source type="video/webm" :src="project.vid">
              </video>
              <div  class="control" v-if='project.vid!=null'>
                   <v-icon style="opacity:0.8" size="60" v-if="!project.playing" @click="playVid(index)" color="white">mdi-play-circle-outline</v-icon>
              </div>  
              </div>
            </v-card-text>
            <v-card-actions class="py-0">
               <v-container class='py-0'>
                    <v-col class="pl-2 py-1">
                      <v-row class=" px-3 py-1 d-flex justify-space-between">
                         <div class="text--primary d-flex justify-space-between">
                          {{project.likes.length}}
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
    <v-btn class="mt-1" text :disabled="myComment==''"  color="indigo" @click="sendComment(project.id)" >
            post</v-btn>
        </v-row>
          </v-card>
      </v-flex>
      <v-flex class="chatList mt-4" v-if="$vuetify.breakpoint.name!='xs' && $vuetify.breakpoint.name!='sm'" md3 lg3 >
        <Chat></Chat>
      </v-flex>
    </v-layout>
  </div>
</template>
<script>
import db from '@/fb'
import firebase from 'firebase'
import LikesList from '../views/likesLIst'
import Search from '../views/Search'
import PopUp from '../views/popUp'
import Chat from '../views/chat'
import Comments from '../views/comments'
import SharePost from '../views/sharePost'
export default {
  name:'Home',
  components: {
    LikesList,Search,PopUp,Chat,Comments,SharePost
  },
  data(){
    return{
      projects:[],
      myComment:'',
      j:'',
      render:false
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
       }
    },
     sendComment(id){
            let d=new Date()
            let commentDate={comment:this.myComment,replyComments:[],sentBy:this.$store.state.uid,timestamp:d.getTime(),date:d}
            db.collection('project').doc(id).update({comments:firebase.firestore.FieldValue.arrayUnion(commentDate)})
        this.myComment=''
        },
    sortBy(prop){
      this.projects.sort((a,b)=>a[prop]<b[prop]?-1:1)
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
      this.projects[index].likes=this.projects[index].likes.filter((item)=>item!=this.$store.state.uid)
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
  async created(){
    if(this.$vuetify.breakpoint.name=='sm' && this.$vuetify.breakpoint.name=='xs'){
      this.j='center'
    }
    else{
      this.j='start'
    }
      db.collection('users').doc(this.$store.state.uid).get().then((frnds)=>{
      db.collection('project').orderBy('timestamp').onSnapshot(res=>{
        const changes=res.docChanges();
        changes.forEach(change => {
          if(change.type==='modified'){
            var ind=this.projects.findIndex((a=>a.id===change.doc.id))
            if(this.projects[ind].comments.length!=change.doc.data().comments){
            this.projects[ind].comments=(change.doc.data().comments)
            }
             if(this.projects[ind].likes.length!=change.doc.data().likes){
                this.projects[ind].likes=(change.doc.data().likes)
                if(this.projects[ind].likes.includes(this.$store.state.uid)){
                  this.projects[ind].iliked=true
                }else{
                  this.projects[ind].iliked=false
                }
             }
          }
          if(change.type==='added'){
            let proj=change.doc.data()
            proj.id=change.doc.id
            proj.playing=false
            if(frnds.data().friends.includes(proj.personID)){
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
          }
          if(change.type==='removed'){
            let delid=change.doc.id
            this.projects=this.projects.filter((item)=> item.id!=delid)
          }
                this.render=true
        });
      })
       })
  },
  computed:{
     userDetails(){
        return this.$store.state;
      },
  }
}
</script>
<style scoped>
.profAv {
    /* border:2px solid grey; */
}
.userDet{
  position: fixed;
  width: 24%;
  height: 85%;
  /* background-image: url('/vbanner.jpg'); */
}
.postCard{
    margin-top: 17px;
    margin-left: 2%;
  margin-right: 2%; 
}
@media only screen and (min-width: 1264px){
.postCard{
  margin-top: 17px;
  margin-left: 8.5%;
  margin-right: 8.5%;
}
}
.postImg:hover{
  cursor: pointer;
}
.videoPlayer{
  width: 100%;
  max-height: 450px;
  overflow: hidden;
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
  /* display: flex; */
  /* flex-wrap: wrap; */
}
</style>