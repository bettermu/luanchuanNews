<template>
  <div class="type cp">
    <img :src="url" alt="">
    <p class="cfff tc ell">{{title}}</p>
  </div>
  
</template>

<script>
export default {
  props:['title','url']
  
}
</script>

<style lang="less" scoped>
.type {
  position:relative;
  margin:0 10px 20px;
  img {
    width:274px;
    height:142px;
  }
  p {
    height:38px;
    line-height:38px;
    background-color:rgba(0,0,0,.5);
    position:absolute;
    bottom:0;
    left:0;
    right:0;
  }
}
</style>





