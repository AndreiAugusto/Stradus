const API_BASE_URL = 'https://caminhao-api.vercel.app/';
import { api } from './api';

export const dashboardService = {
  async getCaminhoeCount() {
    try {
      const response = await api.get(`/dashboard/caminhao/count`);
        console.log(response.data);
      if (response.status !== 200) throw new Error('Erro ao buscar caminhões');
      return response.data;
    } catch (error) {
      console.error('Erro:', error);
      return 0;
    }
  },

  async getOficinaCount() {
    try {
      const response = await api.get(`/dashboard/oficina/count`);
      if (response.status !== 200) throw new Error('Erro ao buscar oficinas');
      return response.data;
    } catch (error) {
      console.error('Erro:', error);
      return 0;
    }
  },

  async getManutencaoCount() {
    try {
      const response = await api.get(`/dashboard/manutencao/count`);
      if (response.status !== 200) throw new Error('Erro ao buscar manutenções');
      return response.data;
    } catch (error) {
      console.error('Erro:', error);
      return 0;
    }
  },

  async getCaminhaoById(id: string) {
    try {
      const response = await api.get(`/dashboard/caminhao/countOne/${id}`);
      if (response.status !== 200) throw new Error('Erro ao buscar caminhão');
      return response.data;
    } catch (error) {
      console.error('Erro:', error);
      return null;
    }
  },

  async getOficinaById(id: string) {
    try {
      const response = await api.get(`/dashboard/oficina/countOne/${id}`);
      if (response.status !== 200) throw new Error('Erro ao buscar oficina');
      return response.data;
    } catch (error) {
      console.error('Erro:', error);
      return null;
    }
  },
};
