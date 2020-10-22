<template>
  <div>
    <template>
      <app-link
        v-if="!hasChildren(item)&&item.type==='1'"
        :isExternal="item.component==='2'"
        :to="item.frontUrl"
      >
        <el-menu-item :key="item.id" :index="item.component==='2'?'':item.frontUrl">
          <span class="_icon" v-html="item.icon"></span>
          <span slot="title">{{item.title}}</span>
        </el-menu-item>
      </app-link>

      <el-submenu
        v-else-if="hasChildren(item)&&item.type==='1'"
        :key="item.id"
        :index="item.frontUrl||item.id+''"
      >
        <template slot="title">
          <span class="_icon" v-html="item.icon"></span>
          <span>{{item.title}}</span>
        </template>
        <sider-item v-for="child in item.children"  :item="child" :key="child.id"></sider-item>
      </el-submenu>
    </template>
  </div>
</template>

<script>
import AppLink from './Link'
export default {
  name: 'SiderItem',
  props: {
    item: {
      type: Object,
      required: true
    },
    basePath: {
      type: String,
      default: ''
    }
  },
  components: {
    AppLink
  },
  computed: {
    hasChildren(menu) {
      return menu => {
        let num = menu.children.reduce((acc, cur) => {
    
          if (cur.type === '1') {
            acc += 1
          }
          return acc
        }, 0)
        if (num > 0) {
          return true
        }
        return false
      }
    }
  },
  watch:{
    $router(to,from){
      console.log(to,from)
    }
  }
}
</script>

<style lang="scss">
.el-menu {
  border-right: 0;
  .el-submenu-active {
    border-right: 5px solid #45d9a5;
  }
  ._icon {
    display: inline-block;
    width: 30px;
    // margin-right: 10px;
    text-align: center;
    // display: flex;
    // justify-content: center;
    // align-items: center;
    i.fa {
      font-size: 22px;
    }
  }
}
</style>
