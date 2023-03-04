<template>
  <div class="setting-container">
    <div class="app-container">
      <el-card>
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="角色管理" name="role">
            <el-button type="primary" size="small" style="margin-bottom: 15px" @click="handleAdd"><i class="el-icon-plus"></i>新增角色</el-button></el-button>
            <el-table
            border
              :data="tableData"
              style="width: 100%">
              <el-table-column
              prop="id"
                type="index"
                label="序号"
                width="100">
              </el-table-column><el-table-column
              prop="name"
                label="角色名称"
                width="width">
              </el-table-column><el-table-column
              prop="description"
                label="描述"
                width="width">
              </el-table-column><el-table-column
                label="操作"
                width="width">
                <template slot-scope="{row}">
                  <el-button type="success" size="small" @click="handlePermisson(row)">分配权限</el-button>
                  <el-button type="primary" size="small" @click="handleEdit(row)">编辑</el-button>
                  <el-button type="danger" size="small" @click="handleDelete(row)">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
             <div class="page">
              <span class="demonstration">共{{page.total}}条</span>
              <el-pagination
                :current-page="page.page"
                :page-size="page.pagesize"
                :total="page.total"
                layout="prev, pager, next"
                @current-change="changePage"
              ></el-pagination>
              <el-dialog
              title="新增角色"
              left
              :visible.sync="centerDialogVisible"
              width="50%"
              center>
            <el-form ref="form" :model="formData" label-width="80px" :rules="rules">
                <el-form-item label="角色" prop="name">
                  <el-input v-model="formData.name"></el-input>
                </el-form-item>
                <el-form-item label="描述">
                  <el-input v-model="formData.description"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
              <el-button @click="centerDialogVisible = false">取 消</el-button>
              <el-button type="primary" @click="handleSubmit">确 定</el-button>
                </span>
              </el-dialog>
             </div>
             </el-tab-pane>
          <el-tab-pane label="公司信息" name="info">公司信息</el-tab-pane>
        </el-tabs>
      </el-card>
    </div>
  </div>
</template>

<script>
import {
  getRole,
  deleteRole,
  updateInfo,
  getRoleDetail,
  addRole,
} from "@/api/setting";
export default {
  data() {
    return {
      formData: {
        name: "",
        description: "",
      },
      centerDialogVisible: false,
      activeName: "role",
      tableData: [],
      page: {
        page: 1,
        pagesize: 10,
        total: 0,
      },
      rules: {
        name: { required: true, message: "角色名不能为空", trigger: "blur" },
      },
    };
  },
  methods: {
    handleClick() {},
    // 获取角色
    async getRole() {
      try {
        const { data } = await getRole(this.page);
        this.tableData = data.data.rows;
        console.log(data.data.total);
        this.page.total = data.data.total;
      } catch (error) {
        console.log(error);
      }
    },
    // 改变页数
    changePage(page) {
      this.page.page = page;
      this.getRole(this.page);
    },
    // 删除
    async handleDelete(row) {
      try {
        await this.$confirm("确定删除改角色吗?");
        await deleteRole(row.id);
        this.$message("删除角色成功");
      } catch (error) {
        console.log(error);
      }
    },
    // 权限管理
    handlePermisson(row) {},
    // 编辑
    async handleEdit(row) {
      try {
        const res = await getRoleDetail(row.id);
        this.formData = res.data.data;
        this.centerDialogVisible = true;
      } catch (error) {
        console.log(error);
      }
    },
    // 提交编辑
    handleSubmit() {
      this.$refs.form.validate(async (value) => {
        try {
          if (value) {
            if (this.formData.id) {
              const res = await updateInfo(this.formData);
            } else {
              // 新增
              try {
                const res = await addRole(this.formData);
                this.$message("新增成功");
              } catch (error) {
                console.log(error);
              }
            }
            this.getRole();
            this.centerDialogVisible = false;
          }
        } catch (error) {}
      });
    },
    //新增
    handleAdd() {
      this.centerDialogVisible = true;
    },
  },
  created() {
    this.getRole();
  },
};
</script>

<style lang="scss" scope>
.page {
  margin-top: 15px;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 14px;
}
</style>