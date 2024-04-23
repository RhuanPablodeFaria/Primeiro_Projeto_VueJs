import http from '@/http'
import ITarefa from '@/interfaces/ITarefa'
import { Estado } from '@/store'
import {
  OBTER_TAREFAS,
  CADASTRAR_TAREFA,
  ALTERAR_TAREFA
} from '@/store/tipos-acoes'
import {
  ALTERA_TAREFA,
  ADICIONA_TAREFA,
  DEFINIR_TAREFAS
} from '@/store/type-mutacoes'
import { Module } from 'vuex'

export interface EstadoTarefa {
  tarefas: ITarefa[]
}

export const tarefa: Module<EstadoTarefa, Estado> = {
  state: {
    tarefas: []
  },
  mutations: {
    [ALTERA_TAREFA](state, tarefa: ITarefa) {
      const index = state.tarefas.findIndex(t => t.id == tarefa.id)
      state.tarefas[index] = tarefa
    },
    [ADICIONA_TAREFA](state, tarefas: ITarefa) {
      state.tarefas.push(tarefas)
    },
    [DEFINIR_TAREFAS](state, tarefas: ITarefa[]) {
      state.tarefas = tarefas
    }
  },
  actions: {
    [OBTER_TAREFAS]({ commit }, filtro: string) {
      let url = 'tarefa'

      if (filtro) {
        url += '?descricao=' + filtro
      }

      return http
        .get(url)
        .then(response => commit(DEFINIR_TAREFAS, response.data))
    },
    [CADASTRAR_TAREFA]({ commit }, tarefa: ITarefa) {
      return http
        .post('/tarefa', tarefa)
        .then(resposta => commit(ADICIONA_TAREFA, resposta.data))
    },
    [ALTERAR_TAREFA]({ commit }, tarefa: ITarefa) {
      return http
        .put(`/tarefa/${tarefa.id}`, tarefa)
        .then(() => commit(ALTERA_TAREFA, tarefa))
    }
  }
}
