import { useState, useEffect, FormEvent } from 'react';
import { Star, MessageSquarePlus, MessageSquareCode, Filter, Heart, User, Sparkles } from 'lucide-react';
import { Review } from '../types';
import { REAL_REVIEWS } from '../data/cakes';

export default function ReviewsSection() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [searchWord, setSearchWord] = useState('');
  
  // Submit raw state
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [newAuthor, setNewAuthor] = useState('');
  const [newRating, setNewRating] = useState(5);
  const [newText, setNewText] = useState('');
  const [newReviewTags, setNewReviewTags] = useState<string[]>([]);
  const [formFeedback, setFormFeedback] = useState('');

  // Hydrate from localStorage and real static reviews
  useEffect(() => {
    const saved = localStorage.getItem('cakery_reviews');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setReviews([...parsed, ...REAL_REVIEWS]);
      } catch (e) {
        setReviews(REAL_REVIEWS);
      }
    } else {
      setReviews(REAL_REVIEWS);
    }
  }, []);

  // Filter reviews
  const filteredReviews = reviews.filter((rev) => {
    if (!searchWord) return true;
    const word = searchWord.toLowerCase();
    return (
      rev.text.toLowerCase().includes(word) ||
      rev.author.toLowerCase().includes(word) ||
      (rev.tags && rev.tags.some((t) => t.toLowerCase().includes(word)))
    );
  });

  const handleAddReview = (e: FormEvent) => {
    e.preventDefault();
    if (!newAuthor.trim() || !newText.trim()) {
      setFormFeedback('Please fill out your name and write a message!');
      return;
    }

    const brandNewReview: Review = {
      id: `custom-rev-${Date.now()}`,
      author: newAuthor.trim(),
      rating: newRating,
      timeAgo: 'Just now',
      text: newText.trim(),
      tags: newReviewTags.length > 0 ? newReviewTags : ['homemade cake'],
      reviewCount: 1,
    };

    const localList = JSON.parse(localStorage.getItem('cakery_reviews') || '[]');
    const updatedLocalList = [brandNewReview, ...localList];
    localStorage.setItem('cakery_reviews', JSON.stringify(updatedLocalList));

    setReviews([brandNewReview, ...reviews]);
    
    // Reset form
    setNewAuthor('');
    setNewRating(5);
    setNewText('');
    setNewReviewTags([]);
    setShowReviewForm(false);
    setFormFeedback('Thank you! Your feedback will show up in the community feed.');
    setTimeout(() => setFormFeedback(''), 4000);
  };

  const handleToggleTag = (tag: string) => {
    setNewReviewTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  return (
    <section id="reviews" className="py-20 bg-[#FDFBF7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
         {/* Category Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="font-sans text-xs font-bold text-[#A0522D] tracking-widest uppercase">Verified Customer Testimonials</span>
          <h2 className="font-serif text-3xl sm:text-4xl font-black text-[#3D2B1F] mt-1">
            Loved by Families in Kanhangad
          </h2>
          <p className="font-sans text-xs sm:text-sm text-[#3D2B1F]/70 mt-3">
            With over 162 reviews on Google Maps, Manju’s bakes hold a perfect 5.0 Star rating. 
            Check out what visitors and parents say about the quality, color and fresh ingredients.
          </p>
        </div>

        {/* Rating Overview & New Review Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-12">
          
          {/* Left Block: Google Maps Summary Block */}
          <div className="lg:col-span-4 bg-[#EADBC8]/40 border border-[#3D2B1F]/10 rounded-3xl p-6 sm:p-8 space-y-6 text-center lg:text-left">
            
            <div className="space-y-2">
              <span className="text-sm font-bold text-amber-900/50 uppercase tracking-widest font-sans">Verified Score</span>
              <div className="flex items-baseline justify-center lg:justify-start gap-2">
                <span className="font-serif text-5xl font-extrabold text-amber-950">5.0</span>
                <span className="font-sans text-sm text-amber-950/60">out of 5.0 stars</span>
              </div>
              <div className="flex justify-center lg:justify-start text-amber-400 gap-0.5 pt-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-amber-400" />
                ))}
              </div>
              <p className="font-sans text-xs text-amber-950/70 pt-2 font-medium">
                Based on <strong>162 verified customer</strong> submissions.
              </p>
            </div>

            {/* Simulated Star bars */}
            <div className="space-y-2.5 pt-4 border-t border-amber-100">
              {[
                { label: '5 star', percent: 100 },
                { label: '4 star', percent: 0 },
                { label: '3 star', percent: 0 },
                { label: '2 star', percent: 0 },
                { label: '1 star', percent: 0 },
              ].map((row) => (
                <div key={row.label} className="flex items-center gap-3 text-xs text-amber-950/70 font-sans">
                  <span className="w-12 text-right shrink-0 font-medium">{row.label}</span>
                  <div className="flex-1 bg-amber-100 h-2.5 rounded-full overflow-hidden">
                    <div className="bg-amber-600 h-full rounded-full" style={{ width: `${row.percent}%` }} />
                  </div>
                  <span className="w-8 text-left shrink-0 font-bold">{row.percent === 100 ? '162' : '0'}</span>
                </div>
              ))}
            </div>

            {/* Call to review CTA */}
            <div className="pt-4 border-t border-amber-100">
              <button
                id="btn-trigger-review-form"
                onClick={() => setShowReviewForm(!showReviewForm)}
                className="w-full py-2.5 bg-amber-801 border border-amber-800 text-amber-950 hover:bg-amber-100 text-xs font-semibold rounded-xl flex items-center justify-center gap-2 transition-all cursor-pointer shadow-xs"
              >
                <MessageSquarePlus className="w-4 h-4 text-amber-900" />
                <span>Write a Review</span>
              </button>
            </div>

          </div>

          {/* Right Block: Interactive Feed */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* Quick Word Search bar */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-white/50 border border-amber-100/50 p-3 rounded-2xl shadow-xs">
              <div className="flex items-center gap-2 px-3 text-amber-900/60">
                <Filter className="w-4 h-4" />
                <span className="font-sans text-xs font-bold uppercase tracking-wider">Flavors Feedback:</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {['eggless cake', 'chocolate truffle cake', 'butterscotch', 'homemade cake'].map((tag) => (
                  <button
                    key={tag}
                    onClick={() => setSearchWord(searchWord === tag ? '' : tag)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                      searchWord === tag
                        ? 'bg-rose-50 border-rose-200 text-rose-800'
                        : 'bg-white border-amber-100 hover:border-amber-200 text-amber-900/70'
                    }`}
                  >
                    #{tag}
                  </button>
                ))}
                {searchWord && (
                  <button
                    onClick={() => setSearchWord('')}
                    className="text-xs text-rose-600 hover:text-rose-800 underline pl-1 cursor-pointer font-bold"
                  >
                    Clear Filter
                  </button>
                )}
              </div>
            </div>

            {/* Notification messages */}
            {formFeedback && (
              <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-3.5 rounded-xl font-sans text-xs font-bold flex items-center gap-2 select-none animate-fade-in">
                <Sparkles className="w-4 h-4 text-emerald-600 animate-pulse" />
                <span>{formFeedback}</span>
              </div>
            )}

            {/* Write review form overlay */}
            {showReviewForm && (
              <form
                id="form-add-review"
                onSubmit={handleAddReview}
                className="bg-amber-50/40 border border-amber-200/50 p-6 rounded-2xl shadow-xs space-y-4 animate-fade-in"
              >
                <h3 className="font-serif text-base font-bold text-amber-950">Add Your Home Baker Review</h3>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-amber-950 uppercase tracking-wider block">Your Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g., Lakshmi Kutty"
                      value={newAuthor}
                      onChange={(e) => setNewAuthor(e.target.value)}
                      className="w-full p-2 bg-white border border-amber-200 rounded-lg text-xs outline-none focus:ring-1 focus:ring-amber-500 text-amber-950"
                    />
                  </div>
                  
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-amber-950 uppercase tracking-wider block">Baking Star Rating *</label>
                    <div className="flex items-center gap-1 mt-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setNewRating(star)}
                          className="p-1 cursor-pointer"
                        >
                          <Star className={`w-6 h-6 ${star <= newRating ? 'text-amber-500 fill-amber-500' : 'text-gray-300'}`} />
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-amber-950 uppercase tracking-wider block">What bakes did you try & how was the taste? *</label>
                  <textarea
                    rows={3}
                    required
                    placeholder="Describe your cake order - eggless sponge weight, colors, cream density, and pick up experience..."
                    value={newText}
                    onChange={(e) => setNewText(e.target.value)}
                    className="w-full p-2 bg-white border border-amber-200 rounded-lg text-xs outline-none focus:ring-1 focus:ring-amber-500 text-amber-950 font-sans"
                  />
                </div>

                {/* Tag choices */}
                <div className="space-y-1">
                  <span className="text-xs font-bold text-amber-950 uppercase tracking-wider block">Choose matching tags:</span>
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {['eggless cake', 'butterscotch', 'chocolate truffle cake', 'homemade cake', 'kids safe', 'low cream'].map((t) => {
                      const active = newReviewTags.includes(t);
                      return (
                        <button
                          key={t}
                          type="button"
                          onClick={() => handleToggleTag(t)}
                          className={`px-2.5 py-1 text-[10px] font-bold rounded-md border cursor-pointer ${
                            active 
                              ? 'bg-rose-50 border-rose-200 text-rose-800' 
                              : 'bg-white border-amber-100 text-amber-900/60'
                          }`}
                        >
                          {t}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Submit button row */}
                <div className="flex justify-end gap-2 pt-2 border-t border-amber-100">
                  <button
                    type="button"
                    onClick={() => setShowReviewForm(false)}
                    className="px-4 py-2 bg-white border border-amber-200 rounded-lg text-xs font-bold text-amber-950 hover:bg-amber-100 cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-amber-800 text-amber-50 rounded-lg text-xs font-bold hover:bg-amber-900 cursor-pointer flex items-center gap-1"
                  >
                    Submit Review
                  </button>
                </div>

              </form>
            )}

            {/* Review Cards list */}
            <div className="space-y-4 max-h-[500px] overflow-y-auto pr-1">
              {filteredReviews.map((rev) => (
                <div
                  key={rev.id}
                  className="bg-[#F5E6DA]/50 border border-[#3D2B1F]/10 p-5 rounded-2xl shadow-xs space-y-3"
                >
                  
                  {/* review Header */}
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 bg-amber-100 text-amber-801 rounded-xl flex items-center justify-center font-bold text-sm">
                        {rev.author[0]}
                      </div>
                      <div className="leading-tight">
                        <h4 className="font-serif text-sm font-bold text-amber-950 flex items-center gap-1.5">
                          {rev.author}
                          {rev.reviewCount && rev.reviewCount > 1 && (
                            <span className="text-[10px] bg-amber-100 font-sans text-amber-800 font-medium px-1 rounded">
                              {rev.reviewCount} local bakes
                            </span>
                          )}
                        </h4>
                        <span className="font-sans text-[10.5px] text-amber-900/50">{rev.timeAgo}</span>
                      </div>
                    </div>

                    {/* Stars */}
                    <div className="flex text-amber-400">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className={`w-3.5 h-3.5 ${i < rev.rating ? 'fill-amber-450 text-amber-500' : 'text-gray-200'}`} />
                      ))}
                    </div>

                  </div>

                  {/* Review text */}
                  <p className="font-sans text-xs sm:text-sm text-amber-950/80 leading-relaxed italic">
                    "{rev.text}"
                  </p>

                  {/* Tags */}
                  {rev.tags && rev.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1">
                      {rev.tags.map((t) => (
                        <span key={t} className="bg-amber-50 text-[10px] font-bold text-amber-805 px-2 py-0.5 rounded-md dark-txt">
                          #{t}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Response from Manju (Owner) */}
                  {rev.responseByOwner && (
                    <div className="bg-rose-50/50 border-l-2 border-rose-500 p-3 rounded-r-xl mt-2 select-none">
                      <div className="flex items-center gap-1 mb-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse" />
                        <span className="font-serif text-[11px] font-bold text-rose-800 uppercase tracking-wider">
                          Response from Manju (Cakery)
                        </span>
                      </div>
                      <span className="font-sans text-[11px] text-rose-950">
                        "{rev.responseByOwner}"
                      </span>
                    </div>
                  )}

                </div>
              ))}
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
