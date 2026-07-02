const AR_MONEY = new Intl.NumberFormat('es-AR', {
	minimumFractionDigits: 0,
	maximumFractionDigits: 2,
});

const AR_MONEY_DECIMALS = new Intl.NumberFormat('es-AR', {
	minimumFractionDigits: 2,
	maximumFractionDigits: 2,
});

// "$ 1.234,56" — usa decimales solo cuando el monto los tiene.
export const formatMoney = (amount, { withSymbol = true, forceDecimals = false } = {}) => {
	const number = Number(amount) || 0;
	const hasDecimals = forceDecimals || number % 1 !== 0;
	const formatter = hasDecimals ? AR_MONEY_DECIMALS : AR_MONEY;
	const body = formatter.format(number);
	return withSymbol ? `$ ${body}` : body;
};

export const formatCbu = (digits) => (digits ?? '').replace(/(\d{4})(?=\d)/g, '$1 ').trim();

const DATE_FORMATTER = new Intl.DateTimeFormat('es-AR', {
	day: '2-digit',
	month: '2-digit',
	year: 'numeric',
	hour: '2-digit',
	minute: '2-digit',
});

export const formatDateTime = (date) => DATE_FORMATTER.format(date).replace(',', ' ·');

// Número de operación pseudoaleatorio con formato de comprobante.
export const buildOperationId = () => {
	const block = () => Math.floor(1000 + Math.random() * 9000);
	return `${block()}-${block()}-${block()}`;
};

export const maskName = (name) => (name ?? '').trim() || 'Destinatario';
