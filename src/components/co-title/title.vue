
<template>
  <div class="title-bar clearfix">
    <img class="fl" :src="url" alt>
    <span class="title fl f26 c333">{{title}}</span>
    <slot></slot>
    
  </div>
</template>

<script>
export default {
  props:['url','title']
};
</script>

<style lang="less" scoped>
.title-bar {
  .title {
    height: 43px;
    line-height: 43px;
    padding-left: 10px;
    font-weight: bold;
  }
  .more {
    position: relative;
    height: 43px;
    line-height: 43px;
    padding-right: 15px;
    &:after {
      content: "";
      position: absolute;
      height: 43px;
      width: 12px;
      top: 0;
      right: 0;
      background: url("../../assets/img/home/more-icon.png") no-repeat center;
    }
  }
}
</style>




