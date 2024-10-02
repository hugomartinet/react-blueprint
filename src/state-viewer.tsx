import ReactJson from 'react-json-view'
import { useModeStore } from './package'
import { useLineStore } from './package/line/store'
import { useNodeStore } from './package/node/store'

export function StateViewer() {
  const mode = useModeStore(state => state.mode)
  const nodes = useNodeStore(state => state.nodes)
  const lines = useLineStore(state => state.lines)

  return (
    <div style={{ display: 'flex', padding: 20, width: 300, overflow: 'scroll' }}>
      <ReactJson
        src={{ mode, nodes, lines }}
        indentWidth={2}
        displayDataTypes={false}
        displayObjectSize={false}
        enableClipboard={false}
      />
    </div>
  )
}
