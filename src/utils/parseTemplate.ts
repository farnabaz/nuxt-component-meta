import type { SFCDescriptor } from '@vue/compiler-sfc'
import { compileTemplate } from '@vue/compiler-sfc'
import { findSlotUsage } from './source'

export function parseTemplate (id: string, descriptor: SFCDescriptor) {
  const slots = []
  if (!descriptor.template) {
    return {
      slots: []
    }
  }

  const template = compileTemplate({
    source: descriptor.template.content,
    id,
    filename: id
  })

  const findSlots = (nodes: any[]) => {
    if (!nodes.length) { return [] }
    const slots = nodes.filter(n => n.tag === 'slot').map(s => ({
      name: JSON.parse(s.codegenNode.arguments[1])
    }))
    return [
      ...slots,
      ...findSlots(nodes.flatMap(n => n.children || []))
    ]
  }

  // Detect `<slot>` usage
  const slotsAst = findSlots(template.ast.children)
  slots.push(...slotsAst)

  // Detect `$slots` usage
  const slotUsages = findSlotUsage(template.source)
  slots.push(...slotUsages)

  return {
    slots
  }
}
