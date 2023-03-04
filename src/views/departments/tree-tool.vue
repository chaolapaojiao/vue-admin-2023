<template>
  <el-row
    slot-scope="{ data }"
    type="flex"
    justify="space-between"
    align="middle"
    style="height: 40px; width: 100%"
  >
    <el-col>
      <!-- 左侧内容 -->
      <span>{{ treeNodes.name }}</span>
    </el-col>
    <el-col :span="4">
      <el-row type="flex" justify="end">
        <el-col>{{ treeNodes.manager }}</el-col>
        <el-col>
          <!-- 放置下拉菜单 -->
          <el-dropdown @command="handleCommand">
            <!-- 内容 -->
            <span
              >操作
              <i class="el-icon-arrow-down" />
            </span>
            <!-- 具名插槽 -->
            <el-dropdown-menu slot="dropdown">
              <!-- 下拉选项 -->
              <el-dropdown-item command="add">添加子部门</el-dropdown-item>
              <el-dropdown-item v-if="!isRoot" command="edit"
                >编辑部门</el-dropdown-item
              >
              <el-dropdown-item v-if="!isRoot" command="del"
                >删除部门</el-dropdown-item
              >
            </el-dropdown-menu>
          </el-dropdown>
        </el-col>
      </el-row>

      <!-- 右侧内容 -->
    </el-col>
  </el-row>
</template>

<script>
import { removeDepartment } from "@/api/department";
export default {
  props: {
    treeNodes: {
      type: Object,
      required: true,
    },
    isRoot: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {};
  },
  methods: {
    async handleCommand(type) {
      if (type === "del") {
        try {
          const res = await removeDepartment(this.treeNodes.id);
        } catch (error) {
          console.log(error);
        }
      } else if (type === "add") {
        // console.log(this.treeNodes);
        this.$emit("addDepts", this.treeNodes);
      } else if (type === "edit") {
        this.$emit("addDepts", this.treeNodes);
      }
    },
  },
};
</script>

<style lang="scss" scope>
.el-button {
  margin-left: 35%;
}
.el-dialog {
  box-shadow: none;
}
.el-input {
  width: 500px;
}
</style>