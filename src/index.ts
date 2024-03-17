import { sha256 } from "./utils";

/**
 * Configuration options for creating an API key.
 */
interface CreateAPIKeyConfig {
	/**
	 * The prefix to be added to the generated API key.
	 */
	prefix?: string;

	/**
	 * The specific key to be used for the API key.
	 */
	key?: string;
}

/**
 * Creates an API key.
 *
 * @param config - The configuration object for creating the API key.
 * @returns An object containing the generated API key and its sha256 hashed version.
 */
export async function createAPIKey(config: CreateAPIKeyConfig) {
	const { prefix = "sk_" } = config;

	const key = config?.key ?? crypto.randomUUID();

	const apiKey = `${prefix}${btoa(key)}`;

	return {
		key: apiKey,
		hashedKey: await sha256(apiKey),
	};
}

/**
 * Hashes an API key using the SHA256 algorithm.
 * @param apiKey - The API key to be hashed.
 * @returns A Promise that resolves to the hashed API key.
 */
export async function hashAPIKey(apiKey: string) {
	return await sha256(apiKey);
}

/**
 * Configuration options for validating authentication headers.
 */
interface ValidateAuthHeaderConfig {
	auth?: string;
	header?: string;
}

/**
 * Validates the authorization header based on the provided configuration.
 * @param headers - The headers object containing the authorization header.
 * @param config - The configuration object.
 * @returns The token if the authorization header is valid, or an error object if there is an issue.
 */
export function validateHeaders(
	headers: Headers,
	config: ValidateAuthHeaderConfig,
) {
	const { auth = "Bearer", header = "authorization" } = config;

	try {
		const authHeader = headers.get(header);
		if (!authHeader) throw new Error("Authorization header is missing.");

		const [type, token] = authHeader.split(" ");
		if (type !== auth) throw new Error("Invalid authorization type.");
		if (!token || !token?.length) throw new Error("Token is missing.");

		return token;
	} catch (error) {
		return {
			error:
				error instanceof Error
					? error.message
					: "An error occurred while validating the authorization header.",
		};
	}
}

export function validateHeader(
	header: string,
	config: Omit<ValidateAuthHeaderConfig, "header">,
) {
	const { auth = "Bearer" } = config;
	try {
		const [type, token] = header.split(" ");
		if (type !== auth) throw new Error("Invalid authorization type.");
		if (!token || !token?.length) throw new Error("Token is missing.");

		return token;
	} catch (error) {
		return {
			error:
				error instanceof Error
					? error.message
					: "An error occurred while validating the authorization header.",
		};
	}
}

/**
 * Validates a key by comparing it with a hashed key.
 * @param key - The key to validate.
 * @param hashedKey - The hashed key to compare against.
 * @returns A boolean indicating whether the key is valid.
 */
export async function validateHash(key: string, hashedKey: string) {
	return (await sha256(key)) === hashedKey;
}
