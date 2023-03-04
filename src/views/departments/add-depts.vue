<template>
   <el-dialog
    title="新增部门"
      :visible.sync="showDialog"
      width="50%"
      left
      @close="handCancel"
    >
    <el-form ref="form" :model="form" label-width="100px" :rules="rules">
         <el-form-item label="部门名称" prop="name">
    <el-input v-model="form.name"></el-input>
  </el-form-item>
   <el-form-item label="部门编码"  prop="code">
    <el-input v-model="form.code"></el-input>
  </el-form-item> <el-form-item label="部门负责人"  prop="manager">
    <el-select v-model="form.manager" placeholder="请选择">
    <el-option
      v-for="item in managerList"
      :key="item.id"
      :label="item.username"
      :value="item.username">
    </el-option>
  </el-select>
  </el-form-item> <el-form-item label="部门介绍" prop="introduce">
    <el-input type="textarea" v-model="form.introduce"></el-input>
    </el-form-item>
        <el-button @click="handCancel()">取 消</el-button>
        <el-button type="primary" @click="handleSubmit()">确 定</el-button
        >
      </span>
       </el-form>
    </el-dialog>
</template>

<script>
import {
  getDepartment,
  addDepartmen,
  getEmployeeSimple,
  addDepartment,
} from "@/api/department";

const checkName = async (rules, value) => {
  const { depts } = getDepartment();
  const currentNodeChirldren = depts.filter(
    (item) => item.pid === this.treeNode.id
  );
  const isRepeat = currentNodeChirldren.some((item) => item.name === value);
  if (isRepeat) {
    return Promise.reject(new Error("部门名重复"));
  }
};

const checkCode = async (rules, value) => {
  // 1、 接口获取所有的部门
  const { depts } = await getDepartments();
  //  2、直接判断当前用户添写的code是否包含在已存在的数据里面
  const isRepeat = depts.some((item) => item.code === value);
  if (isRepeat) {
    return Promise.reject("部门code重复");
  }
};
export default {
  props: {
    showDialog: { type: Boolean, default: false },
    treeNode: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      managerList: [],
      form: {
        name: "", // 部门名称
        code: "", // 部门编码
        manager: "", // 部门管理者
        introduce: "", // 部门介绍
      },
      rules: {
        name: [
          { required: true, message: "部门名称不能为空", trigger: "blur" },
          {
            min: 1,
            max: 50,
            message: "部门名称要求1到50个字符",
            trigger: "blur",
          },
          {
            trigger: "blur",
          },
        ],
        code: [
          { required: true, message: "部门编码不能为空", trigger: "blur" },
          {
            min: 1,
            max: 50,
            message: "部门编码要求1到50个字符",
            trigger: "blur",
          },
        ],
        manager: [
          { required: true, message: "部门负责人不能为空", trigger: "blur" },
        ],
        introduce: [
          { required: true, message: "部门编码不能为空", trigger: "blur" },
          {
            min: 1,
            max: 300,
            message: "部门介绍要求1到300个字符",
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    handleSubmit() {
      this.$refs.form.validate(async (value) => {
        if (value) {
          try {
            const res = await addDepartment({
              ...this.form,
              pid: this.treeNode.id,
            });
            this.$emit("addDeptsDown");
          } catch (error) {
            console.log(err);
          }
        }
      });
    },
    handCancel() {
      this.$refs.form.resetFields();
      this.$emit("closeDialog");
    },
  },
  async created() {
    console.log(this.treeNode);
    const result = await getEmployeeSimple();
    this.managerList = result.data.data;
  },
};
</script>

<style>
</style>