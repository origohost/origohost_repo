'use client';

import React, { useState, useEffect } from 'react';
import { Terminal, Copy, Check, Play, RotateCcw } from 'lucide-react';

type TabId = 'deploy' | 'git' | 'logs';
// Deploy simulation steps
const DEPLOY_STEPS = [
  { text: '$ origo cloud deploy --app origo-hackathon-api --region in-north', delay: 800 },
  { text: '⠋ Resolving code dependencies and configuration file...', delay: 1000 },
  { text: '✓ Verified next.config.ts and tailwind.config.ts config schemas', delay: 800 },
  { text: '⠙ Injecting secure OrigoHOST secrets and environment maps...', delay: 1200 },
  { text: '✓ Container compiled successfully (2.4s) | Size: 142.4 MB', delay: 1000 },
  { text: '⠸ Directing traffic routes through virtual gateway nodes...', delay: 900 },
  { text: '✓ Provisioned SSL/TLS certificated gateway route', delay: 600 },
  { text: '🚀 Deployed successfully to IN-NORTH region!', delay: 500 },
  { text: '🔗 Endpoint URL: https://origo-hackathon-api.origohost.dev', delay: 500 },
];

// Git hook simulation steps
const GIT_STEPS = [
  { text: '$ git push origo main', delay: 800 },
  { text: 'Enumerating objects: 12, done.', delay: 600 },
  { text: 'Counting objects: 100% (12/12), done.', delay: 500 },
  { text: 'Delta compression using up to 8 threads', delay: 600 },
  { text: 'Compressing objects: 100% (6/6), done.', delay: 400 },
  { text: 'Writing objects: 100% (8/8), 1.24 KiB | 1.24 MiB/s, done.', delay: 500 },
  { text: 'remote:   [ORIGOHOST CI/CD PIPELINE TRIGGERED]', delay: 800 },
  { text: 'remote:   ✓ Run TypeScript checks (tsc --noEmit) - SUCCESS', delay: 900 },
  { text: 'remote:   ✓ Build production static pages - SUCCESS', delay: 1000 },
  { text: 'To https://git.origohost.com/builders/main-repo.git', delay: 500 },
  { text: '   a2f58e1..c91d4e7  main -> main', delay: 300 },
];

// Sandbox logs simulation steps
const LOG_STEPS = [
  { text: 'origohost-node-01: [INFO] Sandbox virtual environment listener initialized on port 3000', delay: 800 },
  { text: 'origohost-node-01: [INFO] DB Pool initialized (Supabase) - Active connections: 4/10', delay: 900 },
  { text: 'origohost-node-01: [WARN] Memory footprint: 48.2 MB / 512 MB (Optimal)', delay: 1200 },
  { text: 'origohost-node-01: [INFO] Router mapping complete: GET /api/v1/builders', delay: 600 },
  { text: 'origohost-node-01: [INFO] Incoming payload matched signature - IP: 103.22.44.11', delay: 800 },
  { text: 'origohost-node-01: [SUCCESS] Payload signature parsed in 12ms', delay: 500 },
  { text: 'origohost-node-01: [INFO] Sync completed with remote coordinator nodes', delay: 700 },
];

const STEPS_MAP = {
  deploy: DEPLOY_STEPS,
  git: GIT_STEPS,
  logs: LOG_STEPS,
};

