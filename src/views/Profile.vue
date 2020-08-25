<template>
  <div v-if="render">
     <v-snackbar bottom="" v-model="psnackbar">
      Yayy! Profile Pic Updated
      <template v-slot:action="{ attrs }">
        <v-btn color="pink" text v-bind="attrs" @click="psnackbar = false">
          Close
        </v-btn>
      </template>
  </v-snackbar>
  <v-snackbar bottom="" v-model="csnackbar">
      Yayy! Cover Pic Updated
      <template v-slot:action="{ attrs }">
        <v-btn color="pink" text v-bind="attrs" @click="csnackbar = false">
          Close
        </v-btn>
      </template>
  </v-snackbar>
      <v-layout class="px-0" justify-center="">
    <v-flex  class="" sm12 xs12 lg12 md12  >
      
    <v-card  class="my-4 mb-8">
     <v-container class="justify-center py-1 pb-4">
        <v-row justify="center">
  
<v-img :aspect-ratio="16/5" class="cover fill-height mx-1 my-2" :src='cov==""?"defCover1.png":cov'>
      <v-row class=" fill-height">
        <v-col class="hello">
          <div class="px-4"></div>
          
        </v-col>
       <v-col class="ppic pb-0 d-flex align-end"> 
         <v-avatar color="grey" class="profAv align-center white lighten-2 "  size="200">
           <v-img
                   :src='$store.state.profPic!=""?$store.state.profPic:($store.state.gender!="female"?"/male_defDP.png":"/female_defDP.png")'>
                   </v-img>
        </v-avatar>
         <ImageCropper @ProfilePicupdated="psnackbar='true'"></ImageCropper>
       </v-col>
<v-col class="d-flex">
<v-row justify="end" class="mb-6">
<CoverCropper @CoverPicupdated="csnackbar='true'"></CoverCropper>
</v-row>
</v-col>
  </v-row>
  </v-img>
        </v-row>   
    <h1 class=" text-capitalize black--text mt-4">{{this.$store.state.uname}}</h1>
        <h3 class="grey--text text--darken-3">email id: {{this.$store.state.email}}</h3>
        <h4 class="grey--text text--darken-3">Gender: {{this.$store.state.gender}}</h4>
      </v-container>
    </v-card>
     </v-flex> 
      </v-layout>
          <v-layout row wrap class="d-flex" justify-center="">
        <Team v-if="$vuetify.breakpoint.name!='xs' && $vuetify.breakpoint.name!='sm'"></Team>
    <v-flex sm10 xs12 lg7 md8 >
    <v-layout row wrap class="d-flex justify-center">
       <v-flex xs12 sm10 md8 lg6 xl4 v-if="this.projects.length==0">
        <v-card  class="pa-1 mt-0 mt-15">
          <v-card-title class="pa-1 d-flex justify-center">
              No Posts Yet!!!
          </v-card-title>
        </v-card>
      </v-flex>
      
     <v-flex xs12 sm11 md8 lg9 xl4 color="primary">
          <v-card v-if="this.projects.length!=0" class="py-4 mx-4 grey--text body-1 text--darken-3 d-flex justify-center">My Posts</v-card>  

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
                      <v-list-item class=" py-0" @click="deletePost(project.id,project.img,project.vid)">
                           <v-icon  color="">delete</v-icon>
                            Delete post
                      </v-list-item>
                      <v-list-item class="" >
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
            
              <v-img v-if="project.vid==null" class="postImg" @click="$router.push({path:'/postView/'+project.id})" max-height="500" :src="project.img"></v-img>
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
    <v-btn text :disabled="myComment==''"  color="indigo" @click="sendComment(project.id)" >
            post</v-btn>
        </v-row>
          </v-card>
        
      </v-flex>
    </v-layout>
  </v-flex>
<v-flex v-if="$vuetify.breakpoint.name!='xs' && $vuetify.breakpoint.name!='sm'" md-1 lg-3></v-flex>
</v-layout>
  </div>
