import MasterTool from '@vlalg-nimbus/master-tool'

const plugin = {
  install(Vue) {
    const $masterTool = MasterTool()

    Vue.provide('$masterTool', $masterTool)
  },
};

export default plugin;
