

import React, { useState, useEffect } from "react";
import "./App.css";

export default function App() {
  const INITIAL_POSTS = [
    {
      id: 1,
      author: { name: "Jane Smith", img: "https://randomuser.me/api/portraits/women/44.jpg", headline: "Software Engineer at TechCorp", company: "TechCorp" },
      meta: "2h • 🌎",
      timestamp: Date.now() - 1000 * 60 * 60 * 2,
      content: "Thrilled to announce that I've just shipped a major feature that reduces API response time by 40%! 🚀 Special thanks to my amazing team for the collaboration and support. This is what teamwork looks like! #TechCorp #Engineering #Innovation",
      media: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=600&q=80",
      likes: 245, liked: false,
      reactions: { like: 145, love: 78, insightful: 22 },
      comments: [
        { user: "Vrishin", text: "Congrats Jane! That's a huge improvement! 🎉", replies: [] },
        { user: "Mike Johnson", text: "Impressive work! Would love to hear more about the optimization strategy.", replies: [{ user: "Jane Smith", text: "Thanks Mike! Let's grab coffee and discuss the details." }] }
      ],
      shares: 12,
    },
    {
      id: 2,
      author: { name: "Mike Johnson", img: "https://randomuser.me/api/portraits/men/65.jpg", headline: "AI Researcher & Speaker", company: "OpenAI" },
      meta: "4h • 🌎",
      timestamp: Date.now() - 1000 * 60 * 60 * 4,
      content: "Just finished an incredible keynote at the AI Summit 2026 on 'The Future of Multimodal AI'. The discussions about ethical AI were particularly enlightening. If you're interested in the slides, check out the link below!",
      media: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80",
      likes: 1240, liked: false,
      reactions: { like: 890, love: 210, insightful: 140 },
      comments: [
        { user: "Priya Agarwal", text: "The ethical AI discussion was mind-blowing! Really appreciated the nuanced take.", replies: [] }
      ],
      shares: 87,
    },
    {
      id: 3,
      author: { name: "Priya Agarwal", img: "https://randomuser.me/api/portraits/women/12.jpg", headline: "Lead Product Designer at Creatify", company: "Creatify" },
      meta: "1d • 🌎",
      timestamp: Date.now() - 1000 * 60 * 60 * 24,
      content: "📚 Just published my comprehensive guide on 'Design Systems at Scale'. This is the result of 2 years working on design systems across multiple products. Topics covered: component libraries, design tokens, accessibility standards, and more!\n\nRead the full article: medium.com/design-systems",
      media: "",
      likes: 892, liked: false,
      reactions: { like: 623, insightful: 190, love: 79 },
      comments: [],
      shares: 156,
    },
    {
      id: 4,
      author: { name: "Sarah Chen", img: "https://randomuser.me/api/portraits/women/5.jpg", headline: "Startup Founder & Investor", company: "InnovateLabs" },
      meta: "1d • 🌎",
      timestamp: Date.now() - 1000 * 60 * 60 * 30,
      content: "Excited to announce that we just raised $5M Series A! 🎊 A huge thank you to our investors, team, and the entire community who believed in our vision. This funding will help us scale our platform and bring our product to 100K users by end of 2026.",
      media: "",
      likes: 2156, liked: false,
      reactions: { like: 1523, love: 450, celebrate: 183 },
      comments: [],
      shares: 234,
    },
  ];

  const INITIAL_JOBS = [
    { 
      id: 1, 
      title: "Senior React Developer", 
      company: "Tech Corp", 
      logo: "https://randomuser.me/api/portraits/men/1.jpg",
      location: "San Francisco, CA", 
      salary: "$150k-200k",
      salaryNegotiable: true,
      type: "Full-time", 
      postedDate: "2 days ago",
      applicants: 247,
      description: "We're looking for an experienced React developer to lead frontend architecture for our next-gen platform. You'll work with a team of 5 engineers on scalability and performance optimization.",
      fullDescription: "Tech Corp is seeking a Senior React Developer to join our engineering team. This is a fantastic opportunity to lead the frontend team and drive architectural decisions.\n\nResponsibilities:\n• Design and implement scalable React components\n• Lead code reviews and mentor junior developers\n• Optimize application performance\n• Collaborate with product and design teams\n\nRequirements:\n• 5+ years of React experience\n• Strong TypeScript skills\n• Experience with state management (Redux/Zustand)\n• Knowledge of performance optimization\n• Bachelor's degree in CS or related field",
      skills: ["React", "TypeScript", "Redux", "Node.js", "Testing"],
      benefits: ["Health Insurance", "401k", "Remote Friendly", "Unlimited PTO", "Learning Budget"],
      urgency: "High"
    },
    { 
      id: 2, 
      title: "Product Manager", 
      company: "StartUp Inc", 
      logo: "https://randomuser.me/api/portraits/women/2.jpg",
      location: "New York, NY", 
      salary: "$120k-160k",
      salaryNegotiable: true,
      type: "Full-time", 
      postedDate: "5 days ago",
      applicants: 156,
      description: "Lead product strategy and vision for our next-gen platform. Own the entire product lifecycle from discovery to launch.",
      fullDescription: "We're looking for an exceptional Product Manager to lead our platform's evolution. You'll have full ownership of the product roadmap and work directly with our leadership team.",
      skills: ["Product Strategy", "Data Analysis", "User Research", "Roadmapping"],
      benefits: ["Equity", "Health Insurance", "Flexible Hours", "Conference Budget", "Remote"],
      urgency: "Medium"
    },
    { 
      id: 3, 
      title: "UX/UI Designer", 
      company: "Design Studio", 
      logo: "https://randomuser.me/api/portraits/women/3.jpg",
      location: "Remote", 
      salary: "$90k-130k",
      salaryNegotiable: false,
      type: "Contract", 
      postedDate: "1 week ago",
      applicants: 89,
      description: "Create beautiful and intuitive designs for web and mobile applications. Lead design system initiatives.",
      fullDescription: "Design Studio is seeking a talented UX/UI Designer to join our creative team. You'll work on high-impact projects for leading tech companies.",
      skills: ["Figma", "User Research", "Prototyping", "Design Systems", "CSS"],
      benefits: ["Flexible Schedule", "Portfolio Building", "Modern Tools", "Creative Freedom"],
      urgency: "Low"
    },
    { 
      id: 4, 
      title: "Full Stack Engineer", 
      company: "Innovation Labs", 
      logo: "https://randomuser.me/api/portraits/men/4.jpg",
      location: "Boston, MA", 
      salary: "$130k-180k",
      salaryNegotiable: true,
      type: "Full-time", 
      postedDate: "3 days ago",
      applicants: 312,
      description: "Build scalable backend and frontend solutions. Work on cloud infrastructure and microservices.",
      fullDescription: "Innovation Labs is looking for Full Stack Engineers to join our rapidly growing team. You'll work with cutting-edge technologies and solve complex scalability challenges.",
      skills: ["Node.js", "React", "PostgreSQL", "AWS", "Docker"],
      benefits: ["Stock Options", "Relocation Assistance", "Health Insurance", "Gym Membership", "Professional Development"],
      urgency: "High"
    },
    { 
      id: 5, 
      title: "Data Scientist", 
      company: "Analytics Pro", 
      logo: "https://randomuser.me/api/portraits/women/5.jpg",
      location: "Remote", 
      salary: "$140k-190k",
      salaryNegotiable: true,
      type: "Full-time", 
      postedDate: "1 day ago",
      applicants: 203,
      description: "Work with big data and machine learning models. Drive data-driven decision making across the organization.",
      fullDescription: "Analytics Pro is seeking experienced Data Scientists to build ML models and drive insights. You'll have access to massive datasets and modern ML infrastructure.",
      skills: ["Python", "Machine Learning", "SQL", "TensorFlow", "Statistics"],
      benefits: ["GPU Access", "Conference Budget", "Flexible Hours", "Learning Stipend", "Equity"],
      urgency: "Medium"
    },
    { 
      id: 6, 
      title: "DevOps Engineer", 
      company: "CloudScale", 
      logo: "https://randomuser.me/api/portraits/men/6.jpg",
      location: "Seattle, WA", 
      salary: "$145k-185k",
      salaryNegotiable: true,
      type: "Full-time", 
      postedDate: "4 days ago",
      applicants: 134,
      description: "Manage cloud infrastructure and CI/CD pipelines. Improve deployment efficiency and reliability.",
      fullDescription: "CloudScale needs an experienced DevOps Engineer to manage our growing infrastructure. You'll work with Kubernetes, CI/CD, and cloud platforms.",
      skills: ["Kubernetes", "Docker", "AWS", "CI/CD", "Infrastructure as Code"],
      benefits: ["On-call Bonus", "Health Insurance", "Remote", "Learning Budget", "Stock Options"],
      urgency: "High"
    },
  ];

  const INITIAL_NETWORK = [
    { id: 1, name: "Emily Clark", headline: "Product Manager at Google", img: "https://randomuser.me/api/portraits/women/1.jpg", connected: false, mutualFriends: 5, industry: "Technology", endorsed: ["Product Strategy", "Agile", "Analytics"], status: "online" },
    { id: 2, name: "David Lee", headline: "Design Lead at Adobe", img: "https://randomuser.me/api/portraits/men/2.jpg", connected: false, mutualFriends: 3, industry: "Design", endorsed: ["UI Design", "Figma", "Prototyping"], status: "away" },
    { id: 3, name: "Arjun Patel", headline: "Senior Developer at Microsoft", img: "https://randomuser.me/api/portraits/men/3.jpg", connected: false, mutualFriends: 8, industry: "Technology", endorsed: ["C#", ".NET", "Cloud"], status: "online" },
    { id: 4, name: "Sarah Johnson", headline: "CEO at StartupHub", img: "https://randomuser.me/api/portraits/women/4.jpg", connected: false, mutualFriends: 2, industry: "Startups", endorsed: ["Leadership", "Fundraising", "Strategy"], status: "offline" },
    { id: 5, name: "Alex Chen", headline: "ML Engineer at OpenAI", img: "https://randomuser.me/api/portraits/men/5.jpg", connected: false, mutualFriends: 7, industry: "AI/ML", endorsed: ["Machine Learning", "Python", "Neural Networks"], status: "online" },
    { id: 6, name: "Jessica Rodriguez", headline: "Data Analyst at Meta", img: "https://randomuser.me/api/portraits/women/6.jpg", connected: false, mutualFriends: 4, industry: "Analytics", endorsed: ["SQL", "Tableau", "Statistics"], status: "online" },
    { id: 7, name: "Marcus Thompson", headline: "Marketing Director at Amazon", img: "https://randomuser.me/api/portraits/men/7.jpg", connected: false, mutualFriends: 6, industry: "Marketing", endorsed: ["B2B Marketing", "Strategy", "Leadership"], status: "offline" },
  ];

  const INITIAL_NOTIFICATIONS = [
    { id: 1, type: "connection", user: "Jane Smith", action: "accepted your connection request", time: "2h ago", img: "https://randomuser.me/api/portraits/women/44.jpg", read: false },
    { id: 2, type: "like", user: "Mike Johnson", action: "liked your post about ReactJS performance", time: "4h ago", img: "https://randomuser.me/api/portraits/men/65.jpg", read: false },
    { id: 3, type: "comment", user: "Priya Agarwal", action: "commented on your post", time: "6h ago", img: "https://randomuser.me/api/portraits/women/12.jpg", read: false },
    { id: 4, type: "job", title: "Senior React Developer at Tech Corp", action: "matches your profile perfectly", time: "1d ago", read: true },
    { id: 5, type: "mention", user: "Alex Chen", action: "mentioned you in a post", time: "1d ago", img: "https://randomuser.me/api/portraits/men/5.jpg", read: true },
    { id: 6, type: "milestone", user: "", action: "You reached 500 profile views this month!", time: "2d ago", read: true },
    { id: 7, type: "endorsement", user: "Sarah Johnson", action: "endorsed you for React skills", time: "2d ago", img: "https://randomuser.me/api/portraits/women/4.jpg", read: true },
    { id: 8, type: "birthday", user: "David Lee", action: "has a birthday today! Send congratulations", time: "now", img: "https://randomuser.me/api/portraits/men/2.jpg", read: false },
  ];

  const [signedIn, setSignedIn] = useState(() => localStorage.getItem("ln-signed") === "1");
  const [page, setPage] = useState("home");
  const [posts, setPosts] = useState(() => JSON.parse(localStorage.getItem("ln-posts")) || INITIAL_POSTS);
  const [dark, setDark] = useState(() => localStorage.getItem("ln-dark") === "1");
  const [chats, setChats] = useState(() => JSON.parse(localStorage.getItem("ln-chats")) || {
    "Mike Johnson": [{ from: "Mike Johnson", text: "Hi! Are you attending the AI conference next week?" }, { from: "Vrishin", text: "Yes, looking forward to it!" }],
    "Jane Smith": [{ from: "Jane Smith", text: "Congrats on your new job!" }, { from: "Vrishin", text: "Thank you Jane!" }],
    "Priya Agarwal": [{ from: "Priya Agarwal", text: "Check out my new article on UI/UX trends." }],
  });
  const [network, setNetwork] = useState(INITIAL_NETWORK);
  const [notifications, setNotifications] = useState(INITIAL_NOTIFICATIONS);
  const [savedJobs, setSavedJobs] = useState(() => JSON.parse(localStorage.getItem("ln-saved-jobs")) || []);
  const [jobSearch, setJobSearch] = useState("");
  const [jobFilter, setJobFilter] = useState("all");
  const [appliedJobs, setAppliedJobs] = useState(() => JSON.parse(localStorage.getItem("ln-applied-jobs")) || []);
  const [profileEditing, setProfileEditing] = useState(false);
  const [userProfile, setUserProfile] = useState(() => JSON.parse(localStorage.getItem("ln-profile")) || {
    name: "Vrishin",
    headline: "Student | Tech Enthusiast | Full Stack Developer",
    location: "San Francisco, CA",
    email: "vrishin@email.com",
    phone: "(555) 123-4567",
    avatar: "https://cdn.vectorstock.com/i/500p/89/50/generic-person-gray-photo-placeholder-man-vector-24848950.jpg",
    banner: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    openTo: "Open to new opportunities in Full Stack Development",
    profileViews: 1247,
    searchAppearances: 89
  });
  const [savedPosts, setSavedPosts] = useState(() => JSON.parse(localStorage.getItem("ln-saved-posts")) || []);
  const [showPremiumModal, setShowPremiumModal] = useState(false);
  const [postMenu, setPostMenu] = useState(null);
  const news = [
    { id: 1, title: "AI Revolution: How ChatGPT is Changing Tech Jobs", source: "TechCrunch", time: "2h ago", reads: "2.3M", trending: true },
    { id: 2, title: "Remote Work is Here to Stay: New Report Released", source: "Forbes", time: "4h ago", reads: "1.8M" },
    { id: 3, title: "Startup Funding Hits Record High in 2026", source: "VentureBeat", time: "6h ago", reads: "1.2M" },
    { id: 4, title: "Top Programming Languages for Next Generation", source: "Dev.to", time: "8h ago", reads: "985K" },
    { id: 5, title: "Design Systems Best Practices Workshop", source: "Design Observer", time: "1d ago", reads: "654K" },
  ];

  const trendingTopics = [
    { id: 1, hashtag: "#ReactJS", posts: "245K", trending: true },
    { id: 2, hashtag: "#WebDevelopment", posts: "189K", trending: true },
    { id: 3, hashtag: "#AI", posts: "567K", trending: true },
    { id: 4, hashtag: "#StartupLife", posts: "103K" },
    { id: 5, hashtag: "#CareerGrowth", posts: "98K" },
  ];

  const events = [
    { id: 1, title: "Tech Leaders Summit 2026", date: "Mar 15", time: "10:00 AM", attendees: 2543, image: "🎤", location: "San Francisco, CA" },
    { id: 2, title: "React Conference 2026", date: "Apr 20", time: "9:00 AM", attendees: 5234, image: "⚛️", location: "Virtual" },
    { id: 3, title: "AI & ML Workshop", date: "Mar 28", time: "2:00 PM", attendees: 1823, image: "🤖", location: "Boston, MA" },
  ];

  const skillRecommendations = [
    "TypeScript", "System Design", "Docker", "Kubernetes", "GraphQL", "Node.js", "AWS", "MongoDB"
  ];

  useEffect(() => { localStorage.setItem("ln-posts", JSON.stringify(posts)); }, [posts]);
  useEffect(() => { localStorage.setItem("ln-dark", dark ? "1" : "0"); document.documentElement.classList.toggle("dark", dark); }, [dark]);
  useEffect(() => { localStorage.setItem("ln-signed", signedIn ? "1" : "0"); }, [signedIn]);
  useEffect(() => { localStorage.setItem("ln-chats", JSON.stringify(chats)); }, [chats]);
  useEffect(() => { localStorage.setItem("ln-saved-jobs", JSON.stringify(savedJobs)); }, [savedJobs]);
  useEffect(() => { localStorage.setItem("ln-applied-jobs", JSON.stringify(appliedJobs)); }, [appliedJobs]);
  useEffect(() => { localStorage.setItem("ln-profile", JSON.stringify(userProfile)); }, [userProfile]);
  useEffect(() => { localStorage.setItem("ln-saved-posts", JSON.stringify(savedPosts)); }, [savedPosts]);

  const signIn = (u, p) => { if(u && p){ setSignedIn(true); setPage("home"); return true; } return false; };
  const signOut = () => { setSignedIn(false); setPage("home"); localStorage.removeItem("ln-signed"); };
  const createPost = (text) => {
    const newPost = {
      id: posts.length + 1,
      author: { name: userProfile.name, img: userProfile.avatar, headline: userProfile.headline, company: userProfile.headline },
      meta:"Now • 🌎",
      timestamp: Date.now(),
      content: text,
      media: "",
      likes: 0,
      liked: false,
      reactions: { like: 0, love: 0, insightful: 0 },
      comments: [],
      shares: 0
    };
    setPosts(p => [newPost, ...p]);
  };
  const toggleLike = (idx) => setPosts(prev => prev.map((p,i) => i===idx ? {...p, liked:!p.liked, likes:p.liked?p.likes-1:p.likes+1} : p));
  const addComment = (idx, text) => text.trim() && setPosts(prev => prev.map((p,i) => i===idx ? {...p, comments:[...p.comments,{user:"Vrishin",text,replies:[]}]}:p));
  const sendMessage = (to,text) => text.trim() && setChats(prev=>({...prev,[to]:[...(prev[to]||[]),{from:"Vrishin",text}]}));
  const saveJob = (jobId) => setSavedJobs(prev => prev.includes(jobId) ? prev.filter(id => id !== jobId) : [...prev, jobId]);
  const applyJob = (jobId) => setAppliedJobs(prev => prev.includes(jobId) ? prev : [...prev, jobId]);
  const connectUser = (userId) => setNetwork(prev => prev.map(u => u.id === userId ? {...u, connected: true} : u));
  const dismissNotification = (id) => setNotifications(prev => prev.filter(n => n.id !== id));
  const savePost = (postId) => setSavedPosts(prev => prev.includes(postId) ? prev.filter(id => id !== postId) : [...prev, postId]);
  const sendPost = (postId) => alert(`Post #${postId} sent via message! (Feature coming soon)`);


  if(!signedIn) return <SignIn onSignIn={signIn} />;

  return (
    <div className={`app-root ${dark?"dark-root":""}`}>
      <Navbar page={page} setPage={setPage} dark={dark} setDark={setDark} notifications={notifications} chats={chats} setShowPremiumModal={setShowPremiumModal} />
      {showPremiumModal && <PremiumModal setShowPremiumModal={setShowPremiumModal} />}
      <div className="container">
        <Sidebar userProfile={userProfile} />
        <main className="main">
          {page==="home" && <Home posts={posts} createPost={createPost} toggleLike={toggleLike} addComment={addComment} news={news} chats={chats} savedPosts={savedPosts} savePost={savePost} sendPost={sendPost} postMenu={postMenu} setPostMenu={setPostMenu} userProfile={userProfile} jobs={jobs} trendingTopics={trendingTopics} events={events} skillRecommendations={skillRecommendations} />}
          {page==="jobs" && <Jobs jobs={jobs} savedJobs={savedJobs} appliedJobs={appliedJobs} jobSearch={jobSearch} setJobSearch={setJobSearch} jobFilter={jobFilter} setJobFilter={setJobFilter} saveJob={saveJob} applyJob={applyJob} />}
          {page==="explore" && <Explore posts={posts} news={news} trendingTopics={trendingTopics} events={events} />}
          {page==="network" && <Network network={network} connectUser={connectUser} />}
          {page==="messaging" && <Messaging chats={chats} sendMessage={sendMessage} />}
          {page==="notifications" && <Notifications notifications={notifications} dismissNotification={dismissNotification} />}
          {page==="me" && <Me signOut={signOut} userProfile={userProfile} setUserProfile={setUserProfile} profileEditing={profileEditing} setProfileEditing={setProfileEditing} posts={posts} />}
        </main>
        <Rightbar />
      </div>
    </div>
  );
}

