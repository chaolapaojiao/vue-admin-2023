<template>
  <div class="employees-container">
    <div class="app-container">
      <el-card class="header">
        <el-button type="info" disabled
          >共有{{ this.pageData.total }}条数据</el-button
        >
        <div class="btns">
          <el-button type="primary" size="small">导入</el-button>
          <el-button type="danger" size="small">导出</el-button>
          <el-button type="success" size="small">新增员工</el-button>
        </div>
      </el-card>
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column type="index" label="序号" width="100">
        </el-table-column>
        <el-table-column prop="username" label="姓名" width="100">
        </el-table-column>
        <el-table-column prop="address" label="头像" width="100">
          <template slot-scope="{ row }">
            <img
              v-imageerror="defaultImg"
              :src="row.staffPhoto"
              alt=""
              style="width: 40px; height: 40px"
            />
          </template>
        </el-table-column>
        <el-table-column prop="workNumber" label="工号" width="100">
        </el-table-column>
        <el-table-column label="聘用形式" width="100">
          <template slot-scope="{ row }">
            {{ row.formOfEmployment ? "正式" : "非正式" }}
          </template>
        </el-table-column>
        <el-table-column prop="departmentName" label="部门名称" width="100">
        </el-table-column>
        <el-table-column prop="timeOfEntry" label="入职时间" width="100">
        </el-table-column>
        <el-table-column prop="enableState" label="账户状态" width="90">
          <template slot-scope="{ row }">
            <el-switch
              v-model="row.enableState"
              active-color="#13ce66"
              inactive-color="#ccc"
            >
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="{ row }">
            <el-button type="text" size="small">查看</el-button>
            <el-button type="text" size="small">转正</el-button>
            <el-button type="text" size="small">调岗</el-button>
            <el-button type="text" size="small">离职</el-button>
            <el-button type="text" size="small">角色</el-button>
            <el-button type="text" size="small" @click="handleDelete(row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        background
        :page-size="pageData.size"
        :current-page="pageData.page"
        layout="prev, pager, next,total"
        :total="pageData.total"
        @current-change="handleCurrentChange"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
import { getEmployees, deleteEmployees } from "@/api/employees";
export default {
  data() {
    return {
      tableData: [],
      pageData: {
        page: 1,
        size: 10,
        total: 0,
      },
      defaultImg: require("../../assets/common/head.jpg"),
    };
  },
  methods: {
    // 获取员工数据
    async getEmployeeData() {
      try {
        const res = await getEmployees(this.pageData);
        // console.log(res);
        this.pageData.total = res.data.data.total;
        this.tableData = res.data.data.rows.map((item) => {
          item.timeOfEntry = item.timeOfEntry.substr(0, 10);
          return item;
        });
      } catch (error) {
        console.log(error);
      }
    },
    // 改变当前页数
    handleCurrentChange(page) {
      this.pageData.page = page;
      this.getEmployeeData();
    },
    // 删除按钮
    async handleDelete(row) {
      try {
        await this.$confirm("确定删除改员工吗");
        await deleteEmployees(row.id);
        this.$message("删除成功");
      } catch (error) {
        console.log(error);
      }
    },
  },
  created() {
    this.getEmployeeData();
  },
};
</script>

<style lang='scss' scope>
.header {
  width: 100%;
}
.el-card__body {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.el-pagination {
  text-align: center;
}
</style>