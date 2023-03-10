<template>
  <div class="assginrole">
    <el-dialog title="分配角色" :visible="showRoleDialog">
      <!-- el-checkbox-group选中的是 当前用户所拥有的角色  需要绑定 当前用户拥有的角色-->
      <el-checkbox-group v-model="roleIds">
        <el-checkbox v-for="item in list" :key="item.id"  :label="item.name"></el-checkbox>
      </el-checkbox-group>
      <el-row slot="footer" type="flex" justify="center">
        <el-col :span="12">
          <el-button type="primary" size="small" @click="handleUpdate">确定</el-button>
          <el-button size="small" @click="handleCancel">取消</el-button>
        </el-col>
      </el-row>
    </el-dialog>
  </div>
</div>
</template>

<script>
import { assignRole } from "@/api/employees";
import { getRole } from "@/api/setting";
export default {
  props: {
    showRoleDialog: {
      type: Boolean,
      default: false,
    },
    // 用户的id 用来查询当前用户的角色信息
    userId: {
      type: String,
      default: null,
    },
  },
  data() {
    return {
      roleIds: [],
      list: [],
    };
  },
  methods: {
    // 获取权限列表
    async getRole() {
      try {
        const res = await getRole();
        this.list = res.data.data.rows;
      } catch (error) {
        console.log(error);
      }
    },
    // 修改员工权限
    async handleUpdate() {
      this.$emit("handleClose");
      try {
        const res = await assignRole({
          roleIds: this.roleIds,
          id: this.userId,
        });

        console.log(res);
      } catch (error) {
        console.log(error);
      }
    },
    // 取消
    handleCancel() {
      this.$emit("handleClose");
    },
  },
  created() {
    this.getRole();
  },
};
</script>

<style>
</style>