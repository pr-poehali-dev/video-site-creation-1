import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Icon from '@/components/ui/icon';

interface VideoCardProps {
  title: string;
  channel: string;
  views: string;
  duration: string;
  thumbnail: string;
  channelAvatar?: string;
  quality?: string;
  onClick?: () => void;
}

export function VideoCard({
  title,
  channel,
  views,
  duration,
  thumbnail,
  channelAvatar,
  quality = '1080p',
  onClick
}: VideoCardProps) {
  return (
    <Card 
      className="bg-card border-border overflow-hidden cursor-pointer group hover-lift card-glow transition-all duration-300"
      onClick={onClick}
    >
      <div className="relative aspect-video overflow-hidden">
        <img 
          src={thumbnail} 
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <Badge className="absolute bottom-2 right-2 bg-black/80 text-white border-0">
          {duration}
        </Badge>
        <Badge className="absolute top-2 left-2 bg-primary text-primary-foreground border-0 font-semibold">
          {quality}
        </Badge>
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="bg-primary/90 rounded-full p-4 animate-scale-in">
            <Icon name="Play" size={32} className="text-white" />
          </div>
        </div>
      </div>
      
      <div className="p-4">
        <div className="flex gap-3">
          <Avatar className="h-10 w-10 flex-shrink-0 ring-2 ring-primary/20">
            <AvatarImage src={channelAvatar} />
            <AvatarFallback className="bg-gradient-primary text-white font-bold">
              {channel.charAt(0)}
            </AvatarFallback>
          </Avatar>
          
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-foreground line-clamp-2 group-hover:text-primary transition-colors duration-200 mb-1">
              {title}
            </h3>
            <p className="text-sm text-muted-foreground font-medium">{channel}</p>
            <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
              <span className="flex items-center gap-1">
                <Icon name="Eye" size={12} />
                {views}
              </span>
              <span>•</span>
              <span>2 дня назад</span>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
