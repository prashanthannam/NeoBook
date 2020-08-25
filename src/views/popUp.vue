<template>
<v-dialog
    v-model="dialog"
    max-width="700px"
    transition="dialog-transition"
>
<template v-slot:activator="{on,attrs}">
       <v-btn depressed="" v-on="on" v-bind="attrs" small elevation="3" class="indigo darken-1 grey--text text--lighten-4">
            <v-icon left small color="">note_add</v-icon>
           
           Add a post</v-btn>
    </template>
    <v-card flat class=" overflow-x-hidden">
        <v-card-title class="pl-10">
            <v-row class="d-flex justify-space-between">
                 <p>Add a new post</p>
                     <v-btn icon small elevation="" @click="close" color="">
                          <v-icon color="">mdi-close</v-icon>
                         
                     </v-btn>
                 
             </v-row>
        </v-card-title>
  <v-card-text>
      <v-form class="" ref="form">
        <v-textarea autofocus="" class=" heading" auto-grow clear-icon="" rounded="" rows="1" :placeholder="'Say something, '+this.$store.state.uname+'????'" v-model="content" prepend-inner-icon="edit" ></v-textarea> 
        <v-row  class=" ml-6 pt-0">
            <div class=" body-1 font-weight-medium     mt-5 mr-10">Add media to the Post</div>
                    <v-layout row wrap>

        <v-flex xs3 sm2 md1 lg1><v-file-input :disabled="video!=''" color="indigo" class="inp" hide-input="" style="" ref='fileInput' @change="onFileSelected" accept="image/*" prepend-icon="mdi-camera">   </v-file-input> </v-flex>
          <v-flex xs3 sm2 md1 lg1><v-file-input :disabled="img!=''"  color="indigo" class="inpu " hide-input="" style="" @change="onVideoSelected"  accept="video/*" prepend-icon="mdi-message-video">   </v-file-input> </v-flex>
                    </v-layout>
        </v-row>
          </v-form>
        <div v-if="img!=''" class="img-cont indigo lighten-3">
      <img ref="image" :src="img">
        </div>
  </v-card-text>
  <v-row justify="center">
  <video class="" v-if="video!=''" width="400" controls>
      <source :src="video">
  </video></v-row>
  <!-- <img style=" :src="destination"> -->
  <v-card-actions class=" d-flex justify-end">
        <v-btn v-if="video==''"  :loading="loader" small depressed="" :disabled="button" elevation="2" color="primary" @click="submit">Post</v-btn>
        <v-btn v-else :loading="loader" small depressed="" :disabled="button" elevation="2" color="primary" @click="submitVid">Post</v-btn>

  </v-card-actions>
   </v-card>
</v-dialog>
</template>

<script>
import Cropper from 'cropperjs'
import db from '@/fb'
import firebase from 'firebase'
import { v4 as uuidv4 } from 'uuid';

export default {
    components:{
    },
    data(){
        return{
            img:'',
            video:'',
            videoData:'',
            title:'',
            content:'',
            date:null,
            dialog:false,
            loader:false,
            cropper:null,
            uploadValue:0,
            canvas:null,
            Picture:null,
            selectedFile:null,
            destination:'',

            titleRules:[
                v=>v.length>=3 || 'Minimum Title length is 3'
            ]
        }
    },
  
    watch:{
        img:function(){
            if(this.cropper)
            this.cropper.destroy()
        }
    },
    computed:{
        button(){
            if(this.img!=''){
            return false
            }
            else if(this.video!=''){
                return false
            }
            else{
            if(this.content==''){
                return true
            }
            else{
                return false
            }
            }
   

        }
    },
    methods:{
        close(){
            this.img=''
            if(this.cropper!=null)
            this.cropper.destroy()
            this.image=null
            // this.src=''
            this.dialog=false
            this.video=''
        },
        
        onFileSelected(event){
             this.img=window.URL.createObjectURL(event)
             if(this.cropper!=null){
                this.cropper.destroy()
            }
            this.$nextTick(this.cropperIns)
             
        },
        onVideoSelected(event){
            console.log(event)
            this.videoData=event
            this.video=window.URL.createObjectURL(event)
            
        },
        cropperIns(){
            const image=this.$refs.image
             this.cropper=new Cropper(image,{
                  zoomable:false,
            scalable:false,
             crop:()=>{
                this.canvas =this.cropper.getCroppedCanvas();
                
                this.destination=this.canvas.toDataURL("image/png")
            }
            
            }) 
        },
        submitVid:function(){
            this.loader=true
            this.uploadValue=0
            var d=new Date()
            const storageRefer=firebase.storage().ref();
            var storageRef=storageRefer.child('Posts'+this.$store.state.uid+'/'+uuidv4()+'.mp4').put(this.videoData);
            storageRef.on(`state_changed`,snapshot=>{
          this.uploadValue=(snapshot.bytesTransferred/snapshot.totalBytes)*100;
        },error=>{
          console.log(error.message)
        },
        ()=>{
          this.uploadValue=100;
          storageRef.snapshot.ref.getDownloadURL().then((url)=>{
              this.Picture=url
               const project={
                    content:this.content,
                    timestamp:d.getTime(),
                    date:d,    
                    likes:[],
                    img:null,
                    vid:url,
                    comments:[],
                    person: this.$store.state.uname,
                    personID:this.$store.state.uid,
                    personProfPic:this.$store.state.profPic,
                    personGender:this.$store.state.gender,
                }
                db.collection('project').add(project).then(()=>{
                this.dialog=false;
                this.loader=false;
                this.$emit('projectAdded');
                this.video=''
                this.videoData=''
            });
          })
        })
        

    },
        submit:function(){
            if(this.$refs.form.validate()){
                this.loader=true;
                var d=new Date()

        this.uploadValue=0
        this.Picture=null
        this.selectedFile=this.canvas.toBlob((blob)=>{
        this.selectedFile=new File([blob],'prof.png',{type:'image/png'})
        const storageRefer=firebase.storage().ref();
        var storageRef=storageRefer.child('Posts'+this.$store.state.uid+'/'+uuidv4()+'.png').put(this.selectedFile);
        storageRef.on(`state_changed`,snapshot=>{
          this.uploadValue=(snapshot.bytesTransferred/snapshot.totalBytes)*100;
        },error=>{
          console.log(error.message)
        },
        ()=>{
          this.uploadValue=100;
          storageRef.snapshot.ref.getDownloadURL().then((url)=>{
              this.Picture=url
               const project={
                    content:this.content,
                    timestamp:d.getTime(),
                    date:d,    
                    likes:[],
                    img:this.Picture,
                    comments:[],
                    person: this.$store.state.uname,
                    personID:this.$store.state.uid,
                    personProfPic:this.$store.state.profPic,
                    personGender:this.$store.state.gender,
                }
                db.collection('project').add(project).then(()=>{
                this.dialog=false;
                this.loader=false;
                this.$emit('projectAdded');
                this.img=''
            });
          })
        })
        })

            }   
        }
    
    
    }
    
}
</script>

<style scoped>
.img-cont{
    
}
img{
    width: 40%;
    /* height: 40%; */
}

</style>