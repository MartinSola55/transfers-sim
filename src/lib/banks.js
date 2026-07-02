// Catálogo de entidades bancarias por código (primeros 3 dígitos del CBU).
// Fuente: nómina de entidades financieras del BCRA (subconjunto de las más usadas).
export const BANK_ENTITIES = {
	'007': 'Banco de Galicia',
	'011': 'Banco de la Nación Argentina',
	'014': 'Banco de la Provincia de Buenos Aires',
	'015': 'ICBC',
	'016': 'Citibank',
	'017': 'BBVA Argentina',
	'020': 'Banco de la Ciudad de Buenos Aires',
	'027': 'Banco Supervielle',
	'029': 'Banco de La Pampa',
	'034': 'Banco Patagonia',
	'044': 'Banco Hipotecario',
	'045': 'Banco de San Juan',
	'065': 'Banco Municipal de Rosario',
	'072': 'Banco Santander Argentina',
	'083': 'Banco del Chubut',
	'086': 'Banco de Santa Cruz',
	'093': 'Banco de Tierra del Fuego',
	'094': 'Banco de Corrientes',
	'097': 'Banco del Neuquén',
	'143': 'Brubank',
	'150': 'HSBC Bank Argentina',
	'165': 'JPMorgan Chase',
	'191': 'Banco Credicoop',
	'198': 'Banco de Servicios y Transacciones',
	'247': 'Banco Roela',
	'254': 'Banco Mariva',
	'259': 'Banco Itaú Argentina',
	'266': 'BNP Paribas',
	'269': 'Banco de la República Oriental del Uruguay',
	'277': 'Banco Sáenz',
	'281': 'Banco Meridian',
	'285': 'Banco Macro',
	'299': 'Banco Comafi',
	'300': 'Banco de Inversión y Comercio Exterior',
	'301': 'Banco Piano',
	'305': 'Banco Julio',
	'309': 'Nuevo Banco de La Rioja',
	'310': 'Banco del Sol',
	'311': 'Nuevo Banco del Chaco',
	'312': 'Banco Voii',
	'321': 'Banco de Santiago del Estero',
	'322': 'Banco Industrial (BIND)',
	'330': 'Nuevo Banco de Santa Fe',
	'331': 'Banco Cetelem',
	'332': 'Banco de Servicios Financieros',
	'336': 'Banco Bradesco',
	'338': 'Banco de Servicios y Transacciones',
	'384': 'Wilobank',
	'386': 'Nuevo Banco de Entre Ríos',
	'389': 'Banco Columbia',
	'426': 'Banco Bica',
	'431': 'Banco Coinag',
	'432': 'Banco de Comercio',
};

// Proveedores de servicios de pago (CVU): entidad 000, se identifican por los
// primeros 7 dígitos del CBU/CVU.
export const CVU_PROVIDERS = {
	'0000003': 'Mercado Pago',
	'0000007': 'Prex',
	'0000058': 'Ualá',
	'0000059': 'Personal Pay',
	'0000168': 'Naranja X',
	'0000171': 'Belo',
	'0000174': 'Lemon Cash',
	'0000199': 'Cuenta DNI',
	'0000221': 'Astropay',
};

export const identifyEntity = (digits) => {
	if (typeof digits !== 'string' || digits.length < 7) return null;

	const entityCode = digits.slice(0, 3);

	// Cuenta virtual (CVU)
	if (entityCode === '000') {
		const providerKey = digits.slice(0, 7);
		return {
			type: 'cvu',
			code: entityCode,
			name: CVU_PROVIDERS[providerKey] ?? 'Cuenta virtual (CVU)',
		};
	}

	return {
		type: 'cbu',
		code: entityCode,
		name: BANK_ENTITIES[entityCode] ?? 'Entidad bancaria',
	};
};
