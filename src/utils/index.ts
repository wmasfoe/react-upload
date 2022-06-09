export function imgToBase64(file: File): Promise<{file: File, base64Url: string}> {
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
  } else {
    throw new Error('不是图片')
  }
}

// 多个图片转 base64
export async function imgListToBase64List(files: FileList) {
  const base64List = []
  for(let i = 0; i < files.length; i++) {
    const { base64Url } = await imgToBase64(files[i])
    base64List.push(base64Url)
  }
  return base64List
}

export function createFormData(file: File | string | Blob) {
  const formData = new FormData()
  formData.append('file', file)

  return formData
}

// 多个文件转 formData
export function filesCreateFormData(files: FileList) {
  const formData = new FormData()
  for (let i = 0; i < files.length; i++) {
    formData.append('file', files[i])
  }
  return formData
}

export async function readImage() {

}
