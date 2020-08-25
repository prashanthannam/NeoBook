<template>
    <div class="px-1 pb-1"> 
    <v-card flat class='overflow-y-auto mt-2' >
   <v-text-field  type="text" placeholder="Search Users..." class=" pb-0 mb-0"
         label='' append-icon="mdi-account-search" @input="searchForUser" rounded   v-model="searchValue"  color></v-text-field>
        <v-list v-if="searchresArray.length!=0 && searchShow && searchValue!=''" max-width="229" class="pt-0" >
    <v-list-item v-for="(searchres,index) in searchresArray" :key="index" class="pa-0 mt-0 ">
        <v-list-item-avatar color="grey" class="ml-1 mr-1 my-0">
                     <v-img class="profImg" :src='searchres.profPic!=""?searchres.profPic:(searchres.gender!="male"?"/female_defDP.png":"/male_defDP.png")'
            @click="routeTo(searchres.id)">
            </v-img>            
        </v-list-item-avatar>
        <v-list-item-title class="">
                     <div class="grey--text body-1 text--darken-2 font-weight-bold text-si">
                   {{searchres.name}}
                  </div>
                  <div class="caption grey--text">
                   {{searchres.email}}
                  </div>
                    </v-list-item-title>
            <v-list-item-action >
                <v-btn  class="" small v-if="searchres.requested==false && searchres.accepted==false" @click="sendRequest(searchres.id,index)" icon >
                <v-icon>mdi-account-plus</v-icon>
            </v-btn>
            <v-btn small v-if="searchres.requested==true && searchres.accepted==false" @click="cancelRequest(searchres.id,index)" icon >
                <v-icon color="indigo">mdi-account-plus</v-icon>
            </v-btn>
            <v-btn small disabled icon v-if="searchres.requested==false && searchres.accepted==true">
            <v-icon >mdi-account-check</v-icon>
            </v-btn>
                        </v-list-item-action>
    </v-list-item>
            </v-list>

    </v-card>
    </div>
</template>

<script>
import db from '@/fb'
import firebase from 'firebase'
export default {
    data(){
        return{
            searchShow:false,
            searchValue:'',
            searchresArray:[],
            dummy:''
        }
    },
    methods:{
        routeTo(id){
            this.$router.push({path:'/othersProfile/'+id})
        },
        amIfriend(friends){
                if(friends.includes(this.$store.state.uid)){
                    return true
                }
                else{
                    return false
                }
        },
        searchForUser:function() {
              if(this.searchValue==''){
                  this.searchShow=false
                  this.searchresArray=[]
              }
                else{
            db.collection('users').where('name','>=',this.searchValue).where('name','<=',this.searchValue+ '\uf8ff').get().then((val)=>{
                // if(val.size!=0)
                    this.searchresArray=[]
                    val.docs.forEach(element => {
                        var ele=element.data()
                        if(ele.name!=this.$store.state.uname){
                        if(ele.inRequests.includes(this.$store.state.uid)){
                            ele.requested=true
                        }else{
                            ele.requested=false}
                        if(ele.friends.includes(this.$store.state.uid)){
                            ele.accepted=true
                        }else{
                            ele.accepted=false}
                            ele.id=element.id
                        this.searchresArray.push(ele)
                        }
                    });
                        this.searchShow=true

            })
                }
        },
        sendRequest:function(userID,index){
            this.searchresArray[index].requested=true
            db.collection('users').doc(userID).update({inRequests:firebase.firestore.FieldValue.arrayUnion(this.$store.state.uid)})
        },
        cancelRequest:function(userID,index){
            this.searchresArray[index].requested=false
            db.collection('users').doc(userID).update({inRequests:firebase.firestore.FieldValue.arrayRemove(this.$store.state.uid)})
        }
    }
}
</script>

<style scoped>
.profImg:hover{
cursor: pointer;
}
</style>