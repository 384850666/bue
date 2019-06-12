<template>
    <div class="subsidy-chart">
        <chart-model ref="chartModel" :options="options" @initGraphsData="initGraphsData"></chart-model>
    </div>
</template>

<script type="text/ecmascript-6">
    import { getSubsidyChart } from '@/api/allowance'
    import ChartModel from '@/components/ChartModel.vue'
    export default {
        name: 'subsidy-chart',
        components: {
            ChartModel
        },
        data() {
            return {
                options: {
                    title: {
                        text: '历年补贴统计分析',
                        textStyle: {
                            fontSize: 16,
                            color: '#7f83a4'
                        }
                    },
                    tooltip: {
                        trigger: 'axis'
                    },
                    legend: {
                        data: ['技师', '高级技师'],
                        right: '3%'
                    },
                    grid: {
                        left: '3%',
                        right: '4%',
                        bottom: '3%',
                        containLabel: true
                    },
                    xAxis: {
                        type: 'category',
                        boundaryGap: true,
                        axisLine: {
                            lineStyle: {
                                color: '#999999'
                            }
                        },
                        data: ['2013', '2014', '2015', '2016', '2017']
                    },
                    yAxis: {
                        name: '单位（万）',
                        nameLocation: 'end',
                        type: 'value',
                        axisLabel: {
                            formatter: '{value}'
                        },
                        axisLine: {
                            lineStyle: {
                                color: '#999999'
                            }
                        },
                        splitLine: {
                            lineStyle: {
                                color: '#eeeeee'
                            }
                        }
                    },
                    series: [
                        {
                            name: '技师',
                            type: 'bar',
                            data: [],
                            itemStyle: {
                                normal: {
                                    color: '#18ceb4',
                                    borderColor: '#18ceb4',
                                    barBorderRadius: [8, 8, 0, 0]
                                }
                            },
                            barMaxWidth: 10
                        },
                        {
                            name: '高级技师',
                            type: 'bar',
                            data: [],
                            itemStyle: {
                                normal: {
                                    color: '#f4c831',
                                    borderColor: '#f4c831',
                                    barBorderRadius: [8, 8, 0, 0]
                                }
                            },
                            barMaxWidth: 10
                        }
                    ]
                }
            };
        },
        methods: {
            async initGraphsData() {
                this.options.series[0].data = [];
                this.options.series[1].data = [];
                getSubsidyChart().then((response) => {
                    for (let i in response.item) {
                        this.options.series[i].data = response.item[i].data;
                    }
                    this.drawChart();
                });
            },
            drawChart() {
                this.$refs.chartModel.drawChart()
            }
        }
    };
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
    .subsidy-chart {
        width: 100%;
        flex: 1;
        background-color: #ffffff;
        margin-bottom: 25px;
        padding: 15px;
    }
</style>