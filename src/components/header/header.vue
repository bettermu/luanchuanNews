<template>

<div>
  <div class="head-bar bcfff">
    <div class="inner-wrap">
      <div class="title fl">
        <img :src="info.imgUrl" alt="">
      </div>
      <div class="search-wrap fl">
          <input @keyup.enter="search" v-model="keyword" class="fl f18" type="text" placeholder="搜索景区/攻略/土特产" />
          <button @click="search" class="search-btn cp"></button>
      </div>
      
      <div class="phone fr">
        <img class="fl" src="../../assets/img/home/phone-icon.png" alt="">
        
        <div class="fr">
          <div class="time f14 c666">周一至周日 8:00-9:00</div>
          <div class="phone-num f20">{{info.complaintTel}}</div>
        </div>
      </div>
      
    </div>
  </div>
  <div class="tab-bar">
    <div class="inner-wrap cfff">
      <div class="clearfix cp">
        <router-link class="fl link cfff" to="/" exact> 首页 </router-link>
        <router-link class="fl link cfff" to="/scene"> 栾川风光 </router-link>
        <router-link class="fl link cfff" to="/news"> 旅游资讯 </router-link>
        <router-link class="fl link cfff" to="/panorama">栾川全景</router-link>
        <router-link class="fl link cfff" to="/live">栾川实景</router-link>
        <router-link class="fl link cfff" to="/guide">语音导游导览</router-link>
        <router-link class="fl link cfff" to="/serve">预订服务</router-link>
        <router-link class="fl link cfff" to="/open">政务公开</router-link>
      </div>
    </div>
  </div>
</div>
  
  
</template>

<script>
import {apiPath} from "@/config.js"
import {addSeo} from '@/utils/common.js'

export default {

  data(){
    return {
      info:{},
      keyword:'',
    }
  },
  computed:{
  },

  created(){
    this.getInfo()
    
  },


  methods:{
    getInfo() {
      this.$axios.get(apiPath + "/vr-rest/websiteInfo/getWebInfo").then(res => {
        //console.log(res.data.data)
        if (res.data.code === 0) {
          addSeo(res.data.data.seoWord, res.data.data.seoDescrible);
          this.info = res.data.data;
        }
      });
    },

    search(){
      let keyword = this.keyword.replace(/\s/g,"")
      if(keyword!==''){
        //alert(keyword)
        this.toSearchList('搜索',keyword)
      }else {
        //alert(222)
      }
    },

    //全局搜索
    toSearchList(fname,sname){
      this.$router.push({
        name: "searchList",
        query: {
          fname: fname,
          sname: sname,
        }
      });
    }
  }

  
  
}
</script>

<style lang="less" scoped>
@import '~styles/common.less';

.head-bar {
  .inner-wrap {
    width:@inner-width;
    margin:0 auto;
    height:94px;
    .title {
      margin-top:15px;
      img {
        width:303px;
        height:64px;
      }
    }
    .search-wrap {
      margin-left:75px;
      margin-top:25px;
      input {
        height:38px;
        width:384px;
        border:2px solid @theme-yellow;
        text-indent: 10px;
        &::-webkit-input-placeholder {
          color:#999;
        }
      }
      .search-btn {
        width:80px;
        height:44px;
        background:url('../../assets/img/home/search-icon.png') center no-repeat @theme-yellow;
        border:none;
        outline:none;
      }
      
    }
    .phone {
      margin-top:25px;
      margin-right:30px;
      img {
        margin-right:20px;
      }
      .time {
        margin-top:5px;
      }
      .phone-num {
        color:#4b4b4b;
      }
    }
  }
}

.tab-bar {
  background-color:@theme-green;
  .inner-wrap {
    width:@inner-width;
    margin:0 auto; 
    div {
      .link {
        height:40px;
        line-height:40px;
        padding:0 30px;
        transition:all .4s;
        &:hover {
          background-color:@theme-yellow;
        }
        &.router-link-active {
          background-color:@theme-yellow;
        }
      }
    }
    
  }
}

</style>






