'use client'
import { createClient } from '@/infra/clientsideSupabase'
import { GoogleOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import { Dumbbell02Icon } from 'hugeicons-react'

function SignIn() {
	const supabase = createClient()

	const handleLogin = () => {
		supabase.auth.signInWithOAuth({
			provider: 'google',
		})
	}

	return (
		<div className='flex flex-col gap-4 justify-items-center p-4'>
			<div className='flex justify-center items-center border-b border-slate-300 pb-4'>
				<div className='text-slate-900 flex gap-2 items-center'>
					<Dumbbell02Icon />
					<p className='text-xl font-bold'>GymRoutine</p>
				</div>
			</div>
			<p className='text-center'>Faça login para aproveitar a plataforma!</p>
			<Button onClick={handleLogin} icon={<GoogleOutlined />}>
				Login com Google
			</Button>
		</div>
	)
}

export default SignIn
