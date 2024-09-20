'use client'

import { NavBar } from '@/components'
import { StyleProvider } from '@ant-design/cssinjs'
import { AntdRegistry } from '@ant-design/nextjs-registry'
import type { PropsWithChildren } from 'react'

export function ClientProviders({ children }: PropsWithChildren) {
	return (
		<StyleProvider layer>
			<AntdRegistry>{children}</AntdRegistry>
		</StyleProvider>
	)
}
