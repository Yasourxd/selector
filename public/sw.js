/* eslint-disable no-restricted-globals */
self.addEventListener('message', event => {
  const data = event.data;

  // Broadcast the message to all clients (tabs)
  self.clients.matchAll().then(clients => {
    clients.forEach(client => {
      client.postMessage(data);
    });
  });
});