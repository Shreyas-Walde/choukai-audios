import React from 'react';

interface AudioCardProps {
    lesson: {
        id: string;
        title: string;
        duration: string;
        level: string;
        url: string;
    };
    isActive: boolean;
    onPlayToggle: () => void;
    progress: number;
    currentTime: number;
    duration: number;
    onSeek: (time: number) => void;
}

const formatTime = (seconds: number) => {
    if (!seconds || isNaN(seconds)) return "00:00";
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60);
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
};

export const AudioCard: React.FC<AudioCardProps> = ({ lesson, isActive, onPlayToggle, progress, currentTime, duration, onSeek }) => {
    return (
        <div className={`paper-card flex flex-col gap-5 rounded-2xl p-6 transition-all duration-300 ${isActive ? 'border-primary/40' : 'border-transparent cursor-pointer'}`}>

            {/* Top row: icon + title + controls */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 z-10 relative">
                <div className="flex items-center gap-5 flex-1">
                    {/* Play icon box - clickable */}
                    <button
                        onClick={onPlayToggle}
                        className={`size-14 rounded-xl flex items-center justify-center border transition-colors ${isActive
                            ? 'bg-primary/10 text-primary border-primary/20'
                            : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-400'
                            }`}>
                        <span className="material-symbols-outlined text-3xl">
                            {isActive ? 'pause_circle' : 'play_arrow'}
                        </span>
                    </button>

                    {/* Title + metadata */}
                    <div className="flex flex-col">
                        <h3 className="text-xl font-bold font-serif-jp mb-1 text-slate-900 dark:text-slate-100">
                            {lesson.title}
                        </h3>
                        <p className="text-slate-500 dark:text-slate-400 text-sm flex items-center gap-2">
                            <span className={`material-symbols-outlined text-[16px] ${isActive ? 'text-secondary' : ''}`}>schedule</span>
                            {lesson.duration}
                            <span className="text-slate-300 dark:text-slate-600">•</span>
                            {isActive
                                ? <span className="bg-slate-100 dark:bg-slate-700 px-2 py-0.5 rounded text-xs font-medium text-slate-600 dark:text-slate-300">{lesson.level}</span>
                                : <span className="text-xs text-slate-500 dark:text-slate-400">{lesson.level}</span>
                            }
                        </p>
                    </div>
                </div>

                {/* Play/Pause + Download buttons */}
                <div className="flex items-center gap-3 w-full sm:w-auto">
                    <button
                        onClick={onPlayToggle}
                        className={`flex items-center justify-center rounded-full h-12 w-12 transition-all ${isActive
                            ? 'bg-primary text-white shadow-lg shadow-primary/30 hover:scale-105'
                            : 'bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-slate-600 dark:text-slate-300 hover:bg-primary hover:border-primary hover:text-white shadow-sm'
                            }`}
                    >
                        <span className="material-symbols-outlined">
                            {isActive ? 'pause' : 'play_arrow'}
                        </span>
                    </button>
                    <a
                        href={lesson.url}
                        download
                        className="flex items-center justify-center rounded-xl h-12 w-12 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 hover:text-primary hover:bg-white transition-all"
                    >
                        <span className="material-symbols-outlined">download</span>
                    </a>
                </div>
            </div>

            {/* Progress bar */}
            {isActive ? (
                <div className="flex flex-col gap-2 w-full mt-2 z-10 relative">
                    <div className="relative group/slider flex items-center h-4 cursor-pointer">
                        <div className="absolute left-0 right-0 h-2 rounded-full bg-slate-100 dark:bg-slate-700 overflow-hidden shadow-inner pointer-events-none">
                            <div
                                className="h-full bg-primary rounded-full transition-all duration-300 relative"
                                style={{ width: `${progress}%` }}
                            >
                                <div className="absolute right-0 top-0 bottom-0 w-2 bg-white/30 rounded-full"></div>
                            </div>
                        </div>
                        <input
                            type="range"
                            min={0}
                            max={duration || 100}
                            value={currentTime || 0}
                            onChange={(e) => onSeek(Number(e.target.value))}
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                        />
                        <div
                            className="absolute h-4 w-4 bg-white rounded-full shadow-[0_2px_4px_rgba(0,0,0,0.2)] border-2 border-primary pointer-events-none transition-transform duration-200 ease-out group-hover/slider:scale-125 group-hover/slider:shadow-[0_0_10px_rgba(135,169,107,0.5)] z-20"
                            style={{ left: `calc(${progress}% - 8px)` }}
                        />
                    </div>
                    <div className="flex justify-between text-xs font-medium text-slate-400 uppercase tracking-widest font-mono">
                        <span>{formatTime(currentTime)}</span>
                        <span>{formatTime(duration)}</span>
                    </div>
                </div>
            ) : (
                <div className="h-1.5 w-full rounded-full bg-slate-100 dark:bg-slate-700/50 mt-2 z-10 relative"></div>
            )}
        </div>
    );
};
