<template>
  <div class="department-container">
    <el-card class="tree-card">
      <!-- 用了一个行列布局 -->
      <tree-tool :tree-nodes="company" />
    </el-card>
    <el-tree :data="departs" :props="defaultProp" :default-expand-all="true">
      <tree-tool
        slot-scope="{ data }"
        :tree-nodes="data"
        :is-root="false"
        @delDepartment="getData()"
        @addDepts="addDepts"
      />
    </el-tree>
    <add-depts
      :show-dialog.sync="showDialog"
      :tree-node="node"
      @addDeptsDown="addDeptsDown"
      @closeDialog="closeDialog"
    ></add-depts>
  </div>
</template>

<script>
import { getDepartment } from "@/api/department";
import { tranListToTreeData } from "@/utils/index";
import treeTool from "@/views/departments/tree-tool";
import addDepts from "@/views/departments/add-depts";
export default {
  components: { treeTool, addDepts },
  data() {
    return {
      node: {},
      showDialog: false,
      defaultProp: {
        label: "name",
      },
      company: { name: "哈哈哈哈哈哈公司", manager: "负责人" },
      departs: [
        {
          name: "总裁办",
          manager: "曹操",
          children: [{ name: "董事会", manager: "曹丕" }],
        },
        { name: "行政部", manager: "刘备" },
        { name: "人事部", manager: "孙权" },
      ],
    };
  },
  methods: {
    async getData() {
      try {
        const res = await getDepartment();
        this.company = {
          name: res.data.data.companyName,
          manager: "管理员",
          id: "",
        };
        this.departs = tranListToTreeData(res.data.data.depts, "");
      } catch (err) {
        console.log(err);
      }
    },
    closeDialog() {
      this.showDialog = false;
    },
    handleCommand() {},
    // 增加部门
    addDepts(node) {
      // console.log(node);
      this.node = node;
      this.showDialog = true;
    },
    // 增加成功
    addDeptsDown() {
      this.showDialog = false;
      this.getData();
    },
  },
  created() {
    this.getData();
  },
};
</script>

<style lang="scss" scope>
.department-container {
  padding: 30px 140px;
}
.tree-card {
  background-color: #90caff;
}
</style>