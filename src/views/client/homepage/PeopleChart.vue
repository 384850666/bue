<template>
    <div class="people-chart">
        <chart-model ref="chartModel" :options="options" @initGraphsData="initGraphsData"></chart-model>
    </div>
</template>

<script type="text/ecmascript-6">
    import { getPeopleChart } from '@/api/allowance'
    import ChartModel from '@/components/ChartModel.vue'
    export default {
        name: 'people-chart',
        components: {
            ChartModel
        },
        data() {
            return {
                options: {
                    title: {
                        text: '历年人数统计分析',
                        textStyle: {
                            fontSize: 16,
                            color: '#7f83a4'
                        }
                    },
                    tooltip: {
                        trigger: 'axis'
                    },
                    /*toolbox: {
                        show: true,
                        feature: {
                            mark: {show: true},
                            magicType: {show: true, type: ["line", "bar"]},
                            restore: {show: true},
                            saveAsImage: {show: true}
                        }
                    },*/
                    grid: {
                        left: '3%',
                        right: '4%',
                        bottom: '3%',
                        containLabel: true
                    },
                    xAxis: {
                        type: 'category',
                        boundaryGap: false,
                        axisLine: {
                            lineStyle: {
                                color: '#999999'
                            }
                        },
                        data: ['2013', '2014', '2015', '2016', '2017', '2018']
                    },
                    yAxis: {
                        name: '单位（千人）',
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
                            name: '人数',
                            type: 'line',
                            data: [],
                            markPoint: {
                                data: [
                                    {type: 'max', name: '最大值'},
                                    {type: 'min', name: '最小值'}
                                ]
                            },
                            symbolSize: 8,
                            itemStyle: {
                                normal: {
                                    color: '#09caae',
                                    borderColor: '#09caae',
                                    borderWidth: 2
                                }
                            }
                        }
                    ]
                }
            };
        },
        methods: {
            async initGraphsData() {
                this.options.series[0].data = [];
                getPeopleChart().then((response) => {
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
    .people-chart {
        width: 100%;
        flex: 1;
        background-color: #ffffff;
        padding: 15px;
    }
</style>