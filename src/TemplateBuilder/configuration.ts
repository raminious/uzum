import { Config } from '.'

const defaultConfig: Config = {
  editableAttribute: 'editable',
  styles: {}
}

export default function createConfiguration(config) {
  return Object.assign(defaultConfig, config)
}
