<template>
  <div>
    <Header/>
    <!-- 政务公开 -->
    <div class="open">
      <div class="main-wrap clearfix">
        <div class="left fl">
          <div class="status bcfff">
            <co-title
              class="title-wrap"
              :url="require('../assets/img/open/status-icon.png')"
              title="政务动态"
            >
              <span @click="toOpenInfo(0)" class="more c666 f14 fr cp">更多</span>
            </co-title>
            <div class="content clearfix">
              <open-card
                @click.native="tapToDetail(item.ncId,'政务动态',item.title)"
                v-for="(item,index) in status.newsList.slice(0,6)"
                :key="index"
                :info="item"
                class="fl"
              ></open-card>
            </div>
          </div>
          <div class="status bcfff">
            <co-title
              class="title-wrap"
              :url="require('../assets/img/open/hudong-icon.png')"
              title="互动频道"
            >
              <span @click="toInteract(0)" class="more c666 f14 fr cp">更多</span>
            </co-title>
            <div class="content clearfix">
              <open-card
                @click.native="tapToDetail(item.ncId,'互动频道',item.title)"
                v-for="(item,index) in interact.newsList.slice(0,4)"
                :key="index"
                :info="item"
                class="fl"
              ></open-card>
            </div>
          </div>
          <div class="status bcfff">
            <co-title
              class="title-wrap"
              :url="require('../assets/img/open/serve-icon.png')"
              title="服务专区"
            >
              <span @click="toOpenServe(0)" class="more c666 f14 fr cp">更多</span>
            </co-title>
            <div class="content clearfix">
              <open-card
                @click.native="tapToDetail(item.ncId,'服务专区',item.title)"
                v-for="(item,index) in serve.newsList.slice(0,4)"
                :key="index"
                :info="item"
                class="fl"
              ></open-card>
            </div>
          </div>
        </div>
        <div class="right fl">
          <div class="info-open bcfff">
            <sb-title title="政务信息公开">
              <span @click="toOpenInfo(0)" class="more fr c666 f14 cp">更多</span>
            </sb-title>
            <ul class="content clearfix">
              <li
                v-for="(item,index) in infoType.childrenType"
                :key="index"
                class="fl cp c666 ell"
                @click="toOpenInfo(index)"
              >> {{item.name}}</li>
            </ul>
          </div>
          <div class="channel bcfff">
            <sb-title title="互动频道">
              <span @click="toInteract(0)" class="more fr c666 f14 cp">更多</span>
            </sb-title>
            <ul class="content clearfix">
              <li
                v-for="(item,index) in interactType.childrenType"
                :key="index"
                @click="toInteract(index)"
                class="fl cp c666 ell"
              >> {{item.name}}</li>
            </ul>
          </div>
          <div class="service bcfff">
            <sb-title title="服务专区">
              <span @click="toOpenServe(0)" class="more fr c666 f14 cp">更多</span>
            </sb-title>
            <ul class="content clearfix">
              <li
                v-for="(item,index) in serveType.childrenType"
                :key="index"
                @click="toOpenServe(index)"
                class="fl cp c666 ell"
              >> {{item.name}}</li>
            </ul>
          </div>
          <div class="complain bcfff">
            <sb-title title="投诉服务">
              <span @click="openPop" class="more fr c666 f14 cp">更多</span>
            </sb-title>
            <div class="content tc c666">
              <img src="../assets/img/open/tousu.jpg" alt>
              <div class="dash">旅游监督投诉</div>
              <div class="email">专用邮箱：luanchuanlvyou@163.com</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Footer fname="政务公开"/>
    <div v-show="isPopShow" class="pop-wrapper">
      <div class="pop bcfff">
        <div class="title tc cfff">
          投诉服务
          <span @click="closePop" class="cp"></span>
        </div>
        <div class="content">
          <div class="tc info c666 f16">旅游投诉监督举报电话：3523-43523455</div>
          <div class="tc info c666 f16">旅游投诉监督举报邮箱：112233@163.com</div>
          <div class="form-wrap c-title">
            <span class="fl star">投诉标题</span>
            <input v-validate="'required'" v-model="cTitle" name="投诉标题" type="text">
            <span v-show="errors.has('投诉标题')" class="tip f12" v-cloak>{{ errors.first('投诉标题') }}</span>
          </div>
          <div class="form-wrap c-cont">
            <span class="fl star">投诉内容</span>
            <textarea v-validate="'required'" name="投诉内容" v-model="cCont" ></textarea>
            <span v-show="errors.has('投诉内容')" class="tip f12" v-cloak>{{ errors.first('投诉内容') }}</span>
          </div>
          <div class="p-title c333 f18">投诉人信息</div>
          <div class="form-wrap c-title">
            <span class="fl star">姓名</span>
            <input v-validate="'required|name'" v-model="cName" name="姓名" type="text">
            <span v-show="errors.has('姓名')" class="tip f12" v-cloak>{{ errors.first('姓名') }}</span>
          </div>
          <div class="form-wrap c-title">
            <span class="fl star f16">联系电话</span>
            <input v-validate="'required|mobile'" name="手机号" required v-model="cPhone" type="text">
            <span v-show="errors.has('手机号')" class="tip f12" v-cloak>{{ errors.first('手机号') }}</span>
          </div>
          <div @click="submit" class="sb-btn cfff tc cp">提交</div>
        </div>
      </div>
    </div>
    <v-dialog/>
  </div>
