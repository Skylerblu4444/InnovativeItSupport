// src/components/FileUpload.tsx
'use client';
import { useState } from 'react';
import { getBrowserSupabase } from '@/lib/supabaseClient';

export default function FileUpload({ onUploaded }: { onUploaded?: (url: string) => void }) {
  const [fileName, setFileName] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0];
    if (!f) return;
    setLoading(true);
    const supabase = getBrowserSupabase();
    const filePath = `${Date.now()}_${f.name}`;
    const { error } = await supabase.storage.from('attachments').upload(filePath, f, { cacheControl: '3600', upsert: false });
    if (error) {
      alert('Upload failed: ' + error.message);
      setLoading(false);
      return;
    }
    const { data } = supabase.storage.from('attachments').getPublicUrl(filePath);
    setFileName(data.publicUrl);
    setLoading(false);
    onUploaded?.(data.publicUrl);
  }

  return (
    <div>
      <label className="inline-block px-4 py-2 bg-slate-100 rounded cursor-pointer">
        {loading ? 'Uploading…' : 'Upload file'}
        <input onChange={onFileChange} type="file" className="hidden" />
      </label>
      {fileName && <div className="mt-2 text-sm text-slate-600">Uploaded: <a className="underline" href={fileName} target="_blank" rel="noreferrer">View</a></div>}
    </div>
  );
}
