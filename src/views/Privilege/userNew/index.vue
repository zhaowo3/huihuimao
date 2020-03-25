<template>
  <div style="height: 100%;">
    <el-row style="height: 100%;">
      <el-col :span="6" style="height: 100%;">
      <newLeftTab></newLeftTab>
      </el-col>
      <el-col :span="6" style="height: 100%;">
      <newAmongTab></newAmongTab>
      </el-col>
    </el-row>

  </div>
</template>

<script>
    import newLeftTab from './component/newLeftTab';
    import newAmongTab from './component/newAmongTab';

    export default {
        name: "userNew",
        components: {newLeftTab,newAmongTab},
    }
</script>

<style scoped>

</style>
