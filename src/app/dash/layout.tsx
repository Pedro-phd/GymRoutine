import { NavBar } from '@/components'
import { AppContextProvider } from '@/context/app.context'

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<div className='flex flex-col gap-2 h-screen'>
			<AppContextProvider>
				<NavBar />
				{children}
			</AppContextProvider>
		</div>
	)
}
