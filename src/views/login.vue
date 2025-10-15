<template>
  <div>
    <!-- component -->
<div class="flex h-screen page" >
  <!-- Left Pane -->
<div class=" lg:flex items-center justify-center flex-1 text-black">
  <div class="text-center overflow-y-auto px-6 py-2">
    
    <!-- Logo + App Name -->
    <p class="text-start text-teal-400 text-2xl font-bold flex items-center gap-2">
      <img src="../assets/sensor.png" alt="App Logo" class="w-10 h-10"> STRAIN
    </p>

    <!-- Header -->
    <div class="flex flex-col items-center justify-center mb-6">
      <h1 class="text-3xl font-bold text-white tracking-wide">Galamsey Monitoring & Tracking</h1>
      <p class="text-white/70 text-sm mt-1 italic">Powered by Proximity Sensor Intelligence</p>
    </div>

    <!-- Intro Section -->
    <div class="max-w-5xl mb-8 text-center mx-auto text-white">
      <p class="text-sm lg:text-base text-white/90 leading-relaxed">
        Illegal small-scale gold mining, known locally as <strong>galamsey</strong>, poses severe environmental, social, and economic threats to Ghana. 
        Rivers and forest reserves face devastation as illegal miners seek gold without regulation.  
        <br><br>
        The <strong>Galamsey Monitoring App</strong> integrates <strong>proximity sensors</strong> and GPS-based tracking to detect and monitor 
        illegal mining activities in real-time. It enables early detection, evidence collection, and data-driven decision-making 
        for sustainable enforcement and environmental protection.
      </p>
    </div>

    <!-- Grid Section -->
    <div class="flex flex-col lg:grid text-xs lg:gap-4 2xl:gap-6 lg:grid-cols-4 2xl:row-span-2 ml-2 pt-4">

      <!-- Card 1 -->
      <div class="bg-white/60 lg:order-1 lg:row-span-1 2xl:row-span-1 lg:col-span-3 rounded-lg shadow-xl mb-5 lg:mb-0 p-8 text-left backdrop-blur-sm">
        <h1 class="text-gray-900 text-xl font-semibold mb-1">Environmental & Economic Losses</h1>
        <p class="text-xs text-gray-600 mb-4 italic">
          Source: <a href="https://www.theguardian.com/world/2024/nov/25/polluted-rivers-taxes-ghana-illegal-gold-mining-boom" target="_blank" class="underline text-blue-700 hover:text-blue-900">The Guardian (2024)</a>
        </p>
        <p class="text-gray-800 leading-relaxed mb-4">
          Ghana loses over US$2 billion annually due to galamsey—covering lost tax revenue, farmland destruction, and polluted rivers. 
          The threat extends beyond economics, endangering food security and water supplies.
        </p>
        <a href="https://www.theguardian.com/world/2024/nov/25/polluted-rivers-taxes-ghana-illegal-gold-mining-boom" 
           target="_blank" 
           class="text-blue-700 underline hover:text-blue-900">Read More →</a>
      </div>

      <!-- Card 2 -->
      <div class="bg-white/60 lg:order-2 lg:row-span-1 2xl:row-span-1 lg:col-span-1 rounded-lg shadow-xl mb-5 lg:mb-0 p-8 text-left backdrop-blur-sm">
        <h1 class="text-gray-900 text-xl font-bold mb-1">Gold Price Surge & Galamsey Boom</h1>
        <p class="text-xs text-gray-600 mb-4 italic">
          Source: <a href="https://www.aljazeera.com/features/2025/1/22/as-gold-prices-surge-ghana-faces-looming-crisis-over-illegal-mining" target="_blank" class="underline text-blue-700 hover:text-blue-900">Al Jazeera (2025)</a>
        </p>
        <p class="text-gray-800 leading-relaxed mb-4">
          As gold prices soared globally in 2024, illegal mining in Ghana surged—spreading.
        </p>
        <a href="https://www.aljazeera.com/features/2025/1/22/as-gold-prices-surge-ghana-faces-looming-crisis-over-illegal-mining" 
           target="_blank" 
           class="text-blue-700 underline hover:text-blue-900">Read More →</a>
      </div>

      <!-- Card 3 -->
      <div class="bg-white/60 lg:order-3 lg:row-span-2 2xl:row-span-1 lg:col-span-2 rounded-lg shadow-xl mb-5 lg:mb-0 p-8 text-left backdrop-blur-sm">
        <h1 class="text-gray-900 text-xl font-bold mb-1">Strategies Beyond Enforcement</h1>
        <p class="text-xs text-gray-600 mb-4 italic">
          Source: <a href="https://www.modernghana.com/news/1440180/beyond-enforcement-tackling-galamsey-in-ghana.html" target="_blank" class="underline text-blue-700 hover:text-blue-900">Modern Ghana (2025)</a>
        </p>
        <p class="text-gray-800 leading-relaxed mb-4">
          Enforcement alone won’t solve galamsey. Proposals include community-based mining cooperatives, blockchain tracking systems, 
          and environmental bonds to rehabilitate mined lands while ensuring transparency.
        </p>
        <a href="https://www.modernghana.com/news/1440180/beyond-enforcement-tackling-galamsey-in-ghana.html" 
           target="_blank" 
           class="text-blue-700 underline hover:text-blue-900">Read More →</a>
      </div>

      <!-- Card 4 -->
      <div class="bg-white/60 lg:order-4 lg:row-span-2 2xl:row-span-1 col-span-2 rounded-lg shadow-xl mb-5 lg:mb-0 p-8 text-left backdrop-blur-sm">
        <h1 class="text-gray-900 text-xl font-semibold mb-1">Calls for License Revocations</h1>
        <p class="text-xs text-gray-600 mb-4 italic">
          Source: <a href="https://www.adomonline.com/galamsey-revoke-licenses-of-politically-exposed-persons-involved-tuc-to-govt/" target="_blank" class="underline text-blue-700 hover:text-blue-900">Adom Online (2025)</a>
        </p>
        <p class="text-gray-800 leading-relaxed mb-4">
          Ghana’s Trade Union Congress (TUC) urged government to revoke licenses of politically exposed persons involved in illegal mining, 
          citing deep-rooted corruption as a barrier to sustainable enforcement.
        </p>
        <a href="https://www.adomonline.com/galamsey-revoke-licenses-of-politically-exposed-persons-involved-tuc-to-govt/" 
           target="_blank" 
           class="text-blue-700 underline hover:text-blue-900">Read More →</a>
      </div>

    </div>
  </div>
