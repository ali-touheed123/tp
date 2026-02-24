  const defaultMessage = 'Hi! I am interested in your paint products. Can you help me?';
  const text = encodeURIComponent(message ?? defaultMessage);

  const url = Platform.OS === 'web'
    ? `https://wa.me/${WHATSAPP_NUMBER}?text=${text}`
    : `whatsapp://send?phone=${WHATSAPP_NUMBER}&text=${text}`;

  Linking.openURL(url).catch(() => {
    Linking.openURL(`https://wa.me/${WHATSAPP_NUMBER}?text=${text}`);
  });
};

export const openWhatsAppForProduct = (productName: string, brandName: string) => {
  const message = `Hi! I'm interested in "${productName}" by ${brandName}. Could you share more details and availability?`;
  openWhatsApp(message);
};