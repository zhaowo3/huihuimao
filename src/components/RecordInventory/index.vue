<template>
  <div class="sid">
    <el-drawer
      custom-class="m-dialog"
      title="入库记录"
      :visible.sync="vis"
      direction="rtl"
      @close="closeDialog"
      :with-header="false"
      size="50%"
      ref="drawer">
      <p class="sidN">{{texit}}<i class="el-icon-close" @click="$refs.drawer.closeDrawer()"></i></p>
      <div class="budyHeight" ref="bodyEHight">
        <el-table :data="houseList2"
                  v-loading="listLoading"
                  :height="buHight+'px'"
                  show-summary
                  border>
          <!--          -->
          <el-table-column prop="adminName" label="操作者" width="80" align="center">
            <template slot-scope="scope">
              <!--                  <i class="el-icon-time"></i>-->
              <span >{{ scope.row.adminName }}</span>
            </template>
          </el-table-column>
          <el-table-column label="名称"  width="140" align="center">
            <template slot-scope="scope">
              <!--                  <i class="el-icon-time"></i>-->
              <span style="margin-left: 10px">{{ scope.row.name }}</span>
            </template>
          </el-table-column>
          <el-table-column label="规格" width="120">
            <template slot-scope="scope">
              <!--                  <i class="el-icon-time"></i>-->
              <span>{{ scope.row.size }}</span>
            </template>
          </el-table-column>
          <el-table-column  prop="quantity" label="数量" align="center">
            <template slot-scope="scope">
              <!--                  <i class="el-icon-time"></i>-->
              <span>{{ scope.row.quantity }}</span>
            </template>
          </el-table-column>
          <el-table-column label="库位" width="80">
            <template slot-scope="scope">
              <!--                  <i class="el-icon-time"></i>-->
              <span>{{ scope.row.location}}</span>
            </template>
          </el-table-column>
          <el-table-column label="出入时间" width="200">
            <template slot-scope="scope">
              <!--                  <i class="el-icon-time"></i>-->
              <span style="margin-left: 10px">{{ scope.row.createDate }}</span>
            </template>
          </el-table-column>
        </el-table>
      </div>

      <div class="baoBTableFoot">
        <div class="pagination-container">
          <el-pagination
            background
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            layout="total, sizes,prev, pager, next,jumper"
            :page-size="searchHouse2.pageSize"
            :page-sizes="[5,10,total]"
            :current-page.sync="searchHouse2.pageNumber"
            :total="total">
          </el-pagination>
        </div>
      </div>
<!--      滚动-->
<!--      <div class="templateConter">-->
<!--        <div class="templateLeft" v-infinite-scroll="loadMore2"-->
<!--             infinite-scroll-disabled="busy2"-->
<!--             infinite-scroll-distance="10" v-loading="listLoading" >-->
<!--          <ul class="clearfix">-->
<!--            <li v-for="(data,index) in houseList2" :data1="data.id" :key="index" :class="index==cur?'hit':''"-->
<!--            >-->
<!--              <el-main>-->
<!--                <div class="FraHeight">-->
<!--                  <div class="templateLeftImg">-->
<!--                    <div class="templateLeftFrem">-->
<!--                      <el-image :src="data.imgUrl">-->
<!--                        <div slot="error" class="image-slot">-->
<!--                          <svg-icon icon-class="gen" style="height: 100%;cursor: pointer;width: 100%;float:left;"-->
<!--                                    class="color-main"></svg-icon>-->
<!--                        </div>-->
<!--                        <div slot="placeholder" class="image-slot">-->
<!--                          <svg-icon icon-class="gen" style="height: 100%;cursor: pointer;width: 100%;float:left;"-->
<!--                                    class="color-main"></svg-icon>-->
<!--                        </div>-->
<!--                      </el-image>-->

<!--                    </div>-->
<!--                  </div>-->
<!--                  <div class="templateLeftTu">-->
<!--                    <div class="leftxinxi">-->
<!--                      <p>{{data.name}}</p>-->
<!--                      <span>{{data.size}}</span>-->
<!--                      <span></span>-->
<!--                      <span>库位：{{data.location}}</span>-->

<!--                      &lt;!&ndash;                    <el-button class="templateOK" type="primary"&ndash;&gt;-->
<!--                      &lt;!&ndash;                               style="padding: 10px; color: #fff; border-style: solid"&ndash;&gt;-->
<!--                      &lt;!&ndash;                               v-if="" @click="showH(data)">打开&ndash;&gt;-->
<!--                      &lt;!&ndash;                    </el-button>&ndash;&gt;-->
<!--                    </div>-->
<!--                    <div class="rightxinxi">-->
<!--                      <span>{{data.quantity}}</span>-->
<!--                      <el-button class="templateButton" style="position: absolute;bottom: 0;" v-if="data.type==1">包</el-button>-->
<!--                      <div class="rightCaoZuo">-->
<!--                        <p>{{data.adminName}}</p>-->
<!--                        <p>{{data.createDate}}</p>-->
<!--                      </div>-->
<!--                    </div>-->

