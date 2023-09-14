import api from 'service/api/'
import { defineStore } from 'pinia';

export const useUser = defineStore('User', {
    state: () => ({}),
    getters: {},
    actions: {
        async getUserDetail(payload) {
            return api
              .get(`/user/${payload.Id}`, {
                params: payload.params,
              })
              .then((res) => {
                return res.data;
              })
              .catch((err) => {
                return Promise.reject(err);
              });
          }

    }
})