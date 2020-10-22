<template>
  <div id="about" class="view-center">
    <div class="right-bus">
      <!-- <span class="buts but_c">关闭菜单</span> -->
    </div>
    <div class="main-view">
      <div class="about-center">
        <div class="about-list" v-for="(item,index) in qRCodeList" :key="index">
          <div>
            <!-- <img src="../../../static/img/icon/erm.png" alt> -->
            <div :ref="`qrcode_${index+1}`" class="_qrcode"></div>
          </div>
          <h4>{{item.name}}</h4>
          <p>{{item.text}}</p>
        </div>
      </div>
      <div class="about-foot">
        <img :src="aboutData.officialPic" alt>
        <p>客户电话：{{telphone}}</p>
        <p>{{aboutData.officialUrl}}</p>
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions, mapState } from "vuex";

export default {
  data() {
    return {
      aboutData: [],
      filter:['tel_phone','system_desc'],
      qrcode: ""
    };
  },
  computed: {
    qRCodeList() {
      return this.aboutData.reduce((acc, cur) => {
        // console.log(acc,cur)
        if (!this.filter.includes(cur.confId)) {
          acc.push({
            name: cur.label,
            url: cur.confValue
          });
        }
        return acc;
      }, []).filter((item)=>{
        return !!item.url
      })
    },
    telphone(){
      return  this.aboutData.find((item)=>{
       return item.confId==='tel_phone'

      }).confValue
    }
  },
  created() {
    this.initAboutList();
  },
  mounted() {
    this.initQrCode();
  },
  methods: {
    ...mapActions(["findSystemAbout"]),
    initAboutList() {
      this.findSystemAbout().then(res => {
        if (res.code === 200) {
          this.aboutData = res.data;
        }
      });
    },
    generateQrcode(dom, url) {
      this.qrcode = new QRCode(dom, {
        text: url,
        width: 120,
        height: 120,
        colorDark: "#000000",
        colorLight: "#ffffff"
      });
    },
    initQrCode() {
      for (let [index, qr] of Object.keys(this.$refs).entries()) {
        this.generateQrcode(this.$refs[qr][0], this.qRCodeList[index].url);
      }
    }
  },
  watch: {
    qRCodeList(val) {
      this.$nextTick(() => {
       this.initQrCode()
      });
    }
  }
};
</script>
<style lang="scss" scoped>
#about {
  position: relative;
  .main-view {
    display: flex;
    flex-direction: column;
    height: auto;
    background: #f7f7f7;
    .about-center {
      flex: 1;
      .about-list {
        float: left;
        width: 240px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-content: center;
        box-sizing: border-box;
        border: 1px solid #e9e9e9;
        border-radius: 6px;
        margin: 20px;
        background: #fff;
        div:not(._qrcode) {
          height: 170px;
          width: 240px;
          box-sizing: border-box;
          padding: 25px 60px;
          border-bottom: 1px solid #e9e9e9;
          margin-bottom: 10px;
          img {
            height: 120px;
          }
        }
        ._qrcode {
        }
        h4 {
          margin: 0;
          padding: 0 15px 10px 15px;
          font-size: 16px;
        }
        p {
          padding: 0 15px;
          font-size: 14px;
          color: #a6a6a6;
          margin-bottom: 15px;
        }
      }
    }
    .about-foot {
      width: 100%;

      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      text-align: center;
      padding-bottom: 80px;
      img {
        width: 40px;
        margin: 17px;
      }
      p {
        color: #aaaaaa;
        font-size: 12px;
        line-height: 16px;
      }
    }
  }
}
</style>