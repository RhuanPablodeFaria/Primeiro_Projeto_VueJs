import { RouteRecordRaw, createRouter, createWebHashHistory } from 'vue-router'
import Tarefas from '../views/Tarefas.vue'
import Projetos from '../views/Projetos.vue'
import Formulario from '@/views/projetos/Formulario.vue'
import Lista from '@/views/projetos/Lista.vue'

const rotas: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Tarefas',
    component: Tarefas
  },
  {
    path: '/projetos',
    component: Projetos,
    children: [
      {
        path: '',
        name: 'Projetos',
        component: Lista
      },
      {
        path: ':id',
        name: 'Editar Projeto',
        component: Formulario,
        props: true
      },
      {
        path: 'novo',
        name: 'Novo Projeto',
        component: Formulario
      }
    ]
  }
]

const roteador = createRouter({
  history: createWebHashHistory(),
  routes: rotas
})

export default roteador
