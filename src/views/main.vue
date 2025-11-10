<template>
  <Navbar @clientSubmitted="forceGetClients = true"   :coordinates="coordinates"  :notifications="notifications" />
  <RouterView :forceGet="forceGetClients" @newMarker="passCord" @clientSelected="onClientSelected" />
  
  <!-- Left timeline drawer -->
  <transition name="drawer">
    <div v-if="showTimeline && record && record.records && record.records.length"
         class="fixed top-16 left-0 w-96 max-w-full h-[calc(100vh-4rem)] bg-white shadow-xl border-r overflow-y-auto z-[1000]">
      <div class="p-6 border-b flex items-center justify-between">
        <h4 class="text-lg font-bold text-gray-900">Activity log</h4>
        <button class="text-gray-500 hover:text-gray-800" @click="showTimeline=false">
          <i class="fa-solid fa-xmark"></i>
        </button>
      </div>
      <div class="p-6">
        <p class="text-sm text-gray-600 mb-3">{{ record.name }} @ {{ record.location }}</p>
        <div class="relative px-4">
          <div class="absolute h-full border border-dashed border-opacity-20 border-secondary"></div>

          <div class="flex items-center w-full my-6 -ml-1.5" v-for="(log, i) in record.records" :key="log.id || i">
            <div class="w-1/12 z-10">
              <div class="w-3.5 h-3.5 rounded-full" :class="log.isVerified ? 'bg-emerald-500' : 'bg-blue-600'"></div>
            </div>
            <div class="w-11/12">
              <p class="text-sm">Level {{ log.level }} - {{ log.isVerified ? 'Verified' : 'Reported' }}</p>
              <p class="text-xs text-gray-500">{{ formatDateTime(log.updatedAt) }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </transition>
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
    clientData:null,
    record: null,
    selectedClientId: null,
    showTimeline: false
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
      onClientSelected(id){
        this.selectedClientId = id
        this.getRecord(id)
        this.showTimeline = true
      },
      formatDateTime(ts){
        try{
          const d = new Date(ts)
          if(isNaN(d)) return ts
          return new Intl.DateTimeFormat(undefined, { dateStyle: 'medium', timeStyle: 'short' }).format(d)
        }catch(e){
          return ts
        }
      },
      getRecord(id) {
        axios.get('https://proximitytest-proximitytestapp-zjuwao-73d29c-5-182-33-208.traefik.me/api/records/'+ id, { headers:{'Authorization': `Bearer ${this.token}`}})
          .then((response) => {
            this.record = response.data;
          })
          .catch((err) => {
            console.error(err);
          });
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
.drawer-enter-from,
.drawer-leave-to {
  transform: translateX(-100%);
  opacity: 0;
}
.drawer-enter-active,
.drawer-leave-active {
  transition: all 250ms ease;
}
.drawer-enter-to,
.drawer-leave-from {
  transform: translateX(0%);
  opacity: 1;
}
</style>
