interface Props {
  onNavigate: (page: string) => void
}


export default function NotFound({ onNavigate }: Props) {
  return (
    <div className="min-h-screen flex items-center justify-center pt-24 pb-16 px-6" style={{ background: 'var(--background)' }}>
      <div className="max-w-md w-full text-center">
        <span className="tag accent mb-4 inline-block">404 Error</span>
        <h1 className="text-4xl font-bold mb-4" style={{ fontFamily: 'DM Serif Display, serif' }}>
          Page not found
        </h1>
        <p className="text-sm leading-relaxed mb-8" style={{ color: 'var(--muted-foreground)' }}>
          The page you are looking for doesn't exist, has been removed, or moved to another URL.
        </p>
        <button
          onClick={() => onNavigate('home')}
          className="btn btn-primary btn-lg w-full sm:w-auto"
        >
          Back to Homepage
        </button>
      </div>
    </div>
  )
}
