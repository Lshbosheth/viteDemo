<template>
  <n-upload
    multiple
    directory-dnd
    @change="handleUploadChange"
    :max="1"
  >
    <n-upload-dragger>
      <div style="margin-bottom: 12px">
        <n-icon size="48" :depth="3">
          <archive-icon />
        </n-icon>
      </div>
      <n-text style="font-size: 16px">
        点击或者拖动文件到该区域来上传
      </n-text>
    
    </n-upload-dragger>
  </n-upload>
  <n-button @click="showAny">show content</n-button>
  <n-input
      v-model:value="dataStr"
      type="textarea"
      placeholder="基本的 Textarea"
    />
</template>
<script lang="ts" setup>
import { ref } from 'vue'
import * as XLSX from 'xlsx'
import { NButton, NUpload, NIcon, NUploadDragger, NText, NInput } from 'naive-ui'
import { ArchiveOutline as ArchiveIcon } from '@vicons/ionicons5'
import _ from 'underscore';


let dataArray:any = []
let dataStr= ref('1234')
const handleUploadChange = (file) =>{
  console.log(file)
  const files = file.file.file;
  const fileReader = new FileReader();
  fileReader.onload = (ev: any) => {
    try {
      const data = ev.target.result;
      const workbook = XLSX.read(data, {
        type: "binary"
      });
      const wsname = workbook.SheetNames[0]; //取第一张表
      let ws = XLSX.utils.sheet_to_json(workbook.Sheets[wsname]); //生成json表格内容
      console.log(ws)
      dataArray = ws

    } catch (e) {
      return false;
    }
  };
  fileReader.readAsBinaryString(files);
}
const showAny = ()=> {

  let result:any= []
  let nameList =_.uniq(_.pluck(dataArray, '发起人姓名'))
  console.log(nameList)
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
  dataStr.value = str.join('\n');
}
</script>
