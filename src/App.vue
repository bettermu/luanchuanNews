<template>
<transition name="fade">
  <router-view class="view"></router-view>
</transition>


  
</template>

<script>
import { apiPath } from "@/config.js";

export default {
  
};
</script>

<style>
html, body {
  height: 100%;
  margin: 0;
}

.view {
  width: 100%; 
  height: 100%; 
  transition: all .5s cubic-bezier(.55,0,.1,1);
}

.fade-enter,.fade-leave-active{
  opacity: 0;
}   

.fade-leave,.fade-enter-active {
  opacity: 0;
} 




</style>

