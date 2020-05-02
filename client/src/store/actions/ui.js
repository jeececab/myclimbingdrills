let messageInterval;

export function showMessage(store, content) {
  store.setState({ message: { content, show: true } });

  messageInterval = setTimeout(() => {
    store.setState({ message: { content: '', show: false } });
  }, 4000);
}

export function hideMessage(store) {
  clearTimeout(messageInterval);
  store.setState({ message: { content: '', show: false } });
}
