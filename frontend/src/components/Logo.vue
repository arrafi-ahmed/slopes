<script setup>
import {useDisplay} from "vuetify";
import {appInfo} from "@/others/util";

const {xs} = useDisplay();
const {imgSrc, title, imgClass, containerClass, maxWidth, maxHeight, width} =
  defineProps([
    "imgSrc",
    "title",
    "imgClass",
    "containerClass",
    "maxWidth",
    "maxHeight",
    "width",
  ]);
</script>

<template>
  <div :class="`d-flex align-center ${containerClass}`">
    <v-img
      v-if="imgSrc"
      :class="` ${imgClass}`"
      :max-width="maxWidth"
      :max-height="maxHeight"
      :src="imgSrc"
      :width="width"
    />

    <div
      v-if="title"
      :class="imgSrc?'pl-2':'mx-auto'"
    >
      <component :is="xs ? 'h3' : 'h2'">
        <span class="text-primary">{{ title }}</span>
      </component>
    </div>
  </div>
</template>

<style scoped></style>
