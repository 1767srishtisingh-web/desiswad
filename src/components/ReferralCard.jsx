import { useState } from 'react';
import { Check, Copy, Share2 } from 'lucide-react';
import { countShare, getReferral, referralLink } from '../services/referralService.js';
import { useToast } from '../hooks/useToast.js';
import Button from './ui/Button.jsx';

/** Copy uses the async clipboard API, then falls back to execCommand. */
async function copyText(text) {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      return true;
    }
  } catch {
    /* fall through */
  }
  try {
    const el = document.createElement('textarea');
    el.value = text;
    el.setAttribute('readonly', '');
    el.style.position = 'fixed';
    el.style.opacity = '0';
    document.body.appendChild(el);
    el.select();
    const ok = document.execCommand('copy');
    document.body.removeChild(el);
    return ok;
  } catch {
    return false;
  }
}

export default function ReferralCard() {
  const referral = getReferral();
  const [copied, setCopied] = useState(false);
  const toast = useToast();
  const link = referralLink(referral.code);

  async function onCopy() {
    const ok = await copyText(referral.code);
    if (ok) {
      setCopied(true);
      toast.success('Referral code copied!');
      setTimeout(() => setCopied(false), 2200);
    } else {
      toast.error(`Copy blocked by your browser. The code is ${referral.code}.`);
    }
  }

  async function onShare() {
    const payload = {
      title: 'DesiSwad',
      text: `Use my code ${referral.code} on your first DesiSwad mystery box.`,
      url: link,
    };
    if (navigator.share) {
      try {
        await navigator.share(payload);
        countShare();
        return;
      } catch (err) {
        if (err?.name === 'AbortError') return;
      }
    }
    const ok = await copyText(`${payload.text} ${payload.url}`);
    toast[ok ? 'success' : 'error'](
      ok ? 'Sharing is not available here, so the invite was copied instead.' : 'Sharing is not available in this browser.',
    );
  }

  return (
    <div className="referral">
      <div>
        <h3 style={{ marginBottom: '0.4rem' }}>Your friends deserve a mystery box too.</h3>
        <p style={{ color: 'var(--muted)', marginBottom: 0 }}>
          Share your code. When a friend orders their first box, 20 Swad Points land in your
          account.
        </p>
      </div>
      <div>
        <p className="codebox" aria-label={`Your referral code is ${referral.code}`}>
          {referral.code}
        </p>
        <div className="row" style={{ marginTop: '0.8rem' }}>
          <Button onClick={onCopy} icon={copied ? Check : Copy} variant="dark">
            {copied ? 'Copied' : 'Copy code'}
          </Button>
          <Button onClick={onShare} icon={Share2} variant="secondary">
            Share
          </Button>
        </div>
      </div>
    </div>
  );
}
