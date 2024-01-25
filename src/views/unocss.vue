<template>
  <div class="relative">
    <div class="absolute left-30 color-red  ml-10px text-30px select-none">
      fff
    </div>
    <div class="nova">
      lshbosheth
    </div>
  </div>
</template>
<script setup lang="ts">
import { onMounted } from 'vue'
import { fetchEventSource } from '@microsoft/fetch-event-source';

onMounted(() => {
  // const eventSource = new EventSource('http://localhost:1222/api/utils/sse');
  // eventSource.onmessage = ({ data }) => {
  //   console.log(data);
  // }
  //
  // setTimeout(() => {
  //   eventSource.close()
  // }, 100000)

  const ctrl = new AbortController();
  fetchEventSource('http://localhost:1222/api/utils/sse', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      foo: 'bar'
    }),
    signal: ctrl.signal,
    onmessage(ev) {
      console.log(ev);
    },
    onerror(err) {
      throw err;
    }
  });
})
</script>
<style scoped>
@font-face {
  font-family: 'nova';
  src: url('http://oss.lshbosheth.cn/杂类/Nova-Hearts.otf');
}
.nova {
  font-family: nova;
  font-size: 30px;
  letter-spacing: 3px;
  line-height: 1;
  background-image: linear-gradient(to top, #fbc2eb 0%, #a6c1ee 100%);
  background-clip: text;
  -webkit-text-fill-color: transparent; /* 文本颜色变为透明，显示背景渐变 */
  text-fill-color: transparent;
  text-indent: 5px;
}
</style>
