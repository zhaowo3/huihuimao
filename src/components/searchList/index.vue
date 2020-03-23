<template>
  <div class="searchCont">
    <div class="searchContBody">
      <ul>
        <li>
          <div class="searchContHead">
            <p>订单</p>
          </div>
          <div>
            <el-main>
              <el-row :gutter="20">
                <el-col :span="8" v-for="">
                  <el-card>
                    <div class="allocationList">
                      <div class="allocationListHead"><h3>低位食管静脉结扎</h3><i>急</i></div>
                      <div class="bottom clearfix allocationListBody">
                        <!--            <time class="time">{{ currentDate }}</time>-->
                        <p>苏大强</p>
                        <p>12号</p>
                        <p>2019-11-11</p>
                        <p>1台次</p>
                        <p>6B病区</p>
                        <p>21床位</p>
                        <p>住院号:<span>10</span></p>
                        <div class="allocationListBoot">
                          <div class="allocationListBootLi">
                            <el-tag>应</el-tag>
                            <span>0</span></div>
                          <div class="allocationListBootLi">
                            <el-tag>已</el-tag>
                            <span>0</span></div>
                        </div>
                      </div>
                    </div>
                  </el-card>
                </el-col>

              </el-row>


            </el-main>
          </div>

        </li>
        <li>
          <div class="searchContHead">
            <p>选配模板</p>
          </div>
          <div class="allocationMo" :gutter="20">
            <el-main>
              <el-button type="primary" round>房间隔缺损修</el-button>
              <el-button type="primary" round>主要按钮</el-button>
            </el-main>
          </div>
        </li>
        <li>
          <div class="searchContHead">
            <p>历史订单</p>
          </div>
          <div class="allocationLi" :gutter="20">
            <el-main class="historicalBody">
              <el-row :gutter="20">
                <el-col :span="8" style="margin-top: 20px">
                  <el-card class="historicalHour">
                    <div class="allocationList">
                      <div class="allocationListHead"><h3>三期宝</h3></div>
                      <div class="bottom clearfix allocationListBody">
                        <!--            <time class="time">{{ currentDate }}</time>-->
                        <p>苏大强</p>
                        <p>12号</p>
                        <p>2019-11-11</p>
                        <p>1台次</p>
                        <p>6B病区</p>
                        <p>21床位</p>
                        <p>住院号:<span>10</span></p>
                        <div class="allocationListBoot">
                          <div class="allocationListBootLi" :span="8">
                            <el-tag>应</el-tag>
                            <span>0</span></div>
                          <div class="allocationListBootLi" :span="8">
                            <el-tag>已</el-tag>
                            <span>0</span></div>
                          <div class="allocationListBootLi" :span="8">
                            <div></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </el-card>
                </el-col>
              </el-row>
            </el-main>
          </div>
        </li>
        <li>
          <div class="searchContHead">
            <p>出库</p>
          </div>
          <div class="allocationLi" :gutter="20">
            <el-main class="historicalBody">
              <el-row :gutter="20" class="templateRight">
                <div class="templateLiG">
                  <el-col class="templateLies" :span="12" v-for="data,index in data" :key="index">
                    <el-row class="templateLis">
                      <div class="templateHover">
                        <div class="templateImg">
                          <el-image :src="data.imgUrl">
                            <div slot="error" class="image-slot">
                              <img alt=""  :src="smalls">
                            </div>
                            <div slot="placeholder" class="image-slot">
                              <img alt=""  :src="smalls">

                            </div>
                          </el-image>
                          <i class="iconfont icon-mianma-" v-if="data.codeType=='3'" style="position: absolute;left: 0px;top: 0;color: #409EFF;font-size: 20px;"></i><i class="iconfont icon-yiwuyima" v-if="data.codeType=='1'" style="position: absolute;left: 0px;top: 0;color: #409EFF;font-size: 20px;"></i></div>
                        <el-card class="templateR">
                          <el-col :span="16">
                            <h4>{{data.title}}</h4>
                            <span class="templateTitle">{{data.remarks}}</span>
                            <h3>{{data.amount}}</h3>
                            <span class="templateVerify" v-if="Verified"><b>上期核实时间:</b><p>{{data.storehouse}}</p></span>
                            <span class="templateSpan" v-if="Verified"><b>库位：</b><p>{{data.storehouse}}</p></span>
                          </el-col>
                          <el-col :span="8" v-if="validator">
                            <!--                        <div class="templateTime"><b>{{data.times}}</b><p>剩余:</p><span >{{data.time}}</span></div>-->
                            <p class="templateP">8</p>
                            <el-button class="templateButton" v-if="validator">包</el-button>
                          </el-col>
                          <el-col :span="8" v-if="valueEquals">
                            <el-tag type="success" class="templateLabel" v-if="Verified">已核实</el-tag>
                            <!--                        <div class="templateTime"><b>{{data.times}}</b><p>剩余:</p><span >{{data.time}}</span></div>-->
                            <p class="templateP">8</p>
                            <el-input-number v-model="data.num" v-if="Verified" :min="1" :max="99" label="描述文字"
                                             class="detailsNum"></el-input-number>
                            <el-button class="templateButton" v-if="">包</el-button>
                          </el-col>

                        </el-card>
                      </div>
                    </el-row>
                  </el-col>
                </div>
              </el-row>
            </el-main>
          </div>
        </li>
        <li>
          <div class="searchContHead">
            <p>人库</p>
          </div>
          <div class="allocationLi" :gutter="20">
            <el-main class="historicalBody">
              <el-row :gutter="20" class="templateRight">
                <div class="templateLiG">
                  <el-col class="templateLies" :span="12" v-for="data,index in data" :key="index">
                    <el-row class="templateLis">
                      <div class="templateHover">
                        <div class="templateImg">
                          <el-image :src="data.imgUrl">
                            <div slot="error" class="image-slot">
                              <img alt=""  :src="smalls">
                            </div>
                            <div slot="placeholder" class="image-slot">
                              <img alt=""  :src="smalls">

                            </div>
                          </el-image>
                          <i class="iconfont icon-mianma-" v-if="data.codeType=='3'" style="position: absolute;left: 0px;top: 0;color: #409EFF;font-size: 20px;"></i><i class="iconfont icon-yiwuyima" v-if="data.codeType=='1'" style="position: absolute;left: 0px;top: 0;color: #409EFF;font-size: 20px;"></i></div>
                        <el-card class="templateR">
                          <el-col :span="16">
                            <h4>{{data.title}}</h4>
                            <span class="templateTitle">{{data.remarks}}</span>
                            <h3>{{data.amount}}</h3>
                            <span class="templateVerify" v-if="Verified"><b>上期核实时间:</b><p>{{data.storehouse}}</p></span>
                            <span class="templateSpan" v-if="Verified"><b>库位：</b><p>{{data.storehouse}}</p></span>
                          </el-col>
                          <el-col :span="8" v-if="validator">
                            <!--                        <div class="templateTime"><b>{{data.times}}</b><p>剩余:</p><span >{{data.time}}</span></div>-->
                            <p class="templateP">8</p>
                            <el-button class="templateButton" v-if="validator">包</el-button>
                          </el-col>
                          <el-col :span="8" v-if="valueEquals">
                            <el-tag type="success" class="templateLabel" v-if="Verified">已核实</el-tag>
                            <!--                        <div class="templateTime"><b>{{data.times}}</b><p>剩余:</p><span >{{data.time}}</span></div>-->
                            <p class="templateP">8</p>
                            <el-input-number v-model="data.num" v-if="Verified" :min="1" :max="99" label="描述文字"
                                             class="detailsNum"></el-input-number>
                            <el-button class="templateButton" v-if="">包</el-button>
                          </el-col>

                        </el-card>
                      </div>
                    </el-row>
                  </el-col>
                </div>
              </el-row>
            </el-main>
          </div>
        </li>
        <li>
          <div class="searchContHead">
            <p>报表</p>
          </div>
          <div class="allocationTable">
            <el-table
              :data="tableData"
              style="width: 100%">
              <el-table-column
                prop="date"
                label="日期"
                width="180">
              </el-table-column>
              <el-table-column
                prop="name"
                label="姓名"
                width="180">
              </el-table-column>
              <el-table-column
                prop="address"
                label="地址">
              </el-table-column>
            </el-table>
          </div>
        </li>
      </ul>
    </div>
  </div>

