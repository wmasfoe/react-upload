export interface UploadBaseParams {
  // 多图片上传？
  multiple: boolean
  // 上传进度
  progress: boolean
  size?: 'small' | 'large'
}