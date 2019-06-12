<template>
    <div class="demo-form">
        <keep-alive>
            <router-view></router-view>
        </keep-alive>
    </div>
</template>

<script type="text/ecmascript-6">
    export default {
        name: 'demo-form'
    };
</script>

<style lang="scss" rel="stylesheet/scss">
    .demo-form{
        min-width:980px;
    }
</style>