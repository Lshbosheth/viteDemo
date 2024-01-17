<script setup lang="ts">
import { onBeforeMount, onMounted, onUnmounted, reactive } from 'vue';
import { socket } from './socket'
const chatList = reactive<{
  value: string
  list: Array<any>
}>({
  value: '',
  list: []
})



// 组件挂载前让socket连接起来
onBeforeMount(() => {
  socket.connect();
});

// 组件挂载完毕完成后，监听onMessage事件
onMounted(() => {
  socket.on("test", (e) => {
    console.log(e);
    chatList.list.push(e.content);
  });
});

// 组件销毁时断开连接
onUnmounted(() => {
  socket.disconnect();
});

// 点击btn发送socket消息
const handleClick = () => {
  socket.emit("test", chatList.value, (e: any) => {
    console.log(e);
  });
};


</script>

<template>
  <div>
    <input v-model="chatList.value" />
    <button @click="handleClick()" style="margin-left: 12px;">发送</button>

    <div >
      <ul>
        <li v-for="(item, index) in chatList.list" :key="index">{{ item }}</li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

}

</style>
