import { useCallback } from 'react'
import { useNodeStore } from '../node/store'
import { useSnapStore } from './store'

export function useInitSnaps() {
  const initSnaps = useSnapStore(state => state.initSnaps)

  const nodes = useNodeStore(state => state.nodes)

  return useCallback(() => {
    initSnaps(nodes)
  }, [initSnaps, nodes])
}
