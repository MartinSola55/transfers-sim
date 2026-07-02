import { useState } from 'react';
import PhoneFrame from '@/components/PhoneFrame';
import TransferForm from '@/screens/TransferForm';
import MercadoPagoReceipt from '@/screens/MercadoPagoReceipt';
import GaliciaReceipt from '@/screens/GaliciaReceipt';

const RECEIPTS = {
	mercadopago: MercadoPagoReceipt,
	galicia: GaliciaReceipt,
};

const App = () => {
	const [transfer, setTransfer] = useState(null);

	if (!transfer)
		return (
			<PhoneFrame>
				<TransferForm onSubmit={setTransfer} />
			</PhoneFrame>
		);

	const Receipt = RECEIPTS[transfer.originBankId] ?? MercadoPagoReceipt;

	return (
		<PhoneFrame>
			<Receipt data={transfer} onReset={() => setTransfer(null)} />
		</PhoneFrame>
	);
};

export default App;
