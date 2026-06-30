import React, { useState } from 'react';
import { Head, router } from '@inertiajs/react';

export default function Dashboard({ skills = [], badges = [], stats = {}, auth = {} }) {
    const [activeCategory, setActiveCategory] = useState('All');
    const [togglingId, setTogglingId] = useState(null);

    // Get unique categories from skills
    const categories = ['All', ...new Set(skills.map(s => s.category))];

    // Filter skills based on selected category
    const filteredSkills = activeCategory === 'All'
        ? skills
        : skills.filter(s => s.category === activeCategory);

    const toggleMilestone = (milestoneId) => {
        setTogglingId(milestoneId);
        router.post(`/milestones/${milestoneId}/toggle`, {}, {
            preserveScroll: true,
            preserveState: true,
            onFinish: () => setTogglingId(null),
        });
    };

    // Helper for category badge styling
    const getCategoryStyles = (category) => {
        switch (category) {
            case 'Frontend':
                return 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20';
            case 'Backend':
                return 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20';
            case 'Design':
                return 'bg-pink-500/10 text-pink-400 border-pink-500/20';
            case 'Database':
                return 'bg-amber-500/10 text-amber-400 border-amber-500/20';
            case 'DevOps':
                return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
            default:
                return 'bg-slate-500/10 text-slate-400 border-slate-500/20';
        }
    };

    // Badge Icon Components mapping
    const renderBadgeIcon = (iconType, isEarned) => {
        const baseColor = isEarned ? 'text-white' : 'text-slate-600';
        
        switch (iconType) {
            case 'star':
                return (
                    <svg className={`w-8 h-8 ${baseColor}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.907c.961 0 1.36 1.246.58 1.81l-3.97 2.883a1 1 0 00-.364 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.971-2.883a1 1 0 00-1.18 0l-3.97 2.883c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.364-1.118L2.98 9.42c-.78-.564-.38-1.81.58-1.81h4.907a1 1 0 00.95-.69l1.519-4.674z" />
                    </svg>
                );
            case 'shield':
                return (
                    <svg className={`w-8 h-8 ${baseColor}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                );
            case 'database':
                return (
                    <svg className={`w-8 h-8 ${baseColor}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
                    </svg>
                );
            case 'trophy':
                return (
                    <svg className={`w-8 h-8 ${baseColor}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                    </svg>
                );
            default:
                return (
                    <svg className={`w-8 h-8 ${baseColor}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                );
        }
    };

    // Badge styling container helper
    const getBadgeBoxStyles = (iconType, isEarned) => {
        if (!isEarned) {
            return 'bg-slate-900/40 border-slate-800 text-slate-500 opacity-60';
        }
        switch (iconType) {
            case 'star':
                return 'bg-gradient-to-br from-amber-500/20 to-orange-500/5 border-amber-500/40 text-amber-300 shadow-[0_0_20px_rgba(245,158,11,0.15)]';
            case 'shield':
                return 'bg-gradient-to-br from-cyan-500/20 to-teal-500/5 border-cyan-500/40 text-cyan-300 shadow-[0_0_20px_rgba(6,182,212,0.15)]';
            case 'database':
                return 'bg-gradient-to-br from-indigo-500/20 to-violet-500/5 border-indigo-500/40 text-indigo-300 shadow-[0_0_20px_rgba(99,102,241,0.15)]';
            case 'trophy':
                return 'bg-gradient-to-br from-rose-500/20 to-pink-500/5 border-rose-500/40 text-rose-300 shadow-[0_0_20px_rgba(244,63,94,0.15)]';
            default:
                return 'bg-gradient-to-br from-slate-500/20 to-zinc-500/5 border-slate-500/40 text-slate-300 shadow-[0_0_20px_rgba(100,116,139,0.15)]';
        }
    };

    return (
        <div className="bg-slate-950 text-slate-100 min-h-screen selection:bg-indigo-500 selection:text-white pb-20 relative overflow-hidden font-sans">
            <Head title="Skill Badge Dashboard" />

            {/* Backdrop Blur Glow Effects */}
            <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[50%] rounded-full bg-violet-600/10 blur-[150px] pointer-events-none"></div>
            <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[50%] rounded-full bg-cyan-600/10 blur-[150px] pointer-events-none"></div>

            {/* Navigation Header */}
            <header className="border-b border-slate-900 bg-slate-950/80 backdrop-blur-md sticky top-0 z-40">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                        <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center shadow-lg shadow-indigo-500/20">
                            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-200 to-slate-400">
                            SkillTrack
                        </span>
                    </div>

                    <div className="flex items-center space-x-4">
                        {auth?.user ? (
                            <div className="flex items-center space-x-3">
                                <div className="text-right">
                                    <p className="text-sm font-medium text-slate-200">{auth.user.name}</p>
                                    <p className="text-xs text-slate-400">{auth.user.email}</p>
                                </div>
                                <div className="w-8 h-8 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center font-semibold text-slate-300 text-sm">
                                    {auth.user.name.charAt(0)}
                                </div>
                            </div>
                        ) : (
                            <div className="flex items-center space-x-3 bg-slate-900/60 border border-slate-800 rounded-full px-4 py-1.5">
                                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></div>
                                <span className="text-xs font-medium text-slate-300">Alex Developer (Demo)</span>
                            </div>
                        )}
                    </div>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 z-10 relative">
                {/* Dashboard Intro */}
                <div className="mb-8">
                    <h1 className="text-4xl font-extrabold tracking-tight text-white mb-2 bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-200 to-slate-450">
                        Skill Badge Dashboard
                    </h1>
                    <p className="text-slate-400 text-lg max-w-2xl">
                        Track your coding milestones, build specialized expertise, and showcase earned validation badges dynamically.
                    </p>
                </div>

                {/* Overall Stats Cards */}
                <section className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
                    <div className="bg-slate-900/40 backdrop-blur-md border border-slate-800/80 rounded-2xl p-6 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-500/5 rounded-full blur-xl group-hover:bg-indigo-500/10 transition-colors"></div>
                        <p className="text-sm font-medium text-slate-400 uppercase tracking-wider mb-2">Overall Progress</p>
                        <div className="flex items-end space-x-2">
                            <span className="text-4xl font-bold text-white">{stats.overallProgress}%</span>
                            <span className="text-xs text-indigo-400 font-semibold mb-1">completed</span>
                        </div>
                        {/* Compact Line Bar */}
                        <div className="w-full bg-slate-850 h-2 rounded-full mt-4 overflow-hidden">
                            <div 
                                className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-full transition-all duration-700 ease-out" 
                                style={{ width: `${stats.overallProgress}%` }}
                            ></div>
                        </div>
                    </div>

                    <div className="bg-slate-900/40 backdrop-blur-md border border-slate-800/80 rounded-2xl p-6 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-24 h-24 bg-cyan-500/5 rounded-full blur-xl group-hover:bg-cyan-500/10 transition-colors"></div>
                        <p className="text-sm font-medium text-slate-400 uppercase tracking-wider mb-2">Milestones Met</p>
                        <div className="flex items-end space-x-2">
                            <span className="text-4xl font-bold text-white">{stats.completedMilestones}</span>
                            <span className="text-slate-400 text-sm mb-1">/ {stats.totalMilestones} total</span>
                        </div>
                        <p className="text-xs text-slate-405 mt-4 font-medium">Accumulating learning hours</p>
                    </div>

                    <div className="bg-slate-900/40 backdrop-blur-md border border-slate-800/80 rounded-2xl p-6 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/5 rounded-full blur-xl group-hover:bg-emerald-500/10 transition-colors"></div>
                        <p className="text-sm font-medium text-slate-400 uppercase tracking-wider mb-2">Skills Mastered</p>
                        <div className="flex items-end space-x-2">
                            <span className="text-4xl font-bold text-white">{stats.completedSkills}</span>
                            <span className="text-slate-400 text-sm mb-1">/ {stats.totalSkills} total</span>
                        </div>
                        <p className="text-xs text-slate-405 mt-4 font-medium">Reaching 100% completions</p>
                    </div>

                    <div className="bg-slate-900/40 backdrop-blur-md border border-slate-800/80 rounded-2xl p-6 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-24 h-24 bg-rose-500/5 rounded-full blur-xl group-hover:bg-rose-500/10 transition-colors"></div>
                        <p className="text-sm font-medium text-slate-400 uppercase tracking-wider mb-2">Badges Unlocked</p>
                        <div className="flex items-end space-x-2">
                            <span className="text-4xl font-bold text-white">{stats.earnedBadges}</span>
                            <span className="text-slate-400 text-sm mb-1">/ {badges.length} available</span>
                        </div>
                        <p className="text-xs text-slate-405 mt-4 font-medium">Showcased below</p>
                    </div>
                </section>

                {/* Badge Showcase Grid */}
                <section className="mb-12 bg-slate-900/30 border border-slate-900 rounded-3xl p-6 backdrop-blur-md">
                    <h2 className="text-xl font-bold text-slate-100 mb-6 flex items-center space-x-2">
                        <svg className="w-5 h-5 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                        </svg>
                        <span>Earned Badges</span>
                    </h2>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {badges.map((badge) => {
                            const isEarned = !!badge.earned_at;
                            return (
                                <div 
                                    key={badge.id} 
                                    className={`border rounded-2xl p-5 flex items-start space-x-4 transition-all duration-300 relative group overflow-hidden ${getBadgeBoxStyles(badge.icon_type, isEarned)}`}
                                >
                                    {isEarned && (
                                        <div className="absolute -top-10 -right-10 w-20 h-20 bg-white/5 rounded-full blur-xl group-hover:scale-150 transition-all duration-500"></div>
                                    )}

                                    {/* Icon Container */}
                                    <div className={`p-3 rounded-xl border ${isEarned ? 'bg-slate-900/80 border-slate-700/50' : 'bg-slate-900/20 border-slate-955/40'} flex-shrink-0`}>
                                        {renderBadgeIcon(badge.icon_type, isEarned)}
                                    </div>

                                    {/* Info details */}
                                    <div className="flex-1 min-w-0">
                                        <h3 className={`font-bold text-base truncate transition-colors ${isEarned ? 'text-white' : 'text-slate-500'}`}>
                                            {badge.name}
                                        </h3>
                                        <p className={`text-xs mt-1 leading-relaxed ${isEarned ? 'text-slate-350 font-normal' : 'text-slate-500 font-normal'}`}>
                                            {badge.description}
                                        </p>
                                        
                                        {/* Status message */}
                                        <div className="mt-3 flex items-center space-x-1.5">
                                            {isEarned ? (
                                                <>
                                                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                                                    <span className="text-[10px] text-emerald-400 font-bold uppercase tracking-wider">
                                                        Earned {new Date(badge.earned_at).toLocaleDateString(undefined, {month: 'short', day: 'numeric'})}
                                                    </span>
                                                </>
                                            ) : (
                                                <>
                                                    <span className="w-1.5 h-1.5 rounded-full bg-slate-700"></span>
                                                    <span className="text-[10px] text-slate-500 font-medium uppercase tracking-wider">
                                                        Locked: {badge.requirement_type === 'category_complete' ? `Complete ${badge.requirement_value}` : `Need ${badge.requirement_value} milestones`}
                                                    </span>
                                                </>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </section>

                {/* Workspace: Skills and Milestones */}
                <section>
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                        <h2 className="text-2xl font-bold text-white flex items-center space-x-2">
                            <span>Syllabus & Milestones</span>
                        </h2>

                        {/* Category filter pills */}
                        <div className="flex flex-wrap gap-2">
                            {categories.map((cat) => (
                                <button
                                    key={cat}
                                    onClick={() => setActiveCategory(cat)}
                                    className={`px-4 py-1.5 text-xs font-semibold rounded-full border transition-all duration-300 ${
                                        activeCategory === cat
                                            ? 'bg-indigo-600 border-indigo-500 text-white shadow-md shadow-indigo-600/10'
                                            : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
                                    }`}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Skill Cards Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {filteredSkills.map((skill) => {
                            const isSkillComplete = skill.progress === 100;
                            return (
                                <div 
                                    key={skill.id}
                                    className={`bg-slate-900/30 border rounded-3xl p-6 backdrop-blur-md transition-all duration-300 relative ${
                                        isSkillComplete 
                                            ? 'border-indigo-500/30 bg-gradient-to-b from-slate-900/30 to-indigo-950/5' 
                                            : 'border-slate-900 hover:border-slate-850'
                                    }`}
                                >
                                    {/* Category badge */}
                                    <div className="flex items-center justify-between mb-4">
                                        <span className={`px-2.5 py-0.5 text-[10px] font-bold tracking-wide uppercase rounded-md border ${getCategoryStyles(skill.category)}`}>
                                            {skill.category}
                                        </span>
                                        {isSkillComplete && (
                                            <span className="flex items-center space-x-1 text-emerald-400 text-xs font-bold bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                                                <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                                </svg>
                                                <span>Mastered</span>
                                            </span>
                                        )}
                                    </div>

                                    {/* Skill Title & Description */}
                                    <h3 className="text-xl font-bold text-white mb-1.5">{skill.name}</h3>
                                    <p className="text-slate-400 text-xs leading-relaxed mb-5 min-h-[32px]">
                                        {skill.description}
                                    </p>

                                    {/* Progress Header */}
                                    <div className="flex justify-between items-center text-xs font-semibold text-slate-350 mb-2">
                                        <span>Progress</span>
                                        <span className={isSkillComplete ? 'text-indigo-400 font-bold' : ''}>
                                            {skill.progress}% ({skill.milestones_completed}/{skill.milestones_count})
                                        </span>
                                    </div>

                                    {/* Progress Bar Container */}
                                    <div className="w-full bg-slate-950/80 h-2.5 rounded-full overflow-hidden border border-slate-900 mb-6">
                                        <div 
                                            className={`h-full rounded-full transition-all duration-700 ease-out ${
                                                isSkillComplete 
                                                    ? 'bg-gradient-to-r from-indigo-500 to-emerald-500' 
                                                    : 'bg-gradient-to-r from-violet-600 via-indigo-600 to-cyan-500'
                                            }`} 
                                            style={{ width: `${skill.progress}%` }}
                                        ></div>
                                    </div>

                                    {/* Milestones Header */}
                                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 border-b border-slate-900 pb-2 mb-3">
                                        Milestones
                                    </h4>

                                    {/* Milestone Checklist */}
                                    <div className="space-y-2">
                                        {skill.milestones?.map((milestone) => {
                                            const isToggling = togglingId === milestone.id;
                                            return (
                                                <label 
                                                    key={milestone.id}
                                                    className={`flex items-center space-x-3 p-2.5 rounded-xl border transition-all duration-200 cursor-pointer select-none ${
                                                        milestone.completed 
                                                            ? 'bg-slate-950/20 border-slate-950/45 text-slate-450' 
                                                            : 'bg-slate-950/50 border-slate-900/60 hover:bg-slate-900/10 text-slate-200'
                                                    }`}
                                                >
                                                    {/* Custom Checkbox Input */}
                                                    <div className="relative flex items-center justify-center flex-shrink-0">
                                                        <input 
                                                            type="checkbox"
                                                            checked={milestone.completed}
                                                            onChange={() => toggleMilestone(milestone.id)}
                                                            disabled={isToggling}
                                                            className="sr-only" // hide native input
                                                        />
                                                        {/* Checkbox box design */}
                                                        <div className={`w-5 h-5 rounded-md border flex items-center justify-center transition-all ${
                                                            milestone.completed 
                                                                ? 'bg-indigo-600 border-indigo-500' 
                                                                : 'bg-slate-900 border-slate-800'
                                                        }`}>
                                                            {isToggling ? (
                                                                // Loading Spinner
                                                                <svg className="animate-spin h-3.5 w-3.5 text-white" fill="none" viewBox="0 0 24 24">
                                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                                </svg>
                                                            ) : milestone.completed ? (
                                                                // Check icon
                                                                <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                                                </svg>
                                                            ) : null}
                                                        </div>
                                                    </div>

                                                    {/* Milestone Title text */}
                                                    <span className={`text-xs font-medium transition-all ${milestone.completed ? 'line-through opacity-60' : ''}`}>
                                                        {milestone.name}
                                                    </span>
                                                </label>
                                            );
                                        })}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </section>
            </main>
        </div>
    );
}
