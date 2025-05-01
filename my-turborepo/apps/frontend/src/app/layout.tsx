'use client'; // 🟢 WAJIB di baris pertama tanpa ada yang lain di atasnya

import { Provider } from 'react-redux';
import { store } from '../store/store';
import { CssBaseline, ThemeProvider } from '@mui/material';
import theme from '../theme/theme';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Provider store={store}>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            {children}
          </ThemeProvider>
        </Provider>
      </body>
    </html>
  );
}
