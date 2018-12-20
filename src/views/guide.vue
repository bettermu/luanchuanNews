<template>
  <!-- 导游导览 -->
  <div class="guide">
    <Header/>

    <div class="rel map-container">
      <div id="container"></div>
      <div id="resetMap" class="abs cp reset-map-btn"></div>
    </div>

    <!-- 简介弹框 -->
    <div id="introDialog" class="dn bcfff abs intro-dialog">
      <div class="rel id-head">
        <img id="firstImg" src="../assets/img/guide/id-demo.png" alt srcset>
        <!-- <div class="abs cfff id-head-inner">
          <div class="id-head-pad"></div>
          <div class="clearfix id-head-w">
            <div class="fr img-count">10</div>

            <div class="ell id-head-title">黄山风景区</div>
          </div>
        </div>-->
      </div>

      <div class="id-main">
        <div class="clearfix id-main-head">
          <div class="c333 vt dlb id-main-title">简介</div>
          <a id="toggleAudio" class="toggle-audio paused audio-switch" href="javascript:"></a>
          <div class="dlb vt clearfix ovh toggle-language">
            <div class="fl lang-item">
              <input type="radio" name="language" value="langCn" id="langCn" checked>
              <label for="langCn">中</label>
            </div>
            <div class="fl lang-item">
              <input type="radio" name="language" value="langEn" id="langEn">
              <label for="langEn">英</label>
            </div>
          </div>
        </div>

        <div id="desCont" class="c333 id-main-body"></div>
      </div>
    </div>

    <!-- audioPlayer 音频播放器 -->
    <div id="audioPlayer" class="dn abs clearfix audio-player">
      <a class="abs ap-close-btn" href="javascript:"></a>

      <div id="playBtnWrap" class="fl bcfff rel ovh play-btn-w paused audio-switch">
        <!-- <img class="play-btn-bg" src="../assets/img/guide/play-btn-bg.png" alt srcset> -->
        <a class="abs play-btn" href="javascript:"></a>
      </div>

      <div class="f20 ap-main">
        <div id="audioName" class="cfff ell audio-name"></div>

        <div class="clearfix progress-bar">
          <div id="curTime" class="fl cur-time">00:00</div>
          <div class="fl pb-bar">
            <input id="audioBar" type="range" value="0">
          </div>
          <div id="totalTime" class="fl total-time">00:00</div>
        </div>
      </div>
    </div>

    <Footer fname="语音导游导览"/>
  </div>
</template>

<script>
import { apiPath } from "@/config.js";
import { MP } from "@/utils/map.js";
import { getVNInfoMapList, getVnInfoVoForHome } from "@/utils/dataTranform.js";
import Header from "@/components/header/header.vue";
import Footer from "@/components/footer/footer.vue";
import $ from "jquery";
import { Howl } from "howler";
import "rangeslider.js";
import "jquery.nicescroll";

