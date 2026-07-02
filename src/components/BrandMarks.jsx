// Marcas de banco recreadas como SVG (aproximaciones, no assets oficiales).

// Espada/cruz naranja característica de Banco Galicia.
export const GaliciaMark = ({ size = 22 }) => (
	<svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
		<path
			d="M12 2.2c.5 0 .9.4.9.9v3.1h2.2a.85.85 0 0 1 0 1.7h-2.2v11.3l-.9 2.4-.9-2.4V7.9H8.9a.85.85 0 0 1 0-1.7h2.2V3.1c0-.5.4-.9.9-.9Z"
			fill="#ff6a13"
		/>
	</svg>
);

// Escudo naranja con símbolo de peso (bloque "Protección extra" de Mercado Pago).
export const ShieldMoney = ({ size = 44 }) => (
	<svg width={size} height={size} viewBox="0 0 48 48" fill="none" aria-hidden="true">
		<defs>
			<linearGradient id="shieldGrad" x1="8" y1="4" x2="40" y2="44" gradientUnits="userSpaceOnUse">
				<stop stopColor="#ffb02e" />
				<stop offset="1" stopColor="#f97316" />
			</linearGradient>
		</defs>
		<path
			d="M24 4 8 10v11c0 9.2 6.4 17.4 16 20 9.6-2.6 16-10.8 16-20V10L24 4Z"
			fill="url(#shieldGrad)"
		/>
		<path
			d="M25.6 13h-2.3v2.1c-2.4.3-4 1.8-4 3.9 0 2.4 1.9 3.2 4 3.7v3.9c-1-.2-1.7-.8-1.9-1.7h-2.4c.2 2.2 1.8 3.6 4.3 3.9V35h2.3v-2.3c2.6-.3 4.2-1.8 4.2-4 0-2.4-1.9-3.3-4.2-3.8v-3.7c.9.2 1.5.7 1.7 1.5h2.3c-.2-2-1.7-3.4-4-3.7V13Zm-2.3 6.9c-1-.3-1.5-.7-1.5-1.4 0-.7.6-1.2 1.5-1.4v2.8Zm2.3 3.5c1.1.3 1.7.7 1.7 1.5s-.6 1.3-1.7 1.5v-3Z"
			fill="#ffffff"
		/>
	</svg>
);

// Sparkle del asistente (botón amarillo flotante de Mercado Pago).
export const Sparkle = ({ size = 26, color = '#4f3ff0' }) => (
	<svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
		<path d="M13 2 15 8.5 21.5 10.5 15 12.5 13 19 11 12.5 4.5 10.5 11 8.5 13 2Z" fill={color} />
		<path d="M19 14.5 20 17.5 23 18.5 20 19.5 19 22.5 18 19.5 15 18.5 18 17.5 19 14.5Z" fill={color} opacity="0.85" />
	</svg>
);

// Avatar circular del destinatario, con la marca del banco cuando la conocemos.
export const RecipientAvatar = ({ bankName, name }) => {
	const isGalicia = (bankName ?? '').toLowerCase().includes('galicia');

	if (isGalicia)
		return (
			<span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-gray-200 bg-white">
				<GaliciaMark size={22} />
			</span>
		);

	const initials = (name ?? '')
		.trim()
		.split(/\s+/)
		.slice(0, 2)
		.map((part) => part[0]?.toUpperCase() ?? '')
		.join('');

	return (
		<span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-gray-200 bg-gray-100 text-sm font-semibold text-gray-500">
			{initials || '$'}
		</span>
	);
};
