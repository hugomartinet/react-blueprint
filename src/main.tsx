import React from 'react'
import ReactDOM from 'react-dom/client'
import { Controls } from './controls'
import { Blueprint } from './package/blueprint'
import { StateViewer } from './state-viewer'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <div style={{ display: 'flex', flexDirection: 'column', width: '100vw', height: '100vh' }}>
      <div style={{ display: 'flex', flex: 1, width: '100%', height: '100%', overflow: 'hidden' }}>
        <Blueprint />
        <StateViewer />
      </div>
      <Controls />
    </div>
  </React.StrictMode>,
)