</template>

<script>
  import smalls from '@/assets/images/small.jpg';

  export default {
    name: "searchList",
    data() {
      return {
        Verified: false,
        validator: false,
        valueEquals: true,
        activeName: 'second',
        data: [
          {
            id: 2,
            title: '汽包2-1',
            remarks: '施爱得NPCM-100-2-B',
            amount: 'A134',
            storehouse: '2-2-1',
            time: '2019-01-11',
            times: '2天',
            num: 1,
          },
          {
            id: 4,
            title: '汽包2-2',
            remarks: '施爱得NPCM-100-2-B',
            amount: 'A134',
            storehouse: '2-2-1',
            time: '2019-01-11',
            times: '2天',
            num: 1,
          },
          {
            id: 8,
            title: '汽包2-3',
            remarks: '施爱得NPCM-100-2-B',
            amount: 'A134',
            storehouse: '2-2-1',
            time: '2019-01-11',
            times: '2天',
            num: 1,
          },
          {
            id: 15,
            title: '汽包2-4',
            remarks: '施爱得NPCM-100-2-B',
            amount: 'A134',
            storehouse: '2-2-1',
            time: '2019-01-11',
            times: '2天',
            num: 1,
          },
        ],
        smalls,
        tableData: [{
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }]
      }
    }
  }