</template>

<script>
import { apiPath } from "@/config.js";
import Header from "components/header/header.vue";
import Footer from "components/footer/footer.vue";
import CoTitle from "components/co-title/title.vue";
import SbTitle from "components/sb-title/title.vue";
import OpenCard from "components/open-card/card.vue";
import "@/utils/validate.js";

export default {
  name: "open",
  data() {
    return {
      status: {},
      interact: {},
      serve: {},
      infoType: {},
      interactType: {},
      serveType: {},
      isPopShow: false,
      cTitle: "",
      cCont: "",
      cName: "",
      cPhone: ""
    };
  },
  created() {
    this.getInfo();
    this.getType();
  },
  methods: {
    //获取左侧信息
    getInfo() {
      this.$axios
        .get(apiPath + "/vr-rest/governmentInfo/getIndexContent")
        .then(res => {
          //console.log(res.data.data)
          if (res.data.code === 0 && res.data.data) {
            this.status = res.data.data[0];
            this.interact = res.data.data[1];
            this.serve = res.data.data[2];
          }
        });
    },

    //去往详情页面
    tapToDetail(id, fname, sname) {
      //console.log(tname);
      this.$router.push({
        name: "detail",
        query: {
          id: id,
          fname: fname,
          sname: sname
        }
      });
    },
    //投诉弹窗打开
    openPop() {
      this.isPopShow = true;
    },

    closePop() {
      this.isPopShow = false;
    },

    toOpenInfo(index) {
      window.localStorage.setItem("infoIndex", index);
      this.$router.push({
        name: "openInfo",
        query: {
          index: index
        }
      });
    },

    //服务实用页面
    toOpenServe(index) {
      window.localStorage.setItem("activeIndex", index);
      this.$router.push({
        name: "openServe",
        query: {
          index: index
        }
      });
    },

    //互动频道页面
    toInteract(index) {
      window.localStorage.setItem("interIndex", index);
      this.$router.push({
        name: "openInteract",
        query: {
          index: index
        }
      });
    },

    //获取右侧内容
    getType() {
      this.$axios
        .get(apiPath + "/vr-rest/governmentInfo/getTypeList")
        .then(res => {
          //console.log(res.data.data)
          if (res.data.code === 0 && res.data.data) {
            this.infoType = res.data.data[0];
            this.interactType = res.data.data[1];
            this.serveType = res.data.data[2];
          }
        });
    },

    //提交投诉
    submit() {
      //console.log(this.errors);
      if (this.cTitle && this.cCont && this.cName && this.cPhone) {
        //console.log(this.errors.any());
        if (this.errors.any()) {
          this.$modal.show("dialog", {
            title: "提示",
            text: "请填写正确的信息",
            buttons: [
              {
                title: "知道了"
              }
            ]
          });
        } else {
          //执行提交的方法
          let params = {
            title: this.cTitle,
            content: this.cCont,
            complaintPers: this.cName,
            contactTel: this.cPhone
          };
          this.postSubmit(params);
        }
      } else {
        this.$modal.show("dialog", {
          title: "提示",
          text: "请填写完整的信息",
          buttons: [
            {
              title: "知道了"
            }
          ]
        });
      }
    },

    //提交投诉的方法
    postSubmit(params) {
      this.$axios
        .post(apiPath + "/vr-rest/complaintInfo/addComplaintInfo", params)
        .then(res => {
          if (res.data.code === 0) {
            this.$modal.show("dialog", {
              title: "提示",
              text: "提交成功",
              buttons: [
                {
                  title: "知道了",
                }
              ]
            });

            this.cTitle = "";
            this.cCont = "";
            this.cName = "";
            this.cPhone = "";
            this.isPopShow = false;
          }
        });
    }
  },
  components: {
    Header,
    Footer,
    CoTitle,
    SbTitle,
    OpenCard
  }
};
</script>


