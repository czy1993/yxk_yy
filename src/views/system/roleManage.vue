<template>
  <div id="role_manage" class="view-center">
    <div class="_content">
      <ul >
      <li>
        <span>账号</span>
        {{$route.query.username}}
      </li>
      <li>
        <span>管理区域</span>
        <div class="from-value">
          <el-select
            v-if="!disabled(permissionList.regionLevel)"
            class="selects"
            v-model="regionLevel"
          >
            <el-option
              v-for="item in regionsType[detail.regionLevel]"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
          <span
            style="width:70px;display:inline-block;text-align:center"
            v-else
          >{{levelType[permissionList.regionLevel]}}</span>
          <el-select v-if="regionLevel!='0'" :disabled="disabled(permissionList.regionLevel)" multiple v-model="areas">
            <el-option v-for="item in area_list" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </div>
      </li>
      <li>
        <span>权限管理</span>
        <div class="_menu">
          <span>菜单权限选择</span>
          <div class="_tree">
            <el-tree
              :check-strictly="true"
              ref="tree"
              default-expand-all
              :data="allMessage"
              show-checkbox
              node-key="id"
              :default-expanded-keys="expanded"
              :default-checked-keys="checked"
              :props="defaultProps"
            ></el-tree>
          </div>
        </div>
      </li>
      <li>
        <span></span>
        <div>
          <button @click="$router.go(-1)" class="buts buts_cancel">取消</button>
          <button @click="submit" class="buts buts_ok">完成</button>
        </div>
      </li>
    </ul>
    </div>
    
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import { queryAllRegion, queryRegion } from "@/api";
import { getAccountInfo } from "@/utils/auth";
export default {
  data() {
    return {
      province: "",
      areas: [],
      defaultProps: {
        children: "children",
        label: "title"
      },
      regionLevel: "",
      levelType: {
        "0": "全国",
        "1": "省",
        "2": "市"
      },
      regionsType: {
        "0": [
          {
            name: "全国",
            id: "0"
          },
          {
            name: "省",
            id: "1"
          }
        ],
        "1": [
          {
            name: "省",
            id: "1"
          },
          {
            name: "市",
            id: "2"
          }
        ],
        "2": [
          {
            name: "市",
            id: "2"
          }
        ]
      },
      allMessage: [],
      detail: "",
      preExpanded: [],
      preChecked: [],
      expanded: [1, 83],
      checked: [],
      area_list: [],
    };
  },
  computed: {
    ...mapState(["permissionList"]),
    disabled(level) {
      // console.log(level)
      return level => {
        for (let item of this.regionsType[this.detail.regionLevel]) {
          if (level === item.id) {
            return false;
          }
        }
        return true;
      };
    }
  },
  created() {
    this.detail = getAccountInfo();
    this.initAllMessage();
    // this.initRegion();
    // this.areas = this.$route.query.regionId
    console.log(this.permissionList)
  },
  mounted() {
    // console.log(getAccountInfo());
  },
  methods: {
    ...mapActions(["searchUserMenu", "updateUserMenu"]),
    initAllMessage() {
      this.searchUserMenu("").then(res => {
        this.allMessage = res.data.menus;
        // console.log(this.allMessage);
        this.initMessage();
      });
    },
    initMessage() {
      this.searchUserMenu(`?id=${this.$route.query.id}`).then(res => {
        
        this.initData();
        this.$nextTick(() => {
          this.promiseFn(this.permissionList.menus).then(() => {
            this.expanded = this.preExpanded;
            this.checked = this.preChecked;
          });
        });
      });
    },
    initData() {
      this.regionLevel = this.permissionList.regionLevel;
      this.areas = this.permissionList.regionIds
        .split(",")
        .reduce((acc, cur) => {
          acc.push(Number(cur));
          return acc;
        }, []);

    },
    recursive(arr) {
      for (let item of arr) {
        if (!~item.parentId) {
          this.preExpanded.push(item.id);
        }
        this.preChecked.push(item.id);

        if (item.children.length > 0) {
          this.recursive(item.children);
        }
      }
    },
    promiseFn(arr) {
      return new Promise(resolve => {
        this.recursive(arr);
        resolve();
      });
    },

    submit() {
      // let menuChecked = this.$refs.tree.getCheckedNodes(false, true);
      // let menuId = menuChecked.reduce((acc, cur) => {
      //   acc.push(cur.id);
      //   return acc;
      // }, []);
      let menuNodeList = this.$refs.tree.getCheckedNodes();
      let menuIds = menuNodeList.reduce((acc, cur) => {
        if(cur.parentIds == '-1111,'){
          console.log(cur.parentIds)
        }
        let arr = cur.parentIds.split(",").filter(num => {
          let number = Number(num);
          if (number !== -1 && number !== 0) {
            return true;
          }
        });
        arr = arr.map(num => {
          return Number(num);
        });

        return acc.concat(arr, [cur.id]);
      }, []);

      menuIds = Array.from(new Set(menuIds));
      this.updateUserMenu({
        menus: menuIds,
        regionIdList: this.areas,
        regionLevel: this.regionLevel,
        username: this.$route.query.username,
        userId: this.$route.query.id
      }).then(res => {
        if (res.code === 200) {
          this.$message.success({
            message: "修改成功！",
            duration: 1000,
            onClose: () => {
              this.$router.push("/system");
            }
          });
        }
      });
    }
  },
  watch: {
    regionLevel(val) {
      if (val === "0") {
        queryAllRegion().then(res => {
          if (res.code === 200) {
            this.area_list = res.data;
          }
        });
        
      } else {
        queryRegion({
          level: val
        }).then(res => {
          this.area_list = res;
          this.initData()
        });
        this.areas = []
      }
      
    }
    
  }
};
</script>

<style lang="scss" scoped>
@import "@/styles/mixin.scss";
#role_manage {
  ._content {
    width: 100%;
    
    list-style: none;
    height: 100%;
    padding: 50px 20px 20px;
    display: flex;
    flex-direction: column;
    overflow: auto;
    @include scroll-bar;
    ul{
      width: 600px;
      margin: auto;
    }
    li {
      display: flex;
      align-items: center;
      margin-bottom: 30px;
      & > span {
        display: inline-block;
        width: 80px;
        text-align: justify;
        text-align-last: justify;
        margin-right: 30px;
      }
      &:nth-of-type(3) {
        align-items: flex-start;
        flex: 1;
        // margin-bottom: 20;
      }
      ._menu {
        span {
          display: block;
          margin-bottom: 25px;
        }
      }
      .from-value {
        .selects {
          width: 150px;
        }
      }
    }
  }
}
</style>
