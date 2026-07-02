import { useEffect, useState } from 'react';

const StatusBar = ({ dark = false }) => {
	const [time, setTime] = useState(() => currentTime());

	useEffect(() => {
		const id = setInterval(() => setTime(currentTime()), 15000);
		return () => clearInterval(id);
	}, []);

	const tone = dark ? '#ffffff' : '#101828';

	return (
		<div className="flex items-center justify-between px-7 pt-3 pb-1 text-[15px] font-semibold select-none" style={{ color: tone }}>
			<span>{time}</span>
			<div className="flex items-center gap-1.5">
				{/* Señal */}
				<svg width="18" height="12" viewBox="0 0 18 12" fill="none" aria-hidden="true">
					<rect x="0" y="8" width="3" height="4" rx="1" fill={tone} />
					<rect x="5" y="5" width="3" height="7" rx="1" fill={tone} />
					<rect x="10" y="2.5" width="3" height="9.5" rx="1" fill={tone} opacity="0.35" />
					<rect x="15" y="0" width="3" height="12" rx="1" fill={tone} opacity="0.35" />
				</svg>
				{/* Wi-Fi */}
				<svg width="16" height="12" viewBox="0 0 16 12" fill="none" aria-hidden="true">
					<path d="M8 10.5a1.4 1.4 0 1 0 0-2.8 1.4 1.4 0 0 0 0 2.8Z" fill={tone} />
					<path d="M3.4 6.2a6.5 6.5 0 0 1 9.2 0" stroke={tone} strokeWidth="1.5" strokeLinecap="round" fill="none" />
					<path d="M1.2 4a9.6 9.6 0 0 1 13.6 0" stroke={tone} strokeWidth="1.5" strokeLinecap="round" fill="none" />
				</svg>
				{/* Batería */}
				<div className="flex items-center gap-0.5">
					<div className="relative h-3 w-6 rounded-[3px] border" style={{ borderColor: tone, opacity: 0.9 }}>
						<div className="absolute inset-[1.5px] rounded-[1px]" style={{ background: tone, width: '55%' }} />
					</div>
					<div className="h-1.5 w-0.5 rounded-r" style={{ background: tone, opacity: 0.6 }} />
				</div>
			</div>
		</div>
	);
};

const currentTime = () => {
	const now = new Date();
	return `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
};

// Envuelve el contenido en una pantalla tipo teléfono. En móvil ocupa todo el
// viewport; en escritorio muestra un marco de dispositivo centrado.
const PhoneFrame = ({ children, statusBarDark = false, background = '#ffffff' }) => (
	<div className="flex min-h-full w-full items-center justify-center bg-[#0f1115] sm:p-6">
		<div
			className="relative flex h-[100dvh] w-full flex-col overflow-hidden sm:h-[844px] sm:max-h-[92vh] sm:w-[390px] sm:rounded-[44px] sm:border-8 sm:border-black sm:shadow-2xl"
			style={{ background }}
		>
			<StatusBar dark={statusBarDark} />
			<div className="relative flex min-h-0 flex-1 flex-col">{children}</div>
		</div>
	</div>
);

export { PhoneFrame, StatusBar };
export default PhoneFrame;
