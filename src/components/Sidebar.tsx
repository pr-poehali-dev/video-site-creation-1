import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

interface SidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

const menuItems = [
  { id: 'home', label: 'Главная', icon: 'Home' },
  { id: 'import', label: 'Перенести из YouTube', icon: 'Download' },
  { id: 'subscriptions', label: 'Подписки', icon: 'Users', badge: '12' },
  { id: 'library', label: 'Библиотека', icon: 'Library' },
  { id: 'account', label: 'Аккаунт', icon: 'User' },
];

const categories = [
  { id: 'trending', label: 'В тренде', icon: 'TrendingUp' },
  { id: 'music', label: 'Музыка', icon: 'Music' },
  { id: 'gaming', label: 'Игры', icon: 'Gamepad2' },
  { id: 'news', label: 'Новости', icon: 'Newspaper' },
  { id: 'sports', label: 'Спорт', icon: 'Trophy' },
];

export function Sidebar({ activeSection, onSectionChange }: SidebarProps) {
  return (
    <aside className="w-64 bg-card border-r border-border flex flex-col">
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-1 mb-6">
          {menuItems.map((item) => (
            <Button
              key={item.id}
              variant={activeSection === item.id ? 'default' : 'ghost'}
              className={`w-full justify-start gap-3 hover:bg-primary/10 transition-all ${
                activeSection === item.id 
                  ? 'bg-primary text-primary-foreground hover:bg-primary/90' 
                  : 'text-foreground'
              }`}
              onClick={() => onSectionChange(item.id)}
            >
              <Icon name={item.icon as any} size={20} />
              <span className="flex-1 text-left font-medium">{item.label}</span>
              {item.badge && (
                <Badge className="bg-secondary text-secondary-foreground">
                  {item.badge}
                </Badge>
              )}
            </Button>
          ))}
        </div>

        <div className="border-t border-border pt-4">
          <h3 className="px-3 mb-3 text-sm font-semibold text-muted-foreground uppercase tracking-wider">
            Категории
          </h3>
          <div className="space-y-1">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant="ghost"
                className="w-full justify-start gap-3 hover:bg-primary/10 text-foreground transition-all hover-lift"
              >
                <Icon name={category.icon as any} size={20} />
                <span className="font-medium">{category.label}</span>
              </Button>
            ))}
          </div>
        </div>

        <div className="mt-6 p-4 rounded-lg bg-gradient-primary animate-fade-in">
          <Icon name="Sparkles" size={24} className="text-white mb-2" />
          <h4 className="font-bold text-white mb-1">Premium доступ</h4>
          <p className="text-white/80 text-sm mb-3">
            Смотрите без рекламы и скачивайте видео
          </p>
          <Button variant="secondary" className="w-full bg-white text-primary hover:bg-white/90 font-semibold">
            Попробовать
          </Button>
        </div>
      </ScrollArea>
    </aside>
  );
}
