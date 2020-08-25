<template>
<v-dialog
            v-model="dialog"
            max-width="700px"
            transition="dialog-transition"
          >
          <template v-slot:activator="{on,attrs}">
           <!-- <v-file-input v-on="on" v-bind="attrs" type="file"  ref='fileInput' @change="onFileSelected" accept="image/*"></v-file-input> -->

          <v-btn absolute="" outlined=""  bottom=""  icon class="grey editbtn lighten-2 black--text" v-on="on" v-bind="attrs" @click="model=true">
              <v-tooltip top>
                <template v-slot:activator="{ on, attrs }">
              <v-icon v-on="on" v-bind="attrs" color="">mdi-camera-iris</v-icon>
                </template>
                <span>Edit Profile Pic</span>
              </v-tooltip>
    </v-btn>  
          </template> 
     <v-card>
         <v-card-title primary-title>

             <v-row class="d-flex justify-space-between">
                 <p>Update Profile Pic</p>
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

        }
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
            aspectRatio:1,
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
        this.selectedFile=new File([blob],'prof.png',{type:'image/png'})
        const storageRefer=firebase.storage().ref();
        var storageRef=storageRefer.child('profilePics/'+this.$store.state.uid+'.png').put(this.selectedFile);
        storageRef.on(`state_changed`,snapshot=>{
          this.uploadValue=(snapshot.bytesTransferred/snapshot.totalBytes)*100;
        },error=>{
          console.log(error.message)
        },
        ()=>{
          this.uploadValue=100;

          storageRef.snapshot.ref.getDownloadURL().then((url)=>{
            this.profPicture=url;
             this.loader=false
            this.$emit('ProfilePicupdated');
            this.close()

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
        })
      },
        close(){
            this.img=''
            if(this.cropper!=null)
            this.cropper.destroy()
            this.image=null
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
.editbtn{
    margin-left: 150px;
}
</style>