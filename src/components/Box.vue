<template>
  <div class="box has-text-weight-bold">
    <slot></slot>
    <!--Quer dizer como quem estiver entre a classe box, oque estiver dento irá ser renderizado-->
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "BoxShadow",
});
</script>

<style scoped>
.box {
  background: #faf0ca;
}
</style>