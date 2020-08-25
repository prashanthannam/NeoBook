<template>
<div>
<nav>

  <v-snackbar
      v-model="snackbar"
    >
      Yayy! Post uploaded successfully

      <template v-slot:action="{ attrs }">
        <v-btn
          color="pink"
          text
          v-bind="attrs"
          @click="snackbar = false"
        >
          Close
        </v-btn>
      </template>
  </v-snackbar>
<v-app-bar dark fixed=""   class="appBar" >
    <v-layout row >
      <v-flex >
         <v-container class="">
            <v-row>
<v-icon dark v-if="$vuetify.breakpoint.name=='xs'  || $vuetify.breakpoint.name=='sm'  "  v-on:click="visible=!visible" class="">menu</v-icon>
    <v-toolbar-title  class=" ml-3">
      <div class="title" @click="backHome()">
        <span class="font-weight-light">NEO</span>
        <span class="font-weight-bold">BOOK</span>
      </div>
    </v-toolbar-title>            </v-row>
          </v-container>
         
      </v-flex>
    </v-layout>
    <v-spacer></v-spacer>
<v-row name="btns" class="d-flex justify-end" v-if="$vuetify.breakpoint.name!='xs' && $vuetify.breakpoint.name!='sm'" >
        <v-btn text  v-for="item in items" :key='item.title' class="mx-1 " depressed small router :to="item.route">
                <v-icon left  class="">{{item.icon}}</v-icon>
                {{item.title}}
        </v-btn>
<v-btn text class=" ml-4" depressed small @click="logout">
            <span>Logout</span>
            <v-icon right >mdi-power</v-icon>
        </v-btn>
</v-row>
<v-btn v-if="$vuetify.breakpoint.name=='xs' || $vuetify.breakpoint.name=='sm'" icon route to="/chat">
         <v-icon color="white">mdi-comment-text-outline</v-icon>
        
</v-btn>
    <v-menu v-model="up" offset-y class="d-flex justify-end" dark="" v-if="$vuetify.breakpoint.name=='xs' || $vuetify.breakpoint.name=='sm'">
      <template v-slot:activator="{ on, attrs }">
        <v-btn color="" dark icon v-bind="attrs" v-on="on">
           <v-icon v-if="!up"  color="white lighten-2">mdi-arrow-down-drop-circle-outline</v-icon>
           <v-icon v-if="up"  color="white lighten-2">mdi-arrow-up-drop-circle-outline</v-icon>

        </v-btn>
      </template>
      <v-list style="background-image:url('/vbn.jpg')">
        <v-list-item dark
          v-for="(item, index) in items"
          :key="index"
          router :to="item.route"
        >
         <v-icon  color="white" class="mr-1">{{item.icon}}</v-icon>
        
          <v-list-item-title class="white--text">{{ item.title }}</v-list-item-title>
        </v-list-item>
       
         <v-list-item
          @click="logout"
        >
         <v-icon  color="white" class="mr-1">mdi-power</v-icon>
        
          <v-list-item-title class="white--text pb-1">Log out</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
   
</v-app-bar>

</nav>
<v-navigation-drawer  v-model="visible" app class="drawer"  temporary="">
      <v-icon dark class="ml-2 mt-2"  v-on:click="visible=!visible">close</v-icon>
      <v-layout column wrap align-center="">
           <v-avatar size="180" color="grey">
                <v-img
                  :src='userDetails.profPic!=""? userDetails.profPic :"/male_defDP.png"'
                  style="object-fit:cover"
                  alt=""
                @click="$router.push('othersProfile/'+$store.state.uid)"
                ></v-img>
              </v-avatar>
              <p class="white--text mt-3 body-1">{{userDetails.uname}}</p>
         <popup @projectAdded="snackbar=true"></popup>

      <searchBar></searchBar>
      </v-layout>
  
</v-navigation-drawer>

</div>
</template>

<script>
import popup from '../views/popUp'
import firebase from 'firebase'
import searchBar from '../views/Search';
export default {
    components:{
popup,
searchBar
    },
    data(){
        return{
          up:false,
          searchShow:false,
            snackbar:false,
            visible:false,
            items:[
                
                {icon:'home',title:'Home',route:'/'},
                {icon:'person',title:'Profile',route:'/profile'},
                {icon:'people',title:'Friends',route:'/team'},
            ]
        }
    },
    methods:{
        screenWidth(){
          if(this.$vuetify.breakpoint.name!='xs' && this.$vuetify.breakpoint.name!='sm'){
            return true
          }
          else{
            return false
          }
      },
      backHome(){
        if(this.$router.currentRoute.name!='home'){
          this.$router.replace({path:'/'})
        }
      },
      logout(){
        firebase.auth().signOut().then(()=>{
          // this.$router.push('/login')
          this.$store.commit('changeUser',{ uname: '',
        email: '',
        profPic: '',
        gender: ''})
        })
        this.$router.replace('/')
      }
    },
    computed:{
    
       userDetails(){
        return this.$store.state;
      }
    },
    created(){
    }

}
</script>

<style scoped>
.v-avatar {
    border:1px solid grey;
}
.drawer{
  background-image: url('/vbanner.jpg');
}
.appBar{
  background-image: url('/vbn.jpg');
  background-size: cover;
}
.title:hover{
cursor: pointer;
}

</style>