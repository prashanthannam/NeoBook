<template>
<div class="" v-if="render">
    <v-layout row >
        <v-flex xs12 sm12 md9 lg9>   
            <v-btn fab="" class="mt-1 ml-1" absolute="" @click="$router.go(-1)" dark  icon="">
                   <v-icon large color="">mdi-close</v-icon>
              </v-btn>  
                  <v-card   class="bg d-flex overflow-y-hidden align-center" >   
                  
                      <v-card-text>       
                         <v-img   v-if="project.img!=null" class="imgDisp" contain="" cover :src='project.img'></v-img>
                    <div v-else class="c-video">
              <video loop :id="'video'" autoplay controls class="videoPlayer" v-if='project.vid!=null'>
                <source :src="project.vid">
              </video>
              </div>
                      </v-card-text>
                  </v-card>
        </v-flex>
        <v-flex class="fix" xs12 sm12 md3 lg3>
                    <v-card  flat="" 
            class="ml-1 mr-0"
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
                
                  <v-flex class="">

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
             <p  class="mb-1 black--text ">{{project.content}}</p>
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
                            <a @click="$refs.textarea.focus()"  text class="ml-2" color=""  > comments </a>
                          
                          </div>
                      </v-row>
                      
                  <v-divider
                    class=""
                  ></v-divider>
              <div class='d-flex justify-space-around mt-2'>
                <v-icon @click="likePost()" v-if="!project.iliked">mdi-heart-outline</v-icon>
                <v-icon  @click="unlikePost()" v-if="project.iliked"  color="red">mdi-heart</v-icon>
                <v-icon @click="$refs.textarea.focus()" color="">mdi-comment-text-outline</v-icon>
             </div>
                    </v-col>
                </v-container>
            </v-card-actions>
           
                 
          </v-card>
         <v-card flat  class=" heading ml-1" >
                            <v-card-text class="px-1 pb-0 pt-2">
                <v-card  flat max-height="350"  class="mb-3 repliesCard overflow-y-auto d-flex flex-column-reverse" >
                <v-list class="my-0 py-0" >
                    <div v-for="(comment,index) in project.comments" :key="index">
                    <v-list-item  class="ccc my-0 py-0" >
                        <v-list-item-avatar size="40">
                            <v-img onMouseOver="this.style.cursor='pointer'" :src="commenterData[comment.sentBy].profPic!=''?commenterData[comment.sentBy].profPic:'/male_defDp.png'" @click="$router.push({path:'/othersProfile/'+comment.sentBy})"></v-img>
                            
                        </v-list-item-avatar>
                        <v-list-item-content class="py-1">
                        <v-list-item-title><span class="body-1">{{commenterData[comment.sentBy].name}}</span>
                            <span class="caption" > {{comment.comment}}</span>
                        </v-list-item-title>
                        
                        <v-list-item-subtitle class="pl-3">
                           
                           <v-row> <v-icon small @click="replyIndex=index;myReply='@'+commenterData[comment.sentBy].name" color="">mdi-share</v-icon>
                            <a class="caption ml-1 grey--text text--darken-2" v-show="comment.replyComments.length!=0" @click="project.comments[index].replies=!project.comments[index].replies,$forceUpdate()">replies...</a>

                           </v-row>
                            </v-list-item-subtitle>
                        </v-list-item-content>
                        <v-list-item-action class="caption">
                          {{howLongPosted(comment.date)}}
                          </v-list-item-action>
                    </v-list-item>
                        <v-card flat v-show="project.comments[index].replies" max-height="160" class=" mr-1 overflow-y-auto repliesCard">
                        <v-list  class="ml-14 py-0 my-0">
                             <div v-for="(commenty,indexy) in comment.replyComments" :key="indexy">
                    <v-list-item  class="ccc mb-2" >
                        <v-list-item-avatar size="30">
                            <v-img onMouseOver="this.style.cursor='pointer'" :src="commenterData[commenty.sentBy].profPic" @click="$router.push({path:'/othersProfile/'+commenty.sentBy})"></v-img>
                            
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
             <v-card-actions class="ml-4 ma-0 pa-1 mb-0">
        <v-row v-if="myReply==''" class="">
            <v-textarea autofocus="" solo rounded  placeholder="Add a comment" ref="textarea"  rows="1" auto-grow=""
             v-model="myComment" color></v-textarea>

            <v-btn :disabled="myComment==''" text class="mt-1" color="indigo" @click="sendComment()" >
            post</v-btn>
        </v-row>
        <v-row v-else class="">
            <v-textarea autofocus="" solo rounded append-icon="mdi-close" @click:append='replyIndex="";myReply=""'  placeholder="Add a Reply"  rows="1" auto-grow=""
             v-model="myReply" color></v-textarea>

            <v-btn :disabled="myReply==''" text class="mt-1 " color="indigo" @click="replyComment()" >
            post</v-btn>
        </v-row>
             </v-card-actions>                      
                        
            </v-card>  
           
        </v-flex>

    </v-layout>
