'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { 
  GraduationCap, 
  ArrowLeft, 
  Calendar, 
  Clock, 
  User, 
  Tag,
  Search,
  Filter,
  TrendingUp,
  BookOpen,
  Brain,
  Target,
  Users,
  BarChart3,
  AlertTriangle,
  Award,
  Lightbulb,
  MessageCircle,
  Share2,
  Eye
} from 'lucide-react';
import { useState } from 'react';

const blogPosts = [
  {
    id: 1,
    title: 'The Science Behind Early Dropout Detection: How AI is Transforming Education',
    excerpt: 'Explore the machine learning algorithms and data science techniques that power modern dropout prediction systems.',
    content: 'Artificial intelligence is revolutionizing how we identify students at risk of dropping out...',
    author: 'Dr. Sarah Martinez',
    authorRole: 'Chief Data Scientist',
    publishDate: '2024-01-15',
    readTime: '8 min read',
    category: 'Technology',
    tags: ['AI', 'Machine Learning', 'Education', 'Data Science'],
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=400&fit=crop',
    featured: true,
    views: 2847,
    likes: 156
  },
  {
    id: 2,
    title: 'Success Stories: How Springfield High Reduced Dropout Rates by 40%',
    excerpt: 'A case study on implementing comprehensive dropout prevention strategies using data-driven insights.',
    content: 'Springfield High School partnered with EduGuard to implement a comprehensive dropout prevention program...',
    author: 'Michael Johnson',
    authorRole: 'Education Consultant',
    publishDate: '2024-01-12',
    readTime: '6 min read',
    category: 'Case Study',
    tags: ['Success Story', 'Implementation', 'Results', 'Best Practices'],
    image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9d1?w=800&h=400&fit=crop',
    featured: false,
    views: 1923,
    likes: 89
  },
  {
    id: 3,
    title: 'Understanding Risk Factors: The Key Indicators of Student Dropout',
    excerpt: 'Learn about the academic, behavioral, and socioeconomic factors that contribute to dropout risk.',
    content: 'Research has identified several key risk factors that can predict student dropout...',
    author: 'Dr. Emily Chen',
    authorRole: 'Educational Researcher',
    publishDate: '2024-01-10',
    readTime: '10 min read',
    category: 'Research',
    tags: ['Risk Factors', 'Research', 'Student Success', 'Analytics'],
    image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&h=400&fit=crop',
    featured: false,
    views: 3156,
    likes: 203
  },
  {
    id: 4,
    title: 'Building Effective Intervention Programs: A Comprehensive Guide',
    excerpt: 'Best practices for designing and implementing intervention programs that actually work.',
    content: 'Effective intervention programs require careful planning, proper resources, and ongoing evaluation...',
    author: 'Robert Brown',
    authorRole: 'Program Director',
    publishDate: '2024-01-08',
    readTime: '12 min read',
    category: 'Best Practices',
    tags: ['Interventions', 'Program Design', 'Student Support', 'Implementation'],
    image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=400&fit=crop',
    featured: false,
    views: 1654,
    likes: 78
  },
  {
    id: 5,
    title: 'The Role of Family Engagement in Dropout Prevention',
    excerpt: 'How involving families and communities can significantly improve student retention rates.',
    content: 'Family engagement is one of the most powerful predictors of student success...',
    author: 'Lisa Rodriguez',
    authorRole: 'Community Outreach Manager',
    publishDate: '2024-01-05',
    readTime: '7 min read',
    category: 'Community',
    tags: ['Family Engagement', 'Community', 'Parent Involvement', 'Support Systems'],
    image: 'https://images.unsplash.com/photo-1491438590914-bc09fcaaf77a?w=800&h=400&fit=crop',
    featured: false,
    views: 2234,
    likes: 134
  },
  {
    id: 6,
    title: 'Data Privacy in Education: Protecting Student Information',
    excerpt: 'Understanding FERPA compliance and best practices for handling sensitive student data.',
    content: 'With great data comes great responsibility. Educational institutions must balance...',
    author: 'David Wilson',
    authorRole: 'Privacy Officer',
    publishDate: '2024-01-03',
    readTime: '9 min read',
    category: 'Privacy',
    tags: ['Data Privacy', 'FERPA', 'Compliance', 'Security'],
    image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&h=400&fit=crop',
    featured: false,
    views: 1876,
    likes: 92
  }
];

