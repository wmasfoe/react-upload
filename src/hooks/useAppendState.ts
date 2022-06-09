import { useState } from "react";

function useLastingState<T = {}>(initState?: T[]) {
  const [state, setState] = useState(initState)
  function appendState(newState: T) {
    setState(prev => [
      ...prev,
        newState
    ])
  }
  function clearAll() {
    setState([])
  }

  return {
    addState: appendState,
    state,
    clearAll
  }
}

export default useLastingState
