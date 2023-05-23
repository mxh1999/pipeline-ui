<template>
  <div id="app">
    <!-- <img alt="Vue logo" src="./assets/logo.png"> -->
    <!-- <HelloWorld msg="Welcome to Your Vue.js App" /> -->
    <h2>Pipeline</h2>

    <div class="setting">
      
    </div>
    <div class="msg"> You selected :{{ `index:${selectedIndex}, msg: ${msg}` }}</div>
    <el-tabs v-model="tab" type="card">
      <el-tab-pane label="Pipeline" name="pipeline">
        <Pipeline ref="pipeline" :x="parseInt(form.x)" :y="parseInt(form.y)" :data="data" :showArrow="form.showArrow"
          :ystep="parseInt(form.ystep)" :xstep="parseInt(form.xstep)" :lineStyle="form.lineStyle" @select="(node) => handleSelect(node)" />
      </el-tab-pane>
      <el-tab-pane label="Data" name="data">
        <div class="accordion" id="accordionExample">
          <div class="accordion-item" v-for="(item, index) in cache[selectedIndex]" :key="item.id">
            <h2 class="accordion-header" :id="`heading${index+1}`">
              <button class="accordion-button" type="button" data-bs-toggle="collapse" :data-bs-target="'#collapse'+(index+1)" aria-expanded="true" :aria-controls="'collapse'+(index+1)">
                Record #{{ parseInt(index) + 1 }}
              </button>
            </h2>
            <div :id="'collapse'+(index+1)" class="accordion-collapse collapse show" :aria-labelledby="`heading${index+1}`" data-bs-parent="#accordionExample">
              <div class="accordion-body">
                <p v-for="(value, key) in item" :key="key">
                  {{ `${key}: ${value}` }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </el-tab-pane>

    </el-tabs>

  </div>
</template>
  
<script>
import Pipeline from './components/Pipeline.vue'
import { provide,ref } from 'vue';

export default {
    name: "app",
    components: {
      Pipeline
    },
    data() {
      return {
        // 这个cache是一个hashmap,用来保存节点对应的index和对应的数据
        cache:{
          0:[
            {
              id: 0,
              name:'name0-0'
            },{
              id:1,
              name:'name0-1'
            }
          ],
          1:[
            {
              id: 0,
              name:'name1-0'
            },{
              id:1,
              name:'name1-1'
            }
          ],
          2:[
            {
              id: 0,
              name:'name2-0'
            },{
              id:1,
              name:'name2-1'
            }
          ],
          3:[
            {
              id: 0,
              name:'name3-0'
            },{
              id:1,
              name:'name3-1'
            }
          ],
          4:[
            {
              id: 0,
              name:'name4-0'
            },{
              id:1,
              name:'name4-1'
            }
          ],
          5:[
            {
              id: 0,
              name:'name5-0'
            },{
              id:1,
              name:'name5-1'
            }
          ],
          6:[
            {
              id: 0,
              name:'name6-0'
            },{
              id:1,
              name:'name6-1'
            }
          ],
          7:[
            {
              id: 0,
              name:'name7-0'
            },{
              id:1,
              name:'name7-1'
            }
          ],
          8:[
            {
              id: 0,
              name:'name8-0'
            },{
              id:1,
              name:'name8-1'
            }
          ],
          9:[
            {
              id: 0,
              name:'name9-0'
            },{
              id:1,
              name:'name9-1'
            }
          ],
          10:[
            {
              id: 0,
              name:'name10-0'
            },{
              id:1,
              name:'name10-1'
            }
          ],
          11:[
            {
              id: 0,
              name:'name11-0'
            },{
              id:1,
              name:'name11-1'
            }
          ]
        },
        // 表示当前选中的节点的index
        selectedIndex: 0,
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