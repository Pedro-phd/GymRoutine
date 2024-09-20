import type { Metadata } from 'next'
import './globals.css'
import { NavBar } from '@/components'
import { ClientProviders } from './ClientProviders'
import { Rubik } from 'next/font/google'
import { AppContextProvider } from '@/context/app.context'

export const metadata: Metadata = {
	title: 'Gym Routine',
	description: 'Organize sua rotina da academia! | Gym Routine',
}

const rubik = Rubik({ subsets: ['latin'], weight: 'variable' })

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang='pt-BR'>
			<body className={`antialiased ${rubik.className}`}>
				<ClientProviders>
					<AppContextProvider>
						<div className='flex flex-col gap-2 h-screen'>
							<NavBar />
							{children}
						</div>
					</AppContextProvider>
				</ClientProviders>
			</body>
		</html>
	)
}
