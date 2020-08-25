<template>
<!-- <v-row justify="center"> -->
    <div class="tot">
        <v-btn-toggle rounded="" class="mb-4 d-flex justify-center grey lighten-3" mandatory=""  v-model="value">
            <v-btn dark="" class="indigo lighten-1">Mutuals</v-btn>
            <v-btn dark="" class="indigo lighten-1">All Friends</v-btn>
        </v-btn-toggle>
            <v-card min-height="400" v-show="value==0" class="px-4">
            
        <v-layout class="" row wrap >
    <v-flex  xs12 sm6 md6 lg4 xl2 v-for="member in mutuals" :key="member.name">
          <v-card outlined="" flat class="ma-2  lighten-3">
            <v-list-item 
                class="ma-3 mx-5"
            elevation=""
                max-width=""
              >
              <v-list-item-avatar color="grey"  size="100"  class="disp d-flex justify-center">
          
          <v-img style="" :src='member.data().profPic!=""?member.data().profPic:(member.data().gender!="male"?"/female_defDP.png":"/male_defDP.png")' 
          alt='member.data().gender!="male"?"/female_defDP.png":"/male_defDP.png"'
          @click="$router.push({path:'/othersProfile/'+member.id})"
          > </v-img>
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title>
                  <div class=" text-h5 black--text">
                   {{member.data().name}}
                  </div>
                                  </v-list-item-title>

                <v-list-item-subtitle>
                  <div class="grey--text text--darken-1 text-body-1">
                   {{member.data().email}}
                  </div>
                </v-list-item-subtitle>
              </v-list-item-content>
             
               
            </v-list-item>
          </v-card>
        </v-flex>
        </v-layout>
                    </v-card>
     <v-card v-show="value==1" class="px-4 " min-height="400">
            
        <v-layout class="" row wrap  >
    <v-flex  xs12 sm6 md6 lg4 xl2 v-for="member in members" :key="member.name">
          <v-card outlined="" flat class="ma-2  lighten-3">
            <v-list-item 
                class="ma-3 mx-5"
            elevation=""
                max-width=""
              >
              <v-list-item-avatar color="grey"  size="100"  class="disp d-flex justify-center">
          
          <v-img style="" :src='member.data().profPic!=""?member.data().profPic:(member.data().gender!="male"?"/female_defDP.png":"/male_defDP.png")' 
          alt='member.data().gender!="male"?"/female_defDP.png":"/male_defDP.png"'
          @click="$router.push({path:'/othersProfile/'+member.id})"
          > </v-img>
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title>
                  <div class=" text-h5 black--text">
                   {{member.data().name}}
                  </div>
                                  </v-list-item-title>

                <v-list-item-subtitle>
                  <div class="grey--text text--darken-1 text-body-1">
                   {{member.data().email}}
                  </div>
                </v-list-item-subtitle>
              </v-list-item-content>
             
               
            </v-list-item>
          </v-card>
        </v-flex>
        </v-layout>
                    </v-card>
</div>
<!-- </v-row> -->
</template>
<script>
import db from '@/fb'
export default {

 data(){
     return{
         render:false,
         value:0,
         members:[],
         mutuals:[]
     }
 }   ,

 async mounted  (){
     console.log(this.$route.params.id)
    await db.collection('users').where('friends','array-contains',this.$store.state.uid).get().then((res)=>{
        this.members=res.docs
       this.mutuals=res.docs.filter((val)=>{
           return val.data().friends.includes(this.$route.params.id)
       })
       this.render=true
    })
 },
}
</script>

<style scoped>
.v-avatar {
border-radius: 20px;
    
}
v-image{
  border-radius: 10px;
}
.tot{
    padding-top: 10px;
    /* margin-left: 5%;
    margin-right: 5%; */
}

.v-avatar{
  cursor: pointer;
  border: 2px gray solid;
}

</style>