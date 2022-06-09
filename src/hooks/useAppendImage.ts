import useAppendState from "./useAppendState";

function useAppendImage<T = {}>(initState?: T[]) {
  const {
    addState: _add,
    state,
    clearAll
  } = useAppendState<File>(initState)

  function addState(file: FileList | File) {
    if(file === null || file === undefined) return
    if(file instanceof File) {
      _add(file)
    } else {
      for (let i = 0; i < file.length; i++) {
        _add(file[i])
      }
    }
  }

  return {
    addState,
    state,
    clearAll
  }
}

export default useAppendImage
