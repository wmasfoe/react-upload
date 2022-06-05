import {useRef, memo, useState} from 'react'
import type { UploadBaseParams } from "./types";
import styles from './styles.module.scss'
import Progress from "../Progress";
import axios from 'axios'

interface UploadProps extends UploadBaseParams{
  fileType?: 'img' | 'jpg' | 'png' | 'jpeg' | 'webp'
}

// TODO 支持 进度条、多选、限制文件类型
const InputUpload = (props: UploadProps) => {
  const { multiple, progress, fileType = 'jpg' } = props


  const [selectedFile, setSelectedFile] = useState<FileList | null>(null)
  const inputFileRef = useRef<HTMLInputElement | null>(null)
  const [url, setUrl] = useState<string | null>(null)
  const [scale, setScale] = useState(0)

  // 读取图片生成 file 对象 和 base64url
  async function readImage(files?: FileList): Promise<{
    file: File,
    base64Url: string | undefined
  }> {

    const computedFiles = selectedFile || files
    if(computedFiles instanceof FileList) {
      const file = computedFiles[0]
      if(file.type.indexOf("image") == 0){
        // 读取图片实例
        return new Promise((resolve => {
          const reader = new FileReader();
          // 将图片转换为base64码 TODO 可以考虑 createObjectURL
          reader.readAsDataURL(file);
          reader.onload = function(e){
            // 返回 file 的 blob 和 base64
            resolve({
              file,
              base64Url: e.target.result
            })
          }
        }))
      }
    }
  }

  // 不借助 form 表单，生成 form data
  function createFormData(file: File) {
    const formData = new FormData()
    formData.append('file', file)
    return formData
  }

  async function onChange (event: InputEvent) {
    const fileList = inputFileRef.current?.files
    setSelectedFile(fileList as FileList | null)
    if(fileList instanceof FileList) {
      const {
        base64Url
      } = await readImage(fileList)
      if(typeof base64Url === 'string') {
        setUrl(base64Url)
      }
    }
  }

  async function onUpload() {
    const {file} = await readImage()
    const formData = createFormData(file)
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
    {
      url &&<img src={url} alt="" className={styles.img}/>
    }
  </div>
}

export default memo(InputUpload)
