This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

# mensaje de wsp

const sendWsp = async (mensaje : string) => {
      // Número de WhatsApp al que se enviará el mensaje
      //const numeroWhatsApp = '+5493517641942';
      
      const numeroWhatsApp = `5493517641942` ;
      // Construir el enlace de WhatsApp
      const enlaceWhatsApp = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(mensaje)}`;

      // Redirigir al usuario a WhatsApp
      // eslint-disable-next-line react-hooks/immutability
      window.open(enlaceWhatsApp, "_blank");
  };