import React, { memo } from 'react'
import type { UploadBaseParams } from "./types";

interface UploadProps extends UploadBaseParams{
  fileType?: 'img' | 'jpg' | 'png' | 'jpeg' | 'webp'
}

const DragUpload = (props: UploadProps) => {

  const { multiple, progress, fileType = 'jpg' } = props

  return <></>;
}

export default memo(DragUpload)
