<template>
  <div class="detail-wrapper">
    <div class="wrapper">
      <Header></Header>

      <div class="detail">
        <div class="main-wrap">
          <Crumbs>
            <span class="ell fl">{{$route.query.fname}}</span>
            <span class="fl">></span>
            <span class="ell fl">{{$route.query.sname}}</span>
            <span class="fl" v-if="$route.query.tname">></span>
            <span class="ell fl" v-if="$route.query.tname">{{$route.query.tname}}</span>
          </Crumbs>
          <div class="content bcfff">
            <div class="cont-wrap">
              <div class="title f26 c333">{{detail.title}}</div>
              <div class="tip-wrap c999 f14 clearfix">
                <span class="fl">来源：本站</span>
                <span class="fl">|</span>
                <span class="fl">发布日期：{{detail.createTime}}</span>
                <span class="fr">阅读数：{{detail.viewNum}}</span>
              </div>
              <div v-show="!detail.content" class="no-data tc c666">暂无详情</div>
              <div class="cont f14" v-html="detail.content"></div>
              <div class="share">
                <share :config="config"></share>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="push"></div>
    </div>

    <Footer class="footer"></Footer>
  </div>
</template>

<script>
import { apiPath } from "@/config.js";
import Header from "components/header/header.vue";
import Footer from "components/footer/footer.vue";
import Crumbs from "components/crumbs/crumbs.vue";
import Vue from "vue";
import Share from "vue-social-share";
//import "social-share.js/dist/js/social-share.min.js"

Vue.use(Share);

export default {
  name: "detail",
  data() {
    return {
      config: {
        //url: "www.baidu.com", // 网址，默认使用 window.location.href
        //source: "", // 来源（QQ空间会用到）, 默认读取head标签：<meta name="site" content="http://overtrue" />
        //title: "", // 标题，默认读取 document.title 或者 <meta name="title" content="share.js" />
        //description: "", // 描述, 默认读取head标签：<meta name="description" content="PHP弱类型的实现原理分析" />
        //image: "", // 图片, 默认取网页中第一个img标签
        //sites: ["qzone", "qq", "weibo", "wechat", "douban"], // 启用的站点
        disabled: [
          "google",
          "facebook",
          "twitter",
          "douban",
          "diandian",
          "in",
          "wechat",
          "tencent"
          //"qq",
          //"qzone"
        ] // 禁用的站点
        //wechatQrcodeTitle: "微信扫一扫：分享", // 微信二维码提示文字
        //wechatQrcodeHelper: "<p>微信里点“发现”，扫一下</p><p>二维码便可将本文分享至朋友圈。</p>"
      },
      id: this.$route.query.id || "",
      detail: {}
    };
  },
  components: {
    Header,
    Footer,
    Crumbs
  },
  created() {
    this.getDetail(this.id);
  },
  mounted() {
    //socialShare('.share',this.config)
  },
  methods: {
    //获取资讯详情
    getDetail(id) {
      this.$axios
        .get(apiPath + `/vr-rest/newsInfo/getNewsInfo?ncId=${id}`)
        .then(res => {
          if (res.data.code === 0 && res.data.data) {
            this.detail = res.data.data;
          }
        });
    }
  }
};
</script>

<style lang="less">
@import "~styles/common.less";

.detail-wrapper {
  height: 100%;
  .wrapper {
    min-height: 100%;
    margin-bottom: -90px;
    background-color: #f2f3f4;
  }
}
.footer,
.push {
  height: 90px;
}
.share {
  padding: 10px 0;
}
.detail {
  .main-wrap {
    width: @inner-width;
    margin: 0 auto 80px;
    .content {
      padding-top: 22px;
      .cont-wrap {
        width: 800px;
        margin: 0 auto;
        .title {
          line-height: 32px;
          padding-bottom: 10px;
        }
        .tip-wrap {
          span {
            margin-right: 10px;
          }
        }
        .cont {
          padding-top: 30px;
          
            font-size:16px !important;
            line-height:30px !important;
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol" !important;
            img {
              max-width: 100%;
            }
          
        }
      }
    }
  }
}

.no-data {
  padding: 20px 0;
}
</style>


