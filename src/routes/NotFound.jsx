export default function NotFound(){
  return (
    <div className="min-h-screen grid place-items-center p-6">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-2">404</h1>
        <p className="mb-4">This page doesn’t exist.</p>
        <a className="px-3 py-2 rounded bg-black text-white" href="/">Go home</a>
      </div>
    </div>
  )
}
