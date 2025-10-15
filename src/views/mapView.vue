<template>
  <div class="relative">
    <div ref="map" class="h-screen"></div>
    <button class="bg-gray-800 text-gray-100 leaflet-control absolute top-2 right-3 p-1 rounded-md shadow-md" @click="getLocation"><i class="fa-solid fa-arrows-to-circle"></i></button>
  </div>
  
</template>

<script>
import L from 'leaflet';
//  import WS from '../services/websocket';
 import axios from 'axios'

export default {
  emits:['newMarker'],
  props:{
    forceGet:Boolean
  },
  data() {
    return {
      token: null,
      map: null,
      setLng: '',
      setLat: '',
      connection: null,
      customIcon: null,
      marker: null,
      circleOptions:null,
      clients:[]
    };
  },
  mounted() {
    this.token = this.getCookie('token')
    if(!this.token) this.$router.push({name: 'login'})
    this.lunchWebSocket()

        if (!this.map) {
        this.map = L.map(this.$refs.map).setView([8.086976, -1.284485], 7);

        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        }).addTo(this.map);

        this.map.on('click', this.newMarker);
    }

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 9,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(this.map);

    this.map.on('click', this.newMarker);

    this.customIcon = L.icon({
      iconSize: [42, 42],
      iconAnchor: [16, 32],
      popupAnchor: [0, -32],
    });


    this.circleOptions = {
        color: 'green',
        fillColor: 'green',
        fillOpacity: 0.5,
        radius: 20
    }


    this.getClients();

  },

  methods: {
    getClients() {
      axios.get('http://localhost:3000/api/clients', { headers:{'Authorization': `Bearer ${this.token}`}})
        .then((response) => {
          this.clients = response.data;
          this.clients.forEach((client) => {
            const [lat, lng] = client.coordinates.split(',').map(parseFloat);
            // this.customIcon.options.iconUrl = new URL(`../assets/bin-${this.getThreshold(client.remark)}.png`, import.meta.url).href;
            // const marker = L.marker([lat, lng], { icon: this.customIcon }).addTo(this.map);
            this.circleOptions.color = this.getThreshold(client.remark)
             this.circleOptions.fillColor = this.getThreshold(client.remark)
            const marker = L.circleMarker([lat, lng], this.circleOptions).addTo(this.map);

            marker.bindPopup(`<b>${client.name}</b><br>${client.level}% ${client.remark}` ).openPopup();
          });
        })
        .catch((err) => {
          console.error(err);
        });
    },
    getLocation() {
      if (navigator.geolocation) {
        navigator.geolocation.watchPosition((position) => {
          this.setLat = position.coords.latitude;
          this.setLng = position.coords.longitude;
          this.map.setView([8.086976, -1.284485], 7);
        });
      }
    },
    getThreshold(level) {
      if (level === 'HIGH') {
        return 'red';
      } else if (level === 'MID') {
        return 'yellow';
      } else {
        return 'green';
      }
    },
    newMarker(event){
      const latlng = event.latlng;

      if (this.marker) {
        this.map.removeLayer(this.marker);
      }
      this.customIcon.options.iconUrl = new URL(`../assets/bin-outline.png`, import.meta.url).href;
      // this.marker = L.marker(latlng, { icon: this.customIcon }).addTo(this.map);
      this.marker = L.marker(latlng).addTo(this.map);
      this.$emit('newMarker', latlng)
      console.log('New marker added at:', latlng);
    },
    lunchWebSocket() {
        const WS = new WebSocket('ws://localhost:3000');

        console.log("Starting connection to WebSocket Server");
        WS.onopen = (event) => {
          console.log("Successfully connected to the echo WebSocket server...");
        };

        WS.onmessage = (event) => {
          const jsonString = event.data;
          const newData = JSON.parse(jsonString);
          const foundClient = this.clients.findIndex(client => client.id === newData.id);
          this.clients[foundClient] = newData;
          console.log(newData)
          
          const [lat, lng] = this.clients[foundClient].coordinates.split(',').map(parseFloat);
          // this.customIcon.options.iconUrl = new URL(`../assets/bin-${this.getThreshold(this.clients[foundClient].remark)}.png`, import.meta.url).href;
          // const marker = L.marker([lat, lng], { icon: this.customIcon }).addTo(this.map);

          this.circleOptions.color = this.getThreshold(this.clients[foundClient].remark)
          this.circleOptions.fillColor = this.getThreshold(this.clients[foundClient].remark)
          const marker = L.circleMarker([lat, lng], this.circleOptions).addTo(this.map);
          marker.bindPopup(`<b>${this.clients[foundClient].name}</b><br>${this.clients[foundClient].level}% ${this.clients[foundClient].remark}` ).openPopup();
          
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
  /* You can add styles for your map container here if needed */
</style>
