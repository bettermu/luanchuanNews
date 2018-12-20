<template>
  <div class="title-bar clearfix">
    <span class="title fl f20">{{title}}</span>
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: ["title"]
};
</script>

<style lang="less" scoped>
@import "~styles/common.less";
.title-bar {
  border-bottom: 3px solid @theme-green;
  margin: 0 10px;
  .title {
    height: 44px;
    line-height: 44px;
    font-weight: bold;
  }
  .tip {
    width: 125px;
    height: 59px;
    position: absolute;
    top: -4px;
    right: 18px;
    background: url("../../assets/img/home/foot-recommend-icon.png") no-repeat;
  }
  .more {
    position: relative;
    height: 44px;
    line-height: 44px;
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
  .more-no-arrow {
    position: relative;
    height: 44px;
    line-height: 44px;
  }
}
</style>



