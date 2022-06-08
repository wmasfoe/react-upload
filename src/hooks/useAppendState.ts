import { useState } from "react";
import { ulid } from 'ulid'

function useLastingState<T>(initState) {
  const [state, setState] = useState(initState)

  const stateMap = new Map()

  // 同步 map 和 state 中的数据
  function syncData() {
    const mapKeys = stateMap.keys()
    const mapVal = []
    let state = false
    while (!state) {
      const currentVal = mapKeys.next()
      state = currentVal.done
      if(!state) {
        const val = stateMap.get(currentVal.value)
        mapVal.push(val)
      }
    }
    setState(mapVal)
  }

  function addState(newState: T) {
    stateMap.set(ulid, newState)
    syncData()
  }

  function removeState(key: string) {
    if(stateMap.has(key)) {
      // 删除 state 中的数据
      stateMap.delete(key)
    } else {
      throw new Error('当前值不存在')
    }
    syncData()
  }
  function clearAll() {
    stateMap.clear()
    syncData()
  }

  return {
    addState,
    state,
    removeState,
    clearAll
  }
}

export default useLastingState
