import { useState } from 'react';
import { ArrowRight, Check, Share2, X } from 'lucide-react';
import { formatCbu, formatMoney } from '@/lib/format';
import { shareReceipt } from '@/lib/share';
import { RecipientAvatar, ShieldMoney, Sparkle } from '@/components/BrandMarks';

const destinationLine = (data) => {
	if (data.destinationKind === 'alias') return `Alias: ${data.destinationKey}`;
	if (data.destinationKind === 'cvu') return `CVU: ${formatCbu(data.destinationKey)}`;
	return `CBU: ${formatCbu(data.destinationKey)}`;
};

const MercadoPagoReceipt = ({ data, onReset }) => {
	const [copied, setCopied] = useState(false);

	const handleShare = async () => {
		const result = await shareReceipt(data);
		if (result.method === 'clipboard') {
			setCopied(true);
			setTimeout(() => setCopied(false), 2200);
		}
	};

	return (
		<div className="flex min-h-0 flex-1 flex-col bg-white">
			<div className="flex justify-end px-5 pt-2">
				<button
					type="button"
					onClick={onReset}
					className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600"
					aria-label="Cerrar"
				>
					<X size={20} strokeWidth={2.5} />
				</button>
			</div>

			<div className="no-scrollbar flex-1 overflow-y-auto px-6">
				<div className="animate-pop-in mt-6 flex h-[76px] w-[76px] items-center justify-center rounded-full bg-[#25a244]">
					<Check size={42} strokeWidth={3.5} className="text-white" />
				</div>

				<h1 className="animate-fade-up mt-6 text-[34px] leading-none font-extrabold text-gray-900">
					Transferiste {formatMoney(data.amount)}
				</h1>

				<div className="animate-fade-up mt-6 flex items-start gap-3">
					<RecipientAvatar bankName={data.destinationBankName} name={data.recipientName} />
					<div className="min-w-0">
						<p className="text-[19px] leading-tight font-bold text-gray-900">{data.recipientName}</p>
						<p className="mt-0.5 text-[15px] break-words text-gray-500">{destinationLine(data)}</p>
						{data.destinationBankName && <p className="text-[15px] text-gray-500">{data.destinationBankName}</p>}
					</div>
				</div>

				<div className="animate-fade-up mt-8 rounded-2xl border border-gray-200 p-4">
					<div className="flex items-start gap-3">
						<ShieldMoney size={46} />
						<div>
							<p className="text-[17px] font-extrabold text-gray-900">Protección extra para tu dinero</p>
							<p className="mt-0.5 text-[13px] text-gray-500">Protegé tu cuenta ante robos y estafas</p>
							<button type="button" className="mt-2 flex items-center gap-1 text-[15px] font-bold text-indigo-600">
								Saber más <ArrowRight size={16} strokeWidth={2.5} />
							</button>
						</div>
					</div>
				</div>
			</div>

			<div className="relative px-5 pt-2 pb-6">
				<button
					type="button"
					className="absolute -top-8 right-6 flex h-14 w-14 items-center justify-center rounded-full bg-[#ffe600] shadow-lg"
					aria-label="Asistente"
				>
					<Sparkle size={26} color="#4f3ff0" />
				</button>

				{copied && (
					<p className="mb-2 text-center text-[13px] font-medium text-gray-500">Comprobante copiado al portapapeles</p>
				)}

				<button
					type="button"
					onClick={handleShare}
					className="flex w-full items-center justify-center gap-2 rounded-2xl py-4 text-[16px] font-bold text-white"
					style={{ background: '#4f3ff0' }}
				>
					<Share2 size={18} strokeWidth={2.5} /> Compartir comprobante
				</button>
				<button
					type="button"
					onClick={onReset}
					className="mt-3 w-full rounded-2xl bg-indigo-50 py-4 text-[16px] font-bold text-indigo-600"
				>
					Hacer otra transferencia
				</button>
			</div>
		</div>
	);
};

export default MercadoPagoReceipt;
