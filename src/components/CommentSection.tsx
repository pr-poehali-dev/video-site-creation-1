import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import Icon from '@/components/ui/icon';

interface Comment {
  id: number;
  author: string;
  avatar?: string;
  text: string;
  likes: number;
  dislikes: number;
  timeAgo: string;
  isLiked?: boolean;
  isDisliked?: boolean;
}

const initialComments: Comment[] = [
  {
    id: 1,
    author: 'Алексей Петров',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=alex',
    text: 'Отличное видео! Очень помогло разобраться с темой. Спасибо за качественный контент!',
    likes: 234,
    dislikes: 2,
    timeAgo: '2 часа назад',
  },
  {
    id: 2,
    author: 'Мария Иванова',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=maria',
    text: 'Можно ли получить исходный код из видео? Было бы очень полезно для практики.',
    likes: 89,
    dislikes: 1,
    timeAgo: '5 часов назад',
  },
  {
    id: 3,
    author: 'Дмитрий Соколов',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=dmitry',
    text: 'Супер объяснение! Продолжайте в том же духе 🔥',
    likes: 156,
    dislikes: 0,
    timeAgo: '1 день назад',
  },
];

export function CommentSection() {
  const [comments, setComments] = useState<Comment[]>(initialComments);
  const [newComment, setNewComment] = useState('');
  const [sortBy, setSortBy] = useState<'popular' | 'recent'>('popular');

  const handleLike = (id: number) => {
    setComments(prev => prev.map(comment => {
      if (comment.id === id) {
        if (comment.isLiked) {
          return { ...comment, likes: comment.likes - 1, isLiked: false };
        } else {
          return {
            ...comment,
            likes: comment.likes + 1,
            dislikes: comment.isDisliked ? comment.dislikes - 1 : comment.dislikes,
            isLiked: true,
            isDisliked: false,
          };
        }
      }
      return comment;
    }));
  };

  const handleDislike = (id: number) => {
    setComments(prev => prev.map(comment => {
      if (comment.id === id) {
        if (comment.isDisliked) {
          return { ...comment, dislikes: comment.dislikes - 1, isDisliked: false };
        } else {
          return {
            ...comment,
            dislikes: comment.dislikes + 1,
            likes: comment.isLiked ? comment.likes - 1 : comment.likes,
            isDisliked: true,
            isLiked: false,
          };
        }
      }
      return comment;
    }));
  };

  const handleAddComment = () => {
    if (newComment.trim()) {
      const comment: Comment = {
        id: Date.now(),
        author: 'Вы',
        text: newComment,
        likes: 0,
        dislikes: 0,
        timeAgo: 'только что',
      };
      setComments([comment, ...comments]);
      setNewComment('');
    }
  };

  const sortedComments = [...comments].sort((a, b) => {
    if (sortBy === 'popular') {
      return (b.likes - b.dislikes) - (a.likes - a.dislikes);
    }
    return 0;
  });

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <h3 className="text-2xl font-bold flex items-center gap-2">
          <Icon name="MessageSquare" size={28} className="text-primary" />
          {comments.length} комментариев
        </h3>
        <div className="flex gap-2">
          <Button
            variant={sortBy === 'popular' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSortBy('popular')}
            className="transition-all"
          >
            <Icon name="TrendingUp" size={16} className="mr-2" />
            Популярные
          </Button>
          <Button
            variant={sortBy === 'recent' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSortBy('recent')}
            className="transition-all"
          >
            <Icon name="Clock" size={16} className="mr-2" />
            Новые
          </Button>
        </div>
      </div>

      <Card className="p-4 bg-card border-border">
        <div className="flex gap-4">
          <Avatar className="h-10 w-10 ring-2 ring-primary/20">
            <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=user" />
            <AvatarFallback className="bg-gradient-primary text-white font-bold">Вы</AvatarFallback>
          </Avatar>
          <div className="flex-1 space-y-3">
            <Textarea
              placeholder="Написать комментарий..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="resize-none bg-muted border-border focus:border-primary transition-colors"
              rows={3}
            />
            <div className="flex justify-end gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setNewComment('')}
                disabled={!newComment.trim()}
              >
                Отмена
              </Button>
              <Button
                size="sm"
                onClick={handleAddComment}
                disabled={!newComment.trim()}
                className="bg-primary hover:bg-primary/90"
              >
                <Icon name="Send" size={16} className="mr-2" />
                Опубликовать
              </Button>
            </div>
          </div>
        </div>
      </Card>

      <Separator className="bg-border" />

      <div className="space-y-4">
        {sortedComments.map((comment) => (
          <Card key={comment.id} className="p-4 bg-card border-border hover-lift transition-all">
            <div className="flex gap-4">
              <Avatar className="h-10 w-10 flex-shrink-0 ring-2 ring-primary/20">
                <AvatarImage src={comment.avatar} />
                <AvatarFallback className="bg-gradient-primary text-white font-bold">
                  {comment.author.charAt(0)}
                </AvatarFallback>
              </Avatar>
              
              <div className="flex-1 space-y-2">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-foreground">{comment.author}</span>
                  <span className="text-sm text-muted-foreground">{comment.timeAgo}</span>
                </div>
                
                <p className="text-foreground leading-relaxed">{comment.text}</p>
                
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    className={`hover:bg-primary/10 transition-all ${
                      comment.isLiked ? 'text-primary' : 'text-muted-foreground'
                    }`}
                    onClick={() => handleLike(comment.id)}
                  >
                    <Icon name="ThumbsUp" size={16} className="mr-1" />
                    {comment.likes}
                  </Button>
                  
                  <Button
                    variant="ghost"
                    size="sm"
                    className={`hover:bg-destructive/10 transition-all ${
                      comment.isDisliked ? 'text-destructive' : 'text-muted-foreground'
                    }`}
                    onClick={() => handleDislike(comment.id)}
                  >
                    <Icon name="ThumbsDown" size={16} className="mr-1" />
                    {comment.dislikes > 0 ? comment.dislikes : ''}
                  </Button>
                  
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-muted-foreground hover:text-foreground hover:bg-primary/10 ml-2"
                  >
                    <Icon name="MessageCircle" size={16} className="mr-1" />
                    Ответить
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
