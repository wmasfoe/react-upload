import { useRef, LegacyRef, memo } from "react";

// 使用 js 的能力实现文件上传
const FileUpload = () => {
  const fileBlock = useRef<HTMLElement | null>(null);

  async function onClick() {
    // @ts-ignore
    const files = await window.showOpenFilePicker({
      // 支持文件多选
      multiple: true,
      // 支持的文件类型
      types: [
        {
          description: "图片类型",
          accept: {
            "image/*": [".png", ".jpg", ".jpeg", ".zip"],
          },
        },
      ],
    });

    for (const fileHandle of files) {
      // 获取文件内容
      const fileData = await fileHandle.getFile();
      console.log(fileData);
      // 读文件数据
      const buffer = await fileData.arrayBuffer();
      console.log(buffer);
      console.log(new Blob([buffer]));
      // 转成Blod url地址
      let src = URL.createObjectURL(new Blob([buffer]));
      if (fileBlock !== null) {
        // 在页面中显示
        (fileBlock.current as HTMLDivElement).insertAdjacentHTML("beforeend", `<img src="${src}">`);
      }
    }
  }

  function onDirClick() {
    // @ts-ignore
    window.showDirectoryPicker();
  }
  return (
    <>
      <button onClick={onClick}>上传文件</button>
      <br />
      <button onClick={onDirClick}>上传文件夹</button>

      <p>所选文件：</p>
      <div ref={fileBlock as LegacyRef<HTMLDivElement>}/>
    </>
  );
};

export default memo(FileUpload);
