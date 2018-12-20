<template>
<div class="vr-card cp" :style="cardStyle">
  <p class="f12 cfff ell">{{title}}</p>
</div>
  
</template>

<script>
export default {
  props:['height','bgSize','title','url'],
  data(){
    return {
      cardStyle:{
        background:'url('+this.url+')  left top no-repeat',
        backgroundSize:this.bgSize,
        height:this.height
      },
    }
  }
}
</script>

<style lang="less" scoped>

.vr-card {
  margin-right:10px;
  margin-bottom:10px;
  position:relative;
  p {
    position:absolute;
    bottom:0;
    left:0;
    right:0;
    height:30px;
    line-height:30px;
    background-color:rgba(0,0,0,.5);
    text-indent:12px;
    padding-right:30px;
    &:after {
      position:absolute;
      content:'';
      height:16px;
      width:14px;
      top:7px;
      right:12px;
      background:url('../../assets/img/home/camera-icon.png') no-repeat;
      
    }
  }
  
}

</style>


