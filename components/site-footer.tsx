export function SiteFooter() {
  return (
    <footer className="relative border-t border-border py-10">
      <div className="mx-auto flex max-w-6xl items-center justify-center px-6">
        <p className="font-mono text-sm text-muted-foreground">
          © {new Date().getFullYear()} Paulo Vitor Brandão. Todos os direitos reservados.
        </p>
      </div>
    </footer>
  )
}
