<template>
  <!-- 实景 -->
  <div class="live rel">
    <Header/>

    <ul class="clearfix live-list">
      <li v-for="(item,index) in videoList" :key="index" class="rel" @click="showVideo(item.cameraNumber)">
        <div class="center abs live-item">
          <img class="live-poster" :src="item.irrList.length? item.irrList[0].resourcePath : ''" alt>
          <div class="abs live-play-icon"></div>
          <div class="tc c333 f16 ell live-item-title">{{item.title}}</div>
        </div>
      </li>
      
    </ul>

    <Footer fname="栾川实景"/>

    <div class="mask abs" v-show="isShow">
      <div class="wrap bcfff">
        <iframe id="iframe" src="./liveVideo/video.html" width="960px" height="471px" frameborder="0"></iframe>
        <span class="close cp" @click="closeVideo"><img src="../assets/img/live/close.png" alt=""></span>
      </div>
    </div>
  </div>
</template>

<script>
import Header from "@/components/header/header.vue";
import Footer from "@/components/footer/footer.vue";
import {apiPath} from "@/config.js"
//./liveVideo/video.html

export default {
  name: "live",
  data(){
    return {
      isShow:false,
      videoList:[],
    }
    
  },

  created(){
    this.getVideoList()
  },
  mounted(){
    
  },
  methods:{
    closeVideo(){
      this.isShow = false
    },
    getVideoList(){

      this.$axios.get(apiPath + '/vr-rest/newsCamera/getCameraPageList?currentPageNo=1&pageSize=10').then((res)=>{
        //console.log(res.data.data)
        if(res.data.code === 0){
          if(res.data.data && res.data.data.length){
            this.videoList = res.data.data
          }
        }
        
      })

    },

    showVideo(id){
      this.isShow = true
      document.getElementById('iframe').contentWindow.postMessage(id,'*')
    }
  },
  components: {
    Header,
    Footer
  }
};
</script>

<style scoped>
.live-list {
  padding: 30px  0 0;
}

.live-list > li {
  float: left;
  width: 33.33%;
  box-sizing:border-box;
  margin-bottom:50px;
  padding: 0 20px 19%;
}

.live-item {
  top:0;
  left:20px;
  right:20px;
  bottom:0;
  background:#ccc;
}

.mask {
  top:0;
  left:0;
  right:0;
  bottom:0;
  background-color:rgba(0,0,0,.5);
}

.wrap {
  position:fixed;
  width:960px;
  height:471px;
  margin:auto;
  top:0;
  right:0;
  bottom:0;
  left:0;

}

.close {
  position:absolute;
  top:-15px;
  right:-15px;
  z-index:100;
}



.live-play-icon {
  top: 0;
  width: 100%;
  height: 100%;
  background: url("../assets/img/guide/live-play-btn.png") center no-repeat;
  cursor: pointer;
}

.live-poster {
  display: block;
  width: 100%;
  height:100%;
}

.live-item-title {
  height: 45px;
  line-height: 45px;
}
</style>