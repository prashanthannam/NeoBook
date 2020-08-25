<template>
  <v-app  >
   <toolbar class="toolBar" v-if="logged" ></toolbar>
   <nav v-if="!logged">
<v-toolbar  class="bar" >
    <v-toolbar-title class="white--text">
        <span class="font-weight-light">NEO</span>
        <span class="font-weight-bold">BOOK</span>
    </v-toolbar-title>
</v-toolbar>
   </nav>
   <v-main  class="grey lighten-3 main  pa-5">
<keep-alive v-if="logged" include="Home">
<router-view v-if="logged" class="mt-12"  ></router-view>
</keep-alive>
<login v-if="!logged"></login>
   </v-main>
  </v-app>
</template>

<script>
import toolbar from './components/toolbar'
import firebase from'firebase'
import login from  './views/login'
// import db from '@/fb'
export default {

  components: {
   toolbar,
   login
  },

  data: () => ({
    logged:false,
    //
  }),
  async mounted(){
    await firebase.auth().onAuthStateChanged(user =>  {
  if (user) {

this.logged=true
 } else {
    this.logged=false
  }
});
  }
};
</script>

<style>
#app{
  font-family:'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;

}
.bar{
  background-image: url('/vbn.jpg');
  background-size: cover;
}
.main{
  
}


</style>
