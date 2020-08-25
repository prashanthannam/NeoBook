<template>
     <div class="c-video">
              <video loop :id="'video'+index" class="videoPlayer">
                <source :src="link">
              </video>
              <div  class="controls" v-if='link!=null'>
                   <v-icon size="60" @click="playVid()" color="white">mdi-play-circle-outline</v-icon>
                  <!-- <v-icon size="60" v-if="playing" @click="playVid()" color="white">mdi-pause-circle-outline</v-icon> -->

              </div>  
              </div>
</template>

<script>
export default {
    props:{
        link:String,
        playing:Boolean,
        index:Number
    },
    data(){
        return{
        }
    },
    methods:{
          playVid(){
      
      var myVid=document.getElementById('video'+String(this.index))
       if (myVid.paused) {
    myVid.play(); 
    // this.playing=true
       }
  else {
    myVid.pause(); 
    // this.playing=false
  }
    },
    }
}
</script>
<style scoped>
.videoPlayer{
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.c-video:hover .controls{
  transform :translateY(0);
}
.c-video{
  max-height: 550px;
  position: relative;
  overflow: hidden;
}
.controls{
  position: absolute;
  bottom:45%;
  left: 45%;
  display: flex;
  flex-wrap: wrap;
    transform: translateY(550%);
    /* transition: all 0.s; */

}
</style>