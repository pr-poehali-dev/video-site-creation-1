import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const qualityOptions = ['360p', '720p', '1080p', '4K'];

interface VideoPlayerProps {
  title: string;
  thumbnail: string;
  onClose?: () => void;
}

export function VideoPlayer({ title, thumbnail, onClose }: VideoPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [quality, setQuality] = useState('1080p');
  const [volume, setVolume] = useState([70]);
  const [progress, setProgress] = useState([0]);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [likes, setLikes] = useState(45234);
  const [dislikes, setDislikes] = useState(892);
  const [isLiked, setIsLiked] = useState(false);
  const [isDisliked, setIsDisliked] = useState(false);

  const handleLike = () => {
    if (isLiked) {
      setLikes(prev => prev - 1);
      setIsLiked(false);
    } else {
      setLikes(prev => prev + 1);
      setIsLiked(true);
      if (isDisliked) {
        setDislikes(prev => prev - 1);
        setIsDisliked(false);
      }
    }
  };

  const handleDislike = () => {
    if (isDisliked) {
      setDislikes(prev => prev - 1);
      setIsDisliked(false);
    } else {
      setDislikes(prev => prev + 1);
      setIsDisliked(true);
      if (isLiked) {
        setLikes(prev => prev - 1);
        setIsLiked(false);
      }
    }
  };

  return (
    <Card className="bg-card border-border overflow-hidden animate-fade-in">
      <div className="relative aspect-video bg-black group">
        <img 
          src={thumbnail} 
          alt={title}
          className={`w-full h-full object-cover ${isPlaying ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}
        />
        
        {!isPlaying && (
          <div className="absolute inset-0 flex items-center justify-center">
            <Button
              size="lg"
              className="bg-primary hover:bg-primary/90 rounded-full w-20 h-20 animate-pulse-glow"
              onClick={() => setIsPlaying(true)}
            >
              <Icon name="Play" size={40} />
            </Button>
          </div>
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          {onClose && (
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-4 right-4 bg-black/50 hover:bg-black/70 text-white"
              onClick={onClose}
            >
              <Icon name="X" size={24} />
            </Button>
          )}
          
          <div className="absolute bottom-0 left-0 right-0 p-6">
            <Slider
              value={progress}
              onValueChange={setProgress}
              max={100}
              step={1}
              className="mb-4 cursor-pointer"
            />
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-white hover:bg-white/20"
                  onClick={() => setIsPlaying(!isPlaying)}
                >
                  <Icon name={isPlaying ? "Pause" : "Play"} size={24} />
                </Button>
                
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-white hover:bg-white/20"
                  onClick={() => setIsMuted(!isMuted)}
                >
                  <Icon name={isMuted ? "VolumeX" : "Volume2"} size={24} />
                </Button>
                
                <Slider
                  value={volume}
                  onValueChange={setVolume}
                  max={100}
                  step={1}
                  className="w-24"
                />
                
                <span className="text-white text-sm font-medium">
                  0:00 / 10:45
                </span>
              </div>
              
              <div className="flex items-center gap-3">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="text-white hover:bg-white/20">
                      <Icon name="Settings" size={20} className="mr-2" />
                      {quality}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="bg-card border-border">
                    {qualityOptions.map((q) => (
                      <DropdownMenuItem
                        key={q}
                        onClick={() => setQuality(q)}
                        className={`cursor-pointer ${quality === q ? 'bg-primary text-primary-foreground' : ''}`}
                      >
                        <Icon name="Sparkles" size={16} className="mr-2" />
                        {q}
                        {quality === q && <Icon name="Check" size={16} className="ml-auto" />}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
                
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-white hover:bg-white/20"
                  onClick={() => setIsFullscreen(!isFullscreen)}
                >
                  <Icon name={isFullscreen ? "Minimize" : "Maximize"} size={20} />
                </Button>
              </div>
            </div>
          </div>
        </div>

        <Badge className="absolute top-4 left-4 bg-primary text-primary-foreground font-bold animate-fade-in">
          <Icon name="Zap" size={14} className="mr-1" />
          Качество: {quality}
        </Badge>
      </div>
      
      <div className="p-6 bg-card/50 backdrop-blur-sm space-y-4">
        <div>
          <h2 className="text-2xl font-bold gradient-text mb-2">{title}</h2>
          <div className="flex items-center gap-4 text-muted-foreground text-sm">
            <span className="flex items-center gap-1">
              <Icon name="Eye" size={16} />
              1.2M просмотров
            </span>
            <span className="flex items-center gap-1">
              <Icon name="Calendar" size={16} />
              2 дня назад
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            className={`transition-all hover-lift ${
              isLiked 
                ? 'bg-primary text-primary-foreground border-primary hover:bg-primary/90' 
                : 'hover:bg-primary/10 border-border'
            }`}
            onClick={handleLike}
          >
            <Icon name="ThumbsUp" size={20} className="mr-2" />
            {likes.toLocaleString()}
          </Button>
          
          <Button
            variant="outline"
            className={`transition-all hover-lift ${
              isDisliked 
                ? 'bg-destructive text-destructive-foreground border-destructive hover:bg-destructive/90' 
                : 'hover:bg-destructive/10 border-border'
            }`}
            onClick={handleDislike}
          >
            <Icon name="ThumbsDown" size={20} className="mr-2" />
            {dislikes.toLocaleString()}
          </Button>

          <Button
            variant="outline"
            className="hover:bg-primary/10 border-border hover-lift transition-all"
          >
            <Icon name="Share2" size={20} className="mr-2" />
            Поделиться
          </Button>

          <Button
            variant="outline"
            className="hover:bg-primary/10 border-border hover-lift transition-all ml-auto"
          >
            <Icon name="BookmarkPlus" size={20} className="mr-2" />
            Сохранить
          </Button>
        </div>
      </div>
    </Card>
  );
}