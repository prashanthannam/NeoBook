<template>
    <div>
        <v-file-input label="wsedrft" @change="cha" accept="image/*"></v-file-input>
        
        <!-- <v-file-input @change="cha" v-model="img" accept="image/*"></v-file-input> -->
        <img  ref="image" :src="img" alt="">
        <img :src='destination' >
    </div>
</template>
<script>
import Cropper from 'cropperjs'
export default {
    data(){
        return{
            imm:'',
            cropper:null,
            destination:null,
            image:null,
            img:'',
            canvas:null,
        }
    },
    methods:{
        cha(imm){
            console.log(this.imm)
            this.img = window.URL.createObjectURL(imm)
            console.log(this.img)
            // this.img=this.imm.name
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
             crop:()=>{
                this.canvas =this.cropper.getCroppedCanvas();
                
                this.destination=this.canvas.toDataURL("image/png")
            }
            
            }) 
        },
    },
    mounted(){
    //  this.cropperIns()

    }
}

</script>
<style scoped>
img{
    max-width: 200px;
}
</style>