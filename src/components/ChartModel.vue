<template>
    <div class="chart-model" ref="chart"></div>
</template>

<script type="text/ecmascript-6">
    // 引入基本模板
    let echarts = require('echarts/lib/echarts');
    // 引入折线图组件
    require('echarts/lib/chart/line');
    require('echarts/lib/chart/bar');
    // 引入提示框和title组件
    require('echarts/lib/component/tooltip');
    require('echarts/lib/component/toolbox');
    require('echarts/lib/component/title');
    require('echarts/lib/component/grid');
    require('echarts/lib/component/markPoint');
    export default {
        name: 'chart-model',
        props: {
            options: {
                type: Object
            }
        },
        mounted() {
            let _this = this;
            this.$nextTick(() => {
                window.addEventListener('resize', this.handleResize); //定义窗口大小变更通知事件
                _this.handleResize();
                this.$emit('initGraphsData');
            });
        },
        methods: {
            drawChart() {
                // 基于准备好的dom，初始化echarts实例
                let chartModel = echarts.init(this.$refs.chart);
                // 绘制图表
                chartModel.setOption(this.options);
            },
            handleResize() {
                let chartModel = echarts.init(this.$refs.chart);
                chartModel.resize();
            }
        },
        activated() {
            this.handleResize();
            window.addEventListener('resize', this.handleResize);
        },
        deactivated() {
            window.removeEventListener('resize', this.handleResize);
        }
    };
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
    .chart-model{
        width:100%;
        height:100%;
    }
</style>