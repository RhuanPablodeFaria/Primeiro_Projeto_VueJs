<template>
  <main
    class="columns is-gapless is-multiline"
    :class="{ 'modo-escuro': modoEscuroAtivo }"
  >
    <div class="column is-one-quarter">
      <Barralateral @aoTerarAlterado="trocarTema" />
    </div>
    <div class="column is-three-quarter conteudo">
      <Notificacoes></Notificacoes>
      <router-view></router-view>
    </div>
  </main>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Barralateral from "./components/Barralateral.vue";
import Notificacoes from "./components/Notificacoes.vue";

export default defineComponent({
  components: { Barralateral, Notificacoes },
  name: "App",
  data() {
    return {
      modoEscuroAtivo: false,
    };
  },
  methods: {
    trocarTema(modoEscuroAtivo: boolean) {
      this.modoEscuroAtivo = modoEscuroAtivo;
    },
  },
});
</script>
  
<style>
.lista {
  padding: 1.25rem;
}
.tendeu {
  text-align: center;
  font-size: 1.2rem;
}
main {
  --bg-primario: #fff;
  --texto-primario: #000;
}
main.modo-escuro {
  --bg-primario: #2b2d42;
  --texto-primario: #ddd;
}
.conteudo {
  background: var(--bg-primario);
}
</style>
