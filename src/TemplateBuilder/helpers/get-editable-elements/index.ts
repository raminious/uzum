export function getEditableElements(
  doc: HTMLDocument | null,
  config: Config
): NodeListOf<Element> | [] {
  if (!doc) {
    return []
  }

  return doc.querySelectorAll(`[${config.editableAttribute}="true"]`)
}
