'use client'

import { useAppContext } from '@/context/app.context'
import { createClient } from '@/infra/clientsideSupabase'
import { ReportService } from '@/services/report.service'
import { CommentOutlined } from '@ant-design/icons'
import { FloatButton, Tooltip, message } from 'antd'
import { Logout03Icon, More02Icon } from 'hugeicons-react'
import { useRouter } from 'next/navigation'

export const FloatingMenu = () => {
	const { push } = useRouter()
	const { setLoading } = useAppContext()

	const service = new ReportService()

	const [messageApi, contextHolder] = message.useMessage()

	const logout = async () => {
		const supabase = createClient()
		messageApi.open({
			type: 'loading',
			content: 'Saindo...',
			duration: 0,
		})
		await supabase.auth.signOut()
		push('/auth/login')
	}

	const handleReport = async () => {
		setLoading(true)
		const response = await service.get()
		const blob = new Blob([response], { type: 'application/pdf' })
		const url = window.URL.createObjectURL(blob) // Cria uma URL temporária para o Blob
		// Cria um link temporário
		const link = document.createElement('a')
		link.href = url
		link.setAttribute('download', 'arquivo.pdf') // Nome do arquivo que será baixado
		document.body.appendChild(link)

		setLoading(false)

		// Simula um clique no link para acionar o download
		link.click()
		document.body.removeChild(link)
	}

	return (
		<>
			{contextHolder}
			<FloatButton.Group
				trigger='click'
				type='primary'
				style={{ insetInlineEnd: 94 }}
				icon={<More02Icon className='size-5' />}
				shape='square'
			>
				<Tooltip title='Relatório'>
					<FloatButton onClick={handleReport} />
				</Tooltip>
				<Tooltip title='Sair'>
					<FloatButton icon={<Logout03Icon />} onClick={logout} />
				</Tooltip>
				<FloatButton icon={<CommentOutlined />} />
			</FloatButton.Group>
		</>
	)
}
