import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Icon from '@/components/ui/icon';

interface NavbarProps {
  onSearch?: (query: string) => void;
}

export function Navbar({ onSearch }: NavbarProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch?.(searchQuery);
  };

  return (
    <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between gap-4">
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-primary flex items-center justify-center">
              <Icon name="Play" size={24} className="text-white" />
            </div>
            <span className="text-2xl font-bold gradient-text hidden sm:block">VideoHub</span>
          </div>
        </div>

        <form onSubmit={handleSearch} className="flex-1 max-w-2xl">
          <div className="relative">
            <Icon name="Search" size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Искать видео..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 bg-muted border-border focus:border-primary transition-colors"
            />
          </div>
        </form>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="hover:bg-primary/10">
            <Icon name="Upload" size={22} />
          </Button>
          <Button variant="ghost" size="icon" className="hover:bg-primary/10">
            <Icon name="Bell" size={22} />
          </Button>
          <Avatar className="h-9 w-9 ring-2 ring-primary/20 cursor-pointer hover:ring-primary transition-all">
            <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=user" />
            <AvatarFallback className="bg-gradient-primary text-white font-bold">У</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </nav>
  );
}
