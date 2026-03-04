"use client";

import React, { useState, useRef, useEffect } from 'react';
import { AudioCard } from './audio/AudioCard';
import { FolderPagination } from './ui/FolderPagination';

interface AudioDashboardProps {
    initialData: {
        folder1: any[];
        folder2: any[];
        folder3: any[];
        folder4: any[];
    }
}

export default function AudioDashboard({ initialData }: AudioDashboardProps) {
    const [activeFolder, setActiveFolder] = useState<number>(1);
    const [playingId, setPlayingId] = useState<string | null>(null);
    const [progress, setProgress] = useState<{ [key: string]: number }>({});
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [sessionSeconds, setSessionSeconds] = useState(0);

    const audioRef = useRef<HTMLAudioElement | null>(null);

    const currentLessons = initialData[`folder${activeFolder}` as keyof typeof initialData] || [];

    // Session timer
    useEffect(() => {
        const interval = setInterval(() => setSessionSeconds(s => s + 1), 1000);
        return () => clearInterval(interval);
    }, []);

    const formatSessionTime = (secs: number) => {
        const m = Math.floor(secs / 60).toString().padStart(2, '0');
        const s = (secs % 60).toString().padStart(2, '0');
        return `${m}:${s}`;
    };

    const handlePlayToggle = (lessonObj: any) => {
        if (playingId === lessonObj.id) {
            audioRef.current?.pause();
            setPlayingId(null);
            return;
        }
        audioRef.current?.pause();
        setPlayingId(lessonObj.id);
        const audio = new Audio(lessonObj.url);
        audioRef.current = audio;

        audio.addEventListener('loadedmetadata', () => setDuration(audio.duration));
        audio.addEventListener('timeupdate', () => {
            const currentTimeSec = audio.currentTime;
            const totalSec = audio.duration || 1;
            const percent = (currentTimeSec / totalSec) * 100;
            setCurrentTime(currentTimeSec);
            if (!isNaN(totalSec)) setDuration(totalSec);
            setProgress(prev => ({ ...prev, [lessonObj.id]: percent }));
        });
        audio.addEventListener('ended', () => {
            setPlayingId(null);
            setCurrentTime(0);
            setProgress(prev => ({ ...prev, [lessonObj.id]: 0 }));
        });
        audio.play().catch(e => console.error("Audio playback failed:", e));
    };

    const handleSeek = (newTimeSec: number) => {
        if (audioRef.current) {
            audioRef.current.currentTime = newTimeSec;
            setCurrentTime(newTimeSec);
        }
    };

    useEffect(() => {
        return () => { audioRef.current?.pause(); audioRef.current = null; };
    }, []);

    return (
        <div className="relative flex h-auto min-h-screen w-full flex-col overflow-x-hidden bg-background-light dark:bg-background-dark font-sans text-slate-900 dark:text-slate-100 antialiased">

            {/* Decorative background kanji SVG */}
            <div className="fixed top-0 right-0 w-96 h-96 opacity-10 pointer-events-none z-0">
                <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                    <path className="text-primary" d="M70,80 Q60,60 50,70 T40,40 Q50,30 60,40 T80,20 Q70,10 60,20 T40,10 Q30,20 40,30 T20,40 Q30,50 40,50 T30,70 Q40,80 50,80 Z" fill="currentColor" />
                    <path className="text-slate-800 dark:text-slate-200" d="M50,80 L50,100 M45,100 L55,100" stroke="currentColor" strokeWidth="2" />
                </svg>
            </div>

            <div className="relative flex h-full grow flex-col z-10">

                {/* Header */}
                <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-slate-200 dark:border-slate-800 px-6 py-4 lg:px-40 bg-background-light/90 dark:bg-background-dark/90 backdrop-blur-sm sticky top-0 z-50">
                    <div className="flex items-center gap-8">
                        <div className="flex items-center gap-3 text-primary">
                            <div className="w-9 h-9 flex items-center justify-center">
                                <svg className="w-full h-full text-primary" fill="currentColor" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                                    <circle cx="50" cy="50" fill="none" r="40" stroke="currentColor" strokeDasharray="210 40" strokeWidth="6" />
                                    <circle cx="50" cy="50" r="12" />
                                </svg>
                            </div>
                            <h2 className="text-slate-900 dark:text-slate-100 text-xl font-bold leading-tight tracking-tight font-serif-jp">Zen Nihongo</h2>
                        </div>
                        <nav className="hidden md:flex items-center gap-8">
                            <a className="text-slate-600 dark:text-slate-400 hover:text-primary dark:hover:text-primary text-sm font-medium transition-colors border-b-2 border-transparent hover:border-secondary pb-1" href="#">Lessons</a>
                            <a className="text-slate-600 dark:text-slate-400 hover:text-primary dark:hover:text-primary text-sm font-medium transition-colors border-b-2 border-transparent hover:border-secondary pb-1" href="#">Vocabulary</a>
                            <a className="text-slate-600 dark:text-slate-400 hover:text-primary dark:hover:text-primary text-sm font-medium transition-colors border-b-2 border-transparent hover:border-secondary pb-1" href="#">Grammar</a>
                            <a className="text-slate-600 dark:text-slate-400 hover:text-primary dark:hover:text-primary text-sm font-medium transition-colors border-b-2 border-transparent hover:border-secondary pb-1" href="#">Profile</a>
                        </nav>
                    </div>

                    <div className="flex flex-1 justify-end gap-4 items-center">
                        <label className="hidden sm:flex flex-col min-w-40 h-10 max-w-64">
                            <div className="flex w-full flex-1 items-stretch rounded-lg h-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm focus-within:border-secondary/50 focus-within:ring-1 focus-within:ring-secondary/50 transition-all">
                                <div className="text-slate-400 flex items-center justify-center pl-3">
                                    <span className="material-symbols-outlined text-xl">search</span>
                                </div>
                                <input className="flex w-full min-w-0 flex-1 border-none bg-transparent focus:ring-0 text-sm placeholder:text-slate-500 focus:outline-none px-2" placeholder="Search lessons..." />
                            </div>
                        </label>
                        <div className="flex gap-2">
                            <button className="flex items-center justify-center rounded-lg h-10 w-10 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-secondary/10 hover:text-primary transition-all shadow-sm">
                                <span className="material-symbols-outlined text-xl">notifications</span>
                            </button>
                            <button className="flex items-center justify-center rounded-lg h-10 w-10 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-secondary/10 hover:text-primary transition-all shadow-sm">
                                <span className="material-symbols-outlined text-xl">settings</span>
                            </button>
                        </div>
                        <div className="rounded-full size-10 border-2 border-secondary shadow-sm bg-primary/20 flex items-center justify-center font-bold text-primary text-sm">
                            ME
                        </div>
                    </div>
                </header>

                <main className="flex-1 px-6 lg:px-40 py-10">
                    {/* Breadcrumbs */}
                    <nav className="flex items-center gap-2 mb-8 text-sm font-serif-jp">
                        <a className="text-slate-500 dark:text-slate-400 hover:text-primary transition-colors" href="#">Home</a>
                        <span className="text-secondary">/</span>
                        <span className="text-slate-900 dark:text-slate-100 font-medium border-b border-primary/30 pb-0.5">Listening Practice</span>
                    </nav>

                    {/* Page Header */}
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
                        <div className="flex flex-col gap-3">
                            <h1 className="text-slate-900 dark:text-slate-100 text-5xl font-black leading-tight tracking-tight font-serif-jp relative inline-block">
                                Folder {activeFolder}
                                <span className="absolute -bottom-2 left-0 w-1/3 h-1 bg-secondary rounded-full"></span>
                            </h1>
                            <p className="text-slate-600 dark:text-slate-400 text-lg mt-2 font-serif-jp italic">{currentLessons.length} audio lessons curated for basic conversational mastery.</p>
                        </div>
                    </div>

                    {/* Audio Cards */}
                    <div className="grid grid-cols-1 gap-5 mb-16">
                        {currentLessons.map((lesson) => (
                            <AudioCard
                                key={lesson.id}
                                lesson={lesson}
                                isActive={playingId === lesson.id}
                                onPlayToggle={() => handlePlayToggle(lesson)}
                                progress={progress[lesson.id] || 0}
                                currentTime={playingId === lesson.id ? currentTime : 0}
                                duration={playingId === lesson.id ? duration : 0}
                                onSeek={handleSeek}
                            />
                        ))}
                    </div>

                    {/* Folder Pagination */}
                    <FolderPagination
                        activeFolder={activeFolder}
                        onSelect={setActiveFolder}
                        folderCount={4}
                    />
                </main>

                {/* Footer */}
                <footer className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-t border-slate-200 dark:border-slate-800 py-6 px-6 lg:px-40 relative z-10">
                    <div className="flex flex-wrap justify-between items-center gap-6">
                        <div className="flex items-center gap-8">
                            <div className="flex items-center gap-3 bg-slate-50 dark:bg-slate-800 px-4 py-2 rounded-lg border border-slate-100 dark:border-slate-700">
                                <span className="material-symbols-outlined text-base text-primary">timer</span>
                                <span className="text-sm font-medium text-slate-600 dark:text-slate-400">{formatSessionTime(sessionSeconds)}</span>
                            </div>
                        </div>
                        <div className="flex gap-6">
                            <button className="text-xs font-medium text-slate-400 hover:text-primary transition-colors font-serif-jp">Privacy Policy</button>
                            <button className="text-xs font-medium text-slate-400 hover:text-primary transition-colors font-serif-jp">Terms of Service</button>
                        </div>
                    </div>
                </footer>
            </div>
        </div>
    );
}
