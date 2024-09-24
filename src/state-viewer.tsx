import ReactJson from 'react-json-view'
import { useLineStore } from './package/line/store'
import { useNodeStore } from './package/node/store'

export function StateViewer() {
  const nodes = useNodeStore(state => state.nodes)
  const lines = useLineStore(state => state.lines)

  return (
    <div style={{ display: 'flex', padding: 20, width: 300, overflow: 'scroll' }}>
      <ReactJson
        src={{ nodes, lines }}
        indentWidth={2}
        displayDataTypes={false}
        displayObjectSize={false}
        enableClipboard={false}
      />
    </div>
  )
}
