<template>
  <div id="app">
    <!-- <img alt="Vue logo" src="./assets/logo.png"> -->
    <!-- <HelloWorld msg="Welcome to Your Vue.js App" /> -->
    <h2>Pipeline</h2>

    <div class="setting">
      
    </div>
    <div class="msg"> You selected :{{msg}}</div>
    <el-tabs v-model="tab" type="card">
      <el-tab-pane label="Pipeline" name="pipeline">
        <Pipeline ref="pipeline" :x="parseInt(form.x)" :y="parseInt(form.y)" :data="data" :showArrow="form.showArrow"
          :ystep="parseInt(form.ystep)" :xstep="parseInt(form.xstep)" :lineStyle="form.lineStyle" @select="(node) => handleSelect(node)" />
      </el-tab-pane>
      <el-tab-pane label="Data" name="data">
        {{JSON.stringify(this.data)}}
      </el-tab-pane>

    </el-tabs>

  </div>
</template>
  
<script>
import Pipeline from './components/Pipeline.vue'

export default {
    name: "app",
    components: {
      Pipeline
    },
    data() {
      return {
        tab: "pipeline",
        data: [
            {
              name: "Start",
              hint: "1m23s",
              status: "start",
              next: [{ index: 1, weight: 2 }]
            },
            {
              name: "Ammouncement Import",
              hint: "1m23s",
              status: "success",
              next: [{ index: 2, weight: 2 }]
            },
            {
              name: "Employee ID to Onboarding",
              hint: "2m23s",
              status: "success",
              next: [
                { index: 3, weight: 2 },
                { index: 4, weight: 2 },
                { index: 5, weight: 2 },
                { index: 6, weight: 0 },
                { index: 7, weight: 1 },
                { index: 8, weight: 2 },
                { index: 9, weight: 0 }
              ]
            },
            {
              name: "Personal Basic Info",
              hint: "2m23s",
              status: "unstable",
              next: [{ index: 10, weight: 2 }]
            },
            {
              name: "地址信息",
              hint: "2m23s",
              status: "success",
              next: [{ index: 10, weight: 0 }]
            },
            {
              name: "Family Info",
              hint: "2m23s",
              status: "failure",
              next: [{ index: 10, weight: 0 }]
            },
            {
              name: "Education Info",
              hint: "2m23s",
              status: "running",
              next: [{ index: 10, weight: 0 }]
            },
            {
              name: "Degree Info",
              hint: "2m23s",
              status: "failure",
              next: [{ index: 10, weight: 0 }]
            },
            {
              name: "Career Info",
              hint: "2m23s",
              status: "failure",
              next: [{ index: 10, weight: 0 }]
            },
            {
              name: "Qualification Info",
              hint: "2m23s",
              status: "failure",
              next: [{ index: 10, weight: 0 }]
            },
            { name: "End", hint: "2m23s", status: "end", next: [] }
          ],
        form: {
          x:50,
          y: 55,
          xstep: 120,
          ystep: 70,
          data: 0,
          showArrow: true,
          lineStyle: "default",
          from: 0,
          to: 0
        },
        msg: "ha"
      };
  },
  methods: {
    handleSelect(node) {
      this.msg = node.name;
    }
  }
}
</script>

<style scoped>
#app {
  /* text-align: center; */
  color: #2c3e50;
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  margin: 30px 30px;

  /* margin-top: 60px; */

  /* height: 100vh; */

  /* display: flex; */

  /* flex-direction: column; */
}

.setting {
  margin: 30px;
  width: 800px;
}

.addline {
  display: flex;
  width: 300px;
}

.addline > *:not(:first-child) {
  margin-left: 5px;
}

.msg {
  height: 20px;
  margin: 20px auto;
}
</style>