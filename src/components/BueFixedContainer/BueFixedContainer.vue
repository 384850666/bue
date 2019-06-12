<template>
    <div class="bue-fixed-container">
        <slot></slot>
    </div>
</template>

<script type="text/ecmascript-6">
    export default {
        name: 'bue-fixed-container'
    };
</script>

<style lang="scss" rel="stylesheet/scss">
    .bue-fixed-container{
        width: 100%;
        height: 100%;
        min-height: 650px;
        min-width: 980px;
        background-color: #f0f3fa;
        overflow:hidden;
    }
</style>