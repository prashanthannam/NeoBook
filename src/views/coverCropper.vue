<template>
<div>
 <v-tooltip top>
                <template v-slot:activator="{ on, attrs }">
            <v-icon large left="" class="mr-4" v-on="on" @click="dialog=true" v-bind="attrs" :color="colo">edit</v-icon> 
                </template>
                <span>Edit Cover Pic</span>
             </v-tooltip>
<v-dialog
            v-model="dialog"
            max-width="700px"
            transition="dialog-transition"
          >
          <!-- <template v-slot:activator="{on,attrs}">
          <v-btn large="" icon color="grey" class="bbb mr-10" v-on="on" v-bind="attrs" @click="model=true">
            
    </v-btn>  
          </template>  -->
     <v-card>
         <v-card-title primary-title>

             <v-row class="d-flex justify-space-between">
                 <p>Update Cover Pic</p>
                     <v-btn icon small elevation="" @click="close" color="">
                          <v-icon color="">mdi-close</v-icon>
                         
                     </v-btn>
                 
             </v-row>
         </v-card-title>
 <v-row  class=" ml-6 pt-0">
            <div class=" body-1 font-weight-medium  mt-5 mr-8">Choose Image</div>

                <v-file-input color="indigo" hide-details="" hide-input="" prepend-icon="mdi-image" @change="onFileSelected" accept="image/*">   </v-file-input> 

        </v-row>
         <v-card-text>
             <div v-if="img!=''" class=" indigo img-cont lighten-3">            
                  <img ref="image" :src="img">
            </div>

         </v-card-text>
         <v-card-actions class=" d-flex justify-end">
                 <v-btn :loading="loader" :disabled="button" small elevation="" @click="upload" color="indigo">Upload</v-btn>
             
         </v-card-actions>
     </v-card>
</v-dialog>
</div>
     
</template>

<script>
import Cropper from "cropperjs"
// import { v4 as uuidv4 } from 'uuid';
import db from '@/fb'
import firebase from 'firebase'

export default {

    data(){
        return{
            dialog:false,
            img:'',
            loader:false,
            cropper:null,
            image:null,
            destination:'',
            canvas:null,
           selectedFile:null,
      profPicture:null,
      uploadValue:0,
        }
    },
    computed:{
        button(){
            if(this.img=='')
            return true
            else return false

        },
        colo(){
           if(this.$store.state.coverPic==''){
               return 'grey'
           } 
           else{
               return 'white'
           }
        },
    },
    methods:{
         onFileSelected(event){
             this.img=window.URL.createObjectURL(event)
             if(this.cropper!=null){
                this.cropper.destroy()
            }
            this.$nextTick(this.cropperIns)
        },
          cropperIns(){
            const image=this.$refs.image
             this.cropper=new Cropper(image,{
                  zoomable:false,
            scalable:false,
            aspectRatio:16/4,
             crop:()=>{
                this.canvas =this.cropper.getCroppedCanvas();
                
                this.destination=this.canvas.toDataURL("image/png")
            }
            
            }) 
        },
        upload(){
        this.loader=true
        this.uploadValue=0
        this.profPicture=null
        this.selectedFile=this.canvas.toBlob((blob)=>{
            // blob.name=this.$store.state.uid+'.png'
            // blob.lastModifiedDate = new Date();
            // blob.lastModified=new Date().getTime()
            this.selectedFile=new File([blob],'prof.png',{type:'image/png'})
            // console.log(this.selectedFile)
            // console.log(this.selectedFile,uuidv4())
        const storageRefer=firebase.storage().ref();
        var storageRef=storageRefer.child('coverPics/'+this.$store.state.uid+'.png').put(this.selectedFile);
        storageRef.on(`state_changed`,snapshot=>{
          this.uploadValue=(snapshot.bytesTransferred/snapshot.totalBytes)*100;
        },error=>{
          console.log(error.message)
        },
        ()=>{
          this.uploadValue=100;

        //   console.log(this.uploadValue);
          storageRef.snapshot.ref.getDownloadURL().then((url)=>{
            this.profPicture=url;
            // console.log('url',url);
            console.log(this.$store.state.coverPic)

            this.$store.commit('changeCoverPic',url)
            this.loader=false
            this.close()
            this.$emit('CoverPicupdated');
            db.collection('users').doc(this.$store.state.uid).update({coverPic:url})
            var batch=db.batch()
        
            batch.commit()
           
          })

        })
        })
      },
        close(){
            this.img=''
            if(this.cropper!=null)
            this.cropper.destroy()
            this.image=null
            // this.src=''
            this.dialog=false
        }
    },
}
</script>

<style scoped>
.img-cont{
}
img{
    width:40%;
}
.v-card{
    overflow-x: hidden;
}
.bbb{
    position:absolute;
    margin-right: 20px;

}
</style>