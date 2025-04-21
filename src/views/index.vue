<template>
  <div style="display: flex;width: 100%;height: 100%;justify-content: space-between">
    <div style="width: calc(100% - 500px)">
      <div id="html" ref="html"></div>
      <div id="js"></div>
      <div id="css"></div>
    </div>
    <div class="render" ref="webContainer">

    </div>
  </div>
</template>

<script setup lang="ts">
import * as monaco from 'monaco-editor';
import { onMounted, ref, toRaw, watchEffect } from 'vue'
const htmlEditor = ref<monaco.editor.IStandaloneCodeEditor>(null as any)
const CSSEditor = ref<monaco.editor.IStandaloneCodeEditor>(null as any)
const JSEditor = ref<monaco.editor.IStandaloneCodeEditor>(null as any)
let js = ref('')
onMounted(() => {
  htmlEditor.value = monaco.editor.create(document.getElementById('html')!, {
    value: '',
    language: 'html',
    theme: 'vs',
    fontSize: 18,
    automaticLayout: true,
  })

  JSEditor.value = monaco.editor.create(document.getElementById('js')!, {
    value: "",
    language: 'javascript',
    theme: 'vs',
    fontSize: 18,
    automaticLayout: true,
  })

  CSSEditor.value = monaco.editor.create(document.getElementById('css')!, {
    value: "",
    language: 'CSS',
    theme: 'vs',
    fontSize: 18,
    automaticLayout: true,
  })

  toRaw(htmlEditor.value).onDidChangeModelContent(() => {
    $html.value.innerHTML = toRaw(htmlEditor.value).getValue()
  })

  toRaw(CSSEditor.value).onDidChangeModelContent(() => {
    $style.value.innerHTML = toRaw(CSSEditor.value).getValue()
  })

  toRaw(JSEditor.value).onDidChangeModelContent(() => {
    $script.value.innerHTML = toRaw(JSEditor.value).getValue()
    js.value = toRaw(JSEditor.value).getValue()
  })
});

const webContainer = ref<any>(null)
const html = ref<any>(null)
const $iframe = ref(document.createElement('iframe'))
const $style = ref(document.createElement('style'))
const $html = ref(document.createElement('div'))
const $script = ref(document.createElement('script'))
const $baseStyle = ref(document.createElement('style'))
$baseStyle.value.textContent = '*{margin:0;padding:0;}'

watchEffect(() => {
  if (webContainer.value && webContainer.value.children.length === 0) {
    webContainer.value.appendChild($iframe.value)
  }
})

watchEffect(() => {
  if($script.value) {
    $script.value.remove()
    $script.value = document.createElement('script')
    $script.value.textContent = js.value
  }

  const tem = document.createElement('iframe')
  tem.addEventListener('load', () => {
    const debugPlugin = document.createElement('script')
    debugPlugin.src = '//cdn.jsdelivr.net/npm/eruda'
    const debugExec = document.createElement('script')
    debugExec.textContent = `window.eruda.init({
      defaults: {
        displaySize: 25,
        transparency: 0.9,
      }
    })
    eruda.show()
    `
    tem.contentDocument?.head.append($baseStyle.value, $style.value)
    tem.contentDocument?.body.append(debugPlugin)
    debugPlugin.onload = function () {
      tem.contentDocument?.body.append(
          debugExec,
          $html.value,
          $script.value
      )
    }
    $iframe.value.remove()
    $iframe.value = tem
  })
  webContainer.value?.appendChild(tem)
  return



})
</script>
<style>
#html {
  width: 100%;
  height: 300px;
  border: 1px solid #ccc;
}

#js {
  width: 100%;
  height: 300px;
  border: 1px solid #ccc;
}

#css {
  width: 100%;
  height: 300px;
  border: 1px solid #ccc;
}

.render {
  width: 490px;
  border: 1px solid #cccccc;
}

iframe {
  width: 100%;
  height: 100%;
  background-color: #fff;
  border: none;
}
</style>
