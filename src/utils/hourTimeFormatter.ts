export const hourTimeFormatter = (timestamp: number) =>
    new Date(timestamp).toLocaleTimeString('pt-BR', {
      hour: '2-digit',
      minute: '2-digit'
    });