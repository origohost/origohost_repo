'use client';

import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

export function HeroVisual() {
  const isReduced = useReducedMotion();

  // Defined coordinate system for 7 nodes representing OrigoHOST elements
  const nodes = [
    { id: 'cloud', cx: 200, cy: 120, label: 'OrigoHOST Cloud VPS', r: 8, active: true },
    { id: 'academy', cx: 380, cy: 80, label: 'OrigoHOST Academy', r: 6, active: true },
    { id: 'community', cx: 120, cy: 260, label: 'Campus Chapters', r: 7, active: true },
    { id: 'events', cx: 280, cy: 220, label: 'CyberForge', r: 9, active: true },
    { id: 'ai', cx: 440, cy: 240, label: 'AI Labs', r: 6, active: false },
    { id: 'dev', cx: 220, cy: 340, label: 'Dev Environment', r: 7, active: true },
    { id: 'gate', cx: 360, cy: 360, label: 'OrigoHOST Gateway', r: 5, active: false },
  ];

  // Connection paths between nodes
  const connections = [
    { from: 'cloud', to: 'academy' },
    { from: 'cloud', to: 'events' },
    { from: 'cloud', to: 'community' },
    { from: 'community', to: 'dev' },
    { from: 'events', to: 'dev' },
    { from: 'events', to: 'ai' },
    { from: 'academy', to: 'ai' },
    { from: 'dev', to: 'gate' },
    { from: 'ai', to: 'gate' },
  ];

  return (
    <div className="relative w-full aspect-[5/4] sm:aspect-[4/3] max-w-lg mx-auto bg-white dark:bg-[#071225] border border-slate-200 dark:border-border/80 rounded-2xl p-6 shadow-2xl overflow-hidden">
      {/* ── Background Architectural Grid ── */}
      <div className="absolute inset-0 bg-grid-pattern opacity-15 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4/5 h-4/5 border border-dashed border-slate-300 dark:border-border/30 rounded-full pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1/2 h-1/2 border border-dashed border-slate-200 dark:border-border/20 rounded-full pointer-events-none" />

      {/* SVG Container */}
      <svg
        viewBox="0 0 540 440"
        className="relative z-10 w-full h-full select-none"
        aria-hidden="true"
      >
        {/* Draw Connection Cables */}
        <g stroke="currentColor" className="text-slate-400 dark:text-slate-600" strokeWidth="1.75" fill="none">
          {connections.map((conn) => {
            const startNode = nodes.find((n) => n.id === conn.from);
            const endNode = nodes.find((n) => n.id === conn.to);
            if (!startNode || !endNode) return null;

            return (
              <motion.path
                key={`${conn.from}-${conn.to}`}
                d={`M ${startNode.cx} ${startNode.cy} L ${endNode.cx} ${endNode.cy}`}
                initial={{ pathLength: 0, opacity: 0.3 }}
                animate={{ pathLength: 1, opacity: 0.6 }}
                transition={{ duration: 1.5, ease: 'easeOut', delay: 0.2 }}
              />
            );
          })}
        </g>

        {/* Draw Infrastructure Nodes */}
        <g>
          {nodes.map((node) => {
            return (
              <g key={node.id} className="cursor-pointer group">
                {/* Node Outer Glow */}
                {node.active && (
                  <motion.circle
                    cx={node.cx}
                    cy={node.cy}
                    r={node.r + 7}
                    className="fill-[#ff7316]/20 stroke-[#ff7316]/30"
                    animate={isReduced ? { scale: 1, opacity: 0.8 } : {
                      scale: [1, 1.25, 1],
                      opacity: [0.6, 1, 0.6],
                    }}
                    transition={isReduced ? { duration: 0 } : {
                      duration: 3,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                  />
                )}

                {/* Node Core */}
                <circle
                  cx={node.cx}
                  cy={node.cy}
                  r={node.r}
                  className={
                    node.active
                      ? 'fill-[#ff7316] stroke-white dark:stroke-[#071225] stroke-[2.5px]'
                      : 'fill-slate-400 dark:fill-slate-600 stroke-white dark:stroke-[#071225] stroke-[2.5px]'
                  }
                />

                {/* Node Label Tooltip on Hover */}
                <text
                  x={node.cx}
                  y={node.cy - node.r - 8}
                  textAnchor="middle"
                  className="font-mono text-[11px] font-bold fill-slate-800 dark:fill-slate-100 opacity-0 group-hover:opacity-100 transition-opacity duration-150 pointer-events-none"
                >
                  {node.label}
                </text>
              </g>
            );
          })}
        </g>
      </svg>

      {/* Topology Status Overlay */}
      <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-body-xs font-mono border-t border-slate-200 dark:border-border/40 pt-3">
        <span className="flex items-center gap-1.5 text-slate-600 dark:text-slate-400 font-bold">
          <span className="h-2 w-2 rounded-full bg-emerald-500 inline-block animate-pulse" />
          SYSTEM_METRICS: NOMINAL
        </span>
        <span className="text-[#ff7316] font-bold">12/12 NODES ONLINE</span>
      </div>
    </div>
  );
}
