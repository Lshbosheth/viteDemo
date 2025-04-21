<template>
  <div>
    <h3>订阅主题: {{ topic }}</h3>
    <button @click="disconnect">断开连接</button>
    <ul>
      <li v-for="(msg, index) in messages" :key="index">
        {{ msg }}
      </li>
    </ul>
  </div>
</template>

<script setup>
import { onMounted, onUnmounted, ref } from "vue";
import mqtt from "mqtt";
const client = ref(null);
const messages = ref([]); // 存储接收的消息


const options = {
  protocol: "ws",
  host: "lshbosheth.cn", // 替换为你的 EMQX 服务器地址
  path: "/mqtt",
  clientId: "vue3-client-" + Math.random().toString(16).substr(2, 8),
  clean: true,
  connectTimeout: 30 * 1000, // 30秒超时
  reconnectPeriod: 4000, // 4秒重连间隔
};
const topic = ref("test"); // 替换为你的主题，如 sensor/data

const connect = (topic) => {
  const url = `${options.protocol}://${options.host}:${options.port}${options.path}`;
  client.value = mqtt.connect(url, options);

  // 监听连接成功
  client.value.on("connect", () => {
    console.log("MQTT Connected ✅");
    client.value.subscribe(topic, { qos: 1 }, (err) => {
      if (!err) console.log(`Subscribed to ${topic}`);
    });
  });

  // 接收消息
  client.value.on("message", (receivedTopic, payload) => {
    if (receivedTopic === topic) {
      const message = JSON.parse(payload.toString());
      messages.value.push(message);
      console.log("Received:", message);
    }
  });

  // 错误处理
  client.value.on("error", (error) => {
    console.error("MQTT Error:", error);
  });
};

// 断开连接
const disconnect = () => {
  if (client.value?.connected) {
    client.value.end(true, () => {
      console.log("MQTT Disconnected");
    });
  }
};
// 初始化连接
onMounted(() => {
  connect(topic.value);
});
onUnmounted(disconnect);
// 发送消息示例（可选）
const sendMessage = () => {
  if (client.value?.connected) {
    const payload = JSON.stringify({ time: new Date(), data: "Hello EMQX" });
    client.value.publish(topic.value, payload, { qos: 1 });
  }
};
</script>
