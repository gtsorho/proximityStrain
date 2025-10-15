<template>
  <Navbar @clientSubmitted="forceGetClients = true"   :coordinates="coordinates"  :notifications="notifications" />
  <RouterView :forceGet="forceGetClients" @newMarker="passCord" />
  
</template>

<script>
import Navbar from '@/components/Navbar.vue'
import axios from 'axios'


  export default{
    components:{
    Navbar
  },
  data() {
    return {
    notifications: [],
    forceGetClients: false,
    coordinates:null,
    token: null,
    clientData:null
    }
  },
  mounted(){
    
    this.token = this.getCookie('token')
    if(!this.token) this.$router.push({name: 'login'})

    this.getClients()
    this.lunchWebSocket()
  },
  methods:{

    getClients() {
      axios.get('https://proximitytest-proximitytestapp-zjuwao-73d29c-5-182-33-208.traefik.me/api/clients', { headers:{'Authorization': `Bearer ${this.token}`}})
        .then((response) => {
          const clients = response.data;
          clients.forEach(client => {
            if (client.level >= 80) {
              this.notifications.push(client);
            }
          });
        })
        .catch((err) => {
          console.error(err);
        });
      },
      passCord(data){
        this.coordinates = data
      },
      lunchWebSocket() {
         const WS = new WebSocket('wss://proximitytest-proximitytestapp-zjuwao-73d29c-5-182-33-208.traefik.me');
        console.log("Starting connection to WebSocket Server");
        WS.onopen = (event) => {
          console.log("Successfully connected to the echo WebSocket server...");
        };

        WS.onmessage = (event) => {
          const jsonString = event.data;
          const newData = JSON.parse(jsonString);
          this.clients = newData;
          this.getClients()
        };

        WS.onclose = (event) => {
          console.log("WebSocket connection closed:", event);
        };
    },
    getCookie(cname){
      let name = cname + "=";
      let ca = document.cookie.split(';');
      for(let i = 0; i < ca.length; i++) {
          let c = ca[i];
          while (c.charAt(0) == ' ') {
          c = c.substring(1);
          }
          if (c.indexOf(name) == 0) {
          return c.substring(name.length, c.length);
          }
      }
      return "";
    },
  }
}
</script>
<style scoped>
</style>
