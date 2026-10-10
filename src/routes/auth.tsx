import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/auth')({
  component: () => <div className="p-20 text-center">Login Page Placeholder</div>,
});
