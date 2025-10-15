<template>
  <div class="flex flex-col lg:flex-row h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-700 text-white overflow-hidden">
    
    <!-- Left Pane -->
    <div class="flex-1 flex flex-col items-center justify-center px-6 py-10 overflow-y-auto backdrop-blur-sm">
      <!-- Logo -->
      <div class="flex items-center justify-start w-full max-w-5xl mb-8">
        <img src="../assets/sensor.png" alt="App Logo" class="w-10 h-10 mr-2" />
        <h1 class="text-2xl font-bold text-teal-400 tracking-wide">STRAIN</h1>
      </div>

      <!-- Header -->
      <div class="text-center max-w-2xl mb-6">
        <h1 class="text-3xl md:text-4xl font-extrabold text-white mb-2 tracking-wide">Galamsey Monitoring & Tracking</h1>
        <p class="text-gray-300 text-sm italic">Powered by Proximity Sensor Intelligence</p>
      </div>

      <!-- Description -->
      <div class="max-w-3xl text-center mb-10 text-gray-200 leading-relaxed text-sm md:text-base">
        <p>
          Illegal small-scale gold mining, known locally as 
          <strong class="text-teal-400">galamsey</strong>, poses severe environmental, social, and economic threats to Ghana. 
          <br /><br />
          The <strong>Galamsey Monitoring App</strong> integrates 
          <strong>proximity sensors</strong> and <strong>GPS-based tracking</strong> to detect and monitor illegal mining activities in real time.
          It enables early detection, evidence collection, and data-driven decision-making for sustainable enforcement and environmental protection.
        </p>
      </div>

      <!-- Info Cards -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-5xl px-2">

        <!-- Card 1 -->
        <div class="bg-white/10 hover:bg-white/20 p-6 rounded-2xl shadow-md transition duration-300 ease-in-out">
          <h2 class="text-lg font-semibold text-teal-300 mb-1">Environmental & Economic Losses</h2>
          <p class="text-xs text-gray-400 italic mb-2">
            Source: <a href="https://www.theguardian.com/world/2024/nov/25/polluted-rivers-taxes-ghana-illegal-gold-mining-boom" target="_blank" class="underline hover:text-teal-400">The Guardian (2024)</a>
          </p>
          <p class="text-gray-200 text-sm leading-relaxed">
            Ghana loses over <strong>$2 billion annually</strong> due to galamsey — from lost tax revenue, destroyed farmland, and polluted rivers. The damage endangers both food security and water supply.
          </p>
        </div>

        <!-- Card 2 -->
        <div class="bg-white/10 hover:bg-white/20 p-6 rounded-2xl shadow-md transition duration-300 ease-in-out">
          <h2 class="text-lg font-semibold text-yellow-300 mb-1">Gold Price Surge & Galamsey Boom</h2>
          <p class="text-xs text-gray-400 italic mb-2">
            Source: <a href="https://www.aljazeera.com/features/2025/1/22/as-gold-prices-surge-ghana-faces-looming-crisis-over-illegal-mining" target="_blank" class="underline hover:text-yellow-300">Al Jazeera (2025)</a>
          </p>
          <p class="text-gray-200 text-sm leading-relaxed">
            As global gold prices soared in 2024, illegal mining operations in Ghana expanded rapidly — deepening environmental and economic vulnerabilities.
          </p>
        </div>

        <!-- Card 3 -->
        <div class="bg-white/10 hover:bg-white/20 p-6 rounded-2xl shadow-md transition duration-300 ease-in-out">
          <h2 class="text-lg font-semibold text-sky-300 mb-1">Beyond Enforcement</h2>
          <p class="text-xs text-gray-400 italic mb-2">
            Source: <a href="https://www.modernghana.com/news/1440180/beyond-enforcement-tackling-galamsey-in-ghana.html" target="_blank" class="underline hover:text-sky-300">Modern Ghana (2025)</a>
          </p>
          <p class="text-gray-200 text-sm leading-relaxed">
            Experts call for community-based mining cooperatives, blockchain tracking, and environmental bonds to ensure accountability and rehabilitation.
          </p>
        </div>

      </div>
    </div>

    <!-- Right Pane -->
    <div class="w-full lg:w-1/3 flex items-center justify-center bg-white text-gray-800 px-6 py-10 shadow-2xl">
      <div class="w-full max-w-sm bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
        <h1 class="text-3xl font-semibold mb-6 text-center text-gray-900">Sign In</h1>

        <form @submit.prevent="login" class="space-y-4">
          <div>
            <label for="username" class="block text-sm font-medium text-gray-700 mb-1">Username</label>
            <input
              id="username"
              v-model="creds.username"
              type="text"
              placeholder="e.g. johndoe"
              class="w-full px-3 py-2 text-sm border rounded-md focus:ring-2 focus:ring-teal-500 focus:outline-none transition"
            />
          </div>

          <div>
            <label for="password" class="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input
              id="password"
              v-model="creds.password"
              type="password"
              placeholder="••••••"
              class="w-full px-3 py-2 text-sm border rounded-md focus:ring-2 focus:ring-teal-500 focus:outline-none transition"
            />
          </div>

          <button
            type="submit"
            class="w-full py-2 mt-4 bg-teal-600 text-white rounded-md hover:bg-teal-700 transition font-medium"
          >
            Sign In
          </button>
        </form>

        <p class="text-xs text-center text-gray-500 mt-4">
          Don’t have an account? <br />
          <span class="text-gray-700 font-medium">Contact your administrator</span>
        </p>
      </div>
    </div>
  </div>
</template>
<script>
import axios from 'axios';

export default {
  data() {
    return {
      creds:{
        username:'',
        password:''
      }
    };
  },    
  methods:{
        login(){
          
            axios.post('https://proximitytest-proximitytestapp-zjuwao-73d29c-5-182-33-208.traefik.me/api/auth', this.creds,
            )
            .then((response) => {
                this.setCookie('token', response.data.token)
                this.$router.push({name: 'map'})
            })
            .catch((error) => {
				this.msg = error.response.data
				this.msgColor = 'text-danger'
				setInterval(() => {
					this.msg = ''
					this.msgColor = null
				}, 5000);
                // console.log(error);
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
        },
        setCookie(cname, cvalue, exdays) {
          const d = new Date();
          d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
          let expires = "expires=" + d.toUTCString();
          document.cookie = cname + "=" + cvalue + ";"+ expires + ";path=/";
        },
    },
}
</script>
<style >
  .leaflet-div-icon {
    border: none;
    background: transparent;
}
.page{
  background-image: linear-gradient(to right, rgba(0, 0, 0, 0.603), rgba(255, 255, 255, 0.432)), 
                         url('../assets/08-galamsey-ghana-gold-chocolate.png');
  background-size: cover;
  background-repeat: no-repeat;
}
</style>
