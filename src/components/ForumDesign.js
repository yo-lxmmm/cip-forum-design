import React, { useState, useEffect } from 'react';
import { 
    Search, MessageSquare, Home, Book, Code, Info, ChevronRight,
    Heart, Filter, ArrowUp, X, User, Bookmark, Bot, Reply, Bell, Eye
  } from 'lucide-react';
// import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Textarea } from '@/components/ui/textarea';
// import { Select } from '@/components/ui/select';

const ForumDesign = () => {
    // Core States
    const [showBackToTop, setShowBackToTop] = useState(false);
    const [activeFilter, setActiveFilter] = useState('Recent');
    const [searchTerm, setSearchTerm] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [replyContent, setReplyContent] = useState('');
  
    // Advanced Features States
    const [selectedPost, setSelectedPost] = useState(null);
    const [showFilterModal, setShowFilterModal] = useState(false);
    const [selectedTags, setSelectedTags] = useState([]);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [showUserSpace, setShowUserSpace] = useState(false);
    const [selectedThreads, setSelectedThreads] = useState([]);
    const [showAISummary, setShowAISummary] = useState(false);
    const [notifications, setNotifications] = useState([]);
    const [savedThreads, setSavedThreads] = useState([]);
    const [showNotifications, setShowNotifications] = useState(false);

    // Data Constants
    const tags = [
        "python", "javascript", "beginner", "karel", "debugging",
        "functions", "loops", "recursion", "arrays", "graphics"
    ];

    const categories = [
        "Questions", "Help Wanted", "Bug", "Discussion",
        "Project Showcase", "Resources", "Announcements"
    ];

    // Sample Posts Data
    const [posts, setPosts] = useState([
        {
            id: 3,
            title: "Change velocity for Breakout game",
            author: "Anonymous",
            content: "How do I change the velocity of the ball in the Breakout game?",
            replies: [
            ],
            likes: 1,
            solved: false,
            unread: false,
            category: "Questions",
            tags: ["python", "breakout"],
            timestamp: "30 min ago",
            views: 2,
            bookmarked: false
        },

        {
            id: 1,
            title: "Need help understanding recursion in Python",
            author: "Alicia J",
            content: "I'm struggling to understand how recursion works. Can someone explain with a simple example?",
            replies: [
                {
                    id: 1,
                    author: "Chris P",
                    content: "Recursion is when a function calls itself. Let's look at a simple example...",
                    timestamp: "2h ago",
                    likes: 5,
                },
                {
                    id: 2,
                    author: "Sarah T",
                    content: "Here's another way to think about it...",
                    timestamp: "1h ago",
                    likes: 3,
                }
            ],
            likes: 2,
            solved: true,
            unread: true,
            category: "Questions",
            tags: ["python", "recursion", "beginner"],
            timestamp: "3h ago",
            views: 45,
            bookmarked: false
        },
        // Add more sample posts as needed

        {
            id: 2,
            title: "Karel Midpoint Solution Tips",
            author: "Jessie F",
            content: "Here are some tips on approaches to the Karel midpoint problem!",
            replies: [
                {
                    id: 1,
                    author: "Jack",
                    content: "Thanks so much!",
                    timestamp: "2h ago",
                    likes: 5,
                },
                {
                    id: 2,
                    author: "Angela",
                    content: "Yesss, thank you!",
                    timestamp: "1h ago",
                    likes: 3,
                },
                {
                    id: 3,
                    author: "Eric",
                    content: "This is super helpful!",
                    timestamp: "30min ago",
                    likes: 3,
                }
            ],
            likes: 15,
            solved: true,
            unread: false,
            category: "Discussion",
            tags: ["python", "karel", "beginner"],
            timestamp: "5h ago",
            views: 20,
            bookmarked: true
        },
    ]);

    useEffect(() => {
        const handleScroll = () => {
            setShowBackToTop(window.scrollY > 200);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);
    const PostDetail = ({ post, onClose }) => (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-4xl h-[80vh] overflow-y-auto">
                <div className="flex justify-between items-start mb-6">
                    <div>
                        <h2 className="text-2xl font-semibold mb-2">{post.title}</h2>
                        <div className="flex gap-2 items-center text-sm text-gray-500">
                            <span>Posted by {post.author}</span>
                            <span>•</span>
                            <span>{post.timestamp}</span>
                            <span>• {post.views} views</span>
                            {post.tags.map(tag => (
                                <span key={tag} className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs">
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => setSavedThreads(prev =>
                                post.bookmarked ? prev.filter(p => p.id !== post.id) : [...prev, post]
                            )}
                            className="p-2 hover:bg-gray-100 rounded"
                        >
                            <Bookmark className={`w-5 h-5 ${post.bookmarked ? 'fill-current' : ''}`} />
                        </button>
                        <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded">
                            <X className="w-6 h-6" />
                        </button>
                    </div>
                </div>
        
                <div className="mb-8 bg-gray-50 p-4 rounded-lg">
                    <p className="text-gray-800">{post.content}</p>
                </div>
  
                <div className="space-y-4">
                    <h3 className="font-semibold text-lg">Replies ({post.replies.length})</h3>
                    {post.replies.map(reply => (
                        <div key={reply.id} className="bg-white border rounded-lg p-4">
                            <div className="flex justify-between items-start mb-2">
                                <span className="font-medium">{reply.author}</span>
                                <span className="text-sm text-gray-500">{reply.timestamp}</span>
                            </div>
                            <p className="text-gray-800">{reply.content}</p>
                            <div className="flex items-center gap-4 mt-2">
                                <button className="flex items-center gap-1 text-gray-500 hover:text-blue-600">
                                    <Heart className="w-4 h-4" />
                                    <span className="text-sm">{reply.likes}</span>
                                </button>
                                <button className="flex items-center gap-1 text-gray-500 hover:text-blue-600">
                                    <Reply className="w-4 h-4" />
                                    <span className="text-sm">Reply</span>
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
  
                <div className="mt-6">
                <textarea
                    value={replyContent}
                    onChange={(e) => setReplyContent(e.target.value)}
                    placeholder="Write your reply..."
                    rows="3"
                    className="w-full border rounded p-2 focus:ring-2 focus:ring-blue-500"
                />
                    <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                        Post Reply
                    </button>
                </div>
            </div>
        </div>
    );
  
    const FilterModal = ({ onClose }) => (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-2xl">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-semibold">Filter Posts</h2>
                    <button onClick={onClose}><X className="w-6 h-6" /></button>
                </div>
  
                <div className="space-y-6">
                    <div>
                        <h3 className="font-medium mb-2">Categories</h3>
                        <div className="flex flex-wrap gap-2">
                            {categories.map(category => (
                                <button
                                    key={category}
                                    onClick={() => setSelectedCategories(prev =>
                                        prev.includes(category) ? prev.filter(c => c !== category) : [...prev, category]
                                    )}
                                    className={`px-3 py-1.5 rounded ${selectedCategories.includes(category)
                                        ? 'bg-blue-100 text-blue-700'
                                        : 'bg-gray-100 text-gray-700'
                                        }`}
                                >
                                    {category}
                                </button>
                            ))}
                        </div>
                    </div>
  
                    <div>
                        <h3 className="font-medium mb-2">Tags</h3>
                        <div className="flex flex-wrap gap-2">
                            {tags.map(tag => (
                                <button
                                    key={tag}
                                    onClick={() => setSelectedTags(prev =>
                                        prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
                                    )}
                                    className={`px-3 py-1.5 rounded ${selectedTags.includes(tag)
                                        ? 'bg-blue-100 text-blue-700'
                                        : 'bg-gray-100 text-gray-700'
                                        }`}
                                >
                                    {tag}
                                </button>
                            ))}
                        </div>
                    </div>
  
                    <div>
                        <h3 className="font-medium mb-2">Additional Filters</h3>
                        <div className="space-y-2">
                            <label className="flex items-center gap-2">
                                <input type="checkbox" className="rounded" />
                                <span>Only show solved posts</span>
                            </label>
                            <label className="flex items-center gap-2">
                                <input type="checkbox" className="rounded" />
                                <span>Only show posts with replies</span>
                            </label>
                        </div>
                    </div>
  
                    <div className="flex justify-end gap-2">
                        <button variant="outline" onClick={() => {
                            setSelectedTags([]);
                            setSelectedCategories([]);
                        }}>
                            Reset
                        </button>
                        <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                            Apply Filters
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
  
    const AISummaryModal = ({ threads, onClose }) => (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-2xl">
                <div className="flex justify-between items-center mb-6">
                    <div className="flex items-center gap-2">
                        <Bot className="w-6 h-6 text-blue-600" />
                        <h2 className="text-xl font-semibold">AI Summary</h2>
                    </div>
                    <button onClick={onClose}><X className="w-6 h-6" /></button>
                </div>
  
                <div className="bg-gray-50 p-4 rounded-lg mb-4">
                    <h3 className="font-medium mb-2">Selected Threads:</h3>
                    <ul className="list-disc pl-4 space-y-1">
                        {threads.map(thread => (
                            <li key={thread.id}>{thread.title}</li>
                        ))}
                    </ul>
                </div>
  
                <div className="bg-blue-50 p-4 rounded-lg mb-6">
                    <h3 className="font-medium mb-2">AI Generated Summary:</h3>
                    <p className="text-gray-700">
                        These discussions focus on Python programming concepts, particularly recursion and debugging.
                        Key points include:
                        - Basic recursion examples and common pitfalls
                        - Debugging techniques for recursive functions
                        - Best practices for implementation
                    </p>
                </div>
  
                <div className="flex justify-end gap-2">
                    <button variant="outline" onClick={onClose}>Close</button>
                    <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                        Save Summary
                    </button>
                </div>
            </div>
        </div>
    );
    
    const UserSpace = ({ onClose }) => (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-4xl h-[80vh] overflow-y-auto">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-semibold">Your Space</h2>
                    <button onClick={onClose}><X className="w-6 h-6" /></button>
                </div>
  
                <div className="grid grid-cols-3 gap-4 mb-6">
                    <div className="bg-white rounded-lg shadow p-4">
                        <div className="mb-4">
                            <h3 className="text-lg font-semibold">Activity Overview</h3>
                        </div>
                        <div>
                            <div className="space-y-2">
                                <div className="flex justify-between">
                                    <span>Questions Asked</span>
                                    <span className="font-medium">12</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Answers Given</span>
                                    <span className="font-medium">28</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Helpful Votes</span>
                                    <span className="font-medium">45</span>
                                </div>
                            </div>
                        </div>
                    </div>
  
                    <div className="bg-white rounded-lg shadow p-4">
                        <div className="mb-4">
                            <h3 className="text-lg font-semibold">Recent Activity</h3>
                        </div>
                        <div>
                            <div className="space-y-2">
                                {posts.slice(0, 3).map(post => (
                                    <div key={post.id} className="flex items-center gap-2">
                                        <div className="w-2 h-2 bg-blue-500 rounded-full" />
                                        <span className="text-sm truncate">{post.title}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow p-4">
                        <div className="mb-4">
                            <h3 className="text-lg font-semibold">Saved Items</h3>
                        </div>
                        <div>
                            <SavedItemsList />
                        </div>
                    </div>
  
                    {/* <div className="bg-white rounded-lg shadow p-4">
                        <div className="mb-4">
                            <h3 className="text-lg font-semibold">Saved Items</h3>
                        </div>
                        <div>
                            <div className="space-y-2">
                                {savedThreads.map(thread => (
                                    <div key={thread.id} className="flex items-center justify-between">
                                        <span className="text-sm truncate">{thread.title}</span>
                                        <button onClick={() => setSavedThreads(prev =>
                                            prev.filter(t => t.id !== thread.id)
                                        )}>
                                            <X className="w-4 h-4" />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div> */}
                </div>
  
                <div className="space-y-4">
                    <div className="flex gap-4">
                        <button className="px-4 py-2 bg-blue-100 text-blue-700 rounded">Your Questions</button>
                        <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded">Your Answers</button>
                        <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded">Saved Threads</button>
                    </div>
  
                    <div className="space-y-4">
                        {posts.map(post => (
                            <div key={post.id} className="border rounded-lg p-4">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h3 className="font-medium">{post.title}</h3>
                                        <p className="text-sm text-gray-500">{post.timestamp}</p>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="text-sm text-gray-600">{post.replies.length} replies</span>
                                        <span className="text-sm text-gray-600">{post.likes} likes</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
  
    const MainLayout = ({ children }) => (
        <div className="flex h-screen bg-gray-50">
            <aside className="w-64 bg-white shadow-sm p-4 space-y-4">
                <div className="flex items-center gap-2 mb-8">
                    <h1 className="text-xl font-semibold">Code In Place</h1>
                </div>
        
                <nav className="space-y-2">
                    {[
                        { icon: <Home className="w-5 h-5" />, label: "Home" },
                        { icon: <Book className="w-5 h-5" />, label: "Lessons" },
                        { icon: <Code className="w-5 h-5" />, label: "Code" },
                        { icon: <MessageSquare className="w-5 h-5" />, label: "Forum" },
                        // { icon: <User className="w-5 h-5" />, label: "Your Space", onClick: () => setShowUserSpace(true) },
                        { icon: <Info className="w-5 h-5" />, label: "About" }
                    ].map(item => (
                        <a
                            key={item.label}
                            onClick={item.onClick}
                            className="flex items-center gap-3 p-2 rounded hover:bg-blue-50 text-gray-700 hover:text-blue-600 cursor-pointer"
                        >
                            {item.icon}
                            <span>{item.label}</span>
                        </a>
                    ))}
                </nav>
            </aside>
  
            <main className="flex-1 overflow-auto">
                {children}
            </main>
  
            <aside className="w-64 bg-white shadow-sm p-4">
                <div className="space-y-6">
                    <div>
                        <h2 className="font-semibold mb-4">Upcoming Events</h2>
                        <div className="space-y-4">
                            {[
                                { date: 'MAR 31', title: "Code Workshop", time: '10:00 AM PT' },
                                { date: 'APR 5', title: 'Assignment Due', time: '8:00 PM PT' },
                            ].map(event => (
                                <div key={event.date} className="border-b pb-3">
                                    <div className="text-sm font-medium text-gray-500">{event.date}</div>
                                    <div className="font-medium">{event.title}</div>
                                    <div className="text-sm text-gray-500">{event.time}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                    
                    {/* Add Your Space button at the bottom */}
                    <div className="absolute bottom-4">
                        <button 
                            onClick={() => setShowUserSpace(true)}
                            className="flex items-center gap-2 w-full p-2 rounded hover:bg-blue-50 text-gray-700 hover:text-blue-600"
                        >
                            <User className="w-5 h-5" />
                            <span>Your Space</span>
                        </button>
                    </div>
                </div>
            </aside>
        </div>
    );
    
    const PostList = () => {
        const filteredPosts = posts
            .filter(post => {
                // First apply search/category/tag filters
                if (searchTerm) {
                    return post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           post.author.toLowerCase().includes(searchTerm.toLowerCase());
                }
                if (selectedCategories.length) {
                    return selectedCategories.includes(post.category);
                }
                if (selectedTags.length) {
                    return post.tags.some(tag => selectedTags.includes(tag));
                }
                // If Unanswered is selected, only show unsolved posts
                if (activeFilter === 'Unanswered') {
                    return !post.solved;
                }
                return true;
            })
            .sort((a, b) => {
                switch (activeFilter) {
                    case 'Popular': 
                        return b.likes - a.likes;
                    case 'Recent':
                        return Date.parse(b.timestamp) - Date.parse(a.timestamp);
                    default: 
                        return 0;
                }
            });
    
        return (
            <div className="p-4 space-y-4">
                {filteredPosts.map(post => (
                    <PostCard key={post.id} post={post} />
                ))}
            </div>
        );
    };
  
    const PostCard = ({ post }) => (
        <div className="bg-white p-4 rounded-lg shadow-sm border hover:shadow-md transition-shadow">
            <div className="flex items-start gap-4">
                <input
                    type="checkbox"
                    checked={selectedThreads.includes(post)}
                    onChange={() => setSelectedThreads(prev =>
                        prev.includes(post) ? prev.filter(t => t !== post) : [...prev, post]
                    )}
                    className="mt-1"
                />
                <div className="flex-1" onClick={() => setSelectedPost(post)}>
                    <div className="flex items-center gap-2 mb-1">
                        {post.unread && <div className="w-2 h-2 bg-blue-500 rounded-full" />}
                        <h3 className="font-medium text-lg text-gray-900">{post.title}</h3>
                        {post.solved && (
                            <span className="px-2 py-0.5 bg-green-100 text-green-800 text-sm rounded">
                                Solved
                            </span>
                        )}
                    </div>
                    <div className="flex flex-wrap gap-2 items-center text-sm text-gray-500 mb-2">
                        <span>Posted by {post.author}</span>
                        <span>•</span>
                        <span>{post.timestamp}</span>
                        <span>•</span>
                        <span>{post.category}</span>
                        {post.tags.map(tag => (
                            <span key={tag} className="px-2 py-0.5 bg-gray-100 rounded-full text-xs">
                                {tag}
                            </span>
                        ))}
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1">
                            <MessageSquare className="w-4 h-4 text-gray-400" />
                            <span className="text-sm text-gray-500">{post.replies.length}</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <Heart className="w-4 h-4 text-gray-400" />
                            <span className="text-sm text-gray-500">{post.likes}</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <Eye className="w-4 h-4 text-gray-400" />
                            <span className="text-sm text-gray-500">{post.views}</span>
                        </div>
                        <button
                            onClick={(e) => handleBookmark(post.id, e)}
                            className="ml-auto"
                        >
                            <Bookmark className={`w-4 h-4 ${post.bookmarked ? 'fill-current text-blue-600' : 'text-gray-400'}`} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
  
    const Header = () => (
        <header className="bg-white border-b sticky top-0 z-10 p-4">
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                    <Home className="w-4 h-4 text-gray-500" />
                    <ChevronRight className="w-4 h-4 text-gray-500" />
                    <span className="text-gray-500">Forum</span>
                </div>
                <div className="flex gap-4 items-center">
                    <button onClick={() => setShowNotifications(!showNotifications)} className="relative">
                        <Bell className="w-6 h-6 text-gray-600" />
                        {notifications.length > 0 && (
                            <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-white text-xs flex items-center justify-center">
                                {notifications.length}
                            </span>
                        )}
                    </button>
                    <button onClick={() => setShowModal(true)}
                        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                    >New Post
                    </button>
                    <div className="relative">
                        <Search className="w-5 h-5 absolute left-3 top-2.5 text-gray-400" />
                        <input 
                            type="text"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            placeholder="Search forum..."
                            className="pl-10 pr-4 py-2 border rounded w-64 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                </div>
            </div>
      
            <div className="flex justify-between items-center">
                <div className="flex gap-4 items-center">
                <button onClick={() => setShowFilterModal(true)} className="flex items-center gap-2 px-3 py-2 border rounded hover:bg-gray-50">
                    <Filter className="w-4 h-4" />
                    <span>Filter</span>
                </button>
                    {['Recent', 'Popular', 'Unanswered'].map(filter => (
                        <button
                            key={filter}
                            onClick={() => setActiveFilter(filter)}
                            className={`px-3 py-1.5 rounded ${
                                activeFilter === filter 
                                    ? 'bg-blue-100 text-blue-700' 
                                    : 'hover:bg-gray-100 text-gray-600'
                            }`}
                        >
                            {filter}
                        </button>
                    ))}
                </div>
                {selectedThreads.length > 0 && (
                    <button onClick={() => setShowAISummary(true)} className="flex items-center gap-2">
                        <Bot className="w-4 h-4" />
                        <span>Summarize Selected ({selectedThreads.length})</span>
                   </button>
                )}
            </div>
        </header>
    );
    // Utility Functions
    // const handleSearch = (searchTerm) => {
    //     setSearchTerm(searchTerm);
    //     // Reset filters when searching
    //     setSelectedCategories([]);
    //     setSelectedTags([]);
    // };
    // const handleSearch = (term) => {
    //     setSearchTerm(term);
    //     if (term.length >= 2) {
    //       const filtered = posts.filter(post =>
    //         post.title.toLowerCase().includes(term.toLowerCase()) ||
    //         post.author.toLowerCase().includes(term.toLowerCase())
    //       );
    //       setPosts(filtered);
    //     }
    //   };
    
  
    const handlePostCreation = (formData) => {
        const newPost = {
            id: posts.length + 1,
            ...formData,
            author: "Current User",
            timestamp: "Just now",
            replies: [],
            likes: 0,
            views: 0,
            solved: false,
            unread: false,
            bookmarked: false
        };
        setPosts(prev => [newPost, ...prev]);
        setShowModal(false);
        // Add notification for followers
        setNotifications(prev => [{
            id: Date.now(),
            type: 'new_post',
            content: 'New post created',
            timestamp: new Date()
        }, ...prev]);
    };
  
    const handleReply = (postId, content) => {
        setPosts(prev => prev.map(post => {
            if (post.id === postId) {
                return {
                    ...post,
                    replies: [...post.replies, {
                        id: post.replies.length + 1,
                        author: "Current User",
                        content,
                        timestamp: "Just now",
                        likes: 0
                    }]
                };
            }
            return post;
        }));
    };
  
    const handleLike = (postId, replyId = null) => {
        setPosts(prev => prev.map(post => {
            if (post.id === postId) {
                if (replyId) {
                    return {
                        ...post,
                        replies: post.replies.map(reply =>
                            reply.id === replyId
                                ? { ...reply, likes: reply.likes + 1 }
                                : reply
                        )
                    };
                }
                return { ...post, likes: post.likes + 1 };
            }
            return post;
        }));
    };
  
    // const handleBookmark = (postId) => {
    //     setPosts(prev => prev.map(post => {
    //         if (post.id === postId) {
    //             const newBookmarked = !post.bookmarked;
    //             if (newBookmarked) {
    //                 setSavedThreads(prev => [...prev, post]);
    //             } else {
    //                 setSavedThreads(prev => prev.filter(p => p.id !== post.id));
    //             }
    //             return { ...post, bookmarked: newBookmarked };
    //         }
    //         return post;
    //     }));
    // };

    useEffect(() => {
        const initialBookmarkedPosts = posts.filter(post => post.bookmarked);
        setSavedThreads(initialBookmarkedPosts);
    }, []);

    const SavedItemsList = () => (
        <div className="space-y-2">
            {savedThreads.map(thread => (
                <div key={thread.id} className="flex items-center justify-between">
                    <span className="text-sm truncate">{thread.title}</span>
                    <button 
                        onClick={() => removeFromSaved(thread.id)}
                        className="text-gray-500 hover:text-gray-700"
                    >
                        <X className="w-4 h-4" />
                    </button>
                </div>
            ))}
            {savedThreads.length === 0 && (
                <p className="text-gray-500 text-sm">No saved items yet</p>
            )}
        </div>
    );

    const handleBookmark = (postId, event) => {
        if (event) {
          event.stopPropagation();
        }
        
        setPosts(prev => {
          const updatedPosts = prev.map(post => {
            if (post.id === postId) {
              const newBookmarked = !post.bookmarked;
              
              // Update savedThreads based on the new bookmark state
              if (newBookmarked) {
                setSavedThreads(prevSaved => [...prevSaved, { ...post, bookmarked: true }]);
              } else {
                setSavedThreads(prevSaved => prevSaved.filter(saved => saved.id !== post.id));
              }
              
              return { ...post, bookmarked: newBookmarked };
            }
            return post;
          });
          return updatedPosts;
        });
    };
    
    const removeFromSaved = (threadId) => {
        // Update both savedThreads and posts states
        setSavedThreads(prev => prev.filter(thread => thread.id !== threadId));
        setPosts(prev => prev.map(post => 
            post.id === threadId ? { ...post, bookmarked: false } : post
        ));
    };
  
    const handleBulkAction = (action, posts) => {
        switch (action) {
            case 'mark_read':
                setPosts(prev => prev.map(post =>
                    posts.includes(post) ? { ...post, unread: false } : post
                ));
                break;
            case 'bookmark_all':
                posts.forEach(post => handleBookmark(post.id));
                break;
            case 'summarize':
                setShowAISummary(true);
                break;
        }
        setSelectedThreads([]);
    };

    const NewPostModal = ({ onSubmit, onClose }) => {
        const [selectedTags, setSelectedTags] = useState([]);
        const [newTag, setNewTag] = useState('');
       
        return (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-2xl">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Create New Post</h2>
                <button onClick={onClose}><X className="w-6 h-6" /></button>
              </div>
              <form onSubmit={(e) => {
                e.preventDefault();
                onSubmit({
                  title: e.target.title.value,
                  category: e.target.category.value,
                  content: e.target.content.value,
                  tags: selectedTags
                });
              }} className="space-y-4">
                {/* Existing fields */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                  <input name="title" type="text" className="w-full border rounded p-2" required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                  <select name="category" className="w-full border rounded p-2">
                    {categories.map(category => (
                      <option key={category}>{category}</option>
                    ))}
                  </select>
                </div>
                {/* Tags section */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Tags</label>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {tags.map(tag => (
                      <button
                        type="button"
                        key={tag}
                        onClick={() => setSelectedTags(prev => 
                          prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
                        )}
                        className={`px-2 py-1 rounded-full text-sm ${
                          selectedTags.includes(tag) 
                            ? 'bg-blue-100 text-blue-700' 
                            : 'bg-gray-100 text-gray-700'
                        }`}
                      >
                        {tag}
                      </button>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={newTag}
                      onChange={(e) => setNewTag(e.target.value)}
                      placeholder="Add new tag..."
                      className="flex-1 border rounded p-2"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        if (newTag.trim()) {
                          setSelectedTags(prev => [...prev, newTag.trim()]);
                          setNewTag('');
                        }
                      }}
                      className="px-4 py-2 bg-gray-100 rounded hover:bg-gray-200"
                    >
                      Add Tag
                    </button>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Content</label>
                  <textarea name="content" className="w-full border rounded p-2 h-32" required />
                </div>
                <div className="flex justify-end gap-2">
                  <button type="button" onClick={onClose} className="px-4 py-2 border rounded hover:bg-gray-50">Cancel</button>
                  <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Post</button>
                </div>
              </form>
            </div>
          </div>
        );
       };
 
    return (
        <MainLayout>
            <Header />
            <PostList />
            {showBackToTop && (
                <button
                    className="fixed bottom-8 right-8 p-3 bg-white rounded-full shadow-lg hover:shadow-xl"
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                >
                    <ArrowUp className="w-5 h-5 text-gray-600" />
                </button>
            )}
            {showModal && <NewPostModal onSubmit={handlePostCreation} onClose={() => setShowModal(false)} />}
            {selectedPost && <PostDetail post={selectedPost} onClose={() => setSelectedPost(null)} />}
            {showUserSpace && <UserSpace onClose={() => setShowUserSpace(false)} />}
            {showFilterModal && <FilterModal onClose={() => setShowFilterModal(false)} />}
            {showAISummary && <AISummaryModal threads={selectedThreads} onClose={() => setShowAISummary(false)} />}
        </MainLayout>
    );
};
  
export default ForumDesign;