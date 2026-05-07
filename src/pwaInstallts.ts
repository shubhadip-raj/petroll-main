let deferredPrompt = null;

export const setInstallPrompt = (event) => {
  deferredPrompt = event;
};

export const triggerInstall = async () => {
  if (!deferredPrompt) {
    alert("Install not available yet. Please wait or refresh.");
    return;
  }

  await deferredPrompt.prompt();
  const result = await deferredPrompt.userChoice;

  console.log(result);

  deferredPrompt = null;
};