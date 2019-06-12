<template>
    <div class="bue-code">
        <el-input v-model="model" v-bind="$attrs" v-on="$listeners"></el-input>
        <div class="s-canvas" @click.stop="initCode(len)">
            <canvas id="s-canvas" :width="contentWidth" :height="contentHeight"></canvas>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    export default {
        name: 'bue-code',
        inheritAttrs: false,
        props: {
            value: {
                type: String,
                default: ''
            },
            // code: {
            //     type: String,
            //     default: '1234'
            // },
            len: {
                type: Number,
                default: 4
            },
            contentWidth: { //容器宽度
                type: Number,
                default: 100
            },
            contentHeight: { //容器高度
                type: Number,
                default: 38
            },
            hasLine: { //是否有干扰线
                type: Boolean,
                default: false
            },
            hasDot: { //是否有干扰点
                type: Boolean,
                default: false
            },
            fontColor: { //字体颜色
                type: String,
                default: 'rgba(255,255,255,0.7)'
            },
            backgroundColor: { //背景颜色
                type: String,
                default: 'rgba(64,158,255)'
            },
            fontSizeMin: { //最小字体大小
                type: Number,
                default: 18
            },
            fontSizeMax: { //最大字体大小
                type: Number,
                default: 24
            },
            // backgroundColorMin: {
            //     type: Number,
            //     default: 240
            // },
            // backgroundColorMax: {
            //     type: Number,
            //     default: 250
            // },
            // colorMin: {
            //     type: Number,
            //     default: 0
            // },
            // colorMax: {
            //     type: Number,
            //     default: 50
            // },
            lineColorMin: {
                type: Number,
                default: 40
            },
            lineColorMax: {
                type: Number,
                default: 180
            },
            dotColorMin: {
                type: Number,
                default: 0
            },
            dotColorMax: {
                type: Number,
                default: 255
            }
        },
        data() {
            return {
                model: null,
                code: ''
            }
        },
        watch: {
            value: {
                immediate: true, deep: true,
                handler(v) {
                    if (typeof v === 'number') {
                        this.model = String(v);
                    } else {
                        this.model = v;
                    }
                }
            },
            model: {
                immediate: true, deep: true,
                handler(v) {
                    let val = v || '';
                    this.$emit('input', val);
                }
            },
            code() {
                this.drawPic();
            }
        },
        mounted() {
            this.drawPic();
            this.initCode(this.len);
        },
        methods: {
            // 生成一个随机数
            randomNum(min, max) {
                return Math.floor(Math.random() * (max - min) + min);
            },
            // 生成一个随机的颜色
            randomColor(min, max) {
                let r = this.randomNum(min, max);
                let g = this.randomNum(min, max);
                let b = this.randomNum(min, max);
                return 'rgb(' + r + ',' + g + ',' + b + ')';
            },
            drawPic() {
                let canvas = document.getElementById('s-canvas');
                let ctx = canvas.getContext('2d');
                ctx.textBaseline = 'bottom';
                // 绘制背景
                // ctx.fillStyle = this.randomColor( //随机背景颜色
                //     this.backgroundColorMin,
                //     this.backgroundColorMax
                // );
                ctx.fillStyle = this.backgroundColor;
                ctx.fillRect(0, 0, this.contentWidth, this.contentHeight);
                // 绘制文字
                for (let i = 0; i < this.code.length; i++) {
                    this.drawText(ctx, this.code[i], i);
                }
                if (this.hasLine) {
                    this.drawLine(ctx);
                }
                if (this.hasDot) {
                    this.drawDot(ctx);
                }
            },
            drawText(ctx, txt, i) {
                // ctx.fillStyle = this.randomColor(this.colorMin, this.colorMax); //随机字体颜色
                ctx.fillStyle = this.fontColor;
                ctx.font = this.randomNum(this.fontSizeMin, this.fontSizeMax) + 'px SimHei';
                let x = (i + 0.8) * (this.contentWidth / (this.code.length + 1));
                let y = this.randomNum(this.fontSizeMax, this.contentHeight - 4);
                let deg = this.randomNum(-15, 15);
                // 修改坐标原点和旋转角度
                ctx.translate(x, y);
                ctx.rotate(deg * Math.PI / 180);
                ctx.fillText(txt, 0, 0);
                // 恢复坐标原点和旋转角度
                ctx.rotate(-deg * Math.PI / 180);
                ctx.translate(-x, -y);
            },
            drawLine(ctx) {
                // 绘制干扰线
                for (let i = 0; i < 8; i++) {
                    ctx.strokeStyle = this.randomColor(
                        this.lineColorMin,
                        this.lineColorMax
                    );
                    ctx.beginPath();
                    ctx.moveTo(
                        this.randomNum(0, this.contentWidth),
                        this.randomNum(0, this.contentHeight)
                    );
                    ctx.lineTo(
                        this.randomNum(0, this.contentWidth),
                        this.randomNum(0, this.contentHeight)
                    );
                    ctx.stroke();
                }
            },
            drawDot(ctx) {
                // 绘制干扰点
                for (let i = 0; i < 100; i++) {
                    ctx.fillStyle = this.randomColor(0, 255);
                    ctx.beginPath();
                    ctx.arc(this.randomNum(0, this.contentWidth), this.randomNum(0, this.contentHeight), 1, 0, 2 * Math.PI);
                    ctx.fill();
                }
            },
            // randomNumber() {
            //     return Math.floor(Math.random() * 10);
            // },
            randomStr() {
                let chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefjhijklmnopqrstuvwxyz0123456789', len = chars.length;
                return chars.charAt(Math.floor(Math.random() * len));
            },
            initCode(l) {
                let newCode = '', len = l || 4;
                for (let i = 0; i < len; i++) {
                    newCode += String(this.randomStr());
                }
                // this.$emit('update:code', newCode);
                this.code = newCode;
                this.$emit('onChange', this.code);
            }
        }
    };
</script>

<style lang="scss" rel="stylesheet/scss">
    .bue-code {
        width: 100%;
        .s-canvas {
            position: absolute;
            right: 1px;
            top: 1px;
            line-height: normal;
            height: 38px;
            border-radius: 0 4px 4px 0;
            overflow: hidden;
            cursor: pointer;
        }
    }
</style>