export const orderStyles = {
  page: "mx-auto w-full max-w-3xl space-y-6",

  shell: "rounded-2xl border border-border bg-card p-6 shadow-sm",

  headerRow: "flex items-center justify-between gap-4",
  headerText: "text-sm text-muted-foreground",

  stepTitle: "text-xl font-semibold tracking-tight text-foreground",
  stepSubtitle: "mt-2 text-sm text-muted-foreground",

  sectionTitle: "text-sm font-semibold text-foreground",
  label: "text-sm font-medium text-muted-foreground",

  grid2: "grid grid-cols-1 gap-4 sm:grid-cols-2",
  grid3: "grid grid-cols-1 gap-4 sm:grid-cols-3",

  input:
    "mt-1 w-full rounded-xl border border-input bg-background px-3 py-2 text-foreground placeholder:text-muted-foreground shadow-sm outline-none transition " +
    "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background " +
    "disabled:cursor-not-allowed disabled:opacity-50",

  select:
    "mt-1 w-full rounded-xl border border-input bg-background px-3 py-2 text-foreground shadow-sm outline-none transition " +
    "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background " +
    "disabled:cursor-not-allowed disabled:opacity-50",

  textarea:
    "mt-1 w-full rounded-xl border border-input bg-background px-3 py-2 text-foreground placeholder:text-muted-foreground shadow-sm outline-none transition " +
    "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background " +
    "disabled:cursor-not-allowed disabled:opacity-50",

  checkbox:
    "h-4 w-4 rounded border-input bg-background text-primary " +
    "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",

  card: "rounded-xl border border-border bg-card p-4",

  cardButtonBase:
    "w-full text-left rounded-2xl border px-5 py-4 flex items-center justify-between gap-4 transition-colors",
  cardButtonDefault: "border-border bg-card hover:bg-accent",
  cardButtonSelected: "border-primary/40 bg-primary/10",

  chipBase: "rounded-lg border px-3 py-2 text-sm font-medium transition-colors",
  chipDefault: "border-border bg-card text-foreground hover:bg-accent",
  chipSelected: "border-primary/40 bg-primary/10 text-foreground",

  toggleRow: "flex items-center gap-3 rounded-xl border border-border bg-muted/40 px-3 py-2",

  actions: "mt-8 flex items-center justify-between gap-3",

  btnPrimary:
    "rounded-xl bg-primary px-4 py-2 font-semibold text-primary-foreground shadow-sm transition " +
    "hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50",

  btnOutline:
    "rounded-xl border border-border bg-background px-4 py-2 font-semibold text-foreground shadow-sm transition " +
    "hover:bg-accent disabled:cursor-not-allowed disabled:opacity-50",

  btnGhost:
    "rounded-xl px-3 py-2 text-sm font-semibold text-foreground transition hover:bg-accent " +
    "disabled:cursor-not-allowed disabled:opacity-50",

  error: "mt-4 text-sm text-destructive",
};
