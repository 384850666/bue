<!--<template>
    <div class="submenu">
        <ul class="menu">
            <router-link v-for="(item,index) in submenuItems" :key="index" :tag="item.tag" :to="item.link">
                <a>
                    <i :class="item.icon"></i>
                    <span class="text">{{item.text}}</span>
                    <i v-if="item.children" class="had-second el-icon-arrow-right"></i>
                </a>
                <ul v-if="item.children" class="inside-menu">
                    <router-link v-for="(secondItem,key) in item.children" :key="key" :tag="secondItem.tag" class=""
                                 :to="secondItem.link">
                        <a class="transition-e">
                            <i :class="secondItem.icon"></i>
                            <span>{{secondItem.text}}</span>
                        </a>
                    </router-link>
                </ul>
            </router-link>
        </ul>
    </div>
</template>-->

<script type="text/ecmascript-6">
    export default {
        name: 'submenu',
        props: {
            submenuItems: {
                type: Array,
                default() {
                    return [];
                }
            }
        },
        render(h) {
            let createItem = (item) => {
                return h(
                    'router-link',
                    {
                        'class': 'item',
                        props: {
                            tag: item.tag,
                            to: item.link
                        }
                    },
                    item.children ? [
                        h('a', [
                            h('i', {'class': item.icon}),
                            h('span', {'class': 'text'}, item.text),
                            h('i', {'class': 'had-second el-icon-arrow-right'})
                        ]),
                        h('ul', {'class': 'inside-menu'}, item.children.map((child) => {
                            return createItem(child);
                        }))
                    ] : [
                        h('a', [
                            h('i', {'class': item.icon}),
                            h('span', {'class': 'text'}, item.text)
                        ])
                    ]
                )
            };

            return h('div', {'class': 'submenu'}, [
                h('ul', {'class': 'menu'}, this.submenuItems.map((item) => {
                    return createItem(item);
                }))
            ])
        },
    };
</script>

<style lang="scss" rel="stylesheet/scss">
    .submenu {
        .menu {
            li {
                position: relative;
                line-height: 60px;
                font-size: 16px;
                a {
                    display: flex;
                    padding: 0 15px 0 35px;
                    color: #666e8c;
                    i:first-child {
                        display: inline-block;
                        margin-right: 15px;
                        font-size: 20px;
                        vertical-align: top;
                        flex: 0 0 20px;
                        line-height: 60px;
                    }
                    .text {
                        flex: 1;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        white-space: nowrap;
                    }
                    i.had-second {
                        display: inline-block;
                        font-size: 20px;
                        vertical-align: top;
                        flex: 0 0 20px;
                        margin-left: 15px;
                        line-height: 60px;
                    }
                }
                &:before {
                    content: '';
                    display: none;
                    width: 4px;
                    height: 100%;
                    position: absolute;
                    left: 0;
                    top: 0;
                    background-color: #329da5;
                }
                &:hover, &.active {
                    background-color: #1f4155;
                    a {
                        color: #329da5;
                    }
                    &:before {
                        display: block;
                    }
                    .inside-menu {
                        display: block;
                    }
                }
                .inside-menu {
                    display: none;
                    li {
                        position: relative;
                        height: 60px;
                        line-height: 60px;
                        font-size: 16px;
                        background-color: #329da5;
                        border-bottom: solid 1px #55cbd4;
                        a {
                            color: #ffffff;
                        }
                        &:hover, &.active {
                            background-color: #30aab3;
                            a {
                                color: #ffffff;
                                padding-left: 68px;
                            }
                            &:before {
                                display: block;
                            }
                        }
                    }
                }
            }
        }
    }
</style>