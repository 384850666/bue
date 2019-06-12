<template>
    <bue-fixed-container>
        <div class="demo-table">
            <el-button class="export-btn" type="primary" @click="exportData">打印</el-button>
            <div class="table-box">
                <bue-table ref="bueTable" :columns="table.columns" :data="table.data"
                           :bindings="bindings" multiple @selection-change="selectionChange" file-name="自定义文件名">
                    <!-- 行号列插槽 -->
                    <!--<template v-slot:hasRowNUm="{index}">
                        {{index*2}}
                    </template>-->

                    <!-- 自定义列插槽 -->
                    <template v-slot:info.tag="{row,format}">
                        <el-tag>{{format}}</el-tag>
                    </template>
                </bue-table>
            </div>
        </div>
    </bue-fixed-container>
</template>

<script type="text/ecmascript-6">
    import BueFixedContainer from '@/components/BueFixedContainer/BueFixedContainer'
    import BueTable from '@/components/BueTable/BueTable';

    export default {
        name: 'demo-table',
        components: {
            BueTable,
            BueFixedContainer
        },
        data() {
            return {
                bindings: {
                    Tag: [
                        {Name: '家', Value: 1},
                        {Name: '公司', Value: 2}
                    ]
                },
                table: {
                    data: [
                        {
                            date: 1462147200,
                            pics: [
                                {
                                    filename: "upload20060809130705",
                                    url: "http://www.hddznet.com/templates/hdgreen/images/code_hddz.jpg",
                                    base64String: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAYAAADimHc4...",
                                    type: "image/png",
                                    size: 5000
                                },
                                {
                                    filename: "upload20060809130705",
                                    url: "http://www.hddznet.com/templates/hdgreen/images/code_hddz.jpg",
                                    base64String: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAYAAADimHc4...",
                                    type: "image/png",
                                    size: 5000
                                },
                                {
                                    filename: "upload20060809130705",
                                    url: "http://www.hddznet.com/templates/hdgreen/images/code_hddz.jpg",
                                    base64String: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAYAAADimHc4...",
                                    type: "image/png",
                                    size: 5000
                                },
                            ],
                            info: {
                                name: "小黑",
                                province: "上海",
                                city: "普陀区",
                                address: "上海市普陀区金沙江路 1518 弄",
                                zip: 200333,
                                tag: 1
                            }
                        },
                        {
                            date: 1462320000,
                            pics: [
                                {
                                    filename: "upload20060809130705",
                                    url: "http://www.hddznet.com/templates/hdgreen/images/code_hddz.jpg",
                                    base64String: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAYAAADimHc4...",
                                    type: "image/png",
                                    size: 5000
                                }
                            ],
                            info: {
                                name: "小黄",
                                province: "杭州",
                                city: "西湖区",
                                address: "杭州市西湖区无名路26弄",
                                zip: 200333,
                                tag: 2
                            }
                        },
                        {
                            date: 1462060800,
                            pics: [
                                {
                                    filename: "upload20060809130705",
                                    url: "http://www.hddznet.com/templates/hdgreen/images/code_hddz.jpg",
                                    base64String: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAYAAADimHc4...",
                                    type: "image/png",
                                    size: 5000
                                }
                            ],
                            info: {
                                name: "小红",
                                province: "宁波",
                                city: "镇海区",
                                address: "宁波市镇海区启迪路1142号",
                                zip: 200333,
                                tag: 1
                            }
                        },
                        {
                            date: 1462233600,
                            pics: [
                                {
                                    filename: "upload20060809130705",
                                    url: "http://www.hddznet.com/templates/hdgreen/images/code_hddz.jpg",
                                    base64String: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAYAAADimHc4...",
                                    type: "image/png",
                                    size: 5000
                                }
                            ],
                            info: {
                                name: "小绿",
                                province: "嘉兴",
                                city: "秀洲区",
                                address: "嘉兴市秀洲区龙凤路1816号",
                                zip: 200333,
                                tag: 2
                            }
                        },
                        {
                            date: 1462147200,
                            pics: [
                                {
                                    filename: "upload20060809130705",
                                    url: "http://www.hddznet.com/templates/hdgreen/images/code_hddz.jpg",
                                    base64String: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAYAAADimHc4...",
                                    type: "image/png",
                                    size: 5000
                                }
                            ],
                            info: {
                                name: "小黑",
                                province: "上海",
                                city: "普陀区",
                                address: "上海市普陀区金沙江路 1518 弄",
                                zip: 200333,
                                tag: 1
                            }
                        },
                        {
                            date: 1462320000,
                            pics: [
                                {
                                    filename: "upload20060809130705",
                                    url: "http://www.hddznet.com/templates/hdgreen/images/code_hddz.jpg",
                                    base64String: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAYAAADimHc4...",
                                    type: "image/png",
                                    size: 5000
                                }
                            ],
                            info: {
                                name: "小黄",
                                province: "杭州",
                                city: "西湖区",
                                address: "杭州市西湖区无名路26弄",
                                zip: 200333,
                                tag: 2
                            }
                        },
                        {
                            date: 1462060800,
                            pics: [
                                {
                                    filename: "upload20060809130705",
                                    url: "http://www.hddznet.com/templates/hdgreen/images/code_hddz.jpg",
                                    base64String: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAYAAADimHc4...",
                                    type: "image/png",
                                    size: 5000
                                }
                            ],
                            info: {
                                name: "小红",
                                province: "宁波",
                                city: "镇海区",
                                address: "宁波市镇海区启迪路1142号",
                                zip: 200333,
                                tag: 1
                            }
                        },
                        {
                            date: 1462233600,
                            pics: [
                                {
                                    filename: "upload20060809130705",
                                    url: "http://www.hddznet.com/templates/hdgreen/images/code_hddz.jpg",
                                    base64String: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAYAAADimHc4...",
                                    type: "image/png",
                                    size: 5000
                                }
                            ],
                            info: {
                                name: "小绿",
                                province: "嘉兴",
                                city: "秀洲区",
                                address: "嘉兴市秀洲区龙凤路1816号",
                                zip: 200333,
                                tag: 2
                            }
                        }
                    ],
                    columns: [
                        {data: "pics", label: "图片", dtype: 'image'},
                        {data: "date", label: "日期", width: 180, dtype: "dateTime", format: "YYYY-MM-DD"},
                        {
                            label: "配送信息", children: [
                                {data: "info.name", label: "姓名", width: 120},
                                {data: "info.province", label: "省份", width: 120},
                                {data: "info.city", label: "市区", width: 120},
                                {data: "info.address", label: "详细"},
                                {data: "info.zip", label: "邮编", width: 120},
                                {data: "info.tag", label: "类型", width: 180, dtype: 'code', format: 'Tag'}
                            ]
                        }
                    ]
                },
                selectRows: []
            };
        },
        methods: {
            selectionChange(rows) {
                this.selectRows = rows;
                console.log(this.selectRows);
            },
            exportData() {
                this.$refs.bueTable.Export(this.selectRows);
            },
        }
    };
</script>

<style lang="scss" rel="stylesheet/scss">
    .demo-table {
        height: 100%;
        padding: 25px;
        background-color: #ffffff;
        .table-box {
            /*height:100%;*/
            /*height: 600px;*/
            height: calc(100% - 51px);
        }
        .export-btn{
            margin-bottom:10px;
        }
    }
</style>