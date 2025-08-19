// Configuração das suas imagens locais
// Para adicionar novas imagens, coloque-as na pasta client/public/ e adicione a referência aqui

export const LOCAL_IMAGES = {
  // Suas imagens anexadas
  screenshot: "/Captura de ecrã 2025-07-09 192546_1752085562521.png",
  image1: "/image_1753222585470.png",
} as const;

// Função para obter uma imagem local
export const getLocalImage = (key: keyof typeof LOCAL_IMAGES) => {
  return LOCAL_IMAGES[key];
};

// Lista de todas as imagens locais disponíveis
export const getAllLocalImages = () => {
  return Object.entries(LOCAL_IMAGES).map(([key, src]) => ({
    key,
    src,
    name: key
  }));
};