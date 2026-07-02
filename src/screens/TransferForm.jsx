import { useMemo, useState } from 'react';
import { ArrowRight, Check, CircleAlert, Landmark } from 'lucide-react';
import { validateDestination } from '@/lib/cbu';
import { formatMoney } from '@/lib/format';
import { buildOperationId } from '@/lib/format';
import { ORIGIN_BANK_LIST } from '@/lib/originBanks';
import { GaliciaMark, Sparkle } from '@/components/BrandMarks';

const kindLabel = { cbu: 'CBU', cvu: 'CVU', alias: 'Alias' };

const BankOption = ({ bank, selected, onSelect }) => (
	<button
		type="button"
		onClick={() => onSelect(bank.id)}
		className={`flex flex-1 flex-col items-center gap-2 rounded-2xl border-2 px-3 py-4 transition ${selected ? 'border-transparent shadow-md' : 'border-gray-200 bg-white'
			}`}
		style={selected ? { background: bank.primary, boxShadow: `0 8px 20px ${bank.primary}33` } : undefined}
	>
		<span
			className="flex h-10 w-10 items-center justify-center rounded-full"
			style={{ background: selected ? '#ffffff22' : bank.id === 'galicia' ? '#fff4ec' : bank.brandBg }}
		>
			{bank.id === 'galicia' ? <GaliciaMark size={22} /> : <Sparkle size={22} color={selected ? '#ffffff' : bank.primary} />}
		</span>
		<span className={`text-sm font-semibold ${selected ? 'text-white' : 'text-gray-700'}`}>{bank.shortName}</span>
	</button>
);

const TransferForm = ({ onSubmit }) => {
	const [originBankId, setOriginBankId] = useState('mercadopago');
	const [amount, setAmount] = useState('');
	const [destination, setDestination] = useState('');
	const [recipientName, setRecipientName] = useState('');
	const [touched, setTouched] = useState(false);

	const destinationResult = useMemo(() => validateDestination(destination), [destination]);
	const amountNumber = Number(amount);
	const amountValid = amountNumber > 0;
	const nameValid = recipientName.trim().length >= 2;
	const canSubmit = amountValid && nameValid && destinationResult.valid;

	const handleSubmit = (event) => {
		event.preventDefault();
		setTouched(true);
		if (!canSubmit) return;

		onSubmit({
			originBankId,
			amount: amountNumber,
			recipientName: recipientName.trim(),
			destinationKey: destinationResult.value,
			destinationKind: destinationResult.kind,
			destinationBankName: destinationResult.bankName,
			destinationBankCode: destinationResult.bankCode,
			operationId: buildOperationId(),
			dateTime: new Date(),
		});
	};

	const showDestinationError = touched && destination.length > 0 && !destinationResult.valid;
	const showDestinationOk = destination.length > 0 && destinationResult.valid;

	return (
		<form onSubmit={handleSubmit} className="no-scrollbar flex min-h-0 flex-1 flex-col overflow-y-auto px-6 pb-8">
			<header className="pt-2 pb-5">
				<h1 className="text-[26px] leading-tight font-extrabold text-gray-900">Simular transferencia</h1>
				<p className="mt-1 text-[15px] text-gray-500">Completá los datos y generá el comprobante.</p>
			</header>

			<label className="mb-2 block text-sm font-semibold text-gray-700">Banco de origen</label>
			<div className="mb-6 flex gap-3">
				{ORIGIN_BANK_LIST.map((bank) => (
					<BankOption key={bank.id} bank={bank} selected={originBankId === bank.id} onSelect={setOriginBankId} />
				))}
			</div>

			<label htmlFor="amount" className="mb-2 block text-sm font-semibold text-gray-700">
				Monto
			</label>
			<div className="mb-6 flex items-center rounded-2xl border border-gray-200 bg-white px-4 focus-within:border-gray-900">
				<span className="text-2xl font-semibold text-gray-400">$</span>
				<input
					id="amount"
					inputMode="decimal"
					value={amount}
					onChange={(event) => setAmount(event.target.value.replace(/[^\d.,]/g, '').replace(',', '.'))}
					placeholder="0"
					className="w-full bg-transparent px-3 py-4 text-2xl font-bold text-gray-900 outline-none placeholder:text-gray-300"
				/>
			</div>

			<label htmlFor="destination" className="mb-2 block text-sm font-semibold text-gray-700">
				CBU, CVU o alias del destinatario
			</label>
			<div
				className={`flex items-center rounded-2xl border bg-white px-4 ${showDestinationError ? 'border-red-400' : 'border-gray-200 focus-within:border-gray-900'
					}`}
			>
				<Landmark size={18} className="text-gray-400" />
				<input
					id="destination"
					value={destination}
					onChange={(event) => setDestination(event.target.value)}
					onBlur={() => setTouched(true)}
					placeholder="barco.jirafa.correr"
					autoComplete="off"
					autoCapitalize="none"
					spellCheck={false}
					className="w-full bg-transparent px-3 py-3.5 text-[15px] text-gray-900 outline-none placeholder:text-gray-300"
				/>
				{showDestinationOk && (
					<span className="flex h-6 w-6 items-center justify-center rounded-full bg-green-100 text-green-600">
						<Check size={15} strokeWidth={3} />
					</span>
				)}
			</div>
			<div className="mt-1.5 min-h-5 px-1 text-[13px]">
				{showDestinationError ? (
					<span className="flex items-center gap-1 text-red-500">
						<CircleAlert size={13} /> {destinationResult.error}
					</span>
				) : showDestinationOk ? (
					<span className="text-gray-500">
						{kindLabel[destinationResult.kind]} válido
						{destinationResult.bankName ? ` · ${destinationResult.bankName}` : ''}
					</span>
				) : null}
			</div>

			<label htmlFor="recipient" className="mt-4 mb-2 block text-sm font-semibold text-gray-700">
				Titular de la cuenta destino
			</label>
			<div className="rounded-2xl border border-gray-200 bg-white px-4 focus-within:border-gray-900">
				<input
					id="recipient"
					value={recipientName}
					onChange={(event) => setRecipientName(event.target.value)}
					placeholder="Juan Pérez"
					autoComplete="off"
					className="w-full bg-transparent px-1 py-3.5 text-[15px] text-gray-900 outline-none placeholder:text-gray-300"
				/>
			</div>

			<div className="flex-1" />

			<button
				type="submit"
				disabled={!canSubmit}
				className="mt-8 flex w-full items-center justify-center gap-2 rounded-2xl bg-gray-900 py-4 text-[16px] font-semibold text-white transition disabled:cursor-not-allowed disabled:opacity-30"
			>
				Generar comprobante{amountValid ? ` de ${formatMoney(amountNumber)}` : ''}
				<ArrowRight size={18} />
			</button>
		</form>
	);
};

export default TransferForm;
