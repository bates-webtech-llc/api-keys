export function sha256(str: string): Promise<string> {
	const buffer = new TextEncoder().encode(str);
	return crypto.subtle.digest("SHA-256", buffer).then((hash) => hex(hash));
}

function hex(buffer: ArrayBuffer): string {
	let digest = "";
	const view = new DataView(buffer);
	for (let i = 0; i < view.byteLength; i += 4) {
		const value = view.getUint32(i);
		const stringValue = value.toString(16);
		const padding = "00000000";
		const paddedValue = (padding + stringValue).slice(-padding.length);
		digest += paddedValue;
	}

	return digest;
}