// --- Components inside App.jsx ---

function SignIn({onSignIn}){
  const [error,setError]=useState("");
  const handle=(e)=>{ e.preventDefault(); const u=e.target.username.value.trim(),p=e.target.password.value; if(!u||!p){setError("Please enter both username and password."); return;} if(!onSignIn(u,p)) setError("Sign in failed."); };
  return (
    <div className="signin-screen">
      <div className="signin-box">
        <h1>Sign into LinkedIn</h1>
        <form className="signin-form" onSubmit={handle}>
          {error && <div className="error">{error}</div>}
          <input name="username" placeholder="Email or Username" />
          <input name="password" type="password" placeholder="Password" />
          <button type="submit">Sign in</button>
        </form>
      </div>
    </div>
  );
}

function Navbar({page,setPage,dark,setDark,notifications,chats,setShowPremiumModal}){
  const unreadNotifications = notifications.filter(n => !n.read).length;
  const unreadMessages = Object.values(chats).length;
  
  return (
    <div className="navbar">
      <div className="navbar-left">
        <div className="logo">
          <div className="logo-glow"></div>
          <img src="https://www.freepnglogos.com/uploads/linkedin-logo-transparent-png-25.png" alt="Logo" className="logo-img" />
        </div>
        <div className="search"><input placeholder="Search people, jobs, posts..." /></div>
      </div>
      <div className="menu">
        {[
          {id:"home", label:"Home"},
          {id:"network", label:"Network"},
          {id:"jobs", label:"Jobs"},
          {id:"explore", label:"Explore"},
          {id:"messaging", label:"Messages", badge: unreadMessages},
          {id:"notifications", label:"Alerts", badge: unreadNotifications},
          {id:"me", label:"Me"}
        ].map(item=>(
          <div key={item.id} className={`nav-item ${page===item.id?"active":""}`} onClick={()=>setPage(item.id)}>
            <span className="nav-label">{item.label}</span>
            {item.badge > 0 && <span className="nav-badge">{item.badge}</span>}
          </div>
        ))}
        <button className="nav-premium-btn" onClick={() => setShowPremiumModal(true)}>
          ⭐ Try Premium
        </button>
        <label className="dark-toggle">
          <input type="checkbox" checked={dark} onChange={e=>setDark(e.target.checked)}/> 🌙
        </label>
      </div>
    </div>
  );
}

