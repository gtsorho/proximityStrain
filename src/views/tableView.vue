<template>
  <div>

<section class="py-1 bg-blueGray-50">
<div class="w-full xl:w-8/12 mb-12 xl:mb-0 px-4 mx-auto mt-24">
  <div class="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded ">
    <div class="rounded-t mb-0 px-4 py-3 border-0">
      <div class="flex flex-wrap items-center">
        <div class="relative w-full px-4 max-w-full flex-grow flex-1">
          <i class="fas mr-4 fa-arrow-left hover:bg-slate-200 rounded-full p-1 border-black inline text-black" @click="showRecord = false" v-if="showRecord"></i>
          <h3 class="font-semibold inline text-base text-blueGray-700">Summary</h3>
        </div>
      </div>
    </div>

    <div class="block w-full overflow-x-auto" v-if="!showRecord">
      <table class="items-center bg-transparent w-full border-collapse ">
        <thead>
          <tr class="hover:bg-gray-200">
            <th class="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">Owner</th>
            <th class="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">location</th>
            <th class="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">Quantity</th>
            <th class="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">Remark</th>
            <th class="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">Actions</th>
          </tr>
        </thead>

        <tbody>
          <tr class="hover:bg-gray-200 cursor-pointer" @click="getRecord(client.id)" v-for="(client, i) in clients" :key="i" >
            <th class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left text-blueGray-700 ">{{client.name}}</th>
            <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 ">{{ client.location }}</td>
            <td class="border-t-0 px-6 align-center border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
              <i class="fas mr-4" :class="client.level <= 20 ? 'fa-arrow-down text-emerald-500': 'fa-arrow-up text-red-500'"></i>
              {{ client.level }}
            </td>
            <td class="border-t-0 px-6 align-middle  border-l-0 border-r-0 text-xs whitespace-nowrap p-4"><p class="px-5 py-1 text-center uppercase rounded-md w-32 "  :class="getThreshold(client.level)" > {{ client.remark }}</p></td>
            <td class="border-t-0 px-6 align-center border-l-0 border-r-0 text-xs whitespace-nowrap p-4"> <button class="px-5 py-1 text-center border hover:bg-blue-950 hover:text-white border-blue-950 uppercase rounded-md w-32" @click="editOrDelete(client)"> <i class="fa-solid text-lg  fa-pen-nib"></i></button> </td>
          </tr> 
        </tbody>
      </table>
    </div>

    <div class="block w-full overflow-x-auto h-96" v-else>
      <p class="text-sm text-grey-200 py-5">This page verifies whether or not a waste bin has been emptied</p>
      <table class="items-center bg-transparent w-full  border-collapse ">
        <thead>
          <tr class="hover:bg-gray-200">
            <th class="px-6 bg-blueGray-50 text-blueGray-500 align-middle text-center border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold ">{{record.name}} @ {{record.location}}</th>
            <th class="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-center">Date/Time</th>
            <th class="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-center">Level</th>
            <th class="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-center">Verified/Reported</th>
          </tr>
        </thead>

        <tbody class="">
          <tr class="hover:bg-gray-200" v-for="(log, i) in record.records" :key="i">
            <td class="border-t-0 px-6 text-center align-middle border-l-0 border-r-0 ">
              <i class="bi bi-check2-all text-green-500 text-xl"></i>
            </td>
            <td class="border-t-0 px-6 align-center text-center border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
              {{ log.updatedAt }}
            </td>
            <td class="border-t-0 px-6 align-middle text-center border-l-0 border-r-0 text-xs whitespace-nowrap p-4 ">{{ log.level }}</td>
            <td class="border-t-0 px-6 align-middle text-center border-l-0 border-r-0 text-xs whitespace-nowrap p-4"><button @click="verifyRecord(log.id,record.id, log.isVerified)" class="px-5 py-1 text-center uppercase rounded-md w-32 " :class="!log.isVerified ? ' bg-red-300': ' bg-emerald-300'"> {{ !log.isVerified ? 'Not Verified': 'Verified' }}</button></td>
          </tr>         
        </tbody>
      </table>
    </div>
  </div>
</div>
</section>
  </div>
</template>

<script>
 import axios from 'axios'
export default {
  emits:['editOrDelete'],
  props:{
    forceGet:Boolean
  },
  data() {
    return {
      connection: null,
      showRecord:false,
      clients:[],
      record:{},
      token:null
    };
  },
  created(){
    this.emitter.on("clientChange", () => {
      this.getClients()
      this.showRecord = false
    });
    this.emitter.on("goBack", () => {
      this.showRecord = false
    });
  },
  mounted() {
    this.token = this.getCookie('token')
    if(!this.token) this.$router.push({name: 'login'})
    this.lunchWebSocket()

    this.getClients();
  },
  methods: {
    getClients() {
      axios.get('https://proximitytest-proximitytestapp-zjuwao-73d29c-5-182-33-208.traefik.me/api/clients' , { headers:{'Authorization': `Bearer ${this.token}`}})
        .then((response) => {
          this.clients = response.data;
        })
        .catch((err) => {
          console.error(err);
        });
    },
    getRecord(id) {
      this.showRecord = true
      axios.get('https://proximitytest-proximitytestapp-zjuwao-73d29c-5-182-33-208.traefik.me/api/records/'+ id, { headers:{'Authorization': `Bearer ${this.token}`}})
        .then((response) => {
          this.record = response.data;
        })
        .catch((err) => {
          console.error(err);
        });
    },
    verifyRecord(id, clientId, verified) {
      if(!verified){
        axios.post('https://proximitytest-proximitytestapp-zjuwao-73d29c-5-182-33-208.traefik.me/api/record/update/'+ id,{}, { headers:{'Authorization': `Bearer ${this.token}`}})
        .then((response) => {
          this.getRecord(clientId)
        })
        .catch((err) => {
          console.error(err);
        });
      }
    },
    getThreshold(level) {
      if (level <= 20) {
        return 'bg-emerald-300';
      } else if (level > 20 && level < 80) {
        return 'bg-yellow-300';
      } else {
        return  'bg-red-300'
      }
    },
    editOrDelete(client){
      this.emitter.emit('editOrDelete', JSON.stringify(client));
    },
    lunchWebSocket() {
        const WS = new WebSocket('wss://proximitytest-proximitytestapp-zjuwao-73d29c-5-182-33-208.traefik.me');
        console.log("Starting connection to WebSocket Server");
        

        WS.onopen = (event) => {
          console.log("Successfully connected to the echo WebSocket server...");
        };

        WS.onmessage = (event) => {
          // const jsonString = event.data;
          // const newData = JSON.parse(jsonString);
          // this.clients = newData;
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
  },
   watch:{
    forceGet(newVal, oldVal){
      if(newVal != oldVal){
        this.getClients()
      }
    }
  }
};
</script>
<style>
  
</style>
