const state = {
  progress: 0
}

const mutations = {
  changeProgress (state, percent) {
    state.progress = percent
  }
}

const getters = {

}

const actions = {
  async installSoftware ({ commit, dispatch, state }, { softwareList }) {
    commit('changeProgress', 0)
    const eachSoftwareProgress = 100 / softwareList.length
    let count = 0
    const simulator = setInterval(() => {
      count++
      if (count === softwareList.length) {
        commit('changeProgress', 100)
        clearInterval(simulator)
      } else {
        commit('changeProgress', eachSoftwareProgress * count)
      }
    }, 2000)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  getters,
  actions
}
