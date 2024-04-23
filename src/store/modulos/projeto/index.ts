import http from '@/http'
import Iprojeto from '@/interfaces/IProjeto'
import { Estado } from '@/store'
import {
  OBTER_PROJETOS,
  CADASTRAR_PROJETOS,
  ALTERAR_PROJETOS,
  REMOVER_PROJETOS
} from '@/store/tipos-acoes'
import {
  ADICIONA_PROJETO,
  ALTERA_PROJETO,
  EXCLUIR_PROJETO,
  DEFINIR_PROJETOS
} from '@/store/type-mutacoes'
import { Module } from 'vuex'

export interface EstadoDoProjeto {
  projetos: Iprojeto[]
}

export const projeto: Module<EstadoDoProjeto, Estado> = {
  mutations: {
    [ADICIONA_PROJETO](state, nomeDoProjeto: string) {
      const projeto = {
        id: new Date().toISOString().substring(0, 19).replace('T', ' '),
        nome: nomeDoProjeto
      } as Iprojeto
      state.projetos.push(projeto)
    },
    [ALTERA_PROJETO](state, projeto: Iprojeto) {
      const index = state.projetos.findIndex(proj => proj.id == projeto.id)
      state.projetos[index] = projeto
    },
    [EXCLUIR_PROJETO](state, id: string) {
      state.projetos = state.projetos.filter(proj => proj.id != id)
    },
    [DEFINIR_PROJETOS](state, projetos: Iprojeto[]) {
      state.projetos = projetos
    }
  },
  actions: {
    [OBTER_PROJETOS]({ commit }) {
      http
        .get('projetos')
        .then(response => commit(DEFINIR_PROJETOS, response.data))
    },
    [CADASTRAR_PROJETOS](contexto, nomeProjeto: string) {
      return http.post('/projetos', {
        nome: nomeProjeto
      })
    },
    [ALTERAR_PROJETOS](contexto, projeto: Iprojeto) {
      return http.put(`/projetos/${projeto.id}`, projeto)
    },
    [REMOVER_PROJETOS]({ commit }, id: string) {
      return http
        .delete(`/projetos/${id}`)
        .then(() => commit(EXCLUIR_PROJETO, id))
    }
  }
}
