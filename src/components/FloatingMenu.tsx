'use client'

import { createClient } from '@/infra/clientsideSupabase'
import { CommentOutlined } from '@ant-design/icons'
import { FloatButton, Tooltip, message } from 'antd'
import { Logout03Icon, More02Icon } from 'hugeicons-react'
import { useRouter } from 'next/navigation'

export const FloatingMenu = () => {
	const { push } = useRouter()

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
					<FloatButton />
				</Tooltip>
				<Tooltip title='Sair'>
					<FloatButton icon={<Logout03Icon />} onClick={logout} />
				</Tooltip>
				<FloatButton icon={<CommentOutlined />} />
			</FloatButton.Group>
		</>
	)
}
