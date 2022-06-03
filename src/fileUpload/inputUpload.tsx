import {useRef, memo, useState} from 'react'
import type { UploadBaseParams } from "./types";
import styles from './styles.module.scss'
import Progress from "../Progress";

interface UploadProps extends UploadBaseParams{
  fileType?: 'img' | 'jpg' | 'png' | 'jpeg' | 'webp'
}

const InputUpload = (props: UploadProps) => {
  const { multiple, progress, fileType = 'jpg' } = props

  const inputFileRef = useRef<HTMLInputElement | null>(null)
  const [url, setUrl] = useState<string | null>(null)

  function readImage(files: FileList) {
    const file = files[0]

    if(file.type.indexOf("image") == 0){
      // 读取图片实例
      const reader = new FileReader();
      // 将图片转换为base64码
      reader.readAsDataURL(file);
      reader.onload = function(e){
        setUrl(e.target.result as string)
      }
    }
  }

  function onChange (event: InputEvent) {
    const fileList = inputFileRef.current?.files
    if(fileList instanceof FileList) {
      readImage(fileList)
    }
  }

  function onUpload() {

  }

  return <div className={styles.wrapper}>
    <div className={styles.menu}>
      <label htmlFor="file-upload" className={styles.select}>
        点此选择图片
      </label>
      <input style={{display: 'none'}} id='file-upload' ref={inputFileRef} onChange={onChange} type="file"/>
      <button onClick={onUpload} className={styles.upload}>upload</button>
    </div>
    <div>
      <Progress scale={0.4} />
    </div>
    {
      url &&<img src={url} alt="" className={styles.img}/>
    }
  </div>
}

export default memo(InputUpload)
