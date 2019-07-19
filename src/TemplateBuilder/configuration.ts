const defaultConfig: Config = {
  editableAttribute: 'data-editable'
}

export default function createConfiguration(config: Config | null = {}) {
  return Object.assign(defaultConfig, config)
}
