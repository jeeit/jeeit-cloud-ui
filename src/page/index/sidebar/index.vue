

<template>
  <div class="sidebar-container"
       :class="{'is-active':isCollapse}">
    <el-menu unique-opened
             :default-active="nowTagValue"
             mode="vertical"
             :show-timeout="200"
             background-color="#fff"
             text-color="#666"
             :collapse="isCollapse">
      <sidebar-item :menu="menu"
                    :isCollapse="isCollapse"></sidebar-item>
    </el-menu>
  </div>
</template>

<script>
import { setUrlPath, initMenu } from "@/util/util";
import { mapGetters } from "vuex";
import SidebarItem from "./sidebarItem";
import { validatenull } from "@/util/validate";
export default {
  name: "sidebar",
  components: { SidebarItem },
  data () {
    return {};
  },
  created () {
    this.$store.dispatch("GetMenu").then(data => {
      initMenu(this.$router, data);
    });
  },
  computed: {
    ...mapGetters(["menu", "tag", "isCollapse"]),
    nowTagValue: function () {
      return setUrlPath(this.$route);
    }
  },
  mounted () { },
  methods: {}
};
</script>
<style lang="scss" scoped>
</style>

