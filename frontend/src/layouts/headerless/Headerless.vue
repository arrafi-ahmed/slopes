<script setup>
import {computed, nextTick, onMounted, ref} from "vue";
import FOG from "vanta/dist/vanta.fog.min";
import {useRoute} from "vue-router";
import {useStore} from "vuex";
import HeaderlessFooter from "./Footer.vue";

const route = useRoute();
const store = useStore();
let vantaEffect = null;
const fogElement = ref(null);
const currentUser = computed(() => store.getters["auth/getCurrentUser"]);

// const theme = useTheme();
// const themeColors = computed(() => theme.global.current.value.colors);

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

onMounted(async () => {
  await nextTick();
  await delay(1000);

  // Initialize VANTA.FOG with options
  if (fogElement.value && ![10, 20].includes(currentUser.value.role)) {
    vantaEffect = FOG({
      el: fogElement.value,
      mouseControls: true,
      touchControls: true,
      gyroControls: false,
      minHeight: fogElement.value.offsetHeight,
      minWidth: fogElement.value.offsetWidth,
      highlightColor: "#4f8cff",   // electric blue highlights
      midtoneColor: "#2a3a5f",     // muted navy midtones
      lowlightColor: "#0d1a2b",    // deep lowlights
      baseColor: "#000010",        // almost black background
      blurFactor: 0.5,             // slightly more haze
      speed: 1.2,                  // slower for a moody vibe
      zoom: 1.1,                   // subtle depth
    });
  }

});
</script>

<template>
  <v-app full-height>
    <div ref="fogElement" class="fill-height bg-tertiary d-flex align-center">
      <v-main>
        <router-view :key="route.fullPath"/>
      </v-main>
    </div>
    <headerless-footer></headerless-footer>
  </v-app>
</template>

<style scoped></style>
