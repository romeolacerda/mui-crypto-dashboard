export const monthTimeFormatter = (timestamp: number) =>
    new Date(timestamp).toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: '2-digit'
    });