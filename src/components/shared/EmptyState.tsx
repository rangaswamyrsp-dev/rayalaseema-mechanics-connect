import React from 'react';
import { useI18n } from '../../lib/i18n';
import { Search } from 'lucide-react';

export function EmptyState({ message }: { message?: string }) {
  const { t } = useI18n();
  return (
    <div className="flex flex-col items-center justify-center py-20 px-4 text-center">
      <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center mb-4 text-primary">
        <Search className="w-8 h-8" />
      </div>
      <h3 className="text-lg font-semibold text-foreground mb-2">
        {message || t('common.noData')}
      </h3>
      <p className="text-sm text-muted-foreground max-w-xs">
        Check back soon for updates from the association.
      </p>
    </div>
  );
}
