import { useEffect, useState } from 'react';
import './nebula.css';

export default function NebulaDevConsole() {
  const [lines, setLines] = useState<string[]>([]);

  useEffect(() => {
    if (!(import.meta as any).env?.DEV) return;

    const push = (s: string) => setLines((l) => [s, ...l].slice(0, 200));

    const originalError = console.error;
    const originalWarn = console.warn;

    console.error = (...args: any[]) => {
      push('[ERROR] ' + args.map(String).join(' '));
      originalError.apply(console, args as any);
    };
    console.warn = (...args: any[]) => {
      push('[WARN] ' + args.map(String).join(' '));
      originalWarn.apply(console, args as any);
    };

    const onError = (ev: ErrorEvent) => push('[onerror] ' + ev.message + ' @ ' + ev.filename + ':' + ev.lineno);
    const onRejection = (ev: PromiseRejectionEvent) => push('[unhandledrejection] ' + String(ev.reason));

    window.addEventListener('error', onError);
    window.addEventListener('unhandledrejection', onRejection as any);

    return () => {
      console.error = originalError;
      console.warn = originalWarn;
      window.removeEventListener('error', onError);
      window.removeEventListener('unhandledrejection', onRejection as any);
    };
  }, []);

  if (!(import.meta as any).env?.DEV) return null;

  const download = () => {
    try {
      const blob = new Blob([lines.join('\n')], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'nebula-logs.txt';
      a.click();
      URL.revokeObjectURL(url);
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error('Failed to download logs', e);
    }
  };

  const clear = () => setLines([]);

  return (
    <div className="nebula-dev-console" aria-hidden>
      <div className="nebula-dev-console-header">
        Dev Console
        <div className="nebula-dev-console-actions">
          <button className="nebula-dev-btn" onClick={download} type="button">Download</button>
          <button className="nebula-dev-btn" onClick={clear} type="button">Clear</button>
        </div>
      </div>
      <div className="nebula-dev-console-lines">
        {lines.map((l, i) => (
          <div key={i} className="nebula-dev-console-line">{l}</div>
        ))}
      </div>
    </div>
  );
}
