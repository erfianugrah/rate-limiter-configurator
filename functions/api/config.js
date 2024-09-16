export async function onRequestGet(context) {
  const { env } = context;
  const configStorageId = env.CONFIG_STORAGE.idFromName('global');
  const configStorage = env.CONFIG_STORAGE.get(configStorageId);

  const config = await configStorage.fetch('https://rate-limiter-ui/config');
  return new Response(await config.text(), {
    headers: { 'Content-Type': 'application/json' },
  });
}

export async function onRequestPost(context) {
  const { env, request } = context;
  const configStorageId = env.CONFIG_STORAGE.idFromName('global');
  const configStorage = env.CONFIG_STORAGE.get(configStorageId);

  const config = await request.json();
  await configStorage.fetch('https://rate-limiter-ui/config', {
    method: 'POST',
    body: JSON.stringify(config),
  });

  return new Response('Config saved', { status: 200 });
}
