// Configuración visual de cada banco de origen. El banco elegido define el
// estilo del comprobante que se replica.
export const ORIGIN_BANKS = {
	mercadopago: {
		id: 'mercadopago',
		name: 'Mercado Pago',
		shortName: 'Mercado Pago',
		accountLabel: 'Dinero disponible',
		// Violeta característico de la UI actual de Mercado Pago.
		primary: '#4f3ff0',
		primaryText: '#ffffff',
		brandBg: '#e9e6fd',
		brandFg: '#4f3ff0',
	},
	galicia: {
		id: 'galicia',
		name: 'Banco Galicia',
		shortName: 'Galicia',
		accountLabel: 'Caja de ahorro',
		// Azul marino de Galicia + naranja de marca.
		primary: '#0a2d6e',
		primaryText: '#ffffff',
		brandBg: '#ff6a13',
		brandFg: '#ffffff',
	},
};

export const ORIGIN_BANK_LIST = Object.values(ORIGIN_BANKS);
