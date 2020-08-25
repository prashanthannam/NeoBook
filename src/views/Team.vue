<template>
<div  >
  <div class="d-flex justify-end">
      <v-menu offset-y :close-on-content-click="false" >
        <template v-slot:activator="{ on, attrs }">

          <v-btn color="" dark v-bind="attrs" v-on="on" >
                                          Requests

              <v-badge bordered="" color="primary" :content='requests.length' :value="requests.length">

             <v-icon right color="">mdi-account</v-icon>
                              </v-badge>

            
          </v-btn>

        </template>
        <v-card>
        <v-list>
          <v-list-item v-if="requests.length==0">
            <v-list-item-title>No pending requests</v-list-item-title>
          </v-list-item>
          <v-list-item 
            v-for="(request, index) in requests" :key="index"
          >
          <v-list-item-avatar  class="mr-2">
                   <v-img class="reqpic" @click="$router.push('othersProfile/'+request.id)"
                     :src='request.profPic!=""?request.profPic:(request.gender!="male"?"/female_defDP.png":"/male_defDP.png")'
                     :alt='request.gender!="male"?"/female_defDP.png":"/male_defDP.png"'
                     
                   ></v-img>
          </v-list-item-avatar>
              <v-list-item-content class="ml-0 pl-0 d-inline-block text-truncate">
                 <h4 class="grey--text text--darken-2 font-weight-bold text-si">
                   {{request.name}}
                  </h4>
                  <span class="grey--text caption ">
                   {{request.email}}
                  </span>
              </v-list-item-content>
          <v-list-item-action>
            <v-row>
            <v-btn small @click="cancelRequest(request.id,index)" icon class="error" >
                   <v-icon small="" color="">mdi-close-outline</v-icon>
            </v-btn>
                <v-btn small class='ml-2 primary' icon @click="acceptRequest(request.id,index)" >
                   <v-icon small="" color="">mdi-check-outline</v-icon>
                  
            </v-btn>
            </v-row>
          </v-list-item-action>
          </v-list-item>
        </v-list>
        </v-card>
      </v-menu>
        
   </div>
     <v-container my-3>
        
    <v-layout class="grey lighten-3" row wrap >
        <v-flex  xs12 sm6 md6 lg4 xl2 v-for="member in members" :key="member.name">
          <v-card outlined="" flat class="ma-2  lighten-3">
            <v-list-item 
                class="ma-3 mx-5"
            elevation=""
                max-width=""
              >
              <v-list-item-avatar color="grey"  size="100"  class="disp d-flex justify-center">
          
          <v-img style="" :src='member.profPic!=""?member.profPic:(member.gender!="male"?"/female_defDP.png":"/male_defDP.png")' 
          alt='member.gender!="male"?"/female_defDP.png":"/male_defDP.png"'
          @click="$router.push({path:'/othersProfile/'+member.id})"
          > </v-img>
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title>
                  <div class=" text-h5 black--text">
                   {{member.name}}
                  </div>
                                  </v-list-item-title>

                <v-list-item-subtitle>
                  <div class="grey--text text--darken-1 text-body-1">
                   {{member.email}}
                  </div>
                </v-list-item-subtitle>
              </v-list-item-content>
             
               
            </v-list-item>
          </v-card>
        </v-flex>
    </v-layout>
    
    </v-container>
</div>
</template>

<script>
import db from '@/fb'
import firebase from 'firebase'
export default {
 data(){
     return{
         members:[],
         requests:[],
         newreq:[],
     }
 }   ,
 methods:{
   cancelRequest(id,index){
  
    db.collection('users').doc(this.$store.state.uid).update({inRequests:firebase.firestore.FieldValue.arrayRemove(id)})
              this.requests.splice(index,1)

   },
   acceptRequest(id,index){
    db.collection('users').doc(this.$store.state.uid).update({friends:firebase.firestore.FieldValue.arrayUnion(id)}).then(()=>{
      db.collection('users').doc(this.$store.state.uid).update({inRequests:firebase.firestore.FieldValue.arrayRemove(id)}).then(()=>{
        db.collection('users').doc(id).update({friends:firebase.firestore.FieldValue.arrayUnion(this.$store.state.uid)}).then(()=>{
          this.requests.splice(index,1)
        })

      })
    })
     


   },

 
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
}
.disp{
  border: 1.5px gray solid;
}
</style>