import React, {useRef, memo, useState} from 'react'
import type { UploadBaseParams } from "./types";
import styles from './styles.module.scss'
import Progress from "../Progress";
import axios from 'axios'
import { imgListToBase64List, filesCreateFormData } from '../utils'
import useAppendImage from "../hooks/useAppendImage";

interface UploadProps extends UploadBaseParams{
  fileType?: 'img' | 'jpg' | 'png' | 'jpeg' | 'webp'
}

// TODO 支持 进度条、多选、限制文件类型
const InputUpload = (props: UploadProps) => {
  const { multiple, progress, fileType = 'jpg' } = props

  const [selectedFile, setSelectedFile] = useState<FileList | null>(null)
  const inputFileRef = useRef<HTMLInputElement | null>(null)
  const [url, setUrl] = useState<string | null>(null)
  const [imgUrlList, setImgUrlList] = useState<string[] | null>(null)
  const [scale, setScale] = useState(0)
  const {
    addState: addImg,
    state: selectedImg,
  } = useAppendImage([])

  // 读取图片生成 file 对象 和 base64url
  async function readImage(files?: FileList): Promise<{
    base64Url: string[]
  }> {

    const computedFiles = selectedFile || files
    if(computedFiles instanceof FileList) {
      // const file = computedFiles[0]
      const base64List = await imgListToBase64List(computedFiles)

      return {
        base64Url: base64List
      }
    }
  }

  async function onChange (event: InputEvent) {
    const fileList = inputFileRef.current?.files
    setSelectedFile(fileList as FileList | null)
    if(inputFileRef.current?.files === null || inputFileRef.current?.files === undefined) return
    addImg(inputFileRef.current?.files as FileList)
    if(fileList instanceof FileList) {
      // 读图片
      const {
        base64Url
      } = await readImage(fileList)
      setImgUrlList(base64Url)
    }
  }

  async function onUpload() {
    if(selectedFile === null) return
    const formData = filesCreateFormData(selectedFile)
    const uploadRes = await axios.post('http://localhost:4000/upload', formData, {
      onUploadProgress: (progressEvent) => {
        if(progressEvent.lengthComputable){
          // 计算上传进度
          const complete = progressEvent.loaded / progressEvent.total;
          setScale(complete)
          if(complete >=1){
            setScale(1)
          }
        }
      }
    })
    // TODO result
    console.log(uploadRes)
  }

  return <div className={styles.wrapper}>
    <div className={styles.menu}>
      <label htmlFor="file-upload" className={styles.select}>
        点此选择图片
      </label>
      <input style={{display: 'none'}} id='file-upload' multiple={multiple} ref={inputFileRef} onChange={onChange} type="file"/>
      <button onClick={onUpload} className={styles.upload}>upload</button>
    </div>
    <div>
      {
        progress && <Progress scale={scale} />
      }
    </div>
    <div>
      {
        imgUrlList?.map(value => (
          <img src={value} alt="" className={styles.img} />
        ))
      }
    </div>
    {
      url &&<img src={url} alt="" className={styles.img}/>
    }
  </div>
}

export default memo(InputUpload)
