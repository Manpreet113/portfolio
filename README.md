# Portfolio v2 (port-rewrite)

🚧 **STATUS: WORK IN PROGRESS** 🚧

Currently under heavy construction. Things might break, styles might look weird, and the backend might be screaming into the void. If you see a red dot, that's a feature, not a bug (it means the backend is dead).

This is the source code for my personal portfolio. It is a wildly over-engineered solution for what is essentially a digital business card. Why? Because "Hello World" is for quitters and I wanted to see if I could make Rust run on the edge without losing my mind.

## The Stack (And The Rant)

I didn't just throw darts at a "Trendy Tech 2025" board. There is actual method to this madness:

### Frontend: Astro + Tailwind v4

Why Astro? Because shipping 5MB of JavaScript to display a static bio is a crime against humanity. Astro ships zero JS by default. I only hydrate components when absolutely necessary (like the System Status indicator), keeping the site fast enough to load on a toaster.

Why Tailwind v4? It's the latest, it's fast, and life is too short to name CSS classes like `.wrapper-inner-container-flex-fix`.

### Backend: Cloudflare Workers (Rust)

Why Rust? Because I value type safety and sleep. JavaScript on the backend is fine until `undefined is not a function` takes down production at 3 AM. If this code compiles, it probably works. If it doesn't, the compiler hurts my feelings until I fix it.

Why Workers? Cold starts are for people who like waiting. Also, it runs on V8 isolates at the edge, which sounds cool in interviews.

```rust
// Example Rust code
fn main() {
    println!("Hello, world!");
}
```

## Database: Cloudflare D1 (SQLite)

Because setting up Postgres for a portfolio is where I draw the line.

## Project Structure

- `/ (Root)`: The Astro frontend. This is the pretty face.
- `/backend-worker`: The Rust-based API. This is the brain. It lives in its own workspace and compiles to WebAssembly because we can.

## Getting Started (The "Two Terminals" Problem)

Because this is a distributed system (fancy words for "frontend and backend are split"), you need to run two things at once to get the full experience.

1. The Backend (Rust)

   The frontend expects the API to be alive at `localhost:8787` (or whatever `wrangler.toml` decides today).

   ```bash
   cd backend-worker
   # Installs dependencies and runs the worker locally
   npx wrangler dev
   ```

   Note: You need `cargo` and `rustc` installed. If you don't, good luck.

2. The Frontend (Astro)

   Open a new terminal tab (yes, really):

   ```bash
   # Install dependencies
   npm install

   # Start the dev server
   npm run dev
   ```

## Features (Current & Planned)

- [x] Hybrid Rendering: Static shell for speed, dynamic data for "look I can fetch things."
- [x] System Status: Real-time "Operational/Offline" check. It mostly exists to prove the backend is actually running.
- [x] Database: Storing Projects and Skills in D1.
- [x] CORS Handling: "Nuclear option" implemented (Allow *) because CORS issues are the root of all evil in local dev.
- [ ] Admin Dashboard: `src/pages/admin.astro` is currently a ghost town. Needs auth integration.
- [ ] Error Handling: Currently, if the API explodes, the frontend just politely displays fallback data and pretends nothing happened.

## A Note on "Boring Software"

You'll see a philosophy section in the code about software being "boring." This codebase attempts to reflect that by using standard, predictable patterns—even if the tech stack itself (Rust on Wasm) is cutting edge enough to cut you.

## License

Do whatever you want with it. Just don't blame me if your borrow checker complains.