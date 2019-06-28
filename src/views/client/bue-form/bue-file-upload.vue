<template>
    <div class="demo-file-upload">
        {{value}}
        <el-transfer ref="transfer" v-model="value" :data="data"></el-transfer>
    </div>
</template>

<script>
    import {getTreeData} from '@/api/tree'
    import {getLog} from '@/api/log'
    export default {
        name: 'demo-file-upload',
        data() {
            const generateData = _ => {
                const data = [];
                for (let i = 1; i <= 15; i++) {
                    data.push({
                        key: i,
                        label: `备选项 ${ i }`,
                        disabled: i % 4 === 0
                    });
                }
                return data;
            };
            return {
                data: generateData(),
                value: [1, 4]
            };
        },
        methods: {
            timedo(ms) {
                return new Promise(resolve => {
                    setTimeout(resolve, ms);
                })
            },
            async printAfterTime() {
                await this.timedo(5000); //正常情况下，await后面是Promise对象,如果不是，则直接返回值
                console.log(1);
                return 'aa'
            },
            async getData() {
                let [tree, log] = await Promise.all([getTreeData(), getLog()]);
                console.log(tree);
                console.log(log);
                return [tree, log];
            }
        },
        created() {
            this.printAfterTime(); //该为promise对象，5秒之后打印出1
            this.getData();
            /*this.getData().then(([tree, log]) => {
                console.log(tree);
                console.log(log);
            });*/
        },
        mounted() {
            console.log(this.$refs.transfer);
        }
    };
</script>

<style lang="scss">

</style>