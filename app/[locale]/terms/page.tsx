import { setRequestLocale } from "next-intl/server";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

interface TermsPageProps {
  params: Promise<{ locale: string }>;
}

const CONTACT_EMAIL = "alam.aby.b@gmail.com";

export default async function TermsPage({ params }: TermsPageProps) {
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
              <h1>Ketentuan Layanan</h1>
              <p className="text-muted-foreground">
                Tanggal efektif: 3 Juli 2026 | Terakhir diperbarui: 15 Oktober 2026
                <br />
                Aplikasi: BikinStiker
                <br />
                Kontak:{" "}
                <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
              </p>

              <h2>1. Penerimaan Ketentuan</h2>
              <p>
                Dengan mengunduh, menginstal, atau menggunakan aplikasi
                BikinStiker (&quot;Aplikasi&quot;), Anda setuju terikat
                Ketentuan ini. Jika tidak setuju, jangan gunakan Aplikasi.
              </p>

              <h2>2. Kelayakan</h2>
              <p>
                Usia minimum 13 tahun (atau usia minimum yurisdiksi Anda).
              </p>

              <h2>3. Jenis Akun</h2>
              <h3>3.1 Akun Tamu (Anonim)</h3>
              <ul>
                <li>Dibuat otomatis saat peluncuran pertama; menerima 1 kredit awal.</li>
                <li>Dapat membuat stiker, tetapi tidak dapat menyimpan/membagikan sampai membuat akun terdaftar.</li>
                <li>Konten tamu hanya pindah bila sesi anonim yang sama di-upgrade via token migrasi sekali-pakai; tidak dapat dipindah ke akun lain yang sudah ada.</li>
              </ul>
              <h3>3.2 Akun Terdaftar</h3>
              <ul>
                <li>Email + kata sandi atau Google Sign-In.</li>
                <li>1 kredit awal + bonus pendaftaran +4 (idempotent, total 5) via RPC <code>grant_registered_bonus()</code>.</li>
                <li>Dapat menyimpan, membagikan, dan mengekspor stiker.</li>
              </ul>
              <h3>3.3 Login Pihak Ketiga</h3>
              <p>
                Tunduk pada ketentuan penyedia (mis. Google). Kami hanya
                menerima profil dasar (nama, email, foto); tidak menerima kata
                sandi Anda.
              </p>

              <h2>4. Kredit dan Mata Uang Virtual</h2>
              <h3>4.1 Cara Kerja</h3>
              <ul>
                <li>1 generasi stiker = 1 kredit. Kredit tanpa nilai uang, tidak dapat ditukar tunai.</li>
                <li>Sumber: starter + bonus pendaftaran (total 5 untuk pengguna baru), grant langganan bulanan, hadiah misi, streak check-in harian, grant administratif, iklan berhadiah (opsional).</li>
              </ul>
              <h3>4.2 Kedaluwarsa</h3>
              <p>
                Grant bulanan, hadiah misi, dan check-in umumnya kedaluwarsa 30
                hari; baris grant ditandai <code>expired_at</code>.
              </p>
              <h3>4.3 Tier Free dan Plus</h3>
              <ul>
                <li><strong>Free</strong>: 5 kredit/bulan, preset gratis, 2 slot paket.</li>
                <li><strong>Plus</strong>: 50 kredit/bulan, semua preset termasuk gaya Plus-only, 20 slot paket.</li>
                <li>Grant bulanan dilewati bila saldo sudah pada/di atas batas dompet. Fitur dan batas dapat berubah dengan pemberitahuan.</li>
              </ul>
              <p>
                <strong>Paket berbayar (Plus/Pro) di halaman Harga adalah
                roadmap</strong> — harga yang tercantum adalah rencana dan dapat
                berubah. Saat ini tidak ada penagihan via toko aplikasi.
              </p>
              <h3>4.4 Refund Kegagalan</h3>
              <p>
                Kredit yang terpotong lalu generasinya gagal dikembalikan
                otomatis; gagal sebelum potong = tidak dikenakan biaya.
              </p>

              <h2>5. Pembuatan Stiker</h2>
              <p>
                Pilih preset, masukkan prompt, opsional caption (maks 10
                karakter, atas/bawah). Server dapat meningkatkan prompt via
                model reasoning teks (Mistral) lalu membuat gambar via Pixazo
                Flux-1-Schnell sebagai utama dan Pollinations Flux sebagai
                fallback (rantai aktif Oktober 2026; endpoint SDXL Base 1.0,
                OpenRouter, dan Gemini saat ini dinonaktifkan, varian
                non-komersial/dev tetap dinonaktifkan). Setiap generasi
                mencatat metadata provider/model untuk ketertelusuran. Hasil
                gaya die-cut untuk kompatibilitas WhatsApp. Hasil AI dapat
                bervariasi dan tidak dijamin unik, orisinal, atau dilindungi
                hak cipta; beberapa pengguna dapat menerima output mirip.
                Model dasar (FLUX.1-schnell, Apache-2.0) mengizinkan
                komersial, tetapi ketentuan penyedia API yang lebih
                restriktif yang menang; bila penyedia mewajibkan atribusi
                (Pixazo Free), wajib dipertahankan. Tinjau sebelum
                dipakai/dibagikan.
              </p>
              <p>
                Prompt/caption dilarang ilegal, berbahaya, kebencian, eksplisit
                seksual, pencemaran nama, atau melanggar hak orang lain. Kami
                mencatat prompt dan metadata provider untuk anti-penyalahgunaan
                dan diagnostik.
              </p>

              <h2>6. Konten dan Lisensi</h2>
              <ul>
                <li>Prompt/caption tetap milik Anda; Anda memberi lisensi terbatas non-eksklusif untuk memprosesnya demi pembuatan stiker.</li>
                <li>Stiker hasil AI: lisensi terbatas, non-eksklusif, sedunia, bebas royalti, dapat dicabut, tidak dapat dialihkan/disublisensikan, untuk pribadi dan komersial terbatas — sepanjang diizinkan penyedia/model tiap generasi (konten Pixazo Free tetap milik penyedia). Tanpa jaminan hak cipta, orisinalitas, atau eksklusivitas (UU Hak Cipta 28/2014 mensyaratkan kontribusi intelektual manusia).</li>
                <li>Klirens KI tanggung jawab Anda sebelum komersial: dilarang memakai merek, logo, karakter berhak cipta, atau kemiripan orang lain tanpa izin; periksa output, bukan hanya prompt. Patuhi kewajiban pengungkapan konten AI yang berlaku.</li>
                <li>Lisensi tidak mencakup model AI, data pelatihan, deskriptor gaya, atau teknologi dasar Aplikasi.</li>
              </ul>

              <h2>7. Paket Stiker dan Ekspor WhatsApp</h2>
              <ul>
                <li>Paket berisi 3–30 stiker; ada nama, ikon tray, asosiasi emoji; slot 2 (Free) / 20 (Plus).</li>
                <li>Ekspor via ContentProvider stiker Android; file dilayani lokal ke WhatsApp. WhatsApp dapat meng-cache sesuai kebijakannya; kami tidak bertanggung jawab atas perubahan WhatsApp.</li>
                <li>Ikon tray diturunkan dari stiker pertama; dapat diganti via stiker lain.</li>
              </ul>

              <h2>8. Periklanan</h2>
              <ul>
                <li>Iklan video berhadiah untuk kredit misi (saat ini aktif); kredit hanya bila provider mengonfirmasi reward; ketersediaan tidak dijamin; dilarang memanipulasi.</li>
                <li>Banner AdMob bersifat opt-in dan dapat dinonaktifkan; AdMob dapat mengumpulkan info perangkat dan advertising ID sesuai Kebijakan Privasi Google.</li>
              </ul>

              <h2>9. Anti-Penyalahgunaan</h2>
              <p>
                Dilarang mengelabui rate limit/kredit, bot/skrip otomatis,
                konten berbahaya/ilegal, akses data orang lain, dan
                reverse-engineering. Pelanggaran dapat berujung penangguhan atau
                penghentian akun.
              </p>

              <h2>10. Kekayaan Intelektual</h2>
              <p>
                Kode, desain, logo, dan merek BikinStiker dilindungi hukum yang
                berlaku. Deskriptor gaya visual bersifat proprietary.
              </p>

              <h2>11. Penafian</h2>
              <p>
                APLIKASI &quot;SEBAGAIMANA ADANYA&quot; TANPA JAMINAN TERSURAT
                MAUPUN TERSIRAT (termasuk kelayakan jual, tujuan tertentu,
                non-pelanggaran). Tidak dijamin tanpa gangguan/bebas
                kesalahan/aman, sesuai ekspektasi, kompatibel semua perangkat,
                atau layanan pihak ketiga selalu berfungsi.
              </p>

              <h2>12. Batasan Tanggung Jawab</h2>
              <p>
                Sejauh diizinkan hukum, BikinStiker tidak bertanggung jawab atas
                kerugian tidak langsung/insidentil/konsekuensial. Total
                tanggung jawab tidak melebihi yang Anda bayarkan dalam 12 bulan
                terakhir atau $100 USD, mana yang lebih besar.
              </p>

              <h2>13. Pengakhiran</h2>
              <ul>
                <li>Anda dapat menghapus akun kapan saja via pengaturan akun di Aplikasi atau menghubungi kami.</li>
                <li>Kami dapat menangguhkan/menghentikan akun pelanggar/abusif atau bila diwajibkan hukum.</li>
                <li>Data di-soft-delete segera, hard-delete terjadwal setelah 30 hari. Catatan tertentu dipertahankan per Kebijakan Privasi.</li>
                <li>Email pemasaran hanya bila opt-in via toggle Email Marketing di Profile; dapat opt-out kapan saja.</li>
              </ul>

              <h2>14. Perubahan Ketentuan</h2>
              <p>
                Perubahan material butuh penerimaan ulang via Aplikasi.
                Non-material dapat diperbarui tanpa pemberitahuan individual.
              </p>

              <h2>15. Hukum yang Berlaku</h2>
              <p>
                Hukum Republik Indonesia. Sengketa di pengadilan RI kecuali
                diwajibkan lain oleh hukum perlindungan konsumen.
              </p>

              <h2>16. Keterpisahan &amp; 17. Perjanjian Seluruh</h2>
              <p>
                Ketentuan yang tidak dapat diberlakukan dibatasi/dihapus
                seminimal mungkin; sisanya tetap berlaku. Ketentuan ini +
                Kebijakan Privasi adalah seluruh perjanjian penggunaan Aplikasi.
              </p>

              <h2>18. Hubungi Kami</h2>
              <p>
                <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
              </p>
            </>
          ) : (
            <>
              <h1>Terms of Service</h1>
              <p className="text-muted-foreground">
                Effective Date: July 3, 2026 | Last Updated: October 15, 2026
                <br />
                App: BikinStiker
                <br />
                Contact:{" "}
                <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
              </p>

              <h2>1. Acceptance</h2>
              <p>
                By downloading, installing, or using BikinStiker
                (&quot;App&quot;), you agree to these Terms. If you disagree,
                do not use the App.
              </p>

              <h2>2. Eligibility</h2>
              <p>Minimum age 13 (or your jurisdiction minimum).</p>

              <h2>3. Account Types</h2>
              <h3>3.1 Guest (Anonymous)</h3>
              <ul>
                <li>Auto-created on first launch; 1 starter credit.</li>
                <li>Can generate but cannot save/share until registered.</li>
                <li>Guest content moves only when the same anonymous session is upgraded via one-time migration token; never to a different existing account.</li>
              </ul>
              <h3>3.2 Registered</h3>
              <ul>
                <li>Email + password or Google Sign-In.</li>
                <li>1 starter + idempotent +4 registration bonus (5 total) via <code>grant_registered_bonus()</code> RPC.</li>
                <li>Can save, share, and export stickers.</li>
              </ul>
              <h3>3.3 Third-Party Sign-In</h3>
              <p>
                Subject to the provider&apos;s terms (e.g. Google). We receive
                only basic profile (name, email, photo); never your password.
              </p>

              <h2>4. Credits and Virtual Currency</h2>
              <h3>4.1 How Credits Work</h3>
              <ul>
                <li>1 generation = 1 credit. No cash value, no cash-out.</li>
                <li>Sources: starter + registration bonus (5 total for new users), monthly grants, mission rewards, daily check-in streaks, admin grants, optional rewarded ads.</li>
              </ul>
              <h3>4.2 Expiration</h3>
              <p>
                Monthly, mission, and check-in grants typically expire after 30
                days; grant rows are marked <code>expired_at</code>.
              </p>
              <h3>4.3 Free and Plus Tiers</h3>
              <ul>
                <li><strong>Free</strong>: 5 credits/month, free presets, 2 pack slots.</li>
                <li><strong>Plus</strong>: 50 credits/month, all presets incl. Plus-only, 20 pack slots.</li>
                <li>Monthly grants skip when balance is at/above the wallet cap. Features and limits may change with notice.</li>
              </ul>
              <p>
                <strong>Paid plans (Plus/Pro) on the Pricing page are a
                roadmap</strong> — listed prices are planned and subject to
                change. There is currently no app-store billing.
              </p>
              <h3>4.4 Refunds on Failure</h3>
              <p>
                Credits deducted before a failed generation are refunded
                automatically; failures before deduction cost nothing.
              </p>

              <h2>5. Sticker Generation</h2>
              <p>
                Pick a preset, enter a prompt, optionally add a caption (max 10
                chars, top/bottom). Our server may enhance prompts with a
                text-only reasoning model (Mistral), then generate via Pixazo
                Flux-1-Schnell as primary and Pollinations Flux as fallback
                (active chain, October 2026; SDXL Base 1.0, OpenRouter, and
                Gemini endpoints currently disabled, non-commercial/dev
                variants stay disabled). Each generation logs provider/model
                metadata for traceability. Die-cut style for WhatsApp. AI
                output varies and is not guaranteed unique, original, or
                copyright-protected; users may receive similar outputs. The
                base model (FLUX.1-schnell, Apache-2.0) allows commercial use,
                but the more restrictive API provider terms prevail; retain
                attribution where required (Pixazo Free). Review before
                use/share.
              </p>
              <p>
                Prompts/captions must not be illegal, harmful, hateful, sexually
                explicit, defamatory, or infringing. We log prompts and provider
                metadata for abuse prevention and diagnostics.
              </p>

              <h2>6. Content and License</h2>
              <ul>
                <li>Your prompts stay yours; you grant a limited non-exclusive license to process them for generation.</li>
                <li>Generated stickers: limited, non-exclusive, worldwide, royalty-free, revocable, non-transferable, non-sublicensable license for personal and limited commercial use — to the extent the upstream provider/model allows per generation (Pixazo Free content stays provider-owned). No warranty of copyright, originality, or exclusivity.</li>
                <li>IP clearance is yours before any commercial use: no third-party marks, logos, copyrighted characters, or likeness without permission; check the output, not just the prompt. Follow applicable AI-content disclosure duties.</li>
                <li>No license to AI models, training data, style descriptors, or underlying tech.</li>
              </ul>

              <h2>7. Packs and WhatsApp Export</h2>
              <ul>
                <li>Packs hold 3–30 stickers with name, tray icon, emoji mapping; slots 2 (Free) / 20 (Plus).</li>
                <li>Export via Android sticker ContentProvider; files served locally to WhatsApp. WhatsApp may cache per its policies; we are not responsible for WhatsApp changes.</li>
                <li>Tray icon derives from the first sticker; change it by picking another.</li>
              </ul>

              <h2>8. Advertising</h2>
              <ul>
                <li>Rewarded video ads for mission credits (currently active); granted only on provider-confirmed rewards; availability not guaranteed; no manipulation.</li>
                <li>AdMob banners are opt-in and can be disabled; AdMob may collect device info and ad IDs per Google&apos;s Privacy Policy.</li>
              </ul>

              <h2>9. Anti-Abuse</h2>
              <p>
                No rate-limit/credit circumvention, bots/scripts, harmful or
                illegal content, accessing others&apos; data, or
                reverse-engineering. Violations may lead to suspension or
                termination.
              </p>

              <h2>10. Intellectual Property</h2>
              <p>
                BikinStiker code, design, logos, and marks are protected by
                applicable law. Visual style descriptors are proprietary.
              </p>

              <h2>11. Disclaimer</h2>
              <p>
                THE APP IS &quot;AS IS&quot; WITHOUT EXPRESS OR IMPLIED
                WARRANTIES (incl. merchantability, fitness, non-infringement).
                No guarantee of uninterrupted/error-free/secure service,
                expected output, device compatibility, or third-party services.
              </p>

              <h2>12. Limitation of Liability</h2>
              <p>
                To the maximum extent permitted by law, BikinStiker is not
                liable for indirect/incidental/consequential damages. Total
                liability caps at amounts you paid in the prior 12 months or
                $100 USD, whichever is greater.
              </p>

              <h2>13. Termination</h2>
              <ul>
                <li>Delete your account anytime via in-app settings or by contacting us.</li>
                <li>We may suspend/terminate violating, abusive, or legally-required accounts.</li>
                <li>Data is soft-deleted immediately, hard-deleted on schedule after 30 days. Some records persist per the Privacy Policy.</li>
                <li>Marketing email only on opt-in via the Email Marketing toggle in Profile; opt out anytime.</li>
              </ul>

              <h2>14. Changes</h2>
              <p>
                Material changes need renewed in-app acceptance. Non-material
                changes may ship without individual notice.
              </p>

              <h2>15. Governing Law</h2>
              <p>
                Laws of the Republic of Indonesia. Disputes in Indonesian
                courts unless consumer law requires otherwise.
              </p>

              <h2>16. Severability &amp; 17. Entire Agreement</h2>
              <p>
                Unenforceable provisions are limited/removed minimally; the rest
                stands. These Terms plus the Privacy Policy are the entire
                agreement for App use.
              </p>

              <h2>18. Contact Us</h2>
              <p>
                <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
              </p>
            </>
          )}
        </article>
      </div>
    </div>
  );
}
