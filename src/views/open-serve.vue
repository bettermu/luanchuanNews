<template>
  <div class="open-serve-wrapper">
    <div class="wrapper">
      <Header></Header>
      <div class="open-serve">
        <div class="main-wrap">
          <Crumbs>
            <span class="ell fl">政务公开</span>
            <span class="fl">></span>
            <span class="ell fl">服务专区</span>
          </Crumbs>
          <div class="open-serve-wrap clearfix">
            <div class="left fl">
              <div class="title f24 ell">服务专区</div>
              <div class="content-wrap bcfff">
                <div v-show="activeIndex === 0 || activeIndex === 1">
                  <div class="list-wrap">
                    <div v-show="!pageList.length" class="no-data c666 tc">暂无数据</div>
                    <page-card
                      @click.native="tapToDetail(item.ncId,'政务公开','服务专区',item.title)"
                      v-for="(item,index) in pageList"
                      :key="index"
                      :info="item"
                      :hasBuy="false"
                      class="list-page"
                    />
                  </div>
                  <v-page
                    v-show="pageList.length"
                    :total-row="totalRow"
                    align="center"
                    @page-change="PageChange"
                    :page-size-menu="false"
                    :info="false"
                  ></v-page>
                </div>
                <div class="search" v-show="activeIndex === 2">
                  <div class="form-wrap c-title">
                    <span class="fl star">姓名</span>
                    <input
                      placeholder="请输入申报人姓名"
                      v-validate="'required|name'"
                      v-model="sName"
                      name="姓名"
                      type="text"
                    >
                    <span v-show="errors.has('姓名')" class="tip f12" v-cloak>{{ errors.first('姓名') }}</span>
                  </div>
                  <div class="form-wrap c-title">
                    <span class="fl star">联系电话</span>
                    <input
                      placeholder="请输入申报人联系电话"
                      v-validate="'required|mobile'"
                      v-model="sPhone"
                      name="联系电话"
                      type="text"
                    >
                    <span
                      v-show="errors.has('联系电话')"
                      class="tip f12"
                      v-cloak
                    >{{ errors.first('联系电话') }}</span>
                  </div>
                  <div class="form-wrap c-title">
                    <span class="fl star">身份证号</span>
                    <input
                      placeholder="请输入申报人身份证号"
                      v-validate="'required|idCard'"
                      v-model="sId"
                      name="身份证号"
                      type="text"
                    >
                    <span
                      v-show="errors.has('身份证号')"
                      class="tip f12"
                      v-cloak
                    >{{ errors.first('身份证号') }}</span>
                  </div>
                  <div class="form-wrap c-title">
                    <span class="fl star">电子邮箱</span>
                    <input
                      placeholder="请输入申报人电子邮箱"
                      v-validate="'required|email'"
                      v-model="sEmail"
                      name="电子邮箱"
                      type="text"
                    >
                    <span
                      v-show="errors.has('电子邮箱')"
                      class="tip f12"
                      v-cloak
                    >{{ errors.first('电子邮箱') }}</span>
                  </div>
                  <div class="form-wrap c-title">
                    <span class="fl star">联系地址</span>
                    <input
                      placeholder="请输入申报人联系地址"
                      v-validate="'required'"
                      v-model="sAdr"
                      name="联系地址"
                      type="text"
                    >
                    <span
                      v-show="errors.has('联系地址')"
                      class="tip f12"
                      v-cloak
                    >{{ errors.first('联系地址') }}</span>
                  </div>
                  <div class="form-wrap c-title">
                    <span class="fl star">申诉内容</span>
                    <textarea
                      placeholder="请输入申诉内容"
                      v-validate="'required'"
                      v-model="sCont"
                      name="申诉内容"
                      maxlength="150"
                    ></textarea>
                    <span
                      v-show="errors.has('申诉内容')"
                      class="tip f12"
                      v-cloak
                    >{{ errors.first('申诉内容') }}</span>
                  </div>

                  <div @click="sSubmit" class="sb-btn cfff tc cp">提交</div>
                </div>
                <div class="search" v-show="activeIndex === 3">
                  <div class="form-wrap c-title">
                    <span class="fl star">姓名</span>
                    <input
                      placeholder="请输入申报人姓名"
                      v-validate="'required|name'"
                      v-model="cName"
                      name="姓名"
                      type="text"
                    >
                    <span v-show="errors.has('姓名')" class="tip f12" v-cloak>{{ errors.first('姓名') }}</span>
                  </div>
                  <div class="form-wrap c-title">
                    <span class="fl star">联系电话</span>
                    <input
                      placeholder="请输入申报人联系电话"
                      v-validate="'required|mobile'"
                      v-model="cPhone"
                      name="联系电话"
                      type="text"
                    >
                    <span
                      v-show="errors.has('联系电话')"
                      class="tip f12"
                      v-cloak
                    >{{ errors.first('联系电话') }}</span>
                  </div>
                  <div class="form-wrap c-title">
                    <span class="fl star">身份证号</span>
                    <input
                      placeholder="请输入申报人身份证号"
                      v-validate="'required|idCard'"
                      v-model="cId"
                      name="身份证号"
                      type="text"
                    >
                    <span
                      v-show="errors.has('身份证号')"
                      class="tip f12"
                      v-cloak
                    >{{ errors.first('身份证号') }}</span>
                  </div>
                  <div class="form-wrap c-title">
                    <span class="fl star">电子邮箱</span>
                    <input
                      placeholder="请输入申报人电子邮箱"
                      v-validate="'required|email'"
                      v-model="cEmail"
                      name="电子邮箱"
                      type="text"
                    >
                    <span
                      v-show="errors.has('电子邮箱')"
                      class="tip f12"
                      v-cloak
                    >{{ errors.first('电子邮箱') }}</span>
                  </div>

                  <div @click="cSubmit" class="sb-btn cfff tc cp">提交</div>
                </div>
              </div>
            </div>
            <div class="right bcfff fr">
              <sb-title title="服务专区"></sb-title>
              <ul class="content clearfix">
                <li
                  @click="changeActive(index)"
                  v-for="(item,index) in openServeList"
                  :key="index"
                  :class="activeIndex===index?'active':''"
                  class="cp c666 ell"
                >> {{item.name}}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div class="push"></div>
    </div>

    <Footer fname="服务专区"></Footer>
    <Loading v-show="loading"></Loading>
    <v-dialog/>
  </div>
