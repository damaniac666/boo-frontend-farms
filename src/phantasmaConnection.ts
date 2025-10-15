let phantasmaLink: any = null;

export const loadPhantasmaLink = (): Promise<void> => {
  return new Promise((resolve, reject) => {
    if ((window as any).PhantasmaLink) {
      phantasmaLink = new (window as any).PhantasmaLink('boo-farm');
      resolve();
      return;
    }

    const script = document.createElement('script');
    script.src = '/phantasma/phantasma.js';
    script.async = true;
    script.onload = () => {
      if ((window as any).PhantasmaLink) {
        phantasmaLink = new (window as any).PhantasmaLink('boo-farm');
        resolve();
      } else {
        reject(new Error('PhantasmaLink not found after script load'));
      }
    };
    script.onerror = () => {
      reject(new Error('Failed to load Phantasma script'));
    };
    document.body.appendChild(script);
  });
};

export const connectToPhantasma = (callback: (success: boolean) => void) => {
  if (!phantasmaLink) {
    console.warn('PhantasmaLink not initialized. Call loadPhantasmaLink() first.');
    callback(false);
    return;
  }

  phantasmaLink.login((success: boolean) => {
    if (success) {
      console.log(`Connected to Phantasma wallet: ${phantasmaLink.account?.address}`);
    } else {
      console.log('Connection failed');
    }
    callback(success);
  }, 2);
};

export const logoutPhantasma = (callback: () => void) => {
  if (phantasmaLink?.logout) {
    phantasmaLink.logout(callback);
  } else {
    console.warn('PhantasmaLink not initialized or logout not available');
    callback();
  }
};

export const isConnected = () => !!phantasmaLink?.account;
export const getAccount = () => phantasmaLink?.account || null;