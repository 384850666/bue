<template>
    <div class="bue-img-view">
        <el-dialog :visible.sync="visible" append-to-body class="bue-preview-dialog">
            <img v-if="typeof urls === 'string'" class="big-pic" :src="urls" alt="">
            <el-carousel v-else trigger="click" :autoplay="false" type="card">
                <el-carousel-item v-for="(o,i) in urls" :key="i">
                    <img :src="o" class="big-pic" alt="">
                </el-carousel-item>
            </el-carousel>
        </el-dialog>
    </div>
</template>

<script type="text/ecmascript-6">
    export default {
        name: 'bue-img-view',
        props: {
            urls: {
                type: [String, Array]
            }
        },
        data() {
            return {
                visible: false
            }
        },
        methods: {
            Show() {
                this.visible = true;
            }
        }
    };
</script>

<style lang="scss" rel="stylesheet/scss">
    .bue-preview-dialog {
        .el-dialog {
            background: #333333;
            .el-dialog__header {
                padding: 20px 20px 10px;
                background: #333333;
            }
            .el-dialog__body {
                .el-carousel__container {
                    height: 500px;
                }
                .big-pic {
                    max-width: 100%;
                    display: block;
                    margin: 0 auto;
                    max-height: 500px;
                }
            }
        }
    }
</style>