</template>

<script>
import { apiPath } from "@/config.js";
import Header from "components/header/header.vue";
import Footer from "components/footer/footer.vue";
import Crumbs from "components/crumbs/crumbs.vue";
import PageCard from "components/page-card/card.vue";
import SbTitle from "components/sb-title/title.vue";
import Loading from "components/loading/loading.vue";
import { mapGetters, mapMutations } from "vuex";
import "@/utils/validate.js";
import Vue from "vue";
import vPage from "v-page";
Vue.use(vPage, {});

export default {
  name: "openServe",
  data() {
    return {
      activeIndex: this.$route.query.index ? this.$route.query.index : 0,
      openServeList: [],
      cEmail: "",
      cName: "",
      cPhone: "",
      cId: "",
      sEmail: "",
      sName: "",
      sPhone: "",
      sId: "",
      sAdr: "",
      sCont: "",
      totalRow: 12,
      pageList: []
    };
  },
  computed: {
    ...mapGetters(["loading"])
  },

  created() {
    this.getType();
  },
  mounted() {
    this.activeIndex = parseInt(window.localStorage.getItem("activeIndex"));
  },

  methods: {
    PageChange(page) {
      if (this.openServeList.length) {
        this.getPageListById(
          this.openServeList[this.activeIndex].ntId,
          page.pageNumber,
          10
        );
      }
    },
    changeActive(index) {
      this.activeIndex = index;
      window.localStorage.setItem("activeIndex", index);
      (this.activeIndex === 0 || this.activeIndex === 1) &&
        this.getPageListById(this.openServeList[this.activeIndex].ntId, 1, 10);
    },
    //去往详情页面
    tapToDetail(id, fname, sname, tname) {
      console.log(tname);
      this.$router.push({
        name: "detail",
        query: {
          id: id,
          fname: fname,
          sname: sname,
          tname: tname
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
            //this.interactType = res.data.data[1];
            this.openServeList = res.data.data[2].childrenType;
            (this.activeIndex === 0 || this.activeIndex === 1) &&
              this.getPageListById(
                this.openServeList[this.activeIndex].ntId,
                1,
                10
              );
          }
        });
    },
    //在线查询
    cSubmit() {
      if (this.cName && this.cPhone && this.cId && this.cEmail) {
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
            ndPers: this.cName,
            contactTel: this.cPhone,
            email: this.cEmail,
            cardNum: this.cId,
            ndType: 2
          };

          this.postC(params);
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
    //在线申报
    sSubmit() {
      if (
        this.sName &&
        this.sPhone &&
        this.sId &&
        this.sEmail &&
        this.sAdr &&
        this.sCont
      ) {
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
            email: this.sEmail,
            ndPers: this.sName,
            contactTel: this.sPhone,
            cardNum: this.sId,
            address: this.sAdr,
            ndContent: this.sCont,
            ndType: 1
          };

          this.postS(params)
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
    //获取分页列表
    getPageListById(id, page, size) {
      this.setLoading(true);
      this.$axios
        .get(
          apiPath +
            `/vr-rest/governmentInfo/getTypeNewsPageList?ntId=${id}&page=${page}&size=${size}`
        )
        .then(res => {
          this.setLoading(false);
          if (res.data.code === 0 && res.data.data) {
            this.pageList = res.data.data;
            this.totalRow = res.data.count;
          }
        });
    },

    postC(params) {
      this.$axios
        .post(apiPath + "/vr-rest/declareInfo/addDeclare", params)
        .then(res => {
          if (res.data.code === 0) {
            this.$modal.show("dialog", {
              title: "提示",
              text: "添加查询成功",
              buttons: [
                {
                  title: "知道了"
                }
              ]
            });
            this.cEmail = "";
            this.cName = "";
            this.cPhone = "";
            this.cId = "";
          }
        });
    },

    postS(params) {
      this.$axios.post(apiPath+'/vr-rest/declareInfo/addDeclare',params).then((res)=>{

        if (res.data.code === 0) {
            this.$modal.show("dialog", {
              title: "提示",
              text: "在线申报成功",
              buttons: [
                {
                  title: "知道了"
                }
              ]
            });
            this.sName="" 
            this.sPhone="" 
            this.sId="" 
            this.sEmail="" 
            this.sAdr="" 
            this.sCont=""
          }

      })
    },

    ...mapMutations({
      setLoading: "SET_LOADING"
    })
  },
  components: {
    Header,
    Footer,
    Crumbs,
    SbTitle,
    PageCard,
    Loading
  }
};
</script>

<style lang="less" scoped>
@import "~styles/common.less";
.open-serve-wrapper {
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

.open-serve {
  .main-wrap {
    width: @inner-width;
    margin: 0 auto;
    .open-serve-wrap {
      .left {
        width: 960px;
        .title {
          height: 50px;
          line-height: 50px;
          background-color: #f6f6f6;
          padding-left: 36px;
          position: relative;
          &:before {
            content: "";
            position: absolute;
            top: 15px;
            left: 20px;
            width: 4px;
            height: 19px;
            background-color: @theme-green;
            border-radius: 2px;
          }
        }
        .content-wrap {
          padding: 20px;
          box-sizing: border-box;
          box-shadow: @box-shadow;
          margin-bottom: 27px;
          .search {
            .form-wrap {
              padding: 10px 0;
              position: relative;
              input {
                height: 34px;
                line-height: 1;
                margin-left: 12px;
                width: 834px;
                border-radius: 5px;
                border: 1px solid #dcdcdc;
                text-indent: 5px;
              }
              textarea {
                margin-left: 12px;
                height: 154px;
                box-sizing: border-box;
                width: 836px;
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
      .right {
        width: 210px;
        padding: 10px;
        box-sizing: border-box;
        .content {
          padding-top: 16px;
          li {
            height: 34px;
            box-sizing: border-box;
            line-height: 34px;
            padding-left: 10px;
            transition:all .4s;
            &.active {
              background-color: #f5f5f5;
              color: @theme-yellow;
            }
            &:hover {
              background-color: #f5f5f5;
              color: @theme-yellow;
            }
          }
        }
      }
    }
  }
}
</style>


