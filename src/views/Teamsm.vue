<template>
        <v-flex  xs12 sm6 md4    lg3 xl2 >
            <v-card class="ml-3 frnds" min-height="450"  max-height="570">
             <v-card-title primary-title>
                 <v-row class="mx-1" justify="space-between">
                     <p>Friends</p>
                     <a class="ma-2 body-2" @click="$router.replace('/team')">Load More</a>
                 </v-row>
             </v-card-title>   
        <v-layout class="pl-2" row wrap justify-start="">
    <v-flex lg5 md5 v-for="member in members" :key="member.name" outlined="" flat class="ma-2  lighten-3">

            <v-card flat="">
              <v-card-title>
              <v-avatar  color="grey" size="110">
          <img style="" :src='member.profPic!=""?member.profPic:(member.gender!="male"?"/female_defDP.png":"/male_defDP.png")' 
          alt='member.gender!="male"?"/female_defDP.png":"/male_defDP.png"'
          @click="$router.push({path:'/othersProfile/'+member.id})"
          > 
              </v-avatar></v-card-title>
                <v-card-text class="pb-0">
                  <div class="text-body-1 black--text">
                   {{member.name}}
                  </div>
                </v-card-text>
                      </v-card>
     
          </v-flex>
        </v-layout>
                    </v-card>

                </v-flex>
</template>
<script>
import db from '@/fb'
// import firebase from 'firebase'
export default {
 data(){
     return{
         members:[],
         requests:[],
         newreq:[],
     }
 }   ,
 methods:{
  

 
 },
 async mounted  (){
    await db.collection('users').where('friends','array-contains',this.$store.state.uid).onSnapshot((res)=>{
     var changes=res.docChanges()
     changes.forEach(ele=>{
       if(ele.type==='added'){
         let docum=ele.doc.data()
          docum.id=ele.doc.id
       this.members.push(docum)
       }
       if(ele.type==='removed'){
         
       var no=(ele.doc.data())
       this.members=this.members.filter((item)=>item.name!=no.name)
       }

     })
     if(changes.length==0){
     res.docs.forEach(docu=>{
       let docum=docu.data()
       docum.id=docu.id
       this.members.push(docum)
     })
     }
    })
   await db.collection('users').doc(this.$store.state.uid).onSnapshot((res)=>{
     this.requests=[]
     var request=res.data().inRequests
     request.forEach((req)=>{
         db.collection('users').doc(req).get().then((eledet)=>{
              let p=eledet.data()
              p.id=req
              this.requests.push(p)
   })
     })  
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
button.toProf{
  align-content: center;
  width: 180px;
  height: 180px;
}
.reqpic:hover{
  cursor: pointer;
}
.v-avatar{
  cursor: pointer;
  border: 2px gray solid;
}
.frnds{
    position:-webkit-sticky;
    position:sticky;
    top: 80px;
}
</style>