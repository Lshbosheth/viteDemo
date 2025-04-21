import * as mqtt from "mqtt/dist/mqtt.min";

export function useMqtt() {
    const client = ref(null);
    const messages = ref([]); // 存储接收的消息

    // 连接配置（根据你的 EMQX 信息修改）
    const options = {
        protocol: "ws",
        host: "lshbosheth.cn", // 替换为你的 EMQX 服务器地址
        port: 8083, // WebSocket 端口（非 SSL 默认 8083，SSL 为 8084）
        path: "/mqtt",
        clientId: "vue3-client-" + Math.random().toString(16).substr(2, 8),
        clean: true,
        connectTimeout: 30 * 1000, // 30秒超时
        reconnectPeriod: 4000, // 4秒重连间隔
        // 若 EMQX 开启认证
        username: "USER001",
        password: "USER001",
    };

    // 建立连接
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

    // 组件卸载时自动断开
    onUnmounted(disconnect);

    return { client, messages, connect, disconnect };
}
