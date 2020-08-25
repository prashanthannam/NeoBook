<template>

<div >
  
  
<v-layout class='mt-2' row wrap justify-center="" align-center="">
<v-flex class='mt-2' xs12 sm8 md4 lg4 justify-center >
<v-card v-if="login"
     class="mt-5 ma-3" width="auto"
elevation="2"
  >
  <v-card-title primary-title class="grey--text justify-center">
      <p> <span class="h6 font-weight-light">NEO</span>
        <span class="h6 font-weight-bold">BOOK</span>
        <span class="h6" > Login</span>
        </p>
     
  </v-card-title>
    <v-card-text justify-center>
        
     <v-form>
         <v-text-field type="email" class=""
         label="Email" prepend-icon="mail"  v-model="email"  ></v-text-field>

         <v-text-field :type="show? 'text' :'password'" error-count="" placeholder="" class=""
         label="Password" prepend-icon="lock" :append-icon="show?'mdi-eye':'mdi-eye-off'" @click:append="show=!show" v-model="password"  color></v-text-field>
         <v-alert  v-if="erro!=''" type="error" class="pa-2" >
         The email address or phone number that you've entered doesn't match any account.
         </v-alert>
         
        <v-card-actions class="justify-end mr-3">
            <v-btn  elevation="" class="justify-end" color="success" @click="Signin" >
              <v-icon left color="">mdi-login-variant</v-icon>
               Login</v-btn>

        </v-card-actions> 
          <v-subheader class="link" cursor: hover @click="rou">Don't have an Account? Register</v-subheader>
     </v-form>
    </v-card-text>
    <v-card-actions>
      
    </v-card-actions>
  </v-card>
  <v-card v-if="!login"
    class="mt-1 ma-3" width="auto"
elevation="2"
  >
  <v-card-title primary-title class="grey--text justify-center">
      <p> <span class="h6 font-weight-light">NEO</span>
        <span class="h6 font-weight-bold">BOOK</span>
        <span class="h6"> Register</span>
        </p>
     
  </v-card-title>
    <v-card-text justify-center>
        
     <v-form>
         <v-text-field type="" error-count="" placeholder="" class=""
         label="UserName" prepend-icon="person"  v-model="uname"  color></v-text-field>

         <v-text-field type="email" error-count="" placeholder="" class=""
         label="Email" prepend-icon="mail"  v-model="email"  color></v-text-field>
             <v-layout row align-center class="pa-0">
                <h3 class="grey--text text--darken-2 ml-3 mb-5 font-weight-regular">Gender: </h3>
               
               <v-flex>
                 <v-radio-group class="ml-3 mt-0" row v-model="gender">
            <v-radio label="Male" value="male"></v-radio>
         <v-radio label="Female" value="female"></v-radio>
          </v-radio-group>
          </v-flex>
          
           </v-layout>
        
         

         <v-text-field :type="show? 'text' :'password'" error-count="" placeholder="" class=""
         label="Password" prepend-icon="lock" :append-icon="show?'mdi-eye':'mdi-eye-off'" @click:append="show=!show" v-model="password"  color></v-text-field>
        <v-card-actions class="justify-end mr-3">
                         <v-btn   elevation="" @click="register" class="justify-end" color="success">
                            <v-icon left color="">mdi-account-plus</v-icon>
                            Register</v-btn>

        </v-card-actions> 
          <v-subheader class="link" @click="rou">Have an account? Login</v-subheader>
     </v-form>
    </v-card-text>
    <v-card-actions>
      
    </v-card-actions>
  </v-card>
  </v-flex>
  </v-layout>
  </div>
</template>

<script>
import firebase from 'firebase'

export default {
    data(){
        return{
            uname:'',
            email:'',
            password:'',
            show:false,
            gender:'',
            login:true,
            erro:false,
        }
    },
    methods:{
        rou:function(){
            this.login=!this.login
        },
        error(){
          this.erro=true
        },
          Signin:async function(){
                console.log(this.erro)
                
                firebase.auth().signInWithEmailAndPassword(this.email, this.password).then((user) => {
                this.$store.dispatch('Login',user)
                // this.$router.push('/')
                }).catch(()=>{
                  this.erro=true
                  console.log('error',this.erro)
                })
    },
    register:function(){
            
                const user={name:this.uname,
                email:this.email,
                password:this.password,
                gender:this.gender}
                this.$store.dispatch('Register',user)
                
           
        }
}
}
</script>

<style scoped>
.link:hover{
cursor: pointer;
}
</style>