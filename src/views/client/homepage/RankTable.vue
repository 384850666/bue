<template>
    <div class="rank-table">
        <div class="toolbar clearfix">
            <span class="year">{{yearData}}年</span>
            <span class="title">补贴资金申领排行</span>
            <div class="year-select">
                <el-date-picker
                        v-model="yearData"
                        type="year"
                        size="small"
                        :clearable="false"
                        placeholder="选择年"
                        value-format="yyyy"
                        format="yyyy 年" @change="handleChange">
                </el-date-picker>
            </div>
        </div>
        <ul class="rank-list" v-if="tableList.length">
            <li v-for="(item,index) in tableList" :key="index" class="clearfix">
                <div class="w1"><span class="index-num">{{index+1}}</span></div>
                <div class="w2" :title="item.target">{{item.target}}</div>
                <div class="w3" :title="item.money+'元'">{{item.money}}元</div>
                <div class="w4" :title="'技师'+item.technician+'人'">技师{{item.technician}}人</div>
                <div class="w5" :title="'高级技师'+item.technician+'人'">高级技师{{item.HighTechnician}}人</div>
                <div class="w6" :title="item.failed+'人审核未通过'"><span class="failed-num" v-if="item.failed > 0">{{item.failed}}人审核未通过</span></div>
            </li>
        </ul>
    </div>
</template>

<script type="text/ecmascript-6">
    import { getRankData } from "@/api/allowance";
    export default {
        name: 'rank-table',
        data() {
            return {
                yearData: '2018',
                tableList: []
            }
        },
        created() {
            let yearData = this.yearData;
            this.initData(yearData);
        },
        methods: {
            async initData(year) {
                getRankData(year).then((response) => {
                    this.tableList = response.list;
                });
            },
            handleChange(val) {
                this.initData(val);
            }
        }
    };
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
    .rank-table {
        width: 0;
        flex: 1;
        background-color: #ffffff;
        height: 100%;
        margin-right: 25px;
        padding: 15px 15px 20px 15px;
        .toolbar {
            height: 36px;
            line-height: 36px;
            margin-bottom: 10px;
            .year {
                display: inline-block;
                background: #fd7162;
                background: linear-gradient(to right, #fd415d, #fd7262);
                padding: 6px 14px;
                border-radius: 30px;
                color: #ffffff;
                line-height: normal;
                margin-right: 10px;
                position: relative;
                box-shadow: 0 5px 1px #fed2d6;
                vertical-align: top;
            }
            .title {
                font-size: 16px;
                color: #7f83a4;
            }
            .year-select {
                float: right;
                .el-date-editor.el-input {
                    width: 120px;
                }
            }
        }
        .rank-list {
            height: calc(100% - 46px);
            overflow: auto;
            li {
                cursor: pointer;
                & > div {
                    line-height: normal;
                    float: left;
                    padding: 10px 12px;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    color: #7f83a4;
                }
                .w1 {
                    width: 10%;
                }
                .w2 {
                    width: 28%;
                }
                .w3 {
                    width: 13%;
                }
                .w4 {
                    width: 13%;
                }
                .w5 {
                    width: 13%;
                }
                .w6 {
                    width: 23%;
                }
                .index-num {
                    display: inline-block;
                    width: 20px;
                    height: 20px;
                    border-radius: 50%;
                    line-height: 20px;
                    text-align: center;
                    color: #ffffff;
                    background-color: #18ceb4;
                    font-size: 12px;
                }
                .failed-num {
                    color: #ff4c76;
                }
                &:hover {
                    background-color:#f5f5f5;
                }
            }
        }
    }
</style>