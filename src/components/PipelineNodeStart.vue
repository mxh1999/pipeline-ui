<template>
  <g class="pipeline-node-start">
    <rect rx="13" id="svg_1" height="26" width="25" y="-13" x="-13" stroke-width="1.5" />
    <text id="svg_2" x="-5" y="4" class="pipeline-node-start__text">S</text>
  </g>
</template>
<script>
export default {
  props: {
    label: {
      type: String
    }
  }
};
</script>

<style lang="css">
.pipeline-node-start {
  stroke: none;
  fill: #8cc04f;
}

.pipeline-node-start__text {
  stroke: none;
  fill: #fff;
  font-size: 12px;
  font-weight: bold;
}
</style>
