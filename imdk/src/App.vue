<template>
  <div id="app">
    <div class="top">
      <h5 class="top-title">
        我来组成顶部
      </h5>
    </div>
    <div>
      welcome！
    </div>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: "App"
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
* {
  margin: 0;
  padding: 0;
}
.top{
  height: 30px;
  width: 100%;
  background: #000033;
  position: relative;
  color: white
}
.top-title{
  position: absolute;
  top:50%;
  left:50%;
  transform: translateX(-50%);
  transform: translateY(-50%);
}
</style>
