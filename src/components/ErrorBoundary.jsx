import React from 'react'

export default class ErrorBoundary extends React.Component {
  constructor(props){
    super(props)
    this.state = { hasError: false, message: '' }
  }
  static getDerivedStateFromError(err){
    return { hasError: true, message: err?.message || 'Something went wrong.' }
  }
  componentDidCatch(err, info){
    console.error('ErrorBoundary:', err, info)
  }
  render(){
    if (this.state.hasError) {
      return (
        <div className="p-6 max-w-2xl mx-auto text-center">
          <h1 className="text-2xl font-bold mb-2">⚠️ Oops!</h1>
          <p className="mb-4">{this.state.message}</p>
          <button
            className="px-3 py-2 rounded bg-black text-white"
            onClick={()=>location.href='/'}
          >
            Go Home
          </button>
        </div>
      )
    }
    return this.props.children
  }
}
