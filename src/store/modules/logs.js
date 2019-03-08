 

import { setStore, getStore } from '@/util/store'
import { dateFormat } from '@/filters/'
import { sendLogs } from '@/api/log'
const logs = {
  state: {
      logsList: getStore({ name: 'logsList' }) || []
    },
  actions: {
        // 发送错误日志
      SendLogs({ state, commit }) {
          return new Promise((resolve, reject) => {
              sendLogs(state.logsList).then(() => {
                  commit('CLEAR_LOGS')
                  resolve()
                }).catch(error => {
                  reject(error)
                })
            })
        },
      ADD_LOGS: ({ state, rootState }, { type, message, stack, info }) => {
          state.logsList.push(Object.assign({
              url: window.location.href,
              time: dateFormat(new Date()),
              user: rootState.user.userInfo ? rootState.user.userInfo.username : ''
            }, {
              type,
              message,
              stack,
              info: info.toString()
            }))
          setStore({ name: 'logsList', content: state.logsList })
        }
    },
  mutations: {
      CLEAR_LOGS: (state) => {
          state.logsList = []
          setStore({ name: 'logsList', content: state.logsList })
        }
    }

}

export default logs