</div>



  <!-- Right Pane -->
  <div class="w-full  lg:w-1/3 flex items-center justify-center" style="
       background-image: linear-gradient(to right, rgba(0, 0, 0, 0.532), rgba(255,255,255,0.95))
     ">
    <div class="max-w-md w-full p-6 bg-slate-100 rounded-3 shadow-md rounded-lg">
      <h1 class="text-3xl font-semibold mb-6 text-black text-center">Sign In</h1>
      <form @submit.prevent="login()" class="space-y-4">
        <div>
          <label for="username" class="block text-sm font-light text-gray-700">Username</label>
          <input type="text" id="username" v-model="creds.username" name="username" placeholder="johndoe" class="font-light text-gray-500 text-xs mt-1 pt-1 px-2 w-full border rounded-md focus:border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 transition-colors duration-300">
        </div>
        <div>
          <label for="password" class="block text-sm font-light text-gray-700">Password</label>
          <input type="password" id="password" name="password" v-model="creds.password" placeholder="******" class="font-light text-gray-500 text-xs mt-1 pt-1 px-2 w-full border rounded-md focus:border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 transition-colors duration-300">
        </div>
        <div>
          <button type="submit" class="w-full bg-black text-white py-1 px-2 rounded-md hover:bg-gray-800  focus:bg-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 transition-colors duration-300">Sign In</button>
        </div>
      </form>
      <div class="mt-4 text-xs text-gray-600 text-center">
        <p>Don't have an account? Please contact your administrator </p>
      </div>
    </div>
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