import { formatCbu, formatDateTime, formatMoney } from '@/lib/format';
import { ORIGIN_BANKS } from '@/lib/originBanks';

const kindLabel = { cbu: 'CBU', cvu: 'CVU', alias: 'Alias' };

const buildSummary = (data) => {
	const originBank = ORIGIN_BANKS[data.originBankId];
	const destinationValue = data.destinationKind === 'alias' ? data.destinationKey : formatCbu(data.destinationKey);

	return [
		`Comprobante de transferencia`,
		`Monto: ${formatMoney(data.amount, { forceDecimals: true })}`,
		`Destinatario: ${data.recipientName}`,
		`${kindLabel[data.destinationKind]}: ${destinationValue}`,
		data.destinationBankName ? `Entidad: ${data.destinationBankName}` : null,
		`Origen: ${originBank.name}`,
		`Fecha: ${formatDateTime(data.dateTime)}`,
		`N.º de operación: ${data.operationId}`,
	]
		.filter(Boolean)
		.join('\n');
};

// Comparte el comprobante con la Web Share API; si no está disponible, copia
// el resumen al portapapeles.
export const shareReceipt = async (data) => {
	const text = buildSummary(data);

	try {
		if (navigator.share) {
			await navigator.share({ title: 'Comprobante de transferencia', text });
			return { ok: true, method: 'share' };
		}
		if (navigator.clipboard) {
			await navigator.clipboard.writeText(text);
			return { ok: true, method: 'clipboard' };
		}
	} catch {
		return { ok: false };
	}

	return { ok: false };
};