function Sidebar({userProfile}){ 
  return (
    <aside className="sidebar">
      <div className="sidebar-profile">
        <img src={userProfile.avatar} alt="Profile"/>
        <h3>{userProfile.name}</h3>
        <p className="sidebar-headline">{userProfile.headline}</p>
      </div>

      <div className="sidebar-stats">
        <div className="stat">
          <span className="stat-value">247</span>
          <span className="stat-label">Connections</span>
        </div>
        <div className="stat">
          <span className="stat-value">48</span>
          <span className="stat-label">Followers</span>
        </div>
      </div>

      <button className="sidebar-btn">👁️ View Profile</button>

      <div className="sidebar-section">
        <h4>Recent</h4>
        <a href="apple.com" className="sidebar-link">💼 Full Stack Engineer</a>
        <a href="apple.com" className="sidebar-link">📱 React Developer</a>
        <a href="apple.com" className="sidebar-link">🤖 AI Engineer</a>
      </div>

      <div className="sidebar-section">
        <h4>Groups</h4>
        <a href="apple.com" className="sidebar-link">🌐 React Community</a>
        <a href="apple.com" className="sidebar-link">💻 Web Developers</a>
      </div>

      <div className="sidebar-section">
        <h4>Events</h4>
        <a href="apple.com" className="sidebar-link">📅 Tech Conference 2026</a>
        <a href="apple.com" className="sidebar-link">🎓 Webinar Series</a>
      </div>
    </aside>
  );
};

function Rightbar(){
  const [suggestions,setSuggestions]=useState([{id:1,name:"Emily Clark", headline:"Product Manager at Google"},{id:2,name:"David Lee", headline:"Design Lead at Adobe"},{id:3,name:"Arjun Patel", headline:"Senior Developer at Microsoft"}]);
  const [showAll, setShowAll] = useState(false);
  const connect=(id)=>setSuggestions(s=>s.map(x=>x.id===id?{...x,connected:true}:x));
  
  return (
    <aside className="rightbar">
      <div className="rightbar-header">
        <h3>People you may know</h3>
      </div>
      <div className="suggestions-container">
        {suggestions.slice(0, showAll ? suggestions.length : 3).map(s=>(
          <div key={s.id} className="suggestion">
            <div className="suggestion-avatar">
              <div className="avatar-circle">{s.name.split(' ')[0][0]}{s.name.split(' ')[1][0]}</div>
            </div>
            <div className="suggestion-info">
              <h5>{s.name}</h5>
              <p className="suggestion-headline">{s.headline}</p>
            </div>
            <button disabled={s.connected} onClick={()=>connect(s.id)} className="suggestion-btn">{s.connected?"✓":"+"}</button>
          </div>
        ))}
      </div>
      {!showAll && suggestions.length > 3 && (
        <button className="show-more-btn" onClick={() => setShowAll(true)}>
          Show more →
        </button>
      )}

      <div className="rightbar-divider"></div>

      <div className="premium-promo">
        <div className="promo-icon">👑</div>
        <h4>Try Premium</h4>
        <p>Access tools and insights to enhance your professional brand</p>
        <button className="promo-btn">Explore Premium</button>
      </div>

      <div className="rightbar-divider"></div>

      <div className="footer-links">
        <h4>Helpful Resources</h4>
        <a href="apple.com" className="footer-link">Privacy & Terms</a>
        <a href="apple.com" className="footer-link">Help Center</a>
        <a href="apple.com" className="footer-link">Advertising</a>
        <a href="apple.com" className="footer-link">Business Services</a>
        <p className="footer-copyright">© 2024 LinkedIn Clone. All rights reserved.</p>
      </div>
    </aside>
  );
}