</template>
<script>
import { v4 as uuidv4 } from 'uuid';
import db from '@/fb'
import firebase from 'firebase'
import LikesList from '../views/likesLIst'
import ImageCropper from '../views/ImageCropper'
import CoverCropper from '../views/coverCropper'
import Comments from '../views/comments'
import SharePost from '../views/sharePost'
import Team from '../views/Teamsm'

export default {
  components: {
    LikesList,ImageCropper,CoverCropper,Comments,SharePost,Team
  },
  data(){
    return{
      render:false,
      psnackbar:false,
      csnackbar:false,
      dialog:false,
      userpic:'',
      usergender:'',
      usermail:'',
      cov:'',
  
      projects:[],
      myComment:'',
      selectedFile:null,
      profPicture:null,
      uploadValue:0,
      img:''
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
    deletePost(id,img,vid){
      if(img!=null){
      var st=img.indexOf('%2F')
      var en=img.indexOf('.png')
      var imageref=(img.substring(st+3,en))
      const storageRefer=firebase.storage().ref();
      storageRefer.child('Posts'+this.$store.state.uid+'/'+imageref+'.png').delete()
      db.collection('project').doc(id).delete()
      }
      else{
              let st=vid.indexOf('%2F')
      let en=vid.indexOf('.mp4')
      let imageref=(vid.substring(st+3,en))
      const storageRefer=firebase.storage().ref();
      storageRefer.child('Posts'+this.$store.state.uid+'/'+imageref+'.mp4').delete()
      db.collection('project').doc(id).delete()
      }
    },
    updateProfPic:function(){
      this.$refs.fileInput.click()
    },
      onFileSelected(event){
        this.img=window.URL.createObjectURL(event)
        this.dialog=true
        
      },
      upload(event){
        this.uploadValue=0
        this.profPicture=null
        this.selectedFile=event.target.files[0]
        const storageRefer=firebase.storage().ref();
        var storageRef=storageRefer.child('profilePics/'+uuidv4()+this.selectedFile.name).put(this.selectedFile);
        storageRef.on(`state_changed`,snapshot=>{
          this.uploadValue=(snapshot.bytesTransferred/snapshot.totalBytes)*100;
        },error=>{
          console.log(error.message)
        },
        ()=>{
          this.uploadValue=100;
          storageRef.snapshot.ref.getDownloadURL().then((url)=>{
            this.profPicture=url;
            this.$store.commit('changeProfPic',url)
            db.collection('users').doc(this.$store.state.uid).update({profPic:url})
            var batch=db.batch()
            db.collection('project').where('personID','==',this.$store.state.uid).get().then((allprojs)=>{
              allprojs.docs.forEach(doc=>{
              const docRef = firebase.firestore().collection('project').doc(doc.id)
              batch.update(docRef,{'personProfPic':url})
            })
            batch.commit()
            })
          })
        })
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
  async mounted (){
    db.collection('users').doc(this.$store.state.uid).onSnapshot(res=>{
      this.cov=res.data().coverPic
      this.cov=this.$store.state.coverPic
         this.render=true

    })
      db.collection('project').where('personID','==',this.$store.state.uid).onSnapshot(res=>{
        const changes=res.docChanges();
        changes.forEach(change => {
           if(change.type==='modified'){
            var ind=this.projects.findIndex((a=>a.id===change.doc.id))
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
          if(change.type==='removed'){
            let delid=change.doc.id
            this.projects=this.projects.filter((item)=> item.id!=delid)
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
  width: 235px;

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
    border:3px solid white;
}

.hello{
  padding-right: 8%;
}
.cover{
  border-radius: 10px;
}

@media only screen and (min-width: 1264px){
.ppic{
  margin-left: 4%;
}
}
.postImg:hover{
  cursor: pointer;
}
.videoPlayer{
  width: 100%;
  max-height: 450pX;
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