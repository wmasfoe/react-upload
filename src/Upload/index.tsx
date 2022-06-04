import {useMemo} from 'react'
import FileUpload from "./jsUpload";
import InputUpload from "./inputUpload";

// 对旧版浏览器进行 hack
const Upload = () => {

  // const isHack = useMemo(() => window.showOpenFilePicker && window.showDirectoryPicker, [])

  const isHack = false

  return <>
    {
      isHack ?
      <FileUpload/>:
      <InputUpload progress={true} multiple={true} />
    }
  </>;
}

export default Upload
