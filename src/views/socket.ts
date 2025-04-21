// import { reactive } from "vue";
// import { io } from "socket.io-client";
//
// export const state = reactive
//     <{
//         connected: boolean,
//         fooEvents: Array<any>,
//         barEvents: Array<any>
//     }>
//     ({
//         connected: false,
//         fooEvents: [],
//         barEvents: []
//     });
//
//
// const URL = "wss://api.lshbosheth.cn"
//
// export const socket = io(URL,{
//     transports: ['websocket']
// });
//
// socket.on("connect", () => {
//     state.connected = true;
// });
//
// socket.on("disconnect", () => {
//     state.connected = false;
// });
//
// socket.on("foo", (...args) => {
//     state.fooEvents.push(args);
// });
//
// socket.on("bar", (...args) => {
//     state.barEvents.push(args);
// });