<style lang="less" scoped>
@import "~styles/common.less";

.open {
  padding: 50px 0 90px;
  background-color: #f2f3f4;
  .main-wrap {
    width: @inner-width;
    margin: 0 auto;
    .left {
      width: 768px;
      .status {
        padding: 20px 10px 0;
        box-sizing: @box-shadow;
        margin-bottom: 30px;
        .title-wrap {
          padding: 0 10px;
        }
        .content {
          padding-top: 17px;
        }
      }
    }
    .right {
      width: 402px;
      margin-left: 30px;
      .info-open {
        margin-bottom: 10px;
        padding: 10px 10px 0;
        box-shadow: @box-shadow;
        ul {
          padding: 16px 0;
          li {
            width: 50%;
            height: 34px;
            box-sizing: border-box;
            line-height: 34px;
            padding-left: 10px;
            transition:all .4s;
            &:hover {
              background-color: #f5f5f5;
              color: @theme-yellow;
            }
          }
        }
      }
      .channel {
        margin-bottom: 10px;
        padding: 10px 10px 0;
        box-shadow: @box-shadow;
        ul {
          padding: 16px 0;
          li {
            width: 50%;
            height: 34px;
            box-sizing: border-box;
            line-height: 34px;
            padding-left: 10px;
            transition:all .4s;
            &:hover {
              background-color: #f5f5f5;
              color: @theme-yellow;
            }
          }
        }
      }
      .service {
        margin-bottom: 30px;
        padding: 10px 10px 0;
        box-shadow: @box-shadow;
        ul {
          padding: 16px 0;
          li {
            width: 50%;
            height: 34px;
            box-sizing: border-box;
            line-height: 34px;
            padding-left: 10px;
            transition:all .4s;
            &:hover {
              background-color: #f5f5f5;
              color: @theme-yellow;
            }
          }
        }
      }
      .complain {
        margin-bottom: 30px;
        padding: 10px 10px 0;
        box-shadow: @box-shadow;
        .content {
          padding: 0 10px;
          img {
            margin-top: 20px;
          }
          .dash {
            border-bottom: 1px solid #e5e5e5;
            padding-bottom: 30px;
          }
          .email {
            height: 62px;
            line-height: 62px;
          }
        }
      }
    }
  }
}

.pop-wrapper {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  .pop {
    width: 768px;
    height: 568px;
    position: absolute;
    margin: auto;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    .title {
      height: 40px;
      line-height: 40px;
      position: relative;
      background-color: @theme-green;
      span {
        position: absolute;
        right: 0;
        top: 4px;
        height: 32px;
        width: 32px;
        background: url("../assets/img/serve/close.png") no-repeat center;
        background-size: 20px 20px;
      }
    }
    .content {
      padding: 10px 20px 0;
      .info {
        height: 32px;
        line-height: 32px;
      }
      .form-wrap {
        padding: 10px 0;
        position: relative;
        input {
          height: 34px;
          line-height: 1;
          margin-left: 12px;
          width: 640px;
          border-radius: 5px;
          border: 1px solid #dcdcdc;
          text-indent: 5px;
        }
        textarea {
          margin-left: 12px;
          height: 154px;
          box-sizing: border-box;
          width: 642px;
          padding: 5px;
          border-radius: 5px;
          border: 1px solid #dcdcdc;
          resize: none;
          line-height: 26px;
          outline: none;
        }
        .star {
          height: 36px;
          line-height: 36px;
          width: 72px;
          &:before {
            content: "*";
            color: red;
          }
        }
        .tip {
          position: absolute;
          bottom: -5px;
          left: 84px;
          color: red;
        }
      }
      .p-title {
        height: 36px;
        line-height: 36px;
        position: relative;
        padding-left: 12px;
        &:before {
          content: "";
          position: absolute;
          height: 18px;
          width: 4px;
          top: 10px;
          left: 0;
          background-color: @theme-green;
        }
      }
      .sb-btn {
        width: 190px;
        height: 40px;
        line-height: 40px;
        border-radius: 20px;
        margin: 10px auto 0;
        background-color: @theme-green;
      }
    }
  }
}
</style>
