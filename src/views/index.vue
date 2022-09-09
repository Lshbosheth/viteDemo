<template>
  <el-upload
    v-model:file-list="fileList"
    class="upload-demo"
    :on-preview="handlePreview"
    :on-remove="handleRemove"
    :before-remove="beforeRemove"
    :on-change="readExcel"
    :auto-upload="false"
    :limit="1"
  >
    <el-button type="primary">Click to upload</el-button>
    
  </el-upload>
  <el-button type="primary" @click="showAny">show Data</el-button>
  <el-input
    v-model="dataStr"
    :rows="10"
    type="textarea"
    placeholder="Please input"
  />
</template>
<script lang="ts" setup>
import { reactive, ref } from 'vue'
import * as XLSX from 'xlsx'
import { ElMessage, ElMessageBox } from 'element-plus'
import _ from 'underscore';
import type { UploadProps, UploadUserFile } from 'element-plus'

const fileList = ref<UploadUserFile[]>([])
let dataArray:any = []
let dataStr= ref('1234')
const handleRemove: UploadProps['onRemove'] = (file, uploadFiles) => {
  console.log(file, uploadFiles)
}

const handlePreview: UploadProps['onPreview'] = (uploadFile) => {
  console.log(uploadFile)
}
const readExcel: UploadProps['onChange'] = (uploadFile) => {
  const files = uploadFile.raw;
  const fileReader = new FileReader();
  fileReader.onload = ev => {
    try {
      const data = ev.target.result;
      const workbook = XLSX.read(data, {
        type: "binary"
      });
      const wsname = workbook.SheetNames[0]; //取第一张表
      let ws = XLSX.utils.sheet_to_json(workbook.Sheets[wsname]); //生成json表格内容
      dataArray = ws

    } catch (e) {
      return false;
    }
  };
  fileReader.readAsBinaryString(files);
}

const beforeRemove: UploadProps['beforeRemove'] = (uploadFile, uploadFiles) => {
  return ElMessageBox.confirm(
    `Cancel the transfert of ${uploadFile.name} ?`
  ).then(
    () => true,
    () => false
  )
}

const showAny = ()=> {

  let result:any= []
  let nameList =_.uniq(_.pluck(dataArray, '发起人姓名'))

  nameList.forEach(name => {
    result.push({
      '姓名': name,
      data: []
    })
  })
  

  dataArray.forEach(element => {
    let cel = result.find(el => {
      return el['姓名'] == element['发起人姓名']
    })

    cel.data.push(element['开始时间'].substr(5,6) + '加班' + element['加班时长'] + '小时')
  });

  let str:Array<string> = []
  result.forEach(el => str.push((el['姓名'] + el.data.join(',')).replaceAll('0', '')))
  console.log(str)
  dataStr.value = str[0]
  // console.log(result.join(','))
  // dataStr = result.join(',')
  console.log(dataStr)
}
</script>
