'use client'
import { createClient } from '@/infra/clientsideSupabase'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

function Logout() {
	const supabase = createClient()
	const { push } = useRouter()
	useEffect(() => {
		;(async () => {
			await supabase.auth.signOut()
			push('/')
		})()
	}, [])

	return <p>saindo ...</p>
}

export default Logout
