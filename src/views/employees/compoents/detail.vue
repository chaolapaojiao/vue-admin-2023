<template>
  <div class="detail-container">
    <el-card>
      <el-tabs v-model="activeName">
        <el-tab-pane label="登录账户设置" name="acountSetting">
          <el-form
            ref="form"
            :model="acountForm"
            label-width="80px"
            class="acountForm"
            :rules="rules"
          >
            <el-form-item label="姓名" prop="username">
              <el-input
                style="width: 300px"
                v-model="acountForm.username"
              ></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
              <el-input
                type="password"
                v-model="acountForm.password"
                style="width: 300px"
              ></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" size="small" @click="handleUpdate"
                >更新</el-button
              >
              <el-button size="small">取消</el-button>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="个人详情" name="personInfo">
          <user-info />
        </el-tab-pane>
        <el-tab-pane label="岗位信息" name="workInfo">
          <job-info />
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script>
import { getBaseInfo, updateUserInfo } from "@/api/employees";
import userInfo from "@/views/employees/compoents/user-info";
import jobInfo from "@/views/employees/compoents/job-info";
export default {
  components: { userInfo, jobInfo },
  data() {
    return {
      rules: {
        username: [
          { required: true, message: "姓名不能为空", trigger: "blur" },
        ],
        password: [
          { required: true, message: "密码不能为空", trigger: "blur" },
          { min: 6, max: 20, message: "密码长度6-18位", trigger: "blur" },
        ],
      },
      activeName: "acountSetting",
      acountForm: {},
    };
  },
  methods: {
    async getInfo() {
      try {
        const res = await getBaseInfo(this.$route.params.id);
        this.acountForm = res.data.data;
      } catch (err) {
        console.log(err);
      }
    },
    // 更新员工数据
    handleUpdate() {
      try {
        this.$refs.form.validate(async (value) => {
          if (value) {
            const res = await updateUserInfo(this.acountForm);
            this.$message("更新数据成功");
          }
        });
      } catch (error) {
        console.log(error);
      }
    },
  },
  created() {
    this.getInfo();
  },
};
</script>

<style lang="scss" scope>
.el-card {
  margin: 10px;
}
.el-card__body {
  width: 100%;
  .acountForm {
    margin-left: 200px;
  }
}
</style>