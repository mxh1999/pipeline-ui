<template>
  <div id="app">
    <!-- <img alt="Vue logo" src="./assets/logo.png"> -->
    <!-- <HelloWorld msg="Welcome to Your Vue.js App" /> -->
    <h1>Pipeline</h1>

    <el-collapse v-model="cmd_tab" accordion>
      <el-collapse-item title="Graph Construction" name="1">
        <el-input type="textarea" autosize v-model="command"></el-input>
        <el-button type="textarea" @click="updateGraph">Update</el-button>
      </el-collapse-item>
    </el-collapse>
    <div class="msg"> You selected :{{ `index:${selectedIndex}, msg: ${msg}, selectedRow: ${selectedRow}, dataProprityCount: ${dataProprityCount}` }}</div>
    <el-tabs v-model="tab" type="card">
      <el-tab-pane label="Pipeline" name="pipeline">
        <Pipeline ref="pipeline" :x="parseInt(form.x)" :y="parseInt(form.y)" :data="data" :showArrow="form.showArrow"
          :ystep="parseInt(form.ystep)" :xstep="parseInt(form.xstep)" :lineStyle="form.lineStyle"
          @select="(node) => handleSelect(node)" />
      </el-tab-pane>
      <el-tab-pane label="Data" name="data">
        <div class="accordion" id="accordionExample">
          <div class="table-responsive">
            <table class="table table-striped table-bordered table-hover">
              <thead>
                <tr>
                  <th scope="col" v-for="(value) in cache[selectedIndex][0].slice(0, dataProprityCount-1)" :key="value">{{ value }}</th>
                  <th scope="col">{{ '操作' }}</th>
                </tr>
              </thead>
              <tbody>
                <tr class="" v-for="(data, index) in cache[selectedIndex].slice(1, cache[selectedIndex].length)"
                  :key="data"
                  :class="{ 'bg-warning': data[dataProprityCount-1]}">
                  <td scope="row" v-for="value in data.slice(0, dataProprityCount-1)" :key="value">{{ value }}</td>
                  <td scope="row" :data-rowindex="index" @click.prevent="rowClick"><i class="bi bi-check"></i></td>
                </tr>
              </tbody>
            </table>
          </div>

        </div>
      </el-tab-pane>

    </el-tabs>

  </div>
</template>
  
<script>
import Pipeline from './components/Pipeline.vue'
import { provide, ref } from 'vue';

export default {
  name: "app",
  components: {
    Pipeline
  },
  computed: {
    dataProprityCount() {
      return this.cache[this.selectedIndex][0].length
    }
  },  
  data() {
    return {
      // 这个cache是一个hashmap,用来保存节点对应的index和对应的数据
      cache: {
        0: [['att1', 'att2', 'att3', 'active'], ['value11', 'value12', 'value13', true], ['value21', 'value22', 'value23', false]],
        1: [['att1', 'att2', 'active'], ['value11', 'value12', false], ['value21', 'value22', true]],
        2: [['att1', 'att2', 'att3', 'active'], ['value11', 'value12', 'value13', true], ['value21', 'value22', 'value23', false]],
      },
      // 表示当前选中的节点的index
      selectedIndex: 0,
      selectedRow: null,
      highlight: [[0, 0], [1, 1]],
      tab: "pipeline",


      data: [
        { name: "S", hint: "url", status: "start", "next": [] },
        { name: "S", hint: "url", status: "start", "next": [] },
        { name: "SB", hint: "SB", status: "success", "next": [{ index: 0, weight: 2 }, { index: 1, weight: 2 }] }
      ],
      form: {
        x: 50,
        y: 55,
        xstep: 120,
        ystep: 70,
        data: 0,
        showArrow: true,
        lineStyle: "default",
        from: 0,
        to: 0
      },
      msg: "ha",
      cmd_tab: "1",
      command: ref("")
    };
  },
  methods: {
    handleSelect(node) {
      this.msg = node.name;
    },
    updateGraph() {
      this.msg = this.command;
    },
    rowClick(event) {
      const tagName = event.target.tagName
      let element = event.target
      if (tagName !== 'TD') {
        element = element.parentElement
      }
      this.selectedRow = element.dataset['rowindex'];
      // 与后端通信 获得highlight属性

    }
  },
  // 这边使用provide/inject机制双向数据绑定PipelineNode.vue中的selectedIndex
  provide() {
    return {
      selected1: {
        value: this.selectedIndex,
        update: (newVal) => {
          this.selectedIndex = newVal
        }
      }
    }
  },
}
</script>

<style scoped>
#app {
  /* text-align: center; */
  color: #2c3e50;
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  margin: 0px 0px;

  /* margin-top: 60px; */

  /* height: 100vh; */

  /* display: flex; */

  /* flex-direction: column; */
}

.msg {
  height: 20px;
  margin: 20px auto;
}

Pipeline {
  margin: auto 0;
}
</style>