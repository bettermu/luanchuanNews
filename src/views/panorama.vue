<template>
  <!-- 全景 -->
  <table class="panorama">
    <tr>
      <td class="vt head-td">
        <Header/>
      </td>
    </tr>
    <tr>
      <td class="vt">
        <iframe class="pano-frame" v-bind:src="url" frameborder="0"></iframe>
      </td>
    </tr>
    <tr>
      <td class="vt foot-td">
        <Footer class="vt" fname="栾川全景"/>
      </td>
    </tr>
  </table>
</template>

<script>
import Header from "@/components/header/header.vue";
import Footer from "@/components/footer/footer.vue";

export default {
  name: "panorama",
  data() {
    return {
      url: ""
    };
  },
  components: {
    Header,
    Footer
  },
  mounted() {
    this.url = `http://10.4.186.162:8079/vr-web/views/index.jsp?piId=${this
      .$route.query.id || ""}`;
  }
};
</script>

<style>
html,
body {
  height: 100%;
}
</style>

<style scoped>
.panorama {
  top: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
}
.pano-frame {
  display: block;
  width: 100%;
  height: 100%;
}

.head-td {
  height: 134px;
}

.foot-td {
  height: 90px;
}
</style>