const categories = [
  { value: 'all', label: 'All Posts', count: blogPosts.length },
  { value: 'Technology', label: 'Technology', count: blogPosts.filter(p => p.category === 'Technology').length },
  { value: 'Case Study', label: 'Case Studies', count: blogPosts.filter(p => p.category === 'Case Study').length },
  { value: 'Research', label: 'Research', count: blogPosts.filter(p => p.category === 'Research').length },
  { value: 'Best Practices', label: 'Best Practices', count: blogPosts.filter(p => p.category === 'Best Practices').length },
  { value: 'Community', label: 'Community', count: blogPosts.filter(p => p.category === 'Community').length },
  { value: 'Privacy', label: 'Privacy', count: blogPosts.filter(p => p.category === 'Privacy').length }
];

const getCategoryIcon = (category: string) => {
  switch (category) {
    case 'Technology': return Brain;
    case 'Case Study': return Award;
    case 'Research': return BookOpen;
    case 'Best Practices': return Target;
    case 'Community': return Users;
    case 'Privacy': return AlertTriangle;
    default: return BookOpen;
  }
};

const getCategoryColor = (category: string) => {
  switch (category) {
    case 'Technology': return 'text-blue-600 bg-blue-100';
    case 'Case Study': return 'text-green-600 bg-green-100';
    case 'Research': return 'text-purple-600 bg-purple-100';
    case 'Best Practices': return 'text-orange-600 bg-orange-100';
    case 'Community': return 'text-pink-600 bg-pink-100';
    case 'Privacy': return 'text-red-600 bg-red-100';
    default: return 'text-secondary-600 bg-secondary-100';
  }
};

