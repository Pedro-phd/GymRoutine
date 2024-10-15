import { createClient } from '@/infra/serverSideSupabase'

async function Home() {
	const supabase = createClient()
	const user = await supabase.auth.getUser()
	return <p>Olá </p>
}

export default Home