export function TerminalVisual() {
  const [activeTab, setActiveTab] = useState<TabId>('deploy');
  const [copied, setCopied] = useState(false);
  const [step, setStep] = useState(0);
  const [isRunning, setIsRunning] = useState(true);

  const currentSteps = STEPS_MAP[activeTab];

  // Run stepping animation
  useEffect(() => {
    if (!isRunning) return;

    setStep(0);
    let timer: NodeJS.Timeout;
    const steps = STEPS_MAP[activeTab];

    const runStep = (currStep: number) => {
      if (currStep >= steps.length) {
        setIsRunning(false);
        return;
      }
      timer = setTimeout(() => {
        setStep((s) => s + 1);
        runStep(currStep + 1);
      }, steps[currStep].delay);
    };

    runStep(0);

    return () => clearTimeout(timer);
  }, [activeTab, isRunning]);

  const copyToClipboard = () => {
    const textToCopy = currentSteps.map(s => s.text).join('\n');
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full rounded-card border border-border bg-[#050A16] text-[#F4F7FF] shadow-xl overflow-hidden font-mono text-body-xs">
      {/* Terminal Title Bar */}
      <div className="flex items-center justify-between px-4 py-3 bg-[#0A1222] border-b border-border/80">
        <div className="flex items-center gap-2">
          {/* Mac-style buttons */}
          <div className="flex gap-1.5">
            <span className="h-3 w-3 rounded-full bg-accent-pink/40 inline-block" />
            <span className="h-3 w-3 rounded-full bg-accent-orange/40 inline-block" />
            <span className="h-3 w-3 rounded-full bg-accent-green/40 inline-block" />
          </div>
          <span className="text-ink-muted text-[11px] font-bold tracking-wider ml-2 flex items-center gap-1.5">
            <Terminal className="h-3.5 w-3.5 text-primary" />
            sandbox-console@origohost:~
          </span>
        </div>

        {/* Action icons */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsRunning(true)}
            className="text-ink-muted hover:text-white transition-colors"
            title="Restart animation"
            aria-label="Restart animation"
          >
            <RotateCcw className="h-3.5 w-3.5" />
          </button>
          <button
            onClick={copyToClipboard}
            className="text-ink-muted hover:text-white transition-colors flex items-center gap-1"
            title="Copy command output"
            aria-label="Copy output"
          >
            {copied ? (
              <Check className="h-3.5 w-3.5 text-accent-green" />
            ) : (
              <Copy className="h-3.5 w-3.5" />
            )}
          </button>
        </div>
      </div>

      {/* Interactive Tabs */}
      <div className="flex bg-[#0A1222]/50 border-b border-border/60 text-ink-muted font-semibold">
        {(['deploy', 'git', 'logs'] as TabId[]).map((tab) => (
          <button
            key={tab}
            onClick={() => {
              setActiveTab(tab);
              setIsRunning(true);
            }}
            className={`px-4 py-2 border-r border-border/40 hover:bg-[#0A1222] hover:text-white transition-colors ${
              activeTab === tab ? 'bg-[#050A16] text-primary border-b border-b-primary font-bold' : ''
            }`}
          >
            {tab === 'deploy' ? 'VPS Deploy' : tab === 'git' ? 'Git push hook' : 'Sandbox Logs'}
          </button>
        ))}
      </div>

      {/* Terminal Screen Console */}
      <div className="p-5 h-[280px] overflow-y-auto space-y-2 select-text scrollbar-thin">
        {currentSteps.slice(0, step).map((line, idx) => {
          const isCommand = line.text.startsWith('$');
          const isSuccess = line.text.startsWith('✓') || line.text.includes('SUCCESS');
          const isPending = line.text.startsWith('⠋') || line.text.startsWith('⠙') || line.text.startsWith('⠸');
          const isLaunch = line.text.startsWith('🚀');

          let textClass = 'text-ink-secondary';
          if (isCommand) textClass = 'text-[#F4F7FF] font-bold';
          else if (isSuccess) textClass = 'text-accent-green font-semibold';
          else if (isPending) textClass = 'text-primary/80 animate-pulse';
          else if (isLaunch) textClass = 'text-[#0055FF] font-bold';

          return (
            <div key={idx} className={textClass}>
              {line.text}
            </div>
          );
        })}

        {/* Cursor indicator */}
        {isRunning && step < currentSteps.length && (
          <div className="flex items-center gap-1">
            <span className="h-3.5 w-2 bg-primary inline-block animate-pulse" />
          </div>
        )}
      </div>
    </div>
  );
}
