<template>
  <div class="footer">
    <div class="up  f14">
      <ul class="clearfix">
        <li v-for="(item,index) in linkList" :key="index" @click="tapToList(item.ntId,fname,item.name)"  class="fl cp"><a target="_blank" class="cfff" :href="item.linkUrl">{{item.name}}</a></li>
      </ul>
    </div>
    <div class="down f12 c999">
      
      <p class="tc">{{info.copyright}}</p>
    </div>
  </div>
</template>

<script>
import {apiPath} from "@/config.js";
export default {
  props:['fname'],
  data(){
    return {
      info:{},
      linkList:[],
    }
  },
  

  created(){
    this.getInfo()
    this.getLink()
  },

  methods:{

    //去往列表页
    tapToList(id, fname, sname, tname) {
      this.$router.push({
        name: "list",
        query: {
          id: id,
          fname: fname,
          sname: sname
        }
      });
    },
    getLink() {
      this.$axios
        .get(apiPath + "/vr-rest/newsInfo/getTypeBottomList")
        .then(res => {
          //console.log(res.data.data)
          if (res.data.code === 0) {
            this.linkList = res.data.data;
          }
        });
    },
    getInfo() {
      this.$axios.get(apiPath + "/vr-rest/websiteInfo/getWebInfo").then(res => {
        //console.log(res.data.data)
        if (res.data.code === 0) {
          this.info = res.data.data;
        }
      });
    },
    
  }
};
</script>

<style lang="less" scoped>
.footer {
  .up {
    background-color: #323232;
    padding: 13px 0;
    ul {
      width:594px;
      margin: 0 auto;
      li {
        line-height: 14px;
        height: 14px;
        padding: 0 21px;
        &:hover {
          text-decoration: underline;
        }
        & + li {
          border-left: 1px solid #dbdfe3;
        }
      }
    }
  }
  .down {
    padding: 14px 0;
    background-color: #242424;

    p {
      line-height: 22px;
    }
  }
}
</style>


