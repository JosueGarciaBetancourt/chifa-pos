Chifa-POS

# Instalación
npm install
npx electron-rebuild

# Base de datos	
npm run init-db

# Ejecución (configurar .env y frontend/.env)

## Local
npm run dev

FRONTEND_URL: http://localhost:5173
VITE_API_URL: http://localhost:4000
API_URL: http://localhost

## LAN (Local Area Network)
npm run dev-LAN

1. Usar la IP de la PC, ejemplo:
	FRONTEND_URL: http://192.168.1.41:5173
	VITE_API_URL: http://192.168.1.41:4000
	API_URL: http://192.168.1.41

2. Usar la URL de NGROK, ejemplo:
	FRONTEND_URL: https://8d87a8670b0f.ngrok-free.app
	VITE_API_URL: https://2188de661a1c.ngrok-free.app
	API_URL: https://2188de661a1c.ngrok-free.app
	