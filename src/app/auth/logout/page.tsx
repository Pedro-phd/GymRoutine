import { createClient } from '@/infra/serverSideSupabase'
import { redirect } from 'next/navigation'

async function Logout() {
	const supabase = createClient()

	await supabase.auth.signOut()
	await redirect('/')

	return <p>saindo ...</p>
}

export default Logout
