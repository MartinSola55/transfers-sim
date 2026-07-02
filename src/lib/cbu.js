import { identifyEntity } from '@/lib/banks';

// Algoritmo oficial de dígito verificador del BCRA para CBU/CVU.
const BLOCK1_WEIGHTS = [7, 1, 3, 9, 7, 1, 3];
const BLOCK2_WEIGHTS = [3, 9, 7, 1, 3, 9, 7, 1, 3, 9, 7, 1, 3];

const checkDigit = (block, weights) => {
	const sum = weights.reduce((acc, weight, index) => acc + Number(block[index]) * weight, 0);
	return (10 - (sum % 10)) % 10;
};

const isValidBlock = (block, weights) => {
	const expected = checkDigit(block, weights);
	const actual = Number(block[block.length - 1]);
	return expected === actual;
};

// Reglas de formato para alias CBU (BCRA): 6 a 20 caracteres,
// letras/números, admite punto y guion como separadores internos.
const ALIAS_REGEX = /^[a-zA-Z0-9](?:[a-zA-Z0-9]|[.-](?![.-])){4,18}[a-zA-Z0-9]$/;

// Palabras clave para inferir la entidad destino cuando se ingresa un alias.
const ALIAS_ENTITY_HINTS = [
	{ keywords: ['galicia'], name: 'Banco de Galicia' },
	{ keywords: ['macro'], name: 'Banco Macro' },
	{ keywords: ['santander'], name: 'Banco Santander Argentina' },
	{ keywords: ['bbva', 'frances'], name: 'BBVA Argentina' },
	{ keywords: ['nacion', 'bna'], name: 'Banco de la Nación Argentina' },
	{ keywords: ['provincia', 'bapro'], name: 'Banco de la Provincia de Buenos Aires' },
	{ keywords: ['ciudad'], name: 'Banco de la Ciudad de Buenos Aires' },
	{ keywords: ['patagonia'], name: 'Banco Patagonia' },
	{ keywords: ['credicoop'], name: 'Banco Credicoop' },
	{ keywords: ['icbc'], name: 'ICBC' },
	{ keywords: ['supervielle'], name: 'Banco Supervielle' },
	{ keywords: ['hsbc'], name: 'HSBC Bank Argentina' },
	{ keywords: ['itau'], name: 'Banco Itaú Argentina' },
	{ keywords: ['comafi'], name: 'Banco Comafi' },
	{ keywords: ['brubank'], name: 'Brubank' },
	{ keywords: ['mercadopago', 'mercado.pago', 'mp.', '.mp', 'mpago'], name: 'Mercado Pago' },
	{ keywords: ['uala'], name: 'Ualá' },
	{ keywords: ['naranja'], name: 'Naranja X' },
	{ keywords: ['personalpay', 'personal.pay'], name: 'Personal Pay' },
	{ keywords: ['cuentadni', 'cuenta.dni'], name: 'Cuenta DNI' },
	{ keywords: ['prex'], name: 'Prex' },
	{ keywords: ['belo'], name: 'Belo' },
	{ keywords: ['lemon'], name: 'Lemon Cash' },
];

const cleanDigits = (value) => (value ?? '').replace(/\D/g, '');

export const looksLikeCbu = (value) => cleanDigits(value).length >= 6 && !/[a-zA-Z]/.test((value ?? '').replace(/[\s.-]/g, ''));

// Valida un CBU/CVU de 22 dígitos con ambos dígitos verificadores.
export const validateCbu = (value) => {
	const digits = cleanDigits(value);

	if (digits.length === 0) return { valid: false, error: 'Ingresá un CBU, CVU o alias.' };
	if (digits.length !== 22) return { valid: false, error: 'El CBU/CVU debe tener 22 dígitos.' };

	const block1 = digits.slice(0, 8);
	const block2 = digits.slice(8, 22);

	if (!isValidBlock(block1, BLOCK1_WEIGHTS) || !isValidBlock(block2, BLOCK2_WEIGHTS))
		return { valid: false, error: 'El CBU/CVU no es válido (dígito verificador incorrecto).' };

	const entity = identifyEntity(digits);

	return {
		valid: true,
		kind: entity.type, // 'cbu' | 'cvu'
		value: digits,
		bankName: entity.name,
		bankCode: entity.code,
	};
};

const inferBankFromAlias = (alias) => {
	const normalized = alias.toLowerCase();
	const match = ALIAS_ENTITY_HINTS.find((hint) => hint.keywords.some((keyword) => normalized.includes(keyword)));
	return match?.name ?? null;
};

// Valida un alias CBU por formato e intenta inferir la entidad.
export const validateAlias = (value) => {
	const alias = (value ?? '').trim();

	if (alias.length === 0) return { valid: false, error: 'Ingresá un CBU, CVU o alias.' };
	if (alias.length < 6 || alias.length > 20) return { valid: false, error: 'El alias debe tener entre 6 y 20 caracteres.' };
	if (!ALIAS_REGEX.test(alias)) return { valid: false, error: 'El alias solo admite letras, números, punto y guion.' };

	return {
		valid: true,
		kind: 'alias',
		value: alias,
		bankName: inferBankFromAlias(alias),
		bankCode: null,
	};
};

// Resuelve automáticamente si el destino es un CBU/CVU o un alias.
export const validateDestination = (value) => {
	const raw = (value ?? '').trim();
	if (raw.length === 0) return { valid: false, error: 'Ingresá un CBU, CVU o alias.' };
	return looksLikeCbu(raw) ? validateCbu(raw) : validateAlias(raw);
};
