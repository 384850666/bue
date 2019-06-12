<template>
    <bue-fixed-container>
        <div class="home-page" v-if="statistics.technician">
            <div class="date-box">
                <span class="date">{{nowDate}}</span>
                <span class="block-item">
                <span class="name">慧升软件</span>
                <span class="time">{{nowTime}}</span>
            </span>
                <el-tooltip effect="dark" content="服务电话：0574-88888888" placement="top">
                    <img class="icon1" src="../../../assets/home-icon1.png" alt="">
                </el-tooltip>
            </div>
            <el-row :gutter="20">
                <el-col :xs="6" :sm="6" :md="6" :lg="6" :xl="6">
                    <div class="module transition-e type1">
                        <img class="icon" src="../../../assets/home-item1.png" alt="">
                        <div class="con">
                            <p class="p1">{{statistics.technician.count+statistics.highTechnician.count}}<span class="unit">人</span></p>
                            <p class="p2">技师{{statistics.technician.count}}人</p>
                            <p class="p3">高级技师{{statistics.highTechnician.count}}人</p>
                        </div>
                    </div>
                </el-col>
                <el-col :xs="6" :sm="6" :md="6" :lg="6" :xl="6">
                    <div class="module transition-e type2">
                        <img class="icon" src="../../../assets/home-item2.png" alt="">
                        <div class="con">
                            <p class="p1">{{statistics.technician.money+statistics.highTechnician.money}}<span class="unit">元</span></p>
                            <p class="p2">技师{{statistics.technician.money}}元</p>
                            <p class="p3">高级技师{{statistics.highTechnician.money}}元</p>
                        </div>
                    </div>
                </el-col>
                <el-col :xs="6" :sm="6" :md="6" :lg="6" :xl="6">
                    <div class="module transition-e type3">
                        <img class="icon" src="../../../assets/home-item3.png" alt="">
                        <div class="con">
                            <p class="p1">{{statistics.companyNum}}<span class="unit">人</span></p>
                            <p class="p2">申报企业总数</p>
                        </div>
                    </div>
                </el-col>
                <el-col :xs="6" :sm="6" :md="6" :lg="6" :xl="6">
                    <div class="module transition-e type4">
                        <img class="icon" src="../../../assets/home-item4.png" alt="">
                        <div class="con">
                            <p class="p1">{{statistics.failed}}<span class="unit">人</span></p>
                            <p class="p2">审核不通过</p>
                        </div>
                    </div>
                </el-col>
            </el-row>
            <div class="table-box">
                <rank-table></rank-table>
                <div class="chart-box">
                    <subsidy-chart></subsidy-chart>
                    <people-chart></people-chart>
                </div>
            </div>
        </div>
    </bue-fixed-container>
</template>

<script type="text/ecmascript-6">
    import moment from 'moment';
    import { getStatistics } from "@/api/allowance";
    import RankTable from '@/views/client/homepage/RankTable.vue'
    import SubsidyChart from '@/views/client/homepage/SubsidyChart.vue'
    import PeopleChart from '@/views/client/homepage/PeopleChart.vue'
    import BueFixedContainer from '@/components/BueFixedContainer/BueFixedContainer'

    export default {
        name: 'homepage',
        components: {
            RankTable,
            SubsidyChart,
            PeopleChart,
            BueFixedContainer
        },
        data() {
            return {
                statistics: {},
                nowDate: moment(new Date()).format('YYYY/MM/DD'),
                nowTime: moment(new Date()).format('HH：mm')
            }
        },
        created() {
            this.initData();
        },
        mounted() {
            let _this = this;
            this.timer = setInterval(() => {
                _this.nowDate = moment(new Date()).format('YYYY/MM/DD');
                _this.nowTime = moment(new Date()).format('HH：mm');
            }, 1000);
        },
        methods: {
            async initData() {
                const loading = this.$loading();
                getStatistics().then((response) => {
                    this.statistics = response.statistics;
                    loading.close();
                })
            }
        },
        beforeDestroy() {
            if (this.timer) {
                clearInterval(this.timer);
            }
        }
    };
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
    .home-page {
        width: 100%;
        height: 100%;
        padding: 35px 25px;
        overflow: auto;
        .date-box {
            height: 40px;
            line-height: 40px;
            margin-bottom: 25px;
            & > span {
                display: inline-block;
                color: #434b52;
            }
            .date {
                font-size: 30px;
                margin-right: 10px;
            }
            .block-item {
                margin-right: 10px;
                span {
                    display: block;
                    font-size: 12px;
                    line-height: normal;
                    .time {
                        color: #86929d;
                    }
                }
            }
            .icon1 {
                width: 15px;
                cursor: pointer;
            }
        }
        .module {
            background-color: #ffffff;
            padding: 22px 15px;
            display: flex;
            height: 125px;
            box-shadow: 0 2px 5px #e8e8e8;
            cursor: pointer;
            .icon {
                width: 80px;
                height: 80px;
                flex: 0 0 80px;
            }
            .con {
                flex: 1;
                text-align: right;
                font-size: 14px;
                padding-top: 6px;
                padding-left: 15px;
                overflow: hidden;
                & > p {
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                }
                .p1 {
                    font-size: 30px;
                    margin-bottom: 8px;
                    color: #7f83a4;
                    .unit {
                        font-size: 14px;
                    }
                }
                .p2 {
                    color: #c8cbdc;
                }
                .p3 {
                    color: #c8cbdc;
                    margin-top: 2px;
                }
            }
            &.type1 .con .p1 .unit {
                color: #18ceb4;
            }
            &.type2 .con .p1 .unit {
                color: #f4c831;
            }
            &.type3 .con .p1 .unit {
                color: #755eff;
            }
            &.type4 .con .p1 .unit {
                color: #ff4c76;
            }
            &:hover {
                margin-top: -10px;
            }
        }
        .table-box {
            margin-top: 25px;
            height: calc(100% - 215px);
            display: flex;
            .chart-box {
                width: 450px;
                flex: 0 0 450px;
                height: 100%;
                display: flex;
                flex-direction: column;
            }
        }
    }
</style>