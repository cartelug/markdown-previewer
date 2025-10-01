import { useEffect, useMemo, useRef, useState } from 'react'
import MarkdownIt from 'markdown-it'
import hljs from 'highlight.js'
import { Download, Upload, Save, Trash2, FileText, Link as LinkIcon } from 'lucide-react'
import ErrorBoundary from '../components/ErrorBoundary.jsx'

const md = new MarkdownIt({
  html: true,
  linkify: true,
  highlight: function (str) {
    try {
      return `<pre><code class="hljs">${hljs.highlightAuto(str).value}</code></pre>`
    } catch {
      return `<pre><code>${str}</code></pre>`
    }
  }
})

const starter = `# Hello 👋

- Type markdown on the left
- See the preview on the right

\`\`\`js
console.log('code blocks get highlighted')
\`\`\`
`

export default function App(){
  const [text, setText] = useState(() => localStorage.getItem('md:text') || starter)
  const [loading, setLoading] = useState(false)
  const fileRef = useRef(null)

  // save text in browser
  useEffect(() => { localStorage.setItem('md:text', text) }, [text])

  const html = useMemo(() => md.render(text), [text])

  function handleUpload(e){
    const file = e.target.files?.[0]
    if(!file) return
    setLoading(true)
    const reader = new FileReader()
    reader.onload = () => { setText(String(reader.result || '')); setLoading(false) }
    reader.onerror = () => { alert('Could not read file'); setLoading(false) }
    reader.readAsText(file)
  }

  function saveAsFile(){
    const blob = new Blob([text], { type: 'text/markdown;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url; a.download = 'note.md'; a.click()
    URL.revokeObjectURL(url)
  }

  async function saveToApi(){
    setLoading(true)
    try {
      const res = await fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: 'markdown', body: text, userId: 1 })
      })
      const data = await res.json()
      alert('Saved to API (fake): id ' + data.id)
    } catch {
      alert('API save failed')
    } finally {
      setLoading(false)
    }
  }

  function clearAll(){
    if (confirm('Clear the editor?')) setText('')
  }

  return (
    <ErrorBoundary>
      <div className="min-h-screen flex flex-col">
        <header className="border-b bg-white/70 backdrop-blur sticky top-0 z-10">
          <div className="max-w-6xl mx-auto px-4 py-3 flex items-center gap-3">
            <FileText className="w-5 h-5" aria-hidden="true" />
            <h1 className="text-lg font-semibold">Markdown Previewer</h1>
            <div className="ml-auto flex items-center gap-2">
              <button className="px-3 py-2 rounded bg-neutral-900 text-white flex items-center gap-2" onClick={saveAsFile}>
                <Download className="w-4 h-4" /> <span className="hidden sm:inline">Save .md</span>
              </button>
              <button className="px-3 py-2 rounded bg-neutral-100 border flex items-center gap-2" onClick={()=>fileRef.current?.click()}>
                <Upload className="w-4 h-4" /> <span className="hidden sm:inline">Upload</span>
              </button>
              <button className="px-3 py-2 rounded bg-neutral-100 border flex items-center gap-2" onClick={saveToApi}>
                <Save className="w-4 h-4" /> <span className="hidden sm:inline">API</span>
              </button>
              <button className="px-3 py-2 rounded bg-red-50 border border-red-200 text-red-700 flex items-center gap-2" onClick={clearAll}>
                <Trash2 className="w-4 h-4" />
                <span className="hidden sm:inline">Clear</span>
              </button>
              <a className="px-3 py-2 rounded border flex items-center gap-2" href="/error-test">
                <LinkIcon className="w-4 h-4" />
                <span className="hidden sm:inline">/error-test</span>
              </a>
            </div>
          </div>
        </header>

        <main className="max-w-6xl mx-auto w-full flex-1 grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
          <section className="flex flex-col">
            <textarea
              value={text}
              onChange={e=>setText(e.target.value)}
              className="flex-1 w-full resize-none border rounded-lg p-3 font-mono text-sm"
              placeholder="Type markdown here..."
            />
            <input ref={fileRef} type="file" accept=".md,text/markdown,.txt" className="hidden" onChange={handleUpload} />
            {loading && <p className="text-sm mt-2 opacity-70">Working...</p>}
          </section>

          <section className="prose max-w-none dark:prose-invert" aria-live="polite">
            <article dangerouslySetInnerHTML={{ __html: html }} />
          </section>
        </main>

        <footer className="border-t text-sm p-4 text-center opacity-70">
          Built with React • Markdown-It • Highlight.js
        </footer>
      </div>
    </ErrorBoundary>
  )
}