</div>
  
</template>

<script>
import db from '@/fb'
import firebase from 'firebase'
import LikesList from '../views/likesLIst'
export default {
components:{
    LikesList,
},
props:{
  projID:String,
},
data(){
    return{
        myReply:'',
        replyIndex:'',
        project:{},
        render:false,
        myComment:'',
        commenterData:{},
    }
},
watch:{
  replyIndex(val){
    console.log(val)
    console.log(this.myReply)
  },
    $route(to){
        // this.render=false
     db.collection('project').doc(to.params.id).get().then((res)=>{
         this.project=res.data()
         this.project.id=to.params.id
         if(this.project.likes.includes(this.$store.state.uid)){
             this.project.iliked=true
         }else{
        this.project.iliked=false
         }
         console.log(this.project)
         this.project.comments.forEach((ele)=>{
        ele.replies=false
     })
     console.log(this.project.comments)
          if(this.project.comments.length!=0){
            this.project.comments.sort((a, b) => (a.timestamp > b.timestamp) ? 1 : -1)
            db.collection('users').get().then((res)=>{
                res.docs.forEach(element=>{
                    var id=element.id
                    var data=element.data()
                    this.commenterData[id]=data
            })
                          this.render=true

            })
            console.log(this.commenterData)

 }
     })
    },
    
  },
  mounted(){
      // this.render=false
      
db.collection('project').doc(this.$route.params.id).onSnapshot((res)=>{
         this.project=res.data()
         this.project.id=this.$route.params.id
         if(this.project.likes.includes(this.$store.state.uid)){
             this.project.iliked=true
         }else{
        this.project.iliked=false
         }
                 console.log(this.project)
             this.project.comments.forEach((ele)=>{
        ele.replies=false
     })
            this.project.comments.sort((a, b) => (a.timestamp > b.timestamp) ? 1 : -1)
            db.collection('users').get().then((res)=>{
                res.docs.forEach(element=>{
                    var id=element.id
                    var data=element.data()
                    this.commenterData[id]=data
            })
            this.render=true
            })

                 console.log(this.commenterData)
     })
    
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
    replyComment(){  
            console.log(this.replyIndex,'kjhg',this.myReply)
             let d=new Date()
            let commentDate={comment:this.myReply,sentBy:this.$store.state.uid,timestamp:d.getTime(),date:d}
            this.project.comments[this.replyIndex].replyComments.push(commentDate)
            db.collection('project').doc(this.postId).update({comments:this.project.comments})
            this.myReply=''
            this.replyIndex=''
        },
    sendComment(){
      if(this.myComment!=''){
            let d=new Date()
            let commentDate={comment:this.myComment,replyComments:[],sentBy:this.$store.state.uid,timestamp:d.getTime(),date:d}
            db.collection('project').doc(this.project.id).update({comments:firebase.firestore.FieldValue.arrayUnion(commentDate)})
        this.myComment=''
      }
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
 
}
</script>

<style>
.bg{
    background-image: url('/vbanner.jpg');
/* position: fixed; */
  height: 585px;

}
.fix{
  overflow-x: hidden;
  /* position: fixed; */
  right: 0;
  /* overflow-y: hidden; */
}
.content{
  min-height: 100px;
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
.videoPlayer{
  width: 100%;
  height: 585px;
  overflow: hidden;
  outline: 0px solid transparent;
}
.c-video{
  height: 585px;
  position: relative;
  overflow: hidden;
}
.imgDisp{
  height: 585px;
}

</style>