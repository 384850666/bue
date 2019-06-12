<template>
  <div class="not-found">
    <div class="text-box">
      <h2>404</h2>
      <h4>PAGE NOT FOUND</h4>
      <p>the page requested couldn't be found.</p>
      <p>this could be a spelling error in the URL or a removed page.</p>
      <button @click="back()">BACK</button>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    name: 'error',
    methods: {
      back() {
        this.$router.go(-1);
      }
    }
  };
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  .not-found {
    width: 100%;
    height: 100%;
    position: fixed;
    background: #734efe;
    background: linear-gradient(to right, #734efe, #4bf4f7);
    .text-box {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      color: #ffffff;
      text-align: center;
      h2 {
        font-size: 140px;
        font-weight: bold;
        margin-bottom: 15px;
      }
      h4 {
        font-size: 34px;
        font-weight: bold;
        margin-bottom: 20px;
      }
      p {
        font-size: 16px;
        margin-bottom: 10px;
        opacity: .9;
      }
      button {
        padding: 15px 36px;
        background-color: #ffffff;
        color: #333333;
        font-size: 16px;
        border-radius: 30px;
        border: 0;
        margin-top: 30px;
        font-weight: bold;
        cursor: pointer;
        &:hover {
          opacity: .9;
        }
      }
    }
  }
</style>
