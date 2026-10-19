import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  'https://tynmtgjjapyxukbxxpoc.supabase.co',
  'sb_publishable_J6r6CiO19PjO5sAHXMd6mA_AS1ZF9pj'
)

async function login(email, password) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
  })

  if (error) throw new Error('Error al hacer login: ' + error.message)
  return data // { user, session }
}


async function logout() {
  const { error } = await supabase.auth.signOut({ scope: 'local' })
  if (error) throw new Error('Error al cerrar sesión: ' + error.message)
}

async function obtenerProductos() {
  const { data: { session }, error: sessionError } =
    await supabase.auth.getSession()

  if (sessionError) throw sessionError
  if (!session) return

  const { data, error } = await supabase
    .from('lista')
    .select('id, nombre, comprado, usuario')
    .order('id')

  if (error) throw new Error('Error al obtener productos: ' + error.message)
  return data
}

async function setComprado(id, valor) {
  const { data: { session }, error: sessionError } =
    await supabase.auth.getSession()

  if (sessionError) throw sessionError
  if (!session) return

  const { error } = await supabase
    .from('lista')
    .update({ comprado: valor })
    .eq('id', id)

  if (error) throw new Error(error.message)
}

export { login, logout,  obtenerProductos, setComprado }