<template>
<div>

      <p class="text-red-600 text-xs mb-5 italic"><i class="fas fa-exclamation-triangle mx-2 "></i> If you haven't already, select a location on the map then come back here</p>

    <form class="w-full" @submit.prevent="createClient()">

    <div class="flex flex-wrap -mx-3 mb-0">
      <div class="w-full md:w-1/2 px-3 mb-0 md:mb-0">
        <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name">Sensor Tag</label>
        <input required v-model="client.name" class=" text-sm block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-1 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-first-name" type="text" placeholder="Brim East 0A8">
      </div>
      <div class="w-full md:w-1/2 px-3">
        <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-last-name">Location</label>
        <input required v-model="client.location" class=" text-sm block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-1 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-last-name" type="text" placeholder="Brim">
      </div>
    </div>
    <div class="flex flex-wrap -mx-3 mb-0">
      <div class="w-full px-3">
        <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-password">Coordinates</label>
        <input required v-model="client.coordinates" class=" text-sm block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-1 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-password" type="text" placeholder="-211556, 511126">
      </div>
    </div>
    <div class="flex flex-wrap -mx-3 mb-2">
      <div class="w-full md:w-1/2 px-3 mb-0 md:mb-0">
       <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-city">Supervisor</label>
      <select v-model="client.user" class=" block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-1 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
        <option value="default" >Select a Supervisor</option>
        <option v-for="(user, i) in users" :key="i" :value="user.id" >{{user.username}}</option>
      </select>  
      </div>
      <div class="w-full md:w-1/2 px-3 mb-0 md:mb-0">
        <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-zip"> Status</label>
        <input class=" text-sm block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-1 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-zip" disabled type="text" placeholder="LOW">
      </div>
    </div>
    <div class="bg-gray-50 px-4 py-1 sm:px-6 flex align-items justify-end p-4 gap-4 flex-row">
        <button v-if="!isUpdate"  type="submit" class="inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-1 bg-black text-base font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400  sm:w-auto text-sm"> Add Client </button>
        <div  v-else>
          <button type="button" @click="deleteClient()" class="inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 mx-2 py-1 bg-red-500 text-base font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2  focus:ring-gray-400  sm:w-auto text-sm"><i class="fa-solid fa-trash"></i> </button>
          <button type="button" @click="updateClient()"  class="inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-1 bg-black text-base font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400  sm:w-auto text-sm"> Update {{client.name}} </button>
        </div>
    </div>
    </form>
</div>

</template>

<script>
import axios from 'axios';

export default {
  emits:['clientCreated'],
  props:{
    coordinates:Object,
    clientData:String
  },
  data() {
    return {
      users:[],
      isUpdate :false,
      client:{
        name:'',
        location:'',      
        user:'default',
        coordinates: this.coordinates ? `${this.coordinates.lat},${this.coordinates.lng}` : '0,0',
        // phone:'',
      }
    };
  },
  created(){
    this.getUsers()
    if(this.clientData){
      let client = JSON.parse(this.clientData)
      this.client = client
      this.client.user = client.UserId
      this.isUpdate = true
    }

  },  
  methods: {
    createClient() {
      let token = this.getCookie('token')
      axios.post('https://proximitytest-proximitytestapp-zjuwao-73d29c-5-182-33-208.traefik.me/api/clients', this.client, { headers:{'Authorization': `Bearer ${token}`}})
        .then((response) => {
          this.clients = response.data;
          this.emitter.emit('clientChange');
        })
        .catch((err) => {
          console.error(err);
        });
    },
    updateClient() {
      let token = this.getCookie('token')
      axios.put('https://proximitytest-proximitytestapp-zjuwao-73d29c-5-182-33-208.traefik.me/api/clients/update/' + this.client.id, this.client, { headers:{'Authorization': `Bearer ${token}`}})
      .then((response) => {
        this.clients = response.data;
              this.emitter.emit('clientChange');
      })
      .catch((err) => {
        console.error(err);
      });
    },
    deleteClient() {
      let token = this.getCookie('token')
      axios.delete('https://proximitytest-proximitytestapp-zjuwao-73d29c-5-182-33-208.traefik.me/api/delete/clients/'+ this.client.id, { headers:{'Authorization': `Bearer ${token}`}})
        .then((response) => {
                this.emitter.emit('clientChange');
        })
        .catch((err) => {
          console.error(err);
        });
    },
    getUsers() {
      let token = this.getCookie('token')
      axios.get('https://proximitytest-proximitytestapp-zjuwao-73d29c-5-182-33-208.traefik.me/api/users', { headers:{'Authorization': `Bearer ${token}`}})
        .then((response) => {
          this.users = response.data;
        })
        .catch((err) => {
          console.error(err);
        });
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
    }
  },
};
</script>

<style scoped>

</style>
