import Vue from "vue";
import VeeValidate, { Validator } from "vee-validate";
import zh_CN from "vee-validate/dist/locale/zh_CN";
import VueI18n from "vue-i18n";

Vue.use(VueI18n);

const i18n = new VueI18n({
  locale: "zh_CN"
});

Vue.use(VeeValidate, {
  i18n,
  i18nRootKey: "validation",
  dictionary: {
    zh_CN
  }
});

//手机号验证
Validator.extend("mobile", {
  getMessage: function(field, args) {
    return "请填写正确的" + field;
  },
  validate: function(value) {
    return (
      value.length == 11 && /^((13|14|15|17|18)[0-9]{1}\d{8})$/.test(value)
    );
  }
});

//姓名验证
Validator.extend("name", {
  getMessage: function(field, args) {
    return "请填写正确的" + field;
  },
  validate: function(value) {
    return /^([\u4e00-\u9fa5\·]{2,10})$/.test(value);
  }
});

//邮箱验证
Validator.extend("email", {
  getMessage: function(field, args) {
    return "请填写正确的" + field;
  },
  validate: function(value) {
    return /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/.test(
      value
    );
  }
});

//验证身份证信息
Validator.extend("idCard", {
  getMessage: function(field, args) {
    return field + "格式不正确";
  },
  validate: function(value) {
    var aCity = {
      11: "北京",
      12: "天津",
      13: "河北",
      14: "山西",
      15: "内蒙古",
      21: "辽宁",
      22: "吉林",
      23: "黑龙江",
      31: "上海",
      32: "江苏",
      33: "浙江",
      34: "安徽",
      35: "福建",
      36: "江西",
      37: "山东",
      41: "河南",
      42: "湖北",
      43: "湖南",
      44: "广东",
      45: "广西",
      46: "海南",
      50: "重庆",
      51: "四川",
      52: "贵州",
      53: "云南",
      54: "西藏",
      61: "陕西",
      62: "甘肃",
      63: "青海",
      64: "宁夏",
      65: "新疆",
      71: "台湾",
      81: "香港",
      82: "澳门",
      91: "国外"
    };
    var isCardID = function(sId) {
      var iSum = 0;
      var info = "";
      if (!/^\d{17}(\d|x)$/i.test(sId)) return false;
      sId = sId.replace(/x$/i, "a");
      if (aCity[parseInt(sId.substr(0, 2))] == null) return false;
      var sBirthday =
        sId.substr(6, 4) +
        "-" +
        Number(sId.substr(10, 2)) +
        "-" +
        Number(sId.substr(12, 2));
      var d = new Date(sBirthday.replace(/-/g, "/"));
      if (
        sBirthday !=
        d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate()
      )
        return false;
      for (var i = 17; i >= 0; i--)
        iSum += (Math.pow(2, i) % 11) * parseInt(sId.charAt(17 - i), 11);
      if (iSum % 11 != 1) return false;
      //aCity[parseInt(sId.substr(0,2))]+","+sBirthday+","+(sId.substr(16,1)%2?"男":"女");//此次还可以判断出输入的身份证号的人性别
      return true;
    };
    return isCardID(value);
    //return /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(value);
  }
});