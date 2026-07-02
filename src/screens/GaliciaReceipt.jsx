import { useState } from 'react';
import { Check } from 'lucide-react';
import { formatMoney } from '@/lib/format';
import { shareReceipt } from '@/lib/share';
import ReceiptSheet from '@/screens/ReceiptSheet';

const NAVY = '#0a2d6e';

// "Banco de Galicia" -> "Galicia", "Banco Macro" -> "Macro".
const shortEntityName = (name) => (name ?? '').replace(/^Banco\s+(de\s+la\s+|de\s+|del\s+)?/i, '').trim();

const GaliciaReceipt = ({ data, onReset }) => {
	const [showSheet, setShowSheet] = useState(false);
	const [copied, setCopied] = useState(false);

	const handleShare = async () => {
		const result = await shareReceipt(data);
		if (result.method === 'clipboard') {
			setCopied(true);
			setTimeout(() => setCopied(false), 2200);
		}
	};

	const entity = shortEntityName(data.destinationBankName);

	return (
		<div className="flex min-h-0 flex-1 flex-col bg-white">
			<div className="flex flex-1 flex-col items-center justify-center px-8 text-center">
				<div className="animate-pop-in flex h-[92px] w-[92px] items-center justify-center rounded-full border-[5px] border-[#3ddc84] bg-white">
					<Check size={44} strokeWidth={3} className="text-gray-900" />
				</div>

				<h1 className="animate-fade-up mt-7 text-[26px] leading-snug font-extrabold text-gray-900">
					¡Le transferiste {formatMoney(data.amount)} a {data.recipientName}!
				</h1>
				<p className="animate-fade-up mt-2 text-[16px] text-gray-400">
					{entity ? `A su cuenta de ${entity}.` : 'Transferencia realizada con éxito.'}
				</p>
			</div>

			<div className="px-6 pb-7">
				{copied && <p className="mb-2 text-center text-[13px] font-medium text-gray-500">Comprobante copiado al portapapeles</p>}

				<button
					type="button"
					onClick={handleShare}
					className="w-full rounded-2xl py-4 text-[16px] font-semibold text-white"
					style={{ background: NAVY }}
				>
					Compartir Comprobante
				</button>
				<button
					type="button"
					onClick={() => setShowSheet(true)}
					className="mt-3 w-full rounded-2xl border-[1.5px] bg-white py-4 text-[16px] font-semibold"
					style={{ borderColor: NAVY, color: NAVY }}
				>
					Mostrar Comprobante
				</button>
				<button type="button" onClick={onReset} className="mt-4 w-full py-2 text-[16px] font-semibold" style={{ color: NAVY }}>
					Ir al Inicio
				</button>
			</div>

			{showSheet && <ReceiptSheet data={data} onClose={() => setShowSheet(false)} />}
		</div>
	);
};

export default GaliciaReceipt;