<!--                  </div>-->
<!--                </div>-->
<!--              </el-main>-->
<!--            </li>-->
<!--            &lt;!&ndash;            <li v-if="leftInfo.loading" style="text-align: center;color: #ddd;border: none; margin-top: 10px;margin-bottom: 5px;">正在加载，请稍后</li>&ndash;&gt;-->
<!--            &lt;!&ndash;            <li v-if="leftInfo.isFinsh" style="text-align: center;color: #ddd;border: none; margin-top: 10px; margin-bottom: 5px;">没有更多数据了</li>&ndash;&gt;-->
<!--            <li-->
<!--              style="text-align: center; width:100%;color: #ddd;border: none; margin-top: 10px;margin-bottom: 5px;font-size: 16px; float: left;"-->
<!--              v-show="droping2">加载中-->
<!--            </li>-->
<!--            <li-->
<!--              style="text-align: center; width:100%;color: #ddd;border: none; margin-top: 10px;margin-bottom: 5px;font-size: 16px;float: left;"-->
<!--              v-show="noMore2">没有更多的数据-->
<!--            </li>-->
<!--            &lt;!&ndash;          <span  class="show-msg" >这里什么都没有了哦</span>&ndash;&gt;-->
<!--          </ul>-->
<!--        </div>-->
<!--      </div>-->

    </el-drawer>
  </div>


</template>

<script>
    import RecordInventory from '@/components/RecordInventory'
    import big from '@/assets/images/big.jpg';
    import {
       quantitylogPage
    } from '@/api/material'
    export default {
        name: "RecordInventory",
        components: {
            RecordInventory
        },
        data() {
            return {
                vis: false,
                houseList2: [],
                searchHouse2: {
                    pageSize: 10,
                    pageNumber: 0,
                    // keyWords:'',
                },
                total: null,
                busy2: false,
                houseNum2: '',
                droping2: false,
                loading: false,
                // mainShow2: true,
                noMore2: false,
                listLoading: false,
                big:'',
                cur: 0,
                textvis:'',
                texit:'',
                buHight:'',
            }
        },
        props: {
            // houseList2: {
            //     type: Array,
            // },

            accuseVisible: Boolean,


        },
        watch: {
            accuseVisible (newValue, oldValue) {
                this.vis = newValue
            },

        },
        created() {
           // this.accicy();
        },
        methods: {
            closeDialog () {
                this.$emit('close-dialogStatus', true)
            },
            accicy:function(val,vals){
                let mv = this;
                mv.textvis=val;
                mv.texit=vals;
                this.$nextTick(function () {
                    mv.buHight=mv.$refs.bodyEHight.offsetHeight;
                })
                this.loadMore2();
            },
            // 列表滚动加载
            // loadMore2() {
            //     setTimeout(() => {
            //         let mv = this;
            //         if (!mv.busy2) {
            //             mv.busy2 = true;// 将无限滚动给禁用
            //             mv.searchHouse2.pageNumber++ // 增加页数
            //             mv.querySearch2();
            //
            //         }
            //     }, 500);
            // },
            // //物资记录
            // querySearch2() {
            //     let mv = this;
            //     let hou = this.searchHouse2;
            //    hou.searchType = mv.textvis;
            //     quantitylogPage(hou).then(res => {
            //         if(res.code=='-1'){
            //             this.$message({
            //                 message: res.msg,
            //                 type: 'error',
            //             });
            //             return
            //         }
            //         let listTotal = res.data.total;
            //         if (listTotal > 0) {
            //             mv.busy2 = true
            //         } else {
            //             mv.busy2 = false
            //         }
            //         mv.loading = false;
            //         mv.houseList2 = mv.houseList2.concat(res.data.result);
            //         let DownloadTotal =
            //             (mv.searchHouse2.pageNumber + 1) * mv.searchHouse2.pageSize;
            //         let total = res.data.total;
            //         mv.houseNum2 = total;
            //         let totalPage = (mv.houseNum2 + mv.searchHouse2.pageSize) / mv.searchHouse2.pageSize;
            //         // mv.searchHouse.pageNumber++; //增加页数
            //         if (mv.searchHouse2.pageNumber + 1 >= totalPage) {
            //             mv.busy2 = true // 将无限滚动关闭
            //             mv.searchHouse2.pageNumber = 0 // 页数变为0
            //             mv.noMore2 = true // 切换底部提示信息
            //             mv.droping2 = false
            //         } else {
            //             mv.busy2 = false // 将无限滚动给打开
            //             mv.droping2 = true
            //             mv.noMore2 = false // 切换底部提示信息
            //         }
            //     }).catch(function (error) {
            //         mv.$message({
            //             message: error.msg,
            //             type: 'error'
            //         });
            //         mv.droping2 = false
            //     });
            // },
            //表格分页
            loadMore2() {
                let mv = this;
                mv.listLoading = true;
                    let hou = mv.searchHouse2;
                   hou.searchType = mv.textvis;
                quantitylogPage(hou).then(response => {
                    if(response.code !=='1'){
                        mv.$message({
                            message: response.msg,
                            type: 'error',
                            duration: 1000
                        });
                        return
                    }
                    mv.listLoading = false;
                    mv.houseList2 = response.data.result;
                    mv.total = response.data.total;
                });
            },
            handleSizeChange(val) {
                let mv = this;
                mv.searchHouse2.pageNumber = 1;
                mv.searchHouse2.pageSize = val;
                mv.loadMore2();
            },
            handleCurrentChange(val) {
                this.searchHouse2.pageNumber = val;
                this.loadMore2();
            },
        }
    }
