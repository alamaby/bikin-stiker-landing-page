import { setRequestLocale } from "next-intl/server";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

interface PrivacyPageProps {
  params: Promise<{ locale: string }>;
}

const CONTACT_EMAIL = "alam.aby.b@gmail.com";

export default async function PrivacyPage({ params }: PrivacyPageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const isId = locale === "id";

  return (
    <div className="py-20">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <Link
            href={`/${locale}`}
            className="inline-flex items-center gap-x-2 rounded-lg px-2.5 py-1.5 text-sm text-navbar-nav-foreground hover:bg-muted hover:text-foreground focus:bg-muted focus:text-foreground focus:outline-hidden"
          >
            <ArrowLeft className="size-4 shrink-0" />
            {isId ? "Kembali" : "Back"}
          </Link>
        </div>
        <article className="prose prose-stone dark:prose-invert max-w-none">
          {isId ? (
            <>
              <h1>Kebijakan Privasi</h1>
              <p className="text-muted-foreground">
                Tanggal efektif: 3 Juli 2026 | Terakhir diperbarui: 3 Juli 2026
                <br />
                Aplikasi: BikinStiker
                <br />
                Kontak:{" "}
                <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
              </p>

              <h2>1. Ringkasan</h2>
              <p>
                Kebijakan Privasi ini menjelaskan bagaimana BikinStiker
                (&quot;kami&quot;) mengumpulkan, menggunakan, dan melindungi
                informasi pribadi Anda saat Anda menggunakan aplikasi mobile
                BikinStiker (&quot;Aplikasi&quot;). Dengan menggunakan
                Aplikasi, Anda menyetujui praktik yang dijelaskan di sini.
              </p>

              <h2>2. Data yang Kami Kumpulkan</h2>
              <h3>2.1 Data Akun</h3>
              <ul>
                <li>
                  <strong>Email dan kata sandi</strong> — saat pendaftaran
                  email/kata sandi.
                </li>
                <li>
                  <strong>Info akun Google</strong> (jika tersedia) — nama,
                  email, foto profil via Google Sign-In melalui Supabase Auth.
                  Kami tidak menerima kata sandi Google Anda.
                </li>
                <li>
                  <strong>Sesi anonim</strong> — dibuat otomatis di perangkat
                  pada peluncuran pertama, terkait ID server, bukan identitas
                  pribadi.
                </li>
              </ul>
              <h3>2.2 Data Stiker dan Generasi</h3>
              <ul>
                <li>Teks prompt dan caption (termasuk posisi caption).</li>
                <li>Metadata preset/gaya visual yang dipilih.</li>
                <li>
                  Gambar stiker hasil AI, disimpan di penyimpanan cloud privat
                  terbatas untuk akun Anda.
                </li>
                <li>
                  Riwayat generasi: waktu, nama preset, teks prompt, status,
                  metadata provider/model untuk diagnostik.
                </li>
                <li>
                  Log peningkatan prompt: panjang prompt asli, status
                  berhasil/gagal, hit cache, latensi. Prompt yang ditingkatkan
                  dikirim ke penyedia generasi gambar.
                </li>
              </ul>
              <h3>2.3 Data Kredit, Dompet, dan Langganan</h3>
              <ul>
                <li>Saldo kredit, riwayat transaksi (grant, potongan, refund, hadiah misi) termasuk kedaluwarsa.</li>
                <li>Tier langganan (free/plus) dan periode aktif.</li>
                <li>Progres misi dan streak check-in harian.</li>
              </ul>
              <h3>2.4 Data Anti-Bot</h3>
              <ul>
                <li>
                  Hash alamat IP (satu arah, tidak dapat dibalikkan) untuk
                  rate-limit dan deteksi penyalahgunaan.
                </li>
                <li>
                  Telemetri penggunaan: percobaan generasi, permintaan
                  diblokir, metadata retry.
                </li>
              </ul>
              <h3>2.5 Data Periklanan</h3>
              <ul>
                <li>
                  <strong>Iklan video berhadiah (aktif)</strong> — opsional
                  untuk mendapatkan kredit. Google AdMob memproses penayangan
                  dan reward; Google dapat mengumpulkan info perangkat,
                  advertising ID, dan data penggunaan.
                </li>
                <li>
                  <strong>Iklan banner (opt-in, bila diaktifkan)</strong> —
                  AdMob dapat mengumpulkan advertising ID, model perangkat,
                  versi OS, interaksi aplikasi, data diagnostik, dan perkiraan
                  lokasi sesuai pengaturan perangkat dan persetujuan Anda.
                </li>
              </ul>
              <h3>2.6 Data Perangkat Lokal</h3>
              <ul>
                <li>Cache gambar dan file sementara ekspor paket stiker.</li>
              </ul>
              <h3>2.7 Token Migrasi Tamu</h3>
              <p>
                Saat sesi tamu di-upgrade ke akun terdaftar, token sekali-pakai
                berumur pendek dibuat untuk memindahkan stiker, paket, ikon
                tray, dan log prompt. Token di-hash, kedaluwarsa dalam hitungan
                menit, dikonsumsi tepat satu kali, dan tidak dibagikan ke pihak
                ketiga.
              </p>

              <h2>3. Bagaimana Kami Menggunakan Data Anda</h2>
              <ul>
                <li>Menyediakan dan mengoperasikan Aplikasi (pelaksanaan kontrak).</li>
                <li>Menghasilkan stiker AI dari prompt/caption/preset Anda.</li>
                <li>Mengelola kredit, langganan, misi, dan check-in harian.</li>
                <li>Mencegah penyalahgunaan dan menjaga keamanan (kepentingan yang sah).</li>
                <li>Menampilkan iklan yang dipersonalisasi bila diaktifkan (persetujuan).</li>
                <li>Meningkatkan layanan dan mendiagnosis masalah.</li>
              </ul>

              <h2>4. Pihak Ketiga Pemroses</h2>
              <ul>
                <li><strong>Supabase</strong> — autentikasi, basis data, storage, serverless functions.</li>
                <li><strong>Google (AdMob)</strong> — rewarded/banner ads, pencegahan fraud.</li>
                <li><strong>Google Sign-In</strong> — OAuth (bila tersedia).</li>
                <li><strong>Pixazo</strong> — generasi gambar sisi server (Flux-1-Schnell, SDXL Base 1.0).</li>
                <li><strong>OpenRouter / Gemini / Pollinations</strong> — fallback generasi gambar sisi server.</li>
                <li><strong>Mistral</strong> — peningkatan prompt teks saja (bukan generasi gambar).</li>
                <li><strong>WhatsApp (di perangkat)</strong> — impor paket stiker.</li>
              </ul>
              <p>
                Kunci API penyedia AI tidak pernah diekspos ke aplikasi; hanya
                dikelola di server backend kami.
              </p>

              <h2>5. Retensi Data</h2>
              <ul>
                <li>Akun &amp; autentikasi: selama akun aktif; dihapus atas permintaan penghapusan.</li>
                <li>Riwayat generasi: selama akun aktif atau hingga dihapus manual.</li>
                <li>Kredit &amp; langganan: 3 tahun untuk audit.</li>
                <li>Log anti-bot &amp; peningkatan prompt: hingga 12 bulan.</li>
                <li>Token migrasi tamu: hitungan menit, langsung invalid setelah dipakai.</li>
                <li>Cache lokal: hingga Anda hapus atau dibersihkan OS.</li>
                <li>Catatan persetujuan hukum: disimpan sebagai bukti audit.</li>
                <li>Data iklan: mengikuti kebijakan retensi Google.</li>
              </ul>

              <h2>6. Hak Anda (GDPR / UU PDP)</h2>
              <p>
                Akses, koreksi, penghapusan (tunduk retensi hukum), penarikan
                persetujuan, portabilitas, pembatasan/keberatan, dan keluhan ke
                otoritas perlindungan data. Hubungi{" "}
                <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a> — kami
                merespons dalam 30 hari.
              </p>

              <h2>7. Privasi Anak</h2>
              <p>
                Aplikasi tidak ditujukan untuk anak di bawah 13 tahun (atau usia
                minimum yurisdiksi Anda). Kami tidak sadar mengumpulkan data
                anak; hubungi kami untuk penghapusan.
              </p>

              <h2>8. Transfer Internasional</h2>
              <p>
                Data dapat diproses di luar yurisdiksi Anda (Supabase, Google,
                Pixazo, OpenRouter, Gemini, Pollinations, Mistral) dengan
                perlindungan memadai termasuk klausul kontrak standar bila
                diwajibkan.
              </p>

              <h2>9. Keamanan</h2>
              <ul>
                <li>Row Level Security (RLS) — akses hanya catatan milik Anda.</li>
                <li>Storage privat dengan signed URL kedaluwarsa.</li>
                <li>Kunci API hanya di server, tidak di klien.</li>
                <li>Token migrasi ter-hash dan berumur pendek.</li>
                <li>Autentikasi aman via Supabase Auth.</li>
              </ul>
              <p>
                Tidak ada metode transmisi/penyimpanan yang 100% aman.
              </p>

              <h2>10. Perubahan Kebijakan</h2>
              <p>
                Perubahan material memerlukan persetujuan ulang via Aplikasi.
                Perubahan non-material dapat diperbarui tanpa pemberitahuan
                individual. Tanggal efektif di atas menunjukkan revisi terbaru.
              </p>

              <h2>11. Hubungi Kami</h2>
              <p>
                Pertanyaan privasi atau permintaan hak data:{" "}
                <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
              </p>
            </>
          ) : (
            <>
              <h1>Privacy Policy</h1>
              <p className="text-muted-foreground">
                Effective Date: July 3, 2026 | Last Updated: July 3, 2026
                <br />
                App: BikinStiker
                <br />
                Contact:{" "}
                <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
              </p>

              <h2>1. Overview</h2>
              <p>
                This Privacy Policy describes how BikinStiker (&quot;we&quot;)
                collects, uses, and protects your personal information when you
                use the BikinStiker mobile app (&quot;App&quot;). By using the
                App, you agree to the practices described here.
              </p>

              <h2>2. Data We Collect</h2>
              <h3>2.1 Account Data</h3>
              <ul>
                <li>
                  <strong>Email and password</strong> — for email/password
                  sign-up.
                </li>
                <li>
                  <strong>Google account info</strong> (when available) — name,
                  email, profile photo via Google Sign-In through Supabase
                  Auth. We never receive your Google password.
                </li>
                <li>
                  <strong>Anonymous session</strong> — auto-created on first
                  launch, tied to a server-generated ID, not your identity.
                </li>
              </ul>
              <h3>2.2 Sticker and Generation Data</h3>
              <ul>
                <li>Text prompts and captions (including caption position).</li>
                <li>Preset/style metadata you selected.</li>
                <li>
                  AI-generated sticker images, stored in private cloud storage
                  limited to your account.
                </li>
                <li>
                  Generation history: timestamps, preset names, prompt text,
                  status, provider/model metadata for diagnostics.
                </li>
                <li>
                  Prompt enhancement logs: original prompt length,
                  success/failure, cache hits, latency. Enhanced prompts are
                  sent to the image provider.
                </li>
              </ul>
              <h3>2.3 Credits, Wallet, and Subscription Data</h3>
              <ul>
                <li>Credit balance and transaction records (grants, deductions, refunds, mission rewards) incl. expiry.</li>
                <li>Subscription tier (free/plus) and active period.</li>
                <li>Mission progress and daily check-in streaks.</li>
              </ul>
              <h3>2.4 Anti-Bot Data</h3>
              <ul>
                <li>
                  Hashed IP address (one-way, non-reversible) for rate limiting
                  and abuse detection.
                </li>
                <li>
                  Usage telemetry: generation attempts, blocked requests, retry
                  metadata.
                </li>
              </ul>
              <h3>2.5 Advertising Data</h3>
              <ul>
                <li>
                  <strong>Rewarded video ads (active)</strong> — optional, to
                  earn credits. Google AdMob processes delivery and rewards;
                  Google may collect device info, advertising IDs, and usage
                  data.
                </li>
                <li>
                  <strong>Banner ads (opt-in, when enabled)</strong> — AdMob
                  may collect advertising ID, device model, OS version, app
                  interactions, diagnostics, and approximate location per your
                  device settings and consent.
                </li>
              </ul>
              <h3>2.6 Local Device Data</h3>
              <ul>
                <li>Image cache and temporary sticker-pack export files.</li>
              </ul>
              <h3>2.7 Guest Migration Tokens</h3>
              <p>
                Upgrading a guest session creates a short-lived one-time token
                to transfer stickers, packs, tray icons, and prompt logs.
                Tokens are hashed at rest, expire within minutes, are consumed
                exactly once, and are never shared with third parties.
              </p>

              <h2>3. How We Use Your Data</h2>
              <ul>
                <li>Provide and operate the App (performance of contract).</li>
                <li>Generate AI stickers from your prompts/captions/presets.</li>
                <li>Manage credits, subscriptions, missions, check-ins.</li>
                <li>Prevent abuse and secure the service (legitimate interest).</li>
                <li>Show personalized ads when enabled (consent).</li>
                <li>Improve the service and diagnose issues.</li>
              </ul>

              <h2>4. Third-Party Processors</h2>
              <ul>
                <li><strong>Supabase</strong> — auth, database, storage, serverless functions.</li>
                <li><strong>Google (AdMob)</strong> — rewarded/banner ads, fraud prevention.</li>
                <li><strong>Google Sign-In</strong> — OAuth (when available).</li>
                <li><strong>Pixazo</strong> — server-side generation (Flux-1-Schnell, SDXL Base 1.0).</li>
                <li><strong>OpenRouter / Gemini / Pollinations</strong> — server-side image fallbacks.</li>
                <li><strong>Mistral</strong> — text-only prompt enhancement.</li>
                <li><strong>WhatsApp (on-device)</strong> — sticker pack import.</li>
              </ul>
              <p>
                AI provider API keys are never exposed to the app; they live
                only on our backend servers.
              </p>

              <h2>5. Data Retention</h2>
              <ul>
                <li>Account &amp; auth: while active; deleted on deletion request.</li>
                <li>Generation history: while active or until manually deleted.</li>
                <li>Credits &amp; subscriptions: 3 years for audit.</li>
                <li>Anti-bot &amp; enhancement logs: up to 12 months.</li>
                <li>Guest tokens: minutes; invalidated after use.</li>
                <li>Local cache: until you clear it or the OS does.</li>
                <li>Legal consent record: kept as audit proof.</li>
                <li>Advertising data: per Google retention policies.</li>
              </ul>

              <h2>6. Your Rights (GDPR / UU PDP)</h2>
              <p>
                Access, correction, deletion (subject to legal retention),
                consent withdrawal, portability, restriction/objection, and
                complaints to your data authority. Contact{" "}
                <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a> — we
                respond within 30 days.
              </p>

              <h2>7. Children&apos;s Privacy</h2>
              <p>
                The App is not for children under 13 (or your jurisdiction
                minimum). We do not knowingly collect children&apos;s data;
                contact us for deletion.
              </p>

              <h2>8. International Transfers</h2>
              <p>
                Data may be processed outside your jurisdiction (Supabase,
                Google, Pixazo, OpenRouter, Gemini, Pollinations, Mistral) with
                appropriate safeguards including standard contractual clauses
                where required.
              </p>

              <h2>9. Security</h2>
              <ul>
                <li>Row Level Security (RLS) — access limited to your own records.</li>
                <li>Private storage with expiring signed URLs.</li>
                <li>Server-side-only API keys.</li>
                <li>Hashed, short-lived migration tokens.</li>
                <li>Secure auth via Supabase Auth.</li>
              </ul>
              <p>No transmission/storage method is 100% secure.</p>

              <h2>10. Changes to This Policy</h2>
              <p>
                Material changes require renewed consent via the App.
                Non-material changes may ship without individual notice. The
                effective date above marks the latest revision.
              </p>

              <h2>11. Contact Us</h2>
              <p>
                Privacy questions or data-rights requests:{" "}
                <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
              </p>
            </>
          )}
        </article>
      </div>
    </div>
  );
}
