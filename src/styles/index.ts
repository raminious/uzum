import jss from 'jss'
import preset from 'jss-preset-default'

jss.setup(preset())

export default function createStyles(
  config: Config,
  theme: Theme,
  styles: Styles = {},
  activePlugin: Plugin.Instance | null
): object {
  const pluginStyles =
    activePlugin && activePlugin.styles
      ? activePlugin.styles(config, theme)
      : {}

  const defaultStyles = {
    '@global': {
      ...styles.global,
      ...pluginStyles.global
    },
    container: {
      display: 'flex',
      ...styles.container,
      ...pluginStyles.container
    },
    sidebar: {
      width: '30%',
      backgroundColor: 'gray',
      ...styles.sidebar,
      ...pluginStyles.sidebar
    },
    iframe: {
      width: '100%',
      height: '100%',
      ...styles.iframe,
      ...pluginStyles.iframe
    },
    ...styles.extend,
    ...pluginStyles.extend
  }

  return defaultStyles
}