export default function BlogPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('date');

  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = 
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  }).sort((a, b) => {
    switch (sortBy) {
      case 'views':
        return b.views - a.views;
      case 'likes':
        return b.likes - a.likes;
      case 'title':
        return a.title.localeCompare(b.title);
      default:
        return new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime();
    }
  });

  const featuredPost = blogPosts.find(post => post.featured);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-purple-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <Link href="/" className="inline-flex items-center space-x-3 mb-6">
            <div className="w-12 h-12 bg-gradient-to-r from-primary-600 to-purple-600 rounded-2xl flex items-center justify-center">
              <GraduationCap className="w-7 h-7 text-white" />
            </div>
            <div className="text-left">
              <h1 className="text-2xl font-bold gradient-text">EduGuard</h1>
              <p className="text-xs text-secondary-600">Dropout Detection System</p>
            </div>
          </Link>
          
          <h2 className="text-4xl font-bold text-secondary-900 mb-4">Blog & Insights</h2>
          <p className="text-xl text-secondary-600 max-w-3xl mx-auto">
            Discover the latest research, best practices, and success stories in dropout prevention and educational technology.
          </p>
        </motion.div>

        {/* Featured Post */}
        {featuredPost && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="card mb-12 overflow-hidden"
          >
            <div className="flex flex-col lg:flex-row">
              <div className="lg:w-1/2">
                <img
                  src={featuredPost.image}
                  alt={featuredPost.title}
                  className="w-full h-64 lg:h-full object-cover"
                />
              </div>
              <div className="lg:w-1/2 p-6 lg:p-8">
                <div className="flex items-center space-x-2 mb-4">
                  <span className="px-3 py-1 bg-primary-100 text-primary-700 text-sm font-medium rounded-full">
                    Featured
                  </span>
                  <span className={`px-3 py-1 text-sm font-medium rounded-full ${getCategoryColor(featuredPost.category)}`}>
                    {featuredPost.category}
                  </span>
                </div>
                <h3 className="text-2xl font-bold text-secondary-900 mb-4">{featuredPost.title}</h3>
                <p className="text-secondary-700 mb-6">{featuredPost.excerpt}</p>
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-4 text-sm text-secondary-600">
                    <div className="flex items-center space-x-1">
                      <User className="w-4 h-4" />
                      <span>{featuredPost.author}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-4 h-4" />
                      <span>{formatDate(featuredPost.publishDate)}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="w-4 h-4" />
                      <span>{featuredPost.readTime}</span>
                    </div>
                  </div>
                </div>
                <button className="btn-primary">Read Full Article</button>
              </div>
            </div>
          </motion.div>
        )}

        {/* Filters and Search */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="card mb-8"
        >
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
            <div className="flex flex-col sm:flex-row sm:items-center space-y-3 sm:space-y-0 sm:space-x-4">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-secondary-400" />
                <input
                  type="text"
                  placeholder="Search articles..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="input pl-9 w-full sm:w-64"
                />
              </div>

              {/* Category Filter */}
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="input w-full sm:w-auto"
              >
                {categories.map(category => (
                  <option key={category.value} value={category.value}>
                    {category.label} ({category.count})
                  </option>
                ))}
              </select>
            </div>

            {/* Sort Options */}
            <div className="flex items-center space-x-2">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="input w-auto"
              >
                <option value="date">Sort by Date</option>
                <option value="views">Sort by Views</option>
                <option value="likes">Sort by Likes</option>
                <option value="title">Sort by Title</option>
              </select>
            </div>
          </div>
        </motion.div>

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {filteredPosts.filter(post => !post.featured).map((post, index) => {
            const CategoryIcon = getCategoryIcon(post.category);
            
            return (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                className="card hover:shadow-lg transition-shadow cursor-pointer group"
              >
                <div className="relative mb-4 overflow-hidden rounded-lg">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 left-4">
                    <span className={`px-3 py-1 text-sm font-medium rounded-full ${getCategoryColor(post.category)}`}>
                      {post.category}
                    </span>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <h3 className="text-lg font-semibold text-secondary-900 group-hover:text-primary-600 transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                  
                  <p className="text-secondary-600 text-sm line-clamp-3">
                    {post.excerpt}
                  </p>
                  
                  <div className="flex items-center space-x-4 text-xs text-secondary-500">
                    <div className="flex items-center space-x-1">
                      <User className="w-3 h-3" />
                      <span>{post.author}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-3 h-3" />
                      <span>{formatDate(post.publishDate)}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="w-3 h-3" />
                      <span>{post.readTime}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between pt-3 border-t border-secondary-100">
                    <div className="flex items-center space-x-3 text-xs text-secondary-500">
                      <div className="flex items-center space-x-1">
                        <Eye className="w-3 h-3" />
                        <span>{post.views.toLocaleString()}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <MessageCircle className="w-3 h-3" />
                        <span>{post.likes}</span>
                      </div>
                    </div>
                    <button className="text-primary-600 hover:text-primary-700 text-sm font-medium">
                      Read More →
                    </button>
                  </div>
                  
                  <div className="flex flex-wrap gap-1 pt-2">
                    {post.tags.slice(0, 3).map(tag => (
                      <span
                        key={tag}
                        className="px-2 py-1 bg-secondary-100 text-secondary-600 text-xs rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>

        {/* No Results */}
        {filteredPosts.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="card text-center py-12"
          >
            <BookOpen className="w-16 h-16 text-secondary-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-secondary-900 mb-2">No Articles Found</h3>
            <p className="text-secondary-600 mb-4">
              Try adjusting your search terms or category filter.
            </p>
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('all');
              }}
              className="btn-outline"
            >
              Clear Filters
            </button>
          </motion.div>
        )}

        {/* Newsletter Signup */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="card text-center bg-gradient-to-r from-primary-500 to-purple-600 text-white"
        >
          <h3 className="text-2xl font-bold mb-4">Stay Updated</h3>
          <p className="text-primary-100 mb-6 max-w-2xl mx-auto">
            Subscribe to our newsletter to receive the latest insights on dropout prevention, 
            educational technology, and student success strategies.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-3 sm:space-y-0 sm:space-x-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="input flex-1 text-secondary-900"
            />
            <button className="btn bg-white text-primary-600 hover:bg-primary-50 w-full sm:w-auto">
              Subscribe
            </button>
          </div>
        </motion.div>

        {/* Navigation */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-8 text-center"
        >
          <Link
            href="/"
            className="inline-flex items-center space-x-2 text-secondary-600 hover:text-secondary-900 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Home</span>
          </Link>
        </motion.div>
      </div>
    </div>
  );
}