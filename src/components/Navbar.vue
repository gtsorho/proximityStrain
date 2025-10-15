<template >
<nav class="bg-gray-800">
  <div class="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
    <div class="relative flex h-16 items-center justify-between">
      <div class="absolute inset-y-0 left-0 flex items-center sm:hidden">
        <!-- Mobile menu button-->
        <button type="button" class="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white" aria-controls="mobile-menu" aria-expanded="false">
          <span class="absolute -inset-0.5"></span>
          <span class="sr-only">Open main menu</span>

          <svg class="hidden h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      <div class="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
        <div class="flex flex-shrink-0 items-center">
        </div>
        <div class="sm:ml-6 sm:block">
          <div class="flex space-x-4">
              <RouterLink :to="{name: 'map'}" :class="$route.name == 'map' ? 'bg-gray-700' : ''" class="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium">Map</RouterLink>
              <RouterLink :to="{name: 'table'}" :class="$route.name == 'table' ? 'bg-gray-700' : ''" class="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium">Detail</RouterLink>
          </div>
        </div>
      </div>
        <div class="relative ml-3">
          <div>
          <button type="button" @click="showDropdown = !showDropdown" class="relative rounded-full bg-gray-800 p-1" :class="notifications.length > 0 ? ' text-red-300 hover:text-red-200 ring-red-300 hover:ring-red-200 ring' : ' text-gray-400 hover:text-white ring-gray-400 hover:ring-white ring' ">
          <span class="absolute -inset-1.5"></span>
          <span class="sr-only">View notifications</span>
          <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
          </svg>
        </button>
          </div>
          <div v-if="showDropdown" class="absolute leaflet-control right-0 z-10 mt-0 w-[3in] origin-top-right rounded-md  bg-white py-1 px-2 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" style="z-index:1000" role="menu" aria-orientation="vertical" aria-labelledby="user-menu-button" tabindex="-1">
            <a href="#" @click="showDropdown = !showDropdown" class="block px-4 py-2 text-xs hover:bg-gray-200 my-1 border border-1 border-red-100 text-gray-700" role="menuitem" tabindex="-1" id="user-menu-item-0" v-for="(notification, i) in notifications" :key="i">
              {{`Sensor ${notification.name} at ${notification.location} recorded HIGH strain`}}
              </a>
          </div>
        </div>
        <div class="flex justify-between items-center">
          <button @click="showModal" class="rounded-full mx-4 p-1  text-gray-400 hover:text-white ring-gray-400 hover:ring-white ring">
            <i class=" px-1  text-white text-xl fas fa-plus-circle "></i
            ></button>
          <div>
            <button class="px-2 rounded-md bg-red-500 hover:bg-red-400  text-white" @click="logout()">Logout</button>
          </div>
        </div>
    </div>
  </div>
</nav>
 <!-- Modal and backdrop -->
<transition name="modal-fade">
<!-- component -->
<div class="font-sans bg-gray-100 flex items-center justify-center h-screen" v-if="isModalVisible">
  <div>
    <div class="fixed z-10 inset-0 flex items-center justify-center">
      <div class="absolute inset-0 bg-gray-500 opacity-75"></div>
      <div class="relative bg-white rounded-lg overflow-hidden shadow-xl max-w-screen-md w-full m-4" x-transition:enter="transition ease-out duration-300 transform opacity-0 scale-95" x-transition:enter-start="opacity-0 scale-95" x-transition:enter-end="opacity-100 scale-100" x-transition:leave="transition ease-in duration-200 transform opacity-100 scale-100" x-transition:leave-start="opacity-100 scale-100" x-transition:leave-end="opacity-0 scale-95" x-cloak>
        <!-- Modal panel -->
        <div class="px-6 py-4 flex justify-between">
          <h3 class="text-lg leading-6 font-medium text-gray-900"> New Customer </h3>
          <div>
            <i style='font-size:20px' class='fas cursor-pointer text-red-700 hover:text-red-400' @click="hideModal">&#xf00d;</i>
          </div>
        </div>
        <div class="prose max-w-screen-md p-6 overflow-y-auto" style="max-height: 70vh; background-color: #fff; border: 1px solid #e2e8f0; border-radius: 0.375rem; box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1);">
          <Form @clientCreated="clientCreated()" :clientData="clientData" :coordinates="coordinates"></Form>
        </div>
      </div>
    </div>
  </div>
</div>
</transition>    
</template>
<script>
import Form from './form.vue'
export default {
  emits:['clientSubmitted','client-data-changed'],
  components:{
    Form
  },
  props:{
    notifications : Array,
    coordinates:Object,
  },
  data() {
    return {
      isModalVisible: false,
      showDropdown: false,
      clientData:null,
      isUpdate:false,
    }
  },
  created(){
    this.emitter.on("clientChange", () => {
      this.isModalVisible = false
    });

    this.emitter.on("editOrDelete", (data) => {
      this.clientData = data
      this.isModalVisible = true
    });

  },
  mounted(){
    console.log(this.notifications)
  },
  methods:{
    logout(){
      this.setCookie('token', null)
      this.$router.push({name: 'login'})   
    },
    showModal() {
      this.isModalVisible = true;
    },
    hideModal() {
      this.isModalVisible = false;
      this.clientData = null
      this.emitter.emit('goBack');
    },
    clientCreated(){
      this.$emit('clientSubmitted')
      this.isModalVisible = false
    },
    setCookie(cname, cvalue, exdays) {
      const d = new Date();
      d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
      let expires = "expires=" + d.toUTCString();
      document.cookie = cname + "=" + cvalue + ";"+ expires + ";path=/";
    },
  }

}
</script>
<style>
    /* Custom styles for the modal transition */
.modal-fade-enter-active, .modal-fade-leave-active {
  transition: opacity 0.3s ease-out;
}
.modal-fade-enter-from, .modal-fade-leave-to {
  opacity: 0;
}
.modal-fade-enter-to, .modal-fade-leave-from {
  opacity: 1;
}
</style>