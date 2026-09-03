# Contributing to OrigoHOSTs Community

First off, thank you for considering contributing to OrigoHOSTs! We welcome all contributions, from bug fixes and documentation improvements to major feature additions.

## 🤝 Getting Started

1. Fork the repository.
2. Clone your fork: `git clone https://github.com/your-username/community.git`
3. Create a feature branch: `git checkout -b feature/your-feature-name`
4. Install dependencies: `npm install`
5. Make your changes!

## 📜 Pull Request Process

1. Ensure your code passes all linting (`npm run lint`) and type checks (`npx tsc --noEmit`).
2. If you added a new feature, update `README.md` or relevant documentation.
3. Create a Pull Request against the `main` branch.
4. Fill out the PR template completely.
5. Wait for a maintainer to review your code.

## 💻 Development Guidelines

- We use **TanStack Router** for routing. Do not use Next.js specific routing.
- We strictly use **Tailwind CSS v4** for styling.
- All new UI components must be accessible and responsive.
- Do not commit secrets or `.env` files.