</script>

<style rel="stylesheet/scss" type="text/scss" lang="scss" scoped>
.sid{
  position: relative;
  .el-drawer__header{
    font-size: 18px;
  }
  .sidN{
    font-size: 18px;
    float: left;
    width: 100%;
    height: 50px;
    line-height: 50px;
    text-align: center;
    i{
      font-size: 20px;
      float: right;
      padding-right: 30px;
      cursor: pointer;
      height: 50px;
      line-height: 50px;
    }
  }
}
.baoBTableFoot {
  float: left;
  display: flex;
  width: 100%;
  background: #fff;
  padding: 10px 0;
position: fixed;
  bottom: 0;
  .pagination-container{
    margin-bottom: 10px;
  }
  .el-pagination {
    float: left;
    display: flex;
  }
}
.budyHeight{
  height: calc(100% - 120px);
}
/*左侧列表*/
.templateConter{
  float: left;
  height: calc(100% - 50px);
  width: 100%;
  .templateLeft {
    /*background: #fff;*/
    height: 100%;
    overflow-y: auto;

    li {
      float: left;
      font-size: 20px;
      width: 100%;
      /*line-height: 84px;*/
      /*height: 84px;*/
      border-bottom-color: #dde8ec;
      border-bottom-width: 1px;
      border-bottom-style: solid;

      .templateLeftFrem {
        width: 138px;
        height: 100%;
        float: left;

        img {
          width: 100%;
          height: 100%;
        }
      }

      .templateLeftImg {

        height: 100px;
        float: left;
        position: relative;

        img {
          width: 100%;
          height: 100%;
        }
      }

      .templateLeftTu {
        padding-left: 20px;
        float: left;
        width: calc(100% - 138px);
        display: flex;

        .leftxinxi {
          flex: 1;
          position: relative;
        }

        .rightxinxi {
          /*width: 60px;*/

          span {
            text-align: right;
            font-size: 30px;
            color: #00b2ed;
          }
          .rightCaoZuo{
            float: right;

            p{
              text-align: right;
              font-size: 18px;
              color: #333;
              margin-bottom: 5px;
            }
          }
        }



        span {
          float: left;
          font-size: 16px;
          margin-top: 10px;
          width: 100%;
        }


        .CurrentQ {
          float: right;
          font-style: normal;
          width: 100%;
          text-align: center;
          margin-bottom: 10px;
          font-size: 30px;
          color: #00b2ed;
        }

        button {
          float: right;
          color: #0eb2ea;
          border: 2px dashed #0eb2ea;
          padding: 5px;
          position: absolute;
          bottom: 0;
          right: 0;
        }

      }

      .templateLeftSpan {
        padding-left: 20px;
        float: left;
        width: calc(100% - 138px);
        display: flex;

        .branchL {
          flex: 1;
        }

        p {
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        span {
          float: left;
          font-size: 16px;
          margin-top: 10px;
          width: 100%;
        }

        .branchR {
          width: 60px;
          position: relative;
          .CurrentQ {
            float: right;
            font-style: normal;
            width: 100%;
            text-align: center;
            margin-bottom: 10px;
            font-size: 30px;
            color: #00b2ed;
          }

          button {
            float: right;
            color: #0eb2ea;
            border: 2px dashed #0eb2ea;
            padding: 10px 10px;
            left: 50%;
            margin-left: -25%;
          }
        }

      }
    }

    .hit {
      /*background: #e7f9fe;*/
    }

    li:hover {
      background: #e7f9fe;
      cursor: pointer;
    }

  }
}

  .clearfix{
    height: 100%;
    li:hover{
      background: #e7f9fe;
    }
  }
</style>
