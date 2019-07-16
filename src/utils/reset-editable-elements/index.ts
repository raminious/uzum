export function resetEditableElements(doc) {
  doc.querySelectorAll('[contenteditable="true"]').forEach(el => {
    el.setAttribute('contenteditable', 'false')
  })
}
