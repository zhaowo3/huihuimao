<template>
  <el-main style="height: 100%;">
    <el-col :span="24">
      <div class="newLefts">
        <el-button class="newLeftTButton"><i class="iconfont icon-tianjia"></i>添加人员</el-button>

          <ul class="newLeftMain">
            <li>
              <el-image src="" >
                <div slot="error" class="image-slot">
                  <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-morentouxiang"></use>
                  </svg>
                </div>
                <div slot="placeholder" class="image-slot">
                  <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-morentouxiang"></use>
                  </svg>
                </div>
              </el-image>
            </li>
          </ul>
      </div>

    </el-col>
  </el-main>
</template>

<script>
    export default {
        name: "newLeftTab"
    }
</script>

<style type="text/scss" rel="stylesheet/scss" lang="scss" scoped>
.newLefts{
  display: flex;
  flex-direction:column;
  .newLeftTButton{
    height: 84px;
    font-size: 20px;
    text-align: left;
    i{
      padding-right: 20px;
    }
  }
  .newLeftMain{
    display: flex;
    flex-wrap: wrap;
    align-content: flex-start;
    width: 100%;
    height: 100%;
    margin: 20px 0;
    li{
      width: 100%;
      border: 1px solid #E6E6E6;
      height: 172px;
      display: flex;
      align-items: center;
      box-shadow: 0px 0px  -1px #000;
      .el-image{
        width: 100px;
        height: 100px;
        border: 1px solid #E6E6E6;
        border-radius: 50%;
        margin-left: 30px;
        i{
          color: #00adf8;
          width: 100%;
          height: 100%;
          /*::before{*/
          /*  background: #00adf8;*/
          /*}*/
        }
        /*.image-slot{*/
        /*  width: 100%;*/
        /*}*/
      }
    }
  }
}
</style>
