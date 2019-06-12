<template>
    <div class="layout">
        <Vheader></Vheader>
        <left-bar></left-bar>
        <div class="layout-body">
            <keep-alive>
                <router-view></router-view>
            </keep-alive>
        </div>
    </div>
</template>

<script>
    import Vheader from '@/views/client/layout/Vheader.vue'
    import LeftBar from '@/views/client/layout/LeftBar.vue'

    export default {
        name: 'layout',
        components: {
            Vheader,
            LeftBar
        }
    }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
    .layout {
        width: 100%;
        height: 100%;
        .layout-body {
            position: absolute;
            top: 65px;
            left: 250px;
            right: 0;
            bottom: 0;
            overflow-x: auto;
        }
    }
</style>