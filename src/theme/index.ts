export interface ITheme {
  editableBorderColor?: string
  editableBorderWidth?: number
}

export default function createTheme(theme: ITheme) {
  const defaultTheme: ITheme = {
    editableBorderColor: 'RebeccaPurple',
    editableBorderWidth: 2
  }

  return Object.assign(defaultTheme, theme)
}
