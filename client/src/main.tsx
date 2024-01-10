import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { Notifications } from '@mantine/notifications';
import { MantineProvider } from '@mantine/core';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import UploadPage from './pages/UploadPage.tsx';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<QueryClientProvider client={queryClient}>
			<Router>
				<Notifications />
				<MantineProvider
					withGlobalStyles
					withNormalizeCSS
					theme={{
						colorScheme: 'light',
					}}
				>
					<Switch>
						<Route path={'/upload'}>
							<UploadPage />
						</Route>
						<Route path={'/'}>
							<App />
						</Route>
					</Switch>
				</MantineProvider>
			</Router>
		</QueryClientProvider>
	</React.StrictMode>
);