</script>

<style type="text/scss" rel="stylesheet/scss" lang="scss" scoped>
  .searchCont {
    overflow: hidden;
    overflow-y: auto;
    display: inline-block;
    height: calc(100% - 80px);

    .searchContHead {
      float: left;
      padding-bottom: 8px;
      border-bottom-style: solid;
      border-bottom-width: 1px;
      border-bottom-color: #e0e7ea;
      width: 100%;

      p {
        float: left;
        font-size: 20px;
        padding-left: 20px;
      }
    }

    .searchContBody {
      float: left;
      width: 100%;

      ul {
        height: 100%;
        display: inline-block;

        li {
          float: left;
          width: 100%;

          .allocationList {
            width: 100%;
            border-bottom-width: 1px;
            border-bottom-color: #f0f0f0;

            .allocationListHead {
              display: flex;
              justify-content: space-between;

              h3 {
                font-size: 18px;
                text-align: left;
                padding-top: 4px;
              }

              i {
                font-size: 16px;
                border-radius: 50%;
                background: #ed0200;
                width: 36px;
                height: 36px;
                font-style: normal;
                line-height: 36px;
                color: #fff;
                text-align: center;
              }
            }

            .allocationListBody {
              p {
                width: 50%;
                font-size: 16px;
                float: left;
                line-height: 30px;
              }

              p:nth-child(odd) {
                text-align: left
              }

              p:nth-child(even) {
                text-align: right
              }

              .allocationListBoot {
                width: 100%;
                float: left;
                height: 45px;
                line-height: 45px;
                display: flex;
                justify-content: space-between;
                margin-top: 25.2px;

                .allocationListBootLi {

                  span:nth-child(1) {
                    font-size: 16px;
                    width: 45px;
                    height: 45px;
                    line-height: 45px;
                    text-align: center;
                    float: left;
                    color: #1cda73;
                    border: 1px dashed #1cda73;
                  }

                  span:nth-child(2) {
                    font-size: 16px;
                    width: 45px;
                    height: 45px;
                    line-height: 45px;
                    text-align: center;
                    float: left;
                  }
                }

              }
            }
          }

          .allocationMo {
            float: left;
            width: 100%;

            button {
              float: left;
            }
          }

          .allocationLi {
            .historicalBody {
              padding-top: 0;
              height: 100%;

              .historicalHour:hover {
                border-color: #0ebbf3;
                border-width: 1px;
                border-style: solid;
                cursor: pointer;
              }

              .allocationList {
                width: 100%;
                border-bottom-width: 1px;
                border-bottom-color: #f0f0f0;


                .allocationListHead {
                  display: flex;
                  justify-content: space-between;

                  h3 {
                    font-size: 18px;
                    text-align: left;
                    padding-top: 4px;
                    margin-bottom: 10px;
                  }

                  i {
                    font-size: 16px;
                    border-radius: 50%;
                    background: #ed0200;
                    width: 36px;
                    height: 36px;
                    font-style: normal;
                    line-height: 36px;
                    color: #fff;
                    text-align: center;
                  }
                }

                .allocationListBody {
                  p {
                    width: 50%;
                    font-size: 16px;
                    float: left;
                    line-height: 30px;
                  }

                  p:nth-child(odd) {
                    text-align: left
                  }

                  p:nth-child(even) {
                    text-align: right
                  }

                  .allocationListBoot {
                    width: 100%;
                    float: left;
                    height: 45px;
                    line-height: 45px;
                    display: flex;
                    justify-content: space-between;
                    margin-top: 25.2px;

                    .allocationListBootLi {
                      span:nth-child(1) {
                        font-size: 16px;
                        width: 45px;
                        height: 45px;
                        line-height: 45px;
                        text-align: center;
                        float: left;
                        background: #aeaeae;
                        color: #fff;
                      }

                      span:nth-child(2) {
                        font-size: 16px;
                        width: 45px;
                        height: 45px;
                        line-height: 45px;
                        text-align: center;
                        color: #aeaeae;
                        float: left;
                      }
                    }

                  }
                }
              }
            }
          }

          .templateRight {
            margin: 0;
            height: 100%;
            overflow-y: auto;

            .templateAdd {
              width: 100%;
              text-align: center;
              box-sizing: border-box;
              display: flex;
            }

            .templateHover {
              display: initial;
              float: left;
              width: 100%;
              height: 170px;
              position: relative;
            }

            .templateHover:hover {
              border-width: 2px;
              border-color: #13bdf6;
              border-style: solid;
            }

            .el-card__body {
              height: 100%;
              position: relative;
            }

            .templateLiG {
              .templateLis {
                padding-bottom: 20px;
              }

              .templateImg {
                width: 246px;
                height: 166px;
                float: left;

                img {
                  width: 100%;
                  height: 100%;
                  float: left;
                }
              }

              .templateR {
                height: 100%;

                .el-card__body {
                  display: flex;

                  h4 {
                    font-size: 24px;
                    font-weight: normal;
                  }

                  h3 {
                    font-size: 16px;
                    color: #00adf8;
                    margin-top: 5px;
                  }

                  .templateP {
                    float: right;
                    font-size: 36px;
                    padding-top: 10px;
                    padding-right: 8px;
                    color: #02b2e9;
                  }

                  .templateTime {
                    float: right;
                    font-size: 16px;
                    width: 100%;

                    span {
                      float: right;
                      font-size: 16px;

                    }

                    p {
                      float: right;
                      font-size: 16px;
                      padding-left: 10px;

                    }

                    b {
                      float: right;
                      font-size: 16px;
                      font-weight: normal;
                      color: #ef0000;
                    }
                  }

                  .templateLabel {
                    float: left;
                    width: 106px;
                    height: 45px;
                    text-align: center;
                    line-height: 45px;
                    font-size: 18px;
                    background: #fff;
                    border-color: #1bdc6f;
                    border-width: 2px;
                    color: #1bdc6f;
                  }

                  .templateNum {
                    position: absolute;
                    right: 80px;
                    bottom: 25px;
                  }

                  .templateButton {
                    position: absolute;
                    right: 20px;
                    background: #0eb2ea;
                    color: #fff;
                    bottom: 25px;
                    font-size: 16px;
                    padding-left: 15px;
                    padding-right: 15px;
                  }

                  .templateSpan {
                    float: left;
                    font-size: 16px;
                    margin-top: 5px;
                    width: 100%;

                    b {
                      float: left;
                      font-weight: normal;
                    }

                    p {
                      float: left;

                    }
                  }

                  .templateVerify {
                    float: left;
                    font-size: 16px;
                    margin-top: 5px;
                    width: 100%;

                    b {
                      float: left;
                      font-weight: normal;
                    }

                    p {
                      float: left;

                    }
                  }

                  .templateTitle {
                    display: block;
                    font-size: 16px;
                    padding-top: 8px;
                    color: #8e8e8e;
                  }
                  .templateTitle::before{
                    content:"\007C ";
                    opacity:0;
                  }
                  .detailsNum {
                    position: absolute;
                    right: 100px;
                    bottom: 25px;
                  }
                }

              }
            }
          }
        }
      }

    }
  }
</style>