function Home({posts,createPost,toggleLike,addComment,news,chats,savedPosts,savePost,sendPost,postMenu,setPostMenu,userProfile,jobs,trendingTopics,events,skillRecommendations}){
  
  return (
    <>
      <PostBox onCreate={createPost} userProfile={userProfile} />
      <div className="home-layout">
        <div className="posts-section">
          {posts.map((p,i)=> <Post key={i} post={p} idx={i} onToggleLike={toggleLike} onAddComment={addComment} savedPosts={savedPosts} savePost={savePost} sendPost={sendPost} postMenu={postMenu} setPostMenu={setPostMenu} userProfile={userProfile} />)}
        </div>
        
        <div className="right-section">
          {/* Trending Topics */}
          <div className="trending-widget">
            <div className="widget-header">
              <h3>🔥 Trending</h3>
            </div>
            <div className="trending-list">
              {trendingTopics.map(topic => (
                <div key={topic.id} className="trending-item">
                  <div className="trending-content">
                    <h4>{topic.hashtag}</h4>
                    <p className="trending-posts">{topic.posts} posts</p>
                  </div>
                  {topic.trending && <span className="trend-badge">📈 Trending</span>}
                </div>
              ))}
            </div>
          </div>

          {/* Featured Jobs Carousel */}
          <div className="featured-jobs-widget">
            <div className="widget-header">
              <h3>💼 Featured Jobs</h3>
              <a href="apple.com" className="see-more">See all →</a>
            </div>
            <div className="featured-jobs-carousel">
              {jobs.slice(0, 3).map(job => (
                <div key={job.id} className="featured-job-card">
                  <div className="job-urgency" style={{backgroundColor: job.urgency === 'High' ? '#e74c3c' : job.urgency === 'Medium' ? '#f39c12' : '#27ae60'}}>
                    {job.urgency}
                  </div>
                  <img src={job.logo} alt={job.company} className="featured-job-logo" />
                  <h5>{job.title}</h5>
                  <p className="featured-job-company">{job.company}</p>
                  <p className="featured-job-location">📍 {job.location}</p>
                  <p className="featured-job-applicants">{job.applicants} applicants</p>
                </div>
              ))}
            </div>
          </div>

          {/* Events */}
          <div className="events-widget">
            <div className="widget-header">
              <h3>📅 Events</h3>
            </div>
            <div className="events-list">
              {events.map(event => (
                <div key={event.id} className="event-item">
                  <div className="event-icon">{event.image}</div>
                  <div className="event-info">
                    <h5>{event.title}</h5>
                    <p className="event-date">{event.date} • {event.time}</p>
                    <p className="event-location">📍 {event.location}</p>
                    <p className="event-attendees">👥 {event.attendees} attending</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Skill Recommendations */}
          <div className="skills-widget">
            <div className="widget-header">
              <h3>⭐ Skills to Endorse</h3>
            </div>
            <div className="skills-recommendation-grid">
              {skillRecommendations.map((skill, i) => (
                <button key={i} className="skill-recommendation-btn">
                  {skill}
                </button>
              ))}
            </div>
          </div>

          {/* News Section */}
          <div className="news-widget">
            <div className="widget-header">
              <h3>📰 LinkedIn News</h3>
            </div>
            <div className="news-list">
              {news.map(item => (
                <div key={item.id} className="news-item">
                  <div className="news-content">
                    <h4>{item.title}</h4>
                    <p className="news-source">{item.source} • {item.time}</p>
                    <p className="news-reads">👁️ {item.reads} views</p>
                  </div>
                  {item.trending && <span className="trending-badge">🔥 Trending</span>}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <FloatingChatsWidget chats={chats} />
    </>
  );
}

function FloatingChatsWidget({chats}){
  const [showMessages, setShowMessages] = useState(false);
  
  return (
    <div className="floating-chats-widget">
      <div className="floating-widget-header" onClick={() => setShowMessages(!showMessages)}>
        <h3>💬 Messages</h3>
        <button className="collapse-btn">
          {showMessages ? '−' : '+'}
        </button>
      </div>
      {showMessages && (
        <div className="messages-list">
          {Object.entries(chats).slice(0, 5).map(([person, messages]) => (
            <div key={person} className="message-preview">
              <div className="person-avatar">{person.split(' ')[0][0]}{person.split(' ')[1]?.[0] || ''}</div>
              <div className="message-info">
                <p className="person-name">{person}</p>
                <p className="last-message">{messages[messages.length-1]?.text.substring(0, 30)}...</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function PostBox({onCreate, userProfile}){
  const [text,setText]=useState("");
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if(text.trim()){
      onCreate(text);
      setText("");
    }
  };

  return (
    <form className="post-box" onSubmit={handleSubmit}>
      <div className="post-box-header">
        <img src={userProfile.avatar} alt="Profile" className="post-avatar" />
        <textarea 
          value={text} 
          onChange={e=>setText(e.target.value)} 
          placeholder="Start a post, try writing with hashtag…" 
          className="post-textarea"
        />
      </div>
      <div className="post-box-footer">
        <div className="post-options">
          <button type="button" className="post-option" title="Add media">📷</button>
          <button type="button" className="post-option" title="Add video">🎥</button>
          <button type="button" className="post-option" title="Create poll">📊</button>
          <button type="button" className="post-option" title="Add article">📄</button>
        </div>
        <button type="submit" className="post-submit">Post</button>
      </div>
    </form>
  );
}

function Post({post,idx,onToggleLike,onAddComment,savedPosts,savePost,sendPost,postMenu,setPostMenu,userProfile}){
  const [showComments,setShowComments]=useState(false);
  const [showReactions,setShowReactions]=useState(false);
  const [comment,setComment]=useState("");
  const totalReactions = (post.reactions?.like || 0) + (post.reactions?.love || 0) + (post.reactions?.insightful || 0) + (post.reactions?.celebrate || 0);
  const isPostSaved = savedPosts.includes(post.id);
  
  const handleReactionClick = (reactionType) => {
    onToggleLike(idx);
    setShowReactions(false);
  };

  return (
    <div className="post">
      <div className="post-header">
        <div className="author">
          <img src={post.author.img} alt={post.author.name}/>
          <div className="author-info">
            <div className="author-name">{post.author.name}</div>
            <div className="author-headline">{post.author.headline}</div>
            <div className="post-timestamp">{post.meta}</div>
          </div>
        </div>
        <div className="post-menu-container">
          <button className="post-menu" onClick={() => setPostMenu(postMenu === post.id ? null : post.id)}>⋯</button>
          {postMenu === post.id && (
            <div className="post-menu-dropdown">
              <button className="menu-item" onClick={() => { savePost(post.id); setPostMenu(null); }}>
                {isPostSaved ? '❤️' : '🤍'} {isPostSaved ? 'Unsave' : 'Save to collection'}
              </button>
              <button className="menu-item" onClick={() => { sendPost(post.id); setPostMenu(null); }}>
                📤 Send in message
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="post-content">{post.content}</div>
      {post.media && <img src={post.media} alt="post-media" className="post-media"/>}
      
      <div className="post-stats">
        <span className="stats-item">
          <span className="reaction-emoji">👍</span> {totalReactions} {totalReactions === 1 ? 'reaction' : 'reactions'}
        </span>
        <span className="stats-item">{post.comments.length} {post.comments.length === 1 ? 'comment' : 'comments'}</span>
        <span className="stats-item">{post.shares} {post.shares === 1 ? 'share' : 'shares'}</span>
      </div>

      <div className="post-actions">
        <button className={`action-btn ${post.liked ? 'liked' : ''}`} onClick={() => handleReactionClick('like')}>
          {post.liked ? '👍' : '🤍'} <span>Like</span>
        </button>
        <button className="action-btn" onClick={()=>setShowComments(!showComments)}>
          💬 <span>Comment</span>
        </button>
        <button className="action-btn">
          ↗️ <span>Share</span>
        </button>
      </div>

      {showReactions && (
        <div className="reactions-panel">
          <button className="reaction-choice" onClick={() => handleReactionClick('like')}>👍 Like</button>
          <button className="reaction-choice" onClick={() => handleReactionClick('love')}>❤️ Love</button>
          <button className="reaction-choice" onClick={() => handleReactionClick('insightful')}>😮 Insightful</button>
          <button className="reaction-choice" onClick={() => handleReactionClick('celebrate')}>🎉 Celebrate</button>
        </div>
      )}

      {showComments && (
        <div className="comments-section">
          <div className="comments-list">
            {post.comments.map((c,i)=>(
              <div key={i} className="comment-item">
                <img src={`https://randomuser.me/api/portraits/women/${i+1}.jpg`} alt={c.user} className="comment-avatar" />
                <div className="comment-content">
                  <div className="comment-header">
                    <strong>{c.user}</strong>
                    <span className="comment-time">2h ago</span>
                  </div>
                  <p>{c.text}</p>
                  <div className="comment-actions">
                    <button>👍 Like</button>
                    <button>Reply</button>
                  </div>
                  {c.replies && c.replies.map((r, ri) => (
                    <div key={ri} className="reply-item">
                      <img src={`https://randomuser.me/api/portraits/men/${ri+1}.jpg`} alt={r.user} className="comment-avatar" />
                      <div className="comment-content">
                        <div className="comment-header">
                          <strong>{r.user}</strong>
                          <span className="comment-time">1h ago</span>
                        </div>
                        <p>{r.text}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="comment-input">
            <img src={userProfile.avatar} alt="You" className="comment-avatar" />
            <input 
              placeholder="Add a comment..." 
              value={comment} 
              onChange={e=>setComment(e.target.value)} 
              onKeyDown={e=>{if(e.key==="Enter" && comment.trim()){onAddComment(idx,comment); setComment("")}}}
              className="comment-input-field"
            />
          </div>
        </div>
      )}
    </div>
  );
}

// Dummy pages
function Jobs({jobs, savedJobs, appliedJobs, jobSearch, setJobSearch, jobFilter, setJobFilter, saveJob, applyJob}){
  const [selectedJob, setSelectedJob] = useState(null);
  
  const filteredJobs = jobs.filter(job => {
    const matchSearch = job.title.toLowerCase().includes(jobSearch.toLowerCase()) || job.company.toLowerCase().includes(jobSearch.toLowerCase());
    const matchFilter = jobFilter === "all" || job.type === jobFilter;
    return matchSearch && matchFilter;
  });

  return (
    <div className="jobs-page">
      <div className="jobs-header">
        <h2>Job Opportunities</h2>
        <p>Discover roles that match your profile and career goals</p>
      </div>
      
      <div className="jobs-controls">
        <input 
          type="text" 
          placeholder="Search jobs by title or company..." 
          value={jobSearch}
          onChange={(e) => setJobSearch(e.target.value)}
          className="job-search"
        />
        <select value={jobFilter} onChange={(e) => setJobFilter(e.target.value)} className="job-filter">
          <option value="all">All Types</option>
          <option value="Full-time">Full-time</option>
          <option value="Contract">Contract</option>
        </select>
      </div>

      <div className="jobs-container">
        <div className="jobs-list">
          {filteredJobs.map(job => (
            <div 
              key={job.id} 
              className={`job-card ${selectedJob?.id === job.id ? 'selected' : ''}`}
              onClick={() => setSelectedJob(job)}
            >
              <div className="job-header">
                <img src={job.logo} alt={job.company} className="job-logo" />
                <div className="job-title-section">
                  <h3>{job.title}</h3>
                  <p className="job-company">{job.company}</p>
                  <span className={`urgency-badge urgency-${job.urgency.toLowerCase()}`}>{job.urgency}</span>
                </div>
                {appliedJobs.includes(job.id) && <span className="applied-badge">✓ Applied</span>}
              </div>
              <div className="job-details">
                <span className="job-location">📍 {job.location}</span>
                <span className="job-type">{job.type}</span>
              </div>
              <p className="job-snippet">{job.description}</p>
            </div>
          ))}
        </div>

        <div className="job-detail-panel">
          {selectedJob ? (
            <>
              <div className="job-detail-header">
                <img src={selectedJob.logo} alt={selectedJob.company} className="job-logo-large" />
                <div>
                  <h2>{selectedJob.title}</h2>
                  <p className="company-name">{selectedJob.company}</p>
                  <p className="posted-time">Posted {selectedJob.postedDate}</p>
                </div>
              </div>

              <div className="job-detail-content">
                <div className="detail-section">
                  <h4>Job Details</h4>
                  <div className="detail-item">
                    <span className="label">Location</span>
                    <span className="value">📍 {selectedJob.location}</span>
                  </div>
                  <div className="detail-item">
                    <span className="label">Type</span>
                    <span className="value">{selectedJob.type}</span>
                  </div>
                  <div className="detail-item">
                    <span className="label">Salary</span>
                    <span className="value">{selectedJob.salary} {selectedJob.salaryNegotiable && '(Negotiable)'}</span>
                  </div>
                  <div className="detail-item">
                    <span className="label">Applicants</span>
                    <span className="value">{selectedJob.applicants}+</span>
                  </div>
                </div>

                <div className="detail-section">
                  <h4>About This Role</h4>
                  <p>{selectedJob.fullDescription}</p>
                </div>

                <div className="detail-section">
                  <h4>Required Skills</h4>
                  <div className="skills-tags">
                    {selectedJob.skills.map((skill, i) => (
                      <span key={i} className="skill-tag">{skill}</span>
                    ))}
                  </div>
                </div>

                <div className="detail-section">
                  <h4>Benefits</h4>
                  <ul className="benefits-list">
                    {selectedJob.benefits.map((benefit, i) => (
                      <li key={i}>✓ {benefit}</li>
                    ))}
                  </ul>
                </div>

                <div className="job-detail-actions">
                  <button 
                    className={`btn-apply-detail ${appliedJobs.includes(selectedJob.id) ? 'applied' : ''}`}
                    onClick={() => applyJob(selectedJob.id)}
                    disabled={appliedJobs.includes(selectedJob.id)}
                  >
                    {appliedJobs.includes(selectedJob.id) ? '✓ Applied' : 'Easy Apply'}
                  </button>
                  <button 
                    className={`btn-save-detail ${savedJobs.includes(selectedJob.id) ? 'saved' : ''}`}
                    onClick={() => saveJob(selectedJob.id)}
                  >
                    {savedJobs.includes(selectedJob.id) ? '❤️ Saved' : '🤍 Save'}
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="no-job-selected">
              <p>Select a job to view details</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function Network({network, connectUser}){
  return (
    <div className="network-page">
      <div className="network-header">
        <h2>Your Network</h2>
        <p>Connect with professionals in your field and expand your opportunities</p>
      </div>
      
      <div className="network-stats">
        <div className="stat-card">
          <h4>247</h4>
          <p>Connections</p>
        </div>
        <div className="stat-card">
          <h4>48</h4>
          <p>Followers</p>
        </div>
        <div className="stat-card">
          <h4>1.2K</h4>
          <p>Profile Views</p>
        </div>
        <div className="stat-card">
          <h4>12</h4>
          <p>Connection Requests</p>
        </div>
      </div>

      <div className="network-tabs">
        <button className="tab-btn active">All</button>
        <button className="tab-btn">Recently Added</button>
        <button className="tab-btn">Groups</button>
      </div>

      <h3 className="suggestions-title">People You May Know</h3>
      <div className="network-suggestions">
        {network.map(person => (
          <div key={person.id} className="network-card">
            <div className="network-card-header">
              <div className="network-avatar-container">
                <img src={person.img} alt={person.name} className="network-avatar" />
                <span className={`online-status ${person.status}`}></span>
              </div>
              <div className="network-info">
                <h4>{person.name}</h4>
                <p className="network-headline">{person.headline}</p>
                <p className="mutual-friends">👥 {person.mutualFriends} mutual connections</p>
                <p className="network-industry">📌 {person.industry}</p>
              </div>
            </div>
            
            <div className="network-endorsements">
              <span className="endorsement-label">Endorsed for:</span>
              <div className="endorsement-tags">
                {person.endorsed.slice(0, 2).map((skill, i) => (
                  <span key={i} className="endorsement-tag">{skill}</span>
                ))}
              </div>
            </div>

            <button 
              className={`btn-connect ${person.connected ? 'connected' : ''}`}
              onClick={() => connectUser(person.id)}
              disabled={person.connected}
            >
              {person.connected ? '✓ Connected' : '+ Connect'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

function Notifications({notifications, dismissNotification}){
  const [filterType, setFilterType] = useState("all");
  const unreadCount = notifications.filter(n => !n.read).length;

  const filteredNotifications = filterType === "all" ? notifications : notifications.filter(n => n.type === filterType);

  const getNotificationIcon = (type) => {
    const icons = {
      connection: "🤝",
      like: "👍",
      comment: "💬",
      job: "💼",
      mention: "🏷️",
      milestone: "🎯",
      endorsement: "⭐",
      birthday: "🎂"
    };
    return icons[type] || "📬";
  };

  return (
    <div className="notifications-page">
      <div className="notifications-header">
        <div>
          <h2>Notifications</h2>
          <p>Stay updated with activity on your profile and network</p>
        </div>
        {unreadCount > 0 && <span className="unread-badge">{unreadCount} new</span>}
      </div>

      <div className="notification-tabs">
        <button className={`tab-btn ${filterType === "all" ? "active" : ""}`} onClick={() => setFilterType("all")}>All</button>
        <button className={`tab-btn ${filterType === "connection" ? "active" : ""}`} onClick={() => setFilterType("connection")}>Connections</button>
        <button className={`tab-btn ${filterType === "job" ? "active" : ""}`} onClick={() => setFilterType("job")}>Jobs</button>
        <button className={`tab-btn ${filterType === "mention" ? "active" : ""}`} onClick={() => setFilterType("mention")}>Mentions</button>
      </div>

      <div className="notifications-list">
        {filteredNotifications.length === 0 ? (
          <div className="no-notifications">
            <p>No notifications</p>
          </div>
        ) : (
          filteredNotifications.map(notif => (
            <div key={notif.id} className={`notification-item notification-${notif.type} ${!notif.read ? 'unread' : ''}`}>
              <span className="notif-icon">{getNotificationIcon(notif.type)}</span>
              {notif.img && <img src={notif.img} alt={notif.user} className="notif-avatar" />}
              <div className="notification-content">
                <p>
                  <strong>{notif.user || notif.title}</strong> {notif.action}
                </p>
                <span className="notification-time">{notif.time}</span>
              </div>
              <button 
                className="btn-dismiss"
                onClick={() => dismissNotification(notif.id)}
                title="Dismiss"
              >
                ✕
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
function Explore({posts, news, trendingTopics, events}){
  const [activeTab, setActiveTab] = useState("trending");

  return (
    <div className="explore-page">
      <div className="explore-header">
        <h2>Explore</h2>
        <p>Discover trending topics, news, and events</p>
      </div>

      <div className="explore-tabs">
        <button className={`explore-tab ${activeTab === "trending" ? "active" : ""}`} onClick={() => setActiveTab("trending")}>🔥 Trending</button>
        <button className={`explore-tab ${activeTab === "events" ? "active" : ""}`} onClick={() => setActiveTab("events")}>📅 Events</button>
        <button className={`explore-tab ${activeTab === "news" ? "active" : ""}`} onClick={() => setActiveTab("news")}>📰 News</button>
        <button className={`explore-tab ${activeTab === "articles" ? "active" : ""}`} onClick={() => setActiveTab("articles")}>📄 Articles</button>
      </div>

      <div className="explore-content">
        {activeTab === "trending" && (
          <div className="explore-grid">
            {trendingTopics.map(topic => (
              <div key={topic.id} className="explore-card trending-card">
                <div className="card-icon">🏷️</div>
                <h3>{topic.hashtag}</h3>
                <p className="card-meta">{topic.posts} posts</p>
                {topic.trending && <span className="card-badge">📈 Trending</span>}
                <button className="card-action">Follow</button>
              </div>
            ))}
          </div>
        )}

        {activeTab === "events" && (
          <div className="explore-grid">
            {events.map(event => (
              <div key={event.id} className="explore-card event-card">
                <div className="card-icon">{event.image}</div>
                <h3>{event.title}</h3>
                <p className="card-meta">{event.date} • {event.time}</p>
                <p className="card-location">📍 {event.location}</p>
                <p className="card-attendees">👥 {event.attendees} attending</p>
                <button className="card-action">Register</button>
              </div>
            ))}
          </div>
        )}

        {activeTab === "news" && (
          <div className="explore-list">
            {news.map(item => (
              <div key={item.id} className="explore-news-item">
                <div className="news-header">
                  <h4>{item.title}</h4>
                  {item.trending && <span className="news-badge">🔥 Trending</span>}
                </div>
                <p className="news-source">{item.source}</p>
                <div className="news-footer">
                  <span className="news-time">{item.time}</span>
                  <span className="news-reads">👁️ {item.reads}</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === "articles" && (
          <div className="explore-list">
            <div className="article-placeholder">
              <p>📚 Featured articles coming soon...</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
function Messaging({chats,sendMessage}){
  const [active,setActive]=useState(Object.keys(chats)[0]||"");
  const [msg,setMsg]=useState("");
  const [searchChat, setSearchChat] = useState("");

  const filteredChats = Object.keys(chats).filter(name => 
    name.toLowerCase().includes(searchChat.toLowerCase())
  );

  return (
    <div className="messaging">
      <div className="messaging-container">
        <div className="chat-sidebar">
          <div className="chat-header">
            <h2>Messages</h2>
            <input 
              type="text"
              placeholder="Search conversations..."
              value={searchChat}
              onChange={(e) => setSearchChat(e.target.value)}
              className="chat-search"
            />
          </div>
          <div className="chat-list">
            {filteredChats.map(c => (
              <div 
                key={c} 
                className={`chat-item ${c===active?"active":""}`} 
                onClick={()=>setActive(c)}
              >
                <div className="chat-item-avatar">
                  {c.split(' ')[0][0]}{c.split(' ')[1]?.[0] || ''}
                </div>
                <div className="chat-item-content">
                  <h4>{c}</h4>
                  <p>{(chats[c]||[])[chats[c].length-1]?.text.substring(0, 30)}...</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="chat-main">
          {active ? (
            <>
              <div className="chat-header-main">
                <h3>{active}</h3>
              </div>
              <div className="messages">
                {(chats[active]||[]).map((m,i)=>(
                  <div key={i} className={`message ${m.from==="Vrishin"?"out":"in"}`}>
                    <div className="message-content">
                      <strong>{m.from}</strong>
                      <p>{m.text}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="message-input-container">
                <input 
                  value={msg} 
                  onChange={e=>setMsg(e.target.value)} 
                  onKeyDown={e=>{if(e.key==="Enter" && msg.trim()){sendMessage(active,msg); setMsg("")}}} 
                  placeholder="Type a message..."
                  className="message-input"
                />
                <button onClick={() => {sendMessage(active, msg); setMsg("");}} className="btn-send">Send</button>
              </div>
            </>
          ) : (
            <div className="no-chat-selected">
              <p>Select a conversation to start messaging</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function Me({signOut, userProfile, setUserProfile, profileEditing, setProfileEditing, posts}){
  const [profileStrength] = useState(85);
  const [tempProfile, setTempProfile] = useState(userProfile);
  const [editingSection, setEditingSection] = useState(null);
  const [showPostsTab, setShowPostsTab] = useState(false);
  
  const [experience, setExperience] = useState(() => JSON.parse(localStorage.getItem("ln-experience")) || [
    { id: 1, title: "Full Stack Intern", company: "Tech Corp", location: "San Francisco, CA", duration: "Jan 2024 - Present", description: "Developing full-stack features using React and Node.js. Implemented real-time collaboration features serving 10K+ users. Improved API performance by 40% through query optimization.", skills: ["React", "Node.js", "MongoDB"] }
  ]);

  const [education, setEducation] = useState(() => JSON.parse(localStorage.getItem("ln-education")) || [
    { id: 1, degree: "Bachelor of Science in Computer Science", school: "University of California", duration: "2022 - Present", expected: "2026", gpa: "3.8/4.0", coursework: "Data Structures, Algorithms, Machine Learning, Web Development" }
  ]);

  const [certifications, setCertifications] = useState(() => JSON.parse(localStorage.getItem("ln-certifications")) || [
    { id: 1, title: "AWS Certified Cloud Practitioner", issuer: "Amazon Web Services (AWS)", date: "Mar 2024" },
    { id: 2, title: "React Professional Certificate", issuer: "Meta", date: "Jan 2024" }
  ]);

  const userPosts = posts.filter(p => p.author.name === userProfile.name);

  useEffect(() => { localStorage.setItem("ln-experience", JSON.stringify(experience)); }, [experience]);
  useEffect(() => { localStorage.setItem("ln-education", JSON.stringify(education)); }, [education]);
  useEffect(() => { localStorage.setItem("ln-certifications", JSON.stringify(certifications)); }, [certifications]);

  const handleEditClick = () => {
    setProfileEditing(true);
    setTempProfile(userProfile);
  };

  const handleSaveProfile = () => {
    setUserProfile(tempProfile);
    setProfileEditing(false);
  };

  const handleCancel = () => {
    setProfileEditing(false);
    setTempProfile(userProfile);
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if(file){
      const reader = new FileReader();
      reader.onload = (event) => {
        setUserProfile({...userProfile, avatar: event.target.result});
      };
      reader.readAsDataURL(file);
    }
  };

  const addExperience = () => {
    const newExp = { id: Date.now(), title: "", company: "", location: "", duration: "", description: "", skills: [] };
    setExperience([...experience, newExp]);
    setEditingSection(`exp-${newExp.id}`);
  };

  const updateExperience = (id, field, value) => {
    setExperience(experience.map(e => e.id === id ? {...e, [field]: value} : e));
  };

  const deleteExperience = (id) => {
    setExperience(experience.filter(e => e.id !== id));
  };

  const addEducation = () => {
    const newEdu = { id: Date.now(), degree: "", school: "", duration: "", expected: "", gpa: "", coursework: "" };
    setEducation([...education, newEdu]);
    setEditingSection(`edu-${newEdu.id}`);
  };

  const updateEducation = (id, field, value) => {
    setEducation(education.map(e => e.id === id ? {...e, [field]: value} : e));
  };

  const deleteEducation = (id) => {
    setEducation(education.filter(e => e.id !== id));
  };

  const addCertification = () => {
    const newCert = { id: Date.now(), title: "", issuer: "", date: "" };
    setCertifications([...certifications, newCert]);
    setEditingSection(`cert-${newCert.id}`);
  };

  const updateCertification = (id, field, value) => {
    setCertifications(certifications.map(c => c.id === id ? {...c, [field]: value} : c));
  };

  const deleteCertification = (id) => {
    setCertifications(certifications.filter(c => c.id !== id));
  };
  
  return (
    <div className="me-page">
      <div className="profile-banner" style={{background: userProfile.banner || "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"}}></div>
      
      <div className="profile-section">
        <div className="profile-header">
          <div className="profile-avatar-container">
            <img src={userProfile.avatar} alt="Profile" className="profile-avatar" />
            <label className="avatar-change-label">
              📷
              <input type="file" accept="image/*" onChange={handleAvatarChange} style={{display: 'none'}} />
            </label>
          </div>
          <div className="profile-info">
            {profileEditing ? (
              <div className="profile-edit-form">
                <input 
                  type="text" 
                  value={tempProfile.name} 
                  onChange={(e) => setTempProfile({...tempProfile, name: e.target.value})}
                  className="edit-input"
                  placeholder="Name"
                />
                <textarea 
                  value={tempProfile.headline} 
                  onChange={(e) => setTempProfile({...tempProfile, headline: e.target.value})}
                  className="edit-input"
                  placeholder="Headline"
                />
                <input 
                  type="text" 
                  value={tempProfile.location} 
                  onChange={(e) => setTempProfile({...tempProfile, location: e.target.value})}
                  className="edit-input"
                  placeholder="Location"
                />
                <input 
                  type="email" 
                  value={tempProfile.email} 
                  onChange={(e) => setTempProfile({...tempProfile, email: e.target.value})}
                  className="edit-input"
                  placeholder="Email"
                />
                <input 
                  type="tel" 
                  value={tempProfile.phone} 
                  onChange={(e) => setTempProfile({...tempProfile, phone: e.target.value})}
                  className="edit-input"
                  placeholder="Phone"
                />
                <div className="edit-buttons">
                  <button className="btn-save" onClick={handleSaveProfile}>Save Changes</button>
                  <button className="btn-cancel" onClick={handleCancel}>Cancel</button>
                </div>
              </div>
            ) : (
              <>
                <h2>{userProfile.name}</h2>
                <p className="profile-headline">{userProfile.headline}</p>
                {userProfile.openTo && <p className="profile-open-to">💼 {userProfile.openTo}</p>}
                <p className="profile-location">📍 {userProfile.location}</p>
                <p className="profile-contact">📧 {userProfile.email} | 📱 {userProfile.phone}</p>
              </>
            )}
          </div>
          {!profileEditing && (
            <div className="profile-actions">
              <button className="btn-edit-profile" onClick={handleEditClick}>✎ Edit Profile</button>
              <button className="btn-share-profile">Share Profile</button>
            </div>
          )}
        </div>

        <div className="profile-analytics">
          <div className="analytics-card">
            <h4>Profile Views</h4>
            <p className="analytics-number">{userProfile.profileViews}</p>
            <span className="analytics-change">📈 +45 this week</span>
          </div>
          <div className="analytics-card">
            <h4>Search Appearances</h4>
            <p className="analytics-number">{userProfile.searchAppearances}</p>
            <span className="analytics-change">📊 +12 this week</span>
          </div>
          <div className="analytics-card">
            <h4>Post Impressions</h4>
            <p className="analytics-number">2.4K</p>
            <span className="analytics-change">📈 +340 this week</span>
          </div>
        </div>

        <div className="profile-strength">
          <span className="strength-label">Profile Strength</span>
          <div className="strength-bar">
            <div className="strength-fill" style={{width: `${profileStrength}%`}}></div>
          </div>
          <span className="strength-text">{profileStrength}% Complete</span>
        </div>

        <div className="profile-tabs-header">
          <button className={`profile-tab ${!showPostsTab ? 'active' : ''}`} onClick={() => setShowPostsTab(false)}>About</button>
          <button className={`profile-tab ${showPostsTab ? 'active' : ''}`} onClick={() => setShowPostsTab(true)}>Posts ({userPosts.length})</button>
        </div>

        {!showPostsTab ? (
          <div className="profile-details">
            <div className="detail-card">
              <div className="card-header">
                <h4>Professional Summary</h4>
                <button className="card-menu">✎</button>
              </div>
              <p>Passionate full-stack developer with interest in web technologies, machine learning, and building scalable applications. I love solving complex problems and collaborating with talented teams. Always learning new technologies and contributing to open-source projects.</p>
              <a href="apple.com" className="view-more">Show more</a>
            </div>

            <div className="detail-card">
              <div className="card-header">
                <h4>Skills & Endorsements</h4>
                <button className="card-menu">✎</button>
              </div>
              <div className="skills-section">
                <div className="skill-item">
                  <div className="skill-info">
                    <span className="skill-name">React</span>
                    <span className="endorsement-count">👥 12 endorsements</span>
                  </div>
                  <div className="skill-bar">
                    <div className="skill-level" style={{width: "95%"}}></div>
                  </div>
                </div>
                <div className="skill-item">
                  <div className="skill-info">
                    <span className="skill-name">JavaScript</span>
                    <span className="endorsement-count">👥 8 endorsements</span>
                  </div>
                  <div className="skill-bar">
                    <div className="skill-level" style={{width: "90%"}}></div>
                  </div>
                </div>
                <div className="skill-item">
                  <div className="skill-info">
                    <span className="skill-name">Web Development</span>
                    <span className="endorsement-count">👥 6 endorsements</span>
                  </div>
                  <div className="skill-bar">
                    <div className="skill-level" style={{width: "85%"}}></div>
                  </div>
                </div>
                <div className="skill-item">
                  <div className="skill-info">
                    <span className="skill-name">UI/UX Design</span>
                    <span className="endorsement-count">👥 4 endorsements</span>
                  </div>
                  <div className="skill-bar">
                    <div className="skill-level" style={{width: "75%"}}></div>
                  </div>
                </div>
                <div className="skill-item">
                  <div className="skill-info">
                    <span className="skill-name">Python</span>
                    <span className="endorsement-count">👥 5 endorsements</span>
                  </div>
                  <div className="skill-bar">
                    <div className="skill-level" style={{width: "80%"}}></div>
                  </div>
                </div>
              </div>
            </div>

            <div className="detail-card">
              <div className="card-header">
                <h4>Experience</h4>
                <button className="card-menu" onClick={addExperience}>➕</button>
              </div>
              {experience.map(exp => (
                <div key={exp.id} className="experience-item">
                  {editingSection === `exp-${exp.id}` ? (
                    <div className="edit-form">
                      <input 
                        type="text" 
                        placeholder="Job Title"
                        value={exp.title}
                        onChange={(e) => updateExperience(exp.id, 'title', e.target.value)}
                        className="edit-input-small"
                      />
                      <input 
                        type="text" 
                        placeholder="Company"
                        value={exp.company}
                        onChange={(e) => updateExperience(exp.id, 'company', e.target.value)}
                        className="edit-input-small"
                      />
                      <input 
                        type="text" 
                        placeholder="Location"
                        value={exp.location}
                        onChange={(e) => updateExperience(exp.id, 'location', e.target.value)}
                        className="edit-input-small"
                      />
                      <input 
                        type="text" 
                        placeholder="Duration (e.g., Jan 2024 - Present)"
                        value={exp.duration}
                        onChange={(e) => updateExperience(exp.id, 'duration', e.target.value)}
                        className="edit-input-small"
                      />
                      <textarea 
                        placeholder="Description"
                        value={exp.description}
                        onChange={(e) => updateExperience(exp.id, 'description', e.target.value)}
                        className="edit-input-small"
                      />
                      <input 
                        type="text" 
                        placeholder="Skills (comma-separated)"
                        value={exp.skills.join(', ')}
                        onChange={(e) => updateExperience(exp.id, 'skills', e.target.value.split(',').map(s => s.trim()))}
                        className="edit-input-small"
                      />
                      <div className="edit-form-buttons">
                        <button className="btn-save-small" onClick={() => setEditingSection(null)}>Save</button>
                        <button className="btn-cancel-small" onClick={() => deleteExperience(exp.id)}>Delete</button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="exp-header">
                        <h5>{exp.title}</h5>
                        <button className="edit-btn" onClick={() => setEditingSection(`exp-${exp.id}`)}>✎</button>
                      </div>
                      <p className="experience-company">{exp.company}</p>
                      {exp.location && <p className="experience-location">📍 {exp.location}</p>}
                      {exp.duration && <span className="exp-date">{exp.duration}</span>}
                      {exp.description && <p>{exp.description}</p>}
                      {exp.skills.length > 0 && (
                        <div className="exp-skills">
                          {exp.skills.map((skill, i) => (
                            <span key={i} className="exp-skill">{skill}</span>
                          ))}
                        </div>
                      )}
                    </>
                  )}
                </div>
              ))}
            </div>

            <div className="detail-card">
              <div className="card-header">
                <h4>Education</h4>
                <button className="card-menu" onClick={addEducation}>➕</button>
              </div>
              {education.map(edu => (
                <div key={edu.id} className="education-item">
                  {editingSection === `edu-${edu.id}` ? (
                    <div className="edit-form">
                      <input 
                        type="text" 
                        placeholder="Degree"
                        value={edu.degree}
                        onChange={(e) => updateEducation(edu.id, 'degree', e.target.value)}
                        className="edit-input-small"
                      />
                      <input 
                        type="text" 
                        placeholder="School/University"
                        value={edu.school}
                        onChange={(e) => updateEducation(edu.id, 'school', e.target.value)}
                        className="edit-input-small"
                      />
                      <input 
                        type="text" 
                        placeholder="Duration (e.g., 2022 - Present)"
                        value={edu.duration}
                        onChange={(e) => updateEducation(edu.id, 'duration', e.target.value)}
                        className="edit-input-small"
                      />
                      <input 
                        type="text" 
                        placeholder="Expected Graduation"
                        value={edu.expected}
                        onChange={(e) => updateEducation(edu.id, 'expected', e.target.value)}
                        className="edit-input-small"
                      />
                      <input 
                        type="text" 
                        placeholder="GPA"
                        value={edu.gpa}
                        onChange={(e) => updateEducation(edu.id, 'gpa', e.target.value)}
                        className="edit-input-small"
                      />
                      <textarea 
                        placeholder="Relevant Coursework"
                        value={edu.coursework}
                        onChange={(e) => updateEducation(edu.id, 'coursework', e.target.value)}
                        className="edit-input-small"
                      />
                      <div className="edit-form-buttons">
                        <button className="btn-save-small" onClick={() => setEditingSection(null)}>Save</button>
                        <button className="btn-cancel-small" onClick={() => deleteEducation(edu.id)}>Delete</button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="exp-header">
                        <h5>{edu.degree}</h5>
                        <button className="edit-btn" onClick={() => setEditingSection(`edu-${edu.id}`)}>✎</button>
                      </div>
                      <p className="education-school">{edu.school}</p>
                      {edu.duration && <p className="education-date">{edu.duration}{edu.expected && ` • Expected ${edu.expected}`}</p>}
                      {edu.gpa && <p className="education-details">GPA: {edu.gpa}</p>}
                      {edu.coursework && <p className="education-details">Relevant Coursework: {edu.coursework}</p>}
                    </>
                  )}
                </div>
              ))}
            </div>

            <div className="detail-card">
              <div className="card-header">
                <h4>Certifications & Licenses</h4>
                <button className="card-menu" onClick={addCertification}>➕</button>
              </div>
              {certifications.map(cert => (
                <div key={cert.id} className="cert-item">
                  {editingSection === `cert-${cert.id}` ? (
                    <div className="edit-form">
                      <input 
                        type="text" 
                        placeholder="Certification Title"
                        value={cert.title}
                        onChange={(e) => updateCertification(cert.id, 'title', e.target.value)}
                        className="edit-input-small"
                      />
                      <input 
                        type="text" 
                        placeholder="Issuing Organization"
                        value={cert.issuer}
                        onChange={(e) => updateCertification(cert.id, 'issuer', e.target.value)}
                        className="edit-input-small"
                      />
                      <input 
                        type="text" 
                        placeholder="Issue Date"
                        value={cert.date}
                        onChange={(e) => updateCertification(cert.id, 'date', e.target.value)}
                        className="edit-input-small"
                      />
                      <div className="edit-form-buttons">
                        <button className="btn-save-small" onClick={() => setEditingSection(null)}>Save</button>
                        <button className="btn-cancel-small" onClick={() => deleteCertification(cert.id)}>Delete</button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="exp-header">
                        <div>
                          <span className="cert-badge">🏆</span>
                          <h5>{cert.title}</h5>
                        </div>
                        <button className="edit-btn" onClick={() => setEditingSection(`cert-${cert.id}`)}>✎</button>
                      </div>
                      <p>{cert.issuer} • Issued {cert.date}</p>
                    </>
                  )}
                </div>
              ))}
            </div>

            <div className="detail-card">
              <div className="card-header">
                <h4>Languages</h4>
                <button className="card-menu">✎</button>
              </div>
              <div className="language-item">
                <span className="language-name">English</span>
                <span className="language-level">Native or Bilingual</span>
              </div>
              <div className="language-item">
                <span className="language-name">Spanish</span>
                <span className="language-level">Elementary Proficiency</span>
              </div>
            </div>

            <div className="detail-card">
              <div className="card-header">
                <h4>Recommendations</h4>
                <button className="card-menu">✎</button>
              </div>
              <div className="recommendation-item">
                <p className="rec-text">"Vrishin is an exceptional developer with great attention to detail and a passion for clean code. A pleasure to work with!"</p>
                <p className="rec-by">— Jane Smith, Manager at TechCorp</p>
              </div>
              <div className="recommendation-item">
                <p className="rec-text">"Impressive problem-solving skills and always willing to help teammates. Highly recommended!"</p>
                <p className="rec-by">— Mike Johnson, Senior Engineer at TechCorp</p>
              </div>
            </div>

            <div className="detail-card">
              <div className="card-header">
                <h4>Account Settings</h4>
              </div>
              <div className="settings-list">
                <button className="setting-item">👤 Edit Profile</button>
                <button className="setting-item">🔒 Privacy & Safety</button>
                <button className="setting-item">🔔 Notification Preferences</button>
                <button className="setting-item">💾 Save Archive</button>
                <button className="setting-item danger" onClick={signOut}>🚪 Sign Out</button>
              </div>
            </div>
          </div>
        ) : (
          <div className="profile-posts-section">
            {userPosts.length > 0 ? (
              <div className="user-posts-list">
                {userPosts.map((p, i) => (
                  <Post key={i} post={p} idx={posts.indexOf(p)} onToggleLike={() => {}} onAddComment={() => {}} savedPosts={[]} savePost={() => {}} sendPost={() => {}} postMenu={null} setPostMenu={() => {}} />
                ))}
              </div>
            ) : (
              <div className="no-posts-message">
                <p>📝 No posts yet. Start sharing your thoughts and achievements!</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

function PremiumModal({ setShowPremiumModal }) {
  const [step, setStep] = useState('plans');
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState(null);
  const [cardData, setCardData] = useState({ name: '', email: '', cardNumber: '', expiry: '', cvc: '' });
  const [upiData, setUpiData] = useState({ name: '', email: '', upiId: '' });

  const plans = [
    { id: 'monthly', name: 'Monthly', price: '$9.99', description: 'Per month, billed monthly', benefits: ['Unlimited job applications', 'Premium profile', 'Analytics insights', 'Message filtering'] },
    { id: 'annual', name: 'Annual', price: '$99.99', description: 'Per year, Save 17%', benefits: ['Everything in Monthly', 'Priority support', 'Exclusive ads', 'Advanced search'] },
    { id: 'business', name: 'Business', price: '$29.99', description: 'Per month, billed monthly', benefits: ['All Premium features', 'Company insights', 'Hiring tools', 'Admin dashboard'] }
  ];

  const handleCheckout = (plan) => {
    setSelectedPlan(plan);
    setStep('payment-method');
    setPaymentMethod(null);
  };

  const handlePaymentMethodSelect = (method) => {
    setPaymentMethod(method);
    setStep('checkout');
  };

  const handleCardSubmit = (e) => {
    e.preventDefault();
    if(cardData.name && cardData.email && cardData.cardNumber && cardData.expiry && cardData.cvc){
      alert(`✅ Payment successful! Premium ${selectedPlan.name} subscription activated via Credit/Debit Card!`);
      setShowPremiumModal(false);
    } else {
      alert("Please fill all fields");
    }
  };

  const handleUpiSubmit = (e) => {
    e.preventDefault();
    if(upiData.name && upiData.email && upiData.upiId){
      alert(`✅ Payment successful! Premium ${selectedPlan.name} subscription activated via UPI!\nTransaction initiated to: ${upiData.upiId}`);
      setShowPremiumModal(false);
    } else {
      alert("Please fill all fields");
    }
  };

  return (
    <div className="modal-overlay" onClick={() => setShowPremiumModal(false)}>
      <div className="premium-modal" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={() => setShowPremiumModal(false)}>✕</button>
        
        {step === 'plans' ? (
          <div className="modal-content">
            <h2>Get Premium Access</h2>
            <p className="modal-subtitle">Unlock powerful features to advance your career</p>
            
            <div className="plans-grid">
              {plans.map(plan => (
                <div key={plan.id} className={`plan-card ${plan.id === 'annual' ? 'popular' : ''}`}>
                  {plan.id === 'annual' && <span className="popular-badge">Most Popular</span>}
                  <h3>{plan.name}</h3>
                  <div className="plan-price">{plan.price}</div>
                  <p className="plan-description">{plan.description}</p>
                  <ul className="plan-benefits">
                    {plan.benefits.map((benefit, i) => (
                      <li key={i}>✓ {benefit}</li>
                    ))}
                  </ul>
                  <button className="plan-btn" onClick={() => handleCheckout(plan)}>
                    Upgrade Now
                  </button>
                </div>
              ))}
            </div>
          </div>
        ) : step === 'payment-method' ? (
          <div className="modal-content">
            <h2>Select Payment Method</h2>
            <p className="modal-subtitle">{selectedPlan.name} - {selectedPlan.price}</p>
            
            <div className="payment-methods">
              <button 
                className="payment-method-btn"
                onClick={() => handlePaymentMethodSelect('card')}
              >
                <span className="method-icon">💳</span>
                <div className="method-info">
                  <h4>Credit/Debit Card</h4>
                  <p>Visa, Mastercard, RuPay</p>
                </div>
                <span className="method-arrow">→</span>
              </button>
              
              <button 
                className="payment-method-btn"
                onClick={() => handlePaymentMethodSelect('upi')}
              >
                <span className="method-icon">📱</span>
                <div className="method-info">
                  <h4>UPI Payment</h4>
                  <p>Google Pay, PhonePe, Paytm</p>
                </div>
                <span className="method-arrow">→</span>
              </button>
            </div>
            
            <button className="back-btn" onClick={() => setStep('plans')}>← Back to plans</button>
          </div>
        ) : paymentMethod === 'card' ? (
          <div className="modal-content">
            <h2>Card Payment</h2>
            <div className="checkout-summary">
              <p><strong>Plan:</strong> {selectedPlan.name}</p>
              <p><strong>Amount:</strong> {selectedPlan.price}</p>
            </div>
            
            <form className="checkout-form" onSubmit={handleCardSubmit}>
              <input 
                type="text" 
                placeholder="Full Name" 
                value={cardData.name}
                onChange={(e) => setCardData({...cardData, name: e.target.value})}
                required 
              />
              <input 
                type="email" 
                placeholder="Email Address" 
                value={cardData.email}
                onChange={(e) => setCardData({...cardData, email: e.target.value})}
                required 
              />
              <input 
                type="text" 
                placeholder="Card Number (16 digits)" 
                value={cardData.cardNumber}
                onChange={(e) => setCardData({...cardData, cardNumber: e.target.value.replace(/\s/g, '').slice(0, 16)})}
                maxLength="16"
                required 
              />
              <div className="form-row">
                <input 
                  type="text" 
                  placeholder="MM/YY" 
                  value={cardData.expiry}
                  onChange={(e) => setCardData({...cardData, expiry: e.target.value})}
                  required 
                />
                <input 
                  type="text" 
                  placeholder="CVC" 
                  value={cardData.cvc}
                  onChange={(e) => setCardData({...cardData, cvc: e.target.value.slice(0, 4)})}
                  maxLength="4"
                  required 
                />
              </div>
              <button type="submit" className="checkout-btn">
                Pay {selectedPlan.price}
              </button>
            </form>
            <button className="back-btn" onClick={() => setStep('payment-method')}>← Back</button>
          </div>
        ) : paymentMethod === 'upi' ? (
          <div className="modal-content">
            <h2>UPI Payment</h2>
            <div className="checkout-summary">
              <p><strong>Plan:</strong> {selectedPlan.name}</p>
              <p><strong>Amount:</strong> {selectedPlan.price}</p>
            </div>
            
            <form className="checkout-form" onSubmit={handleUpiSubmit}>
              <input 
                type="text" 
                placeholder="Full Name" 
                value={upiData.name}
                onChange={(e) => setUpiData({...upiData, name: e.target.value})}
                required 
              />
              <input 
                type="email" 
                placeholder="Email Address" 
                value={upiData.email}
                onChange={(e) => setUpiData({...upiData, email: e.target.value})}
                required 
              />
              <input 
                type="text" 
                placeholder="UPI ID (example@upi)" 
                value={upiData.upiId}
                onChange={(e) => setUpiData({...upiData, upiId: e.target.value})}
                required 
              />
              <p className="upi-note">💡 We support Google Pay, PhonePe, Paytm, and all major UPI apps</p>
              <button type="submit" className="checkout-btn">
                Pay {selectedPlan.price} via UPI
              </button>
            </form>
            <button className="back-btn" onClick={() => setStep('payment-method')}>← Back</button>
          </div>
        ) : null}
      </div>
    </div>
  );
}
