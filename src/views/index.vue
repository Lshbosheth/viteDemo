<template>
  <div id="html"></div>
</template>

<script setup lang="ts">
import * as monaco from 'monaco-editor';
import { onMounted } from 'vue'
onMounted(() => {
  monaco.editor.create(document.getElementById('html')!, {
    value: '<div>hello world</div>',
    language: 'html',
    theme: 'vs',
    fontSize: 18,
    automaticLayout: true,
  })
});
</script>
<style>
#html {
  width: 100%;
  height: 300px;
  border: 1px solid #ccc;
}
</style>
