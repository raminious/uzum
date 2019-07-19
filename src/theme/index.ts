export default function createTheme(theme: Theme) {
  const defaultTheme: Theme = {
    editableBorderColor: 'RebeccaPurple',
    editableBorderWidth: 2,
    editableBorderRadius: 0
  }

  return Object.assign(defaultTheme, theme)
}
