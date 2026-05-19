'use client';
import { useState } from 'react';
import './globals.css';

const CATEGORIES = ["Tech", "Design", "AI", "Crypto", "Hardware"];

const ALL_NEWS = Array.from({ length: 150 }, (_, i) => ({
  id: i + 1,
  tag: CATEGORIES[i % CATEGORIES.length],
  title: `${["Pro", "Advanced", "Breaking", "Exclusive"][i % 4]} ${["Insight", "Update", "Report", "Leak"][i % 4]} #${i + 1}: ${["Next-gen Chips", "Market Surge", "Design Trends", "AI Safety"][i % 4]}`,
  excerpt: "A comprehensive look into the technological shifts defining the upcoming decade. This report covers architectural changes and strategic market movements that will impact global industries.",
  content: `This is the full detailed article for news item #${i + 1}. In a stunning turn of events, industry leaders have announced major breakthroughs that will reshape the landscape of ${CATEGORIES[i % CATEGORIES.length].toLowerCase()}. Experts predict this trend will accelerate exponentially over the next 12 months, creating new opportunities and challenges. \n\n"We are seeing unprecedented growth," said a lead researcher. "The metrics are off the charts, and the implications for both consumer and enterprise markets are profound." \n\nStay tuned as we continue to monitor this developing story and provide in-depth analysis on how this impacts the global ecosystem.`,
  time: `${(i % 24) + 1} hours ago`,
  author: ["Alex Rivers", "Elena Sky", "Marco V", "Sarah Chen"][i % 4],
  image: `https://picsum.photos/seed/auranews${i + 1}/400/250`
}));

