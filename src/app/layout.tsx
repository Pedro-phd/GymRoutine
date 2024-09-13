import type { Metadata } from 'next'
import './globals.css'
import { AntdRegistry } from '@ant-design/nextjs-registry'

export const metadata: Metadata = {
	title: 'Gym Routine',
	description: 'Organize sua rotina da academia! | Gym Routine',
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang='pt-BR'>
			<body className='antialiased'>
				<AntdRegistry>{children}</AntdRegistry>
			</body>
		</html>
	)
}
