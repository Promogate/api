import uuidAPIKey from 'uuid-apikey';

export function generatApiKey (): string {
  const { apiKey: key } = uuidAPIKey.create();
  const apiKey = key.replace(/[-]/g, '')
  return apiKey
}