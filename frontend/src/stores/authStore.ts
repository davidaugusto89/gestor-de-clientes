import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: JSON.parse(localStorage.getItem('user') || 'null') as { id: number; nome: string; role: string } | null,
    token: localStorage.getItem('token') || '',
  }),
  actions: {
    login(user: { id: number; nome: string; role: string }, token: string) {
      this.user = user;
      this.token = token;

      // Salva user e token no localStorage
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('token', token);
    },

    logout() {
      this.user = null;
      this.token = '';

      // Remove user e token do localStorage
      localStorage.removeItem('user');
      localStorage.removeItem('token');
    },

    checkAuth() {
      const token = localStorage.getItem('token');
      if (token) {
        return true;
      }
      return false;
    },
  },
});
