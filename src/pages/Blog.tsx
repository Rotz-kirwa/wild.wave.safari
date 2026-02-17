import { motion } from "framer-motion";
import { Calendar, Clock } from "lucide-react";
import { useState, useEffect } from "react";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.08, duration: 0.5 } }),
};

const Blog = () => {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/public/blogs');
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        console.error('Failed to fetch blogs:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  if (loading) {
    return <div className="min-h-screen pt-24 flex items-center justify-center">Loading...</div>;
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };
  return (
    <div className="min-h-screen pt-24">
      <section className="py-16 bg-muted">
        <div className="container mx-auto px-4 text-center">
          <p className="text-primary font-medium tracking-[0.2em] uppercase text-sm mb-3">Blog & Guides</p>
          <h1 className="text-4xl md:text-6xl font-display font-bold text-foreground mb-4">
            Stories from the <span className="italic text-primary">Trail</span>
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Travel guides, packing tips, and tales from the wild to inspire your next adventure.
          </p>
        </div>
      </section>

      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          {posts.length === 0 ? (
            <p className="text-center text-muted-foreground">No blog posts available yet.</p>
          ) : (
            <>
              {/* Featured Post */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="group mb-12 bg-card rounded-xl overflow-hidden border border-border hover:shadow-xl transition-all flex flex-col md:flex-row"
              >
                <div className="md:w-1/2 h-64 md:h-auto overflow-hidden">
                  <img src={posts[0].image_url} alt={posts[0].title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                </div>
                <div className="md:w-1/2 p-8 flex flex-col justify-center">
                  <span className="text-primary text-sm font-medium mb-2">{posts[0].category}</span>
                  <h2 className="text-2xl md:text-3xl font-display font-bold mb-4">{posts[0].title}</h2>
                  <p className="text-muted-foreground mb-4">{posts[0].excerpt}</p>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1"><Calendar className="w-4 h-4" />{formatDate(posts[0].created_at)}</span>
                    <span className="flex items-center gap-1"><Clock className="w-4 h-4" />{posts[0].read_time}</span>
                  </div>
                </div>
              </motion.div>

              {/* Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {posts.slice(1).map((post, i) => (
                  <motion.div
                    key={post.id}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeUp}
                    custom={i}
                    className="group bg-card rounded-xl overflow-hidden border border-border hover:shadow-lg transition-all"
                  >
                    <div className="h-48 overflow-hidden">
                      <img src={post.image_url} alt={post.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                    </div>
                    <div className="p-6">
                      <span className="text-primary text-xs font-medium">{post.category}</span>
                      <h3 className="text-lg font-display font-bold mt-2 mb-2">{post.title}</h3>
                      <p className="text-muted-foreground text-sm mb-4">{post.excerpt}</p>
                      <div className="flex items-center gap-3 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{formatDate(post.created_at)}</span>
                        <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{post.read_time}</span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </>
          )}
        </div>
      </section>
    </div>
  );
};

export default Blog;
