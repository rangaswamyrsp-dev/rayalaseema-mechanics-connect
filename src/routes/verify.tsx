import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/verify')({
  component: () => <div className="p-20 text-center">Verify Page Placeholder</div>,
});