function pageInit(BMap, vm) {
  var doc = document,
    imgArr = [];

  var clickFlag = true;

  var introDialog = {
    tempData: null,

    textTimeStamp: [],

    $introDialog: $("#introDialog"),

    init: function() {
      this.bindEvent();
      $("#desCont").niceScroll({
        cursorcolor: "#d7d7d7"
      });
    },

    bindEvent: function() {
      $(doc).on("click", function(e) {
        var target = $(e.target);
        if (
          !target.is("#introDialog") &&
          !target.is("#introDialog *") &&
          !target.is("#audioPlayer") &&
          !target.is("#audioPlayer *") &&
          !target.is("#videoPlayer") &&
          !target.is("#videoPlayer *")
        ) {
          introDialog.close();
        }
      });

      //打开swiper
      $(doc).on("click", "#showImgSwiper", function() {
        //console.log(imgArr);
        if (imgArr) {
          $("#swiperWrap").removeClass("vh");
        }
      });

      // 中英文切换
      $(doc).on("click", ".toggle-language", function() {
        introDialog.switchLang();
      });

      $(doc).on("click", ".change-wrap", function(e) {
        var lang = e.target.value;
        lang === "langCn"
          ? ($('input[name="language"]')[0].checked = true)
          : ($('input[name="language"]')[1].checked = true);
        if (
          !$("#audioPlayer").hasClass("dn") ||
          !$("#introDialog").hasClass("dn")
        ) {
          introDialog.switchLang();
        }
      });
    },

    setData: function(data) {
      var point = data.data;

      introDialog.tempData = point;

      if (point.detailImgList.length) {
        $("#firstImg").attr({ src: point.detailImgList[0] });
        // $("#imgNum").text(point.xqImg.length);
      }

      $("#pointName, #audioName").text(point.gName);

      // $("#playBtnBg").attr({ src: point.sdImg });

      introDialog.setText();
    },

    reset: function() {
      $("#firstImg, #playBtnBg").attr({ src: "" });
      $("#imgNum").text(0);
      $("#pointName, #audioName").text("");
      $("#toggleAudio").addClass("vh");
      $("#watchVideo").addClass("dn");
      $("#desCont").html("");
    },

    switchLang: function() {
      introDialog.setText();
      player.stop();

      var lang = $('input[name="language"]:checked').val(),
        tempData = introDialog.tempData,
        song = "";

      if (tempData) {
        if (lang === "langCn") {
          song = tempData.gSummaryFilePath;
        } else {
          song = tempData.egSummaryFilePath;
        }
      }

      if (song) {
        $("#toggleAudio").removeClass("vh");
        player.play(song);
      } else {
        $("#toggleAudio").addClass("vh");
        player.close();
      }
    },

    setText: function() {
      var lang = $('input[name="language"]:checked').val(),
        text = "",
        gName = "",
        tempData = introDialog.tempData;

      if (tempData) {
        gName = tempData.gName;
        if (lang === "langCn") {
          text = tempData.gSummary;
        } else {
          text = tempData.egSummary;
        }
      }

      text =
        "<p class='ell id-main-title' title='" +
        gName +
        "'>" +
        gName +
        "</p><p>" +
        text +
        "</p>";

      $("#desCont").html(text);
    },

    bindSlideShowFn: function(fn) {
      $(doc).on("click", ".id-head-inner", function() {
        var imgSrc = [];
        fn(imgSrc);
      });
    },

    open: function(data) {
      introDialog.reset();
      introDialog.setData(data);
      player.close();
      if (data.code === 0) {
        introDialog.$introDialog.removeClass("dn");

        // data.data.gSummaryFilePath = "黄昏里.mp3";
        // data.data.egSummaryFilePath = "遗忘.mp3";

        if (data.data.gSummaryFilePath || data.data.egSummaryFilePath) {
          var lang = $('input[name="language"]:checked').val(),
            song =
              lang === "langCn"
                ? introDialog.tempData.gSummaryFilePath
                : introDialog.tempData.egSummaryFilePath;
          if (song) {
            $("#toggleAudio").removeClass("vh");
            player.play(song);
          } else {
            $("#toggleAudio").addClass("vh");
            player.close();
          }
        }
      }
    },

    close: function() {
      introDialog.$introDialog.addClass("dn");
    }
  };

  introDialog.init();

  var rangeslider = {
    init: function() {
      $("#audioBar").rangeslider({
        // Deactivate the feature detection
        polyfill: false,

        // Callback function
        onInit: function() {},

        // Callback function
        onSlide: function() {},

        // Callback function
        onSlideEnd: function(position, value) {
          player.instance.seek([value]);
        }
      });
    }
  };

  rangeslider.init();

  var player = {
    $audioPlayer: $("#audioPlayer"),
    $playBtnWrap: $("#playBtnWrap"),
    $curTime: $("#curTime"),
    $audioBar: $("#audioBar"),
    $totalTime: $("#totalTime"),

    instance: null,

    ctor: function(songSrc) {
      if (player.instance) {
        player.instance.unload();
      }
      player.$playBtnWrap.addClass("loading");
      player.instance = new Howl({
        src: [songSrc],
        onload: function() {
          player.$playBtnWrap.removeClass("loading");
          var duration = player.instance.duration();
          player.$audioBar.attr({
            max: duration
          });
          player.$audioBar.rangeslider("update", true);
          player.$totalTime.text(player.formatTime(Math.round(duration)));
        },
        onplay: function(id) {
          requestAnimationFrame(player.step.bind(player));
          $(".audio-switch").removeClass("paused");
        },
        onstop: function() {
          playCount();
          player.$audioBar.val(0).change();
          player.$curTime.text("0:00");
        }
      });

      player.instance.on("end", function() {
        $(".audio-switch").addClass("paused");
        player.stopReading();
      });
    },

    init: function() {
      this.bindEvent();
    },

    bindEvent: function() {
      $(doc).on("click", ".audio-switch", function(e) {
        var $this = $(".audio-switch");
        $this.toggleClass("paused");

        if ($this.hasClass("paused")) {
          player.instance && player.instance.pause();
        } else {
          if (player.$audioPlayer.hasClass("dn")) {
            $('input[name="language"]:checked').click();
          } else {
            player.instance && player.instance.play();
          }
        }
      });

      $(doc).on("click", ".ap-close-btn", function(e) {
        player.close();
        playCount();
      });
    },

    play: function(songSrc) {
      player.ctor(songSrc);
      player.open().instance.play();
      return this;
    },

    pause: function() {
      player.$playBtnWrap.addClass("paused");
      player.instance.pause();
      return this;
    },

    stop: function() {
      $(".audio-switch").addClass("paused");
      if (player.instance) {
        player.instance.stop();
        player.instance.unload();
      }

      return this;
    },

    open: function() {
      player.$audioPlayer.removeClass("dn");
      return this;
    },

    close: function() {
      player.stop().$audioPlayer.addClass("dn");
      return this;
    },

    setReading: function(time) {
      var $reading = $("[data-time=" + time + "]");

      if ($reading.length) {
        $(".reading").removeClass("reading");
        $reading.addClass("reading")[0].scrollIntoView({
          block: "start",
          behavior: "smooth"
        });
      }
    },

    stopReading: function() {
      $(".reading").removeClass("reading");
      $("#desCont p:first")[0].scrollIntoView({
        block: "start",
        behavior: "smooth"
      });
    },

    step: function() {
      var self = this;
      var sound = player.instance;
      var seek = sound.seek() || 0;
      playTime = seek;
      var roundSeek = Math.round(seek);
      player.setReading(roundSeek);
      player.$curTime.text(player.formatTime(roundSeek));
      player.$audioBar.val(seek).change();
      if (sound.playing()) {
        requestAnimationFrame(self.step.bind(self));
      }
    },

    formatTime: function(secs) {
      var minutes = Math.floor(secs / 60) || 0;
      var seconds = secs - minutes * 60 || 0;
      return minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
    }
  };

  player.init();
  window.player = player;

  //后端接口
  var dao = {
    //获取景点信息
    getSenceSpotData: function(param, successCb, failCb) {
      $.ajax({
        url: apiPath + "/vr-rest/vnInfo/getVNInfoMapList",
        dataType: "json",
        // type: "post",
        data: param,
        success: function(data, textStatus, jqXHR) {
          successCb && successCb(data, textStatus, jqXHR);
        },
        error: function(jqXHR, textStatus, errorThrown) {
          failCb && failCb(jqXHR, textStatus, errorThrown);
        }
      });
    },

    //获取所有子景点信息
    getSonSenceSpotData: function(param, successCb, failCb) {
      $.ajax({
        url: "./getAllSonScenicSpots.do",
        dataType: "json",
        type: "post",
        data: param,
        success: function(data, textStatus, jqXHR) {
          successCb && successCb(data, textStatus, jqXHR);
        },
        error: function(jqXHR, textStatus, errorThrown) {
          failCb && failCb(jqXHR, textStatus, errorThrown);
        }
      });
    },

    //获取景点详情
    getSenceSpotInfo: function(param, successCb, failCb) {
      $.ajax({
        url: apiPath + "/vr-rest/vnInfo/getVnInfoVoForHome",
        dataType: "json",
        type: "post",
        data: param,
        success: function(data, textStatus, jqXHR) {
          successCb && successCb(data, textStatus, jqXHR);
        },
        error: function(jqXHR, textStatus, errorThrown) {
          failCb && failCb(jqXHR, textStatus, errorThrown);
        }
      });
    }
  };

  // 播放次数统计
  var playTime = "";
  function playCount() {
    var str = JSON.stringify({
      gId: introDialog.tempData.gid,
      listenTime: playTime,
      isScenicPlay: "true"
    });
    $.ajax({
      url: apiPath + "/vr-rest/vnInfo/savePlayRecord",
      dataType: "json",
      type: "POST",
      data: {
        jsonStr: str
      }
    });
  }

  //全局数据处理层
  var dataHandler = {
    //获取景点信息
    getSenceSpotData: function() {
      dao.getSenceSpotData(
        {},
        function(data) {
          if (data.code === 0) {
            if (data.data.length) {
              for (var i = 0, len = data.data.length; i < len; i++) {
                data.data[i] = getVNInfoMapList(data.data[i]);
              }

              gdToBdArr(data.data);
              index.points = data.data;
              //渲染景点
              index.addSpots(index.points);

              if (vm.$route.query.id) {
                dao.getSenceSpotInfo(
                  { gid: vm.$route.query.id },
                  function(data) {
                    if (data.code === 0) {
                      // 弹出简介
                      introDialog.open(data);
                    }
                  },
                  function() {}
                );
              }
            }
          }

          // if (data && data.ListGetVoiceNavResult) {
          //   gdToBdArr(data.ListGetVoiceNavResult);
          //   index.points = data.ListGetVoiceNavResult;
          //   //渲染景点
          //   index.addSpots(index.points);
          // }
        },
        function() {}
      );
    },

    //获取子景点信息
    getSonSenceSpotData: function(fn) {
      dao.getSonSenceSpotData(
        {},
        function(data) {
          if (data && data.ListGetVoiceNavResult) {
            //index.map.mapObj.clearOverlays();

            gdToBdArr(data.ListGetVoiceNavResult);

            //重新渲染子节点
            index.sonPoints = data.ListGetVoiceNavResult;
            index.map.mapObj.clearOverlays();
            index.addSpots(index.points);
            index.addSpots(index.sonPoints);

            fn && fn();
          }
        },
        function() {}
      );
    },

    //获取景区详情
    getSenceSpotInfo: function(that) {
      dao.getSenceSpotInfo(
        { gid: that._id },
        function(data) {
          if (data.code === 0) {
            // 弹出简介
            introDialog.open(data);
          }
        },
        function() {}
      );
    }
  };

  //全局地图模块
  var index = {
    //景区列表数据
    points: [],

    //子景点列表数据
    sonPoints: null,

    //百度地图
    map: {
      //当前缩放等级
      currZoomNumber: null,

      //地图对象实例
      mapObj: null,

      //全景的中心点
      initPointCenter: new BMap.Point(111.622069, 33.792122),

      //返回控件实例
      //backControl: null,

      //初始化
      init: function() {
        // 创建Map实例
        var mapObj = new BMap.Map("container", {
          enableMapClick: false,
          minZoom: 11
        });

        this.mapObj = mapObj;
        this.mapObj.centerAndZoom(this.initPointCenter, 16); // 初始化地图,设置中心点坐标和地图级别
        this.mapObj.setCurrentCity("栾川"); // 设置地图显示的城市 此项是必须设置
        this.mapObj.enableScrollWheelZoom(true); //开启鼠标滚轮缩放
        this.mapObj.disableDoubleClickZoom(); //禁用双击放大
        this.currZoomNumber = this.mapObj.getZoom();

        //添加控件
        this.addControl();

        //添加缩放事件监听
        this.mapObj.addEventListener("zoomend", this.changeOverlay);

        //渲染景点
        // index.addSpots(index.points);

        //初始化显示隐藏相关点
        //index.showSpotByZoom(this.currZoomNumber);

        //定义地图样式
        this.mapObj.setMapStyle({
          styleJson: [
            {
              featureType: "land",
              elementType: "all",
              stylers: {
                color: "#eeefe6ff",
                hue: "#eeefe6"
              }
            },
            {
              featureType: "all",
              elementType: "labels.text.fill",
              stylers: {
                color: "#aaaaaaff"
              }
            },
            {
              featureType: "scenicspotslabel",
              elementType: "labels",
              stylers: {
                visibility: "off"
              }
            }
          ]
        });
      },

      resetMapCenter: function() {
        this.mapObj.centerAndZoom(this.initPointCenter, 16);
      },

      //添加地图类型控件
      addControl: function() {
        // 创建缩放控件
        var myZoomControl = new ZoomControl();

        // 创建返回控件
        //this.backControl = new BackControl();

        // 添加到地图当中
        this.mapObj.addControl(myZoomControl);
        //this.mapObj.addControl(this.backControl);
        //this.backControl.hide();
      },

      //创建景点水滴
      addSiteOverlay: function(point) {
        var mySiteOverlay = new SiteOverlay(point);
        this.mapObj.addOverlay(mySiteOverlay);
      },

      //监听缩放显示隐藏相关景点
      changeOverlay: function() {
        index.map.currZoomNumber = this.getZoom();

        function resetLable() {
          // if (!introDialog.$introDialog.hasClass('dn') || !player.$audioPlayer.hasClass('dn')) {
          //     doc.getElementById(curLabelId).checked = true;
          // }

          doc.getElementById(curLabelId).checked = true;
        }

        //缩放到一定程度，显示子景点
        if (index.map.currZoomNumber > 13) {
          // dataHandler.getSonSenceSpotData(resetLable);
        } else {
          this.clearOverlays();
          index.addSpots(index.points, resetLable);
        }
      }
    },

    //渲染景点
    addSpots: function(points, fn) {
      $.each(points, function(i, v) {
        index.map.addSiteOverlay(v);

        //如果是景区,则绘制区域范围
        if (v.isParent) {
          var areaCircle = new BMap.Circle(
            new BMap.Point(v.X, v.Y),
            parseInt(v.SSRadius) * 1000,
            {
              strokeColor: "#2bbd53",
              fillColor: "#c0dcb3",
              strokeWeight: 2,
              fillOpacity: 0.5
            }
          );
          index.map.mapObj.addOverlay(areaCircle);
        }
      });

      fn && fn();
    },

    //返回前一渲染景点
    backToPrevious: function() {
      index.map.mapObj.clearOverlays();

      index.addSpots(index.points);

      //重置地图中心

      index.map.mapObj.centerAndZoom(index.map.initPointCenter, 13);
    }
  };

  //自定义缩放控件
  function ZoomControl() {
    // 默认停靠位置和偏移量
    this.defaultAnchor = BMAP_ANCHOR_TOP_LEFT;
    this.defaultOffset = new BMap.Size(30, 30);
  }

  ZoomControl.prototype = new BMap.Control();
  ZoomControl.prototype.initialize = function(map) {
    var divWrap = document.createElement("div");
    divWrap.style.width = "46px";
    divWrap.style.height = "148px";
    divWrap.style.padding = "0 5px";
    divWrap.style.borderRadius = "3px";
    divWrap.style.backgroundColor = "#fff";
    divWrap.style.cursor = "pointer";

    var enlarge = document.createElement("div");
    enlarge.style.height = "73px";
    enlarge.style.borderBottom = "1px solid #ccc";
    enlarge.classList = "zoomin-btn";
    // enlarge.style.background =
    //   "url('../img/map/enlarge.png') no-repeat center center";

    var narrow = document.createElement("div");
    narrow.style.height = "73px";
    narrow.classList = "zoomout-btn";
    // narrow.style.background =
    //   "url('../img/map/narrow.png') no-repeat center center";

    //绑定放大事件
    enlarge.onclick = function() {
      map.setZoom(map.getZoom() + 1);
    };

    //绑定缩小事件
    narrow.onclick = function(e) {
      map.setZoom(map.getZoom() - 1);
    };

    //添加元素
    divWrap.appendChild(enlarge);
    divWrap.appendChild(narrow);

    map.getContainer().appendChild(divWrap);
    // 将DOM元素返回
    return divWrap;
  };

  //自定义水滴
  function SiteOverlay(point) {
    //景点ID
    this._id = point.ID;
    //景点名称
    this._name = point.SSName;
    //是否有音频
    this._hasVoice =
      point.ZHAudioPath.slice(-3) === "mp3" ||
      point.ENAudioPath.slice(-3) === "mp3"
        ? true
        : false;
    //点坐标
    this._point = new BMap.Point(point.X, point.Y);
    //是否为景区
    this._isParent = point.isParent;
    //this._hidden = point.hidden;
    this._imgArr = point.imgArr;
    //水滴图地址
    this._sdImg = point.sdImg;
    //图标地址
    this._bzImg = point.bzImg;
  }

  SiteOverlay.prototype = new BMap.Overlay();

  var curLabelId;

  SiteOverlay.prototype.initialize = function(map) {
    this._map = map;
    var that = this;
    //创建包裹层
    var siteOver = (this._div = document.createElement("div"));
    siteOver.className = "site-over";
    var wrapImg = document.createElement("div");
    wrapImg.className = "wrap-img";

    //创建水滴背景层
    var wrapBg = document.createElement("div");
    wrapBg.className = "wrap-bg";

    //创建景点图片
    var img = document.createElement("img");
    img.setAttribute("src", this._sdImg);

    //创建喇叭图层
    var hasVoice = document.createElement("div");
    hasVoice.className = "has-voice";

    //如果没有音频，就隐藏喇叭
    if (!this._hasVoice) {
      hasVoice.className += "dn";
    }

    //水滴单选框
    var label = document.createElement("label");
    label.setAttribute("for", this._id);
    var changeStatus = document.createElement("input");
    changeStatus.setAttribute("id", this._id);
    changeStatus.setAttribute("type", "radio");
    changeStatus.className = "change-status";
    changeStatus.setAttribute("name", "site");

    //点击弹窗事件
    label.onclick = function(e) {
      curLabelId = e.target.getAttribute("for");

      if (clickFlag) {
        $(".wrap-bg").removeClass("focus");
        $(wrapBg).addClass("focus");

        dataHandler.getSenceSpotInfo(that);
      }
    };
    var x1, y1, x2, y2;

    label.onmousedown = function(e) {
      x1 = e.screenX;
      y1 = e.screenY;
    };
    label.onmouseup = function(e) {
      x2 = e.screenX;
      y2 = e.screenY;
      var d = Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2));

      clickFlag = d < 7 ? true : false;
    };

    //创建景点图标包裹层
    var senceWrap = document.createElement("div");
    senceWrap.className = "sence-wrap";

    //创建景点图标
    var senceImg = document.createElement("img");
    senceImg.setAttribute("src", this._bzImg);

    //创建景点文字
    var senceTitle = document.createElement("span");
    senceTitle.className = "sence-title";

    //如果是景区
    if (this._isParent) {
      senceTitle.className = "sence-title-lg";
    }
    senceTitle.innerHTML = this._name;

    //添加元素
    // wrapImg.appendChild(img);
    // wrapImg.appendChild(hasVoice);
    // senceWrap.appendChild(senceImg);
    // senceWrap.appendChild(senceTitle);
    siteOver.appendChild(wrapImg);
    siteOver.appendChild(label);
    siteOver.appendChild(changeStatus);
    siteOver.appendChild(wrapBg);
    // siteOver.appendChild(senceWrap);
    index.map.mapObj.getPanes().labelPane.appendChild(siteOver);
    return siteOver;
  };
  SiteOverlay.prototype.draw = function() {
    var map = this._map;
    var pixel = map.pointToOverlayPixel(this._point);
    this._div.style.left = pixel.x - 84 + "px";
    this._div.style.top = pixel.y - 64 + "px";
  };

  //高德地图坐标转百度地图坐标
  function gdToBd(gg_lng, gg_lat) {
    var X_PI = (Math.PI * 3000.0) / 180.0;
    var x = gg_lng,
      y = gg_lat;
    var z = Math.sqrt(x * x + y * y) + 0.00002 * Math.sin(y * X_PI);
    var theta = Math.atan2(y, x) + 0.000003 * Math.cos(x * X_PI);
    var bd_lng = z * Math.cos(theta) + 0.0065;
    var bd_lat = z * Math.sin(theta) + 0.006;
    return {
      bd_lat: bd_lat,
      bd_lng: bd_lng
    };
  }

  //高德转百度集合坐标
  function gdToBdArr(points) {
    $.each(points, function(i, v) {
      var after = gdToBd(v.X, v.Y);
      v.X = after.bd_lng;
      v.Y = after.bd_lat;
    });
  }

  var handler = {
    init: function() {
      this.bindEvent();
    },
    bindEvent: function() {
      //语音切换
      $(doc).on("click", "#voice", function(e) {
        e.stopPropagation();
        var $voiceWrap = $(this).find(".change-wrap");
        if ($voiceWrap.hasClass("dn")) {
          $voiceWrap.removeClass("dn");
        } else {
          $voiceWrap.addClass("dn");
        }
      });

      //阻止传播
      $(doc).on("click", ".change-wrap", function(e) {
        e.stopPropagation();
      });
      $(doc).on("click", "#swiperWrap", function(e) {
        e.stopPropagation();
      });

      //点击空白关闭
      $(doc).on("click", function() {
        var $voiceWrap = $(this).find(".change-wrap");
        if (!$voiceWrap.hasClass("dn")) {
          $(this)
            .find(".change-wrap")
            .addClass("dn");
        }
      });

      //切换到全景
      $(doc).on("click", "#showAllSence", index.backToPrevious);

      $(doc).on("click", "#resetMap", function() {
        index.map.resetMapCenter();
      });
    }
  };

  //初始化地图
  index.map.init();

  handler.init();
  //获取景区数据
  dataHandler.getSenceSpotData();
}

export default {
  name: "guide",
  components: {
    Header,
    Footer
  },
  mounted() {
    this.$nextTick(function() {
      let that = this;
      if (document.getElementById("bmapjs")) {
        pageInit(window.BMap, that);
      } else {
        MP("Og4qabOEMOIDWQhfME9SN9gI").then(function() {});
        setTimeout(function() {
          pageInit(window.BMap, that);
        }, 300);
      }
    });
  },
  beforeRouteLeave(to, from, next) {
    // 关闭可能打开的音频播放器
    const player = window.player;
    if (player) {
      player.close();
    }

    next();
  }
};
</script>

<style scoped>
@import url("../styles/guide/intro-dialog.css");
@import url("../styles/guide/rangeslider.css");
@import url("../styles/guide/player.css");
@import url("../styles/guide/index.css");
</style>