export default function Home() {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [adsDisabled, setAdsDisabled] = useState(false);
  const [showPremiumModal, setShowPremiumModal] = useState(false);
  const [showInterstitial, setShowInterstitial] = useState(false);
  const [pendingArticle, setPendingArticle] = useState(null);
  const [showFloatingAd, setShowFloatingAd] = useState(true);
  const itemsPerPage = 15;

  const handleArticleClick = (item) => {
    if (adsDisabled) {
      setSelectedArticle(item);
    } else {
      setPendingArticle(item);
      setShowInterstitial(true);
      // Automatically dismiss interstitial and show article after 5 seconds
      setTimeout(() => {
        setShowInterstitial(false);
        setSelectedArticle(item);
        setPendingArticle(null);
      }, 5000);
    }
  };

  const filteredNews = ALL_NEWS.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) || item.tag.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeCategory === 'All' || item.tag === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const totalPages = Math.ceil(filteredNews.length / itemsPerPage);
  const displayedNews = filteredNews.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <>
      <header>
        <div className="container" style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', position: 'relative'}}>
          <div style={{display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'center'}}>
            <div className="brand" onClick={() => setActiveCategory('All')} style={{cursor: 'pointer'}}>AURA NEWS</div>
            <button className="burger-btn" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
              {isMobileMenuOpen ? '✕' : '☰'}
            </button>
          </div>
          <nav className={`nav-links ${isMobileMenuOpen ? 'open' : ''}`}>
            <a href="#" className={activeCategory === 'All' ? 'active' : ''} onClick={(e) => {e.preventDefault(); setActiveCategory('All'); setCurrentPage(1); setIsMobileMenuOpen(false);}}>Latest</a>
            {CATEGORIES.map(cat => (
              <a key={cat} href="#" className={activeCategory === cat ? 'active' : ''} onClick={(e) => {e.preventDefault(); setActiveCategory(cat); setCurrentPage(1); setIsMobileMenuOpen(false);}}>{cat}</a>
            ))}
          </nav>
        </div>
      </header>

      <main className="container">
        <section className="hero">
          <h1>Future Tech, <br/><span style={{color: 'var(--accent-color)'}}>Decoded.</span></h1>
          <div className="search-bar" style={{marginTop: '2rem'}}>
            <input 
              type="text" 
              placeholder="Search 150+ news items..." 
              value={searchTerm}
              onChange={(e) => {setSearchTerm(e.target.value); setCurrentPage(1);}}
              style={{padding: '1rem 2rem', borderRadius: '50px', width: '100%', maxWidth: '600px', background: '#111', border: '1px solid #222', color: '#fff'}}
            />
          </div>
        </section>

        <section id="feed" className="news-grid">
          {displayedNews.map((item, index) => (
            <div key={`news-group-${item.id}`} style={{ display: 'contents' }}>
              <div className="news-card" onClick={() => handleArticleClick(item)} style={{cursor: 'pointer'}}>
                <img src={item.image} alt={item.title} style={{width: '100%', height: '200px', objectFit: 'cover', borderRadius: '12px', marginBottom: '1rem'}} />
                <span className="tag">{item.tag}</span>
                <h3>{item.title}</h3>
                <p>{item.excerpt}</p>
                <div className="meta" style={{marginTop: '1rem', display: 'flex', justifyContent: 'space-between'}}>
                  <span>By {item.author}</span>
                  <span>{item.time}</span>
                </div>
              </div>
              {!adsDisabled && (index + 1) % 6 === 0 && (
                <div key={`ad-${item.id}`} className="ad-inline-bar">
                  <span className="ad-label">SPONSORED</span>
                  <div className="ad-content">Upgrade your workflow with Aura Pro AI Tools.</div>
                </div>
              )}
            </div>
          ))}
        </section>

        {totalPages > 1 && (
          <div className="pagination">
            <button disabled={currentPage === 1} onClick={() => {setCurrentPage(p => p - 1); window.scrollTo(0,0);}}>Prev</button>
            <span>Page {currentPage} of {totalPages}</span>
            <button disabled={currentPage === totalPages} onClick={() => {setCurrentPage(p => p + 1); window.scrollTo(0,0);}}>Next</button>
          </div>
        )}

        {/* Article Modal */}
        {selectedArticle && (
          <div className="modal-overlay" onClick={() => setSelectedArticle(null)} style={{position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.8)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            <div className="modal-content" onClick={e => e.stopPropagation()} style={{background: '#111', padding: '3rem', borderRadius: '20px', maxWidth: '800px', width: '90%', maxHeight: '90vh', overflowY: 'auto', border: '1px solid #333', position: 'relative'}}>
              <button onClick={() => setSelectedArticle(null)} style={{position: 'absolute', top: '1rem', right: '1.5rem', background: 'none', border: 'none', color: '#fff', fontSize: '2rem', cursor: 'pointer'}}>&times;</button>
              <span className="tag">{selectedArticle.tag}</span>
              <h2 style={{fontSize: '2.5rem', margin: '1rem 0'}}>{selectedArticle.title}</h2>
              <div className="meta" style={{marginBottom: '2rem', color: 'var(--accent-color)'}}>By {selectedArticle.author} • {selectedArticle.time}</div>
              <img src={selectedArticle.image} alt="Full" style={{width: '100%', borderRadius: '12px', marginBottom: '2rem', height: '400px', objectFit: 'cover'}} />
              <div style={{fontSize: '1.2rem', lineHeight: '1.8', color: '#ccc', whiteSpace: 'pre-wrap'}}>{selectedArticle.content}</div>
              
              {!adsDisabled && (
                <div className="ad-inline-bar" style={{marginTop: '3rem'}}>
                  <span className="ad-label">ARTICLE SPONSOR</span>
                  <div className="ad-content">Start your 14-day free trial on Aura Premium.</div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Interstitial Ad Modal */}
        {showInterstitial && (
          <div className="modal-overlay" style={{position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.95)', zIndex: 2000, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            <div className="modal-content" style={{background: '#111', padding: '3rem', borderRadius: '20px', maxWidth: '600px', width: '90%', textAlign: 'center', border: '1px solid #333', position: 'relative'}}>
              <span className="ad-tag" style={{display: 'inline-block', marginBottom: '1.5rem', color: 'var(--accent-color)', fontWeight: 'bold', letterSpacing: '2px'}}>SPONSORED CONTENT</span>
              <h2 style={{fontSize: '2rem', marginBottom: '1rem'}}>Level Up Your Tech Stack</h2>
              <p style={{color: '#aaa', marginBottom: '2rem'}}>Join 50,000+ developers using our advanced AI-powered IDE. Code faster and smarter today.</p>
              <div style={{display: 'flex', gap: '1rem', justifyContent: 'center'}}>
                <button onClick={() => {setShowInterstitial(false); setSelectedArticle(pendingArticle); setPendingArticle(null);}} style={{padding: '1rem 2rem', background: 'transparent', border: '1px solid #444', color: '#fff', borderRadius: '8px', cursor: 'pointer'}}>Skip Ad</button>
                <button style={{padding: '1rem 2rem', background: 'var(--accent-color)', border: 'none', color: '#000', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer'}}>Learn More</button>
              </div>
            </div>
          </div>
        )}

        {/* Premium Upgrade Modal */}
        {showPremiumModal && (
          <div className="modal-overlay" style={{position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.85)', zIndex: 3000, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            <div className="modal-content" style={{background: '#111', padding: '4rem 3rem', borderRadius: '20px', maxWidth: '500px', width: '90%', textAlign: 'center', border: '1px solid var(--accent-color)', position: 'relative'}}>
              <button onClick={() => setShowPremiumModal(false)} style={{position: 'absolute', top: '1rem', right: '1.5rem', background: 'none', border: 'none', color: '#fff', fontSize: '2rem', cursor: 'pointer'}}>&times;</button>
              <h2 style={{fontSize: '2.5rem', marginBottom: '1rem'}}>AURA <span style={{color: 'var(--accent-color)'}}>PRO</span></h2>
              <p style={{color: '#aaa', fontSize: '1.1rem', marginBottom: '2rem'}}>Unlock an ad-free reading experience, exclusive deep-dive reports, and premium newsletters.</p>
              <button onClick={() => {setAdsDisabled(true); setShowPremiumModal(false); setShowFloatingAd(false);}} style={{width: '100%', padding: '1.2rem', background: 'var(--accent-color)', border: 'none', color: '#000', fontSize: '1.2rem', fontWeight: 'bold', borderRadius: '8px', cursor: 'pointer', marginBottom: '1rem'}}>
                Upgrade for $4.99/mo
              </button>
              <p style={{color: '#666', fontSize: '0.9rem'}}>Cancel anytime. No commitment.</p>
            </div>
          </div>
        )}

      </main>

      {/* Floating Ad Banner */}
      {!adsDisabled && showFloatingAd && (
        <div style={{position: 'fixed', bottom: '20px', left: '50%', transform: 'translateX(-50%)', width: 'calc(100% - 40px)', maxWidth: '700px', background: 'rgba(20,20,20,0.95)', backdropFilter: 'blur(10px)', border: '1px solid #333', borderRadius: '16px', padding: '1rem 1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', zIndex: 100, boxShadow: '0 20px 40px rgba(0,0,0,0.5)'}}>
          <div style={{display: 'flex', alignItems: 'center', gap: '1rem'}}>
            <div style={{width: '40px', height: '40px', background: 'var(--accent-color)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#000', fontWeight: 'bold'}}>AI</div>
            <div>
              <p style={{fontSize: '0.8rem', color: '#888', margin: 0, textTransform: 'uppercase', letterSpacing: '1px'}}>Sponsored</p>
              <strong style={{color: '#fff', fontSize: '0.95rem'}}>Master AI Engineering in 4 Weeks</strong>
            </div>
          </div>
          <div style={{display: 'flex', gap: '1rem', alignItems: 'center'}}>
            <button style={{background: '#fff', color: '#000', border: 'none', padding: '0.5rem 1rem', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer', fontSize: '0.85rem'}}>Apply Now</button>
            <button onClick={() => setShowFloatingAd(false)} style={{background: 'none', border: 'none', color: '#888', fontSize: '1.5rem', cursor: 'pointer'}}>&times;</button>
          </div>
        </div>
      )}

      <footer className="premium-footer">
        <div className="container footer-grid">
          <div className="footer-brand">AURA.</div>
          <div className="footer-column">
            <h4>Discover</h4>
            <a href="#">Latest</a><a href="#">Tech</a><a href="#">AI</a>
          </div>
          <div className="footer-column">
            <h4>Help</h4>
            <a href="#">Support</a><a href="#">Ethics</a><a href="#">Contact</a>
          </div>
          <div className="footer-column">
            <h4>Premium</h4>
            {adsDisabled ? (
              <span style={{color: 'var(--accent-color)', fontWeight: 'bold'}}>Pro Active</span>
            ) : (
              <a href="#" onClick={(e) => {e.preventDefault(); setShowPremiumModal(true);}} style={{color: 'var(--accent-color)'}}>Go Ad-Free</a>
            )}
            <a href="#">Newsletter</a><a href="#">Events</a>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2026 Aura News Hub. | <a href="#">Terms</a> | <a href="#">Policy</a></p>
        </div>
      </footer>
    </>
  );
}
