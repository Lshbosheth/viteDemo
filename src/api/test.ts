import request from "../utils/request";
export const getIdCard = (data: object) => request({
    url: '/utils/createIdCard/1',
    method: 'GET',
    params: data
});

export const upload = (data: object) => request({
    url: '/upload',
    method: 'POST',
    data
});
