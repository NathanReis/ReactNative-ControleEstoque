import axios, { AxiosError } from 'axios';

interface IFormattedResponseError {
  title: string;
  message: string;
}

export default class ResponseHelper {
  static formatError(error: unknown): IFormattedResponseError {
    if (axios.isAxiosError(error)) {
      return this.formatAxiosError(error);
    }

    return {
      title: 'Erro',
      message: 'Erro inesperado!!!'
    };
  }

  static formatAxiosError(error: AxiosError<unknown, any>): IFormattedResponseError {
    try {
      let errors = error.response?.data as string[];
      let message: string;

      if (error.response?.status === 400) {
        message = `- ${errors.join(';\n- ')}.`;
      } else {
        message = `- ${errors[0]}.`;
      }

      return {
        title: 'Oops!',
        message
      };
    } catch {
      return {
        title: 'Erro',
        message: 'Erro inesperado!!!'
      };
    }
  }
}
