// Envuelve el contenido en una pantalla tipo teléfono. En móvil ocupa todo el
// alto real del viewport (100dvh en Safari iOS) y el fondo blanco llega hasta
// el borde superior del teléfono; el contenido respeta el safe-area del notch.
// En escritorio muestra un marco de dispositivo centrado.
const PhoneFrame = ({ children, background = '#ffffff' }) => (
	<div className="flex min-h-full w-full items-center justify-center bg-[#0f1115] sm:p-6">
		<div
			className="relative flex h-[100dvh] w-full flex-col overflow-hidden sm:h-[844px] sm:max-h-[92vh] sm:w-[390px] sm:rounded-[44px] sm:border-8 sm:border-black sm:shadow-2xl"
			style={{ background }}
		>
			<div className="relative flex min-h-0 flex-1 flex-col pt-[calc(env(safe-area-inset-top)+2.5rem)]">{children}</div>
		</div>
	</div>
);

export default PhoneFrame;
