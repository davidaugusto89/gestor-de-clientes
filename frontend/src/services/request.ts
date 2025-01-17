import api from './axios';
import Swal from 'sweetalert2';

const request = {
  get: async (url: string, params?: object) => {
    return api.get(url, { params });
  },
  post: async (url: string, data?: object) => {
    try {
      const response = await api.post(url, data);

      // Verifica o status da resposta
      await checkStatus(response.status, response?.data?.message || '');

      return response;
    } catch (error: any) {
      // Trata o erro de requisição, como falha de rede ou erro de resposta
      handleRequestError(error);
      throw error; // Repropaga o erro para o `handleLogin` lidar
    }
  },
  put: async (url: string, data?: object) => {
    return api.put(url, data);
  },
  patch: async (url: string, data?: object) => {
    return api.patch(url, data);
  },
  delete: async (url: string) => {
    return api.delete(url);
  },
};

const checkStatus = async (statusCode: number, message?: string) => {
  if (statusCode === 401 && message) {
    alertError(message); // Mostra o alerta
    throw new Error(message); // Lança um erro para interromper o fluxo
  }
};

const alertError = (message: string) => {
  Swal.fire({
    icon: 'error',
    title: 'Oops...',
    text: message,
  });
};

const handleRequestError = (error: any) => {
  if (error.response) {
    // Erros de resposta do servidor
    alertError(error.response.data.message || 'Erro inesperado no servidor.');
  } else if (error.request) {
    // Sem resposta do servidor
    alertError('Erro de conexão. Verifique sua internet.');
  } else {
    // Outros erros
    alertError(error.message || 'Ocorreu um erro.');
  }
};

export default request;
