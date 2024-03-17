# API-Keys

API-Keys A zero-dependency, lightweight tool designed to assist in the creation, hashing, and validation of API keys. It provides a simple yet powerful interface for managing API keys with optional prefixes, SHA256 hashing for security, and validation methods to ensure that API keys are correctly formatted and authorized.

## Features

- Generate API keys with custom prefixes.
- SHA256 hashing of API keys for enhanced security.
- Validate API keys and authorization headers.
- Compare API keys with their hashed counterparts to confirm validity.

## Installation

To install API-Keys, you need to have Node.js installed on your system. Once Node.js is installed, you can add API-Keys to your project by running the following command in your project's root directory:

```bash
npm install @bateswebtech/api-keys
```

## Usage

### Importing the Module

First, import the `createAPIKey`, `hashAPIKey`, `validateHeaders`, and `validateHash` functions from the module:

```javascript
import { createAPIKey, hashAPIKey, validateHeaders, validateHash } from '<your-package-name>';
```

### Creating an API Key

To create an API key, use the `createAPIKey` function by providing an optional configuration object. This function generates an API key, applies a prefix (if provided), and returns both the key and its SHA256 hashed version.

```javascript
import { createAPIKey } from '<your-package-name>';

async function generateAPIKey() {
    const apiKeyData = await createAPIKey({ prefix: 'myapp_' });
    console.log(apiKeyData);
    // Output: { key: 'myapp_...', hashedKey: '...' }
}
generateAPIKey();
```

### Hashing an API Key

To hash an existing API key for secure storage or comparison, use the `hashAPIKey` function. This function takes an API key as input and returns a Promise that resolves to the SHA256 hashed version of the API key.

```javascript
import { hashAPIKey } from '<your-package-name>';

async function hashKey() {
  const hashedKey = await hashAPIKey('myapp_someApiKey');
  console.log(hashedKey);
  // Output: SHA256 hashed version of 'myapp_someApiKey'
}
hashKey();
```

### Validating Headers

To validate authorization headers, particularly to ensure they contain a valid API key or token, use the `validateHeaders` function. This function checks if the provided headers contain the expected authorization type (e.g., "Bearer") and a token. It returns the token if the authorization header is valid, or an error object if there's an issue.

```javascript
import { validateHeaders } from '<your-package-name>';

function validateAuthHeader() {
  // Simulating headers object similar to what you'd receive in an HTTP request
  const headers = new Headers();
  headers.append('authorization', 'Bearer someApiKey');

  const token = validateHeaders(headers, { auth: 'Bearer', header: 'authorization' });
  if (token.error) {
    console.error(token.error);
  } else {
    console.log('Token is valid:', token);
  }
}
validateAuthHeader();
```

### Validating a Hashed Key

To verify the validity of an API key by comparing it against its hashed version, use the `validateHash` function. This can be particularly useful for authenticating or authorizing API requests. The function accepts an API key and its hashed counterpart as parameters, returning a boolean indicating whether the key matches the hashed version.

```javascript
import { validateHash } from '<your-package-name>';

async function verifyKey() {
  const isValid = await validateHash('someApiKey', 'expectedHashedValue');
  console.log('Is valid:', isValid);
  // Output: true or false
}
verifyKey();
```

## Contributing

Contributions are always welcome! If you have any suggestions, bug fixes, or enhancements, please feel free to fork the repository and submit a pull request. For major changes, please open an issue first to discuss what you would like to change.

Ensure to update tests as appropriate and adhere to the project's coding standards.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

