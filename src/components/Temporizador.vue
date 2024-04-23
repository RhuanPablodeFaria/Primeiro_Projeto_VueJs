<template>
  <section
    class="is-flex is-align-items-center is-justify-content-space-between"
  >
    <cronometro :tempoEmSegundos="tempoEmSegundos" />
    <botao-requerido
      @clicado="iniciarContagem"
      icone="fas fa-play"
      texto="play"
      :desabilitado="cronometroRodando"
    />
    <botao-requerido
      @clicado="finalizarContagem"
      icone="fas fa-stop"
      texto="stop"
      :desabilitado="!cronometroRodando"
    />
  </section>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import BotaoRequerido from "./BotaoRequerido.vue";
import Cronometro from "./Cronometro.vue";

export default defineComponent({
  name: "TemporizadorTempo",
  components: { Cronometro, BotaoRequerido },
  emits: ["aoTemporizadorFinalizado"],
  data() {
    return {
      tempoEmSegundos: 0,
      cronometro: 0,
      cronometroRodando: false,
    };
  },
  methods: {
    iniciarContagem() {
      this.cronometroRodando = true;
      this.cronometro = setInterval(() => {
        this.tempoEmSegundos += 1;
      }, 1000);
    },
    finalizarContagem() {
      this.cronometroRodando = false;
      clearInterval(this.cronometro);
      this.$emit("aoTemporizadorFinalizado", this.tempoEmSegundos);
      this.tempoEmSegundos = 0;
    },
  },
});
</script>

