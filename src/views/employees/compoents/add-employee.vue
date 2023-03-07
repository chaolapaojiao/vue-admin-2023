<template>
  <div class="add-container">
    <el-dialog title="新增员工" :visible.sync="showDialog" width="50%" left>
      <el-form ref="form" :model="formData" label-width="80px" :rules="rules">
        <el-form-item label="姓名" prop="username">
          <el-input
            v-model="formData.username"
            placeholder="请输入姓名"
          ></el-input>
        </el-form-item>
        <el-form-item label="手机" prop="mobile">
          <el-input
            v-model="formData.mobile"
            placeholder="请输入手机号码"
          ></el-input>
        </el-form-item>
        <el-form-item label="入职时间" prop="timeOfEntry">
          <el-date-picker
            v-model="formData.timeOfEntry"
            type="date"
            placeholder="选择日期"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="聘用形式" prop="formOfEmployment">
          <el-select v-model="formData.formOfEmployment" placeholder="请选择">
            <el-option label="正式" value="1"> </el-option>
            <el-option label="非正式" value="0"> </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="工号" prop="workNumber">
          <el-input v-model="formData.workNumber"></el-input>
        </el-form-item>
        <el-form-item label="部门" prop="departmentName">
          <el-cascader
            v-model="formData.departmentName"
            style="width: 50%"
            :options="treeData"
            :props="{
              checkStrictly: true,
              label: 'name',
              value: 'name',
              emitPath: false,
            }"
            clearable
            placeholder="请选择部门数据"
            @focus="getDepartments"
          />
        </el-form-item>
        <el-form-item label="转正时间">
          <el-date-picker
            v-model="formData.correctionTime"
            type="date"
            placeholder="选择日期"
          >
          </el-date-picker>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="$emit('cancleAdd')">取 消</el-button>
        <el-button type="primary" @click="submitAdd">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getDepartment } from "@/api/department";
import { addEmployees } from "@/api/employees";
import { tranListToTreeData } from "@/utils/index";
export default {
  props: { showDialog: { type: Boolean, default: false } },
  data() {
    return {
      formData: {
        username: "",
        mobile: "",
        formOfEmployment: "",
        workNumber: "",
        departmentName: "",
        timeOfEntry: "",
        correctionTime: "",
      },
      treeData: [],
      rules: {
        username: [
          { required: true, message: "姓名不能为空", trigger: "blur" },
          {
            min: 1,
            max: 4,
            message: "用户姓名为1-4位",
          },
        ],
        mobile: [
          { required: true, message: "手机号不能为空", trigger: "blur" },
          {
            pattern: /^1[3-9]\d{9}$/,
            message: "手机号格式不正确",
            trigger: "blur",
          },
        ],
        formOfEmployment: [
          { required: true, message: "聘用形式不能为空", trigger: "blur" },
        ],
        workNumber: [
          { required: true, message: "工号不能为空", trigger: "blur" },
        ],
        departmentName: [
          { required: true, message: "部门不能为空", trigger: "blur" },
        ],
        timeOfEntry: [
          { required: true, message: "入职时间不能为空", trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    // 下拉获取到焦点的时候再去调用
    async getDepartments() {
      if (this.treeData.length) return;
      const res = await getDepartment();
      const { depts } = res.data.data;
      this.treeData = tranListToTreeData(depts, "");
    },
    // 提交表单
    submitAdd() {
      this.$refs.form.validate(async (value) => {
        try {
          const res = await addEmployees(this.formData);
          this.$message("添加员工成功");
          this.$emit("addEmployee");
        } catch (err) {
          console.log(err);
        }
      });
    },
  },
};
</script>

<style lang="scss" scope>
.el-input,
.el-date-picker,
.el-select,
.el-input__inner {
  width: 500px;
}
.el-dialog__body {
  padding-bottom: 0px;
}
.el-dialog__footer {
  text-align: center;
}
</style>