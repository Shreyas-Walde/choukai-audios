import React from 'react';

interface PaginationProps {
    activeFolder: number;
    onSelect: (folderId: number) => void;
    folderCount: number;
}

const KANJI = ['一', '二', '三', '四', '五', '六', '七', '八', '九', '十'];

export const FolderPagination: React.FC<PaginationProps> = ({ activeFolder, onSelect, folderCount }) => {
    return (
        <div className="mt-24 pt-8 border-t border-slate-200/60 dark:border-slate-800/60 flex flex-col items-center gap-6 relative z-10">
            <p className="text-slate-400 dark:text-slate-500 text-[10px] font-bold uppercase tracking-[0.4em] font-sans">
                Folders
            </p>
            <div className="flex items-center justify-center gap-8 w-full max-w-2xl">
                {Array.from({ length: folderCount }).map((_, i) => {
                    const folderNum = i + 1;
                    const isActive = activeFolder === folderNum;
                    return (
                        <div key={folderNum} className="relative group flex items-center justify-center">
                            <button
                                onClick={() => onSelect(folderNum)}
                                className={`relative z-10 flex items-center justify-center font-sans text-2xl font-semibold transition-all ${isActive
                                        ? 'w-16 h-16 text-white scale-110 hover:scale-125'
                                        : 'w-14 h-14 text-slate-400 dark:text-slate-600 hover:text-primary hover:scale-110'
                                    }`}
                            >
                                {KANJI[i]}
                            </button>
                            {isActive && (
                                <div className="absolute inset-0 bg-primary rounded-full pagination-glow z-0"></div>
                            )}
                        </div>
                    );
                })}
                <button
                    onClick={() => activeFolder < folderCount && onSelect(activeFolder + 1)}
                    disabled={activeFolder === folderCount}
                    className="flex items-center justify-center w-12 h-12 ml-4 text-slate-300 dark:text-slate-700 hover:text-primary transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                >
                    <span className="material-symbols-outlined text-2xl">arrow_forward_ios</span>
                </button>
            </div>
        </div>
    );
};
