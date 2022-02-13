<template>
  <div style="position: relative" class="pt04 mt-4 mb_n4">
    <div class="text-subtitle1" style="position: absolute; left: 0; top: -8px">
      <span class="grey-text">{{ label }}</span>
      <span class="text-body-2 ml-2">{{ LV_LABEL(value) }} ({{ value }})</span>
    </div>
    <v-slider
      :value="value"
      :min="LV.BLOCK"
      :max="LV.SUPER"
      ticks="always"
      tick-size="1"
      thumb-label
      @inut="$emit('input', $event)"
    ></v-slider>
  </div>
</template>

<script>
import { LV, LV_LABEL } from "../../../../../util/level";
export default {
  name: "BoardSlider",
  model: {
    prop: "value",
    event: "input",
  },
  props: {
    value: Number,
    label: String,
  },
  computed: {
    LV: () => LV,
    LV_LABEL: () => LV_LABEL,
  },
};
</script>

<style>
</style>