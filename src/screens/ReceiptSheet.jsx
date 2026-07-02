import { X } from 'lucide-react';
import { formatCbu, formatDateTime, formatMoney } from '@/lib/format';
import { ORIGIN_BANKS } from '@/lib/originBanks';

const kindLabel = { cbu: 'CBU', cvu: 'CVU', alias: 'Alias' };

const Row = ({ label, value, mono = false }) => (
	<div className="flex flex-col gap-0.5 border-b border-gray-100 py-3 last:border-b-0">
		<span className="text-[13px] text-gray-400">{label}</span>
		<span className={`text-[15px] font-medium break-words text-gray-900 ${mono ? 'font-mono tracking-tight' : ''}`}>{value}</span>
	</div>
);

// Comprobante detallado en formato hoja inferior (bottom sheet).
const ReceiptSheet = ({ data, onClose }) => {
	const originBank = ORIGIN_BANKS[data.originBankId];
	const destinationValue = data.destinationKind === 'alias' ? data.destinationKey : formatCbu(data.destinationKey);

	return (
		<div className="absolute inset-0 z-30 flex flex-col justify-end bg-black/40" onClick={onClose}>
			<div
				className="animate-sheet-up no-scrollbar max-h-[88%] overflow-y-auto rounded-t-3xl bg-white px-6 pt-5 pb-8"
				onClick={(event) => event.stopPropagation()}
			>
				<div className="mx-auto mb-4 h-1.5 w-10 rounded-full bg-gray-200" />
				<div className="mb-4 flex items-center justify-between">
					<h2 className="text-lg font-extrabold text-gray-900">Comprobante</h2>
					<button
						type="button"
						onClick={onClose}
						className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-gray-500"
						aria-label="Cerrar comprobante"
					>
						<X size={17} />
					</button>
				</div>

				<div className="mb-4 rounded-2xl bg-gray-50 p-4 text-center">
					<p className="text-[13px] text-gray-400">Transferencia realizada</p>
					<p className="mt-1 text-3xl font-extrabold text-gray-900">{formatMoney(data.amount, { forceDecimals: true })}</p>
				</div>

				<Row label="Destinatario" value={data.recipientName} />
				<Row label={kindLabel[data.destinationKind]} value={destinationValue} mono={data.destinationKind !== 'alias'} />
				<Row label="Banco / entidad destino" value={data.destinationBankName ?? 'No informado'} />
				<Row label="Origen" value={originBank.name} />
				<Row label="Fecha y hora" value={formatDateTime(data.dateTime)} />
				<Row label="N.º de operación" value={data.operationId} mono />

				<button
					type="button"
					onClick={onClose}
					className="mt-6 w-full rounded-2xl py-3.5 text-[15px] font-semibold text-white"
					style={{ background: originBank.primary }}
				>
					Listo
				</button>
			</div>
		</div>
	);
};

export default ReceiptSheet;
