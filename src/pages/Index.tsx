import { useState } from 'react';
import { Navbar } from '@/components/Navbar';
import { Sidebar } from '@/components/Sidebar';
import { VideoCard } from '@/components/VideoCard';
import { VideoPlayer } from '@/components/VideoPlayer';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';

const videoData = [
  {
    id: 1,
    title: 'Создание современных веб-приложений с React и TypeScript',
    channel: 'WebDev Pro',
    views: '1.2M просмотров',
    duration: '15:24',
    quality: '1080p',
    thumbnail: 'https://cdn.poehali.dev/projects/9b75bb50-94a9-4588-8ffa-1df0b3f7da4a/files/49cd900e-9966-4bc1-9ac1-5b1f6cfe49fa.jpg',
  },
  {
    id: 2,
    title: 'Полный курс по дизайну интерфейсов 2024',
    channel: 'Design Academy',
    views: '856K просмотров',
    duration: '28:15',
    quality: '4K',
    thumbnail: 'https://cdn.poehali.dev/projects/9b75bb50-94a9-4588-8ffa-1df0b3f7da4a/files/49cd900e-9966-4bc1-9ac1-5b1f6cfe49fa.jpg',
  },
  {
    id: 3,
    title: 'Топ 10 трендов в веб-разработке',
    channel: 'Tech Trends',
    views: '2.4M просмотров',
    duration: '12:45',
    quality: '1080p',
    thumbnail: 'https://cdn.poehali.dev/projects/9b75bb50-94a9-4588-8ffa-1df0b3f7da4a/files/49cd900e-9966-4bc1-9ac1-5b1f6cfe49fa.jpg',
  },
  {
    id: 4,
    title: 'Мастер-класс по анимациям в CSS',
    channel: 'Animation Studio',
    views: '645K просмотров',
    duration: '22:30',
    quality: '720p',
    thumbnail: 'https://cdn.poehali.dev/projects/9b75bb50-94a9-4588-8ffa-1df0b3f7da4a/files/49cd900e-9966-4bc1-9ac1-5b1f6cfe49fa.jpg',
  },
  {
    id: 5,
    title: 'Как стать Frontend разработчиком за 3 месяца',
    channel: 'Code Journey',
    views: '3.2M просмотров',
    duration: '18:50',
    quality: '1080p',
    thumbnail: 'https://cdn.poehali.dev/projects/9b75bb50-94a9-4588-8ffa-1df0b3f7da4a/files/49cd900e-9966-4bc1-9ac1-5b1f6cfe49fa.jpg',
  },
  {
    id: 6,
    title: 'Секреты оптимизации производительности',
    channel: 'Performance Guru',
    views: '924K просмотров',
    duration: '25:10',
    quality: '1080p',
    thumbnail: 'https://cdn.poehali.dev/projects/9b75bb50-94a9-4588-8ffa-1df0b3f7da4a/files/49cd900e-9966-4bc1-9ac1-5b1f6cfe49fa.jpg',
  },
];

export default function Index() {
  const [activeSection, setActiveSection] = useState('home');
  const [selectedVideo, setSelectedVideo] = useState<number | null>(null);
  const [filterQuality, setFilterQuality] = useState<string>('all');

  const filteredVideos = filterQuality === 'all' 
    ? videoData 
    : videoData.filter(v => v.quality === filterQuality);

  const selectedVideoData = videoData.find(v => v.id === selectedVideo);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      
      <div className="flex flex-1 overflow-hidden">
        <Sidebar activeSection={activeSection} onSectionChange={setActiveSection} />
        
        <main className="flex-1 overflow-y-auto">
          <div className="container mx-auto px-6 py-8">
            {selectedVideo && selectedVideoData ? (
              <div className="max-w-6xl mx-auto animate-fade-in">
                <VideoPlayer
                  title={selectedVideoData.title}
                  thumbnail={selectedVideoData.thumbnail}
                  onClose={() => setSelectedVideo(null)}
                />
                
                <div className="mt-8">
                  <h3 className="text-2xl font-bold mb-6 gradient-text">Похожие видео</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {videoData.filter(v => v.id !== selectedVideo).slice(0, 3).map((video) => (
                      <VideoCard
                        key={video.id}
                        {...video}
                        onClick={() => setSelectedVideo(video.id)}
                      />
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <>
                <div className="mb-8">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h1 className="text-4xl font-bold gradient-text mb-2">
                        {activeSection === 'home' && 'Рекомендации'}
                        {activeSection === 'import' && 'Перенести из YouTube'}
                        {activeSection === 'subscriptions' && 'Подписки'}
                        {activeSection === 'library' && 'Библиотека'}
                        {activeSection === 'account' && 'Аккаунт'}
                      </h1>
                      <p className="text-muted-foreground">
                        Лучшие видео специально для вас
                      </p>
                    </div>
                  </div>

                  {activeSection === 'home' && (
                    <Tabs defaultValue="all" className="mb-6">
                      <TabsList className="bg-muted">
                        <TabsTrigger 
                          value="all" 
                          onClick={() => setFilterQuality('all')}
                          className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                        >
                          <Icon name="Grid3x3" size={16} className="mr-2" />
                          Все видео
                        </TabsTrigger>
                        <TabsTrigger 
                          value="4k"
                          onClick={() => setFilterQuality('4K')}
                          className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                        >
                          <Icon name="Sparkles" size={16} className="mr-2" />
                          4K качество
                        </TabsTrigger>
                        <TabsTrigger 
                          value="1080p"
                          onClick={() => setFilterQuality('1080p')}
                          className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                        >
                          <Icon name="Zap" size={16} className="mr-2" />
                          Full HD
                        </TabsTrigger>
                      </TabsList>
                    </Tabs>
                  )}

                  {activeSection === 'import' && (
                    <div className="bg-card border border-border rounded-lg p-8 text-center max-w-2xl mx-auto mb-8 animate-fade-in">
                      <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                        <Icon name="Download" size={32} className="text-white" />
                      </div>
                      <h3 className="text-2xl font-bold mb-2">Импорт из YouTube</h3>
                      <p className="text-muted-foreground mb-6">
                        Перенесите свои любимые видео и плейлисты
                      </p>
                      <Button className="bg-primary hover:bg-primary/90 font-semibold">
                        <Icon name="Youtube" size={20} className="mr-2" />
                        Подключить YouTube
                      </Button>
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredVideos.map((video) => (
                    <VideoCard
                      key={video.id}
                      {...video}
                      onClick={() => setSelectedVideo(video.id)}
                    />
                  ))}
                </div>
              </>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
